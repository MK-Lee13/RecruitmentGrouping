package com.recruit.server.user.service;

import com.recruit.server.common.exception.custom.NotFoundEmailException;
import com.recruit.server.user.domain.User;
import com.recruit.server.user.dto.UserAccessNotifyRequestDto;
import com.recruit.server.user.dto.UserRequestDto;
import com.recruit.server.user.repository.UserRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Created by Minky on 2021-10-20
 */

@Service
@RequiredArgsConstructor(access = AccessLevel.PUBLIC)
public class UserService {
    private final UserRepository userRepository;

    @Transactional
    public Long create(UserRequestDto userRequestDto) {
        User newUser = userRepository.save(userRequestDto.toEntity());
        return newUser.getId();
    }

    @Transactional
    public void setAccessNotify(UserAccessNotifyRequestDto userAccessNotifyRequestDto, String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(NotFoundEmailException::new);
        user.setAccessNotify(userAccessNotifyRequestDto.getAccessNotify());
        userRepository.save(user);
    }
}
