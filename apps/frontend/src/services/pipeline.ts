import { doAuthenticatedRequest } from './auth';

export async function getAllPipelines() {
  const response = await doAuthenticatedRequest('http://localhost:3001/api/v1/pipeline', {
    method: 'GET',
  });

  return response;
}

export async function createNewPipeline(name: string, dataJson: string) {
  const response = await doAuthenticatedRequest('http://localhost:3001/api/v1/pipeline', {
    method: 'POST',
    body: JSON.stringify({ name, dataJson }),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });

  if (response['error']) {
    throw new Error(response['error']);
  }

  return response;
}
