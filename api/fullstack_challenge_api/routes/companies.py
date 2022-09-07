from fastapi import APIRouter, Depends
from fullstack_challenge_api.utils.db import get_db
from sqlalchemy.orm import Session

router = APIRouter()


@router.get("/")
async def get_companies(db: Session = Depends(get_db)):
    pass
