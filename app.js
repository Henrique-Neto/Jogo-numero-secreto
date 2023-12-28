let listaNumerosSorteados = [];
let limiteMaxJogo = 10;
let numeroSecreto = gerarNumero();
let tentativas = 1;
exibirMsgInicial();

console.log(numeroSecreto);

function exibirTextos(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2} );
}

function exibirMsgInicial() {
    exibirTextos('h1', 'Jogo do número secreto');
    exibirTextos('p', `Escolha um numero entre 1 e ${limiteMaxJogo}`);
}



function verificarChute() {
    let chute = document.querySelector('input').value;
    let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';

    if (chute == numeroSecreto) {
        exibirTextos('h1', 'Acertou');
        exibirTextos('p', `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}`);
        document.getElementById('reiniciar').removeAttribute('disabled');

    } else {
        if (chute > numeroSecreto) {
            exibirTextos('p', 'O número secreto é menor ');
        } else {
            exibirTextos('p', 'O número secreto é maior ');
        }
        tentativas++;
        limparCampo();
    }
    //console.log( chute == numeroSecreto); 
}


function gerarNumero() {
    let numeroEscolhido = parseInt(Math.random() * limiteMaxJogo + 1);
    let tamanhoLista = listaNumerosSorteados.length;

    if (tamanhoLista == limiteMaxJogo){
        listaNumerosSorteados = []
    }

    if (listaNumerosSorteados.includes(numeroEscolhido)){
        return gerarNumero();
    } else {
        listaNumerosSorteados.push(numeroEscolhido)
        console.log(listaNumerosSorteados);
        return numeroEscolhido;
    }
}

function limparCampo() {
    document.querySelector('input').value = '';
}

function reiniciarJogo() {
    numeroSecreto = gerarNumero();
    limparCampo();
    tentativas = 1;
    exibirMsgInicial();
    document.getElementById('reiniciar').setAttribute('disabled',true);
}