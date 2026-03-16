function voltar() {
    window.history.back();
}

// Modal
const modal = document.getElementById('modalAviso');
const mensagemModal = document.getElementById('mensagemModal');

function abrirModal(msg) {
    mensagemModal.textContent = msg;
    modal.style.display = 'flex';
}

function fecharModal() {
    modal.style.display = 'none';
}

// Cadastro
const btnRegistro = document.getElementById('btnRegistro');
btnRegistro.addEventListener('click', async () => {
    const nome = document.getElementById('nome').value.trim();
    const email = document.getElementById('email').value.trim();
    const senha = document.getElementById('senha').value.trim();
    const confirmarSenha = document.getElementById('confirmarSenha').value.trim();

    if (!nome || !email || !senha || !confirmarSenha) {
        abrirModal('Preencha todos os campos!');
        return;
    }

    if (senha !== confirmarSenha) {
        abrirModal('As senhas não coincidem!');
        return;
    }

    const usuario = { usuario: nome, email, senha, role: 'CLIENTE' };

    try {
        const response = await fetch('http://localhost:8080/usuarios/cadastro', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(usuario)
        });

        if (!response.ok) {
            const erro = await response.text();
            throw new Error(erro || 'Erro ao cadastrar!');
        }

        abrirModal('Cadastro realizado com sucesso!');
        document.getElementById('formRegistro').reset();

    } catch (error) {
        abrirModal(error.message);
        console.error(error);
    }
});

if (!response.ok) {
    const erro = await response.text();
    throw new Error(erro || 'Erro ao cadastrar!');
}

// Cadastro deu certo
abrirModal('Cadastro realizado com sucesso!');
document.getElementById('formRegistro').reset();

// Redireciona após 1.5s (ou direto se quiser)
setTimeout(() => {
    window.location.href = 'index.html'; // ou 'login.html' se preferir
}, 1500);