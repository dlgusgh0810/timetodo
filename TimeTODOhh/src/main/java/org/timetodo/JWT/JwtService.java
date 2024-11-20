package org.timetodo.JWT;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.Claims;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
public class JwtService {

    private final String secretKey = "your_secret_key"; // 반드시 안전하게 보관해야 함

    public String createToken(String key, Long value) {
        return Jwts.builder()
                .setSubject("ReminderApp")
                .claim(key, value)
                .signWith(SignatureAlgorithm.HS256, secretKey)
                .compact();
    }

    public Long extractId(String token, String key) {
        Claims claims = Jwts.parserBuilder()
                .setSigningKey(secretKey)
                .build()
                .parseClaimsJws(token.replace("Bearer ", ""))
                .getBody();

        return claims.get(key, Long.class);
    }


}
