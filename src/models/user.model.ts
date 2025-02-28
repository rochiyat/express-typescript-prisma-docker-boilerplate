export interface User {
  id: number;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  ssn: string;
  dob: Date;
  hiredOn: Date;
  terminatedOn: Date | null;
  email: string;
  department: string;
  gender: string;
  portrait: string;
  thumbnail: string;
}

export interface UserAddress {
  id: number;
  user: User;
  userId: number;
  street: string;
  city: string;
  state: string;
  zip: string;
}

export interface UserPhone {
  id: number;
  user: User;
  userId: number;
  type: string;
  number: string;
}

export interface UserRole {
  id: number;
  user: User;
  userId: number;
  role: string;
}
