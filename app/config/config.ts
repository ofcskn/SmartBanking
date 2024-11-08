const environment = process.env.NODE_ENV || 'development';

type Config = {
  apiUrl: string;
};

type EnvironmentConfig = {
  [key: string]: Config; // This allows for any string as a key mapping to a Config type
};

const config: EnvironmentConfig = {
  development: {
    apiUrl: process.env.EXPO_PUBLIC_API_URL || 'http://192.168.1.111:5000/api',
  },
  production: {
    apiUrl: 'https://api.example.com',
  },
};

const currentConfig = config[environment] || config.development; // Fallback to development if the environment is not recognized

export default currentConfig;
