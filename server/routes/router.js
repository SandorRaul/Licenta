const express = require("express");
const router = new express.Router();
const Products = require("../models/productsSchema");
const Elements = require("../models/interface");
const ProductsClothes = require("../models/productsSchemaClothes");
const USER = require("../models/userSchema");
const Clienthelp = require("../models/clientservice");
const bcrypt = require("bcryptjs");
const authenticate = require("../middleware/authenticate");
const sendEmail = require("../models/sendEmail");
const emailTemplate = require("../email/emailTemplate");
const emailTemplateAdmin = require("../email/emailTemplateAdmin");
const emailTemplateUser = require("../email/emailTemplateUser");
const emailTemplatePayment = require("../email/emailTemplatePayment");
const Payment = require("../models/paymentSchema");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "../client/public/images/clothes/images"); // Ensure this directory exists or is correctly configured in your server
  },
  filename: (req, file, cb) => {
    cb(
      null,
      new Date().toISOString().replace(/:/g, "-") + "-" + file.originalname
    );
  },
});

const upload = multer({ storage: storage });

//get elements by id for interfaces api
router.get("/getelements/:id", async (req, res) => {
  try {
    const id = req.params.id; // Correctly retrieve the id from request parameters
    console.log("Fetching elements for ID:", id);
    const elementsdata = await Elements.findOne({ id: id }); // Use the retrieved id to find the elements
    if (elementsdata) {
      console.log("E bine !!!!! ");
      res.status(201).json(elementsdata); // Use 201 status for successful GET request
    } else {
      res.status(404).json({ message: "No elements found for this ID" });
    }
  } catch (error) {
    console.log("error" + error.message);
    res
      .status(500)
      .json({ message: "Error fetching elements: " + error.message });
  }
});

//get elements for interfaces api
router.get("/getelements", async (req, res) => {
  try {
    const elementsdata = await Elements.find(); // Use the retrieved id to find the elements
    if (elementsdata) {
      console.log("E bine !!!!! ");
      res.status(201).json(elementsdata); // Use 201 status for successful GET request
    } else {
      res.status(404).json({ message: "No elements found for this ID" });
    }
  } catch (error) {
    console.log("error" + error.message);
    res
      .status(500)
      .json({ message: "Error fetching elements: " + error.message });
  }
});

//get productsdata api
router.get("/getproducts", async (req, res) => {
  try {
    const productsdata = await Products.find();
    res.status(201).json(productsdata);
  } catch (error) {
    console.log("error" + error.message);
  }
});

//get producsdata clothes

router.get("/getproductsclothes", async (req, res) => {
  try {
    const productsdata = await ProductsClothes.find();
    res.status(201).json(productsdata);
  } catch (error) {
    console.log("error" + error.message);
  }
});

router.get("/getproductsclothes/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const productsdata = await ProductsClothes.findOne({ id: id });
    res.status(201).json(productsdata);
  } catch (error) {
    console.log("error" + error.message);
  }
});

//get individual electronics data
router.get("/getproductsone/:code", async (req, res) => {
  try {
    const { code } = req.params;
    // console.log(id);
    const individuadata = await Products.findOne({ code: code });
    console.log(individuadata + "individual data");
    res.status(201).json(individuadata);
  } catch (error) {
    console.log("error" + error.message);
  }
});
//get products filtered by id
router.get("/getproductsjeans/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const productsData = await ProductsClothes.find({ id: id });
    console.log(productsData + " products data");
    res.status(200).json(productsData);
  } catch (error) {
    console.log("error +" + error.message);
    res.status(500).json({ message: error.message });
  }
});

router.get("/getproductst-shirts/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const productsData = await ProductsClothes.find({ id: id });
    console.log(productsData + " products data");
    res.status(200).json(productsData);
  } catch (error) {
    console.log("error" + error.message);
    res.status(500).json({ message: error.message });
  }
});

router.get("/getproductshoodie/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const productsData = await ProductsClothes.find({ id: id });
    console.log(productsData + " products data");
    res.status(200).json(productsData);
  } catch (error) {
    console.log("error" + error.message);
    res.status(500).json({ message: error.message });
  }
});

