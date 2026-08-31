interface ErrorWithResponse {
  response?: { status?: number; data?: unknown };
}

//Logs context around a failed request/step, then rethrows so the test still fails.
export function handleError(stepName: string, error: unknown): never {
  const response = (error as ErrorWithResponse)?.response;
  console.error(`Error in "${stepName}":`, error);
  if (response) {
    console.error('Response status:', response.status, 'body:', response.data);
  }
  throw error;
}
