import express from "express";
import db from "./utils/database.js";
import Task from "./model/tasks.model.js";
import "dotenv/config";
import cors from "cors";

const PORT = process.env.PORT ?? 8000;

/* --- TEST DATABASE CONNECTION --- */

db.authenticate()
.then(() => {
    console.log('Connection successfull.');
})
.catch((error) => console.log(error));

/* -------------------------------- */


/* --- SYNCHRONIZE DATABASE ---  */
db.sync()
.then(() => console.log('Database is synchronized.'))
.catch(error => console.log(error));

/* ----------------------------- */

const app = express();

app.use(express.json());
app.use(cors());

/* --- HEALTH CHECK --- */

app.get('/', (req, res) => {
    res.send('Ok.')
});

/* -------------------- */


/* --- GET ALL TASKS --- */

app.get('/tasks', async (req, res) => {
    try {
        const tasks = await Task.findAll();
        res.json(tasks);
    } catch (error) {
        res.status(400).json(error);
    }
});

/* ------------------- */


/* --- GET TASKS BY ID --- */

app.get('/tasks/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const task = await Task.findByPk(id);
        res.json(task);
    } catch (error) {
        res.status(400).json(error);
    }
});

/* ------------------- */


/* --- CREATE TASK --- */

app.post('/tasks', async (req, res) => {
    try {
        const { body } = req

        const task = await Task.create(body);
        res.status(201).json(task);
    } catch (error) {
        res.status(400).json(error);
    }
});

/* ------------------- */


/* --- UPDATE TASK --- */

app.put('/tasks/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { body } = req;

        const task = await Task.update(body, {
            where: { id }
        });
        res.json(task);
    } catch (error) {
        res.status(400).json(error);
    }
});

/* ------------------- */


/* --- DELETE TASK --- */

app.delete('/tasks/:id', async (req, res) => {
    try {
        const { id } = req.params;

        await Task.destroy({
            where: { id }
        });
        res.status(204).end();
    } catch (error) {
        res.status(400).json(error);
    }
});

/* ------------------- */


/* --- SERVER --- */

app.listen(PORT, () => {
    console.log(`Running server on port ${PORT}`);
})

/* -------------- */


