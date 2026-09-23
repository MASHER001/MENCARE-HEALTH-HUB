from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.core.config import settings
from app.routers import (
    admin,
    categories,
    conditions,
    facilities,
    health_facts,
    myth_facts,
    search,
    symptoms,
)

app = FastAPI(
    title=settings.PROJECT_NAME,
    description=(
        "Educational men's health API: categories, conditions, symptoms, "
        "healthcare facilities, health facts and myth-vs-fact content. "
        "Public reads are open; all writes require an authenticated administrator."
    ),
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origin_list,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

for router in (
    categories.router,
    conditions.router,
    symptoms.router,
    facilities.router,
    health_facts.router,
    myth_facts.router,
    search.router,
    admin.router,
):
    app.include_router(router, prefix=settings.API_V1_PREFIX)


@app.get("/", tags=["Health"], summary="Service info")
def root():
    return {"service": settings.PROJECT_NAME, "version": "1.0.0", "docs": "/docs"}


@app.get("/health", tags=["Health"], summary="Health check")
def health():
    return {"status": "ok"}
