const express = require("express");  // Імпорт бібліотеки Express для створення веб-сервера
const path = require("path");  // Імпорт модуля Path для роботи з шляхами файлів і директорій
const bodyParser = require("body-parser");  // Імпорт модуля Body-Parser для парсингу запитів
const { Pool } = require("pg");  // Імпорт класу Pool з модуля pg для роботи з PostgreSQL

const app = express();
const port = 3000;

const pool = new Pool({
    user: 'me',
    host: 'localhost',
    database: 'api',
    password: '12345',
    port: 5432,
});

app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});







app.get("/index", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});


app.get("/web-designer", (req, res) => {
    res.sendFile(path.join(__dirname, "web-designer.html"));
});


app.get("/web-developer", (req, res) => {
    res.sendFile(path.join(__dirname, "web-developer.html"));
});


app.get("/test-engineer", (req, res) => {
    res.sendFile(path.join(__dirname, "test-engineer.html"));
});


app.get("/data-analyst", (req, res) => {
    res.sendFile(path.join(__dirname, "data-analyst.html"));
});


app.get("/links", (req, res) => {
    res.sendFile(path.join(__dirname, "links.html"));
});


app.get("/contacts", (req, res) => {
    res.sendFile(path.join(__dirname, "contacts.html"));
});

app.get("/new-parallax", (req, res) => {
    res.sendFile(path.join(__dirname, "new-parallax.html"));
});







// Обробка GET-запиту на маршрут /feedbacks для отримання всіх відгуків з бази даних
app.get("/feedbacks", async (req, res) => {
    try {
        const data = await pool.query("SELECT username, text FROM feedback;");
        res.json(data.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send("Server Error");
    }
});

// Обробка POST-запиту на маршрут /feedback для додавання нового відгуку в базу даних
app.post("/feedback", async (req, res) => {
    const { username, text } = req.body;
    console.log(req.body);
    try {
        await pool.query("INSERT INTO feedback (username, text) VALUES ($1, $2);", [username, text]);
        res.status(201).send("Feedback submitted successfully");
    } catch (err) {
        console.error(err);
        res.status(500).send("Server Error");
    }
});
