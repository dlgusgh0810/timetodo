package org.timetodo.time.dto;

import lombok.*;
import org.timetodo.time.entity.UserEntity;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RequestUserDto {

    private String username;

    private String password;

    private String email;


    public static RequestUserDto toRequestUserDto(UserEntity userEntity) {
        RequestUserDto requestUserDto = new RequestUserDto();
        requestUserDto.setUsername(userEntity.getUsername());
        requestUserDto.setPassword(userEntity.getPassword());
        requestUserDto.setEmail(userEntity.getEmail());
        return requestUserDto;
    }
}
