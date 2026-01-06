const http = require('http');

const BASE_URL = 'http://localhost:5000/api';
let token = '';

function request(method, path, body = null, headers = {}) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'localhost',
      port: 5000,
      path: `/api${path}`,
      method: method,
      headers: {
        'Content-Type': 'application/json',
        ...headers
      }
    };

    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        try {
          const parsed = JSON.parse(data);
          resolve({ status: res.statusCode, data: parsed });
        } catch (e) {
          resolve({ status: res.statusCode, data: data });
        }
      });
    });

    req.on('error', (e) => reject(e));

    if (body) {
      req.write(JSON.stringify(body));
    }
    req.end();
  });
}

async function verify() {
  console.log('Starting API Verification...');

  // 1. Register
  console.log('\n1. Testing Registration...');
  const uniqueEmail = `test${Date.now()}@example.com`;
  try {
    const regRes = await request('POST', '/auth/register', {
      name: 'API Tester',
      email: uniqueEmail,
      password: 'password123'
    });
    
    if (regRes.status === 201 && regRes.data.token) {
      console.log('✅ Registration Successful');
      token = regRes.data.token;
    } else {
      console.error('❌ Registration Failed:', regRes.data);
      return;
    }
  } catch (e) {
    console.error('❌ Registration Error:', e.message);
    return;
  }

  // 2. Login
  console.log('\n2. Testing Login...');
  try {
    const loginRes = await request('POST', '/auth/login', {
      email: uniqueEmail,
      password: 'password123'
    });
    
    if (loginRes.status === 200 && loginRes.data.token) {
      console.log('✅ Login Successful');
      token = loginRes.data.token;
    } else {
      console.error('❌ Login Failed:', loginRes.data);
    }
  } catch (e) {
    console.error('❌ Login Error:', e.message);
  }

  // 3. Add Carbon Activity
  console.log('\n3. Testing Add Activity...');
  let activityId = '';
  try {
    const addRes = await request('POST', '/carbon', {
      category: 'transport',
      activityName: 'Test Car',
      amount: 50,
      unit: 'miles',
      carbonFootprint: 20.2
    }, { 'Authorization': `Bearer ${token}` });

    if (addRes.status === 200 && addRes.data._id) {
      console.log('✅ Add Activity Successful');
      activityId = addRes.data._id;
    } else {
      console.error('❌ Add Activity Failed:', addRes.data);
    }
  } catch (e) {
    console.error('❌ Add Activity Error:', e.message);
  }

  // 4. Get Activities (Persistence Check)
  console.log('\n4. Testing Get Activities (Persistence)...');
  try {
    const getRes = await request('GET', '/carbon', null, { 'Authorization': `Bearer ${token}` });

    if (getRes.status === 200 && Array.isArray(getRes.data)) {
      const found = getRes.data.find(a => a._id === activityId);
      if (found) {
        console.log('✅ Persistence Verified: Activity found in list');
      } else {
        console.error('❌ Persistence Failed: Activity not found in list');
      }
    } else {
      console.error('❌ Get Activities Failed:', getRes.data);
    }
  } catch (e) {
    console.error('❌ Get Activities Error:', e.message);
  }

  console.log('\nVerification Complete.');
}

verify();
