import useAuthStore from '@/stores/AuthStore';

type TLoginArgs = {
  email: string;
  password: string;
};

export const LoginErrors = {
  EMAIL_NOT_FOUND: 'EMAIL_NOT_FOUND',
  INVALID_PASSWORD: 'INVALID_PASSWORD',
};

export async function login({ email, password }: TLoginArgs): Promise<{
  error: string | null;
  data: {
    accessToken: string;
    user: {
      id: string;
      name: string;
      email: string;
    };
  } | null;
}> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/account/login`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json();

  if (data['error']) {
    if (data['error'] === "User doesn't exist") {
      return {
        error: LoginErrors.EMAIL_NOT_FOUND,
        data: null,
      };
    } else if (data['error'] === 'Invalid password') {
      return {
        error: LoginErrors.INVALID_PASSWORD,
        data: null,
      };
    } else {
      throw new Error(data['error']);
    }
  }

  localStorage.setItem('accessToken', data['data']['accessToken']);
  const stateLogin = useAuthStore.getState().login;
  stateLogin({
    id: data['data']['user']['id'],
    email: data['data']['user']['email'],
    accessToken: data['data']['accessToken'],
  });

  return {
    error: null,
    data: data['data'],
  };
}

type TCreateAccountArgs = {
  email: string;
  password: string;
};

export const CreateAccountErrors = {
  EMAIL_ALREADY_EXIST: 'EMAIL_ALREADY_EXIST',
};

export async function createAccount({ email, password }: TCreateAccountArgs) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/account/create-account`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json();

  if (data['error']) {
    if (data['error'] === 'Email already exists') {
      return {
        error: CreateAccountErrors.EMAIL_ALREADY_EXIST,
        data: null,
      };
    } else {
      throw new Error(data['error']);
    }
  }

  localStorage.setItem('accessToken', data['data']['accessToken']);
  const stateLogin = useAuthStore.getState().login;
  stateLogin({
    id: data['data']['user']['id'],
    email: data['data']['user']['email'],
    accessToken: data['data']['accessToken'],
  });

  return data;
}

export async function logout() {
  localStorage.removeItem('accessToken');
}

export async function doAuthenticatedRequest(url: string, options: RequestInit): Promise<any> {
  const accessToken = localStorage.getItem('accessToken');

  if (!accessToken) {
    throw new Error('No access token');
  }

  const response = await fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const data = await response.json();

  if (data['error']) {
    throw new Error(data['error']);
  }

  return data;
}

export async function getUsage() {
  const response = await doAuthenticatedRequest(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/account/usage`, {
    method: 'GET',
  });

  if (response['error']) {
    throw new Error(response['error']);
  }

  return response['data'];
}

export async function getCredits() {
  const response = await doAuthenticatedRequest(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/account/credits`, {
    method: 'GET',
  });

  if (response['error']) {
    throw new Error(response['error']);
  }

  return response['data'];
}

export async function unsubscribe() {
  const response = await doAuthenticatedRequest(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/account/subscription`, {
    method: 'DELETE',
  });

  if (response['error']) {
    throw new Error(response['error']);
  }

  return response['data'];
}

export async function changeSubscriptionPlan(oldPlan: string, newPlan: string) {
  const response = await doAuthenticatedRequest(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/account/subscription`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      variant: newPlan,
      fromVariant: oldPlan,
    }),
  });

  if (response['error']) {
    throw new Error(response['error']);
  }

  return response['data'];
}
