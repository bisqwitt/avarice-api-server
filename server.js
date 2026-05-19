const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const scores = [];

app.get("/", (req, res) => {
    res.send("Server is running");
});

app.post("/api/score", (req, res) => {
    const { playerName, round, score } = req.body;

    const entry = {
        playerName,
        round,
        score,
        createdAt: new Date().toISOString()
    };

    scores.push(entry);
    console.log("Received score:", entry);

    res.json({
        success: true,
        entry
    });
});

app.get("/api/scores", (req, res) => {
    res.json(scores);
});

app.get("/api/score/:round/:playerName", (req, res) => {
    const round = Number(req.params.round);
    const playerName = req.params.playerName;

    const entry = scores.find(score =>
        score.round === round &&
        score.playerName !== playerName
    );

    if (!entry) {
        return res.json({
            found: false
        });
    }

    res.json({
        found: true,
        entry
    });

    console.log(playerName + " seaching: " + round);
    console.log(entry);
});

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
});