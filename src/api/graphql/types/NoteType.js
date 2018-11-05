import {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString
} from 'graphql';

const NoteType = new GraphQLObjectType({
  name: 'Note',
  description: 'This represents a Note',
  fields: () => ({
    id: {
      type: GraphQLInt,
      resolve: (note) => note.id,
    },
    userId: {
      type: GraphQLInt,
      resolve: (note) => note.userId,
    },
    note: {
      type: GraphQLString,
      resolve: (note) => note.note,
    },
    createdAt: {
      type: GraphQLString,
      resolve: (note) => note.createdAt,
    },
    updatedAt: {
      type: GraphQLString,
      resolve: (note) => note.createdAt,
    },
  }),
});

export default NoteType;