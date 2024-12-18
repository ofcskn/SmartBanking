import { Double } from 'react-native/Libraries/Types/CodegenTypes';

export interface User {
  _id: string; // Unique identifier for the user (string type)
  name: string; // User's name (string type)
  email: string; // User's email address (string type)
  imageUrl: string; // User's image url
  password: string; // User's password
}
