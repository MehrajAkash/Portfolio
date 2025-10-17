const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();
app.use(cors());
app.use(express.json());

// --- MongoDB Connection ---
mongoose.connect('mongodb://localhost:27017/portfolio', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("MongoDB Connected")).catch(err => console.log(err));

// --- Contact Schema ---
const contactSchema = new mongoose.Schema({
    name: String,
    email: String,
    message: String,
    createdAt: { type: Date, default: Date.now }
});

const Contact = mongoose.model('Contact', contactSchema);

// --- Email Setup (Nodemailer) ---
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com", // use Gmail SMTP
    port: 587,
    secure: false,
    auth: {
        user: "your.email@gmail.com",       // your email
        pass: "your-app-password-or-OAuth"  // use App Password for Gmail
    }
});

// --- API Endpoint ---
app.post('/api/contact', async (req, res) => {
    try {
        const { name, email, message } = req.body;
        if (!name || !email || !message)
            return res.status(400).json({ error: "All fields required" });

        // --- Save to MongoDB ---
        const newContact = new Contact({ name, email, message });
        await newContact.save();

        // --- Send Email ---
        const mailOptions = {
            from: `"Portfolio Contact" <your.email@gmail.com>`,
            to: "your.email@gmail.com", // where you want to receive messages
            subject: `New Contact Form Submission from ${name}`,
            text: `Name: ${name}\nEmail: ${email}\nMessage:\n${message}`
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
                return res.status(500).json({ error: "Message saved but email failed" });
            } else {
                console.log('Email sent: ' + info.response);
                return res.status(200).json({ message: "Message sent and email delivered" });
            }
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Server error" });
    }
});

app.listen(3000, () => console.log("Server running on http://localhost:3000"));
