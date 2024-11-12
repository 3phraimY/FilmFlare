const express = require("express");
const router = express.Router();
const UserData = require("../Schemas/UserData.js");

//POST user
router.post("/adduser", async (req, res) => {
  try {
    const userData = new UserData(req.body);
    await userData.save();
    res.send("OK");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//GET all users
router.get("/alluserdata", async (req, res) => {
  console.log("Trying to get alluserdata");
  const AllUserData = await UserData.find();
  res.status(200).json(AllUserData);
});
//GET single user
router.get("/getuser/:username", async (req, res) => {
  console.log("attempting to GET user");
  const username = req.params.username;

  try {
    const user = await UserData.findOne({ Username: username });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user);
  } catch (error) {
    console.error("Error retrieving user data:", error);
    res.status(500).json({ error: error.message });
  }
});

//PATCH single user
router.patch("/updateuser/:username", async (req, res) => {
  const username = req.params.username;
  const updateData = req.body;

  try {
    const updatedUser = await UserData.findOneAndUpdate(
      { Username: username },
      updateData,
      { new: true, runValidators: true }
    );
    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(updatedUser);
  } catch (error) {
    console.error("Error updating user data:", error);
    res.status(500).json({ error: error.message });
  }
});

//DELETE single user

module.exports = router;
