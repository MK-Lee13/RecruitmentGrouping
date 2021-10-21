package com.recruit.server.share.controller;

import com.recruit.server.share.dto.ShareRequestDto;
import com.recruit.server.share.dto.ShareResponseDto;
import com.recruit.server.share.service.ShareService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.util.List;

/**
 * Created by Minky on 2021-10-20
 */

@RestController
@RequestMapping("/api/shares")
@RequiredArgsConstructor(access = AccessLevel.PUBLIC)
public class ShareController {
    private final ShareService shareService;

    @CrossOrigin("*")
    @GetMapping
    public ResponseEntity<List<ShareResponseDto>> getShareBoards() {
        return ResponseEntity.ok(shareService.getShareBoards());
    }

    @PostMapping
    public ResponseEntity<Void> createShareBoard(
            @AuthenticationPrincipal String email,
            @Valid @RequestBody ShareRequestDto shareRequestDto
    ) {
        Long id = shareService.create(email, shareRequestDto);
        return ResponseEntity.created(URI.create("api/shares/" + id)).build();
    }
}
