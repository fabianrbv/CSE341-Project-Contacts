const express = require('express');
const router = express.Router();
const Contact = require('../models/model-contact');

// GET all contacts
router.get('/', async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.json(contacts);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching contacts' });
  }
});


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

// POST create a new contact - all fields required
router.post('/', async (req, res) => {
  try {
    const { firstName, lastName, email, favoriteColor, birthday } = req.body;

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