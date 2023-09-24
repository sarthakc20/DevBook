const nodeMailer = require("nodemailer");

const sendEmail = async (options) => {
  // options object {email, subject, message}
  let transporter = await nodeMailer.createTransport({
    service: "gmail", // SMTP = Simple Mail Transfer Protocol
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.SMTP_MAIL,
      pass: process.env.SMTP_PASSOWRD,
    },
  });

  let mailOptions = {
    from: "emaket097@gmail.com",
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
