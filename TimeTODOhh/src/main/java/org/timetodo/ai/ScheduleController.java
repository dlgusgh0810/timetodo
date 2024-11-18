package org.timetodo.ai;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.json.JSONObject;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/schedule")
public class ScheduleController {

    private final OpenAIService openAIService;
    private final ScheduleService scheduleService;

    @PostMapping("/add")
    public ResponseEntity<String> addSchedule(@RequestBody String inputText) {
        // OpenAI API로 자연어 일정을 분석
        String aiResponse = openAIService.analyzeSchedule(inputText);

        // AI 응답(JSON)을 파싱하여 일정 정보를 추출
        JSONObject responseJson = new JSONObject(aiResponse);
        String title = responseJson.getString("title");
        String date = responseJson.getString("date");
        String time = responseJson.getString("time");

        // 추출한 일정 정보를 DB에 저장
        /*Schedule newSchedule = new Schedule(title, date, time);
        scheduleService.save(newSchedule);*/

        return ResponseEntity.ok("일정이 추가되었습니다.");
    }

}
