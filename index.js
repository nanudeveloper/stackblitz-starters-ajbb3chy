const express = require('express');
const { resolve } = require('path');

const app = express();
const port = 3000;

app.use(express.static('static'));
let taxRate = 5;
let discountPercentage = 10;
let royaltyRate = 2;

function getTotalCartPrice(newItemPrice, cartTotal, item1, item2, item3) {
  let totalCartValue;
  totalCartValue = cartTotal + newItemPrice + item1 + item2 + item3;
  return totalCartValue;
}

app.get('/cart-total', (req, res) => {
  let newItemPrice = parseFloat(req.query.newItemPrice);
  let cartTotal = parseFloat(req.query.cartTotal);
  let item1 = parseFloat(req.query.item1);
  let item2 = parseFloat(req.query.item2);
  let item3 = parseFloat(req.query.item3);

  res.send(
    getTotalCartPrice(newItemPrice, cartTotal, item1, item2, item3).toString()
  );
});

//solution 2
app.get('/membership-discount', (req, res) => {
  let cartTotal = parseFloat(req.query.cartTotal);
  let isMember = req.query.isMember === 'true';
  let discount;
  if (isMember) {
    discount = cartTotal - (cartTotal * discountPercentage) / 100;
  } else {
    discount = cartTotal;
  }

  res.send('after discount ' + discount.toString());
});

//solution 3
function taxCalculate(cartTotal) {
  let cartTotalAfterTax = cartTotal + (cartTotal * taxRate) / 100;
  return 'cartTotalAfterTax is:' + cartTotalAfterTax;
}

app.get('/calculate-tax', (req, res) => {
  let cartTotal = parseFloat(req.query.cartTotal);
  res.send(taxCalculate(cartTotal).toString());
});

//solution 4

function ship(shippingMethod, distance) {
  let estimateTime;
  if (shippingMethod === 'standard') {
    estimateTime = distance / 50;
    return 'estimate days will be :' + estimateTime.toString();
  } else {
    estimateTime = distance / 100;
    return 'estimated days will be : ' + estimateTime.toString();
  }
}

app.get('/estimate-delivery', (req, res) => {
  let shippingMethod = req.query.shippingMethod;
  let distance = parseFloat(req.query.distance);
  res.send(ship(shippingMethod, distance));
});

//solution 5
function price(weight, distance) {
  let totalCost = weight * distance * 0.1;
  return ' your shipping cost will be: ' + totalCost.toString();
}

app.get('/shipping-cost', (req, res) => {
  let weight = parseFloat(req.query.weight);
  let distance = parseFloat(req.query.distance);
  res.send(price(weight, distance).toString());
});
//solution 7

function royalty(purchaseAmount) {
  let totalRoyalty = purchaseAmount * royaltyRate;
  return ' your total royalty will be :' + totalRoyalty;
}

app.get('/loyalty-points', (req, res) => {
  let purchaseAmount = parseFloat(req.query.purchaseAmount);

  res.send(royalty(purchaseAmount).toString());
});
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
