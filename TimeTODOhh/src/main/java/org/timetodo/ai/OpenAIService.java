package org.timetodo.ai;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.json.JSONObject;


@Service
public class OpenAIService {


    @Value("${openai.api.key}") // application.properties 파일에서 API 키를 가져옵니다
    private String apiKey;

    public String analyzeSchedule(String inputText) {
        RestTemplate restTemplate = new RestTemplate();
        String apiUrl = "https://api.openai.com/v1/completions";

        // 요청 본문 생성
        JSONObject requestBody = new JSONObject();
        requestBody.put("model", "text-davinci-003"); // // OpenAI 모델 선택
        requestBody.put("prompt", inputText); // 사용자 입력
        requestBody.put("max_tokens", 100); // 응답 길이 제한

        // HTTP 헤더 설정
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setBearerAuth(apiKey); // API 키를 Bearer 토큰으로 설정

        // HTTP 요청 생성
        HttpEntity<String> entity = new HttpEntity<>(requestBody.toString(), headers);

        // OpenAI API 호출
        ResponseEntity<String> response = restTemplate.postForEntity(apiUrl, entity, String.class);
        return response.getBody(); // OpenAI의 응답 반환
    }
}
/*
이 코드가 하는 일
analyzeSchedule 메서드는 OpenAI API를 호출하여 자연어로 입력된 일정을 해석합니다.
RestTemplate을 사용하여 POST 요청을 보냅니다.
OpenAI API의 응답을 JSON 형식으로 반환합니다.
*/