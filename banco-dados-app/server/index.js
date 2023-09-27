const express = require("express");
const app = express();
const mysql = require('mysql');
const cors = require('cors')
const bcrypt = require('bcrypt');
const saTUrouunds = 10


const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'banco',
});


app.use(express.json());
app.use(cors());


app.post("/resgister", (req, res) =>{
    const email = req.body.email;
    const password = req.body.password;

    db.query(`SELECT * FROM users WHERE email = '${email}' `, 
    (err, result) => {
        if (err){
            res.send(err);
        }
        if(result.length == 0){
            bcrypt.hash(password, saTUrouunds, (err, hash) => {
                db.query(`INSERT INTO users (email, password) VALUES ('${email}', '${hash}')`, (err, response) => {
                    if(err){
                        res.send(err)
                    }
                    res.send({msg: "users cadastrado"})
                })
            })     
        } else {
            res.send({msg: "users ja cadastrado"})
        }
        
    })
    
});


app.post('/login', (req, res) => {
    const email = req.body.emaill; 
    const password = req.body.passwordd;

    db.query(`SELECT * FROM users WHERE email = '${email}'`, (err, result) =>{
        if(err){
            res.send(err);
        }
        if(result.length > 0){
            bcrypt.compare(password, result[0].password, (erro, result) =>{
                if(result === true){
                    res.send({msg: 'usuario logado com sucesso'})
                }else{
                    res.send({msg: 'senha incorreta'})
                }
            })
        }else {
            res.send({msg: 'Email nao cadastrado'})
        }
    })
    
})

app.listen(3001, () => {
    console.log("Rodando na porta 3001");
});