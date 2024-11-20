/*
package org.timetodo.JWT;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.security.Key;

@Slf4j
@Service
public class JwtService {

    */
/*//*
/ Base64로 인코딩된 Secret Key
    private static final String SECRET_KEY_BASE64 = "+wv10vNSjtrW+vsr0NOs3tICLE41mYwyr/71sD0vCgg="; // 여기에 고정된 키를 입력
    private static final SecretKey SECRET_KEY = new SecretKeySpec(
            Base64.getDecoder().decode(SECRET_KEY_BASE64),
            SignatureAlgorithm.HS256.getJcaName()
    );*//*


    private final Key key;

    public JwtService(@Value("${jwt.secret}") String secretKey) {
        byte[] keyBytes = Decoders.BASE64.decode(secretKey);
        this.key = Keys.hmacShaKeyFor(keyBytes);
        log.info("JwtService 디버깅 , Loaded JWT secret key: {}", secretKey);
    }

    public String createToken(String claimKey, Long claimValue) {
        return Jwts.builder()
                .setSubject("ReminderApp")
                .claim(claimKey, claimValue)
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();
    }

    public Long extractId(String token, String claimKey) {
        try {
            Claims claims = Jwts.parserBuilder()
                    .setSigningKey(key)
                    .build()
                    .parseClaimsJws(token.replace("Bearer ", ""))
                    .getBody();
            log.info("Token received: {}", token);
            return claims.get(claimKey, Long.class);
        } catch (Exception e) {
            log.error("JWT 디코딩 실패: {}", e.getMessage());
            throw new RuntimeException("유효하지 않은 JWT");
        }
    }


}
*/
