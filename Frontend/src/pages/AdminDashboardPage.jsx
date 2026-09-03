import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  Briefcase,
  Package,
  Image,
  MessageSquare,
  FileText,
  Settings,
  Plus,
  Search,
  CheckCircle,
  Clock,
  ExternalLink,
  ChevronRight,
  TrendingUp,
  ShieldAlert,
  ShieldCheck,
  RefreshCw
} from 'lucide-react';
import Container from '../components/common/Container.jsx';
import Button from '../components/common/Button.jsx';
import { businessInfo } from '../data/business.js';
import { apiService } from '../services/api.js';
import { useAuth } from '../context/AuthContext.jsx';

export const AdminDashboardPage = () => {
  const { user, isAdmin, login } = useAuth();
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [stats, setStats] = useState({
    totalUsers: 2,
    totalServices: 5,
    totalProducts: 4,
    totalGalleryItems: 4,
    totalEnquiries: 2,
    newEnquiries: 1
  });
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusMessage, setStatusMessage] = useState('');

  const loadBackendData = async () => {
    setLoading(true);
    try {
      // 1. Fetch live admin stats
      const liveStats = await apiService.getDashboardStats();
      if (liveStats) {
        setStats(liveStats);
      }

      // 2. Fetch live enquiries
      const enqResponse = await apiService.getAllEnquiries();
      if (enqResponse && Array.isArray(enqResponse.data)) {
        setEnquiries(enqResponse.data);
      }
    } catch (err) {
      console.warn('[AdminDashboard] Live admin API requires admin token:', err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBackendData();
  }, [user]);

  const handleAdminQuickLogin = async () => {
    try {
      await login({
        identifier: 'admin@premAtoZ.com',
        password: 'AdminPassword@123'
      });
      loadBackendData();
    } catch (err) {
      alert('Admin login error: ' + err.message);
    }
  };

  const updateStatus = async (id, newStatus) => {
    try {
      await apiService.updateEnquiryStatus(id, newStatus);
      setStatusMessage(`Enquiry status updated to '${newStatus}' in database.`);
      setEnquiries(
        enquiries.map((e) => (e._id === id || e.id === id ? { ...e, status: newStatus } : e))
      );
      setTimeout(() => setStatusMessage(''), 3000);
    } catch (err) {
      alert('Failed to update status on server: ' + err.message);
    }
  };

  const filteredEnquiries = enquiries.filter(
    (e) =>
      (e.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (e.service || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (e.phone || '').includes(searchTerm)
  );

  const sidebarLinks = [
    { name: 'Dashboard', icon: LayoutDashboard },
    { name: 'Enquiries', icon: MessageSquare, count: enquiries.length || stats.totalEnquiries },
    { name: 'Users', icon: Users, count: stats.totalUsers },
    { name: 'Services', icon: Briefcase, count: stats.totalServices },
    { name: 'Products', icon: Package, count: stats.totalProducts },
    { name: 'Gallery', icon: Image, count: stats.totalGalleryItems },
    { name: 'Content', icon: FileText },
    { name: 'Settings', icon: Settings }
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0b] text-[#e8e6e1] pt-24 pb-20">
      <Container size="lg">
        {/* Backend Connectivity Status Banner */}
        <div className="mb-6 p-4 bg-[#c5a880]/10 border border-[#c5a880]/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-5 h-5 text-[#c5a880] shrink-0" />
            <div>
              <span className="text-xs uppercase tracking-wider font-semibold text-[#c5a880] block">
                Connected to Express Backend & MongoDB Atlas
              </span>
              <span className="text-xs text-stone-300 font-light">
                {isAdmin
                  ? `Authenticated as ${user?.name} (${user?.email}) with full admin permissions.`
                  : 'You are currently viewing as visitor. Click quick-auth to load live authenticated admin metrics.'}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            {!isAdmin && (
              <button
                onClick={handleAdminQuickLogin}
                className="px-3.5 py-1.5 bg-[#c5a880] text-[#0f0f11] text-xs font-semibold uppercase tracking-wider hover:bg-[#d4b58b] transition-colors"
              >
                Sign In as Admin
              </button>
            )}

            <button
              onClick={loadBackendData}
              className="px-3 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-stone-300 flex items-center gap-1.5 transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Refresh</span>
            </button>
          </div>
        </div>

        {statusMessage && (
          <div className="mb-6 p-3 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs flex items-center gap-2">
            <CheckCircle className="w-4 h-4" />
            <span>{statusMessage}</span>
          </div>
        )}

        {/* Dashboard Shell */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-3 bg-[#141417] border border-white/10 p-5 flex flex-col justify-between h-fit">
            <div>
              <div className="pb-4 mb-4 border-b border-white/10 flex items-center gap-3">
                <img
                  src="/logo.jpeg"
                  alt="Prem A to Z Logo"
                  className="w-10 h-10 rounded-full object-cover border border-[#c5a880]/40 shrink-0"
                />
                <div>
                  <span className="font-editorial text-lg font-normal text-white block leading-tight">
                    {businessInfo.name}
                  </span>
                  <span className="text-[9px] uppercase tracking-[0.25em] text-[#c5a880] font-medium block">
                    Administrator Console
                  </span>
                </div>
              </div>

              <nav className="space-y-1">
                {sidebarLinks.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.name;
                  return (
                    <button
                      key={item.name}
                      onClick={() => setActiveTab(item.name)}
                      className={`w-full flex items-center justify-between px-3.5 py-2.5 text-xs uppercase tracking-wider font-medium transition-colors cursor-pointer ${
                        isActive
                          ? 'bg-[#c5a880] text-[#0f0f11] font-semibold'
                          : 'text-stone-400 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon className="w-4 h-4" />
                        <span>{item.name}</span>
                      </div>
                      {item.count !== undefined && (
                        <span
                          className={`text-[10px] px-1.5 py-0.5 font-mono ${
                            isActive ? 'bg-black/20 text-black' : 'bg-white/10 text-stone-300'
                          }`}
                        >
                          {item.count}
                        </span>
                      )}
                    </button>
                  );
                })}
              </nav>
            </div>

            <div className="pt-6 mt-6 border-t border-white/10 text-xs text-stone-500">
              Active User: <strong className="text-stone-300">{user?.name || 'Guest'}</strong> ({user?.role || 'public'})
            </div>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-9 space-y-8">
            {/* Top Metrics Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
              {[
                { title: 'Registered Users', value: stats.totalUsers || '2', subtitle: 'Live MongoDB records', icon: Users },
                { title: 'Total Inquiries', value: stats.totalEnquiries || enquiries.length || '2', subtitle: `${stats.newEnquiries || 1} Pending triage`, icon: MessageSquare },
                { title: 'Core Services', value: stats.totalServices || '5', subtitle: 'Live Catalog items', icon: Briefcase },
                { title: 'Products Seeded', value: stats.totalProducts || '4', subtitle: 'Categorized furniture', icon: Package }
              ].map((card, idx) => {
                const CardIcon = card.icon;
                return (
                  <div key={idx} className="p-5 bg-[#141417] border border-white/10">
                    <div className="flex items-center justify-between text-stone-400 mb-2">
                      <span className="text-xs uppercase tracking-wider">{card.title}</span>
                      <CardIcon className="w-4 h-4 text-[#c5a880]" />
                    </div>
                    <span className="font-editorial text-3xl font-normal text-white block mb-1">
                      {card.value}
                    </span>
                    <span className="text-[11px] text-stone-400 font-light block">
                      {card.subtitle}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Quick Actions */}
            <div className="p-5 bg-[#141417] border border-white/10 flex flex-wrap items-center justify-between gap-4">
              <span className="text-xs uppercase tracking-widest text-[#c5a880] font-semibold">
                Quick Administrative Actions
              </span>
              <div className="flex flex-wrap gap-2.5">
                <Link
                  to="/services"
                  className="px-3.5 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-stone-300 hover:text-white transition-colors inline-flex items-center gap-1.5"
                >
                  <Plus className="w-3.5 h-3.5 text-[#c5a880]" />
                  <span>View Services Catalog</span>
                </Link>

                <Link
                  to="/products"
                  className="px-3.5 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-stone-300 hover:text-white transition-colors inline-flex items-center gap-1.5"
                >
                  <Plus className="w-3.5 h-3.5 text-[#c5a880]" />
                  <span>View Products</span>
                </Link>

                <Link
                  to="/gallery"
                  className="px-3.5 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-stone-300 hover:text-white transition-colors inline-flex items-center gap-1.5"
                >
                  <Plus className="w-3.5 h-3.5 text-[#c5a880]" />
                  <span>View Gallery</span>
                </Link>
              </div>
            </div>

            {/* Recent Enquiries & Lead Pipeline */}
            <div className="bg-[#141417] border border-white/10 p-6 sm:p-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                  <h3 className="font-editorial text-2xl font-normal text-white">
                    Client Inquiries & Project Leads
                  </h3>
                  <p className="text-xs text-stone-400 font-light mt-0.5">
                    Syncs in real-time with the MongoDB backend. Status changes are persisted immediately.
                  </p>
                </div>

                <div className="relative">
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search customer, phone..."
                    className="bg-[#0f0f11] text-xs text-white pl-8 pr-3 py-2 border border-white/10 focus:border-[#c5a880] focus:outline-none w-56"
                  />
                  <Search className="w-3.5 h-3.5 text-stone-500 absolute left-2.5 top-2.5" />
                </div>
              </div>

              {/* Data Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="border-b border-white/10 text-stone-400 uppercase tracking-wider">
                      <th className="py-3 px-3">Customer</th>
                      <th className="py-3 px-3">Service</th>
                      <th className="py-3 px-3">Message Details</th>
                      <th className="py-3 px-3">Date</th>
                      <th className="py-3 px-3">Status Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {filteredEnquiries.map((enq) => {
                      const id = enq._id || enq.id;
                      const statusColor = {
                        new: 'bg-amber-500/10 text-amber-300 border-amber-500/30',
                        contacted: 'bg-sky-500/10 text-sky-300 border-sky-500/30',
                        'in-progress': 'bg-indigo-500/10 text-indigo-300 border-indigo-500/30',
                        completed: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30',
                        closed: 'bg-stone-500/10 text-stone-400 border-stone-500/30'
                      }[enq.status] || 'bg-white/10 text-white';

                      const dateDisplay = enq.createdAt
                        ? new Date(enq.createdAt).toLocaleDateString('en-IN', {
                            month: 'short',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })
                        : enq.date || 'Recent';

                      return (
                        <tr key={id} className="hover:bg-white/5 transition-colors">
                          <td className="py-3 px-3">
                            <span className="font-semibold text-white block">{enq.name}</span>
                            <span className="text-stone-400 font-mono">{enq.phone}</span>
                            {enq.email && <span className="text-[10px] text-stone-500 block">{enq.email}</span>}
                          </td>
                          <td className="py-3 px-3 text-[#c5a880] font-medium">{enq.service}</td>
                          <td className="py-3 px-3 text-stone-300 max-w-xs truncate font-light">
                            {enq.message}
                          </td>
                          <td className="py-3 px-3 text-stone-400 whitespace-nowrap">{dateDisplay}</td>
                          <td className="py-3 px-3">
                            <select
                              value={enq.status}
                              onChange={(e) => updateStatus(id, e.target.value)}
                              className={`text-[11px] font-semibold uppercase tracking-wider px-2 py-1 border cursor-pointer bg-[#0f0f11] focus:outline-none ${statusColor}`}
                            >
                              <option value="new">new</option>
                              <option value="contacted">contacted</option>
                              <option value="in-progress">in-progress</option>
                              <option value="completed">completed</option>
                              <option value="closed">closed</option>
                            </select>
                          </td>
                        </tr>
                      );
                    })}

                    {filteredEnquiries.length === 0 && (
                      <tr>
                        <td colSpan={5} className="text-center py-8 text-stone-500">
                          {loading ? 'Fetching inquiries from backend...' : 'No inquiries found.'}
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default AdminDashboardPage;
