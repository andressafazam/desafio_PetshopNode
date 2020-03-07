const http = require("http");
const petshop = require("./petshop");
const url = require("url");

const server = http
  .createServer((req, res) => {
    // quando faço requisição no navegador
    res.writeHead(200, { "Content-Type": "text/plain; charset=UTF-8" });
    let urlCompleta = url.parse(req.url, true);
    let queryString = urlCompleta.query; // parametros
    let rota = urlCompleta.pathname; // ex: pets/add

    // console.log(queryString);

    switch (rota) {
      case "/pets":
        let conteudo = petshop.listarPets();
        if (conteudo.length > 0) {
          res.write(conteudo);
        } else {
          res.write("Nenhum pet cadastrado :(");
        }
        break;
      case "/pets/add":
        let novoPet = queryString;
        if (petshop.adicionarPet(novoPet)) {
          res.write(`${novoPet.nome} foi adicionado a nossa lista!`);
        } else {
          res.write("Ops, algo deu errado!");
        }
        break;
      case "/pets/buscar":
        let nomePet = queryString.nome;
        let petsEncontrados = petshop.buscarPet(nomePet);
        if (petsEncontrados.length > 0) {
          res.write(
            `Encontramos ${petsEncontrados.length} pets com o nome ${nomePet}`
          );
        } else {
          res.write("Ops, nenhum pet cadastrado com esse nome!");
        }
        break;
      default:
        res.write("tô perdido");
    }

    // req = request, res = responses
    res.end();
  })
  .listen(3000, "localhost", () => {
    // quando ligo servidor
    console.log("Servidor rodando :)");
  });
