import * as dotenv from 'dotenv';
dotenv.config();

export function getValidLoginCredentials() {
  return {
    username: process.env.LOGIN_USERNAME!,
    password: process.env.LOGIN_PASSWORD!,
  };
}

export function getInvalidLoginCredentials() {
  return [
    { username: '', password: '' },
    { username: 'invalid', password: 'invalid' },
    { username: process.env.LOGIN_USERNAME!, password: 'wrongpass' },
    { username: 'wronguser', password: process.env.LOGIN_PASSWORD! },
    // Add more edge cases as needed
  ];
}

export function getValidCheckoutInfo() {
  return {
    firstName: 'John',
    lastName: 'Doe',
    postalCode: '12345',
  };
}

export function getInvalidCheckoutInfo() {
  return [
    { firstName: '', lastName: '', postalCode: '' },
    { firstName: 'John', lastName: '', postalCode: '12345' },
    { firstName: '', lastName: 'Doe', postalCode: '12345' },
    { firstName: 'John', lastName: 'Doe', postalCode: '' },
    // Add more edge cases as needed
  ];
} 