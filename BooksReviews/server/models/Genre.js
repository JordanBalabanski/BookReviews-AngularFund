const mongoose = require('mongoose');

const genreSchema = new mongoose.Schema({
  genre: {
    type: mongoose.Schema.Types.String,
    required: true
  }
});

const Genre = mongoose.model('genre', genreSchema);

module.exports = Genre;
