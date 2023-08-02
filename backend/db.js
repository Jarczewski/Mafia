import pkg from 'sqlite3';
import fs from 'fs';
const { Database } = pkg;
const DB_PATH = './main.db';

function doesFileExist(path) {
    return new Promise((resolve) => {
        fs.access(path, fs.F_OK, (err) => { resolve(!err) });
    });
}

function execLogError(db, sql) {
    db.exec(sql, (err) => { if (err) console.log(err); });
}

export async function initDatabase() {
    var fileExists = await doesFileExist(DB_PATH);
    if (!fileExists) {
        fs.appendFile(DB_PATH, '', (err) => { if (err) console.log(err); });
        const db = new Database(DB_PATH);
        console.log('Adding players table...');
        execLogError(db, /* sql */`
            create table players (
                id integer primary key, 
                nick text not null)`);
        console.log('Adding roles table...');
        execLogError(db, /* sql */`
            create table roles (
                id integer primary key, 
                [name] text not null, 
                [description] text,
                isMob bit not null)`);
        console.log('Adding games table...');
        execLogError(db, /* sql */`
            create table games (
                id integer primary key,
                startDate text,
                endDate text, 
                comment text)`);
        console.log('Adding games_players_roles table...');
        execLogError(db, /* sql */`
            create table games_players_roles (
                id integer primary key,
                gameId integer not null,
                playerId integer not null,
                roleId integer not null,
                foreign key (gameId) references games (id),
                foreign key (playerId) references players (id),
                foreign key (roleId) references roles (id))`);
        db.close();
    }
    else {
        console.log('Nothing to do.');
    }
}

function query(sql, params = []) {
    return new Promise((resolve, reject) => {
        const db = new Database(DB_PATH);
        db.all(sql, params, (err, rows) => {
            if (err) reject(err)
            else resolve(rows)
        });
        db.close();
    })
}

function run(sql, params = []) {
    return new Promise((resolve, reject) => {
        const db = new Database(DB_PATH);
        db.run(sql, params, function (err) {
            if (err) { reject(err.message) };
            resolve(this.lastID);
        });
        db.close();
    })
}

export async function getPlayers() {
    return await query(/* sql */`select * from players`);
}

export async function getRoles() {
    return await query(/* sql */`select * from roles`);
}

export async function startGame() {
    return await run(/* sql */`insert into games (startDate) values (datetime('now'))`);
}

export async function addPlayersRolesGame(gameId, playersRoles) {
    await run(/* sql */`
        insert into games_players_roles (gameId, playerId, roleId) values ${playersRoles.map(pr => '(?,?,?)')}`,
        playersRoles.map(pr => [gameId, pr.playerId, pr.roleId]).flat(1));
}

export async function getGame(id) {
    const rows = await query(/* sql */`select * from games where id = ?`, [id]);
    if (rows.length > 1) throw `getGame: Unexpected number of rows for id ${id}.`;
    else if (rows.length == 0) return null;
    return rows[0];
}

export async function endGame(id, comment) {
    await run(/* sql */`update games set endDate=datetime('now'), comment=? where id=?`, [comment, id])
}

export async function getPlayersRolesGame(gameId) {
    const rows = await query(/* sql */`select * from games_players_roles where gameId = ?`, [gameId]);
    return rows;
}