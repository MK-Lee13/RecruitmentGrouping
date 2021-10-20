package com.recruit.server.auth.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;

/**
 * Created by Minky on 2021-08-04
 */

@NoArgsConstructor
@Getter
public class RefreshRequestDto {
    @NotBlank(message = "accessToken cannot be empty")
    private String accessToken;
    @NotBlank(message = "refreshToken cannot be empty")
    private String refreshToken;

    public RefreshRequestDto(String accessToken, String refreshToken) {
        this.accessToken = accessToken;
        this.refreshToken = refreshToken;
    }
}
