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
          Name: "Mondo",
        },
        To: [
            {
              Email: "Adigolan0910@gmail.com",
              Name: "Adi",
            },
            {
              Email: "ronabasmat@gmail.com",
              Name: "Rona",
            },
        //   {
        //     Email: "vgibsonsg@gmail.com",
        //     Name: "Mondo",
        //   },
        ],
        Subject: "הזמנה חדשה בחנות של מונדו",
        HTMLPart:
          `<body dir="rtl"><h1>הזמנה מ${j.details.name}</h1>` +
          j.cart.map(
            (i) =>
              `<div><span>${
                i.name +
                " - " +
                "כמות:" +
                i.count +
                " | " +
                i.count * i.unitCount +
                " " +
                i.unit +
                " (" +
                (i.price ? "₪" + i.price * i.count : "אין מחיר") +
                ")"
              }</span></div>`
          ) +
          `<p> סה"כ: ₪${j.cart
            .map((a) => (a.price && a.count ? a.price * a.count : 0))
            .reduce(
              (a, b) => a + b
            )}</p><div><h2>פרטים:</h2></div><div> שם מלא: ${
            j.details.name
          }</div><div>טלפון: ${j.details.phone} </div><div> עיר: ${
            j.details.city
          }</div><div> כתובת: ${
            j.details.address
          }</div></body>`,
      },
    ],
  });
  request
    .then((r) => {
      console.log("sent");
    })
    .error((e) => console.log(e))
    .finally(() => res.status(200).send("ok"));
};
