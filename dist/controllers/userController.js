"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.getUserById = exports.createUser = exports.getAllUsers = void 0;
const db_1 = __importDefault(require("../config/db"));
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield db_1.default.query('SELECT * FROM users');
        res.json(result.rows);
    }
    catch (error) { // Explicitly type 'error' as 'any'
        res.status(500).json({ error: error.message });
    }
});
exports.getAllUsers = getAllUsers;
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email } = req.body;
    try {
        const result = yield db_1.default.query('INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *', [name, email]);
        res.json(result.rows[0]);
    }
    catch (error) { // Explicitly type 'error' as 'any'
        res.status(500).json({ error: error.message });
    }
});
exports.createUser = createUser;
const getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const result = yield db_1.default.query('SELECT * FROM users WHERE id = $1', [id]);
        res.json(result.rows[0]);
    }
    catch (error) { // Explicitly type 'error' as 'any'
        res.status(500).json({ error: error.message });
    }
});
exports.getUserById = getUserById;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { name, email } = req.body;
    try {
        const result = yield db_1.default.query('UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING *', [name, email, id]);
        res.json(result.rows[0]);
    }
    catch (error) { // Explicitly type 'error' as 'any'
        res.status(500).json({ error: error.message });
    }
});
exports.updateUser = updateUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        yield db_1.default.query('DELETE FROM users WHERE id = $1', [id]);
        res.send('User deleted');
    }
    catch (error) { // Explicitly type 'error' as 'any'
        res.status(500).json({ error: error.message });
    }
});
exports.deleteUser = deleteUser;
