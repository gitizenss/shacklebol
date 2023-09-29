"""A Python Temporal.io worker."""
from uuid import UUID

from pydantic import BaseModel, Extra, Field

__all__ = [
    "AuthenticationContext",
]


class AuthenticationContext(BaseModel, extra=Extra.forbid):
    """Context to hold information to authenticate a user."""

    actor_id: UUID = Field(..., alias="actorId")
