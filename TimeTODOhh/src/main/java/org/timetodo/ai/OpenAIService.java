package org.timetodo.ai;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.json.JSONArray;
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
import org.timetodo.entity.TaskEntity;
import org.timetodo.service.CalendarService;
import org.timetodo.service.CategoryService;
import org.timetodo.service.ReminderService;
import org.timetodo.service.TaskService;

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
     * OpenAI API를 호출해 사용자의 입력을 다음 네 가지로 분류하는 메서드
     * @param userInput
     */
    public String OpenAIAPI_SelectProcessing(String userInput, Long id) {
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
                        "너는 사용자의 입력을 다음 네 가지로 분류하는 시스템이야:\\n\\n" +
                                "1. 새로운 일정(Calendar)을 추가하는 내용.\n" +
                                "2. 새로운 할일(Task)을 추가하는 내용.\n" +
                                "3. 단순히 알람(Alarm)을 추가하는 내용.\n" +
                                "4. 일정(Calendar)이나 할일(Task)에 대한 알림(Reminder)을 추가하는 내용.\n\n" +
                                "위 입력을 네 가지 중 하나로 정확히 분류해서 다음 값 중 하나로만 응답해:\n" +
                                "- \"calendar\": 일정(Calendar)\n" +
                                "- \"task\": 할일(Task)\n" +
                                "- \"alarm\": 단순 알람\n" +
                                "- \"selectionData\": 일정이나 할일에 대한 알림"
                ),
                Map.of("role", "user", "content", userInput)
        ));
        requestBody.put("max_tokens", 150); // 응답 최대 토큰 수
        requestBody.put("temperature", 0.7); // 응답 다양성 제어

        String response = "";
        // API 호출 및 응답 처리
        try {
            HttpEntity<String> request = new HttpEntity<>(requestBody.toString(), headers);
            ResponseEntity<String> responseEntity = restTemplate.postForEntity(url, request, String.class);

            // 응답 파싱
            JSONObject responseJson = new JSONObject(responseEntity.getBody());
            JSONArray choices = responseJson.getJSONArray("choices");
            String content = choices.getJSONObject(0).getJSONObject("message").getString("content").trim();

            if (content.contains("calendar") || content.contains("task") || content.contains("selectionData")) {
                response = processChatInput(userInput,id);
                return response;
            } else if (content.contains("alarm")) {
                response = handleReminderSelectionFlow(userInput,id);
                return response;
            }
        } catch (Exception e) {
            // 에러 발생 시 로깅 및 기본 응답
            log.error(e.getMessage());
            return ("OpenAIAPI_SelectProcessing 실행 실패");
        }
        return response;
    }


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
     * OpenAI API를 호출해서 자료형 파싱하는 메서드
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
                        "사용자의 요청을 JSON으로 처리하세요. 마지막 항목 뒤에 쉼표를 포함하지 마세요. 아래와 같은 구조를 따르십시오:\n" +

                                "- `calendar` 요청의 경우:\n" +
                                "{\n" +
                                "    \"type\": \"calendar\",\n" +
                                "    \"title\": \"\",\n" +
                                "    \"description\": \"\",\n" +
                                "    \"location\": \"\",\n" +
                                "    \"repeatType\": \"\",\n" +
                                "    \"startTime\": \"\",\n" +
                                "    \"endTime\": \"\"\n" +
                                "}\n" +
                                "  * `title`, `description`, `location`, `repeatType`, `startTime`, `endTime`를 반드시 포함하세요.\n" +
                                "  * `repeatType`은 NONE, DAILY, WEEKLY, MONTHLY, YEARLY 중 하나로 설정하세요.\n" +
                                "  * `startTime`과 `endTime`은 ISO 8601 LocalDateTime 형식(`yyyy-MM-dd'T'HH:mm:ss`)으로 반환하세요.\n" +

                                "- `task` 요청의 경우:\n" +
                                "{\n" +
                                "    \"type\": \"task\",\n" +
                                "    \"title\": \"\",\n" +
                                "    \"dueDate\": \"\",\n" +
                                "    \"priority\": \"\",\n" +
                                "    \"status\": \"\",\n" +
                                "    \"repeatType\": \"\"\n" +
                                "}\n" +
                                "  * `title`, `dueDate`, `priority`, `status`, `repeatType`를 반드시 포함하세요.\n" +
                                "  * `dueDate`는 ISO 8601 LocalDateTime 형식(`yyyy-MM-dd'T'HH:mm:ss`)으로 반환하세요.\n" +
                                "  * `priority`는 LOW, MEDIUM, HIGH 중 하나로 설정하세요.\n" +
                                "  * `status`는 PENDING, IN_PROGRESS, DONE 중 하나로 설정하세요.\n" +
                                "  * `repeatType`은 NONE, DAILY, WEEKLY, MONTHLY, YEARLY 중 하나로 설정하세요.\n" +

                                "- `reminder` 요청의 경우:\n" +
                                "{\n" +
                                "    \"type\": \"reminder\",\n" +
                                "    \"id\": \"1\",\n" +
                                "    \"detailsType\": \"task\",\n" +
                                "    \"notificationsEnabled\": true,\n" +
                                "    \"timeBefore\": 10,\n" +
                                "    \"repeats\": false\n" +
                                "}\n" +
                                "  * `id`는 번호를 의미하는 값으로 반환하세요.\n" +
                                "  * `detailsType`는 일정이라는 단어가 있을경우 calendar 로 반환하고, 할일이라는 단어가 있을경우 task 로 반환하세요.\n" +
                                "  * `notificationsEnabled`는 boolean(true/false) 값으로 반환하세요.\n" +
                                "  * `timeBefore`는 정수 값(분 단위)으로 반환하세요.\n" +
                                "  * `repeats`는 boolean(true/false) 값으로 반환하세요.\n" +
                                "사용자가 알림 설정을 요청할 경우 `reminder` 타입(type)으로 처리하고, 필요한 필드 값을 포함하여 응답하세요." +

                                "모든 JSON은 잘 구성된 형식으로 반환해야 하며, 마지막 항목 뒤에 쉼표를 포함하지 마세요."
                ),
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
            // 응답 정제
            String sanitizedResponse = sanitizeJson(response);

            JsonNode rootNode = mapper.readTree(sanitizedResponse); // 응답을 JSON 트리로 파싱
            JsonNode choicesNode = rootNode.path("choices"); // OpenAI 응답에서 choices 배열 추출

            if (!choicesNode.isArray() || choicesNode.isEmpty()) {
                log.error("OpenAI 응답이 비어 있음: {}", response);
                throw new RuntimeException("OpenAI 응답이 비어있습니다.");
            }

            // message.content를 추출
            String content = choicesNode.get(0).path("message").path("content").asText();
            log.info("추출된 content: {}", content);

            // content가 JSON 배열인지 JSON 객체인지 판별
            JsonNode contentNode = mapper.readTree(sanitizeJson(content)); // 정제 후 파싱, JSON 문자열로부터 트리 노드 생성
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
        if (!data.containsKey(key)) {
            return defaultValue;
        }

        Object value = data.get(key);
        if (value instanceof String) {
            return (String) value;
        } else if (value instanceof Boolean) {
            return Boolean.toString((Boolean) value);
        } else if (value instanceof Number) {
            return String.valueOf(value);
        }

        return defaultValue; // 처리할 수 없는 타입인 경우 기본값 반환
    }

    /**
     * 마지막 쉼표 제거 메서드
     * @param json
     */
    private String sanitizeJson(String json) {
        // 마지막 쉼표 제거 로직
        return json.replaceAll(",\\s*}", "}").replaceAll(",\\s*]", "]");
    }

    /**
     * Calendar와 Task를 가시성 좋게 불러오는 메서드
     * @param data
     * @param userId
     */
    public String handleReminderSelectionFlow(String data, Long userId) {
        try {
            // 사용자에게 제공할 Task 및 Calendar 목록 조회
            List<TaskEntity> tasks = taskService.getTasksByUserId(userId);
            List<CalendarEntity> calendars = calendarService.getCalendarsByUserId(userId);

            // 보기 쉽게 포맷된 문자열 생성
            StringBuilder response = new StringBuilder();

            // Calendar 목록 추가
            response.append("일정(Calendar)\n");
            if (calendars.isEmpty()) {
                response.append("  - 등록된 일정이 없습니다.\n");
            } else {
                calendars.forEach(calendar ->
                        response.append(String.format("  %d번 일정: %s\n",
                                calendar.getCalendarId(), calendar.getTitle()))
                );
            }

            // Task 목록 추가
            response.append("\n할일(Task)\n");
            if (tasks.isEmpty()) {
                response.append("  - 등록된 할일이 없습니다.\n");
            } else {
                tasks.forEach(task ->
                        response.append(String.format("  %d번 할일: %s\n",
                                task.getTaskId(), task.getTitle()))
                );
            }

            log.info("Returning formatted Task and Calendar list for user {}: {}", userId, response);

            return response.toString();
        } catch (Exception e) {
            log.error("Error handling reminder selection flow: {}", data, e);
            throw new RuntimeException("리마인더 목록 처리 중 오류가 발생했습니다.");
        }
    }

    /**
     * Reminder 데이터를 처리하고 저장하는 메서드
     * @param selectionData 파싱된 Reminder 데이터
     * @param userId 사용자 고유 ID
     * @return 처리 결과 메시지
     */
    public String handleReminder(Map<String, Object> selectionData, Long userId) {
        try {
            // 선택 데이터 파싱
            String type = safeGet(selectionData, "detailsType", "unknown"); // task or calendar
            Long id = Long.parseLong(safeGet(selectionData, "id", "0")); // 선택한 ID
            boolean notificationsEnabled = Boolean.parseBoolean(safeGet(selectionData, "notificationsEnabled", "true"));
            int timeBefore = Integer.parseInt(safeGet(selectionData, "timeBefore", "10"));
            boolean repeats = Boolean.parseBoolean(safeGet(selectionData, "repeats", "false"));

            // 알림 DTO 생성
            ReminderRequestDto reminderRequestDto = new ReminderRequestDto();
            reminderRequestDto.setNotificationsEnabled(notificationsEnabled);
            reminderRequestDto.setTimeBefore(timeBefore);
            reminderRequestDto.setRepeats(repeats);

            // Task 또는 Calendar에 대한 알림 생성
            if ("task".equalsIgnoreCase(type)) {
                reminderService.createTaskReminder(reminderRequestDto, id);
                log.info("Reminder created for Task ID: {}", id);
            } else if ("calendar".equalsIgnoreCase(type)) {
                reminderService.createCalendarReminder(reminderRequestDto, id);
                log.info("Reminder created for Calendar ID: {}", id);
            } else {
                throw new IllegalArgumentException("Invalid selection type: " + type);
            }

            return "알림이 성공적으로 생성되었습니다.";
        } catch (Exception e) {
            log.error("Error processing reminder selection: {}", selectionData, e);
            throw new RuntimeException("알림 생성 중 오류가 발생했습니다.");
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
            requestDto.setLocation(safeGet(data, "location", "위치 정보 없음"));
            requestDto.setRepeatType(safeGet(data, "repeatType", "NONE"));

            // 문자열에서 LocalDateTime으로 변환
            String startTimeStr = (String) data.get("startTime"); // JSON에서 문자열로 가져오기
            String endTimeStr = (String) data.get("endTime");

            // LocalDateTime 변환
            LocalDateTime startTime = LocalDateTime.parse(startTimeStr); // 변환
            LocalDateTime endTime = LocalDateTime.parse(endTimeStr);

            if (endTime == null) {
                endTime = startTime.plusHours(1); // 기본으로 시작 시간의 1시간 뒤
            }

            requestDto.setStartTime(startTime);
            requestDto.setEndTime(endTime);

            log.info("로그, handleCalendar > CalendarRequestDto: {}", requestDto);

            calendarService.addCalendar(requestDto, userId, null);
        } catch (Exception e) {
            log.error("handleCalendar 처리 중 오류 발생: {}", data, e);
            throw new RuntimeException("일정 처리 중 오류가 발생했습니다.", e);
        }
    }


    /**
     * 할 일 데이터를 처리하고 저장하는 메서드
     * @param data 파싱된 할 일 데이터
     * @param userId 사용자 고유 ID
     */
    private void handleTask(Map<String, Object> data, Long userId) {
        try {
            TaskRequestDto requestDto = new TaskRequestDto();

            // 필수 데이터 매핑
            requestDto.setTitle(safeGet(data, "title", "제목 없음"));
            requestDto.setPriority(safeGet(data, "priority", "LOW"));
            requestDto.setStatus(safeGet(data, "status", "PENDING"));
            requestDto.setRepeatType(safeGet(data, "repeatType", "NONE"));

            // dueDate(LocalDateTime) 파싱
            String dueDateStr = (String) data.get("dueDate");
            LocalDateTime dueDate = LocalDateTime.parse(dueDateStr);
            requestDto.setDueDate(dueDate);

            log.info("로그 , handleTask > TaskRequestDto: {}", requestDto);

            // Task 생성
            taskService.addTask(requestDto, userId);
        } catch (Exception e) {
            log.error("handleTask 처리 중 오류 발생: {}", data, e);
            throw new RuntimeException("할 일 처리 중 오류가 발생했습니다.", e);
        }
    }


    /**
     * 알림 데이터를 처리하는 메서드
     */
    /*private void handleReminderProcess(Map<String, Object> data, Long userId) {
        try {
            // Step 1: 사용자에게 선택 가능한 Task와 Calendar 목록 제공
            List<TaskEntity> tasks = taskService.getTasksByUserId(userId);
            List<CalendarEntity> calendars = calendarService.getCalendarsByUserId(userId);

            // Task와 Calendar를 Map 형식으로 변환
            List<Map<String, Object>> taskList = tasks.stream()
                    .map(task -> {
                        Map<String, Object> map = new HashMap<>();
                        map.put("id", task.getTaskId());
                        map.put("title", task.getTitle());
                        map.put("dueDate", task.getDueDate());
                        return map;
                    })
                    .collect(Collectors.toList());

            List<Map<String, Object>> calendarList = calendars.stream()
                    .map(calendar -> {
                        Map<String, Object> map = new HashMap<>();
                        map.put("id", calendar.getCalendarId());
                        map.put("title", calendar.getTitle());
                        map.put("startTime", calendar.getStartTime());
                        map.put("endTime", calendar.getEndTime());
                        return map;
                    })
                    .collect(Collectors.toList());

            log.info("사용자 {}의 Task와 Calendar 리스트 제공: tasks={}, calendars={}", userId, taskList, calendarList);

            // 사용자 선택 처리: 현재는 요청에 이미 `id`와 `type`이 포함되어 있다고 가정
            String type = safeGet(data, "type", "unknown");
            Long id = Long.parseLong(safeGet(data, "id", "0"));

            boolean notificationsEnabled = Boolean.parseBoolean(safeGet(data, "notificationsEnabled", "false"));
            int timeBefore = Integer.parseInt(safeGet(data, "timeBefore", "10"));
            boolean repeats = Boolean.parseBoolean(safeGet(data, "repeats", "false"));

            // Step 2: 알림 생성
            ReminderRequestDto reminderRequestDto = new ReminderRequestDto();
            reminderRequestDto.setNotificationsEnabled(notificationsEnabled);
            reminderRequestDto.setTimeBefore(timeBefore);
            reminderRequestDto.setRepeats(repeats);

            if ("task".equalsIgnoreCase(type)) {
                reminderService.createTaskReminder(reminderRequestDto, id);
                log.info("Reminder successfully created for Task ID: {}", id);
            } else if ("calendar".equalsIgnoreCase(type)) {
                reminderService.createCalendarReminder(reminderRequestDto, id);
                log.info("Reminder successfully created for Calendar ID: {}", id);
            } else {
                throw new IllegalArgumentException("Invalid type: " + type);
            }

        } catch (Exception e) {
            log.error("Error while processing reminder input: {}", data, e);
            throw new RuntimeException("알림 처리 중 오류가 발생했습니다.");
        }
    }*/

    /**
     * 사용자가 선택한 데이터를 기반으로 알림을 저장
     * @param reminderInput
     * @param userId
     */
    /*
    public String processReminderInput(Map<String, Object> reminderInput, Long userId) {
        log.info("Processing reminder input: {}", reminderInput);

        try {
            // 입력 값 파싱
            String type = reminderInput.get("type").toString(); // "task" 또는 "calendar"
            Long entityId = Long.parseLong(reminderInput.get("id").toString()); // Task 또는 Calendar의 ID
            boolean notificationsEnabled = Boolean.parseBoolean(reminderInput.get("notificationsEnabled").toString());
            int timeBefore = Integer.parseInt(reminderInput.get("timeBefore").toString());
            boolean repeats = Boolean.parseBoolean(reminderInput.get("repeats").toString());

            // ReminderRequestDto 생성
            ReminderRequestDto reminderRequestDto = new ReminderRequestDto();
            reminderRequestDto.setNotificationsEnabled(notificationsEnabled);
            reminderRequestDto.setTimeBefore(timeBefore);
            reminderRequestDto.setRepeats(repeats);

            // Task 또는 Calendar에 따라 알림 생성
            if ("task".equalsIgnoreCase(type)) {
                reminderService.createTaskReminder(reminderRequestDto, entityId);
                log.info("Reminder created for Task ID: {}", entityId);
            } else if ("calendar".equalsIgnoreCase(type)) {
                reminderService.createCalendarReminder(reminderRequestDto, entityId);
                log.info("Reminder created for Calendar ID: {}", entityId);
            } else {
                throw new IllegalArgumentException("Invalid type: " + type);
            }

            return "알림이 성공적으로 생성되었습니다.";
        } catch (Exception e) {
            log.error("Error while processing reminder input: {}", reminderInput, e);
            throw new RuntimeException("알림 처리 중 오류가 발생했습니다.");
        }
    }*/

    /**
     * 알림 데이터를 처리하고 저장하는 메서드
     * handleReminderCreation , getTaskAndCalendarSelectionList , mapUserSelectionToId 메서드 통합 플로우
     * @param reminderData
     * @param userId
     */
    /*public void processReminderRequest(Map<String, Object> reminderData, Long userId) {
        log.info("Received reminder data: {}", reminderData);

        // Step 1: 알림 데이터 매핑
        ReminderRequestDto requestDto = new ReminderRequestDto();
        requestDto.setNotificationsEnabled(Boolean.parseBoolean(safeGet(reminderData, "notificationsEnabled", "false")));
        requestDto.setTimeBefore(Integer.parseInt(safeGet(reminderData, "timeBefore", "10")));
        requestDto.setRepeats(Boolean.parseBoolean(safeGet(reminderData, "repeats", "false")));

        // Step 2: Task 또는 Calendar 선택 처리
        if (reminderData.containsKey("taskId")) {
            Long taskId = Long.parseLong(safeGet(reminderData, "taskId", "0"));
            reminderService.createTaskReminder(requestDto, taskId);
            log.info("Reminder successfully created for Task ID: {}", taskId);
        } else if (reminderData.containsKey("calendarId")) {
            Long calendarId = Long.parseLong(safeGet(reminderData, "calendarId", "0"));
            reminderService.createCalendarReminder(requestDto, calendarId);
            log.info("Reminder successfully created for Calendar ID: {}", calendarId);
        } else {
            // 사용자 선택이 필요할 때
            Map<String, List<String>> selectionMap = getTaskAndCalendarSelectionList(userId);
            log.info("Available tasks and calendars for user {}: {}", userId, selectionMap);

            // 사용자로부터 입력받는 로직 (현재 하드코딩)
            log.info("Please select a task or calendar from the following list:");
            log.info("Tasks:");
            for (String task : selectionMap.get("tasks")) {
                log.info(task);
            }
            log.info("Calendars:");
            for (String calendar : selectionMap.get("calendars")) {
                log.info(calendar);
            }
            String userSelection = "T1"; // 예: "T1"은 Task 1, "C1"은 Calendar 1

            handleReminderCreation(userSelection, reminderData, userId);
        }
    }*/

    /**
     * Task와 Calendar에 따라 각각 알림을 생성
     * @param userSelection
     * @param reminderData
     * @param userId
     */
    /*public void handleReminderCreation(String userSelection, Map<String, Object> reminderData, Long userId) {
        if (userSelection.startsWith("T")) {
            // Task에 대한 알림 생성
            Long taskId = mapUserSelectionToId(userSelection, userId, "task");
            ReminderRequestDto requestDto = new ReminderRequestDto();
            requestDto.setNotificationsEnabled(Boolean.parseBoolean(safeGet(reminderData, "notificationsEnabled", "false")));
            requestDto.setTimeBefore(Integer.parseInt(safeGet(reminderData, "timeBefore", "10")));
            requestDto.setRepeats(Boolean.parseBoolean(safeGet(reminderData, "repeats", "false")));
            reminderService.createTaskReminder(requestDto, taskId);
            log.info("Reminder successfully created for Task ID: {}", taskId);
        } else if (userSelection.startsWith("C")) {
            // Calendar에 대한 알림 생성
            Long calendarId = mapUserSelectionToId(userSelection, userId, "calendar");
            ReminderRequestDto requestDto = new ReminderRequestDto();
            requestDto.setNotificationsEnabled(Boolean.parseBoolean(safeGet(reminderData, "notificationsEnabled", "false")));
            requestDto.setTimeBefore(Integer.parseInt(safeGet(reminderData, "timeBefore", "10")));
            requestDto.setRepeats(Boolean.parseBoolean(safeGet(reminderData, "repeats", "false")));
            reminderService.createCalendarReminder(requestDto, calendarId);
            log.info("Reminder successfully created for Calendar ID: {}", calendarId);
        } else {
            throw new RuntimeException("알림 생성 중 오류 발생: 잘못된 선택입니다.");
        }
    }*/


    /**
     * Task와 Calendar 목록 제공
     * Task와 Calendar 목록을 함께 제공하여 사용자가 둘 중 하나를 선택할 수 있도록 구성
     */
    /*public Map<String, List<String>> getTaskAndCalendarSelectionList(Long userId) {
        // Task 목록 가져오기
        List<TaskEntity> tasks = taskService.getTasksByUserId(userId);
        List<String> taskSelection = new ArrayList<>();
        for (int i = 0; i < tasks.size(); i++) {
            TaskEntity task = tasks.get(i);
            taskSelection.add(String.format("T%d. [%d] %s (마감: %s)",
                    i + 1,
                    task.getTaskId(),
                    task.getTitle(),
                    task.getDueDate() != null ? task.getDueDate().toString() : "없음"));
        }

        // Calendar 목록 가져오기
        List<CalendarEntity> calendars = calendarService.getCalendarsByUserId(userId);
        List<String> calendarSelection = new ArrayList<>();
        for (int i = 0; i < calendars.size(); i++) {
            CalendarEntity calendar = calendars.get(i);
            calendarSelection.add(String.format("C%d. [%d] %s (시작: %s, 끝: %s)",
                    i + 1,
                    calendar.getCalendarId(),
                    calendar.getTitle(),
                    calendar.getStartTime() != null ? calendar.getStartTime().toString() : "없음",
                    calendar.getEndTime() != null ? calendar.getEndTime().toString() : "없음"));
        }

        // 두 목록을 Map에 담아 반환
        Map<String, List<String>> selectionMap = new HashMap<>();
        selectionMap.put("tasks", taskSelection);
        selectionMap.put("calendars", calendarSelection);
        return selectionMap;
    }*/

    /**
     * @param userSelection
     * @param userId
     * @param type
     * Task와 Calendar 중 하나를 선택하면 이를 처리하여 taskId 또는 calendarId를 반환
     */
    /*public Long mapUserSelectionToId(String userSelection, Long userId, String type) {
        try {
            int selectionIndex = Integer.parseInt(userSelection.substring(1).trim()) - 1; // "T1" -> 0
            if (userSelection.startsWith("T")) {
                // Task 선택
                List<TaskEntity> tasks = taskService.getTasksByUserId(userId);
                if (selectionIndex < 0 || selectionIndex >= tasks.size()) {
                    throw new RuntimeException("잘못된 Task 선택입니다. 올바른 번호를 입력하세요.");
                }
                return tasks.get(selectionIndex).getTaskId();
            } else if (userSelection.startsWith("C")) {
                // Calendar 선택
                List<CalendarEntity> calendars = calendarService.getCalendarsByUserId(userId);
                if (selectionIndex < 0 || selectionIndex >= calendars.size()) {
                    throw new RuntimeException("잘못된 Calendar 선택입니다. 올바른 번호를 입력하세요.");
                }
                return calendars.get(selectionIndex).getCalendarId();
            } else {
                throw new RuntimeException("잘못된 입력 형식입니다. 'T1' 또는 'C1'과 같은 형식으로 입력하세요.");
            }
        } catch (Exception e) {
            throw new RuntimeException("입력 처리 중 오류가 발생했습니다. 올바른 입력을 확인하세요.", e);
        }
    }*/
}