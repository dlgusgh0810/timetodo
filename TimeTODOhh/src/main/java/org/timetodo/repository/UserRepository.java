package org.timetodo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.timetodo.dto.UserDTO;
import org.timetodo.entity.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Repository
public interface UserRepository extends JpaRepository<UserEntity, Long> {
    // 필요한 경우 커스텀 쿼리 메소드 추가 가능

    // 사용자 이름으로 검색
    Optional<org.timetodo.entity.UserEntity> findByUsername(String username);

    /*public UserEntity convertToEntity(UserDTO userDTO, TaskRepository taskRepository, CategoryRepository categoryRepository, CalendarRepository calendarRepository) {
        UserEntity userEntity = new UserEntity();
        userEntity.setUserId(userDTO.getUserId());
        userEntity.setUsername(userDTO.getUsername());
        userEntity.setPassword(userDTO.getPassword());
        userEntity.setEmail(userDTO.getEmail());

        // taskIds를 TaskEntity 리스트로 변환
        List<TaskEntity> tasks = userDTO.getTaskIds().stream()
                .map(taskRepository::findById)
                .filter(Optional::isPresent)
                .map(Optional::get)
                .collect(Collectors.toList());
        userEntity.setTasks(tasks);

        // categoryIds를 CategoryEntity 리스트로 변환
        List<CategoryEntity> categories = userDTO.getCategoryIds().stream()
                .map(categoryRepository::findById)
                .filter(Optional::isPresent)
                .map(Optional::get)
                .collect(Collectors.toList());
        userEntity.setCategories(categories);

        // calendarIds를 CalendarEntity 리스트로 변환
        List<CalendarEntity> calendars = userDTO.getCalendarIds().stream()
                .map(calendarRepository::findById)
                .filter(Optional::isPresent)
                .map(Optional::get)
                .collect(Collectors.toList());
        userEntity.setCalendars(calendars);

        return userEntity;
    }*/

}
