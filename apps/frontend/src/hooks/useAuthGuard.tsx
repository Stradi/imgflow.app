import useAccountStore from '@/stores/AccountStore';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function useAuthGuard(redirectIfAuth: boolean, redirectUrl: string) {
  const pathname = usePathname();
  const router = useRouter();

  const { isAuthenticated } = useAccountStore((state) => ({
    isAuthenticated: state.isAuthenticated,
  }));

  useEffect(() => {
    if (redirectIfAuth) {
      if (isAuthenticated) {
        router.push(redirectUrl);
      }
    } else {
      if (!isAuthenticated) {
        router.push(redirectUrl);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);
}
