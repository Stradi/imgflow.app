import { doAuthenticatedRequest } from './auth';

export async function getAllJobs() {
  const response = await doAuthenticatedRequest(`http://localhost:3001/api/v1/job`, {
    method: 'GET',
  });

  if (response['error']) {
    throw new Error(response['error']);
  }

  return response;
}

export async function getJobDetails(id: string) {
  const response = await doAuthenticatedRequest(`http://localhost:3001/api/v1/job/${id}`, {
    method: 'GET',
  });

  if (response['error']) {
    throw new Error(response['error']);
  }

  return response;
}
