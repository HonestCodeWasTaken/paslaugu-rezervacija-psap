import { DefaultSession } from "next-auth";
import { Role } from "@acme/db";

export { authOptions } from "./src/auth-options";
export { getServerSession } from "./src/get-session";
export type { Session } from "next-auth";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      role: Role;
    } & DefaultSession["user"];
  }
}
