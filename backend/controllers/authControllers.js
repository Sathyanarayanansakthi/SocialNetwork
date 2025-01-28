import bcrypt from 'bcryptjs';
import User from '../models/UserModel.js'; 

const signUp = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username) {
      return res.status(400).json({ error: 'Username is required' });
    }

    const exist = await User.findOne({ email });
    if (exist) {
      return res.status(400).json({ error: 'Email already in use' });
    }

    if (!password || password.length < 8) {
      return res.status(400).json({ error: 'Password must be at least 8 characters long' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });
    console.log(user)

    return res.status(201).json({
      message: 'User registered successfully',
      user,
    });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ error: 'Something went wrong. Please try again later.' });
  }
};

export { signUp };
