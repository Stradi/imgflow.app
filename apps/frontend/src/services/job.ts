import { doAuthenticatedRequest } from './auth';

export async function getAllJobs(pipelineId: string) {
  const response = await doAuthenticatedRequest(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/pipeline/${pipelineId}/jobs`,
    {
      method: 'GET',
    }
  );

  if (response['error']) {
    throw new Error(response['error']);
  }

  return response;
}

export async function getJobDetails(id: string) {
  const response = await doAuthenticatedRequest(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/job/${id}`, {
    method: 'GET',
  });

  if (response['error']) {
    throw new Error(response['error']);
  }

  return response;
}

export async function getJobFiles(id: string) {
  const response = await doAuthenticatedRequest(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/job/${id}/files`, {
    method: 'GET',
  });

  if (response['error']) {
    throw new Error(response['error']);
  }

  return response;
}
