const app = require("./app");

const PORT = process.env.PORT || 3000;

console.log("🚀 Iniciando PDFPrime...");
console.log("Sistema Operacional:", process.platform);
console.log("Node:", process.version);

process.on("uncaughtException", (err) => {

    console.error("ERRO NÃO TRATADO:");
    console.error(err);

});

process.on("unhandledRejection", (err) => {

    console.error("PROMISE REJEITADA:");
    console.error(err);

});

app.listen(PORT, () => {

    console.log(`Servidor iniciado na porta ${PORT}`);

});