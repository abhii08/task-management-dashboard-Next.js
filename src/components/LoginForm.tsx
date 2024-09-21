'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

export default function LoginForm() {
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
    <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <Input
        type="email"
        value={email}
        onChange={(value: string) => setEmail(value)}
        placeholder="Email"
        className="mb-4"
        required
      />
      <Input
        type="password"
        value={password}
        onChange={(value: string) => setPassword(value)}
        placeholder="Password"
        className="mb-4"
        required
      />
      <Button type="submit" className="w-full">
        Login
      </Button>
    </form>
  );
}