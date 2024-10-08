import jwtDecode from 'jwt-decode'; // Correct import

export interface DecodedToken {
  sub: string;
  firstName: string;
  lastName: string;
  image: string;
  roles: string[];
  isBlocked: boolean;
  exp: number;
  isActive: boolean;
  iat: number;
}

const token = localStorage.getItem('authToken');

export const extractDataFromToken = (token: string | null): DecodedToken | null => {
  if (!token) {
   // console.error("User not signed in");
    return null;
  }

  try {
    const decoded: DecodedToken = jwtDecode(token);
    return decoded;
  } catch (error) {
    console.error("Invalid token:", error);
    return null;
  }
}
