package barbearia.barbearia.controller;

import barbearia.barbearia.dto.LoginDto;
import barbearia.barbearia.entity.Usuario;
import barbearia.barbearia.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/usuarios")
@CrossOrigin("*")
public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;

    @PostMapping("/cadastro")
    public Usuario cadastrar(@RequestBody Usuario usuario){
        return usuarioService.cadastrarUsuario(usuario);
    }

    @PostMapping("/login")
    public Usuario login(@RequestBody LoginDto login){
        return  usuarioService.login(login.getEmail(), login.getSenha());
    }
}
