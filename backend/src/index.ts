import express from "express";
import { config } from "dotenv";
import authRoutes from "./routes/auth.route.ts";
import staffRoutes from "./routes/staff.route.ts";
import kinerjastaffRoutes from "./routes/kinerjastaff.route.ts";
import cors from "cors";

config();
const app = express();
const port = process.env.PORT;
app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use("/api/auth", authRoutes);
app.use("/api/staff", staffRoutes);
app.use("/api/kinerjaStaff", kinerjastaffRoutes);
// app.use("/api/direktori", direktoriRoutes);

app.listen(port, () => {
  console.log(`Server is running ]at http://localhost:${port}`);
});
