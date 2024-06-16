const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcryptjs');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Conectar ao banco de dados SQLite
let db = new sqlite3.Database(':memory:', (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Conectado ao banco de dados SQLite.');
});

// Criar tabela de pacientes
db.run(`CREATE TABLE IF NOT EXISTS patients (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT,
    data_nascimento TEXT,
    cpf TEXT,
    estado TEXT,
    cidade TEXT,
    cep TEXT,
    telefone TEXT,
    email TEXT UNIQUE,
    senha TEXT
)`, (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Tabela de pacientes criada.'); // Adicione esta linha
});

// Criar tabela de profissionais
db.run(`CREATE TABLE IF NOT EXISTS professionals (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT,
    data_nascimento TEXT,
    profissao TEXT,
    carteira_registro TEXT,
    cpf TEXT,
    estado TEXT,
    cidade TEXT,
    cep TEXT,
    email TEXT UNIQUE,
    senha TEXT
)`, (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Tabela de profissionais criada.'); // Adicione esta linha
});

// Endpoint para registrar pacientes
app.post('/register', (req, res) => {
    console.log(req.body); // Adicione esta linha
    const { nome, data_nascimento, cpf, estado, cidade, cep, telefone, email, senha } = req.body;
    const hashedPassword = bcrypt.hashSync(senha, 8);

    db.run(`INSERT INTO patients (nome, data_nascimento, cpf, estado, cidade, cep, telefone, email, senha) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [nome, data_nascimento, cpf, estado, cidade, cep, telefone, email, hashedPassword], function(err) {
        if (err) {
            console.error(err);
            return res.status(500).send("Erro ao registrar o paciente.");
        }
        console.log('Paciente registrado com sucesso:', email);
        res.status(200).json({ message: "Paciente registrado com sucesso!", redirectUrl: "C:/Users/giova/OneDrive/Documentos/site/patient-registration/public/oficial.html" });
    });
});

// Endpoint para registrar profissionais
app.post('/register_professional', (req, res) => {
    console.log(req.body); 
    const { nome, data_nascimento, profissao, carteira_registro, cpf, estado, cidade, cep, email, senha } = req.body;
    const hashedPassword = bcrypt.hashSync(senha, 8);

    db.run(`INSERT INTO professionals (nome, data_nascimento, profissao, carteira_registro, cpf, estado, cidade, cep, email, senha) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [nome, data_nascimento, profissao, carteira_registro, cpf, estado, cidade, cep, email, hashedPassword], function(err) {
        if (err) {
            console.error(err);
            return res.status(500).send("Erro ao registrar o profissional.");
        }
        console.log('Profissional registrado com sucesso:', email);
        res.status(200).json({ message: "Profissional registrado com sucesso!", redirectUrl: "C:/Users/giova/OneDrive/Documentos/site/patient-registration/public/oficial.html" });
    });
});

// Endpoint para login
app.post('/login', (req, res) => {
    console.log(req.body); 
    const { email, senha, userType } = req.body;
    const table = userType === 'professional' ? 'professionals' : 'patients';

    db.get(`SELECT * FROM ${table} WHERE email = ?`, [email], (err, row) => {
        if (err) {
            console.error(err);
            return res.status(500).send("Erro ao fazer login.");
        }
        console.log(row);
        if (!row || !bcrypt.compareSync(senha, row.senha)) {
            return res.status(401).send("E-mail ou senha incorretos.");
        }
        console.log('Login bem-sucedido:', email);
        res.status(200).json({ message: "Login bem-sucedido!", redirectUrl: "C:/Users/giova/OneDrive/Documentos/site/patient-registration/public/oficial.html" });
    });

});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
