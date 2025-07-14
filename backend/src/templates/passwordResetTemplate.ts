export const PASSWORD_RESET_TEMPLATE: string = `
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
  <title>Password Reset</title>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style type="text/css">
    body {
      margin: 0;
      padding: 0;
      background: #101820;
      font-family: 'Open Sans', Helvetica, Arial, sans-serif;
      color: #e2e8f0;
    }

    table {
      border-collapse: collapse;
    }

    .container {
      width: 100%;
      max-width: 600px;
      background-color: #1a2b34;
      margin: 50px auto;
      border-radius: 8px;
      overflow: hidden;
    }

    .header {
      background: linear-gradient(90deg, #0f766e, #059669);
      padding: 20px;
      text-align: center;
      color: #ffffff;
      font-size: 22px;
      font-weight: bold;
    }

    .content {
      padding: 30px 40px;
    }

    .content p {
      font-size: 15px;
      line-height: 1.6;
      color: #e2e8f0;
      margin: 0 0 16px;
    }

    .highlight {
      color: #38bdf8;
    }

    .otp-box {
      display: inline-block;
      background: #059669;
      color: #ffffff;
      padding: 12px 24px;
      font-size: 18px;
      letter-spacing: 4px;
      font-weight: bold;
      border-radius: 6px;
      margin: 20px 0;
    }

    .footer {
      padding: 20px 40px;
      font-size: 12px;
      color: #94a3b8;
      text-align: center;
    }

    @media only screen and (max-width: 480px) {
      .container {
        width: 90% !important;
      }
      .content {
        padding: 20px;
      }
    }
  </style>
</head>
<body>
  <table class="container" role="presentation" cellspacing="0" cellpadding="0" align="center">
    <tr>
      <td class="header">
        Password Reset Request
      </td>
    </tr>
    <tr>
      <td class="content">
        <p>Hello,</p>
        <p>We received a request to reset the password for your account: 
          <span class="highlight">{{email}}</span>.
        </p>
        <p>Use the OTP code below to reset your password securely:</p>
        <p class="otp-box" aria-label="Password Reset Code">{{otp}}</p>
        <p>This OTP is valid for the next 15 minutes. If you didn’t request a password reset, you can safely ignore this email.</p>
      </td>
    </tr>
    <tr>
      <td class="footer">
        &copy; ${new Date().getFullYear()} MERN Authentication System — All rights reserved.
      </td>
    </tr>
  </table>
</body>
</html>
`;