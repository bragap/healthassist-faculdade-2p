package br.healthassist.healthassist.controller;

import br.healthassist.healthassist.model.entity.ArquivoMedico;
import br.healthassist.healthassist.model.entity.Medico;
import br.healthassist.healthassist.model.enums.StatusAprovacao;
import br.healthassist.healthassist.service.ArquivoMedicoService;
import br.healthassist.healthassist.service.MedicoService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("/api/medico/arquivo")
@RequiredArgsConstructor
public class ArquivoMedicoController {

    private final ArquivoMedicoService arquivoMedicoService;
    private final MedicoService medicoService;

    @PostMapping("/{id}")
    public ResponseEntity uploadArquivo(@RequestParam("file") MultipartFile file, @PathVariable("id") Long idMedico){

        try{

            Medico medico = medicoService.findMedicoById(idMedico);
            if(medico == null){
                return ResponseEntity.badRequest().body("Médico não encontrado com o ID fornecido.");
            }

            ArquivoMedico arquivoMedico = ArquivoMedico.builder()
                    .idMedico(medico)
                    .nomeArquivo(file.getOriginalFilename())
                    .tipoMime(file.getContentType())
                    .aprovacao(StatusAprovacao.ANALISE)
                    .build();

            arquivoMedico.setDadosArquivo(file.getBytes());

            arquivoMedicoService.salvarArquivo(arquivoMedico);
            return new ResponseEntity("Arquivo Salvo com Sucesso", HttpStatus.CREATED);
        } catch (IOException e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }

    }

    @GetMapping("/{id}")
    public ResponseEntity<byte[]> downloadArquivo(@PathVariable("id") Long id){

        // Lógica para recuperar o arquivo do banco de dados e enviá-lo como resposta
        ArquivoMedico arquivoMedico = arquivoMedicoService.obterArquivoPorId(id);
        if (arquivoMedico != null) {
            return ResponseEntity.ok()
                    .header("Content-Disposition", "attachment; filename=" + arquivoMedico.getNomeArquivo())
                    .body(arquivoMedico.getDadosArquivo());
        } else {
            return ResponseEntity.notFound().build();
        }

    }

}
