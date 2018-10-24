import authService from '../../api/services/auth.service';
import { User } from '../../api/models';

const getAccessToken = async (id) => {
  let token;
  if (id) {
    token = authService.issue({ id });

    return token;
  }

  const user = await User.create({
    username: 'test',
    email: `${Math.random(1 * Math.random(0.5))}testmail@testmail.com`,
    password: 'supersecurepassword',
  });

  token = authService.issue({ id: user.id });

  return token;
};

export { getAccessToken };
