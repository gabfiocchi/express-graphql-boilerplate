import jwt from 'jsonwebtoken';

const secret = process.env.NODE_ENV === 'production' ? process.env.JWT_SECRET : 'secret';

const AuthService = {
  issue: (payload) => jwt.sign(payload, secret, { expiresIn: 10800 }),
  verify: (token, cb) => jwt.verify(token, secret, {}, cb),
};

export default AuthService;
