const nodemailer = require('nodemailer');
require('dotenv').config();

const sendMail = async (to, subject, html) => {
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASS,
    }
  });

  await transporter.sendMail({
    from: `"Expense Tracker" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    html
  });
};

module.exports = sendMail;
