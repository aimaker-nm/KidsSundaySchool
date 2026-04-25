import { Hono } from "hono";
import { cors } from "hono/cors";
import { authRoutes } from "./routes/auth";
import { teacherRoutes } from "./routes/teacher";
import { magicLinkRoutes } from "./routes/magic-link";

export type Env = {
  DB: D1Database;
  JWT_SECRET: string;
};

const app = new Hono<{ Bindings: Env }>();

app.use("*", cors({ origin: "*" }));

app.get("/", (c) => c.json({ status: "ok", app: "Kids Sunday School API" }));

app.route("/auth", authRoutes);
app.route("/teacher", teacherRoutes);
app.route("/child", magicLinkRoutes);

export default app;
