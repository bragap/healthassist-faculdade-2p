package br.healthassist.healthassist.controller;

import br.healthassist.healthassist.model.entity.ArquivoPaciente;
import br.healthassist.healthassist.model.entity.Paciente;
import br.healthassist.healthassist.model.enums.StatusAprovacao;
import br.healthassist.healthassist.service.ArquivoPacienteService;
import br.healthassist.healthassist.service.PacienteService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/paciente/arquivo")
@RequiredArgsConstructor
public class ArquivoPacienteController {

    private final ArquivoPacienteService arquivoPacienteService;
    private final PacienteService pacienteService;

    @PostMapping("/{id}")
    public ResponseEntity uploadArquivo(@RequestParam("file") MultipartFile file, @PathVariable("id") Long idPaciente){

        try{
            Paciente paciente = pacienteService.findPacienteById(idPaciente);

            ArquivoPaciente arquivoPaciente = ArquivoPaciente.builder()
                    .idPaciente(paciente)
                    .nomeArquivo(file.getOriginalFilename())
                    .tipoMime(file.getContentType())
                    .aprovacao(StatusAprovacao.ANALISE)
                    .build();

            arquivoPaciente.setDadosArquivo(file.getBytes());

            arquivoPacienteService.salvarArquivoPaciente(arquivoPaciente);
            return new ResponseEntity("Arquivo Salvo com sucesso", HttpStatus.CREATED);
        } catch (Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }

    }

    @GetMapping("/{id}")
    public ResponseEntity<byte[]> downloadArquivo(@PathVariable("id") Long id){

        ArquivoPaciente arquivoPaciente = arquivoPacienteService.obterArquivoPorId(id);
        if (arquivoPaciente != null){
            return ResponseEntity.ok()
                    .header("Content-Disposition", "attachment; filename=" + arquivoPaciente.getNomeArquivo())
                    .body(arquivoPaciente.getDadosArquivo());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

}
