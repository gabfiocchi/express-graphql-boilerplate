import {
  GraphQLInt,
  GraphQLString,
  GraphQLList,
} from 'graphql';
import { UserType } from '../types';
import { User } from '../../models';

const userQuery = {
  type: new GraphQLList(UserType),
  args: {
    id: {
      name: 'id',
      type: GraphQLInt,
    },
    username: {
      name: 'username',
      type: GraphQLString,
    },
    email: {
      name: 'email',
      type: GraphQLString,
    },
    notes: {
      name: 'notes',
      type: GraphQLString,
    },
    createdAt: {
      name: 'createdAt',
      type: GraphQLString,
    },
    updatedAt: {
      name: 'updatedAt',
      type: GraphQLString,
    },
  },
  resolve: (user, args) => User.findAll({
    where: args,
  }),
};

export default userQuery;
