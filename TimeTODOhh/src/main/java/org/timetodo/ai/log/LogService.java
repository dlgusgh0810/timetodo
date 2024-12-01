package org.timetodo.ai.log;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.timetodo.entity.LogEntity;
import org.timetodo.repository.LogRepository;

import java.util.List;

@Service
public class LogService {
    @Autowired
    private LogRepository logRepository;

    public void saveLog(Long userId, String input, String response, String result) {
        LogEntity log = new LogEntity();
        log.setUserId(userId);
        log.setInputText(input);
        log.setOpenaiResponse(response);
        log.setProcessedResult(result);
        logRepository.save(log);
    }

    public List<LogEntity> getAllLogs() {
        return logRepository.findAll(); // 모든 로그 조회
    }

    public List<LogEntity> getLogsByUserId(Long userId) {
        return logRepository.findAll().stream()
                .filter(log -> log.getUserId().equals(userId))
                .toList(); // 사용자 ID로 필터링
    }
}
