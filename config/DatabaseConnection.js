import { connect } from "mongoose";

export default async function databaseConnection(){
    try {
        await connect(process.env.MONGODB_URL);
    } catch (error) {
        console.log("Error in database connection", error);
        process.exit(1);
    }
};