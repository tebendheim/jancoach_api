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

app.get("/", async (req: Request, res: Response) => {
    db.query("SELECT * FROM users;", async (err, result) => {
        if (err) {
            console.error('Database query error:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        if (result && result.rows) {
            return res.json(result.rows);
        } else {
            console.error('Query result is undefined or empty');
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    });
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});