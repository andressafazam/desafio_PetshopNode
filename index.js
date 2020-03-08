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
    let conteudo = "";
    let listarPets = `
    Lista de pets: 
    -------------------------`;

    switch (rota) {
      case "/":
        res.write(`
    -------------------------
      Bem vindo ao Petshop!
    -------------------------`);
        break;

      case "/pets":
        conteudo = petshop.listarPets();
        if (conteudo.length > 0) {
          res.write(listarPets + conteudo);
        } else {
          res.write("Nenhum pet cadastrado.");
        }
        break;

      case "/pets/add":
        let novoPet = queryString;
        if (petshop.adicionarPet(novoPet)) {
          res.write(`
        ${novoPet.nome} foi adicionado a nossa lista!`);
        } else {
          res.write("Ops, algo deu errado!");
        }
        break;

      case "/pets/buscar":
        let nomePet = queryString.nome;
        let petsEncontrados = petshop.buscarPet(nomePet);
        if (petsEncontrados.length > 0) {
          res.write(
            `
        Encontramos ${petsEncontrados.length} pets com o nome ${nomePet}`);
        } else {
          res.write(`
        Nenhum pet cadastrado com esse nome!`);
        }
        break;

      case "/pets/vacina":  
        let nomePetVacina = queryString.nome;
        if(petshop.vacinado(nomePetVacina)){
          res.write(
            `
        O pet ${nomePetVacina} foi vacinado com sucesso.`);
        } else{
          res.write(
            `
        Algum problema ocorreu e o pet ${nomePetVacina} não foi vacinado com sucesso.`);
        }
        break;

      case "/pets/vacinados":  
        let qttVacinados = petshop.contarVacinados();
        res.write(
            `
        De todos os pets cadastrados ${qttVacinados} já foram vacinados.`);
        break;

      case "/pets/campanha":
        if (petshop.campanhaVacina()){
          res.write(
            `
        Campanha de vacinação foi um sucesso, todos os pets foram vacinados!`);
        } else{
          res.write(
            `
        Campanha de vacinação não foi um sucesso...`);
        }
        break;

      default:
              res.write(`
        Pagina não encontrada...`);
          }

    // req = request, res = responses
    res.end();
  })
  .listen(3000, "localhost", () => {
    console.log("Servidor rodando!");
  });
