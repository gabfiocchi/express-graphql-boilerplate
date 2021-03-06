import {
  GraphQLString,
  GraphQLInt,
  GraphQLNonNull,
} from 'graphql';
import { NoteType } from '../types';
import { Note } from '../../models';

const createNote = {
  type: NoteType,
  description: 'The mutation that allows you to create a new Note',
  args: {
    userId: {
      name: 'userId',
      type: new GraphQLNonNull(GraphQLInt),
    },
    note: {
      name: 'note',
      type: new GraphQLNonNull(GraphQLString),
    },
  },
  resolve: (_value, {
    userId,
    note,
  }) => (
    Note.create({
      userId,
      note,
    })
  ),
};
const updateNote = {
  type: NoteType,
  description: 'The mutation that allows you to update an existing Note by Id',
  args: {
    id: {
      name: 'id',
      type: new GraphQLNonNull(GraphQLInt),
    },
    userId: {
      name: 'userId',
      type: new GraphQLNonNull(GraphQLInt),
    },
    note: {
      name: 'note',
      type: GraphQLString,
    },
  },
  resolve: async (value, {
    id,
    userId,
    note,
  }) => {
    const foundNote = await Note.findById(id);

    if (!foundNote) {
      throw new Error(`Note with id: ${id} not found!`);
    }

    const updatedNote = {
      ...foundNote,
      userId,
      note,
    };


    return foundNote.update(updatedNote);
  },
};

const deleteNote = {
  type: NoteType,
  description: 'The mutation that allows you to delete a existing Note by Id',
  args: {
    id: {
      name: 'id',
      type: new GraphQLNonNull(GraphQLInt),
    },
  },
  resolve: async (value, {
    id,
  }) => {
    const foundNote = await Note.findById(id);

    if (!foundNote) {
      throw new Error(`Note with id: ${id} not found!`);
    }

    await Note.destroy({
      where: {
        id,
      },
    });

    return foundNote;
  },
};

export {
  createNote,
  updateNote,
  deleteNote,
};
