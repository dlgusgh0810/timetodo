package org.timetodo.application; // 패키지 선언: TimeToDo 애플리케이션의 최상위 패키지 경로 설정

// Spring Boot의 주요 애너테이션을 임포트하여 애플리케이션 설정에 사용
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
/*
 * @SpringBootApplication 애너테이션은 다음 세 가지 애너테이션을 결합한 것입니다:
 * - @EnableAutoConfiguration: Spring Boot가 애플리케이션의 자동 설정을 수행하도록 함.
 * - @ComponentScan: 지정된 패키지와 하위 패키지를 스캔하여 @Component, @Service, @Controller 등을 찾아 등록.
 * - @Configuration: Spring 설정 클래스로 사용되며, 애플리케이션에 빈(Bean) 정의.
 */
@ComponentScan(basePackages = "org.timetodo")
/*
 * @ComponentScan 애너테이션은 스프링이 지정된 패키지와 그 하위 패키지에서
 * @Component, @Service, @Repository, @Controller 등의 애너테이션이 붙은 클래스를 스캔하도록 설정합니다.
 * basePackages = "org.timetodo"로 설정하여 org.timetodo 패키지 하위의 모든 클래스를 스캔합니다.
 */
@EntityScan(basePackages = "org.timetodo.model")
/*
 * @EntityScan 애너테이션은 JPA 엔티티(@Entity) 클래스들이 위치한 패키지를 스캔하도록 설정합니다.
 * basePackages = "org.timetodo.model"로 설정하여 org.timetodo.model 패키지 내의 엔티티 클래스를 스캔합니다.
 */
@EnableJpaRepositories(basePackages = "org.timetodo.repository")
/*
 * @EnableJpaRepositories 애너테이션은 JPA 리포지토리 인터페이스를 스캔하도록 설정합니다.
 * basePackages = "org.timetodo.repository"로 설정하여 org.timetodo.repository 패키지 내의 JPA 레포지토리 인터페이스들을 스캔하고 등록합니다.
 */
@org.timetodo.application.SpringBootTest(classes = TimeToDoApplication.class)
public class TimeToDoApplication {

	public static void main(String[] args) {
		/*
		 * main 메서드는 Spring Boot 애플리케이션의 진입점(Entry Point)입니다.
		 * SpringApplication.run() 메서드를 호출하여 Spring Boot 애플리케이션을 실행합니다.
		 * TimeToDoApplication.class를 인자로 전달하여 현재 클래스가 애플리케이션의 설정 정보로 사용됨을 명시합니다.
		 */
		SpringApplication.run(TimeToDoApplication.class, args);
	}

}
