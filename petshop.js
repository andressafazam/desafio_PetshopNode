let pets = [
  { nome: "Snoopy", tipo: "Cachorro", raca: "Beagle", idade: 70, genero: "M", vacinado: true, servicos: [] }, 
  { nome: "Mingau", tipo: "Gato", raca: "Angora", idade: 31, genero: "M", vacinado: false, servicos: [] },
  { nome: "Bidu", tipo: "Cachorro", raca: "Schnauzer", idade: 61, genero: "M", vacinado: false, servicos: [] },
  { nome: "Garfield", tipo: "Gato", raca: "Persa", idade: 42, genero: "M", vacinado: true, servicos: [] },
  { nome: "Jujuba", tipo: "Cachorro", raca: "ViraLata", idade: 10, genero: "F", vacinado: false, servicos: [] },
  { nome: "Titi", tipo: "Cachorro", raca: "ViraLata", idade: 6, genero: "F", vacinado: false, servicos: [] },
];

const listarPets = () => {
  let cont = 1;
  let conteudo = "";
  for (let pet of pets) {
    conteudo += ` 
    ${cont++}. ${pet.nome}
    --------------------------`;
  }
  return conteudo;
};

const adicionarPet = novoPet => {
  pets.push(novoPet);
  return listarPets();
};

const buscarPet = nomePet => {
  let numIndex = [];
  pets.filter((pets, index) => {
    if(pets.nome == nomePet)
      numIndex.push(index);
  });
  return numIndex;
};

const vacinado = novoPet =>{
  let validacao = false;
  let numIndex = buscarPet(novoPet);
  if(numIndex.length > 0){
    pets[numIndex].vacinado = true;
    validacao = true;
  }
  return validacao;
}

const contarVacinados = () => {
  contador = 0;
  pets.filter(pets => {
    if(pets.vacinado == true)
      contador++;
  });
  return contador
}

const campanhaVacina = () => {
  pets.forEach(pets => {
    pets.vacinado = true;
  });
  if(contarVacinados() == pets.length)
    return true;
  else
    return false;
}

module.exports = { listarPets, adicionarPet, buscarPet, vacinado, contarVacinados, campanhaVacina};