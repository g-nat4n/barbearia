package barbearia.barbearia.service;

import barbearia.barbearia.entity.Usuario;
import barbearia.barbearia.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    public Usuario cadastrarUsuario(Usuario usuario){
        if (usuarioRepository.findByEmail(usuario.getEmail()).isPresent()){
            throw new RuntimeException("Email já cadastrado");
        }
        return usuarioRepository.save(usuario);
    }

    public Usuario login(String email, String senha){

        Usuario usuario = usuarioRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Usuario não encontrado!"));

        if (!usuario.getSenha().equals(senha)){
            throw new RuntimeException("Senha incorreta");
        }
        return usuario;
    }
}
