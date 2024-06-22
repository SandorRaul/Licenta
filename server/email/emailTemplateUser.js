const emailTemplateUser = (user_name, site_name, creation_time) => {
  return `
<!DOCTYPE html>
<html>
<head>
  <style>
    body {
      font-family: 'Arial', sans-serif;
      color: #333;
      line-height: 1.6;
    }
    .container {
      width: 80%;
      margin: 20px auto;
      padding: 20px;
      border: 1px solid #ddd;
      border-radius: 5px;
      background: #f9f9f9;
    }
    .greeting {
      color: #2e6c80;
    }
    .content {
      margin-top: 20px;
    }
    .signature {
      margin-top: 40px;
      font-weight: bold;
    }
  </style>
</head>
<body>
  <div class="container">
    <p class="greeting">Welcome, ${user_name}!</p>
    
    <p>We're thrilled that you've chosen <strong>${site_name}</strong>! Your account has been successfully created as of date and time: ${creation_time}. We are here to support you at every step of your online experience.</p>
    
    <p class="content">To get started, we invite you to visit our site and explore our services and products. If you have any questions or need assistance, our support team is always here for you.</p>
    
    <p class="content">We strive to provide you with the best experience and hope to exceed your expectations.</p>
    
    <p class="content">If you did not request this account or believe that it is an error, please contact us immediately.</p>
    
    <p class="signature">Sincerely,<br>The ${site_name} Team</p>
  </div>
</body>
</html>
`;
};

module.exports = emailTemplateUser;
