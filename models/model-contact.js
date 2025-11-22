const mongoose = require('mongoose');

/**
 * @openapi
 * components:
 *   schemas:
 *     Contact:
 *       type: object
 *       required:
 *         - firstName
 *         - lastName
 *         - email
 *         - favoriteColor
 *         - birthday
 *       properties:
 *         _id:
 *           type: string
 *           example: "507f1f77bcf86cd799439011"
 *         firstName:
 *           type: string
 *           example: "John"
 *         lastName:
 *           type: string
 *           example: "Doe"
 *         email:
 *           type: string
 *           example: "john@example.com"
 *         favoriteColor:
 *           type: string
 *           example: "blue"
 *         birthday:
 *           type: string
 *           example: "1990-01-15"
 */

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