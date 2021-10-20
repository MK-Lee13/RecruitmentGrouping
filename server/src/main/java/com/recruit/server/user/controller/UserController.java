package com.recruit.server.user.controller;

import com.recruit.server.user.dto.UserAccessNotifyRequestDto;
import com.recruit.server.user.dto.UserRequestDto;
import com.recruit.server.user.service.UserService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;

/**
 * Created by Minky on 2021-10-20
 */

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor(access = AccessLevel.PUBLIC)
public class UserController {
    private final UserService userService;

    @PostMapping("/signup")
    public ResponseEntity<Void> createUser(
            @Valid @RequestBody UserRequestDto userRequestDto
    ) {
        Long userId = userService.create(userRequestDto);
        return ResponseEntity.created(URI.create("/api/users/" + userId)).build();
    }

    @PatchMapping("/notify")
    public ResponseEntity<Void> setAccessNotify(
            @AuthenticationPrincipal String email,
            @Valid @RequestBody UserAccessNotifyRequestDto UserAccessNotifyRequestDto
    ) {
        userService.setAccessNotify(UserAccessNotifyRequestDto, email);
        return ResponseEntity.ok().build();
    }
}
