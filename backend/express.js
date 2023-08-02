import express from 'express';
import bodyParser from 'body-parser';
import * as db from './db.js';
const app = express()
app.use(bodyParser.json());
const port = 3333

console.log('Initializing database...')
await db.initDatabase();
console.log('Done.')

// Hello to CORS
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/players', async (req, res) => {
    const players = await db.getPlayers();
    res.status(200).json(players);
});

app.get('/roles', async (req, res) => {
    const roles = await db.getRoles();
    res.status(200).json(roles);
});

app.post('/games', async (req, res) => {
    const gameId = await db.startGame();
    await db.addPlayersRolesGame(gameId, req.body);
    res.status(200).json({ gameId });
});

app.get('/games/:id', async (req, res) => {
    const gameId = req.params.id;
    const game = await db.getGame(gameId);
    const playersRoles = await db.getPlayersRolesGame(gameId)
    if (game) res.status(200).json({ ...game, playersRoles });
    else res.status(404).json();
});

app.post('/games/:id/end', async (req, res) => {
    await db.endGame(req.params.id, req.body.comment);
    res.status(200).json();
});

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
})