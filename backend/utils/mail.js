const nodemailer = require("nodemailer");
const { PASSWORD, EMAIL } = require("../config/config");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    pass: PASSWORD,
    user: EMAIL,
  },
});

function sendMail(to, subject, text) {
  transporter
    .sendMail({
      from: EMAIL,
      to: to,
      subject: subject,
      text: text,
    })
    .then(() => {
      console.log(`Email send successfully to ${to}`);
    })
    .catch((error) => {
      console.error("Error sending the mail:", error);
    });
}

module.exports = {
    sendMail
}