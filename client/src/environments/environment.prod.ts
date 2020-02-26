declare global {
  interface Window { env: any; }
}

export const environment = {
  production: true,
  apiUrl: window.env.apiUrl || 'localhost:3000'
};
