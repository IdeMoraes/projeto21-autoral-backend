import express, {json} from "express";
import dotenv from 'dotenv';
import cors from 'cors';
import router from "./routers/index.js";
import postgres from "./db.js";
//import { PrismaClient } from '@prisma/client';

dotenv.config();
const app = express();
app.use(cors());
app.use(json());
app.use(router);

//const prisma = new PrismaClient();
/* async function main() {
    try {
      await prisma.$connect();
      console.log('Connected to database');
    } catch (error) {
      console.error('Error connecting to database', error);
      process.exit(1);
    }
} */
//main();

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Server running in port ${port}`));