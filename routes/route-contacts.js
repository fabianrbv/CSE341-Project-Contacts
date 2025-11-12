const express = require('express');
const router = express.Router();
const Contact = require('../models/model-contact');

/**
 * @openapi
 * /contacts:
 *   get:
 *     summary: Get all contacts
 *     tags:
 *       - Contacts
 *     responses:
 *       '200':
 *         description: List of all contacts
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Contact'
 */
// GET all contacts
router.get('/', async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.json(contacts);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching contacts' });
  }
});

/**
 * @openapi
 * /contacts/{id}:
 *   get:
 *     summary: Get a contact by ID
 *     tags:
 *       - Contacts
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         example: "507f1f77bcf86cd799439011"
 *     responses:
 *       '200':
 *         description: Contact found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Contact'
 *       '404':
 *         description: Contact not found
 */
// GET contact by id
router.get('/:id', async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) return res.status(404).json({ message: 'Contact not found' });
    res.json(contact);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching contact' });
  }
});

/**
 * @openapi
 * /contacts:
 *   post:
 *     summary: Create a new contact
 *     tags:
 *       - Contacts
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Contact'
 *     responses:
 *       '201':
 *         description: Contact created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: "507f1f77bcf86cd799439011"
 *       '400':
 *         description: Missing required fields
 */
// POST create a new contact - all fields required
router.post('/', async (req, res) => {
  try {
    const { firstName, lastName, email, favoriteColor, birthday } = req.body;

    // simple validation - ensure all fields present
    if (!firstName || !lastName || !email || !favoriteColor || !birthday) {
      return res.status(400).json({ message: 'All fields (firstName, lastName, email, favoriteColor, birthday) are required' });
    }

    const newContact = new Contact({ firstName, lastName, email, favoriteColor, birthday });
    const saved = await newContact.save();

    // Return the new contact id in the response body
    return res.status(201).json({ id: saved._id });
  } catch (err) {
    return res.status(500).json({ message: 'Error creating contact' });
  }
});

/**
 * @openapi
 * /contacts/{id}:
 *   put:
 *     summary: Update a contact
 *     tags:
 *       - Contacts
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         example: "507f1f77bcf86cd799439011"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Contact'
 *     responses:
 *       '204':
 *         description: Contact updated successfully
 *       '400':
 *         description: Missing required fields
 *       '404':
 *         description: Contact not found
 */
// PUT update a contact by id
router.put('/:id', async (req, res) => {
  try {
    const { firstName, lastName, email, favoriteColor, birthday } = req.body;

    if (!firstName || !lastName || !email || !favoriteColor || !birthday) {
      return res.status(400).json({ message: 'All fields (firstName, lastName, email, favoriteColor, birthday) are required' });
    }

    const updated = await Contact.findByIdAndUpdate(
      req.params.id,
      { firstName, lastName, email, favoriteColor, birthday },
      { new: true }
    );

    if (!updated) return res.status(404).json({ message: 'Contact not found' });

    // Successful completion
    return res.sendStatus(204);
  } catch (err) {
    return res.status(500).json({ message: 'Error updating contact' });
  }
});

/**
 * @openapi
 * /contacts/{id}:
 *   delete:
 *     summary: Delete a contact
 *     tags:
 *       - Contacts
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         example: "507f1f77bcf86cd799439011"
 *     responses:
 *       '204':
 *         description: Contact deleted successfully
 *       '404':
 *         description: Contact not found
 */
// DELETE remove a contact by id
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Contact.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Contact not found' });

    // Successful deletion
    return res.sendStatus(204);
  } catch (err) {
    return res.status(500).json({ message: 'Error deleting contact' });
  }
});

module.exports = router;