const functions = require("firebase-functions");
const admin = require("firebase-admin");
const { STATUS_ORDER_PLACED } = require("./constants");
admin.initializeApp();

exports.createStripeCheckout = functions.https.onCall(async (data, context) => {
  // stripe initialization
  const stripe = require("stripe")(functions.config().stripe.secret_key);
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "payment",
    success_url: data.success_url,
    cancel_url: data.cancel_url,
    line_items: data.line_items,
    metadata: {
      uid: context.auth.uid,
      address: data.address,
    },
  });

  return {
    id: session.id,
  };
});

exports.stripeWebhook = functions.https.onRequest(async (req, res) => {
  try {
    const { uid, address } = req.body.data.object.metadata;
    const db = admin.database();

    const cartRef = await db.ref(`users/${uid}/cart`).once("value");
    const products = await cartRef.val();

    const order = {
      products,
      date_ordered: Date().toString(),
      status: STATUS_ORDER_PLACED,
      address,
    };

    const orderRef = db.ref(`users/${uid}/orders`);
    orderRef
      .push(order)
      .then((result) => {
        return res.sendStatus(200);
      })
      .catch((err) => res.status(400).json({ err: err.message }));
  } catch (err) {
    return res.json({ success: false, message: err.message });
  }
});
