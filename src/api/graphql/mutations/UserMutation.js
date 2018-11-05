import {
  GraphQLString,
  GraphQLInt,
  GraphQLNonNull,
} from 'graphql';
import { UserType } from '../types';
import { User } from '../../models';

const updateUser = {
  type: UserType,
  description: 'The mutation that allows you to update an existing User by Id',
  args: {
    id: {
      name: 'id',
      type: new GraphQLNonNull(GraphQLInt),
    },
    username: {
      name: 'username',
      type: GraphQLString,
    },
    email: {
      name: 'email',
      type: GraphQLString,
    },
  },
  resolve: async (user, {
    id,
    username,
    email,
  }) => {
    const foundUser = await User.findById(id);

    if (!foundUser) {
      throw new Error(`User with id: ${id} not found!`);
    }

    const updatedUser = {
      ...foundUser,
      username,
      email,
    };

    return foundUser.update(updatedUser);
  },
};

const deleteUser = {
  type: UserType,
  description: 'The mutation that allows you to delete a existing User by Id',
  args: {
    id: {
      name: 'id',
      type: new GraphQLNonNull(GraphQLInt),
    },
  },
  resolve: async (user, {
    id,
  }) => {
    const foundUser = await User.findById(id);

    if (!foundUser) {
      throw new Error(`User with id: ${id} not found!`);
    }

    await User.destroy({
      where: {
        id,
      },
    });

    return foundUser;
  },
};

export {
  updateUser,
  deleteUser,
};
