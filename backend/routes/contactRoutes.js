const express = require('express');
const router = express.Router();
const fetch = require('node-fetch'); // Make sure to install: npm install node-fetch

router.post('/contact', async (req, res) => {
    try {
        const { name, email, subject, message, inquiryType } = req.body;
        
        // Validation (keep existing validation)
        if (!name || !email || !subject || !message) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required'
            });
        }
        
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid email format'
            });
        }
        
        // Send email via Mailgun HTTP API
        const formData = new URLSearchParams();
        formData.append('from', 'contact@mg.techmobileinsights.com');
        formData.append('to', 'contact@techmobileinsights.com');
        formData.append('subject', `New Contact Form: ${inquiryType} - ${subject}`);
        formData.append('html', `
            <h2>New Contact Form Submission</h2>
            <p><strong>Type:</strong> ${inquiryType}</p>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Subject:</strong> ${subject}</p>
            <p><strong>Message:</strong></p>
            <p>${message.replace(/\n/g, '<br>')}</p>
            <hr>
            <p><small>Sent from Tech Mobile Insights Contact Form</small></p>
        `);

        // Using built-in fetch (no import needed)
        const response = await fetch(`https://api.mailgun.net/v3/mg.techmobileinsights.com/messages`, {
            method: 'POST',
            headers: {
                'Authorization': `Basic ${Buffer.from(`api:${process.env.MAILGUN_API_KEY}`).toString('base64')}`,
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: formData
        });

        if (!response.ok) {
            throw new Error(`Mailgun API error: ${response.statusText}`);
        }

        // Store in database (keep existing code)
        const ContactSubmission = require('../models/ContactSubmission');
        await new ContactSubmission({
            name,
            email,
            subject,
            message,
            inquiryType,
            submittedAt: new Date(),
            ipAddress: req.ip
        }).save();
        
        res.status(200).json({
            success: true,
            message: 'Message sent successfully! We\'ll get back to you soon.'
        });
        
    } catch (error) {
        console.error('Contact form error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to send message. Please try again later.'
        });
    }
});

// Keep your existing GET route
router.get('/contact/submissions', async (req, res) => {
    try {
        const { page = 1, limit = 20 } = req.query;
        
        const ContactSubmission = require('../models/ContactSubmission');
        const submissions = await ContactSubmission.find()
            .sort({ submittedAt: -1 })
            .limit(parseInt(limit))
            .skip((parseInt(page) - 1) * parseInt(limit));
        
        const total = await ContactSubmission.countDocuments();
        
        res.json({
            success: true,
            data: {
                submissions,
                pagination: {
                    currentPage: parseInt(page),
                    totalPages: Math.ceil(total / parseInt(limit)),
                    totalSubmissions: total
                }
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

module.exports = router;
