const axios = require('axios');
const { faker } = require('@faker-js/faker');

const generateMockAccounts = async () => {
  const mockAccounts = [];

  for (let i = 0; i < 50; i++) { // Generate 50 accounts
    const account = {
      username: faker.internet.userName(),
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
      password: faker.internet.password(8), // Generate an 8-character password
    };

    mockAccounts.push(account);

    // Optionally, send data to your API
    try {
      const response = await axios.post('http://localhost:5000/register', account);
      console.log(`Account ${account.username} created:`, response.data);
    } catch (error) {
      console.error(`Failed to create account for ${account.username}:`, error.message);
    }
  }

  console.log('Generated Mock Accounts:', mockAccounts);
};

generateMockAccounts();
