/**
 * API Service Layer - Connected to PREM A TO Z REST API Backend
 * 
 * Communicates with backend endpoints as specified in backend.md.
 * Gracefully merges live MongoDB data with local fallbacks.
 */

import { servicesData } from '../data/services.js';
import { productsData } from '../data/products.js';
import { projectsData } from '../data/projects.js';
import { testimonialsData } from '../data/testimonials.js';
import { businessInfo } from '../data/business.js';

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';
export const USE_REAL_API = true; // Connected directly to live Express backend

// Helper to get stored auth token
export const getAuthToken = () => {
  return localStorage.getItem('prem_token') || '';
};

// Helper for standard JSON headers
const getHeaders = (includeAuth = false) => {
  const headers = {
    'Content-Type': 'application/json'
  };
  if (includeAuth) {
    const token = getAuthToken();
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
  }
  return headers;
};

export const apiService = {
  // 1. AUTHENTICATION
  async register(userData) {
    const res = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(userData)
    });
    const json = await res.json();
    if (!res.ok) {
      throw new Error(json.message || 'Registration failed');
    }
    return json.data;
  },

  async login(credentials) {
    const res = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(credentials)
    });
    const json = await res.json();
    if (!res.ok) {
      throw new Error(json.message || 'Login failed');
    }
    return json.data;
  },

  async getMe() {
    const token = getAuthToken();
    if (!token) return null;
    const res = await fetch(`${API_BASE_URL}/auth/me`, {
      headers: getHeaders(true)
    });
    const json = await res.json();
    if (!res.ok) {
      throw new Error(json.message || 'Failed to fetch current user');
    }
    return json.data;
  },

  async logout() {
    try {
      await fetch(`${API_BASE_URL}/auth/logout`, {
        method: 'POST',
        headers: getHeaders(true)
      });
    } catch {
      // Client-side logout proceeds even if network fails
    }
  },

  // 2. SERVICES
  async getServices() {
    if (USE_REAL_API) {
      try {
        const res = await fetch(`${API_BASE_URL}/services`);
        if (res.ok) {
          const json = await res.json();
          if (Array.isArray(json.data) && json.data.length > 0) {
            return json.data;
          }
        }
      } catch (err) {
        console.warn('[API] Could not fetch live services, using default catalog:', err.message);
      }
    }
    return servicesData;
  },

  async getServiceBySlug(slug) {
    if (USE_REAL_API) {
      try {
        const res = await fetch(`${API_BASE_URL}/services/${slug}`);
        if (res.ok) {
          const json = await res.json();
          return json.data.service;
        }
      } catch (err) {
        console.warn('[API] Service slug lookup failed, using local data:', err.message);
      }
    }
    return servicesData.find((s) => s.slug === slug) || null;
  },

  // 3. PRODUCTS
  async getProducts(category = 'All') {
    if (USE_REAL_API) {
      try {
        const query = category && category !== 'All' ? `?category=${encodeURIComponent(category)}` : '';
        const res = await fetch(`${API_BASE_URL}/products${query}`);
        if (res.ok) {
          const json = await res.json();
          if (Array.isArray(json.data) && json.data.length > 0) {
            return json.data;
          }
        }
      } catch (err) {
        console.warn('[API] Could not fetch live products, using fallback:', err.message);
      }
    }
    if (category === 'All') return productsData;
    return productsData.filter((p) => p.category.toLowerCase() === category.toLowerCase());
  },

  // 4. GALLERY / PORTFOLIO
  async getGallery(category = 'All') {
    if (USE_REAL_API) {
      try {
        const query = category && category !== 'All' ? `?category=${encodeURIComponent(category)}` : '';
        const res = await fetch(`${API_BASE_URL}/gallery${query}`);
        if (res.ok) {
          const json = await res.json();
          if (Array.isArray(json.data) && json.data.length > 0) {
            return json.data;
          }
        }
      } catch (err) {
        console.warn('[API] Could not fetch live gallery, using fallback:', err.message);
      }
    }
    if (category === 'All') return projectsData;
    return projectsData.filter((p) => p.category.toLowerCase() === category.toLowerCase());
  },

  // 5. TESTIMONIALS
  async getTestimonials() {
    if (USE_REAL_API) {
      try {
        const res = await fetch(`${API_BASE_URL}/testimonials`);
        if (res.ok) {
          const json = await res.json();
          if (Array.isArray(json.data) && json.data.length > 0) {
            return json.data;
          }
        }
      } catch (err) {
        console.warn('[API] Could not fetch live testimonials, using fallback:', err.message);
      }
    }
    return testimonialsData;
  },

  // 6. SITE SETTINGS
  async getPublicSettings() {
    if (USE_REAL_API) {
      try {
        const res = await fetch(`${API_BASE_URL}/settings/public`);
        if (res.ok) {
          const json = await res.json();
          return json.data;
        }
      } catch (err) {
        console.warn('[API] Settings fetch error:', err.message);
      }
    }
    return {
      businessName: businessInfo.name,
      phones: businessInfo.phones,
      whatsAppNumbers: businessInfo.whatsappNumbers,
      address: businessInfo.address
    };
  },

  // 7. SUBMIT ENQUIRY
  async submitEnquiry(enquiryData) {
    if (USE_REAL_API) {
      const res = await fetch(`${API_BASE_URL}/enquiries`, {
        method: 'POST',
        headers: getHeaders(true), // Attaches Bearer token if logged in
        body: JSON.stringify(enquiryData)
      });
      const json = await res.json();
      if (!res.ok) {
        throw new Error(json.message || 'Failed to submit enquiry');
      }
      return json;
    }
    return {
      success: true,
      message: 'Enquiry submitted successfully',
      data: { enquiry: { ...enquiryData, status: 'new' } }
    };
  },

  // 8. ADMIN DASHBOARD & ENQUIRY TRIAGE
  async getDashboardStats() {
    const res = await fetch(`${API_BASE_URL}/admin/dashboard`, {
      headers: getHeaders(true)
    });
    const json = await res.json();
    if (!res.ok) {
      throw new Error(json.message || 'Failed to fetch admin stats');
    }
    return json.data;
  },

  async getAllEnquiries(params = {}) {
    const query = new URLSearchParams(params).toString();
    const res = await fetch(`${API_BASE_URL}/enquiries${query ? `?${query}` : ''}`, {
      headers: getHeaders(true)
    });
    const json = await res.json();
    if (!res.ok) {
      throw new Error(json.message || 'Failed to fetch enquiries');
    }
    return json;
  },

  async updateEnquiryStatus(id, status) {
    const res = await fetch(`${API_BASE_URL}/enquiries/${id}`, {
      method: 'PATCH',
      headers: getHeaders(true),
      body: JSON.stringify({ status })
    });
    const json = await res.json();
    if (!res.ok) {
      throw new Error(json.message || 'Failed to update status');
    }
    return json.data;
  }
};

export default apiService;
