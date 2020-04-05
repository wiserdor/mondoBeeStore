var express = require('express');
var router = express.Router();
const mailjet = require ('node-mailjet')
.connect('2c99fdc71852f0d0462f1dba726f3d6e', 'c6d15935dda204af494e6c026424a816')

router.post("/send-mail", (req, res) => {
    const request = mailjet.post("send", { version: "v3.1" }).request({
      Messages: [
        {
          From: {
            Email: "vgibsonsg@gmail.com",
            Name: "dor",
          },
          To: [
            {
              Email: "vgibsonsg@gmail.com",
              Name: "dor",
            },
          ],
          Subject: "Greetings from Mailjet.",
          TextPart: "My first Mailjet email",
          HTMLPart:
            "<h3>Dear passenger 1, welcome to <a href='https://www.mailjet.com/'>Mailjet</a>!</h3><br />May the delivery force be with you!",
          CustomID: "AppGettingStartedTest",
        },
      ],
    });
  
    return res.status(200);
  });

module.exports = router;
