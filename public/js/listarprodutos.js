const tabeltaProdutos = document.querySelector(".tabela__produtos");

function pesquisar(){
  const valorPesquisa = document.querySelector('#pesquisar').value;
  const publivoAlvo = document.querySelectorAll('#publico-alvo');
  nomesPublico = []
  publivoAlvo.forEach(publico => {
    nomesPublico.push(publico.textContent);
  });

  if(valorPesquisa == ""){
    location.reload();
  }

  else if(!nomesPublico.includes(valorPesquisa)){
    alert("Produto Não encontrado");
  }

  else if(nomesPublico.includes(valorPesquisa)){
    publivoAlvo.forEach(texto => {
      if (valorPesquisa != texto.textContent) {
        let elementoPai = texto.parentElement;
        elementoPai.remove();
      }
    })
  }
}