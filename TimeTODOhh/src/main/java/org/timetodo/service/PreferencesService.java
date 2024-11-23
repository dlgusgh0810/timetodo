package org.timetodo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.timetodo.dto.PreferencesDTO;
import org.timetodo.dto.PreferencesRequestDTO;
import org.timetodo.entity.PreferencesEntity;
import org.timetodo.entity.UserEntity;
import org.timetodo.repository.PreferencesRepository;
import org.timetodo.repository.UserRepository;

import java.util.Optional;

@Service
public class PreferencesService {
    @Autowired
    private PreferencesRepository preferencesRepository;

    @Autowired
    private UserRepository userRepository;

    public PreferencesDTO getUserPreferences(Long userId) {
        PreferencesEntity preferences = preferencesRepository.findByUserEntity_UserId(userId)
                .orElseThrow(() -> new RuntimeException("User preferences not found"));
        return new PreferencesDTO(preferences.getPreferencesId(), preferences.getTheme(), preferences.getUserEntity().getUserId());
    }

    public void updateUserTheme(Long userId, PreferencesRequestDTO requestDTO) {
        // 사용자 엔티티 조회 또는 생성
        UserEntity userEntity = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        PreferencesEntity preferences = preferencesRepository.findByUserEntity_UserId(userId)
                .orElseGet(() -> {
                    PreferencesEntity newPreferences = new PreferencesEntity();
                    newPreferences.setUserEntity(userEntity);
                    return newPreferences;
                });

        preferences.setTheme(requestDTO.getTheme());
        preferencesRepository.save(preferences);
    }
}
