// import express, {Request, Response } from 'express';
// import bodyParser from 'body-parser';
// import dotenv from 'dotenv';
// import userRoutes from './routes/userRoutes';

// dotenv.config();

// const app = express();
// const PORT = process.env.PORT || 3000;

// app.use(bodyParser.json());


// app.use('/api/users', userRoutes);


// app.get("/", async (req:Request, res:Response) => {
//     res.json({"json":"CORRECT"});
// });

// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });


import express, { Request, Response } from 'express';
import db from './config/db'

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Routes
// app.get("/", async (req: Request, res: Response) => {
//     res.json("CORRECT");
// });

app.get("/", async (req:Request, res:Response) => {
    db.query("select * from users;", (err, result) =>{
        res.json(result.rows);
    });
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});