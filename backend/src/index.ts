import { Elysia, error } from "elysia";
import swagger from "@elysiajs/swagger";

import { sessionPlugin } from "elysia-session";
import { MemoryStore } from "elysia-session/stores/memory";

import { PrismaClient } from "@prisma/client";

import { google } from "googleapis";

const db = new PrismaClient();
// db.dummy.create();

const oauth2Scopes = ["https://www.googleapis.com/auth/gmail.readonly"];
const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_OAUTH2_CLIENT_ID,
  process.env.GOOGLE_OAUTH2_CLIENT_SECRET,
  process.env.GOOGLE_OAUTH2_REDIRECT_URI
);

export const app = new Elysia()
  .use(swagger())
  .use(
    sessionPlugin({
      store: new MemoryStore(),
      expireAfter: 60 * 60,
    })
  )
  .get("/oauth2/start", ({ session, redirect }) => {
    const state = crypto.randomUUID().toString();
    session.set("state", state);

    console.log(state, session.get("state"));

    const authorizationUrl = oauth2Client.generateAuthUrl({
      state,
      scope: oauth2Scopes,
      access_type: "offline",
      include_granted_scopes: true,
      redirect_uri: "http://localhost:8080/oauth2/callback",
    });

    return redirect(authorizationUrl);
  })
  .get("/oauth2/callback", async ({ query, session }) => {
    if (query.error) {
      return error(400, query.error);
    }

    console.log(query.state, session.get("state"));
    if (query.state !== session.get("state")) {
      return error(401, "State mismatch");
    }

    if (!query.code) {
      return error(401, "Code unavailable");
    }

    const { tokens } = await oauth2Client.getToken(query.code);
    oauth2Client.setCredentials(tokens);

    // TODO: Store refresh token
    // TODO: Access Gmail
  })
  .get("/", () => "Hello Elysia")
  .use(swagger())
  .listen(8080);
