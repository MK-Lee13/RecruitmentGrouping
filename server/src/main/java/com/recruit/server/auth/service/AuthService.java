package com.recruit.server.auth.service;

import com.recruit.server.auth.dto.AuthRequestDto;
import com.recruit.server.auth.dto.AuthResponseDto;
import com.recruit.server.auth.dto.RefreshRequestDto;
import com.recruit.server.common.exception.custom.NotFoundEmailException;
import com.recruit.server.common.exception.custom.NotFoundPasswordException;
import com.recruit.server.common.security.JwtTokenProvider;
import com.recruit.server.user.domain.User;
import com.recruit.server.user.repository.UserRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Created by Minky on 2021-10-20
 */

@Service
@RequiredArgsConstructor(access = AccessLevel.PUBLIC)
public class AuthService {
    private final UserRepository userRepository;
    private final JwtTokenProvider jwtTokenProvider;
    private final PasswordEncoder passwordEncoder;

    @Transactional
    public AuthResponseDto signIn(AuthRequestDto authRequestDto) {
        User user = getUserByEmail(authRequestDto.getEmail());
        if (!passwordEncoder.matches(authRequestDto.getPassword(), user.getPassword())) {
            throw new NotFoundPasswordException();
        }

        String accessToken = jwtTokenProvider.createAccessToken(user.getEmail(), user.getUserRole().name());
        String refreshToken = jwtTokenProvider.createRefreshToken();

        return new AuthResponseDto(accessToken, refreshToken);
    }

    @Transactional
    public AuthResponseDto refreshing(RefreshRequestDto refreshRequestDto) {
        if (!jwtTokenProvider.validateToken(refreshRequestDto.getRefreshToken())) {
            throw new NotFoundPasswordException();
        }

        String email = jwtTokenProvider.getUserPk(refreshRequestDto.getAccessToken());
        String role = jwtTokenProvider.getUserRole(refreshRequestDto.getAccessToken());

        String accessToken = jwtTokenProvider.createAccessToken(email, role);
        String refreshToken = jwtTokenProvider.createRefreshToken();

        return new AuthResponseDto(accessToken, refreshToken);
    }

    private User getUserByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(NotFoundEmailException::new);
    }
}
