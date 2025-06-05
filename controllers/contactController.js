import Contact from '../models/Contact.js';

// GET all contacts
export async function listContacts(req, res) {
  try {
    const list = await Contact.find();
    res.json(list);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// GET contact by ID
export async function getContactById(req, res) {
  try {
    const doc = await Contact.findById(req.params.id);
    if (!doc) return res.status(404).json({ error: 'Contact not found' });
    res.json(doc);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// CREATE new contact
export async function createContact(req, res) {
  try {
    const { firstName, lastName, email, favoriteColor, birthday } = req.body;
    
    // Validate required fields
    if (!firstName || !lastName || !email) {
      return res.status(400).json({ error: 'firstName, lastName, and email are required' });
    }
    
    const newContact = new Contact({
      firstName,
      lastName,
      email,
      favoriteColor,
      birthday
    });
    
    const savedContact = await newContact.save();
    res.status(201).json(savedContact);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// UPDATE contact
export async function updateContact(req, res) {
  try {
    const { firstName, lastName, email, favoriteColor, birthday } = req.body;
    
    // Validate required fields
    if (!firstName || !lastName || !email) {
      return res.status(400).json({ error: 'firstName, lastName, and email are required' });
    }
    
    const updatedContact = await Contact.findByIdAndUpdate(
      req.params.id,
      { firstName, lastName, email, favoriteColor, birthday },
      { new: true, runValidators: true }
    );
    
    if (!updatedContact) {
      return res.status(404).json({ error: 'Contact not found' });
    }
    
    res.json(updatedContact);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// DELETE contact
export async function deleteContact(req, res) {
  try {
    const deletedContact = await Contact.findByIdAndDelete(req.params.id);
    
    if (!deletedContact) {
      return res.status(404).json({ error: 'Contact not found' });
    }
    
    res.status(200).json({ message: 'Contact deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
