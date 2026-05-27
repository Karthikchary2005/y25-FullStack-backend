package kth.services;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import javax.crypto.SecretKey;

import org.springframework.stereotype.Service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

@Service
public class jwtService {

    private final String SECRET_KEY =
            "kthissuetrackerprojectsecretkeyjwtsecureauthentication123456";

    private final SecretKey key =
            Keys.hmacShaKeyFor(
                    SECRET_KEY.getBytes()
            );

    // GENERATE JWT
    public String generateJWT(

            Object email,

            Object role

    ) throws Exception {

        return Jwts.builder()

                .claim(
                        "email",
                        email
                )

                .claim(
                        "role",
                        role
                )

                .setIssuedAt(
                        new Date()
                )

                .setExpiration(

                        new Date(
                                System.currentTimeMillis()
                                        + 86400000
                        )
                )

                .signWith(
                        key,
                        SignatureAlgorithm.HS256
                )

                .compact();
    }

    // VALIDATE JWT
    public Map<String, Object> validateJWT(
            String token
    ) throws Exception {

        Claims claims =
                Jwts.parserBuilder()

                        .setSigningKey(key)

                        .build()

                        .parseClaimsJws(token)

                        .getBody();

        Date expiration =
                claims.getExpiration();

        if(

                expiration == null ||

                expiration.before(
                        new Date()
                )

        ) {

            throw new Exception(
                    "Token Expired"
            );
        }

        Map<String, Object> payload =
                new HashMap<>();

        payload.put(

                "email",

                claims.get("email")
        );

        payload.put(

                "role",

                claims.get("role")
        );

        return payload;
    }
}