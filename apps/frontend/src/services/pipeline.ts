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

export async function getPipelineById(id: string) {
  const response = await doAuthenticatedRequest(`http://localhost:3001/api/v1/pipeline/${id}`, {
    method: 'GET',
  });

  if (response['error']) {
    throw new Error(response['error']);
  }

  return response;
}

export async function savePipeline(id: string, name: string, dataJson: string) {
  const response = await doAuthenticatedRequest(`http://localhost:3001/api/v1/pipeline/${id}`, {
    method: 'PUT',
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

export async function deletePipeline(id: string) {
  const response = await doAuthenticatedRequest(`http://localhost:3001/api/v1/pipeline/${id}`, {
    method: 'DELETE',
  });

  if (response['error']) {
    throw new Error(response['error']);
  }

  return response;
}

export async function runPipeline(id: string, files: File[]) {
  const formData = new FormData();
  for (const file of files) {
    formData.append('images', file);
  }

  const response = await doAuthenticatedRequest(`http://localhost:3001/api/v1/pipeline/${id}/run`, {
    method: 'POST',
    body: formData,
  });

  if (response['error']) {
    throw new Error(response['error']);
  }

  return response;
}

export async function getJobStatus(jobId: string) {
  const response = await doAuthenticatedRequest(`http://localhost:3001/api/v1/poll/${jobId}`, {
    method: 'GET',
  });

  if (response['error']) {
    throw new Error(response['error']);
  }

  return response;
}
