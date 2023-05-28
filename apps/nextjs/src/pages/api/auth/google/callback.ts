import { NextApiRequest, NextApiResponse } from "next";
import { google } from "googleapis";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.REDIRECT_URL,
  );

  const { code } = req.query;

  const { tokens } = await oauth2Client.getToken(code as string);
  oauth2Client.setCredentials(tokens);

  const calendar = google.calendar({ version: "v3", auth: oauth2Client });

  const event = {
    summary: "Appointment",
    start: {
      dateTime: "2023-06-15T09:00:00-07:00",
    },
    end: {
      dateTime: "2023-06-15T10:00:00-07:00",
    },
  };

  try {
    const createdEvent = await calendar.events.insert({
      calendarId: "primary",
      requestBody: event,
    });
    res.send(`Event created: ${createdEvent.data.htmlLink}`);
  } catch (error) {
    console.error(`Error creating event: ${error}`);
    res.status(500).send("Error creating event");
  }
};
