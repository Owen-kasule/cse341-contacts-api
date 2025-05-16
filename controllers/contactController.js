import Contact from '../models/Contact.js';

// GET /contacts
export async function listContacts(req, res) {
  try {
    const list = await Contact.find();
    res.json(list);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// GET /contacts/:id
export async function getContactById(req, res) {
  try {
    const doc = await Contact.findById(req.params.id);
    if (!doc) return res.status(404).json({ error: 'Not found' });
    res.json(doc);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
