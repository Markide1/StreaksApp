export function validateEmail(email: string): boolean {
  // Implement email validation logic
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function validatePassword(password: string): boolean {
  // Implement password validation logic
  return password.length >= 6;
}

export function validateUsername(username: string): boolean {
  // Implement username validation logic
  return /^[a-zA-Z0-9_]{3,30}$/.test(username);
}
