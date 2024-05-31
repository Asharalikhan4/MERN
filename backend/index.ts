import express, { Request, Response} from "express";
const app = express();

// Routes
import OtpRoutes from "./routes/OtpRoutes.js";

app.get("/", (req: Request, res: Response) => {
    res.send("Api is working fine");
});
app.use("/otp", OtpRoutes);

app.listen(process.env.PORT || 3000, (): void => {
    console.log(`Server is running on port ${process.env.PORT || 3000}`);
});