import express from 'express';
import * as db from './db.js';
const app = express()
const port = 3333

console.log('Initializing database...')
await db.initDatabase();
console.log('Done.')

// Hello to CORS
app.use(function(req, res, next) {
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

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})