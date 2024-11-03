package org.timetodo.application;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@ComponentScan(basePackages = "org.timetodo") // 전체 패키지를 스캔
@EntityScan(basePackages = "org.timetodo.entity") // 엔티티 패키지 스캔
@EnableJpaRepositories(basePackages = "org.timetodo.repository")  // Repository 패키지 지정
@SpringBootApplication
public class TimeToDoApplication {

	public static void main(String[] args) {
		SpringApplication.run(TimeToDoApplication.class, args);
	}

}

