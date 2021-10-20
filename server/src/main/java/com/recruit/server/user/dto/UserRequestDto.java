package com.recruit.server.user.dto;

import com.recruit.server.user.domain.User;
import com.recruit.server.user.domain.UserRole;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

/**
 * Created by Minky on 2021-10-20
 */
public class UserRequestDto {
    @NotBlank(message = "nickName cannot be null")
    private String nickName;

    @Email(message = "email format is not valid")
    private String email;

    @NotBlank(message = "password cannot be null")
    private String password;

    public UserRequestDto(String nickName, String email, String password) {
        this.nickName = nickName;
        this.email = email;
        this.password = password;
    }

    public User toEntity() {
        return new User(
                null,
                this.nickName,
                this.email,
                toEncodePassword(),
                UserRole.ROLE_CLIENT,
                false
        );
    }

    private String toEncodePassword() {
        return new BCryptPasswordEncoder().encode(password);
    }
}
