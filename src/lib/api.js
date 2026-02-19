const API_POST_URL = import.meta.env.VITE_API_POST_URL || 'https://h7337u3o2i.execute-api.eu-north-1.amazonaws.com/stage2';

export const getPresignedUrl = async (fileName, contentType) => {
  const response = await fetch(`${API_POST_URL}/uploads/presign`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ fileName, contentType }),
  });

  if (!response.ok) {
    throw new Error('Failed to get presigned URL');
  }

  return response.json();
};

export const uploadFileToS3 = async (uploadUrl, file) => {
  const response = await fetch(uploadUrl, {
    method: 'PUT',
    headers: {
      'Content-Type': file.type,
    },
    body: file,
  });

  if (!response.ok) {
    throw new Error('Failed to upload file to S3');
  }

  return response;
};

export const createProperty = async (propertyData) => {
  const response = await fetch(`${API_POST_URL}/properties`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(propertyData),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || 'Failed to create property');
  }

  return response.json();
};
