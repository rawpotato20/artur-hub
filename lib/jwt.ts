import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET!;

export function signToken(payload: object) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "15m" });
}

export function refreshToken(payload: object) {
  return jwt.sign(payload, JWT_REFRESH_SECRET, { expiresIn: "7d" });
}

export function verifyToken(token: string) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (err: any) {
    if (err.name === "TokenExpiredError") {
      console.error("Token expired:", err);
    } else {
      console.error("Invalid token:", err);
    }
    return null;
  }
}

export function verifyRefreshToken(token: string) {
  try {
    return jwt.verify(token, JWT_REFRESH_SECRET);
  } catch (err: any) {
    if (err.name === "TokenExpiredError") {
      console.error("Token expired:", err);
    } else {
      console.error("Invalid token:", err);
    }
    return null;
  }
}
