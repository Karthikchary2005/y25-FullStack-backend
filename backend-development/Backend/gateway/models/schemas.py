
from pydantic import BaseModel
from typing import Optional

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


# FULL ISSUE/TASK UPDATE
class IssueUpdateSchema(BaseModel):

    title: Optional[str] = None
    description: Optional[str] = None
    category: Optional[str] = None
    priority: Optional[str] = None
    status: Optional[str] = None
    updatedBy: Optional[int] = None
