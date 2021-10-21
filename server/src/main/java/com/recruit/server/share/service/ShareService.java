package com.recruit.server.share.service;

import com.recruit.server.common.exception.custom.NotFoundEmailException;
import com.recruit.server.share.repository.ShareRepository;
import com.recruit.server.share.domain.ShareBoard;
import com.recruit.server.share.dto.ShareRequestDto;
import com.recruit.server.share.dto.ShareResponseDto;
import com.recruit.server.user.domain.User;
import com.recruit.server.user.repository.UserRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
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
    private final UserRepository userRepository;

    @Transactional(readOnly = true)
    public List<ShareResponseDto> getShareBoards() {
        List<ShareBoard> shareBoards = shareRepository.findAll(Sort.by(Sort.Direction.ASC, "endDate"));
        return listOf(shareBoards);
    }

    @Transactional
    public Long create(String email, ShareRequestDto shareRequestDto) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(NotFoundEmailException::new);
        ShareBoard entityToShareBoard = shareRequestDto.toEntity();
        entityToShareBoard.setUser(user);
        ShareBoard shareBoard = shareRepository.save(entityToShareBoard);
        return shareBoard.getId();
    }
}
