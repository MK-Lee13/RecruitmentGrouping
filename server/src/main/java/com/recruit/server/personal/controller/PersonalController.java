package com.recruit.server.personal.controller;

import com.recruit.server.personal.dto.PersonalRequestDto;
import com.recruit.server.personal.dto.PersonalResponseDto;
import com.recruit.server.personal.service.PersonalService;
import com.recruit.server.share.dto.ShareRequestDto;
import com.recruit.server.share.dto.ShareResponseDto;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.util.List;

/**
 * Created by Minky on 2021-10-22
 */

@RestController
@RequestMapping("/api/personals")
@RequiredArgsConstructor(access = AccessLevel.PUBLIC)
public class PersonalController {
    private final PersonalService personalService;

    @GetMapping
    public ResponseEntity<List<PersonalResponseDto>> getPersonalBoards(
            @AuthenticationPrincipal String email
    ) {
        return ResponseEntity.ok(personalService.getPersonalBoards(email));
    }

    @PostMapping
    public ResponseEntity<Void> createPersonalBoard(
            @AuthenticationPrincipal String email,
            @Valid @RequestBody PersonalRequestDto personalRequestDto
    ) {
        Long id = personalService.create(email, personalRequestDto);
        return ResponseEntity.created(URI.create("api/shares/" + id)).build();
    }

    @PostMapping("/batch")
    public ResponseEntity<Void> multiInsertPersonalBoard(
            @AuthenticationPrincipal String email,
            @Valid @RequestBody List<PersonalRequestDto> personalRequestDtoList
    ) {
        personalService.batchInsert(email, personalRequestDtoList);
        return ResponseEntity.ok().build();
    }
}
