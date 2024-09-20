'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password }),
    });

    if (response.ok) {
      router.push('/auth/login');
    } else {
      console.error('Registration failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Register</h2>
        <Input
          label='Name'
          type="text"
          value={name}
          onChange={(e:any) => setName(e)}
          placeholder="Name"
          className="mb-4"
          required
        />
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
          Register
        </Button>
      </form>
    </div>
  );
}