const express = require('express');
const helmet = require('helmet');
const fs = require('fs');
const app = express();

app.use(express.json());
app.use(helmet.noSniff());
app.use(express.urlencoded({
    extended: true
}));

app.use(express.static('public'));


const arquivoJSON = require('./bd/storage.json');

app.get('/json', (req, res) => {
    res.json(arquivoJSON);
});

app.post('/adicionar', (req, res) => {
    const novoDado = req.body;
    arquivoJSON.push(novoDado);

    fs.writeFile('./bd/storage.json', JSON.stringify(arquivoJSON), (err) => {
        if (err) {
            console.log(err);
            res.status(500).send('Erro ao gravar arquivo');
        } else {
            res.json(arquivoJSON);
        }
    });
});

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

app.get('/pages/consulta', (req, res) => {
    res.sendFile(__dirname + '/pages/consulta.html');
});

app.get('/pages/cadastro', (req, res) => {
    res.sendFile(__dirname + '/pages/cadastro.html');
});

// Define o diretório público para servir arquivos estáticos
app.use(express.static('public'));


const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});