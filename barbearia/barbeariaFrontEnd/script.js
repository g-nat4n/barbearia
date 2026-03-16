function toggleMenu(){
const menu = document.getElementById("menu");

if(menu){
menu.style.display = menu.style.display === "flex" ? "none" : "flex";
}
}


// ---------------------
// SERVIÇOS
// ---------------------

const servicos = [
{ nome: "Barba", preco: 55, tempo: "30 min", imagem: "../img/logo barbearia.jpg" },
{ nome: "Cabelo", preco: 65, tempo: "40 min", imagem: "../img/logo barbearia.jpg" },
{ nome: "Cabelo / Barba", preco: 115, tempo: "60 min", imagem: "../img/logo barbearia.jpg" }
];

const container = document.querySelector(".container");

if(container){

servicos.forEach(servico => {

const card = document.createElement("div");
card.classList.add("card");

card.innerHTML = `
<img src="${servico.imagem}">

<div class="info">
<h3>${servico.nome}</h3>
<p class="price">R$ ${servico.preco},00</p>
<p class="time">⏱ ${servico.tempo}</p>
</div>

<button onclick="irParaAgendamento('${servico.nome}')">
Agendar
</button>
`;

container.appendChild(card);

});

}


// ---------------------
// IR PARA AGENDAMENTO
// ---------------------

function irParaAgendamento(servico){

window.location.href =
"agendamento.html?servico=" + encodeURIComponent(servico);

}


// ---------------------
// PEGAR SERVIÇO NA URL
// ---------------------

const params = new URLSearchParams(window.location.search);
const servicoSelecionado = params.get("servico");

const campoServico = document.getElementById("servico");

if(campoServico && servicoSelecionado){
campoServico.value = servicoSelecionado;
}


// ---------------------
// ENVIAR AGENDAMENTO
// ---------------------

const form = document.getElementById("formAgendamento");

if(form){

form.addEventListener("submit", function(e){

e.preventDefault();

const agendamento = {

nomeCliente: document.getElementById("nomeCliente").value,
contato: document.getElementById("contato").value,
dataAgendada: document.getElementById("dataAgendada").value,
servico: document.getElementById("servico").value

};

fetch("http://localhost:8080/api/agendamentos", {

method: "POST",
headers: {
"Content-Type": "application/json"
},
body: JSON.stringify(agendamento)

})
.then(async response => {

if(!response.ok){

const erro = await response.text();
mostrarModal(erro);
return;

}

mostrarModal("Agendamento realizado com sucesso!");

setTimeout(() => {
window.location.href = "index.html";
}, 2000);

})
.catch(error => {

console.error(error);
mostrarModal("Erro ao conectar com o servidor");

});

});

}


// ---------------------
// BOTÃO VOLTAR
// ---------------------

function voltar(){
window.location.href = "index.html";
}


// ---------------------
// MODAL DE AVISO
// ---------------------

function mostrarModal(mensagem){

const modal = document.getElementById("modalAviso");
const texto = document.getElementById("mensagemModal");

if(modal && texto){
texto.innerText = mensagem;
modal.style.display = "flex";
}

}

function fecharModal(){

const modal = document.getElementById("modalAviso");

if(modal){
modal.style.display = "none";
}

}