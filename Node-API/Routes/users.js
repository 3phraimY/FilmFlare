const express = require("express");
const router = express.Router();
const UserData = require("../Schemas/UserData.js");
const mongoose = require("mongoose");

//POST user
router.post("/adduser", async (req, res) => {
  console.log("attempting to POST");
  try {
    const UserData = new UserData(req.body);
    console.log(UserData);
    await UserData.save();
    res.send("OK");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//GET all users

//GET single user

//PATCH single user

//DELETE single user 
async function deleteUser(userId) {
  const apiUrl = 'my URL'; 

  try {
      const response = await fetch(`${apiUrl}${userId}`, {
          method: 'DELETE',
          headers: {
              'Content-Type': 'application/json',
          }
      });

      if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
      }

      alert('User deleted successfully');
  } catch (error) {
      console.error('Failed to delete user:', error);
      alert('Failed to delete user');
  }
}

// I need to find a way to attach the Listner to the button. 
document.getElementById('deleteUserButton').addEventListener('click', function() {
  const userId = this.getAttribute('data-user-id');
  deleteUser(userId);
});



module.exports = router;
