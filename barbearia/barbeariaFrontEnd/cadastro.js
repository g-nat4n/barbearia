document.addEventListener("DOMContentLoaded", () => {
  // ---------------------
  // FUNÇÃO VOLTAR
  // ---------------------
  window.voltar = function () {
    window.history.back();
  };

  // ---------------------
  // MODAL
  // ---------------------
  const modal = document.getElementById('modalAviso');
  const mensagemModal = document.getElementById('mensagemModal');

  window.abrirModal = function (msg) {
    mensagemModal.textContent = msg;
    modal.style.display = 'flex';
  };

  window.fecharModal = function () {
    modal.style.display = 'none';
  };

  // ---------------------
  // CADASTRO
  // ---------------------
  const btnRegistro = document.getElementById('btnRegistro');
  const form = document.getElementById('formRegistro');

  btnRegistro.addEventListener('click', async () => {
    const nome = document.getElementById('nome').value.trim();
    const email = document.getElementById('email').value.trim();
    const senha = document.getElementById('senha').value.trim();
    const confirmarSenha = document.getElementById('confirmarSenha').value.trim();

    // Valida campos
    if (!nome || !email || !senha || !confirmarSenha) {
      abrirModal('Preencha todos os campos!');
      return;
    }

    // Confirma senha
    if (senha !== confirmarSenha) {
      abrirModal('As senhas não coincidem!');
      return;
    }

    const usuario = { usuario: nome, email: email, senha: senha, role: 'CLIENTE' };

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

      // Sucesso
      abrirModal('Cadastro realizado com sucesso!');
      form.reset();

      // Redireciona para login após 1.5s
      setTimeout(() => {
        window.location.href = 'login.html';
      }, 1500);

    } catch (error) {
      abrirModal(error.message);
      console.error(error);
    }
  });
});