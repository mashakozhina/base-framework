export const getDefaultHeaders = () => {
  return {
    Authorization: `Basic ${Buffer.from(
      `${process.env.BASIC_AUTH_USERNAME}:${process.env.BASIC_AUTH_PASSWORD}`,
    ).toString('base64')}`,
    'content-Type': 'application/json',
  };
};

// this export should be always last in the file to initialize everything before it
export const appData = {
  endpoint: process.env.BASE_URL,
  defaultHeaders: getDefaultHeaders(),
};
