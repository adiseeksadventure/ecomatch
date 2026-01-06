const http = require('http');

function request(method, path, body = null) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'localhost',
      port: 5000,
      path: `/api${path}`,
      method: method,
      headers: { 'Content-Type': 'application/json' }
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
  console.log('Starting Vendor Verification...');

  // 1. Seed Vendors
  console.log('\n1. Seeding Vendors...');
  try {
    const seedRes = await request('POST', '/vendors/seed');
    if (seedRes.status === 201 || seedRes.status === 400) { // 400 if already seeded
      console.log('✅ Seeding Successful (or already seeded)');
    } else {
      console.error('❌ Seeding Failed:', seedRes.data);
    }
  } catch (e) {
    console.error('❌ Seeding Error:', e.message);
  }

  // 2. Get Vendors
  console.log('\n2. Testing Get Vendors...');
  try {
    const getRes = await request('GET', '/vendors');
    if (getRes.status === 200 && Array.isArray(getRes.data)) {
      console.log(`✅ Get Vendors Successful. Count: ${getRes.data.length}`);
      if (getRes.data.length > 0) {
          console.log('Sample Vendor:', getRes.data[0].name);
      }
    } else {
      console.error('❌ Get Vendors Failed:', getRes.data);
    }
  } catch (e) {
    console.error('❌ Get Vendors Error:', e.message);
  }
}

verify();
