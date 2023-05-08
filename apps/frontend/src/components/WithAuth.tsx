import { doAuthenticatedRequest } from '@/services/auth';
import useAuthStore, { TUser } from '@/stores/AuthStore';
import { Loader2Icon } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { useCallback, useEffect } from 'react';

export type TWithAuthProps = {
  user: TUser;
};

const HOME_ROUTE = '/dashboard';
const LOGIN_ROUTE = '/login';

const ROUTE_ROLES = [
  'auth', // For authentication pages e.g. /login, /register
  'optional', // It doesn't push to login page if user is not authenticated
  'all', // For all authenticated users, will push to login if user is not authenticated
] as const;

type TRouteRole = (typeof ROUTE_ROLES)[number];

export default function withAuth<T extends TWithAuthProps = TWithAuthProps>(
  Component: React.ComponentType<T>,
  routeRole: TRouteRole
) {
  const ComponentWithAuth = (props: Omit<T, keyof TWithAuthProps>) => {
    const router = useRouter();
    const queryParams = useSearchParams();
    const pathname = usePathname();

    const [isAuthenticated, isLoading, login, logout, stopLoading, user] = useAuthStore((state) => [
      state.isAuthenticated,
      state.isLoading,
      state.login,
      state.logout,
      state.stopLoading,
      state.user,
    ]);

    const checkAuth = useCallback(() => {
      const accessToken = localStorage.getItem('accessToken');
      if (!accessToken) {
        isAuthenticated && logout();
        stopLoading();
        return;
      }

      const loadUser = async () => {
        try {
          const response = await doAuthenticatedRequest(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/account/me`, {
            method: 'GET',
          });

          login({
            id: response.data.user.id,
            email: response.data.user.email,
            accessToken: accessToken + '',
          });
        } catch (error) {
          localStorage.removeItem('accessToken');
        } finally {
          stopLoading();
        }
      };

      if (!isAuthenticated) {
        loadUser();
      }
    }, [isAuthenticated, login, logout, stopLoading]);

    useEffect(() => {
      checkAuth();
      window.addEventListener('focus', checkAuth);

      return () => {
        window.removeEventListener('focus', checkAuth);
      };
    }, [checkAuth]);

    useEffect(() => {
      if (!isLoading) {
        if (isAuthenticated) {
          if (routeRole === 'auth') {
            if (queryParams && queryParams.get('redirect')) {
              router.replace(queryParams.get('redirect') + '');
            } else {
              router.replace(HOME_ROUTE);
            }
          }
        } else {
          if (routeRole !== 'auth' && routeRole !== 'optional') {
            router.replace(`${LOGIN_ROUTE}?redirect=${pathname}`);
          }
        }
      }
    }, [isAuthenticated, isLoading, queryParams, router, user, pathname]);

    if ((isLoading || !isAuthenticated) && routeRole !== 'auth' && routeRole !== 'optional') {
      return (
        <div className="flex min-h-screen flex-col items-center justify-center text-gray-800">
          <Loader2Icon className="mb-4 animate-spin text-4xl" />
          <p>Loading...</p>
        </div>
      );
    }

    return <Component {...(props as T)} user={user} />;
  };

  return ComponentWithAuth;
}
