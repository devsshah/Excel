require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Email Configuration
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.APP_PASSWORD
    }
});

// Route
app.post('/send-email', (req, res) => {
    const { name, mobile, email, query } = req.body;

    const mailOptions = {
        from: process.env.EMAIL,
        to: 'shah.dev.sandeep@gmail.com',
        subject: 'New Course Inquiry',
        text: `Name: ${name}\nMobile: ${mobile}\nEmail: ${email}\nQuery: ${query}`
    };

    transporter.sendMail(mailOptions, (error) => {
        if (error) return res.status(500).json({ error: 'Email failed' });
        res.status(200).json({ success: true });
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));