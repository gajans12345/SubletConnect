const axios = require('axios'); // Make sure axios is installed: npm install axios

// Test the /signup POST route
axios
  .post('http://localhost:3000/signup', {
    email: 'testuser@example.com',
    password: 'password123',
  })
  .then((response) => {
    console.log('Response:', response.data);
  })
  .catch((error) => {
    console.error('Error:', error.response ? error.response.data : error.message);
  });
