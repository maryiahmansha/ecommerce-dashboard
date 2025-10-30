import { useAuth } from '@/store/auth';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

export default function LoginPage() {
  const router = useRouter();
  const login = useAuth((state) => state.login);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (email === 'demo@demo.com' && password === 'password') {
      login();
      router.push('/dashboard');
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl w-full max-w-md transition-colors">
        <h1 className="text-2xl font-bold text-center mb-6">Welcome Back</h1>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div>
            <label className="text-sm font-medium">Email</label>
            <input
              type="email"
              className="w-full p-2 mt-1 border rounded-md dark:bg-gray-700 dark:border-gray-600"
              placeholder="demo@demo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label className="text-sm font-medium">Password</label>
            <input
              type="password"
              className="w-full p-2 mt-1 border rounded-md dark:bg-gray-700 dark:border-gray-600"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button>Sign In</button>
        </form>
        <p className="text-center text-sm text-gray-500 mt-4">
          Use: <b>demo@demo.com</b> / <b>password</b>
        </p>
      </div>
    </div>
  );
}
