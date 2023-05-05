import { doAuthenticatedRequest } from './auth';

export async function getAllJobs(pipelineId: string) {
  const response = await doAuthenticatedRequest(`http://localhost:3001/api/v1/pipeline/${pipelineId}/jobs`, {
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

export async function getJobFiles(id: string) {
  const response = await doAuthenticatedRequest(`http://localhost:3001/api/v1/job/${id}/files`, {
    method: 'GET',
  });

  if (response['error']) {
    throw new Error(response['error']);
  }

  return response;
}
