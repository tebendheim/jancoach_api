import { Request, Response } from 'express';
import pool from '../config/db';

export const getAllUsers = async (req: Request, res: Response) => {
    try {
        //const result = await pool.query('SELECT * FROM users');
        console.log("er i getAllUsers");
        res.json("CORRECT");
    } catch (error: any) {  // Explicitly type 'error' as 'any'
        res.status(500).json({ error: error.message });
    }
};

export const createUser = async (req: Request, res: Response) => {
    const { name, email } = req.body;
    try {
        const result = await pool.query('INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *', [name, email]);
        res.json(result.rows[0]);
    } catch (error: any) {  // Explicitly type 'error' as 'any'
        res.status(500).json({ error: error.message });
    }
};

export const getUserById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const result = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
        res.json(result.rows[0]);
    } catch (error: any) {  // Explicitly type 'error' as 'any'
        res.status(500).json({ error: error.message });
    }
};

export const updateUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name, email } = req.body;
    try {
        const result = await pool.query('UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING *', [name, email, id]);
        res.json(result.rows[0]);
    } catch (error: any) {  // Explicitly type 'error' as 'any'
        res.status(500).json({ error: error.message });
    }
};

export const deleteUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        await pool.query('DELETE FROM users WHERE id = $1', [id]);
        res.send('User deleted');
    } catch (error: any) {  // Explicitly type 'error' as 'any'
        res.status(500).json({ error: error.message });
    }
};
