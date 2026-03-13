let servicoSelecionado = "";

function selecionarServico(servico){
servicoSelecionado = servico;
alert("Serviço escolhido: " + servico);
}

function agendar(){

const nome = document.getElementById("nome").value;
const data = document.getElementById("data").value;
const hora = document.getElementById("hora").value;

fetch("http://localhost:8080/agendamentos", {

method: "POST",

headers:{
"Content-Type":"application/json"
},

body: JSON.stringify({
nome:nome,
servico:servicoSelecionado,
data:data,
hora:hora
})

})
.then(res => res.json())
.then(data => {
alert("Agendamento realizado!");
})

}

function agendar(servico){

alert("Agendar serviço: " + servico)

// aqui você pode enviar para o backend
// fetch("/agendamentos")

}


function toggleMenu(){

const menu = document.getElementById("menu");

if(menu.style.display === "flex"){
menu.style.display = "none";
}else{
menu.style.display = "flex";
}

}