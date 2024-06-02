import express, { Request, Response} from "express";
const app = express();
import { config } from "./config/config.js";
import DatabaseConnection from "./config/DatabaseConnection.js";

// Routes
import OtpRoutes from "./routes/OtpRoutes.js";
import UserRoutes from "./routes/UserRoutes.js";

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => {
    res.send("Api is working fine");
});
app.use("/otp", OtpRoutes);
app.use("/user", UserRoutes);

app.listen(config.PORT || 3000, async (): Promise<void> => {
    await DatabaseConnection();
    console.log(`Server is running on port ${process.env.PORT || 3000}`);
});