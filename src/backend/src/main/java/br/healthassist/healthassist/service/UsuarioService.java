package br.healthassist.healthassist.service;

import br.healthassist.healthassist.model.entity.Usuario;

import java.util.Optional;

public interface UsuarioService {

    Usuario salvarUsuario(Usuario usuario);

    Optional<Usuario> obterPorId(Long id);
}
