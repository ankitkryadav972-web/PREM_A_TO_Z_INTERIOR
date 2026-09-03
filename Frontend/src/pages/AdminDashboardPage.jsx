import React, { useState } from 'react';
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
  ShieldAlert
} from 'lucide-react';
import Container from '../components/common/Container.jsx';
import { businessInfo } from '../data/business.js';

const initialEnquiries = [
  {
    id: 'enq-101',
    name: 'Sunil Verma',
    phone: '9876501122',
    service: 'Kitchen',
    date: 'Today, 2:30 PM',
    status: 'new',
    message: 'Requesting quote for an L-shaped acrylic modular kitchen in Gorakhpur.'
  },
  {
    id: 'enq-102',
    name: 'Pooja Srivastava',
    phone: '9454109988',
    service: 'Doors',
    date: 'Yesterday',
    status: 'in-progress',
    message: 'Need 4 solid teak entrance and bedroom doors.'
  },
  {
    id: 'enq-103',
    name: 'Rajesh Pandey',
    phone: '9876543210',
    service: 'POP & False Ceiling',
    date: '2 days ago',
    status: 'completed',
    message: 'False ceiling work completed in living room.'
  },
  {
    id: 'enq-104',
    name: 'Dr. Alok Mishra',
    phone: '9839001234',
    service: 'Complete Furniture Work',
    date: '3 days ago',
    status: 'contacted',
    message: 'Looking for full-height sliding wardrobe and TV unit.'
  }
];

export const AdminDashboardPage = () => {
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [enquiries, setEnquiries] = useState(initialEnquiries);
  const [searchTerm, setSearchTerm] = useState('');

  const updateStatus = (id, newStatus) => {
    setEnquiries(
      enquiries.map((e) => (e.id === id ? { ...e, status: newStatus } : e))
    );
  };

  const filteredEnquiries = enquiries.filter(
    (e) =>
      e.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      e.service.toLowerCase().includes(searchTerm.toLowerCase()) ||
      e.phone.includes(searchTerm)
  );

  const sidebarLinks = [
    { name: 'Dashboard', icon: LayoutDashboard },
    { name: 'Enquiries', icon: MessageSquare, count: 4 },
    { name: 'Users', icon: Users, count: 2 },
    { name: 'Services', icon: Briefcase, count: 5 },
    { name: 'Products', icon: Package, count: 9 },
    { name: 'Gallery', icon: Image, count: 6 },
    { name: 'Content', icon: FileText },
    { name: 'Settings', icon: Settings }
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0b] text-[#e8e6e1] pt-24 pb-20">
      <Container size="lg">
        {/* Prototype Header Notice */}
        <div className="mb-6 p-4 bg-[#c5a880]/10 border border-[#c5a880]/30 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <ShieldAlert className="w-5 h-5 text-[#c5a880] shrink-0" />
            <div>
              <span className="text-xs uppercase tracking-wider font-semibold text-[#c5a880] block">
                Frontend Admin Dashboard Prototype
              </span>
              <span className="text-xs text-stone-300 font-light">
                This administrative view demonstrates lead triage, metric counts, and catalog management.
              </span>
            </div>
          </div>
          <Link
            to="/"
            className="text-xs uppercase tracking-wider text-stone-400 hover:text-white flex items-center gap-1"
          >
            <span>Live Site</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Dashboard Shell */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-3 bg-[#141417] border border-white/10 p-5 flex flex-col justify-between h-fit">
            <div>
              <div className="pb-4 mb-4 border-b border-white/10">
                <span className="font-editorial text-xl font-normal text-white block">
                  {businessInfo.name}
                </span>
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#c5a880] font-medium">
                  Administrator Console
                </span>
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
                          className={`text-[10px] px-1.5 py-0.5 rounded-none font-mono ${
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
              Logged in as: <strong className="text-stone-300">Prem Admin</strong>
            </div>
          </div>

          {/* Main Dashboard Canvas */}
          <div className="lg:col-span-9 space-y-8">
            {/* Top Stat Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
              {[
                { title: 'Total Users', value: '2', subtitle: '1 Admin, 1 Client', icon: Users },
                { title: 'Total Enquiries', value: enquiries.length.toString(), subtitle: '1 New Lead Today', icon: MessageSquare },
                { title: 'Core Services', value: '5', subtitle: 'All Active in Catalog', icon: Briefcase },
                { title: 'Showcase Products', value: '9', subtitle: 'Across 6 Categories', icon: Package }
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

            {/* Quick Actions Bar */}
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
                  <span>New Service</span>
                </Link>

                <Link
                  to="/products"
                  className="px-3.5 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-stone-300 hover:text-white transition-colors inline-flex items-center gap-1.5"
                >
                  <Plus className="w-3.5 h-3.5 text-[#c5a880]" />
                  <span>New Product</span>
                </Link>

                <Link
                  to="/gallery"
                  className="px-3.5 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-stone-300 hover:text-white transition-colors inline-flex items-center gap-1.5"
                >
                  <Plus className="w-3.5 h-3.5 text-[#c5a880]" />
                  <span>Upload Image</span>
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
                    Click status badges to change status progression (`new` → `contacted` → `in-progress` → `completed`).
                  </p>
                </div>

                <div className="relative">
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search name, phone, service..."
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
                      <th className="py-3 px-3">Message Snippet</th>
                      <th className="py-3 px-3">Date</th>
                      <th className="py-3 px-3">Status Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {filteredEnquiries.map((enq) => {
                      const statusColor = {
                        new: 'bg-amber-500/10 text-amber-300 border-amber-500/30',
                        contacted: 'bg-sky-500/10 text-sky-300 border-sky-500/30',
                        'in-progress': 'bg-indigo-500/10 text-indigo-300 border-indigo-500/30',
                        completed: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30'
                      }[enq.status] || 'bg-white/10 text-white';

                      return (
                        <tr key={enq.id} className="hover:bg-white/5 transition-colors">
                          <td className="py-3 px-3">
                            <span className="font-semibold text-white block">{enq.name}</span>
                            <span className="text-stone-400 font-mono">{enq.phone}</span>
                          </td>
                          <td className="py-3 px-3 text-[#c5a880] font-medium">{enq.service}</td>
                          <td className="py-3 px-3 text-stone-300 max-w-xs truncate font-light">
                            {enq.message}
                          </td>
                          <td className="py-3 px-3 text-stone-400">{enq.date}</td>
                          <td className="py-3 px-3">
                            <select
                              value={enq.status}
                              onChange={(e) => updateStatus(enq.id, e.target.value)}
                              className={`text-[11px] font-semibold uppercase tracking-wider px-2 py-1 border cursor-pointer bg-[#0f0f11] focus:outline-none ${statusColor}`}
                            >
                              <option value="new">new</option>
                              <option value="contacted">contacted</option>
                              <option value="in-progress">in-progress</option>
                              <option value="completed">completed</option>
                            </select>
                          </td>
                        </tr>
                      );
                    })}
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
