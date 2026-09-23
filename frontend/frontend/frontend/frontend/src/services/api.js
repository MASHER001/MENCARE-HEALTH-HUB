const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';
const USE_MOCK_AUTH = import.meta.env.VITE_USE_MOCK_AUTH === 'true';

const buildHeaders = (token) => {
  const headers = { 'Content-Type': 'application/json' };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return headers;
};

async function request(endpoint, { method = 'GET', body, token = null } = {}) {
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method,
      headers: buildHeaders(token),
      ...(body !== undefined ? { body: JSON.stringify(body) } : {}),
    });

    if (!response.ok) {
      let message = 'Request failed';

      try {
        const payload = await response.json();
        message = payload.detail || payload.message || message;
      } catch {
        message = response.statusText || message;
      }

      throw new Error(message);
    }

    if (response.status === 204) {
      return null;
    }

    return response.json().catch(() => ({}));
  } catch (error) {
    if (error instanceof TypeError || error?.name === 'TypeError') {
      throw new Error('Login service is currently unavailable. Please try again later.');
    }

    throw error;
  }
}

export const getStoredToken = () => localStorage.getItem('mencare_token');

export const loginAdmin = async (credentials) => {
  // TODO: replace this placeholder backend route with the real FastAPI admin auth endpoint
  // when the backend contract is confirmed. This is intentionally left separate for frontend-only UI work.
  if (USE_MOCK_AUTH) {
    return {
      token: 'mock-admin-token-for-ui-preview-only',
      user: { email: credentials.email },
      mock: true,
      message: 'Mock auth is enabled for UI preview only. This is not production authentication.',
    };
  }

  try {
    return await request('/api/v1/admin/login', {
      method: 'POST',
      body: credentials,
    });
  } catch (error) {
    if (error instanceof Error && error.message === 'Login service is currently unavailable. Please try again later.') {
      throw error;
    }

    throw new Error('Login service is currently unavailable. Please try again later.');
  }
};

export const getHealthFacts = async () => {
  // Replace this endpoint when the FastAPI route is available.
  return request('/api/v1/health-facts/', { method: 'GET' });
};

export const createHealthFact = async (payload) => {
  return request('/api/v1/health-facts/', {
    method: 'POST',
    body: payload,
    token: getStoredToken(),
  });
};

export const updateHealthFact = async (id, payload) => {
  return request(`/api/v1/health-facts/${id}`, {
    method: 'PUT',
    body: payload,
    token: getStoredToken(),
  });
};

export const deleteHealthFact = async (id) => {
  return request(`/api/v1/health-facts/${id}`, {
    method: 'DELETE',
    token: getStoredToken(),
  });
};

export const getMythFacts = async () => {
  // Replace this endpoint when the FastAPI route is available.
  return request('/api/v1/myth-facts/', { method: 'GET' });
};

export const createMythFact = async (payload) => {
  return request('/api/v1/myth-facts/', {
    method: 'POST',
    body: payload,
    token: getStoredToken(),
  });
};

export const updateMythFact = async (id, payload) => {
  return request(`/api/v1/myth-facts/${id}`, {
    method: 'PUT',
    body: payload,
    token: getStoredToken(),
  });
};

export const deleteMythFact = async (id) => {
  return request(`/api/v1/myth-facts/${id}`, {
    method: 'DELETE',
    token: getStoredToken(),
  });
};
