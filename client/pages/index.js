import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';


export default function Register() {
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const [error, setError] = useState('');
  const router = useRouter();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      await axios.post('http://localhost:5000/auth/register', formData);
      router.push('/login');
    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-400 via-cyan-300 to-teal-400 px-4">
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 w-full max-w-md p-8">
        <h2 className="text-3xl font-bold text-center text-blue-700 mb-8">Registration Form</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <input
              name="username"
              type="text"
              placeholder="Name"
              value={formData.username}
              onChange={handleChange}
              className="w-full border-b-2 border-gray-300 focus:border-blue-500 focus:outline-none py-2 px-1 placeholder-gray-500"
              required
            />
          </div>

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

          <div className="flex items-center mb-6">
            <input
              id="terms"
              type="checkbox"
              required
              className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="terms" className="ml-2 text-sm text-gray-600">
              I accept terms & conditions
            </label>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-full font-semibold hover:bg-blue-700 transition duration-200"
          >
            Create Account
          </button>

          {error && (
            <p className="mt-4 text-center text-sm text-red-500">
              {error}
            </p>
          )}

          <p className="text-sm text-center mt-6 text-gray-600">
            Already have an account?{' '}
            <span
              onClick={() => router.push('/login')}
              className="text-blue-700 font-semibold cursor-pointer hover:underline"
            >
              Sign In
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}
