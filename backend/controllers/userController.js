// const User = require('../models/User');
// const jwt = require('jsonwebtoken');
// const bcrypt = require('bcrypt'); // Make sure bcrypt is imported
// require('dotenv').config();

// exports.register = async (req, res) => {
//   try {
//     const { name, email, password } = req.body;

//     // Check if user already exists
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({ message: 'User already exists' });
//     }

//     // Hashing the password
//     const hashedPassword = await bcrypt.hash(password, 10);
    
//     // Create a new user
//     const newUser = new User({ name, email, password: hashedPassword });
//     await newUser.save();
    
//     res.status(201).json({ message: 'User created successfully' });
//   } catch (error) {
//     console.error('Error creating user:', error); // Log the error for debugging
//     res.status(500).json({ message: 'Error creating user' });
//   }
// };

// exports.login = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     // Find the user by email
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     // Check password validity
//     const isPasswordCorrect = await bcrypt.compare(password, user.password);
//     if (!isPasswordCorrect) {
//       return res.status(401).json({ message: 'Invalid credentials' });
//     }

//     // Generate JWT token
//     const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    
//     res.status(200).json({ token });
//   } catch (error) {
//     console.error('Error logging in:', error); // Log the error for debugging
//     res.status(500).json({ message: 'Error logging in' });
//   }
// };


const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt'); // Make sure bcrypt is imported
require('dotenv').config();

exports.register = async (req, res) => {
  try {
    const { name, email, password, username } = req.body; // Include username in destructuring

    // Validate input
    if (!name || !email || !password || !username) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Check if username already exists
    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      return res.status(400).json({ message: 'Username already taken' });
    }

    // Hashing the password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Create a new user
    const newUser = new User({ name, email, password: hashedPassword, username });
    await newUser.save();
    
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error('Error creating user:', error); // Log the error for debugging
    res.status(500).json({ message: 'Error creating user' });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check password validity
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    
    // Send back token and user info (excluding password)
    res.status(200).json({
      token,
      user: { id: user._id, name: user.name, email: user.email } // Return necessary user info
    });
  } catch (error) {
    console.error('Error logging in:', error); // Log the error for debugging
    res.status(500).json({ message: 'Error logging in' });
  }
};