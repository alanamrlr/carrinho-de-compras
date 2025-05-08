let totalDoCarrinho = 0; //variavel global
let produtosNoCarrinho = {};
limpar()

function adicionar(){
    let produtoSelecionado = document.getElementById('produto').value;
    let nomeDoProduto = produtoSelecionado.split('-')[0];
    let precoUnitarioDoProduto = parseFloat(produtoSelecionado.split('$')[1]);
    let quantidadeDoProduto = parseInt(document.getElementById('quantidade').value);
    
    /*! -> verifica se o produto é nulo,indefinida ou vazia 
     .trim remove espaços vazios e verifica se sobrou uma string vazia
     Não entendi porque eles pediram para fazer isso sendo que nos damos produtos especificos para escolherem */
    if (!produtoSelecionado || produtoSelecionado.trim() === "") {
        alert("Selecione um produto válido.");
        return;
    }

    if(quantidadeDoProduto <= 0 || isNaN(quantidadeDoProduto)){
        alert('Selecione uma quantidade válida.');
        return;
    }

    if (produtosNoCarrinho[nomeDoProduto]) {
        produtosNoCarrinho[nomeDoProduto].quantidade += quantidadeDoProduto;
        produtosNoCarrinho[nomeDoProduto].precoTotal +=quantidadeDoProduto * precoUnitarioDoProduto;
    } else {
        produtosNoCarrinho[nomeDoProduto] = {
            quantidade: quantidadeDoProduto,
            precoUnitario: precoUnitarioDoProduto,
            precoTotal: quantidadeDoProduto * precoUnitarioDoProduto
        };
    }
    
    totalDoCarrinho += quantidadeDoProduto * precoUnitarioDoProduto;
        atualizarCarrinho();
        document.getElementById('quantidade').value = '';    

    /*let precoTotalDoProduto = precoUnitarioDoProduto * quantidadeDoProduto;
    
    let carrinhoDeCompras = document.getElementById('lista-produtos');
    carrinhoDeCompras.innerHTML = carrinhoDeCompras.innerHTML + `<section class="carrinho__produtos__produto">
          <span class="texto-azul">${quantidadeDoProduto}x</span> ${nomeDoProduto} <span class="texto-azul">R$${precoTotalDoProduto}</span>
          </section>`;
    totalDoCarrinho = totalDoCarrinho + precoTotalDoProduto;
    let campoTotal = document.getElementById('valor-total');
    campoTotal.textContent = `R$${totalDoCarrinho}`;
    document.getElementById('quantidade').value = '';*/

    /*O código no comentário foi o passado no exercício. Porém vi que se uma pessoa escolhesse o mesmo produto várias vezes o produto não aumentava sua quantidade e sim criava uma nova linha como se fosse um produto diferente*/
}

function atualizarCarrinho(){
    let carrinhoDeCompras = document.getElementById('lista-produtos');
    carrinhoDeCompras.innerHTML = '';

    for (let nomeDoProduto in produtosNoCarrinho) {
        let produto = produtosNoCarrinho[nomeDoProduto];
        carrinhoDeCompras.innerHTML += `<section class="carrinho__produtos__produto">
          <span class="texto-azul">${produto.quantidade}x</span> ${nomeDoProduto} <span class="texto-azul">R$${produto.precoTotal}</span>
          </section>`;
    }
    let campoTotal = document.getElementById('valor-total');
    campoTotal.textContent = `R$${totalDoCarrinho}`;
}

function limpar(){
    totalDoCarrinho = 0;
    produtosNoCarrinho = {};
    document.getElementById('lista-produtos').innerHTML = '';
    document.getElementById('valor-total').textContent = 'R$ 0';
}