export function randomString(length = 8) {
  return Math.random().toString(36).substring(2, 2 + length);
}

export function randomUser() {
  return {
    firstName: randomString(6),
    lastName: randomString(8),
    postalCode: Math.floor(10000 + Math.random() * 90000).toString(),
  };
} 