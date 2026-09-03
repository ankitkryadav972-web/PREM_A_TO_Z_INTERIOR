import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Phone, Lock, ArrowRight, CheckCircle2, AlertCircle } from 'lucide-react';
import Container from '../components/common/Container.jsx';
import Button from '../components/common/Button.jsx';
import { useAuth } from '../context/AuthContext.jsx';

export const RegisterPage = () => {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    const errs = {};

    if (!formData.name.trim()) errs.name = 'Full name is required';
    if (!formData.email.trim() || !/^\S+@\S+\.\S+$/.test(formData.email.trim())) {
      errs.email = 'Valid email address is required';
    }
    if (!formData.mobile.trim() || !/^[6-9]\d{9}$/.test(formData.mobile.trim())) {
      errs.mobile = 'Valid 10-digit Indian mobile number is required (starts with 6-9)';
    }
    if (!formData.password || formData.password.length < 6) {
      errs.password = 'Password must be at least 6 characters long';
    }
    if (formData.password !== formData.confirmPassword) {
      errs.confirmPassword = 'Passwords do not match';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError('');

    if (!validate()) return;

    setIsSubmitting(true);

    try {
      await register({
        name: formData.name.trim(),
        email: formData.email.trim().toLowerCase(),
        mobile: formData.mobile.trim(),
        password: formData.password,
        confirmPassword: formData.confirmPassword
      });

      setIsSuccess(true);
      setTimeout(() => {
        navigate('/');
      }, 1000);
    } catch (err) {
      setServerError(err.message || 'Registration failed. Please check inputs.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0f0f11] text-[#e8e6e1] pt-32 pb-24 flex items-center justify-center">
      <Container size="sm">
        <div className="bg-[#17171a] p-8 sm:p-12 border border-white/10 shadow-2xl relative overflow-hidden">
          <div className="text-center mb-8">
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#c5a880] font-semibold block mb-2">
              Registration
            </span>
            <h1 className="font-editorial text-3xl sm:text-4xl font-normal text-white mb-2">
              Create Client Account
            </h1>
            <p className="text-xs sm:text-sm text-stone-400 font-light">
              Connected to live Prem A to Z Interior Design backend database.
            </p>
          </div>

          {serverError && (
            <div className="mb-6 p-3.5 bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{serverError}</span>
            </div>
          )}

          {isSuccess && (
            <div className="mb-6 p-4 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs flex items-center gap-2.5">
              <CheckCircle2 className="w-5 h-5 shrink-0" />
              <span>Registration successful! Redirecting to studio...</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            {/* Name */}
            <div>
              <label className="block text-xs uppercase tracking-wider text-stone-300 font-medium mb-1.5">
                Full Name
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Ramesh Kumar"
                  className="w-full bg-[#0f0f11] text-white pl-10 pr-4 py-3 border border-white/10 focus:border-[#c5a880] focus:outline-none text-sm font-light"
                />
                <User className="w-4 h-4 text-stone-500 absolute left-3.5 top-3.5" />
              </div>
              {errors.name && <p className="text-xs text-red-400 mt-1">{errors.name}</p>}
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs uppercase tracking-wider text-stone-300 font-medium mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="e.g. ramesh@example.com"
                  className="w-full bg-[#0f0f11] text-white pl-10 pr-4 py-3 border border-white/10 focus:border-[#c5a880] focus:outline-none text-sm font-light"
                />
                <Mail className="w-4 h-4 text-stone-500 absolute left-3.5 top-3.5" />
              </div>
              {errors.email && <p className="text-xs text-red-400 mt-1">{errors.email}</p>}
            </div>

            {/* Mobile */}
            <div>
              <label className="block text-xs uppercase tracking-wider text-stone-300 font-medium mb-1.5">
                Mobile Number
              </label>
              <div className="relative">
                <input
                  type="tel"
                  value={formData.mobile}
                  onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                  placeholder="e.g. 9876543210"
                  className="w-full bg-[#0f0f11] text-white pl-10 pr-4 py-3 border border-white/10 focus:border-[#c5a880] focus:outline-none text-sm font-light"
                />
                <Phone className="w-4 h-4 text-stone-500 absolute left-3.5 top-3.5" />
              </div>
              {errors.mobile && <p className="text-xs text-red-400 mt-1">{errors.mobile}</p>}
            </div>

            {/* Password & Confirm */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs uppercase tracking-wider text-stone-300 font-medium mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <input
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    placeholder="••••••••"
                    className="w-full bg-[#0f0f11] text-white pl-10 pr-4 py-3 border border-white/10 focus:border-[#c5a880] focus:outline-none text-sm font-light"
                  />
                  <Lock className="w-4 h-4 text-stone-500 absolute left-3.5 top-3.5" />
                </div>
                {errors.password && <p className="text-xs text-red-400 mt-1">{errors.password}</p>}
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-stone-300 font-medium mb-1.5">
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    type="password"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    placeholder="••••••••"
                    className="w-full bg-[#0f0f11] text-white pl-10 pr-4 py-3 border border-white/10 focus:border-[#c5a880] focus:outline-none text-sm font-light"
                  />
                  <Lock className="w-4 h-4 text-stone-500 absolute left-3.5 top-3.5" />
                </div>
                {errors.confirmPassword && (
                  <p className="text-xs text-red-400 mt-1">{errors.confirmPassword}</p>
                )}
              </div>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              disabled={isSubmitting}
              className="w-full justify-center mt-2"
              icon={ArrowRight}
            >
              {isSubmitting ? 'Registering...' : 'Create Account'}
            </Button>
          </form>

          <div className="mt-8 pt-6 border-t border-white/10 text-center text-xs text-stone-400">
            Already have an account?{' '}
            <Link to="/login" className="text-[#c5a880] font-medium hover:underline">
              Sign In Here
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default RegisterPage;