//get individual clothes data
router.get("/getproductsoneclothes/:code", async (req, res) => {
  try {
    const { code } = req.params;
    // console.log(id);
    const individuadata = await ProductsClothes.findOne({ code: code });
    console.log(individuadata + "individual data");
    res.status(201).json(individuadata);
  } catch (error) {
    console.log("error" + error.message);
  }
});

//register data

router.post("/register", async (req, res) => {
  // console.log(req.body);

  const { fname, email, mobile, password, cpassword } = req.body;
  if (!fname || !email || !mobile || !password || !cpassword) {
    res.status(422).json({ error: "fill the all data" });
    console.log("not data available");
  }

  try {
    const preuser = await USER.findOne({ email: email });
    const emailBodyUser = emailTemplateUser(
      fname,
      "VogueMagazine.ro",
      new Date().toString()
    );
    if (preuser) {
      res.status(422).json({ error: "this user is already present" });
    } else if (password !== cpassword) {
      res.status(422).json({ error: "password and cpassword not match" });
    } else {
      const finalUser = new USER({
        fname,
        email,
        mobile,
        password,
        cpassword,
        userType: "user",
        subscription: false,
        catergory: "",
      });

      //harsh -> encrypt->hujug ->> decrypt ->harsh
      //bcrptjs

      //password hasing process
      const storedata = await finalUser.save();

      sendEmail(
        email, // destinatar
        "Confirmare Autentificare Reușită", // subiect
        "",
        emailBodyUser
      )
        .then((response) => {
          console.log(response.message);
        })
        .catch((error) => {
          console.error("Eroare la trimiterea email-ului: ", error);
        });

      console.log(storedata + "user succ added");
      res.status(201).json(storedata);
    }
  } catch (error) {}
});

//register data as an admin

router.post("/register_admin", async (req, res) => {
  // console.log(req.body);

  const { fname, cnp, email, mobile, password, cpassword, key } = req.body;
  // console.log(password);
  if (!fname || !email || !mobile || !cnp) {
    res.status(422).json({ error: "fill the all data" });
    console.log("not data available");
  }
  try {
    const preuser = await USER.findOne({ email: email });
    //console.log(password);
    const emailBodyAdmin = emailTemplateAdmin(
      fname,
      "VogueMagazin.ro",
      new Date().toString(),
      password,
      key
    );
    if (preuser) {
      res.status(422).json({ error: "this user is already present" });
    } else {
      const finalUser = new USER({
        fname,
        cnp,
        email,
        mobile,
        password,
        cpassword,
        key,
        userType: "admin",
      });

      //harsh -> encrypt->hujug ->> decrypt ->harsh
      //bcrptjs

      //password hasing process

      const storedata = await finalUser.save();
      sendEmail(
        email, // destinatar
        "Confirmare Autentificare Reușită", // subiect
        "",
        emailBodyAdmin
      )
        .then((response) => {
          console.log(response.message);
        })
        .catch((error) => {
          console.error("Eroare la trimiterea email-ului: ", error);
        });
      //sending data to email
      console.log(storedata + "user succ added");
      res.status(201).json(storedata);
    }
  } catch (error) {}
});

