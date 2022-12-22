export interface Token {
  token: string;
  timestamp: Date;
}

export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  position: string;
  position_id: number;
  photo: string;
}
