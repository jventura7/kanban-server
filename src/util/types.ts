import { IncomingHttpHeaders } from "http";
import { JwtPayload } from "jsonwebtoken";
import { Request } from "express";

type AuthenticatedRequest = Request & {
  headers: IncomingHttpHeaders & {
    authorization?: string;
  };
  user?: {
    username: string;
  };
};

export { AuthenticatedRequest };
