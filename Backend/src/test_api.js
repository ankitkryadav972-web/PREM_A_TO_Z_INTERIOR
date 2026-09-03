import http from 'http';
import app from './app.js';
import connectDB from './config/db.js';

let passed = 0;
let failed = 0;

function assert(condition, testName, extraInfo = '') {
  if (condition) {
    console.log(`  [PASS] ${testName}`);
    passed++;
  } else {
    console.error(`  [FAIL] ${testName} ${extraInfo}`);
    failed++;
  }
}

async function runTests() {
  console.log('--- STARTING PREM A TO Z BACKEND API TEST SUITE ---');
  await connectDB();

  const PORT = 5099;
  const server = http.createServer(app);
  await new Promise((resolve) => server.listen(PORT, resolve));
  const baseUrl = `http://localhost:${PORT}/api`;

  try {
    // 1. Health Check
    console.log('\n1. Testing Health Check...');
    const healthRes = await fetch(`${baseUrl}/health`);
    const healthData = await healthRes.json();
    assert(healthRes.status === 200, 'Health check returns 200');
    assert(healthData.success === true, 'Health check success is true');
    assert(healthData.message === 'API is running', 'Health check message matches');

    // 2. Auth - Login Admin with Email
    console.log('\n2. Testing Admin Login (Email)...');
    const adminLoginRes = await fetch(`${baseUrl}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'admin@premAtoZ.com',
        password: 'AdminPassword@123'
      })
    });
    const adminLoginData = await adminLoginRes.json();
    assert(adminLoginRes.status === 200, 'Admin login status 200');
    assert(adminLoginData.success === true, 'Admin login success true');
    assert(!!adminLoginData.data.token, 'Admin JWT token present');
    assert(adminLoginData.data.user.role === 'admin', 'Admin role is admin');
    const adminToken = adminLoginData.data.token;

    // 3. Auth - Login Admin with Mobile
    console.log('\n3. Testing Admin Login (Mobile)...');
    const adminMobileLoginRes = await fetch(`${baseUrl}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        mobile: '9454107810',
        password: 'AdminPassword@123'
      })
    });
    const adminMobileData = await adminMobileLoginRes.json();
    assert(adminMobileLoginRes.status === 200, 'Admin mobile login status 200');
    assert(adminMobileData.data.user.role === 'admin', 'Admin mobile login user matches');

    // 4. Auth - Customer Registration
    console.log('\n4. Testing Customer Registration...');
    const randomSuffix = Math.floor(Math.random() * 100000);
    const newCustomerRes = await fetch(`${baseUrl}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Anita Sharma',
        email: `anita_${randomSuffix}@example.com`,
        mobile: `98${String(randomSuffix).padStart(8, '0')}`,
        password: 'Password@123',
        confirmPassword: 'Password@123'
      })
    });
    const newCustomerData = await newCustomerRes.json();
    assert(newCustomerRes.status === 201, 'Customer register status 201');
    assert(newCustomerData.success === true, 'Customer register success true');
    assert(newCustomerData.data.user.role === 'customer', 'New user role is customer');
    assert(!newCustomerData.data.user.password, 'Password hash is NOT returned');
    const customerToken = newCustomerData.data.token;
    const customerId = newCustomerData.data.user._id;

    // 5. Auth - Validation error on mismatched password
    console.log('\n5. Testing Registration Validation...');
    const invalidRegRes = await fetch(`${baseUrl}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Fail User',
        email: 'bad-email',
        mobile: '123',
        password: 'pass',
        confirmPassword: 'mismatch'
      })
    });
    const invalidRegData = await invalidRegRes.json();
    assert(invalidRegRes.status === 400, 'Invalid registration status 400');
    assert(invalidRegData.error === 'VALIDATION_ERROR', 'Error code is VALIDATION_ERROR');
    assert(Array.isArray(invalidRegData.details), 'Validation details returned');

    // 6. Auth - Get Current User (/api/auth/me)
    console.log('\n6. Testing /api/auth/me...');
    const meRes = await fetch(`${baseUrl}/auth/me`, {
      headers: { Authorization: `Bearer ${customerToken}` }
    });
    const meData = await meRes.json();
    assert(meRes.status === 200, 'GET /api/auth/me status 200');
    assert(meData.data.user._id === customerId, 'Profile matches logged-in customer');

    // 7. Site Settings - Public
    console.log('\n7. Testing Public Site Settings & Business Information...');
    const settingsRes = await fetch(`${baseUrl}/settings/public`);
    const settingsData = await settingsRes.json();
    assert(settingsRes.status === 200, 'Public settings status 200');
    assert(settingsData.data.businessName === 'PREM A TO Z INTERIOR DESIGN', 'Exact business name matches');
    assert(settingsData.data.phones.includes('9454107810'), 'Primary phone 9454107810 matches');
    assert(settingsData.data.whatsAppNumbers.includes('7458905073'), 'WhatsApp 7458905073 matches');
    assert(settingsData.data.address.includes('GORAKHPUR'), 'Gorakhpur address matches');
    assert(settingsData.data.email === '', 'Email not invented (blank string)');

    // 8. Services - Public list and Slug lookup
    console.log('\n8. Testing Services API...');
    const servicesRes = await fetch(`${baseUrl}/services`);
    const servicesData = await servicesRes.json();
    assert(servicesRes.status === 200, 'GET /api/services status 200');
    assert(Array.isArray(servicesData.data) && servicesData.data.length >= 5, 'At least 5 seeded services returned');
    assert(servicesData.data.some((s) => s.slug === 'doors'), 'Doors service present');
    assert(servicesData.data.some((s) => s.slug === 'kitchen'), 'Kitchen service present');

    const singleServiceRes = await fetch(`${baseUrl}/services/doors`);
    const singleServiceData = await singleServiceRes.json();
    assert(singleServiceRes.status === 200, 'GET /api/services/doors status 200');
    assert(singleServiceData.data.service.title === 'Doors', 'Single service title matches');

    // 9. RBAC - Service Creation (Customer blocked, Admin allowed)
    console.log('\n9. Testing Role-Based Authorization for Service Creation...');
    const customerCreateRes = await fetch(`${baseUrl}/services`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${customerToken}`
      },
      body: JSON.stringify({
        title: 'Unauthorized Service',
        description: 'Should fail'
      })
    });
    assert(customerCreateRes.status === 403, 'Customer service creation rejected with 403 Forbidden');

    const adminCreateRes = await fetch(`${baseUrl}/services`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${adminToken}`
      },
      body: JSON.stringify({
        title: 'Glass Partition Work',
        description: 'Modern acoustic glass partition solutions for offices and residences.',
        shortDescription: 'Modern glass partition and frameless systems.',
        features: ['Toughened safety glass', 'Sound insulation']
      })
    });
    const adminCreateData = await adminCreateRes.json();
    assert(adminCreateRes.status === 201, 'Admin service creation returns 201 Created');
    assert(adminCreateData.data.service.slug === 'glass-partition-work', 'Service slug auto-generated');
    const createdServiceId = adminCreateData.data.service._id;

    // 10. Products - List, Filter & Pagination
    console.log('\n10. Testing Products API...');
    const productsRes = await fetch(`${baseUrl}/products?category=Kitchen`);
    const productsData = await productsRes.json();
    assert(productsRes.status === 200, 'GET /api/products?category=Kitchen status 200');
    assert(productsData.pagination !== undefined, 'Pagination object present');
    assert(productsData.data.length > 0, 'Category-filtered product returned');

    // 11. Gallery API
    console.log('\n11. Testing Gallery API...');
    const galleryRes = await fetch(`${baseUrl}/gallery`);
    const galleryData = await galleryRes.json();
    assert(galleryRes.status === 200, 'GET /api/gallery status 200');
    assert(galleryData.data.length > 0, 'Gallery items returned');

    // 12. Testimonials API
    console.log('\n12. Testing Testimonials API...');
    const testimonialsRes = await fetch(`${baseUrl}/testimonials`);
    const testimonialsData = await testimonialsRes.json();
    assert(testimonialsRes.status === 200, 'GET /api/testimonials status 200');
    assert(testimonialsData.data.length > 0, 'Testimonials returned');

    // 13. Enquiry Submission & Customer History
    console.log('\n13. Testing Enquiries API...');
    const enquiryRes = await fetch(`${baseUrl}/enquiries`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${customerToken}`
      },
      body: JSON.stringify({
        name: 'Anita Sharma',
        phone: '9876500000',
        service: 'POP & False Ceiling',
        message: 'Need false ceiling quotation for 3BHK living room.'
      })
    });
    const enquiryData = await enquiryRes.json();
    assert(enquiryRes.status === 201, 'POST /api/enquiries status 201');
    assert(enquiryData.data.enquiry.status === 'new', 'Enquiry initial status is new');
    assert(enquiryData.data.enquiry.userId === customerId, 'Enquiry attached to authenticated customer');
    const enquiryId = enquiryData.data.enquiry._id;

    // Customer retrieves own enquiries
    const myEnquiriesRes = await fetch(`${baseUrl}/enquiries/my`, {
      headers: { Authorization: `Bearer ${customerToken}` }
    });
    const myEnquiriesData = await myEnquiriesRes.json();
    assert(myEnquiriesRes.status === 200, 'GET /api/enquiries/my status 200');
    assert(myEnquiriesData.data.some((e) => e._id === enquiryId), 'Customer enquiry listed in my enquiries');

    // Admin updates enquiry status
    const updateEnquiryRes = await fetch(`${baseUrl}/enquiries/${enquiryId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${adminToken}`
      },
      body: JSON.stringify({ status: 'in-progress' })
    });
    const updateEnquiryData = await updateEnquiryRes.json();
    assert(updateEnquiryRes.status === 200, 'Admin PATCH enquiry status 200');
    assert(updateEnquiryData.data.enquiry.status === 'in-progress', 'Status updated to in-progress');

    // 14. Admin Dashboard Metrics
    console.log('\n14. Testing Admin Dashboard Metrics...');
    const customerDashRes = await fetch(`${baseUrl}/admin/dashboard`, {
      headers: { Authorization: `Bearer ${customerToken}` }
    });
    assert(customerDashRes.status === 403, 'Customer cannot access admin dashboard (403)');

    const adminDashRes = await fetch(`${baseUrl}/admin/dashboard`, {
      headers: { Authorization: `Bearer ${adminToken}` }
    });
    const adminDashData = await adminDashRes.json();
    assert(adminDashRes.status === 200, 'Admin dashboard status 200');
    assert(typeof adminDashData.data.totalUsers === 'number', 'totalUsers is number');
    assert(typeof adminDashData.data.totalServices === 'number', 'totalServices is number');
    assert(typeof adminDashData.data.totalEnquiries === 'number', 'totalEnquiries is number');
    assert(Array.isArray(adminDashData.data.recentEnquiries), 'recentEnquiries is array');

    // 15. Clean up created test service
    console.log('\n15. Testing Admin Service Deletion...');
    const deleteServiceRes = await fetch(`${baseUrl}/services/${createdServiceId}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${adminToken}` }
    });
    assert(deleteServiceRes.status === 200, 'Admin delete service status 200');

    console.log('\n====================================================');
    console.log(` TEST RESULTS: ${passed} PASSED, ${failed} FAILED`);
    console.log('====================================================\n');
  } finally {
    server.close();
    process.exit(failed > 0 ? 1 : 0);
  }
}

runTests().catch((err) => {
  console.error('Test execution error:', err);
  process.exit(1);
});
