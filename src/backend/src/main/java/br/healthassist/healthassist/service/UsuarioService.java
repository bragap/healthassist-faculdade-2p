package br.healthassist.healthassist.service;

import br.healthassist.healthassist.model.entity.Usuario;

import java.util.List;
import java.util.Optional;

public interface UsuarioService {

    Usuario salvarUsuario(Usuario usuario);

    List<Usuario> buscaPorFiltro(Usuario usuarioFiltro );

    void validarEmail(String email);

    Optional<Usuario> findById(Long id);

    List<Usuario> findAllUsuario();

    Usuario autenticar(String email, String senha);
}
