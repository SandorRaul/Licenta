const orderConfirmationEmailTemplate = (
  user_name,
  site_name,
  order_time,
  cartdata,
  order_number
) => {
  // Calculating the final price of the entire order
  const finalPrice = cartdata.reduce(
    (acc, item) => acc + item.price * (1 - item.discount / 100),
    0
  );
  const capitalizeFirstLetter = (string) =>
    string.charAt(0).toUpperCase() + string.slice(1);
  return `
<!DOCTYPE html>
<html>
<head>
<style>
        .greeting {
            font-size: 20px; /* Mărimea fontului */
            font-weight: bold; /* Grosimea fontului */
            color: #333; /* Culoarea textului */
        }
        .order-number {
            font-size: 24px; /* Mărimi mai mare pentru numărul comenzii */
            font-weight: bold; /* Text îngroșat */
            color: #333; /* Culoarea textului */
            margin-bottom: 20px; /* Spațiu dedesubt */
        }
        .order-details div, .order-details p {
            margin: 0; /* Elimină marginile implicite */
            padding: 5px 0; /* Adaugă padding vertical pentru spațiu */
        }
        .order-details {
            border-bottom: 1px solid #ddd; /* Linie subțire la finalul detaliilor fiecărui produs */
        }
    </style>
</head>
<body>
    <p class="greeting">Dear ${user_name},</p>

    <p>Thank you for placing an order on ${site_name}. Your order has been successfully registered and is now being processed.</p>

    <p class="order-number">Order Number: ${order_number}</p>

    <p>Details of the order placed on date and time: ${order_time}</p>

    ${cartdata
      .map(
        (item) => `
        <div>
            <p><strong>${capitalizeFirstLetter(item.id)}</strong>, color: ${
          item.color
        }, material: ${item.material}, category: ${item.category}</p>
            <p>Price: ${item.price} lei</p>
            <p>Discount: ${
              item.discount ? `${item.discount}%` : "No discount"
            }</p>
            <p>Final Price: ${parseFloat(
              item.price - (item.price * (item.discount || 0)) / 100
            ).toFixed(2)} lei</p>
        </div>
        <hr>
    `
      )
      .join("")}

    <p>Total Final Price: ${finalPrice.toFixed(2)} lei</p>

    <p>You will receive another email once your order has been shipped. You can check the status of your order and its details by accessing your account on our website.</p>

    <p>If you have any questions or need further assistance, please do not hesitate to contact us.</p>

    <p>With respect,</p>
    <p>The ${site_name} Team</p>
</body>
</html>
    `;
};

module.exports = orderConfirmationEmailTemplate;
