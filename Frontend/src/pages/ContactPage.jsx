import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, MessageCircle, MapPin, Clock, Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { businessInfo } from '../data/business.js';
import { apiService } from '../services/api.js';
import { useAuth } from '../context/AuthContext.jsx';
import Container from '../components/common/Container.jsx';
import Button from '../components/common/Button.jsx';

const servicesList = [
  'General Consultation',
  'Doors',
  'Kitchen',
  'POP & False Ceiling',
  'Electrical Work',
  'Complete Furniture Work',
  'Complete Turnkey Interior'
];

export const ContactPage = () => {
  const [searchParams] = useSearchParams();
  const preselectedService = searchParams.get('service') || '';
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    name: user?.name || '',
    phone: user?.mobile || '',
    email: user?.email || '',
    service: preselectedService || 'General Consultation',
    message: ''
  });

  // Pre-fill if user logs in
  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        name: prev.name || user.name || '',
        phone: prev.phone || user.mobile || '',
        email: prev.email || user.email || ''
      }));
    }
  }, [user]);

  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Full name is required';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^[0-9+\-\s()]{7,15}$/.test(formData.phone.trim())) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    if (formData.email.trim() && !/^\S+@\S+\.\S+$/.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Please provide details regarding your project';
    } else if (formData.message.trim().length < 5) {
      newErrors.message = 'Message must be at least 5 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError('');

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      await apiService.submitEnquiry({
        name: formData.name.trim(),
        phone: formData.phone.trim(),
        email: formData.email.trim(),
        service: formData.service,
        message: formData.message.trim()
      });

      setIsSuccess(true);
      setFormData({
        name: user?.name || '',
        phone: user?.mobile || '',
        email: user?.email || '',
        service: 'General Consultation',
        message: ''
      });
      setErrors({});
    } catch (err) {
      setServerError(err.message || 'Failed to submit enquiry. Please try again or WhatsApp us.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0f0f11] text-[#e8e6e1] pt-28 pb-24">
      {/* Header */}
      <section className="py-12 md:py-20 border-b border-white/10 bg-[#141417]/50">
        <Container size="lg">
          <div className="max-w-3xl">
            <span className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[#c5a880] mb-3 block">
              Direct Inquiries
            </span>
            <h1 className="font-editorial text-4xl sm:text-5xl md:text-6xl font-normal text-white leading-[1.1] mb-6">
              Let's Connect and Discuss Your Project.
            </h1>
            <p className="text-stone-300 text-base sm:text-lg font-light leading-relaxed">
              Whether you need custom doors, a modular kitchen renovation, or a full turnkey home interior, our team in Gorakhpur is ready to assist you nationwide.
            </p>
          </div>
        </Container>
      </section>

      {/* Main Form & Contact Info Section */}
      <section className="py-16 md:py-24">
        <Container size="lg">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            {/* Left Column: Direct Contact Info & Workshop */}
            <div className="lg:col-span-5 flex flex-col justify-between">
              <div>
                <h3 className="font-editorial text-2xl sm:text-3xl font-normal text-white mb-6">
                  Workshop & Studio Details
                </h3>

                <p className="text-sm text-stone-300 font-light leading-relaxed mb-8">
                  We invite clients to review material samples, hardware mechanisms, and veneer finishes directly at our Gorakhpur facility.
                </p>

                <div className="space-y-6 mb-10">
                  {/* Phone */}
                  <a
                    href={businessInfo.telUrl}
                    className="flex items-start gap-4 p-4 bg-[#17171a] border border-white/5 hover:border-[#c5a880]/50 transition-colors group"
                  >
                    <div className="p-3 bg-white/5 border border-white/10 text-[#c5a880] group-hover:bg-[#c5a880] group-hover:text-[#0f0f11] transition-colors shrink-0">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="block text-xs uppercase tracking-wider text-stone-500 font-medium">
                        Primary Phone
                      </span>
                      <span className="text-base text-white font-medium">{businessInfo.phone}</span>
                    </div>
                  </a>

                  {/* Primary WhatsApp */}
                  <a
                    href={businessInfo.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-4 p-4 bg-[#17171a] border border-white/5 hover:border-emerald-500/50 transition-colors group"
                  >
                    <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 group-hover:bg-emerald-500 group-hover:text-white transition-colors shrink-0">
                      <MessageCircle className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="block text-xs uppercase tracking-wider text-stone-500 font-medium">
                        Primary WhatsApp (7458905073)
                      </span>
                      <span className="text-base text-white font-medium">Click to chat instantly</span>
                    </div>
                  </a>

                  {/* Secondary WhatsApp */}
                  <a
                    href={businessInfo.whatsappSecondaryUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-4 p-4 bg-[#17171a] border border-white/5 hover:border-emerald-500/50 transition-colors group"
                  >
                    <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 group-hover:bg-emerald-500 group-hover:text-white transition-colors shrink-0">
                      <MessageCircle className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="block text-xs uppercase tracking-wider text-stone-500 font-medium">
                        Secondary WhatsApp (9454107810)
                      </span>
                      <span className="text-base text-white font-medium">{businessInfo.whatsappSecondary}</span>
                    </div>
                  </a>

                  {/* Address */}
                  <div className="flex items-start gap-4 p-4 bg-[#17171a] border border-white/5">
                    <div className="p-3 bg-white/5 border border-white/10 text-[#c5a880] shrink-0">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="block text-xs uppercase tracking-wider text-stone-500 font-medium">
                        Workshop Address
                      </span>
                      <span className="text-sm text-stone-200">{businessInfo.address}</span>
                      <span className="block text-xs text-[#c5a880] mt-1 font-medium">
                        Service Area: {businessInfo.serviceArea}
                      </span>
                    </div>
                  </div>

                  {/* Hours */}
                  <div className="flex items-center gap-3 text-xs text-stone-400 font-light px-2">
                    <Clock className="w-4 h-4 text-[#c5a880]" />
                    <span>Operating Hours: {businessInfo.workingHours}</span>
                  </div>
                </div>
              </div>

              {/* Map Placeholder Graphic */}
              <div className="p-6 bg-[#17171a] border border-white/10 relative overflow-hidden">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs uppercase tracking-widest text-[#c5a880] font-semibold">
                    Location Verification
                  </span>
                  <a
                    href={businessInfo.mapSearchUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-stone-300 hover:text-white underline underline-offset-4"
                  >
                    Open in Maps
                  </a>
                </div>
                <p className="text-xs text-stone-400 font-light">
                  Located in Baharampur Urf Piprapur, Gorakhpur. Turnkey site measurements available on appointment.
                </p>
              </div>
            </div>

            {/* Right Column: Contact & Quote Form */}
            <div className="lg:col-span-7 bg-[#17171a] p-8 sm:p-12 border border-white/10">
              <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#c5a880] mb-2 block">
                Online Quotation Form
              </span>
              <h3 className="font-editorial text-2xl sm:text-3xl font-normal text-white mb-2">
                Send a Message or Project Request
              </h3>
              <p className="text-xs sm:text-sm text-stone-400 font-light leading-relaxed mb-8">
                Connected directly to Prem A to Z Interior Design backend lead pipeline.
              </p>

              {serverError && (
                <div className="mb-6 p-3.5 bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{serverError}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                {/* Full Name */}
                <div>
                  <label className="block text-xs uppercase tracking-wider text-stone-300 font-medium mb-2">
                    Your Name <span className="text-[#c5a880]">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Ramesh Kumar"
                    className={`w-full bg-[#0f0f11] text-white px-4 py-3.5 border focus:outline-none transition-colors text-sm font-light ${
                      errors.name ? 'border-red-500' : 'border-white/10 focus:border-[#c5a880]'
                    }`}
                  />
                  {errors.name && (
                    <p className="text-xs text-red-400 mt-1.5 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>{errors.name}</span>
                    </p>
                  )}
                </div>

                {/* Phone & Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-stone-300 font-medium mb-2">
                      Phone Number <span className="text-[#c5a880]">*</span>
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="e.g. 9876543210"
                      className={`w-full bg-[#0f0f11] text-white px-4 py-3.5 border focus:outline-none transition-colors text-sm font-light ${
                        errors.phone ? 'border-red-500' : 'border-white/10 focus:border-[#c5a880]'
                      }`}
                    />
                    {errors.phone && (
                      <p className="text-xs text-red-400 mt-1.5 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        <span>{errors.phone}</span>
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-stone-300 font-medium mb-2">
                      Email Address <span className="text-stone-500">(Optional)</span>
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. name@example.com"
                      className={`w-full bg-[#0f0f11] text-white px-4 py-3.5 border focus:outline-none transition-colors text-sm font-light ${
                        errors.email ? 'border-red-500' : 'border-white/10 focus:border-[#c5a880]'
                      }`}
                    />
                    {errors.email && (
                      <p className="text-xs text-red-400 mt-1.5 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        <span>{errors.email}</span>
                      </p>
                    )}
                  </div>
                </div>

                {/* Service Selection */}
                <div>
                  <label className="block text-xs uppercase tracking-wider text-stone-300 font-medium mb-2">
                    Service of Interest
                  </label>
                  <select
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    className="w-full bg-[#0f0f11] text-white px-4 py-3.5 border border-white/10 focus:border-[#c5a880] focus:outline-none transition-colors text-sm font-light"
                  >
                    {servicesList.map((srv) => (
                      <option key={srv} value={srv} className="bg-[#17171a] text-white">
                        {srv}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-xs uppercase tracking-wider text-stone-300 font-medium mb-2">
                    Project Details & Scope <span className="text-[#c5a880]">*</span>
                  </label>
                  <textarea
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Describe your space (e.g., 3BHK flat, kitchen renovation dimensions, false ceiling requirement in Gorakhpur...)"
                    className={`w-full bg-[#0f0f11] text-white px-4 py-3.5 border focus:outline-none transition-colors text-sm font-light resize-none ${
                      errors.message ? 'border-red-500' : 'border-white/10 focus:border-[#c5a880]'
                    }`}
                  />
                  {errors.message && (
                    <p className="text-xs text-red-400 mt-1.5 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>{errors.message}</span>
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <div>
                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    disabled={isSubmitting}
                    className="w-full justify-center"
                    icon={Send}
                  >
                    {isSubmitting ? 'Submitting to Backend...' : 'Submit Project Enquiry'}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </Container>
      </section>

      {/* Polished Success Confirmation Modal */}
      <AnimatePresence>
        {isSuccess && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSuccess(false)}
              className="fixed inset-0 bg-black/85 backdrop-blur-md z-40"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative z-50 bg-[#17171a] border border-[#c5a880]/50 p-8 sm:p-10 max-w-md w-full text-center shadow-2xl"
            >
              <div className="w-14 h-14 rounded-full bg-[#c5a880]/15 border border-[#c5a880] text-[#c5a880] flex items-center justify-center mx-auto mb-5">
                <CheckCircle2 className="w-7 h-7" />
              </div>

              <span className="text-[10px] uppercase tracking-[0.3em] text-[#c5a880] font-semibold block mb-2">
                Submission Confirmed
              </span>

              <h3 className="font-editorial text-2xl sm:text-3xl font-normal text-white mb-3">
                Lead Stored in Database
              </h3>

              <p className="text-sm text-stone-300 font-light leading-relaxed mb-6">
                Your request has been registered in the <strong>{businessInfo.name}</strong> system. Our interior design team will contact you shortly via phone or WhatsApp.
              </p>

              <div className="flex flex-col gap-2.5">
                <a
                  href={businessInfo.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 bg-[#25D366] text-white text-xs uppercase tracking-wider font-semibold flex items-center justify-center gap-2 hover:bg-[#22bf5b] transition-colors"
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                  <span>Connect Faster on WhatsApp</span>
                </a>

                <button
                  onClick={() => setIsSuccess(false)}
                  className="w-full py-2.5 text-xs uppercase tracking-wider text-stone-400 hover:text-white transition-colors"
                >
                  Dismiss
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ContactPage;
