import express from "express";
const app = express();

app.get("/", (req, res) => {
    res.send("Api is working fine");
});

app.listen(process.env.PORT || 3000, () => {
    console.log(`Server is running on port ${process.env.PORT || 3000}`);
});