export interface User {
  id?: number;
  name: string;
  email: string;
  password?: string;
  phone?: string;
  address?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  country?: string;
  role: 'USER' | 'ADMIN';
  createdAt?: Date;
  updatedAt?: Date;
  profileImage?: string;
}