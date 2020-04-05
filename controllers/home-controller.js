const mailjet = require("node-mailjet").connect(
  "2c99fdc71852f0d0462f1dba726f3d6e",
  "c6d15935dda204af494e6c026424a816"
);

exports.homeGet = async (req, res) => {
  const j = req.body;
  const request = mailjet.post("send", { version: "v3.1" }).request({
    Messages: [
      {
        From: {
          Email: "vgibsonsg@gmail.com",
          Name: "Mondo"
        },
        To: [
          {
            Email: "vgibsonsg@gmail.com",
            Name: "dor"
          }
        ],
        Subject: "הזמנה חדשה בחנות של מונדו",
        HTMLPart:
          `<body dir="rtl"><h1>הזמנה מ${j.details.name}</h1>` +
          j.cart.map(
            i =>
              `<div><span>${i.name + " " + i.count + " " + i.unit}</span></div>`
          ) +
          `<div><h2>פרטים:</h2></div><div> שם מלא: ${j.details.name}</div><div>טלפון: ${j.details.phone} </div><div> כתובת: ${j.details.address}</div></body>`
      }
    ]
  });
  request
    .then(r => {
      console.log("sent");
    })
    .error(e => console.log(e))
    .finally(() => res.status(200));
  console.log("ok");
};
