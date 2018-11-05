import {
  GraphQLInt,
  GraphQLString,
  GraphQLList
} from 'graphql';
import {
  NoteType
} from '../types';
import {
  Note
} from '../../models';

const noteQuery = {
  type: new GraphQLList(NoteType),
  args: {
    id: {
      name: 'id',
      type: GraphQLInt,
    },
    userId: {
      name: 'userId',
      type: GraphQLInt,
    },
    note: {
      name: 'note',
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
  resolve: (user, args) => Note.findAll({
    where: args
  }),
};

export default noteQuery;