//login user api
router.post("/login", async (req, res) => {
  const { email, password, userType, key } = req.body;
  if (!email || !password) {
    console.log("1 ");
    return res.status(400).json({ error: "Fill all the required data" });
  }

  try {
    const userlogin = await USER.findOne({ email });

    if (!userlogin) {
      return res.status(400).json({ error: "Invalid details" });
    }

    const isMatch = await bcrypt.compare(password, userlogin.password);

    if (!isMatch) {
      return res.status(400).json({ error: "Invalid details" });
    }
    // Token genrate
    const token = await userlogin.generateAuthtokenn();
    // Cookie
    res.cookie("VogueMagazin", token, {
      expires: new Date(Date.now() + 900000),
      httpOnly: true,
    });
    const emailBody = emailTemplate(
      userlogin.fname,
      "VogueMagazin.ro",
      new Date().toString()
    );
    if (userType === "admin" && userlogin.userType === "admin") {
      if (key !== userlogin.key) {
        return res.status(400).json({ error: "Invalid details" });
      } else {
        sendEmail(
          email,
          "Confirmation succesfully", // subiect
          "",
          emailBody
        )
          .then((response) => {
            console.log(response.message);
          })
          .catch((error) => {
            console.error("Eroare la trimiterea email-ului: ", error);
          });
        res.status(201).json(userlogin);
      }
    } else {
      if (userType === "user" && userlogin.userType === "user") {
        sendEmail(
          email, // destinatar
          "Confirmation succesfully", // subiect
          "",
          emailBody
        )
          .then((response) => {
            console.log(response.message);
          })
          .catch((error) => {
            console.error("Eroare la trimiterea email-ului: ", error);
          });
        res.status(201).json(userlogin);
      } else {
        res.status(400).json({ error: "Invalid details" });
      }
    }
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: "Invalid details" });
  }
});

//adding the data into cart
router.post("/addcart/:code/:size", authenticate, async (req, res) => {
  try {
    const { code, size } = req.params;
    const cart = await ProductsClothes.findOne({ code: code });
    console.log(cart + " cart value ");

    const UserContact = await USER.findOne({ _id: req.userID });
    console.log(UserContact);

    if (UserContact) {
      cart.size = { [size]: 1 };
      const cartData = await UserContact.addcartdata(cart);
      await UserContact.save();
      console.log(cartData);
      res.status(201).json(UserContact);
    } else {
      res.status(401).json({ error: "invalid user" });
    }
  } catch (error) {
    res.status(401).json({ error: "invalid user" });
  }
});

router.post(
  "/addproduct",
  upload.fields([{ name: "url" }, { name: "detailUrl" }]),
  async (req, res) => {
    try {
      const {
        id,
        code,
        price,
        description,
        discount,
        category,
        color,
        material,
        size,
        gender,
      } = req.body;
      if (!req.files["url"] || !req.files["detailUrl"]) {
        return res
          .status(400)
          .json({ error: "Both image files are required!" });
      }

      const urlPath = req.files["url"][0].path;
      const detailUrlPath = req.files["detailUrl"][0].path;
      const url = "/images/clothes/images/" + path.basename(urlPath);
      const detailUrl =
        "/images/clothes/images/" + path.basename(detailUrlPath);

      if (
        !id ||
        !code ||
        !price ||
        !description ||
        !color ||
        !material ||
        !size ||
        !gender
      ) {
        return res
          .status(400)
          .json({ error: "Please fill all the required fields!" });
      }

      const parsedSize = JSON.parse(size);
      const capitalizeFirstLetter = (string) =>
        string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();

      const shortTitle = capitalizeFirstLetter(category);
      const longTitle = `${capitalizeFirstLetter(
        color
      )} ${capitalizeFirstLetter(category)}`;

      const newProduct = new ProductsClothes({
        id,
        code,
        url,
        detailUrl,
        title: { shortTitle, longTitle },
        price: parseFloat(price),
        description,
        discount: parseFloat(discount),
        category,
        color,
        material,
        size: parsedSize,
        gender,
      });

      // Uncomment the following lines to save to the database and send response
      const savedProduct = await newProduct.save();
      res.status(201).json(savedProduct);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ error: "There was an error processing your request." });
    }
  }
);

//get cart details
router.get("/cartdetails", authenticate, async (req, res) => {
  try {
    const buyuser = await USER.findOne({ _id: req.userID });

    let availableProductsCodes = [];
    for (let cartItem of buyuser.carts) {
      const product = await ProductsClothes.findOne({ code: cartItem.code });
      if (product && cartItem.size) {
        const sizeRequested = Object.keys(cartItem.size)[0];
        if (product.size[sizeRequested] && product.size[sizeRequested] > 0) {
          console.log(
            `Product code ${product.code} has size ${sizeRequested} in stock`
          );
          availableProductsCodes.push(product.code);
        } else {
          console.log(
            `Product code ${product.code} has not size ${sizeRequested} in stock`
          );
        }
        console.log(availableProductsCodes);
      }
    }
    res.status(201).json({
      buyuser: buyuser,
      availableProductsCodes: availableProductsCodes,
    });
  } catch (error) {
    console.log("error" + error);
  }
});

