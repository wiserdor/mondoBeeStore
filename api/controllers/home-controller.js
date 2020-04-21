const { getCatalog, addToCatalog, addOrder, getToken, getOrders } = require("../db");

const mailjet = require("node-mailjet").connect(
  process.env.MAILJET_API,
  process.env.MAILJET_SECRET
);

exports.send = async (req, res) => {
  /**
   * Create an order and send mail to the owners
   */
  const j = req.body;
  // Save to db
  addOrder(j);

  // Send as mail
  let to_mails;
  const mail_arr = [];
  if (process.env.TO_EMAILS) to_mails = process.env.TO_EMAILS.split(" ");
  to_mails.forEach((m) => mail_arr.push({ Email: m }));
  const request = mailjet.post("send", { version: "v3.1" }).request({
    Messages: [
      {
        From: {
          Email: "vgibsonsg@gmail.com",
          Name: "Mondo",
        },
        To: mail_arr,
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
                i.unit_name +
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
          }</div><div> כתובת: ${j.details.address}</div><div> הערות: ${
            j.details.notes || ""
          }</div></body>`,
      },
    ],
  });
  request
    .then((r) => {
      res.status(200).send("ok");
    })
    .error((e) => res.status(500).send("an error occur"));
};

exports.catalog = async (req, res) => {
  try {
    const cat = await getCatalog();
    res.status(200).send(cat.rows);
  } catch (err) {
    res.status(500).send("error");
  }
};

exports.addToCatalog = async (req, res) => {
  try {
    const cat = await addToCatalog(req.body);
    res.status(200).send("ok");
  } catch (err) {
    res.status(500).send();
  }
};

exports.orders = async (req, res) => {
    try {
      const orders = await getOrders();
      res.status(200).send(orders.rows);
    } catch (err) {
        console.log(err.stack)
      res.status(500).send();
    }
  };
