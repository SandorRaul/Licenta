const emailTemplate = (user_name, site_name, login_time) => {
  return `
<!DOCTYPE html>
<html>
<head>
</head>
<body>
<p>Dear ${user_name},</p>

<p>We're informing you that you've successfully logged in to <strong>${site_name}</strong> on the date and time: ${login_time}. If this was you, no further action is required.</p>

<p>Login Details:</p>
<ul>
<li>Date and Time: ${login_time}</li>
</ul>

<p>If you do not recognize this activity, please take immediate action to protect your account.</p>

<p>...</p>

<p>Sincerely,</p>
<p>The ${site_name} Team</p>
</body>
</html>
`;
};

module.exports = emailTemplate;
