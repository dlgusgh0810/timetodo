package org.timetodo.ai;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;


@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/chat")
public class OpenAIController {

    @Autowired
    private final OpenAIService openAIService;

    /**
     * 자연어로 calendar, task 를 추가하는 챗봇기능
     * @param inputText 챗봇에게 입력하는 데이터
     * @param userId 프론트에서 @RequestParam 방식으로 userId 할당 필요
     */
    @PostMapping("/add")
    public ResponseEntity<String> inputChat(@RequestBody String inputText,
                                            @RequestParam Long userId) {
        log.info("Received input text: {}", inputText); // 요청 로그

        // OpenAI API로 자연어 일정을 분석하고 처리
        String responseMessage = openAIService.processChatInput(inputText, userId);

        return ResponseEntity.ok(responseMessage);
    }

    /**
     * 알림 설정 요청 처리
     */
    /*@PostMapping("/reminder")
    public ResponseEntity<String> setReminder(@RequestBody Map<String, Object> reminderInput,
                                              @RequestParam Long userId) {
        log.info("Received reminder input: {}", reminderInput);

        // 사용자가 입력한 알림 설정 데이터 처리
        try {
            String responseMessage = openAIService.processReminderInput(reminderInput, userId);
            return ResponseEntity.ok(responseMessage);
        } catch (Exception e) {
            log.error("Error while processing reminder: {}", e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("알림 설정 중 오류가 발생했습니다.");
        }
    }*/
}

