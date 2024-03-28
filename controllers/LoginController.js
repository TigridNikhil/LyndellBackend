const User = require('../models/LoginModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const SignUp = async (req, res) => {
    const { email, password } = req.query;
      try {
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ error: 'User already exists' });
        }
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10); // 10 is the salt rounds
        // Create a new user with the hashed password
        const newUser = await User.create({ email, password: hashedPassword });
        res.json({ message: 'Signup Successful', user: newUser });
    } catch (error) {
        console.error('Error during signup:', error);
        res.status(500).json({ error: 'An error occurred' });
    }
};



const Login = async (req, res) => {
    const { email, password } = req.query;
    try {
        const CheckUser = await User.findOne({ where: { email: email.toLowerCase() } });
 
        if (CheckUser) {
            const isPasswordValid = await bcrypt.compare(password, CheckUser.dataValues.password);
            if (isPasswordValid) {
                // Generate JWT token
                const token = jwt.sign({ email: CheckUser.dataValues.email }, 'your_secret_key', { expiresIn: '1h' });
                res.json({ message: 'Login successful', token });
            } else {
                res.status(401).json({ error: 'Invalid credentials' });
            }
        } else {
            res.status(401).json({ error: 'User not found' });
        }
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ error: 'An error occurred' });
    }
};




module.exports = {
    Login,
    SignUp
}