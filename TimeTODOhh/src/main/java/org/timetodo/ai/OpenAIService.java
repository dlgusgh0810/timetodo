package org.timetodo.ai;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.json.JSONObject;
import org.timetodo.ai.log.LogService;
import org.timetodo.dto.CalendarRequestDto;
import org.timetodo.dto.ReminderRequestDto;
import org.timetodo.dto.TaskRequestDto;
import org.timetodo.entity.CalendarEntity;
import org.timetodo.entity.CategoryEntity;
import org.timetodo.entity.TaskEntity;
import org.timetodo.service.CalendarService;
import org.timetodo.service.CategoryService;
import org.timetodo.service.ReminderService;
import org.timetodo.service.TaskService;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@Slf4j
@Service
public class OpenAIService { //사용자 입력 파실 및 처리

    @Autowired
    private CalendarService calendarService;

    @Autowired
    private TaskService taskService;

    @Autowired
    private ReminderService reminderService;

    @Autowired
    private CategoryService categoryService;

    @Autowired
    private LogService logService;

    @Value("${openai.api.key}") // application.properties 파일에서 API 키를 가져옵니다
    private String apiKey;

    /**
     * 사용자의 자연어 입력을 처리하는 메서드
     * @param userInput 사용자가 입력한 텍스트
     * @param userId 사용자 고유 ID
     * @return 처리 결과 메시지
     */
    public String processChatInput(String userInput, Long userId) {
        log.info("User input: {}", userInput);

        // OpenAI API 호출
        String openAIResponse = callOpenAIAPI(userInput);
        log.info("OpenAI response: {}", openAIResponse);

        String resultMessage = "";

        try {
            // OpenAI 응답 파싱 : 응답 데이터를 리스트 형태로 변환
            List<Map<String, Object>> responseList = parseResponse(openAIResponse);

            // 파싱된 데이터를 순회하며 적절한 서비스로 처리
            for (Map<String, Object> item : responseList) {
                String type = safeGet(item, "type", "unknown");
                log.info("파싱 데이터 타입 : Parsed type: {}", type); // 디버깅 로그 추가
                switch (type) {
                    case "calendar":
                        log.info("calendar로 파싱");
                        handleCalendar(item, userId);
                        break;
                    case "task":
                        log.info("task로 파싱");
                        handleTask(item, userId);
                        break;
                    case "reminder":
                        log.info("reminder로 파싱");
                        handleReminder(item, userId);
                        break;
                    default: //알 수 없는 데이터 타입일 경우
                        log.warn(" 알 수 없는 데이터 타입으로 파싱됨 : Unhandled type: {}", type);
                        log.debug("디버깅용 전체 데이터 출력, Unhandled item: {}", item); // 디버깅용 전체 데이터 출력
                        break;
                }
            }

            resultMessage = "요청이 성공적으로 처리되었습니다.";
        } catch (Exception e) {
            log.error("Error processing input", e);
            resultMessage = "처리 중 오류가 발생했습니다.";
        }

        // 처리 결과 로그 저장
        logService.saveLog(userId, userInput, openAIResponse, resultMessage);

        return resultMessage;
    }


    /**
     * OpenAI API를 호출하는 메서드 (예제 JSON 응답 포함)
     * @param input 사용자 입력
     * @return OpenAI 응답 (JSON 형식)
     */
    private String callOpenAIAPI(String input) {
        // RestTemplate 객체 생성
        RestTemplate restTemplate = new RestTemplate();

        // OpenAI API 엔드포인트
        String url = "https://api.openai.com/v1/chat/completions"; // GPT 모델 사용 시

        // HTTP 헤더 설정
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setBearerAuth(apiKey); // @Value("${openai.api.key}")로 가져온 API 키 사용

        // 요청 데이터 작성
        JSONObject requestBody = new JSONObject();
        requestBody.put("model", "gpt-3.5-turbo"); // OpenAI의 GPT 모델
        requestBody.put("messages", List.of(
                Map.of("role", "system", "content",
                        "사용자의 요청을 JSON으로 처리하세요. 아래와 같은 구조를 따르십시오: " +
                                "{ \"type\": \"calendar\", \"title\": \"\", \"date\": \"YYYY-MM-DD\", \"start_time\": \"HH:MM\", \"end_time\": \"HH:MM\" }." +
                                " start_time과 end_time을 반드시 포함하세요. start_time 이후 1시간 뒤를 기본 end_time으로 설정할 수 있습니다."),
                Map.of("role", "user", "content", input)
        ));
        requestBody.put("max_tokens", 150); // 응답 최대 토큰 수
        requestBody.put("temperature", 0.7); // 응답 다양성 제어

        // HTTP 요청 생성
        HttpEntity<String> request = new HttpEntity<>(requestBody.toString(), headers);

        try {
            // API 호출
            ResponseEntity<String> response = restTemplate.postForEntity(url, request, String.class);

            // 성공 시 응답 본문 반환
            return response.getBody();
        } catch (Exception e) {
            // 예외 처리
            log.error("OpenAI API 호출 중 오류 발생", e);
            throw new RuntimeException("OpenAI API 호출 실패", e);
        }
    }

