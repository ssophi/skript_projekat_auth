import {v4 as uuidv4} from 'uuid'
//import users from '../models/Users.js'
import mysql from 'mysql'

//konekcija sa bazom
const pool = mysql.createPool({
    connectionLimit: 100,
    host: 'localhost',
    user: 'root',
    password: 'root54',
    database: 'skript_projekat'
})

//registracija user - create + token
export const registerUser = (req, res) => {
    let query = "insert into user (username, password, ime, prezime, email, tip_clanarine) values (?, ?, ?, ?, ?, ?)";
    let formated = mysql.format(query, [req.body.username, req.body.password, req.body.ime, req.body.prezime, req.body.email, req.body.tip_clanarine]);

    pool.query(formated, (err, response) => {
        if (err)
            res.status(500).send(err.sqlMessage);
        else {
            // Ako nema greske dohvatimo kreirani objekat iz baze i posaljemo ga korisniku
            query = 'select * from user where id=?';
            formated = mysql.format(query, [response.id]);

            pool.query(formated, (err, rows) => {
                if (err)
                    res.status(500).send(err.sqlMessage);
                else
                    res.send(rows[0]);
            });
        }
    });
    //dodati logiku ya pravljenje i dodeljivanje tokena
}

//create user
export const createUser = (req, res) => {
    let query = "insert into user (username, password, ime, prezime, email, tip_clanarine) values (?, ?, ?, ?, ?, ?)";
    let formated = mysql.format(query, [req.body.username, req.body.password, req.body.ime, req.body.prezime, req.body.email, req.body.tip_clanarine]);

    pool.query(formated, (err, response) => {
        if (err)
            res.status(500).send(err.sqlMessage);
        else {
            // Ako nema greske dohvatimo kreirani objekat iz baze i posaljemo ga korisniku
            query = 'select * from user where id=?';
            formated = mysql.format(query, [response.id]);

            pool.query(formated, (err, rows) => {
                if (err)
                    res.status(500).send(err.sqlMessage);
                else
                    res.send(rows[0]);
            });
        }
    });
}

//Get all users
export const getAllUser = (req, res) => {
    pool.query('select * from user', (err, rows) => {
        if (err)
            res.status(500).send(err.sqlMessage);  // Greska servera
        else
            res.send(rows);
    })
}

//Get one user
export const getOneUser = (req, res) => {
    let query = 'select * from user where id=?';
    let formated = mysql.format(query, [req.params.id]);

    pool.query(formated, (err, rows) => {
        if (err)
            res.status(500).send(err.sqlMessage);
        else
            res.send(rows[0]);
    });
}

//Login user
export const loginUser = (req, res) => {
    console.log("stigao---------------------------------")
    let query = 'select * from user where username=?';
    let formated = mysql.format(query, [req.params.username]);

    pool.query(formated, (err, rows) => {
        if (err)
            res.status(500).send(err.sqlMessage);
        else
            res.send(rows[0]);
    });
    //dodati token
}

//Update user
export const updateUser = (req, res) => {
    let query = "update user set username=?, password=?, ime=?, prezime=?, email=?, tip_clanarine=? where id=?";
    let formated = mysql.format(query, [req.body.username, req.body.password, req.body.ime, req.body.prezime, req.body.email, req.body.tip_clanarine, req.params.id]);

    pool.query(formated, (err, response) => {
        if (err)
            res.status(500).send(err.sqlMessage);
        else {
            query = 'select * from user where id=?';
            formated = mysql.format(query, [req.params.id]);

            pool.query(formated, (err, rows) => {
                if (err)
                    res.status(500).send(err.sqlMessage);
                else
                    res.send(rows[0]);
            });
        }
    });
}

//Delete user
export const deleteUser = (req, res) => {
    let query = 'select * from user where id=?';
    let formated = mysql.format(query, [req.params.id]);

    pool.query(formated, (err, rows) => {
        if (err)
            res.status(500).send(err.sqlMessage);
        else {
            let poruka = rows[0];

            let query = 'delete from user where id=?';
            let formated = mysql.format(query, [req.params.id]);

            pool.query(formated, (err, rows) => {
                if (err)
                    res.status(500).send(err.sqlMessage);
                else
                    res.send(poruka);
            });
        }
    });
}