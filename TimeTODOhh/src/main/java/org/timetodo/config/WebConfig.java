package org.timetodo.config; // 패키지 이름을 적절히 바꿔주세요

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
//                .allowedOrigins("http://localhost:3000") //리액트랑 연동하려면 포트번호 3000으로 바꿔야됌, calendar 기능 사용해볼려고 임시로 바꿔뒀음!!!!!
                .allowedOriginPatterns("*")//모든 출처 허용 (개발과정에서만 사용할것!)
                .allowedMethods("GET", "POST", "PUT", "DELETE")
                .allowedHeaders("*")
                .allowCredentials(true);
    }
}