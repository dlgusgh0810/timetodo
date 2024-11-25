package org.timetodo.controller;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.timetodo.dto.PreferencesDTO;
import org.timetodo.dto.PreferencesRequestDTO;
import org.timetodo.service.PreferencesService;

import java.util.Arrays;

@RestController
@RequestMapping("/api/preferences")
public class PreferencesController {

    @Autowired
    private PreferencesService preferencesService;

    // 쿠키에서 userId를 가져오는 메서드
    private Long getUserIdFromCookies(HttpServletRequest request) {
        Cookie userCookie = Arrays.stream(request.getCookies())
                .filter(cookie -> "userId".equals(cookie.getName()))
                .findAny()
                .orElse(null);
        if (userCookie == null) {
            throw new IllegalStateException("로그인되지 않은 사용자입니다.");
        }
        return Long.valueOf(userCookie.getValue());
    }

    // 유저 선호도 가져오기
    @GetMapping
    public ResponseEntity<PreferencesDTO> getPreferences(HttpServletRequest request) {
        try {
            Long userId = getUserIdFromCookies(request); // 쿠키에서 userId 추출
            PreferencesDTO preferences = preferencesService.getUserPreferences(userId);
            if (preferences != null) {
                return ResponseEntity.ok(preferences);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    // 테마 업데이트
    @PostMapping
    public ResponseEntity<Void> updateTheme(HttpServletRequest request, @RequestBody PreferencesRequestDTO requestDTO) {
        try {
            Long userId = getUserIdFromCookies(request); // 쿠키에서 userId 추출

            // 요청 DTO 유효성 검사
            if (requestDTO == null || requestDTO.getTheme() == null || requestDTO.getTheme().isEmpty()) {
                return ResponseEntity.badRequest().build();
            }

            // 서비스 메서드 호출
            preferencesService.updateUserTheme(userId, requestDTO);
            return ResponseEntity.ok().build();

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
