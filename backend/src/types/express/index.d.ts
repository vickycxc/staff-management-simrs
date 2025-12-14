import type { AdminType} from "../prisma.ts";

declare global {
    declare namespace Express {
        export interface Request {
            admin: AdminType;
        }
}