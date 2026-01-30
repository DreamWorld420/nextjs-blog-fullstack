import jwt, { JwtPayload } from "jsonwebtoken";

export function decodeJWT<T = JwtPayload>(token: string): Promise<T> {
	return new Promise((resolve, reject) => {
		jwt.verify(token, process.env.JWT_SECRET!, (err, decoded) => {
			if (err) return reject(err);
			resolve(decoded as T);
		});
	});
}
