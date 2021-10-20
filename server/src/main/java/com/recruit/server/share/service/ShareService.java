package com.recruit.server.share.service;

import com.recruit.server.share.repository.ShareRepository;
import com.recruit.server.share.domain.ShareBoard;
import com.recruit.server.share.dto.ShareRequestDto;
import com.recruit.server.share.dto.ShareResponseDto;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import static com.recruit.server.share.dto.ShareResponseDto.listOf;

/**
 * Created by Minky on 2021-10-20
 */

@Service
@RequiredArgsConstructor(access = AccessLevel.PUBLIC)
public class ShareService {
    private final ShareRepository shareRepository;

    @Transactional(readOnly = true)
    public List<ShareResponseDto> getShareBoards() {
        List<ShareBoard> shareBoards = shareRepository.findAll();
        return listOf(shareBoards);
    }

    @Transactional
    public Long create(ShareRequestDto shareRequestDto) {
        ShareBoard shareBoard = shareRepository.save(shareRequestDto.toEntity());
        return shareBoard.getId();
    }
}
