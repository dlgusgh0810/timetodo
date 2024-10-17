package org.timetodo.time.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.timetodo.time.dto.RequestUserDto;

import java.util.List;

@Entity(name = "user_entity")
@Data
@NoArgsConstructor
public class UserEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    @Column(name = "user_id", unique = true, nullable = false)
    private Long userId;

//    @Column(nullable = false, unique = true, length = 50)
    @Column(nullable = false)
    private String username;

    @Column(nullable = false)
    private String password;

//    @Column(nullable = false, unique = true)
    @Column(nullable = false)
    private String email; // 사용자 이메일

    @OneToOne // 1:1 관계, 연결된 엔티티도 같이 저장/삭제
    //@JoinColumn(name = "preferences_id") // Preferences의 기본 키를 외래 키로 설정
    private PreferencesEntity preferences; // Foreign Key (외래 키)

    @OneToMany(mappedBy = "users")
    private List<TaskEntity> tasks;

    @OneToMany(mappedBy = "users")
    private List<CategoryEntity> categories;

    @OneToMany(mappedBy = "users")
    private List<CalendarEntity> calendars;

    public static UserEntity toSaveEntity(RequestUserDto requestUserDto){
        UserEntity userEntity = new UserEntity();
        userEntity.setUsername(requestUserDto.getUsername());
        userEntity.setPassword(requestUserDto.getPassword());
        userEntity.setEmail(requestUserDto.getEmail());
        return userEntity;
    }

    /*//test
    private String createAt;
    public UserEntity(UserEntity dto) {
        LocalDateTime now = LocalDateTime.now();

        this.username = dto.getUsername();
        this.password = dto.getPassword();
        this.createAt = now.toString();

    }*/
}
