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
     * 클라이언트 입력 -> OpenAIAPI_SelectProcessing 에서 ai가 구분 ->
     *     1. 일정 || 할일 || 알림생성 의 경우에는 callOpenAIAPI -> processChatInput -> handleCalendar or handleTask 로 DB에 저장
     *     2. 알림(알람)일 경우에는 OpenAIAPI_SelectProcessing 에서 handleReminderSelectionFlow 을 실행해서 사용자에게 선택지 출력
     *         -> 사용자가 선택지를 보고 입력 -> 다시 OpenAIAPI_SelectProcessing 메소드에서 알림 리스트를 만드는건지 알림을 추가하는건지
     *         구분해서 알림추가인걸로 확인 후 -> callOpenAIAPI -> processChatInput -> handleReminder 로 DB에 저장
     * @param inputText 챗봇에게 입력하는 데이터
     * @param userId 프론트에서 @RequestParam 방식으로 userId 할당 필요
     */
    @PostMapping("/add")
    public ResponseEntity<String> inputChat(@RequestBody String inputText,
                                            @RequestParam Long userId) {
        try{
            log.info("input text: {}", inputText); // 요청 로그
            return ResponseEntity.ok(openAIService.OpenAIAPI_SelectProcessing(inputText, userId));
        }catch (Exception e){
            log.error("컨트롤러 에러 : Error processing inputChat request", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("오류가 발생했습니다.");
        }
    }

    /*private ResponseEntity<String> redirectChat(@RequestBody String inputText,
                                            @RequestParam Long userId) {
        try{
            log.info("redirect text: {}", inputText); // 요청 로그
            return ResponseEntity.ok(openAIService.processChatInput(inputText, userId));
        }catch (Exception e){
            log.error("컨트롤러 에러 : Error processing redirectChat request", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("오류가 발생했습니다.");
        }

    }*/

    /*@GetMapping("/selection")
    public ResponseEntity<String> getReminderSelection(@RequestParam Long userId) {
        try {
            String response = openAIService.handleReminderSelectionFlow(null, userId);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error fetching reminders");
        }
    }*/

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

