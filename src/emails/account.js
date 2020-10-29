const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendWelcomeEmail = (email, name) => {
  sgMail.send({
    to: email,
    from: 'dchen4300@gmail.com',
    subject: 'Thanks for joining in!',
    text: `Welcome to the app, ${name}. Let me know how you get along with the app`,
    html: `<h3>Welcome to the app, ${name}</h3><p>Let me know how you get along with the app</p>`,
  });
};

const sendCancelEmail = (email, name) => {
  sgMail.send({
    to: email,
    from: 'dchen4300@gmail.com',
    subject: "We're sorry to see you leave!",
    text: `Goodbye, ${name}. Is there anything we could have done to keep you as a customer?`,
  });
};

module.exports = {
  sendWelcomeEmail,
  sendCancelEmail,
};
