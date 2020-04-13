const { getCatalog, addToCatalog, addOrder } = require("../db");

const mailjet = require("node-mailjet").connect(
  process.env.MAILJET_API,
  process.env.MAILJET_SECRET
);

exports.send = async (req, res) => {
  const j = req.body;
  // Save to db
  addOrder(j);

  // Send as mail
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
                i.count * i.unit_count * i.estimate_quantity_per_unit +
                " " +
                i.unit +
                " (" +
                (i.price ? "₪" + i.price * i.count : "אין מחיר") +
                ")"
              }</span></div>`
          ) +
          `<p> סה"כ: ₪${j.cart
            .map((a) =>
              a.price && a.count
                ? a.price * a.count * a.estimate_quantity_per_unit
                : 0
            )
            .reduce(
              (a, b) => a + b,
              0
            )}</p><div><h2>פרטים:</h2></div><div> שם מלא: ${
            j.details.name
          }</div><div>טלפון: ${j.details.phone} </div><div> עיר: ${
            j.details.city
          }</div><div> כתובת: ${j.details.address}</div></body>`,
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

exports.catalog = async (req, res) => {
  const cat = await getCatalog();
  res.status(200).send(cat.rows);
};
