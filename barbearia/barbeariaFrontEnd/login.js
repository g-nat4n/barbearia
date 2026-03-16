function voltar() {
    window.history.back();
}

// Modal
const modal = document.getElementById('modalAviso');
const mensagemModal = document.getElementById('mensagemModal');

function abrirModal(msg) {
    if (!modal || !mensagemModal) return;
    mensagemModal.textContent = msg;
    modal.style.display = 'flex';
}

function fecharModal() {
    if (!modal) return;
    modal.style.display = 'none';
}

// Função de login
async function login() {
    const email = document.getElementById('email').value.trim();
    const senha = document.getElementById('senha').value.trim();

    if (!email || !senha) {
        abrirModal('Preencha todos os campos!');
        return;
    }

    try {
        const response = await fetch('http://localhost:8080/usuarios/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, senha })
        });

        if (!response.ok) {
            const erro = await response.text();
            throw new Error(erro || 'Erro ao logar!');
        }

const usuario = await response.json();
console.log('Usuário logado:', usuario);

// Salvar no localStorage
localStorage.setItem('usuarioLogado', JSON.stringify(usuario));

// Redirecionar
window.location.href = 'index.html';

    } catch (error) {
        abrirModal(error.message);
        console.error(error);
    }
}

// Conecta botão de voltar
const voltarBtn = document.querySelector('.voltar');
if (voltarBtn) voltarBtn.addEventListener('click', voltar);