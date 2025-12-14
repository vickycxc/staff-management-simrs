import type { Prisma } from "../../generated/prisma/index.js";

// Basic model types
export type AdminType = Prisma.AdminGetPayload<{}>;

// // Model with relations
// export type OrangTuaWithRelations = Prisma.OrangTuaGetPayload<{
//   include: {
//     posyandu: true;
//     anak: true;
//   };
// }>;

// export type PosyanduWithOrangTua = Prisma.PosyanduGetPayload<{
//   include: {
//     orangTua: true;
//   };
// }>;

// Create/Update input types
export type AdminCreateInput = Prisma.AdminCreateInput;
