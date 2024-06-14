import { Elysia, error } from "elysia";
import swagger from "@elysiajs/swagger";

import { google } from "googleapis";
import { sessionPlugin } from "elysia-session";
import { MemoryStore } from "elysia-session/stores/memory";

const oauth2 = new google.auth.OAuth2(
  process.env.GOOGLE_OAUTH2_CLIENT_ID,
  process.env.GOOGLE_OAUTH2_CLIENT_SECRET,
  process.env.GOOGLE_OAUTH2_REDIRECT_URI
);

const scopes = ["https://www.googleapis.com/auth/gmail.readonly"];

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

    const authorizationUrl = oauth2.generateAuthUrl({
      state,
      scope: scopes,
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

    const { tokens } = await oauth2.getToken(query.code);
    oauth2.setCredentials(tokens);

    // TODO: Store refresh token
    // TODO: Access Gmail
  })
  .get("/", () => "Hello Elysia")
  .use(swagger())
  .listen(8080);
