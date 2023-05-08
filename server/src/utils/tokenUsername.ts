import jwt from "./jwt";

export const tokenUsername = (token: string) => {
  const decode = jwt.decodeToken(String(token)) as any;
  const {
    decode: { username },
  } = decode;

  return username;
};
