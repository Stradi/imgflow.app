import useAccountStore from '@/stores/AccountStore';

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

  useAccountStore.setState({
    isAuthenticated: true,
    user: {
      id: data['data']['user']['id'],
      email: data['data']['user']['email'],
    },
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
  const response = await fetch('http://localhost:3001/api/v1/account/create-account', {
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
  localStorage.setItem('refreshToken', data['data']['refreshToken']);
  localStorage.setItem('user', JSON.stringify(data['data']['user']));

  useAccountStore.setState({
    isAuthenticated: true,
    user: {
      id: data['data']['user']['id'],
      email: data['data']['user']['email'],
    },
  });

  return data;
}

type TRefreshTokenArgs = {
  refreshToken: string;
};

export async function refreshToken({ refreshToken }: TRefreshTokenArgs) {
  const response = await fetch('http://localhost:3001/api/v1/account/create-account', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
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

export async function logout() {
  useAccountStore.setState({
    isAuthenticated: false,
    user: null,
  });

  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
  localStorage.removeItem('user');
}
