const express = require('express');
const router = express.Router();
const { getUsers, addUser, updateUser, deleteUser } = require('../dal');

// Render the user list
router.get('/', async (req, res) => {
  try {
    const users = await getUsers();
    res.render('listUsers', { users });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Render the add user form
router.get('/add', (req, res) => {
  res.render('addUser');
});

// Render the edit user form
router.get('/edit/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const users = await getUsers();
    const user = users.find(user => user.id === parseInt(id));
    if (!user) return res.status(404).send('User not found');
    res.render('editUser', { user });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Handle user deletion
router.get('/delete/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await deleteUser(id);
    res.redirect('/');
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;