//get valid user

router.get("/validuser", authenticate, async (req, res) => {
  try {
    const validuserone = await USER.findOne({ _id: req.userID });
    res.status(201).json(validuserone);
  } catch (error) {
    console.log("error" + error);
  }
});

//remove item from cart
router.delete("/remove/:code/:size", authenticate, async (req, res) => {
  try {
    const { code, size } = req.params;
    console.log(size);
    let found = false;
    req.rootUser.carts = req.rootUser.carts.filter((cartItem) => {
      if (
        !found &&
        cartItem.code === code &&
        Object.keys(cartItem.size).includes(size) &&
        cartItem.size[size] === 1
      ) {
        found = true;
        return false;
      }
      return true;
    });

    await req.rootUser.save();
    res.status(201).json(req.rootUser);
    console.log("First matching item removed based on size and code");
  } catch (error) {
    console.log("error " + error);
    res.status(400).json({
      message: "Error removing the first matching item based on size and code",
    });
  }
});

//remove all items from cart
router.delete("/removeall/:availableCodes", authenticate, async (req, res) => {
  try {
    const { availableCodes } = req.params;
    const codesToRemove = availableCodes.split(",");

    console.log(availableCodes);

    req.rootUser.carts = req.rootUser.carts.filter(
      (cartItem) => !codesToRemove.includes(cartItem.code)
    );

    await req.rootUser.save();

    res.status(201).json(req.rootUser);
    console.log("All items removed from cart");
  } catch (error) {
    console.log("error " + error);
    res.status(400).json({ error: "Failed to clear the cart" });
  }
});

//token1,token2,token3

//for user logout
router.get("/logout", authenticate, (req, res) => {
  try {
    req.rootUser.tokens = req.rootUser.tokens.filter((curelem) => {
      return curelem.token !== req.token;
    });

    res.clearCookie("VogueMagazine.ro", { path: "/" });
    req.rootUser.save();
    res.status(201).json(req.rootUser.tokens);
    console.log("uuser logout");
  } catch (error) {
    //req.status(201).json(req.rootUser.tokens);
    console.log("error for user logout");
  }
});

