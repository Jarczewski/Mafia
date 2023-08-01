import pkg from 'sqlite3';
import fs from 'fs';
const { Database } = pkg;
const DB_PATH = './main.db';

function doesFileExist(path){
    return new Promise((resolve) => {
        fs.access(path, fs.F_OK, (err) => { resolve(!err) });
    });
}

export async function initDatabase() {
    var fileExists = await doesFileExist(DB_PATH);
    if (!fileExists){
        fs.appendFile(DB_PATH, '', (err) => { if (err) console.log(err);});
        const db = new Database(DB_PATH);
        db.exec(/* sql */`
            create table players (
                id integer primary key, 
                nick text not null)
        `, (err) => {if (err) console.log(err);});
        db.exec(/* sql */`
            create table roles (
                id integer primary key, 
                [name] text not null, 
                firstNightOrder integer not null, 
                regularNightOrder integer not null, 
                [description] text,
                isMob bit not null)
        `, (err) => {if (err) console.log(err);});
        db.close();
    }
}

function query(sql){
    return new Promise((resolve, reject) => {
        const db = new Database(DB_PATH);
        db.all(sql, [], (err, rows) => {
            if (err) reject(err)
            else resolve(rows)
        });        
        db.close();
    })
}

export async function getPlayers() {
    return await query(/* sql */`select * from players`);
}

export async function getRoles(){
    return await query(/* sql */`select * from roles`);
}
