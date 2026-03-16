const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  try {
    const { name, phone, password, address } = req.body;
    const existingUser = await User.findOne({ phone });
    if (existingUser) return res.status(400).json({ message: 'Phone number already registered!' });

    const hashedPassword = await bcrypt.hash(password, 12);
    const user = new User({ name, phone, password: hashedPassword, address });
    await user.save();
    res.status(201).json({ message: '✅ Registered successfully!' });
  } catch (err) {
    res.status(500).json({ message: 'Something went wrong!', error: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { phone, password } = req.body;
    const user = await User.findOne({ phone });
    if (!user) return res.status(404).json({ message: 'User not found!' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Wrong password!' });

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(200).json({
      message: '✅ Login successful!',
      token,
      user: { id: user._id, name: user.name, phone: user.phone, role: user.role }
    });
  } catch (err) {
    res.status(500).json({ message: 'Something went wrong!', error: err.message });
  }
};