package br.healthassist.healthassist.controller;

import br.healthassist.healthassist.controller.dto.AtualizarStatusDto;
import br.healthassist.healthassist.controller.dto.EspecialidadeDto;
import br.healthassist.healthassist.controller.dto.MedicoDto;
import br.healthassist.healthassist.exception.RegraNegocioException;
import br.healthassist.healthassist.model.entity.ArquivoMedico;
import br.healthassist.healthassist.model.entity.Especialidade;
import br.healthassist.healthassist.model.entity.Medico;
import br.healthassist.healthassist.model.entity.Usuario;
import br.healthassist.healthassist.model.enums.StatusAprovacao;
import br.healthassist.healthassist.service.ArquivoMedicoService;
import br.healthassist.healthassist.service.EspecialidadeService;
import br.healthassist.healthassist.service.MedicoService;
import br.healthassist.healthassist.service.UsuarioService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/medico")
@RequiredArgsConstructor
public class MedicoController {

    private final UsuarioService usuarioService;
    private final EspecialidadeService especialidadeService;
    private final MedicoService medicoService;

    @PostMapping
    public ResponseEntity cadastrarMedico(@RequestBody MedicoDto dto) {

        try {
            Medico medicoSalvo = medicoService.salvarMedico(converter(dto));
            return new ResponseEntity(medicoSalvo, HttpStatus.CREATED);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping
    public ResponseEntity buscar() {
        try {
            List<Medico> medicoList = medicoService.findAllMedico();
            return new ResponseEntity(medicoList, HttpStatus.OK);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity buscarPorId(@PathVariable("id") Long id) {

        Optional<Medico> medico = medicoService.findById(id);

        if (medico.isEmpty()) {
            return ResponseEntity.badRequest().body("Medico não encontrado na base de dados");
        } else {
            return new ResponseEntity(medico, HttpStatus.OK);
        }

    }

    @PutMapping("/{id}")
    public ResponseEntity alterarDados(@PathVariable("id") Long id, @RequestBody MedicoDto dto) {
        try{
            Medico medico = medicoService.updateMedico( id, converter(dto));
            return new ResponseEntity<>( medico , HttpStatus.OK);
        }catch(Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("/{id}/atualizar-status")
    public ResponseEntity atualizarStatus(@PathVariable("id") Long id, @RequestBody AtualizarStatusDto dto) {
        return medicoService.findById(id).map(entity -> {
            StatusAprovacao statusSelecionado = StatusAprovacao.valueOf(dto.getAprovacao());
            if (dto.getAprovacao() == null) {
                return ResponseEntity.badRequest().body("Não foi possivel atualizar o status de Aprovação, envie um Status válido");
            }
            try {
                entity.setAprovacao(statusSelecionado);
                medicoService.salvarMedico(entity);
                return ResponseEntity.ok(entity);
            } catch (RegraNegocioException e){
                return ResponseEntity.badRequest().body(e.getMessage());
            }
        }).orElseGet(() -> ResponseEntity.notFound().build());
    }

    private Medico converter(MedicoDto dto) {

        DateTimeFormatter dateFormat = DateTimeFormatter.ofPattern("dd/MM/yyyy");
        LocalDate dataNasc = LocalDate.parse(dto.getData_nasc(), dateFormat);

        Medico medico = Medico.builder()
                .endereco(dto.getEndereco())
                .dataNasc(dataNasc)
                .codigoDeRegistro(dto.getCodigo_de_registro())
                .nomeCompleto(dto.getNome_completo())
                .aprovacao(StatusAprovacao.ANALISE)
                .build();

        List<EspecialidadeDto> especialidadesDto = dto.getEspecialidades();
        List<Especialidade> especialidades = new ArrayList<>();

        for (EspecialidadeDto especialidadeDto : especialidadesDto) {
            Especialidade especialidade = especialidadeService
                    .findByNome(especialidadeDto.getNome());

            especialidades.add(especialidade);
        }

        medico.setEspecialidades(especialidades);

        Usuario usuario = usuarioService
                .findById(dto.getId_usuario())
                .orElseThrow(() -> new RegraNegocioException("Usuario não encontrado para o id informado."));

        medico.setUsuario(usuario);

        return medico;
    }

}