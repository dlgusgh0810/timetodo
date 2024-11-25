package org.timetodo.ai;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/chat")
public class OpenAIController {

    @Autowired
    private final OpenAIService openAIService;


    //자연어로 일정을 처리
    @PostMapping("/add")
    public ResponseEntity<String> inputChat(@RequestBody String inputText,
                                            @RequestParam Long userId) {
        log.info("Received input text: {}", inputText); // 요청 로그

        // OpenAI API로 자연어 일정을 분석하고 처리
        String responseMessage = openAIService.processChatInput(inputText, userId);

        return ResponseEntity.ok(responseMessage);
    }
}

/*
이 코드가 하는 일
OpenAIService를 호출하여 자연어로 입력된 일정을 해석합니다.
응답(JSON)을 파싱하여 필요한 데이터(예: 제목, 날짜, 시간)를 추출합니다.
추출된 데이터를 Schedule 객체로 변환하여 DB에 저장합니다.
 */