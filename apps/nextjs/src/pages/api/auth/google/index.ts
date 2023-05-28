import { NextApiRequest, NextApiResponse } from "next";
import { google } from "googleapis";

export default (req: NextApiRequest, res: NextApiResponse) => {
  const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.REDIRECT_URL,
  );

  const url = oauth2Client.generateAuthUrl({
    access_type: "offline",
    scope: "https://www.googleapis.com/auth/calendar",
  });

  res.redirect(url);
};
