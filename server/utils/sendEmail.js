const { google } = require("googleapis");
const nodemailer = require("nodemailer");

const oAuth2Client = new google.auth.OAuth2(
  process.env.CLINET_ID,
  process.env.CLIENT_SECRET,
  process.env.REDIRECT_URI
);
oAuth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN });

// send email fuction
module.exports = sendEmail = async (userEmail, text, html) => {
  try {
    const access_token = await oAuth2Client.getAccessToken();
    const transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: "blogproject802@gmail.com",
        clientId: process.env.CLINET_ID,
        clientSecret: process.env.CLIENT_SECRET,
        refreshToken: process.env.REFRESH_TOKEN,
        accessToken: access_token,
      },
    });

    const mailOptions = {
      from: "blogproject802@gmail.com",
      to: userEmail,
      subject: "SOCIAL_APP",
      text: text,
      html: html,
    };

    const result = await transport.sendMail(mailOptions);
    return result;
  } catch (err) {
    return err;
  }
};
