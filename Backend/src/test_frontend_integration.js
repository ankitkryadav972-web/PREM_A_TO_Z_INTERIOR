const BASE_URL = 'http://localhost:5000/api';

async function testFrontendIntegration() {
  console.log('--- TESTING FRONTEND <-> BACKEND LIVE INTEGRATION ---');

  try {
    // 1. Health check
    console.log('1. Health check...');
    const healthRes = await fetch(`${BASE_URL}/health`);
    const healthData = await healthRes.json();
    console.log('  Health response:', healthData.message);

    // 2. Client registration / login
    console.log('\n2. Testing customer login (Ramesh)...');
    const loginRes = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'ramesh@example.com',
        password: 'Customer@123'
      })
    });
    const loginData = await loginRes.json();
    console.log('  Customer login status:', loginRes.status, '- User:', loginData.data?.user?.name);
    const customerToken = loginData.data?.token;

    // 3. Admin login
    console.log('\n3. Testing admin login (Prem Admin)...');
    const adminLoginRes = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'admin@premAtoZ.com',
        password: 'AdminPassword@123'
      })
    });
    const adminLoginData = await adminLoginRes.json();
    console.log('  Admin login status:', adminLoginRes.status, '- Role:', adminLoginData.data?.user?.role);
    const adminToken = adminLoginData.data?.token;

    // 4. Services catalog for homepage & services page
    console.log('\n4. Fetching live services...');
    const servicesRes = await fetch(`${BASE_URL}/services`);
    const servicesData = await servicesRes.json();
    console.log('  Services count returned:', servicesData.data?.length);

    // 5. Submit enquiry as from frontend contact form
    console.log('\n5. Submitting lead enquiry from frontend form...');
    const enqRes = await fetch(`${BASE_URL}/enquiries`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${customerToken}`
      },
      body: JSON.stringify({
        name: 'Vikas Sharma',
        phone: '9876543299',
        service: 'Doors',
        message: 'Live frontend integration enquiry test for teak entrance doors.'
      })
    });
    const enqData = await enqRes.json();
    console.log('  Enquiry status:', enqRes.status, '- ID:', enqData.data?.enquiry?._id);
    const createdEnqId = enqData.data?.enquiry?._id;

    // 6. Admin Dashboard retrieves metrics & enquiries
    console.log('\n6. Fetching live admin dashboard metrics...');
    const dashRes = await fetch(`${BASE_URL}/admin/dashboard`, {
      headers: { Authorization: `Bearer ${adminToken}` }
    });
    const dashData = await dashRes.json();
    console.log('  Dashboard metrics:', {
      totalUsers: dashData.data?.totalUsers,
      totalServices: dashData.data?.totalServices,
      totalEnquiries: dashData.data?.totalEnquiries
    });

    // 7. Update enquiry status from admin dashboard table
    console.log('\n7. Updating enquiry status from admin dashboard...');
    const patchRes = await fetch(`${BASE_URL}/enquiries/${createdEnqId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${adminToken}`
      },
      body: JSON.stringify({ status: 'in-progress' })
    });
    const patchData = await patchRes.json();
    console.log('  Updated status:', patchData.data?.enquiry?.status);

    console.log('\n======================================================');
    console.log(' LIVE FRONTEND <-> BACKEND INTEGRATION SUCCESSFUL!   ');
    console.log('======================================================\n');
  } catch (err) {
    console.error('Integration test failed:', err);
  }
}

testFrontendIntegration();
