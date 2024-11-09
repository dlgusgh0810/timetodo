package org.timetodo.dto;

import lombok.*;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

@Getter
@Setter
@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserDTO {

    // 사용자 이름: 비어 있을 수 없고, 최대 50자 제한
    @NotBlank(message = "Username is required")
    @Size(max = 50, message = "Username cannot be longer than 50 characters")
    private String username;

    // 비밀번호: 비어 있을 수 없고, 최소 6자 이상
    @NotBlank(message = "Password is required")
    @Size(message = "Password must be at least 6 characters long")
    private String password;

    /*// 비밀번호 확인 (회원가입 시 비밀번호 확인용)
    @NotBlank(message = "Password confirmation is required")
    private String confirmPassword;*/

    // 이메일: 비어 있을 수 없고, 유효한 이메일 형식이어야 함
    @NotBlank(message = "Email is required")
    @Email(message = "Email should be valid")
    private String email;

    /*// 비밀번호 일치 여부 확인 메소드 (서비스에서 활용 가능)
    public boolean isPasswordMatching() {
        return this.password.equals(this.confirmPassword);
    }*/
}
