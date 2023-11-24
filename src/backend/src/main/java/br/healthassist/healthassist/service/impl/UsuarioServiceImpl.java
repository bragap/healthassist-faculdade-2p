package br.healthassist.healthassist.service.impl;

import br.healthassist.healthassist.exception.AutenticacaoException;
import br.healthassist.healthassist.exception.RegraNegocioException;
import br.healthassist.healthassist.model.entity.Usuario;
import br.healthassist.healthassist.model.repository.UsuarioRepository;
import br.healthassist.healthassist.service.UsuarioService;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.ExampleMatcher;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class UsuarioServiceImpl implements UsuarioService {

    private UsuarioRepository usuarioRepository;

    public UsuarioServiceImpl(UsuarioRepository usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }

    @Override
    @Transactional
    public Usuario salvarUsuario(Usuario usuario) {
        validarEmail(usuario.getEmail());
        return usuarioRepository.save(usuario);
    }

    @Override
    public void validarEmail(String email){
        boolean existe = usuarioRepository.existsByEmail(email);

        if(existe){
            throw new RegraNegocioException("Já existe usuário cadastrado pra esse email");
        }
    }

    @Override
    @Transactional(readOnly = true)
    public List<Usuario> buscaPorFiltro(Usuario usuarioFiltro) {

        Example example = Example.of( usuarioFiltro, ExampleMatcher
                .matching()
                .withIgnoreCase()
                .withStringMatcher(ExampleMatcher.StringMatcher.CONTAINING));

        return usuarioRepository.findAll(example);
    }

    @Override
    public Optional<Usuario> findById(Long id) {
        return usuarioRepository.findById(id);
    }

    @Override
    public List<Usuario> findAllUsuario() {
        return usuarioRepository.findAll();
    }

    @Override
    public Usuario autenticar(String email, String senha) {
        Optional<Usuario> usuario = usuarioRepository.findByEmail(email);

        if(!usuario.isPresent()){
            throw new AutenticacaoException("Usuario não encontrado para o email informado.");
        }
        if(!usuario.get().getSenha().equals(senha)){
            throw new AutenticacaoException("Senha Inválida");
        }

        return usuario.get();
    }
}
