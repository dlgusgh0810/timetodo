package org.timetodo.ai.log;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.timetodo.entity.LogEntity;

import java.util.List;

@RestController
@RequestMapping("/api/log")
@RequiredArgsConstructor
public class LogController {

    @Autowired
    private final LogService logService;

    @GetMapping("/all")
    public ResponseEntity<List<LogEntity>> getAllLogs() {
        return ResponseEntity.ok(logService.getAllLogs());
    }

    @GetMapping("/{userId}")
    public ResponseEntity<List<LogEntity>> getLogsByUserId(@PathVariable Long userId) {
        return ResponseEntity.ok(logService.getLogsByUserId(userId));
    }
}
