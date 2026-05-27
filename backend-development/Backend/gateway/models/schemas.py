from pydantic import BaseModel

# SIGNUP
class SignupSchema(BaseModel):

    name: str
    email: str
    password: str


# SIGNIN
class SigninSchema(BaseModel):

    email: str
    password: str


# CREATE ISSUE
class IssueSchema(BaseModel):

    title: str
    description: str
    category: str
    priority: str

    # USER ID
    createdBy: int


# STATUS UPDATE
class StatusSchema(BaseModel):

    status: str