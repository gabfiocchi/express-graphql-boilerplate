import { User } from '../models';
import authService from '../services/auth.service';
import bcryptService from '../services/bcrypt.service';

const register = async (req, res) => {
  const {
    email,
    password,
    password2,
  } = req.body;

  if (password === password2) {
    try {
      const user = await User.create({
        email,
        password,
      });
      const token = authService.issue({ id: user.id });

      return res.status(200).json({ token, user });
    } catch (err) {
      console.log(err); // eslint-disable-line no-console
      return res.status(500).json({ msg: 'Internal server error' });
    }
  }

  return res.status(400).json({ msg: 'Bad Request: Passwords don\'t match' });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (email && password) {
    try {
      const user = await User.findOne({
        where: {
          email,
        },
      });

      if (!user) {
        return res.status(400).json({ msg: 'Bad Request: User not found' });
      }

      if (bcryptService().comparePassword(password, user.password)) {
        const token = authService.issue({ id: user.id });

        return res.status(200).json({ token, user });
      }

      return res.status(401).json({ msg: 'Unauthorized' });
    } catch (err) {
      console.log(err); // eslint-disable-line no-console
      return res.status(500).json({ msg: 'Internal server error' });
    }
  }

  return res.status(400).json({ msg: 'Bad Request: Email and password don\'t match' });
};

const validate = (req, res) => {
  const { token } = req.body;

  authService.verify(token, (err) => {
    if (err) {
      return res.status(401).json({ isvalid: false, err: 'Invalid Token!' });
    }

    return res.status(200).json({ isvalid: true });
  });
};

export {
  register,
  login,
  validate,
};
