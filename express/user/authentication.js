import express from 'express';
import User from './models/user.model.js';
import nodemailer from 'nodemailer';
import bcrypt from "bcrypt";

const router = express.Router()

// Create an instance of nodemailer for sending emails
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'gopala200218@gmail.com',
        pass: 'yowe mcjt hfjy qcse',
    },
});


// POST /create_user
router.post('/signup', async (req, res) => {
    console.log("inside register");
    const { email, username, password } = req.body;

    // Check if user already exists
    if (await User.findOne({ email })) {
        return res.status(400).json({ error: 'User with this email already exists' });
    }

    // Create new user
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ email, username, password: hashedPassword });

    await user.save();

    // Generate verification token
    const verificationToken = `${email}-${username}`;

    // Send verification email
    const verificationLink = `http://localhost:3000/verify_email/${verificationToken}/${username}`;  // Replace with your actual domain
    const message = `Hello ${username},\n\nPlease click the following link to verify your email: ${verificationLink}`;

    try {
        await transporter.sendMail({
            from: 'gopala200218@gmail.com',
            to: email,
            subject: 'Email Verification',
            text: message,
        });

        return res.status(201).json({ message: 'Check mail to activate account' });
    } catch (error) {
        return res.status(500).json({ error: 'Error sending verification email' });
    }
});

// POST /verify_email
router.post('/emailVerify', async (req, res) => {
    const token = req.body.token;

    if (token) {
        const [email] = token.split('-');
        const user = await User.findOne({ email });

        if (user) {
            user.is_active = true;
            await user.save();
            return res.status(200).json({ message: 'Email verified successfully. You can now log in.' });
        } else {
            return res.status(400).json({ error: 'Invalid or expired token' });
        }
    } else {
        return res.status(400).json({ error: 'Token not provided' });
    }
});

// POST /verify_user
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    // Authenticate user
    const user = await User.findOne({ email });

    if (user) {
        const isMatch = await bcrypt.compare(password, user.password);

        if (isMatch) {
            return res.status(200).json({
                username: user.username,
                email: user.email,
            });
        } else {
            return res.status(401).json({ error: 'Invalid email or password' });
        }
    } else {
        return res.status(401).json({ error: 'User Not Found Sign Up First' });
    }
});

// POST /google_user
router.post('/google', async (req, res) => {
    const { username, email } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
        return res.status(200).json({ message: "User Found" });
    } else {
        const newUser = new SignUpTable({ email, username });
        await newUser.save();
        return res.status(200).json({ message: "User Created" });
    }
});



export default router;