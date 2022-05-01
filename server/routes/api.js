const express = require("express");
const router = express.Router();

const getCart = require('../../mocks/get-cart.json');
const createCart = require('../../mocks/create-cart.json');
const schema = require('../../mocks/open-api.json');

router.post("/get-operation", (req, res) => {
  const { source, operationId } = req.body;
  switch (operationId) {
    case 'com.wix.ecom.cart.api.v1.CartService.GetCart':
      return res.status(200).send({ schema, operation: getCart });
    case 'com.wix.ecom.cart.api.v1.CartService.Create':
      return res.status(200).send({ schema, operation: createCart });
    default:
      return res.send("Operation not found");
      break;
  }
});

module.exports = router;
