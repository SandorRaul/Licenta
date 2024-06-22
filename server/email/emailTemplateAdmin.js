const emailTemplateAdmin = (
  user_name,
  site_name,
  creation_time,
  password,
  key
) => {
  return `
<!DOCTYPE html>
<html>
<head>
</head>
<body>
<p>Dear ${user_name},</p>

<p>An admin account has been created for you on <strong>${site_name}</strong> as of date and time: ${creation_time}.</p>

<p>Account details:</p>
<ul>
  <li>Creation date and time: ${creation_time}</li>
  <li>Password: ${password}</li>
  <li>Security key: ${key}</li>
</ul>

<p>Please change your password immediately after your first login and keep the security key in a safe place.</p>

<p>If you did not request this account or believe this to be an error, please contact the support team immediately.</p>

<p>Sincerely,</p>
<p>The ${site_name} Team</p>
</body>
</html>
`;
};

module.exports = emailTemplateAdmin;
