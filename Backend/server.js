// server.js
const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors");
const path = require("path");
const http = require("node:http");

// Express App erstellen
const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// SQLite-Datenbank öffnen
const dbPath = path.join(__dirname, "panini.db");
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error("Fehler beim Öffnen der Datenbank:", err.message);
    } else {
        console.log("SQLite-Datenbank verbunden:", dbPath);
    }
});



// API Abfragen

app.get('/', (req, res) => {
res.send('<h1>Hello, Express.js Server! WooHoo</h1>');
});
// Alle Benutzer abfragen
app.get("/users", (req, res) => {
    db.all("SELECT username, firstName, lastName FROM users", [], (err, rows) => {
        if (err) {
            console.error(err.message);
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(rows);
    });
});


// Nutzereingaben überprüfen
app.post("/checkUser", (req, res) => {
    console.log(req.body);
    const  username= req.body.username;
    const password = req.body.password;
    console.log(username);
    console.log(password);
    if (!username || !password) {
        res.status(400).json({ error: "Username und Password erforderlich" });
        return;
    }

    const sql = "SELECT username, firstName, lastName, isAdmin FROM user WHERE username = ? AND password = ?";
    db.get(sql, [username, password], (err, row) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        if (row) {
            res.json({ success: true, user: row });
        } else {
            res.status(401).json({ success: false, message: "Ungültige Zugangsdaten" });
        }
    });
});


// Neuen Benutzer hinzufügen
app.post("/newUser", (req, res) => {

    const { username, firstName, lastName, password } = req.body;
    if (!username || !firstName || !lastName || !password) {
        res.status(400).json({ error: "Parameter sind erforderlich" });
        return;
    }
    db.run("INSERT INTO user (username, firstName, lastName, password, isAdmin) VALUES (?, ?, ?, ?, ?)", username, firstName, lastName, password, 0, function (err) {
        if (err) {
            console.error(err.message);
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ username, firstName, lastName });
    });
});

app.post("/newOrder", (req, res) => {

    const { username, price, ingredients } = req.body;
    if (!username || !price || !ingredients ) {
        res.status(400).json({ error: "Parameter sind erforderlich" });
        return;
    }
    console.log(username, new Date().getTime(), price, 0);
    db.run("INSERT INTO orderTable (username, timeOfOrder, price, confirmed) VALUES (?, ?, ?, ?)", username, new Date().getTime(), price, 0, function (err) {
        if (err) {
            console.error(err.message);
            res.status(500).json({ error: err.message });
            return;
        }
        orderID = this.lastID
        console.log(orderID);
        console.log(this.lastID);
        for (let ingredient in ingredients) {
            console.log(ingredients[ingredient]);
            console.log(res);
            db.run("INSERT INTO orderPos (orderID, ingredientID, position) VALUES (?, ?, ?)", orderID,ingredients[ingredient].id, ingredient, function (err) {
                if (err) {
                    console.error(err.message);
                    res.status(500).json({ error: err.message });
                    return;
                }
            }
            ) }

        res.json({ username, price, ingredients });
    });
});

app.post("/newTemplate", (req, res) => {

    const { username, name, ingredients } = req.body;
    if (!username || !name || !ingredients ) {
        res.status(400).json({ error: "Parameter sind erforderlich" });
        return;
    }
    db.run("INSERT INTO template (name, username) VALUES (?, ?)", name, username, function (err) {
        if (err) {
            console.error(err.message);
            res.status(500).json({ error: err.message });
            return;
        }
        templateID = this.lastID
        console.log(templateID);
        console.log(this.lastID);
        for (let ingredient in ingredients) {
            console.log(ingredients[ingredient]);
            console.log(res);
            db.run("INSERT INTO templatePos (templateID, ingredientID, position) VALUES (?, ?, ?)", templateID,ingredients[ingredient].id, ingredient, function (err) {
                if (err) {
                    console.error(err.message);
                    res.status(500).json({ error: err.message });
                    return;
                }
            }
            ) }

        res.json({ templateID, username, name, ingredients });
    });
});


// get all ingredients
app.get("/ingredients", (req, res) => {

    db.all("SELECT * FROM ingredient", (err, rows) => {
        if (err) {
            console.error(err.message);
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(rows);
    });
})

// get ingredients of template
app.get("/getDetails", (req, res) => {

    const { templateID } = req.query;

    db.all("SELECT ingredientID as ingredientsID, position, i.name as ingredientName, i.preis FROM templatePos  left join ingredient i on i.id = ingredientID where templateID = (?)", templateID, (err, rows) => {

        if (err) {
            console.error(err.message);
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(rows);
    });
})


// get all orders for a user
    app.get("/getUserOrder", (req, res) => {
        const { username } = req.query;
        console.log("hi");
        if (!username) {
            return res.status(400).json({ error: 'Missing username parameter' });
        }
        db.all("SELECT orderNum, username, timeOfOrder, price, confirmed FROM orderTable where username = (?)", [username], (err, rows) => {
            if (err) {
                console.error(err.message);
                res.status(500).json({error: err.message});
                return;
            }
            res.json(rows);
        });
    })
// get all orders for a user
    app.get("/templates", (req, res) => {
        const { username } = req.query;
        console.log("hi");
        if (!username) {
            return res.status(400).json({ error: 'Missing username parameter' });
        }
        db.all("SELECT templateID, name, username FROM template where username = (?)", [username], (err, rows) => {
            if (err) {
                console.error(err.message);
                res.status(500).json({error: err.message});
                return;
            }
            res.json(rows);
        });
    })

// get all orders
    app.get("/getOrder", (req, res) => {

        db.all("SELECT orderNum, username, timeOfOrder, price, confirmed FROM orderTable ",  (err, rows) => {
            if (err) {
                console.error(err.message);
                res.status(500).json({error: err.message});
                return;
            }
            res.json(rows);
        });
    })

    // get all templates
    app.get("/allTemplates", (req, res) => {

        db.all("SELECT templateID, name, username FROM template ",  (err, rows) => {
            if (err) {
                console.error(err.message);
                res.status(500).json({error: err.message});
                return;
            }
            res.json(rows);
        });
    })

// accept one order
    app.post("/acceptOrder", (req, res) => {
        const { orderNum } = req.body;
        if (!orderNum ) {
            res.status(400).json({ error: "Parameter sind erforderlich" });
            return;
        }
        db.run("UPDATE orderTable set confirmed = 1 WHERE orderNum = (?)", orderNum, function (err) {
            if (err) {
                console.error(err.message);
                res.status(500).json({ error: err.message });
                return;
            }
            res.json({ orderNum });
        });
    });

// Benutzer nach username löschen
app.delete("/user/:username", (req, res) => {
    const { username } = req.params;
    db.run("DELETE FROM user WHERE username = ?", [username], function (err) {
        if (err) {
            console.error(err.message);
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ deletedUser: username, changes: this.changes });
    });
})

// Server starten
app.listen(PORT, () => {
    console.log(`Backend läuft auf http://localhost:${PORT}`);
});
