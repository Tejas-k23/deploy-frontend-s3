const API_GET_URL = import.meta.env.VITE_API_GET_URL || '';

if (!API_GET_URL) {
  console.warn('VITE_API_GET_URL is not set');
}

async function handleResponse(response) {
  const text = await response.text();
  let data;
  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    throw new Error('Invalid JSON response from server');
  }

  if (!response.ok) {
    const message = data?.message || data?.error || `Request failed with status ${response.status}`;
    throw new Error(message);
  }

  return data;
}

/**
 * Fetches all properties from the API.
 * @returns {Promise<Array>} Array of property objects
 */
export async function getAllProperties() {
  const response = await fetch(`${API_GET_URL}/properties`);
  const data = await handleResponse(response);
  return Array.isArray(data) ? data : data?.items ?? [];
}

/**
 * Fetches a single property by ID.
 * @param {string} id - Property ID
 * @returns {Promise<Object>} Property object
 */
export async function getPropertyById(id) {
  if (!id) {
    throw new Error('Property ID is required');
  }
  const response = await fetch(`${API_GET_URL}/properties/${id}`);
  const data = await handleResponse(response);
  return data?.item ?? data;
}
