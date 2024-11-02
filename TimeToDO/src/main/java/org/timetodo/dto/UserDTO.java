package org.timetodo.dto;

//회원가입 변수, getter,setter 선언
public class UserDTO {

    private String username;

    private String password;

    private String email;

    // 기본 생성자
    public UserDTO() {}

    // 생성자
    public UserDTO(String username, String password, String email) {
        this.username = username;
        this.password = password;
        this.email = email;
    }

    // Getter 및 Setter 메서드
    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}
