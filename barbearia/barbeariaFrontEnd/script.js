let horarioSelecionado = null;

// Garante que o código rode assim que a página carregar totalmente
document.addEventListener("DOMContentLoaded", () => {
    // Se estiver na index (onde tem o container de serviços)
    renderizarCardsServicos();
    
    // Se estiver na página de agendamento
    configurarDataMinima();
    configurarEventoData();
    preencherServicoDaURL();
    configurarEnvioFormulario();
});

// ---------------------
// NAVEGAÇÃO E INTERFACE
// ---------------------

function voltar() {
    window.location.href = "index.html";
}

function toggleMenu() {
    const menu = document.getElementById("menu");
    if (menu) {
        menu.style.display = menu.style.display === "flex" ? "none" : "flex";
    }
}

// Renderiza os serviços na tela inicial
function renderizarCardsServicos() {
    const container = document.querySelector(".container");
    if (!container || window.location.pathname.includes("agendamento.html")) return;

    const servicos = [
        { nome: "Barba", preco: 55, tempo: "30 min", imagem: "../img/logo barbearia.jpg" },
        { nome: "Cabelo", preco: 65, tempo: "40 min", imagem: "../img/logo barbearia.jpg" },
        { nome: "Cabelo / Barba", preco: 115, tempo: "60 min", imagem: "../img/logo barbearia.jpg" }
    ];

    container.innerHTML = "";
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
            <button onclick="irParaAgendamento('${servico.nome}')">Agendar</button>
        `;
        container.appendChild(card);
    });
}

function irParaAgendamento(servico) {
    window.location.href = "agendamento.html?servico=" + encodeURIComponent(servico);
}

function preencherServicoDaURL() {
    const params = new URLSearchParams(window.location.search);
    const servico = params.get("servico");
    const campoServico = document.getElementById("servico");
    if (campoServico && servico) {
        campoServico.value = servico;
    }
}

function configurarDataMinima() {
    const campoData = document.getElementById("dataAgendada");
    if (campoData) {
        const hoje = new Date().toISOString().split("T")[0];
        campoData.setAttribute("min", hoje);
    }
}

// ---------------------
// LÓGICA DE HORÁRIOS DISPONÍVEIS
// ---------------------

function configurarEventoData() {
    const campoData = document.getElementById("dataAgendada");
    if (campoData) {
        campoData.addEventListener("change", (e) => {
            const dataVal = e.target.value;
            if (dataVal) {
                buscarHorariosDoServidor(dataVal);
            }
        });
    }
}

async function buscarHorariosDoServidor(data) {
    const container = document.getElementById('container-horarios');
    if (!container) return;

    container.innerHTML = "<p>Buscando horários disponíveis...</p>";
    horarioSelecionado = null;

    try {
        const resposta = await fetch(`http://localhost:8080/api/agendamentos/disponiveis?data=${data}`);
        if (!resposta.ok) throw new Error("Erro ao buscar dados");

        const horarios = await resposta.json();
        container.innerHTML = "";

        if (!horarios || horarios.length === 0) {
            container.innerHTML = "<p>Nenhum horário livre para esta data.</p>";
            return;
        }

        horarios.forEach(hora => {
            const botao = document.createElement('button');
            botao.type = "button"; 
            botao.innerText = hora.substring(0, 5);
            botao.className = 'btn-horario';
            botao.onclick = () => {
                document.querySelectorAll('.btn-horario').forEach(b => b.classList.remove('selecionado'));
                botao.classList.add('selecionado');
                horarioSelecionado = hora; 
            };
            container.appendChild(botao);
        });
    } catch (error) {
        container.innerHTML = "<p style='color:red;'>Erro ao carregar horários.</p>";
    }
}

// ---------------------
// ENVIO DO FORMULÁRIO (VERSÃO ÚNICA)
// ---------------------

async function enviarAgendamento() {
    // 1. Pegar os dados dos campos
    const nome = document.getElementById("nomeCliente").value;
    const contato = document.getElementById("contato").value;
    const data = document.getElementById("dataAgendada").value;
    const servico = document.getElementById("servico").value;

    // 2. Validações
    if (!nome || !contato || !data) {
        mostrarModal("Por favor, preencha todos os campos.");
        return;
    }

    if (!horarioSelecionado) {
        mostrarModal("Por favor, selecione um horário disponível.");
        return;
    }

    const agendamento = {
        nomeCliente: nome,
        contato: contato,
        servico: servico,
        dataAgendada: `${data}T${horarioSelecionado}`
    };

    try {
        const response = await fetch("http://localhost:8080/api/agendamentos", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(agendamento)
        });

        if (response.ok) {
            // AQUI ESTÁ O SEGREDO: Apenas mostramos o modal. 
            // Sem redirecionamento, você continua na mesma tela.
            mostrarModal("Agendamento realizado com sucesso!");
            
            // Opcional: Limpar apenas o nome e contato para o próximo uso
            document.getElementById("nomeCliente").value = "";
            document.getElementById("contato").value = "";
            
        } else {
            const erroMsg = await response.text();
            mostrarModal("Erro do servidor: " + erroMsg);
        }
    } catch (error) {
        console.error("Erro na requisição:", error);
        mostrarModal("Erro: Não foi possível conectar ao servidor.");
    }
}

// ---------------------
// MODAL DE AVISO
// ---------------------


function fecharModal() {
    const modal = document.getElementById("modalAviso");
    if (modal) {
        modal.style.display = "none";
    }
}

function mostrarModal(mensagem) {
    console.log("Tentando mostrar o modal com a mensagem:", mensagem); // Veja se isso aparece no F12
    const modal = document.getElementById("modalAviso");
    const texto = document.getElementById("mensagemModal");
    
    if (modal && texto) {
        texto.innerText = mensagem;
        modal.style.setProperty("display", "flex", "important"); // Força o display
    } else {
        console.error("Erro: Não encontrei o elemento modalAviso ou mensagemModal no HTML");
    }
}

// login

const usuario = JSON.parse(localStorage.getItem("usuario"))

if(usuario){
document.querySelector(".header-actions").innerHTML =
`
<span>Olá, ${usuario.usuario}</span>
<button onclick="logout()">Sair</button>
`
}

function logout(){
localStorage.removeItem("usuario")
window.location.href = "login.html"
}

const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));
const headerActions = document.getElementById('headerActions');

if (usuarioLogado) {
    headerActions.innerHTML = `
    <span class="usuario-nome">Olá, ${usuarioLogado.usuario}</span>
    <button id="btnSair" class="btn-action">Sair</button>
`;

    document.getElementById('btnSair').addEventListener('click', () => {
        localStorage.removeItem('usuarioLogado');
        window.location.reload();
    });
}