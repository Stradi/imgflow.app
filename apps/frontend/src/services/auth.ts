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
    refreshToken: string;
    user: {
      id: string;
      name: string;
      email: string;
    };
  } | null;
}> {
  const response = await fetch('http://localhost:3001/api/v1/account/login', {
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
  localStorage.setItem('refreshToken', data['data']['refreshToken']);
  localStorage.setItem('user', JSON.stringify(data['data']['user']));

  return {
    error: null,
    data: data['data'],
  };
}

type TRegisterArgs = {
  email: string;
  password: string;
};

export async function register({ email, password }: TRegisterArgs) {
  const response = await fetch('http://localhost:3001/api/v1/account/create-account', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json();

  if (data['error']) {
    throw new Error(data['error']);
  }

  return data;
}

type TRefreshTokenArgs = {
  refreshToken: string;
};

export async function refreshToken({ refreshToken }: TRefreshTokenArgs) {
  const response = await fetch('http://localhost:3001/api/v1/account/create-account', {
    method: 'POST',
    body: JSON.stringify({ refreshToken }),
  });

  const data = await response.json();

  if (data['error']) {
    throw new Error(data['error']);
  }

  localStorage.setItem('accessToken', data['data']['accessToken']);
  localStorage.setItem('refreshToken', data['data']['refreshToken']);

  return data;
}
