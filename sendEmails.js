const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');
require('dotenv').config(); // Load environment variables from .env file
console.log('Script is starting...');

// Create a transporter object using SMTP with environment variables
const transporter = nodemailer.createTransport({
    service: 'gmail', // Or use any email provider's SMTP settings
    auth: {
        user: process.env.EMAIL, // Your email from the environment variable
        pass: process.env.PASSWORD // Your email password from the environment variable
    }
});

// Read the list of email recipients from a file (data.txt or data.csv)
const emailFile = 'data.txt';
fs.readFile(emailFile, 'utf8', (err, data) => {
    if (err) {
        console.error(`Error reading email file: ${err}`);
        return;
    }

    // Split the data by newlines to get a list of email addresses
    const emails = data.split('\n').filter(Boolean);
    let sentCount = 0;
    let errorCount = 0;

    // Send emails to each recipient with an attachment
    emails.forEach(email => {
        let mailOptions = {
            from: process.env.EMAIL, // Sender address
            to: email.trim(), // Receiver address from the file
            subject: 'Test Email with Attachment', // Subject line
            text: 'Please see the attached file.', // Email text content
            attachments: [
                {
                    filename: 'testfile.txt', // The file you want to attach
                    path: path.join(__dirname, 'testfile.txt') // Path to the file
                }
            ]
        };

        // Send email
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(`Error sending email to ${email}: ${error}`);
                errorCount++;
            } else {
                console.log(`Email sent to ${email}: ${info.response}`);
                sentCount++;
            }

            // Log summary after all emails are processed
            if (sentCount + errorCount === emails.length) {
                console.log(`\nSummary:`);
                console.log(`Emails sent successfully: ${sentCount}`);
                console.log(`Errors encountered: ${errorCount}`);
            }
        });
    });
});
