import { doAuthenticatedRequest } from './auth';

export async function getAllPipelines() {
  const response = await doAuthenticatedRequest('http://localhost:3001/api/v1/pipeline', {
    method: 'GET',
  });

  return response;
}
