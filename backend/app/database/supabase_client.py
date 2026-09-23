import os
from typing import Any

from dotenv import load_dotenv
from supabase import Client, create_client

load_dotenv()


def _get_env(name: str, default: str = "") -> str:
    return str(os.getenv(name, default) or default)


def get_public_client() -> Client:
    url = _get_env("SUPABASE_URL")
    anon_key = _get_env("SUPABASE_ANON_KEY")
    if not url or not anon_key:
        raise RuntimeError("Supabase public configuration is missing. Set SUPABASE_URL and SUPABASE_ANON_KEY.")
    return create_client(url, anon_key)


def get_admin_client() -> Client:
    url = _get_env("SUPABASE_URL")
    service_role_key = _get_env("SUPABASE_SERVICE_ROLE_KEY")
    if not url or not service_role_key:
        raise RuntimeError("Supabase admin configuration is missing. Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.")
    return create_client(url, service_role_key)


def get_authenticated_client(access_token: str) -> Client:
    if not access_token:
        raise RuntimeError("An access token is required to create an authenticated Supabase client.")
    url = _get_env("SUPABASE_URL")
    anon_key = _get_env("SUPABASE_ANON_KEY")
    if not url or not anon_key:
        raise RuntimeError("Supabase public configuration is missing. Set SUPABASE_URL and SUPABASE_ANON_KEY.")
    client = create_client(url, anon_key)
    client.auth.set_session({"access_token": access_token, "refresh_token": "", "expires_in": 3600, "token_type": "bearer", "user": {}})
    return client