router.post("/createpayment", async (req, res) => {
  const {
    userId,
    fname,
    email,
    mobile,
    address,
    county,
    postalCode,
    details,
    typeOfPayment,
    cardDetails,
    availableProducts,
  } = req.body;
  console.log(
    "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
  );
  console.log("Id:", userId);
  console.log("Type of Payment:", typeOfPayment);
  if (!fname || !mobile || !address || !county || !postalCode) {
    return res
      .status(422)
      .json({ error: "Please fill all the required fields." });
  }

  let totalPriceWithDiscount = 0;
  if (availableProducts) {
    console.log("BINEEEEEEEEEE");
    totalPriceWithDiscount = availableProducts.reduce((acc, currentItem) => {
      const discount = currentItem.discount || 0;
      const discountedPrice =
        currentItem.price - (currentItem.price * discount) / 100;
      return acc + discountedPrice;
    }, 0);

    // console.log('Total Price:', totalPrice);
  }
  console.log("Total Price:", totalPriceWithDiscount);
  console.log(
    "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
  );
  if (typeOfPayment === "visa" && cardDetails) {
    const { ownerName, cardNumber, cvv, expDate } = cardDetails;
    console.log("Card Owner Name:", ownerName);
    console.log("Card Number:", cardNumber);
    console.log("CVV:", cvv);
    console.log("Expiration Date:", expDate);
  }
  const paymentCount = await Payment.countDocuments();
  const incrementedPaymentCount = paymentCount + 1;

  console.log(
    "Numărul total de plăți/documente din baza de date este:",
    paymentCount
  );
  const newPayment = new Payment({
    countOrder: incrementedPaymentCount,
    id: userId,
    emailAccount: email,
    name: fname,
    mobile: mobile,
    address: address,
    county: county,
    postalCode: postalCode,
    details: details,
    typeOfPayment: {
      method: typeOfPayment,
    },
    cardDetails: {
      name: cardDetails.ownerName,
      cardNumber: cardDetails.cardNumber,
      CVV: cardDetails.cvv,
      expDate: cardDetails.expDate,
    },
    carts: availableProducts,
    price: totalPriceWithDiscount.toString(),
  });
  try {
    await newPayment.save();
    const emailBodyOrder = emailTemplatePayment(
      fname,
      "VogueMagazine",
      new Date().toString(),
      availableProducts,
      incrementedPaymentCount
    );
    sendEmail(
      email, // destinatar
      "Comanda ta a fost plasată cu succes!", // subiect
      "",
      emailBodyOrder
    )
      .then((response) => {
        console.log(response.message);
      })
      .catch((error) => {
        console.error("Eroare la trimiterea email-ului: ", error);
      });
    //sending data to email
    // console.log(storedata+"user succ added");
    res.status(201).json({ message: "Payment successfully created." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to create payment." });
  }
});

router.post("/decrement-stock", async (req, res) => {
  try {
    const { availableProducts } = req.body;

    if (!availableProducts || availableProducts.length === 0) {
      return res.status(400).json({ message: "Nu au fost furnizate produse." });
    }
    for (const product of availableProducts) {
      const { code, size } = product; // presupunem ca 'size' este un obiect de tipul { 'M': 1 }
      const sizeKey = Object.keys(size)[0]; // Extrage prima cheie din obiectul 'size'
      const sizePath = `size.${sizeKey}`;

      const updatedProduct = await ProductsClothes.findOneAndUpdate(
        { code, [sizePath]: { $gt: 0 } },
        { $inc: { [sizePath]: -size[sizeKey] } }, // decrementez stocul
        { new: true }
      );
      if (updatedProduct) {
        console.log(`Succes code ${code},size ${sizeKey}.`);
      } else {
        console.log(`Failed : product code ${code}, size ${sizeKey}.`);
      }
    }
    res.status(200).json({ message: "Succes" });
  } catch (error) {
    console.error("Error", error);
    res.status(500).json({ message: "Failed to update" });
  }
});
//create new element
router.post("/addelement", async (req, res) => {
  const { type, feature, newOne } = req.body;
  if (!newOne) {
    return res.status(400).json({ message: "No element" });
  }
  try {
    // Find the corresponding document
    const document = await Elements.findOne({ id: type });

    if (document) {
      // Check if 'newOne' already exists in the specified 'category' array
      if (document[feature] && document[feature].includes(newOne)) {
        // If the element already exists, send an appropriate message
        return res.status(409).json({ message: "Element already exists" }); // 409 Conflict
      }

      // If the element doesn't exist, update the document
      const updatedDocument = await Elements.findOneAndUpdate(
        { id: type },
        { $addToSet: { [feature]: newOne } }, // Use $addToSet to avoid duplicates
        { new: true }
      );

      console.log("Updated document:", updatedDocument);
      res.status(200).json({
        message: "Element updated successfully",
        data: updatedDocument,
      });
    } else {
      res.status(404).json({ message: "Document not found" });
    }
  } catch (error) {
    console.error("Error updating the document:", error);
    res
      .status(500)
      .json({ message: "An error occurred while updating the element." });
  }
});

router.post("/clientservice", async (req, res) => {
  const { orderNumber, message, userId } = req.body;
  const client = await USER.findOne({ _id: userId });
  const email = client.email;
  console.log("Aici email;;;; ", email);

  try {
    // Crearea unei noi instanțe a modelului Clienthelp
    const client = new Clienthelp({
      email,
      orderNumber,
      message,
    });

    await client.save();

    res.status(201).json({
      message: "Client service request saved successfully!",
    });
  } catch (error) {
    console.error("Error saving client service request:", error);
    res.status(500).json({
      message: "An error occurred while saving the client service request.",
      error: error.message,
    });
  }
});

module.exports = router;
