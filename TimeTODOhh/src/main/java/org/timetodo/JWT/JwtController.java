/*
package org.timetodo.JWT;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequestMapping("/api/jwt")
@RequiredArgsConstructor
public class JwtController {

    private final JwtService jwtService;

    */
/**
     * JWT 생성용 엔드포인트
     * @param key JWT의 claim key
     * @param value JWT의 claim value
     * @return 생성된 JWT
     *//*

    @GetMapping("/create")
    public ResponseEntity<String> createJwt(
            @RequestParam String key,
            @RequestParam Long value) {
        try {
            // JWT 생성
            String token = jwtService.createToken(key, value);
            log.info("JWT 생성 성공: {}", token);

            return ResponseEntity.ok("Generated JWT: " + token);
        } catch (Exception e) {
            log.error("JWT 생성 중 오류 발생", e);
            return ResponseEntity.status(500).body("Error creating JWT");
        }
    }

}
*/
