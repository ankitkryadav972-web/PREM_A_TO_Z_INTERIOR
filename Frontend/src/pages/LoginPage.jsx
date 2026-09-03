import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Lock, User, ArrowRight, CheckCircle2, Shield, AlertCircle } from 'lucide-react';
import Container from '../components/common/Container.jsx';
import Button from '../components/common/Button.jsx';
import { useAuth } from '../context/AuthContext.jsx';

export const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!identifier.trim() || !password.trim()) {
      setError('Please enter your email or mobile and password.');
      return;
    }

    setError('');
    setIsSubmitting(true);

    try {
      const loggedInUser = await login({
        identifier: identifier.trim(),
        password: password.trim()
      });

      setSuccess(true);
      setTimeout(() => {
        if (loggedInUser?.role === 'admin') {
          navigate('/admin');
        } else {
          navigate('/');
        }
      }, 700);
    } catch (err) {
      setError(err.message || 'Invalid email/mobile or password.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleQuickFill = (role) => {
    if (role === 'admin') {
      setIdentifier('admin@premAtoZ.com');
      setPassword('AdminPassword@123');
    } else {
      setIdentifier('ramesh@example.com');
      setPassword('Customer@123');
    }
    setError('');
  };

  return (
    <div className="min-h-screen bg-[#0f0f11] text-[#e8e6e1] pt-32 pb-24 flex items-center justify-center">
      <Container size="sm">
        <div className="bg-[#17171a] p-8 sm:p-12 border border-white/10 shadow-2xl relative overflow-hidden">
          <div className="text-center mb-8">
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#c5a880] font-semibold block mb-2">
              Client Portal
            </span>
            <h1 className="font-editorial text-3xl sm:text-4xl font-normal text-white mb-2">
              Sign In to Your Account
            </h1>
            <p className="text-xs sm:text-sm text-stone-400 font-light">
              Connected live to the Prem A to Z Interior Design backend API.
            </p>
          </div>

          {/* Quick Demo Fill helper bar */}
          <div className="mb-6 p-3 bg-white/5 border border-white/10 flex items-center justify-between text-xs">
            <span className="text-stone-400 flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5 text-[#c5a880]" />
              Quick Fill:
            </span>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => handleQuickFill('customer')}
                className="text-[#c5a880] hover:underline cursor-pointer"
              >
                Customer
              </button>
              <span className="text-stone-600">|</span>
              <button
                type="button"
                onClick={() => handleQuickFill('admin')}
                className="text-[#c5a880] hover:underline cursor-pointer"
              >
                Admin
              </button>
            </div>
          </div>

          {error && (
            <div className="mb-6 p-3.5 bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {success && (
            <div className="mb-6 p-3.5 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>Login successful! Connecting to session...</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-xs uppercase tracking-wider text-stone-300 font-medium mb-2">
                Email or Mobile
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  placeholder="e.g. admin@premAtoZ.com or 9454107810"
                  className="w-full bg-[#0f0f11] text-white pl-10 pr-4 py-3 border border-white/10 focus:border-[#c5a880] focus:outline-none text-sm font-light transition-colors"
                />
                <User className="w-4 h-4 text-stone-500 absolute left-3.5 top-3.5" />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs uppercase tracking-wider text-stone-300 font-medium">
                  Password
                </label>
                <a
                  href="#forgot"
                  onClick={(e) => {
                    e.preventDefault();
                    alert('For password recovery, please call our studio at 9454107810.');
                  }}
                  className="text-xs text-[#c5a880] hover:underline"
                >
                  Forgot?
                </a>
              </div>
              <div className="relative">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-[#0f0f11] text-white pl-10 pr-4 py-3 border border-white/10 focus:border-[#c5a880] focus:outline-none text-sm font-light transition-colors"
                />
                <Lock className="w-4 h-4 text-stone-500 absolute left-3.5 top-3.5" />
              </div>
            </div>

            <div className="flex items-center">
              <input
                id="remember"
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 accent-[#c5a880] bg-[#0f0f11] border-white/20 rounded-none cursor-pointer"
              />
              <label htmlFor="remember" className="ml-2 text-xs text-stone-400 cursor-pointer">
                Keep me signed in on this device
              </label>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              disabled={isSubmitting}
              className="w-full justify-center"
              icon={ArrowRight}
            >
              {isSubmitting ? 'Authenticating...' : 'Sign In'}
            </Button>
          </form>

          <div className="mt-8 pt-6 border-t border-white/10 text-center text-xs text-stone-400">
            Don't have an account?{' '}
            <Link to="/register" className="text-[#c5a880] font-medium hover:underline">
              Create Client Account
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default LoginPage;
