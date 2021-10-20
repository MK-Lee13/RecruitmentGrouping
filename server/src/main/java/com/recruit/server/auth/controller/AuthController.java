package com.recruit.server.auth.controller;

import com.recruit.server.auth.dto.AuthRequestDto;
import com.recruit.server.auth.dto.AuthResponseDto;
import com.recruit.server.auth.dto.RefreshRequestDto;
import com.recruit.server.auth.service.AuthService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

/**
 * Created by Minky on 2021-10-20
 */

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor(access = AccessLevel.PUBLIC)
public class AuthController {
    private final AuthService authService;

    @PostMapping("/signin")
    public ResponseEntity<AuthResponseDto> signIn(
            @Valid @RequestBody AuthRequestDto authRequestDto
    ) {
        return ResponseEntity.ok().body(authService.signIn(authRequestDto));
    }

    @PostMapping("/refresh")
    public ResponseEntity<AuthResponseDto> refreshing(
            @Valid @RequestBody RefreshRequestDto refreshRequestDto
    ) {
        return ResponseEntity.ok().body(authService.refreshing(refreshRequestDto));
    }
}
