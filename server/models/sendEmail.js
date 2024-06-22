const nodemailer = require("nodemailer");

function sendEmail(recipient, subject, text, html) {
  return new Promise((resolve, reject) => {
    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "raulsandor01@gmail.com",
        pass: "cebyiywbxrnbcfiq",
      },
    });

    const mail_configs = {
      from: "raulsandor01@gmail.com",
      to: recipient,
      subject: subject,
      text: text,
      html: html,
    };

    transporter.sendMail(mail_configs, function (error, info) {
      if (error) {
        console.log(error);
        return reject({ message: `An error has occurred: ${error}` });
      }
      return resolve({ message: "Email sent successfully" });
    });
  });
}

module.exports = sendEmail;
