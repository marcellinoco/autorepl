import { Elysia, error, t } from "elysia";
import swagger from "@elysiajs/swagger";
import { sessionPlugin } from "elysia-session";
import { MemoryStore } from "elysia-session/stores/memory";
import { PrismaClient } from "@prisma/client";
import { google } from "googleapis";
import { Logestic } from 'logestic';

const db = new PrismaClient();
const oauth2Scopes = [
  "https://www.googleapis.com/auth/userinfo.profile",
  "https://www.googleapis.com/auth/userinfo.email",
];
const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_OAUTH2_CLIENT_ID,
  process.env.GOOGLE_OAUTH2_CLIENT_SECRET,
  process.env.GOOGLE_OAUTH2_REDIRECT_URI
);

const app = new Elysia()
  .use(Logestic.preset('fancy'))
  .use(swagger())
  .use(
    sessionPlugin({
      store: new MemoryStore(),
      expireAfter: 60 * 60,
    })
  )
  .post(
    "/api/auth/google",
    async ({ body }) => {
      const { token } = body;

      oauth2Client.setCredentials({ access_token: token });

      const oauth2 = google.oauth2({ auth: oauth2Client, version: "v2" });
      const userInfo = await oauth2.userinfo.get();

      if (!userInfo.data.email) {
        return error(401, "Unable to retrieve user info");
      }

      let user = await db.user.findUnique({
        where: { email: userInfo.data.email },
      });

      if (!user) {
        user = await db.user.create({
          data: {
            email: userInfo.data.email,
            name: userInfo.data.name || "",
            avatar: userInfo.data.picture || "",
            accessToken: token,
          },
        });
      } else {
        user = await db.user.update({
          where: { email: userInfo.data.email },
          data: { accessToken: token || "" },
        });
      }

      return {
        access_token: token,
        message: "Success to login/sign up",
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          avatar: user.avatar,
        },
      };
    },
    {
      body: t.Object({
        token: t.String(),
      }),
    }
  )
  .get("/", () => "Hello Elysia")
  .use(swagger())
  .listen(8080);
