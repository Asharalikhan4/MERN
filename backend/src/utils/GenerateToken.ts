import jwt from "jsonwebtoken";

const GenerateToken = (userId: string, email: string): string => {
    const payload = { userId, email };
    const options = { expiresIn: '1h' };
    return jwt.sign(payload, "notSoSecret", options);
};

export default GenerateToken;