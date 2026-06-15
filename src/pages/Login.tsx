import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { API_BASE_URL } from '../api/config';
import { Leaf } from 'lucide-react';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        login(data);
        navigate('/');
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (err) {
      setError('Failed to connect to server');
    }
  };

  return (
    <div className="min-h-screen bg-nature-bg flex flex-col justify-center items-center py-12 sm:px-6 lg:px-8 relative overflow-hidden font-sans">
      {/* Background Accents */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-nature-primary/5 rounded-full blur-[120px] -mr-64 -mt-64" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-nature-accent/20 rounded-full blur-[120px] -ml-64 -mb-64" />

      {/* Brand Logo */}
      <div className="relative z-10 mb-10 text-center">
        <Link to="/" className="inline-flex items-center gap-3">
          <div className="bg-nature-heading p-2 rounded-xl">
            <Leaf className="h-6 w-6 text-white" />
          </div>
          <span className="text-2xl font-black text-nature-heading tracking-tighter">EcoMatch</span>
        </Link>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-[440px] relative z-10 px-4">
        <div className="bg-white px-10 py-12 shadow-[0_32px_64px_-16px_rgba(45,64,32,0.1)] rounded-[3rem] border border-nature-sage/10">
          
           <div className="text-center mb-10">
            <h2 className="text-3xl font-black text-nature-heading mb-3 tracking-tight">
              Welcome Back
            </h2>
            <p className="text-sm text-nature-primary font-bold opacity-60 uppercase tracking-widest">
               Your impact journey continues
            </p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-50 border border-red-100 text-red-600 px-4 py-3 rounded-2xl text-xs font-bold text-center" role="alert">
                {error}
              </div>
            )}

            <div>
              <label className="block text-[10px] font-black text-nature-sage uppercase tracking-[0.2em] mb-2 ml-1">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder="hello@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-field"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-2 ml-1">
                <label className="block text-[10px] font-black text-nature-sage uppercase tracking-[0.2em]">
                  Password
                </label>
                <button type="button" disabled title="Coming soon" className="text-[10px] font-black text-nature-primary uppercase tracking-widest opacity-40 cursor-not-allowed">
                  Forgot?
                </button>
              </div>
              <input
                id="password"
                name="password"
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-field"
              />
            </div>

            <div>
              <button
                type="submit"
                className="w-full btn-primary py-4 text-xs font-black uppercase tracking-[0.2em] hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                Sign In
              </button>
            </div>

            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-nature-sage/10"></div>
              </div>
              <div className="relative flex justify-center text-[10px]">
                <span className="px-4 bg-white text-nature-sage font-black uppercase tracking-widest">social login — coming soon</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button type="button" disabled title="Coming soon" className="flex items-center justify-center bg-white border border-nature-sage/20 py-3 rounded-2xl opacity-50 cursor-not-allowed">
                <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="h-5 w-5 grayscale" alt="Google" />
              </button>
               <button type="button" disabled title="Coming soon" className="flex items-center justify-center bg-white border border-nature-sage/20 py-3 rounded-2xl opacity-50 cursor-not-allowed">
                <svg className="h-5 w-5 text-nature-heading opacity-40" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M13.025 1c-1.096 0-2.316.634-3.195 1.634-.847.962-1.464 2.457-1.464 4.148 0 1.954 1.354 4.09 3.09 4.09 1.144 0 2.404-.707 3.253-1.742.848-1.036 1.343-2.566 1.343-4.137 0-1.99-1.39-4-3.027-4zm6.052 14.88c-1.354 2.122-2.766 4.195-4.996 4.195-1.954 0-2.585-1.353-4.835-1.353-2.28 0-2.983 1.323-4.865 1.323-2.14 0-3.696-2.23-5.016-4.48-2.618-4.468-2.103-10.998 2.768-11.23 2.073-.11 3.515 1.474 4.606 1.474 1.05 0 2.972-1.777 5.006-1.574 1.06.07 3.515.657 5.097 2.94-4.32 2.373-3.605 9.07 1.107 10.99 0 0-.696 2.01-1.867 3.71z"/>
                </svg>
              </button>
            </div>

             <div className="text-center mt-10">
               <span className="text-nature-primary text-xs font-bold opacity-60">New to EcoMatch? </span>
               <Link to="/register" className="text-xs font-black text-nature-heading hover:text-nature-primary underline decoration-nature-primary/30 underline-offset-4 transition-all">
                  Join the movement
                </Link>
             </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
