'use client';

import { Button, buttonVariants } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import useAuthGuard from '@/hooks/useAuthGuard';
import { CreateAccountErrors, createAccount } from '@/services/auth';
import { TErrorTypes, getErrorMessage } from '@/utils/errorMessages';
import { motion } from 'framer-motion';
import { Loader2Icon } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

const Page = () => {
  useAuthGuard(true, '/dashboard');

  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();

  async function onSubmit(data: any) {
    setIsLoading(true);

    try {
      const resp = await createAccount({
        email: data.email,
        password: data.password,
      });

      if (resp.error) {
        if (resp.error === CreateAccountErrors.EMAIL_ALREADY_EXIST) {
          setError('email', {
            type: 'alreadyExists',
          });
        } else {
          throw resp.error;
        }
      } else {
        router.push('/dashboard');
      }
    } catch (err: any) {
      console.error(err);
      setError('custom', {});
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="w-screen h-screen bg-gray-50 grid md:grid-cols-2 items-center justify-center">
      <div className="w-full relative h-full hidden md:block">
        <img
          src="https://picsum.photos/1024/1024"
          className="absolute inset-0 w-full h-full object-cover"
          alt="Some image"
        />
      </div>
      <motion.div
        className="w-full max-w-sm mx-auto"
        initial={{ opacity: 0, y: '100px' }}
        animate={{ opacity: 1, y: '0px' }}
        exit={{ opacity: 0, y: '-100px' }}
      >
        <h1 className="text-xl font-medium my-4">Create a new account</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" disabled={isLoading} {...register('email', { required: true })} />
            {errors.email && (
              <span className="text-red-500 text-xs font-medium">
                {getErrorMessage('email', errors.email.type as TErrorTypes)}
              </span>
            )}
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              disabled={isLoading}
              {...register('password', { required: true, minLength: 8 })}
            />
            {errors.password && (
              <span className="text-red-500 text-xs font-medium">
                {getErrorMessage('password', errors.password.type as TErrorTypes)}
              </span>
            )}
          </div>
          {errors.custom && (
            <span className="text-red-500 text-xs font-medium">{getErrorMessage('custom', 'default')}</span>
          )}
          <Button type="submit" disabled={isLoading}>
            {isLoading && <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />}
            Sign Up
          </Button>
          <Link className={buttonVariants({ variant: 'link', size: 'sm' })} href="/login">
            Already have an account?
          </Link>
        </form>
      </motion.div>
    </div>
  );
};

export default Page;
