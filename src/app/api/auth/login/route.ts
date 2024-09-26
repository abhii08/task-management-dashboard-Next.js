  import { NextRequest, NextResponse } from 'next/server';
  import bcrypt from 'bcryptjs';
  import { connectToDatabase } from '@/lib/db';
  import User from '@/models/User';
  import { signIn } from 'next-auth/react';

  export async function POST(request: NextRequest) {
    const { email, password } = await request.json();

    await connectToDatabase();

    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 400 });
    }

    // Use NextAuth's signIn method
  const result = await signIn('credentials', {
    redirect: false,
    email,
    password,
  });

  if (result?.error) {
    return NextResponse.json({ error: result.error }, { status: 400 });
  }

  // Return the session data or redirect based on your application's flow
  return NextResponse.json({ message: 'Logged in successfully' });
  }