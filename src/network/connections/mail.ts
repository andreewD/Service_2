import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_TOKEN,
  },
});

transporter.verify().then(() => {
  console.log("Ready for send emails.");
});

export { transporter };
