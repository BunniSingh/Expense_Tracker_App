const nodemailer = require("nodemailer");
require("dotenv").config();

const sendMail = async (to, subject, html) => {
  //   const transporter = nodemailer.createTransport({
  //     service: 'Gmail',
  //     auth: {
  //         user: "maddison53@ethereal.email",
  //         pass: "jn7jnAPss4f63QBp6D"
  //     //   user: process.env.EMAIL,
  //     //   pass: process.env.PASS,
  //     }
  //   });


  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
    auth: {
      user: "gilda98@ethereal.email",
      pass: "q3qkpJYU4Rrg2nAdXs",
    },
  });

  await transporter.sendMail({
    // from: `"Expense Tracker" <${process.env.EMAIL_USER}>`,
    from: `"Expense Tracker" <gilda98@ethereal.email>`,
    to,
    subject,
    html,
  });
};

module.exports = sendMail;
