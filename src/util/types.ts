import { IncomingHttpHeaders } from "http";
import { JwtPayload } from "jsonwebtoken";
import { Request } from "express";
import express from "express";
import { Session, SessionData } from "express-session";

interface AuthenticatedRequest extends express.Request {
  session: Session &
    Partial<SessionData> & {
      user?: {
        username: string;
        id: string;
      };
    };
}
export { AuthenticatedRequest };
