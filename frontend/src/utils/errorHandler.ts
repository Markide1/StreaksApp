export function handleError(error: unknown): string {
  if (error instanceof Error) {
    console.error('Error:', error.message);
    return error.message;
  } else if (typeof error === 'string') {
    console.error('Error:', error);
    return error;
  } else {
    console.error('Unknown error:', error);
    return 'An unknown error occurred';
  }
}
