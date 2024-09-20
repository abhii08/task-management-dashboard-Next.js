'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await signIn('credentials', {
      redirect: false,
      email,
      password,
    });

    if (result?.error) {
      console.error(result.error);
    } else {
      router.push('/dashboard');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <Input
          label='email'
          type="email"
          value={email}
          onChange={(e:any) => setEmail(e)}
          placeholder="Email"
          className="mb-4"
          required
        />
        <Input
          label='password'
          type="password"
          value={password}
          onChange={(e:any) => setPassword(e)}
          placeholder="Password"
          className="mb-4"
          required
        />
        <Button type="submit" className="w-full" onClick={handleSubmit}>
          Login
        </Button>
      </form>
    </div>
  );
}
