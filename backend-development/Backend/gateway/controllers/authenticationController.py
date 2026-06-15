from fastapi import APIRouter, Header

from models.schemas import (
    SignupSchema,
    SigninSchema,
    IssueSchema,
    StatusSchema,
    IssueUpdateSchema
)

import httpx

router = APIRouter(  prefix="/authservice"  )

SPRING_URL = "http://localhost:8081/"
TASK_URL = "http://localhost:8002/task/"




@router.post("/signup")
async def signup(U: SignupSchema):

    async with httpx.AsyncClient() as client:

        response = await client.post(

            SPRING_URL + "user/signup",

            json=U.model_dump()
        )

    return response.json()



@router.post("/signin")
async def signin(U: SigninSchema):

    async with httpx.AsyncClient() as client:

        response = await client.post(

            SPRING_URL + "user/signin",

            json=U.model_dump()
        )

    return response.json()


@router.get("/uinfo")
async def uinfo(
        Token: str = Header(...)
):

    async with httpx.AsyncClient() as client:

        response = await client.get(

            SPRING_URL + "user/uinfo",

            headers={
                "Token": Token
            }
        )

    return response.json()



@router.get("/profile")
async def profile(
        Token: str = Header(...)
):

    async with httpx.AsyncClient() as client:

        response = await client.get(

            SPRING_URL + "user/profile",

            headers={
                "Token": Token
            }
        )

    return response.json()


@router.get("/users")
async def getUsers():

    async with httpx.AsyncClient() as client:

        response = await client.get(

            SPRING_URL + "user/all"
        )

    return response.json()



@router.delete("/deleteuser/{ID}")
async def deleteUser(ID: int):

    async with httpx.AsyncClient() as client:

        response = await client.delete(

            SPRING_URL +
            f"user/delete/{ID}"
        )

    return response.json()


# CREATE ISSUE
@router.post("/createissue")
async def createIssue(
        issue: IssueSchema,
        Token: str | None = Header(default=None)
):

    async with httpx.AsyncClient() as client:

        response = await client.post(

            TASK_URL + "createtask",

            json=issue.model_dump(),

            headers={
                "token": Token
            } if Token else None
        )

    return response.json()


# GET ALL ISSUES (ADMIN)
@router.get("/issues")
async def getIssues():

    async with httpx.AsyncClient() as client:

        postgres_response = await read_json_or_empty(
            client,
            SPRING_URL + "issues/all"
        )

        task_response = await read_json_or_empty(
            client,

            TASK_URL + "tasks"
        )

    return combine_issue_payloads(
        postgres_response,
        task_response
    )


# GET USER ISSUES
@router.get("/issues/user/{userId}")
async def getUserIssues(
        userId: int
):

    async with httpx.AsyncClient() as client:

        postgres_response = await read_json_or_empty(
            client,
            SPRING_URL +
            f"issues/user/{userId}"
        )

        task_response = await read_json_or_empty(
            client,

            TASK_URL +
            f"tasks/user/{userId}"
        )

    return combine_issue_payloads(
        postgres_response,
        task_response
    )


# UPDATE STATUS
@router.put("/updatestatus/{ID}")
async def updateStatus(

        ID: str,

        data: StatusSchema
):

    async with httpx.AsyncClient() as client:

        if is_postgres_issue_id(ID):

            response = await client.put(

                SPRING_URL +
                f"issues/updatestatus/{ID}",

                json=data.model_dump()
            )

        else:

            response = await client.put(

                TASK_URL +
                f"updatestatus/{ID}",

                json=data.model_dump()
            )

    return response.json()


# DELETE ISSUE
@router.delete("/deleteissue/{ID}")
async def deleteIssue(
        ID: str
):

    async with httpx.AsyncClient() as client:

        if is_postgres_issue_id(ID):

            response = await client.delete(

                SPRING_URL +
                f"issues/delete/{ID}"
            )

        else:

            response = await client.delete(

                TASK_URL +
                f"deletetask/{ID}"
            )

    return response.json()


# UPDATE ISSUE/TASK
@router.put("/updateissue/{ID}")
async def updateIssue(

        ID: str,

        data: IssueUpdateSchema
):

    async with httpx.AsyncClient() as client:

        if is_postgres_issue_id(ID):

            if data.status:

                response = await client.put(

                    SPRING_URL +
                    f"issues/updatestatus/{ID}",

                    json={
                        "status": data.status
                    }
                )

            else:

                return {
                    "code": 400,
                    "message": "PostgreSQL issues support status updates only"
                }

        else:

            response = await client.put(

                TASK_URL +
                f"updatetask/{ID}",

                json=data.model_dump(exclude_none=True)
            )

    return response.json()

def is_postgres_issue_id(issue_id: str) -> bool:

    return str(issue_id).isdigit()


def normalize_issue(issue: dict, source: str) -> dict:

    normalized = dict(issue)

    normalized["id"] = str(
        normalized.get("id") or
        normalized.get("_id")
    )

    normalized["source"] = source

    if "createdAt" not in normalized and "createdat" in normalized:

        normalized["createdAt"] = normalized.get("createdat")

    if "createdat" not in normalized and "createdAt" in normalized:

        normalized["createdat"] = normalized.get("createdAt")

    return normalized


async def read_json_or_empty(
        client: httpx.AsyncClient,
        url: str
) -> dict:

    try:

        response = await client.get(url)

        return response.json()

    except Exception as error:

        return {
            "code": 500,
            "message": str(error),
            "issues": [],
            "tasks": []
        }


def combine_issue_payloads(
        postgres_payload: dict,
        task_payload: dict
) -> dict:

    postgres_issues = [
        normalize_issue(issue, "postgres")
        for issue in postgres_payload.get("issues", [])
    ]

    task_issues = [
        normalize_issue(issue, "mongo")
        for issue in (
            task_payload.get("issues") or
            task_payload.get("tasks") or
            []
        )
    ]

    issues = postgres_issues + task_issues

    issues.sort(
        key=lambda issue: issue.get("createdAt") or "",
        reverse=True
    )

    return {
        "code": 200,
        "issues": issues,
        "tasks": issues,
        "postgresCount": len(postgres_issues),
        "mongoCount": len(task_issues)
    }
