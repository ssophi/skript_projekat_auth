import {v4 as uuidv4} from 'uuid'
//import users from '../models/User.js'
import mysql from 'mysql'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';
import 'dotenv/config'

//konekcija sa bazom
const pool = mysql.createPool({
    connectionLimit: 100,
    host: 'localhost',
    user: 'root',
    password: 'root54',
    database: 'skript_projekat'
})

//registracija zaposlnog - create + token
export const registerZaposleni = (req, res) => {
    let query = "insert into zaposleni (username, password, ime, prezime, email, tip) values (?, ?, ?, ?, ?, ?)";
    let formated = mysql.format(query, [req.body.username, bcrypt.hashSync(req.body.password, 10), req.body.ime, req.body.prezime, req.body.email, req.body.tip]);

    pool.query(formated, (err, response) => {
        if (err)
            res.status(500).send(err.sqlMessage);
        else {
            // Ako nema greske dohvatimo kreirani objekat iz baze i posaljemo ga korisniku
            query = 'select * from zaposleni where id=?';
            formated = mysql.format(query, [response.id]);

            pool.query(formated, (err, rows) => {
                if (err)
                    res.status(500).send(err.sqlMessage);
                else
                {
                    res.send(rows[0]);
                }
            });
        }
    });

    //treba dodavanje pravljenje i dodavanje tokena
}

//create user
export const createZaposleni = (req, res) => {
    console.log(req.body)
    let query = "insert into zaposleni (username, password, ime, prezime, email, tip) values (?, ?, ?, ?, ?, ?)";
    let formated = mysql.format(query, [req.body.username, bcrypt.hashSync(req.body.password, 10), req.body.ime, req.body.prezime, req.body.email, req.body.tip]);

    pool.query(formated, (err, response) => {
        if (err)
            res.status(500).send(err.sqlMessage);
        else {
            // Ako nema greske dohvatimo kreirani objekat iz baze i posaljemo ga korisniku
            query = 'select * from zaposleni where id=?';
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
export const getAllZaposleni = (req, res) => {
    pool.query('select * from zaposleni', (err, rows) => {
        if (err)
            res.status(500).send(err.sqlMessage);  // Greska servera
        else
            res.send(rows);
    })
}

//Log in zaposleni
export const loginZaposleni = (req, res) => {
    console.log("req body je", req.body)
    let query = 'select * from zaposleni where username=?';
    let formated = mysql.format(query, [req.body.username]);
    
    pool.query(formated, (err, rows) => {
        if (err)
            res.status(500).send(err.sqlMessage);
        else
        {
            console.log(rows[0].id)
            if (bcrypt.compareSync(req.body.password, rows[0].password)) {
                const obj = {
                    userId: rows[0].id,
                    username: rows[0].username,
                    tip: rows[0].tip
                };
                console.log(process.env.ACCESS_TOKEN_SECRET)
  
                const token = jwt.sign(obj, process.env.ACCESS_TOKEN_SECRET);
                
                res.json({ token: token });
            } else {
                res.status(400).json({ msg: "Invalid credentials"});
            }
                            
        }
    });

    
    //dodati za token
}

//Get one zaposleni
export const getOneZaposleni = (req, res) => {
    let query = 'select * from zaposleni where id=?';
    let formated = mysql.format(query, [req.params.id]);
    
    pool.query(formated, (err, rows) => {
        if (err)
            res.status(500).send(err.sqlMessage);
        else{
            console.log("Vraca",rows)
            res.send(rows[0]);}
    });
}

//Update user
export const updateZaposleni = (req, res) => {
    let query = "update zaposleni set username=?, password=?, ime=?, prezime=?, email=?, tip=? where id=?";
    let formated = mysql.format(query, [req.body.username, bcrypt.hashSync(req.body.password, 10), req.body.ime, req.body.prezime, req.body.email, req.body.tip, req.params.id]);

    pool.query(formated, (err, response) => {
        if (err)
            res.status(500).send(err.sqlMessage);
        else {
            query = 'select * from zaposleni where id=?';
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
export const deleteZaposleni = (req, res) => {
    let query = 'select * from zaposleni where id=?';
    let formated = mysql.format(query, [req.params.id]);

    pool.query(formated, (err, rows) => {
        if (err)
            res.status(500).send(err.sqlMessage);
        else {
            let poruka = rows[0];

            let query = 'delete from zaposleni where id=?';
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