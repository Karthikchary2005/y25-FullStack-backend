from fastapi import APIRouter, Header

from models.schemas import (
    SignupSchema,
    SigninSchema,
    IssueSchema,
    StatusSchema
)

import httpx

router = APIRouter(
    prefix="/authservice"
)

SPRING_URL = "http://localhost:8081/"


# SIGNUP
@router.post("/signup")
async def signup(U: SignupSchema):

    async with httpx.AsyncClient() as client:

        response = await client.post(

            SPRING_URL + "user/signup",

            json=U.model_dump()
        )

    return response.json()


# SIGNIN
@router.post("/signin")
async def signin(U: SigninSchema):

    async with httpx.AsyncClient() as client:

        response = await client.post(

            SPRING_URL + "user/signin",

            json=U.model_dump()
        )

    return response.json()


# USER INFO
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


# PROFILE
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


# GET ALL USERS (ADMIN)
@router.get("/users")
async def getUsers():

    async with httpx.AsyncClient() as client:

        response = await client.get(

            SPRING_URL + "user/all"
        )

    return response.json()


# DELETE USER (ADMIN)
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
        issue: IssueSchema
):

    async with httpx.AsyncClient() as client:

        response = await client.post(

            SPRING_URL + "issues/create",

            json=issue.model_dump()
        )

    return response.json()


# GET ALL ISSUES (ADMIN)
@router.get("/issues")
async def getIssues():

    async with httpx.AsyncClient() as client:

        response = await client.get(

            SPRING_URL + "issues/all"
        )

    return response.json()


# GET USER ISSUES
@router.get("/issues/user/{userId}")
async def getUserIssues(
        userId: int
):

    async with httpx.AsyncClient() as client:

        response = await client.get(

            SPRING_URL +
            f"issues/user/{userId}"
        )

    return response.json()


# UPDATE STATUS
@router.put("/updatestatus/{ID}")
async def updateStatus(

        ID: int,

        data: StatusSchema
):

    async with httpx.AsyncClient() as client:

        response = await client.put(

            SPRING_URL +
            f"issues/updatestatus/{ID}",

            json=data.model_dump()
        )

    return response.json()


# DELETE ISSUE
@router.delete("/deleteissue/{ID}")
async def deleteIssue(
        ID: int
):

    async with httpx.AsyncClient() as client:

        response = await client.delete(

            SPRING_URL +
            f"issues/delete/{ID}"
        )

    return response.json()