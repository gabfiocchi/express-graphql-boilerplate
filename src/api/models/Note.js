import sequelize from '../../config/database';

const Sequelize = require('sequelize');


const tableName = 'notes';

const Note = sequelize.define('Note', {
  note: {
    type: Sequelize.STRING,
  },
}, { tableName });

module.exports = { Note };
