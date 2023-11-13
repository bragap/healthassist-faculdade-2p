package br.healthassist.healthassist;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.servlet.config.annotation.CorsRegistry;

@SpringBootApplication
public class HealthassistApplication {

	public void corsMappings(CorsRegistry registry){
		registry.addMapping("/**").allowedMethods("GET", "POST", "PUT");
	}

	public static void main(String[] args) {
		SpringApplication.run(HealthassistApplication.class, args);
	}

}