    /**
     * OpenAI 응답 데이터를 파싱하여 Map 형태로 변환.
     * @param response OpenAI 응답 (JSON 문자열)
     * @return key-value 형태로 변환된 데이터 리스트
     */
    private List<Map<String, Object>> parseResponse(String response) {
        ObjectMapper mapper = new ObjectMapper();
        try {
            JsonNode rootNode = mapper.readTree(response); // 응답을 JSON 트리로 파싱

            JsonNode choicesNode = rootNode.path("choices"); // OpenAI 응답에서 choices 배열 추출

            if (!choicesNode.isArray() || choicesNode.isEmpty()) {
                log.error("OpenAI 응답이 비어 있음: {}", response);
                throw new RuntimeException("OpenAI 응답이 비어있습니다.");
            }

            // message.content를 추출
            String content = choicesNode.get(0).path("message").path("content").asText();
            log.info("추출된 content: {}", content);

            // content가 JSON 배열인지 JSON 객체인지 판별
            JsonNode contentNode = mapper.readTree(content); // JSON 문자열로부터 트리 노드 생성
            if (contentNode.isArray()) {
                // JSON 배열이면 리스트로 변환
                return mapper.convertValue(contentNode, new TypeReference<List<Map<String, Object>>>() {});
            }else if (contentNode.isObject()){
                // 단일 JSON 객체일 경우 리스트로 래핑
                Map<String, Object> singleResult = mapper.convertValue(contentNode, new TypeReference<Map<String, Object>>() {});
                return List.of(singleResult);
            }else {
                throw new RuntimeException("응답 파싱 실패: 예상치 못한 데이터 구조입니다.");
            }
        } catch (Exception e) {
            log.error("응답 파싱 실패: {}", response, e);
            throw new RuntimeException("응답 파싱 실패: " + e.getMessage(), e);
        }
    }

    /**
     * 안전하게 Map 데이터에서 값을 가져오는 헬퍼 메서드.
     */
    private String safeGet(Map<String, Object> data, String key, String defaultValue) {
        return data.containsKey(key) ? (String) data.get(key) : defaultValue;
    }

    /**
     * 안전하게 Map 데이터에서 LocalDateTime을 파싱하는 헬퍼 메서드.
     */
    private LocalDateTime safeParseDateTime(Map<String, Object> data, String key) {
        String value = safeGet(data, key, null);
        try {
            return value != null ? LocalDateTime.parse(value) : null;
        } catch (Exception e) {
            log.warn("Invalid date format for key {}: {}", key, value);
            return null;
        }
    }


    /**
     * 일정 데이터를 처리하고 저장하는 메서드
     * @param data 파싱된 일정 데이터
     * @param userId 사용자 고유 ID
     * @return 처리 결과 메시지
     */
    private void handleCalendar(Map<String, Object> data, Long userId) {
        try {
            CalendarRequestDto requestDto = new CalendarRequestDto();
            requestDto.setTitle(safeGet(data, "title", "제목 없음"));
            requestDto.setDescription(safeGet(data, "description", "설명이 없습니다."));

            LocalDateTime startTime = safeParseDateTime(data, "startTime");
            LocalDateTime endTime = safeParseDateTime(data, "endTime");

            // 기본 endTime 설정
            if (endTime == null && startTime != null) {
                endTime = startTime.plusHours(1); // 기본으로 시작 시간의 1시간 뒤
            }

            requestDto.setStartTime(startTime);
            requestDto.setEndTime(endTime);

            requestDto.setLocation(safeGet(data, "location", "위치 정보 없음"));
            requestDto.setRepeatType(safeGet(data, "repeatType", "NONE"));

            log.info("handleCalendar > CalendarRequestDto: {}", requestDto);

            calendarService.addCalendar(requestDto, userId);
        } catch (Exception e) {
            log.error("handleCalendar 처리 중 오류 발생: {}", data, e);
            throw new RuntimeException("일정 처리 중 오류가 발생했습니다.", e);
        }
    }


    /**
     * 할 일 데이터를 처리하고 저장하는 메서드
     * @param data 파싱된 할 일 데이터
     * @param userId 사용자 고유 ID
     * @return 처리 결과 메시지
     */
    private void handleTask(Map<String, Object> data, Long userId) {
        try {
            TaskRequestDto requestDto = new TaskRequestDto();
            requestDto.setTitle(safeGet(data, "title", "제목 없음"));
            requestDto.setDueDate(safeParseDateTime(data, "dueDate"));
            requestDto.setPriority(safeGet(data, "priority", "LOW"));
            requestDto.setStatus(safeGet(data, "status", "PENDING"));
            requestDto.setRepeatType(safeGet(data, "repeatType", "NONE"));

            log.info("handleTask > TaskRequestDto: {}", requestDto);

            taskService.addTask(requestDto, userId);
        } catch (Exception e) {
            log.error("handleTask 처리 중 오류 발생: {}", data, e);
            throw new RuntimeException("할 일 처리 중 오류가 발생했습니다.", e);
        }
    }


    /**
     * 알림 데이터를 처리하고 저장하는 메서드
     * @param data 파싱된 알림 데이터
     * @param userId 사용자 고유 ID
     * @return 처리 결과 메시지
     */
    private void handleReminder(Map<String, Object> data, Long userId) {
        try {
            ReminderRequestDto requestDto = new ReminderRequestDto();
            requestDto.setNotificationsEnabled(Boolean.parseBoolean(safeGet(data, "notificationsEnabled", "false")));
            requestDto.setTimeBefore(Integer.parseInt(safeGet(data, "timeBefore", "10")));
            requestDto.setRepeats(Boolean.parseBoolean(safeGet(data, "repeats", "false")));

            if (data.containsKey("calendarId")) {
                reminderService.createCalendarReminder(requestDto, Long.parseLong(safeGet(data, "calendarId", "0")));
            } else if (data.containsKey("taskId")) {
                reminderService.createTaskReminder(requestDto, Long.parseLong(safeGet(data, "taskId", "0")));
            } else {
                log.warn("Reminder 처리 중 CalendarId와 TaskId가 없음");
            }
        } catch (Exception e) {
            log.error("handleReminder 처리 중 오류 발생: {}", data, e);
            throw new RuntimeException("알림 처리 중 오류가 발생했습니다.", e);
        }
    }

}
