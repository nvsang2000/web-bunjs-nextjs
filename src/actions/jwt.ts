import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET as string;

export async function checkToken(token: string) {
  try {
    const decoded = jwt.decode(token) as { exp: number };
    const currentTime = Math.floor(Date.now() / 1000);
    if (decoded.exp < currentTime) return false;
    else return true;
  } catch (error) {
    return false;
  }
}

export async function decodedJWT(token: string) {
  const resultToken = await checkToken(token);
  if (!resultToken) return null;

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as {
      userId: string;
    };
    return decoded.userId;
  } catch (error) {
    return null;
  }
}

export async function signJWT(payload: any) {
  try {
    const token = jwt.sign(payload, JWT_SECRET, {
      expiresIn: "30d",
    });
    return token;
  } catch (error) {
    return null;
  }
}
