package org.timetodo.time.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.timetodo.time.dto.RequestUserDto;
import org.timetodo.time.entity.UserEntity;
import org.timetodo.time.repository.UserRepository;

import java.util.ArrayList;
import java.util.List;

//DTO -> Entity (Entity class)
//Entity -> DTO (DTO class)

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    /*@Override
    public void createUser(RequestUserDto dto) {

        UserEntity userEntity = new UserEntity(dto);
        userRepository.save(userEntity);
    }*/

    @Override
    public void registerUser(RequestUserDto requestUserDto) {
        UserEntity userEntity = UserEntity.toSaveEntity(requestUserDto);
        userRepository.save(userEntity);
    }

    @Override
    public List<RequestUserDto> findUser() {
        List<UserEntity> userEntities = userRepository.findAll();
        List<RequestUserDto> requestUserDtos = new ArrayList<>();
        for(UserEntity userEntity : userEntities) {
            requestUserDtos.add(RequestUserDto.toRequestUserDto(userEntity));
        }
        return requestUserDtos;
    }


}
