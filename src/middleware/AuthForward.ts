import { Request, Response, NextFunction } from 'express';
import { JwtService } from '@nestjs/jwt';
import { NOTOKEN } from '../const/Whitelist';

const JWT_SECRET = 'your_jwt_secret_key';
const jwtService = new JwtService({ secret: JWT_SECRET });

export function AuthForward(
	req: Request,
	res: Response,
	next: NextFunction,
) {
	const authHeader = req.headers['authorization'];
	const token = authHeader && authHeader.split(' ')[1];
	if (NOTOKEN.some((reg) => reg.test(req.path))) {
		return next();
	}
	if (!token) {
		return res.status(401).json({ success: false, message: '访问令牌缺失' });
	}

	try {
		const payload = jwtService.verify(token);
		(req as any).user = payload;
		req.headers['x-user-info'] = JSON.stringify(payload);
		req['user'] = payload;
		next();
	} catch (err) {
		return res.status(401).json({ success: false, message: '访问令牌无效' });
	}
}
