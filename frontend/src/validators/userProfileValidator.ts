export function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function validatePassword(password: string): boolean {
  return password.length >= 6;
}

export function validateUsername(username: string): boolean {
  return /^[a-zA-Z0-9_]{3,30}$/.test(username);
}
