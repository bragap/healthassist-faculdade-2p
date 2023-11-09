package br.healthassist.healthassist.controller;

import br.healthassist.healthassist.service.ConsultaService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/consulta")
@RequiredArgsConstructor
public class ConsultaController {

    private final ConsultaService consultaService;



}
