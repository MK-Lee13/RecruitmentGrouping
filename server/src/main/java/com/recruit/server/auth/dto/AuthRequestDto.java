package com.recruit.server.auth.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;

/**
 * Created by Minky on 2021-08-04
 */

@NoArgsConstructor
@Getter
public class AuthRequestDto {
    @Email(message = "email format is not valid")
    @NotBlank(message = "email cannot be empty")
    public String email;
    @NotBlank(message = "password cannot be empty")
    public String password;

    public AuthRequestDto(String email, String password) {
        this.email = email;
        this.password = password;
    }
}
