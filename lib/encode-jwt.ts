import jwt from "jsonwebtoken";

export function encodeJWT(payload: string | object | Buffer): Promise<unknown> {
	return new Promise((resolve, reject) => {
		jwt.sign(
			payload,
			process.env.JWT_SECRET!,
			{ expiresIn: "1d" },
			(err, token) => {
				if (err) return reject(err);
				else return resolve(token);
			}
		);
	});
}
