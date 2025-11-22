const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  favoriteColor: String,
  birthday: String
}, {
  versionKey: false
});

module.exports = mongoose.model('Contact', contactSchema);