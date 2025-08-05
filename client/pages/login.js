// pages/login.js
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

export default function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const router = useRouter();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await axios.post('http://localhost:5000/auth/login', formData);
      localStorage.setItem('token', res.data.token);
      router.push('/urlshortener');
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-400 via-cyan-300 to-teal-400 px-4">
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 w-full max-w-md p-8">
        <h2 className="text-3xl font-bold text-center text-blue-700 mb-8">Login</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <input
              name="email"
              type="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              className="w-full border-b-2 border-gray-300 focus:border-blue-500 focus:outline-none py-2 px-1 placeholder-gray-500"
              required
            />
          </div>

          <div className="mb-6">
            <input
              name="password"
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full border-b-2 border-gray-300 focus:border-blue-500 focus:outline-none py-2 px-1 placeholder-gray-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-full font-semibold hover:bg-blue-700 transition duration-200"
          >
            Login
          </button>

          {error && (
            <p className="mt-4 text-center text-sm text-red-500">
              {error}
            </p>
          )}

          <p className="text-sm text-center mt-6 text-gray-600">
            Don't have an account?{' '}
            <span
              onClick={() => router.push('/')}
              className="text-blue-700 font-semibold cursor-pointer hover:underline"
            >
              Register
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}
