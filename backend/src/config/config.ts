import { config as conf } from 'dotenv';
conf();

const _config = {
    PORT: process.env.PORT || 3000,
    MONGODB_URL: process.env.MONGODB_URL,
    JWT_SECRET: process.env.JWT_SECRET
};

export const config = Object.freeze(_config);