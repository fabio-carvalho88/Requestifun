const fs = require('fs');
const jwt = require('jsonwebtoken');

const privateKey = fs.readFileSync('./assets/keys/private.key', 'utf-8');
const publicKey = fs.readFileSync('./assets/keys/public.key', 'utf-8');

// Tokens de acesso
const accessSignOptions = {
    expiresIn: "30m",
    algorithm: "RS256"
}

// Tokens de refresh
const refreshSignOptions = {
    expiresIn: "6h",
    algorithm: "RS256"
}

// Token expire 0,5h
const accessVerifyOptions = {
    expiresIn: "30m",
    algorithm: ["RS256"],
}

// Token with expire 6h
const refreshVerifyOptions = {
    expiresIn: "6h",
    algorithm: ["RS256"],
}

const author = "reqfun"

function createAccessToken(req) {
    let token = "";
    token = jwt.sign({
        auth: author, //autor do token
        agent: req.headers["user-agent"], //saber quem é o cliente(ex: browser)
    }, privateKey, accessSignOptions);

    return token;
}

function createRefreshToken(req) {
    let token = "";
    token = jwt.sign({
        auth: author, //autor do token
        agent: req.headers["user-agent"], //saber quem é o cliente(ex: browser)
    }, privateKey, refreshSignOptions);

    return token;
}

function validateToken(req, res, next) {
    let token = req.headers.authorization;
    if (token == "" || token == null) return res.send("Token não existe.");

    try {
        let legitToken = jwt.verify(token, publicKey, accessVerifyOptions); //verifica a legitimidade do token

        if (legitToken.iat > legitToken.exp) res.send("Token expirado!"); //verifica o tempo que passou desde a criação do token

        if (legitToken && legitToken.auth == author) { //verifica o autor do token
            res.setHeader("Authorization", createAccessToken(req));
            return next(req, res);
        } else res.send("Erro! O autor é diferente!")
    } catch (err) {
        console.log(err)
        res.send(err);
    }
}

function refreshToken(req, res) {
    let token = req.headers.refresh;

    try {
        let legitToken = jwt.verify(token, publicKey, refreshVerifyOptions); //verifica a legitimidade do token

        if (legitToken.iat > legitToken.exp) res.send("Token expirado!") //verifica o tempo que passou desde a criação do token

        if (legitToken && legitToken.auth == author) { //verifica o autor do token
            res.setHeader("Authorization", createAccessToken(req));
            res.setHeader("Refresh", createRefreshToken(req));
            res.send("Sucesso!")
        } else res.send("Erro! O autor é diferente!")
    } catch (err) {
        res.send(err);
    }
}

module.exports = {
    createAccessToken: createAccessToken,
    createRefreshToken: createRefreshToken,
    validateToken: validateToken,
    refreshToken: refreshToken,
};