package com.recruit.server.personal.service;

import com.recruit.server.common.exception.custom.NotFoundEmailException;
import com.recruit.server.personal.domain.PersonalBoard;
import com.recruit.server.personal.dto.PersonalRequestDto;
import com.recruit.server.personal.dto.PersonalResponseDto;
import com.recruit.server.personal.repository.PersonalRepository;
import com.recruit.server.user.domain.User;
import com.recruit.server.user.repository.UserRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

import static com.recruit.server.personal.dto.PersonalResponseDto.listOf;

/**
 * Created by Minky on 2021-10-22
 */

@Service
@RequiredArgsConstructor(access = AccessLevel.PUBLIC)
public class PersonalService {
    private final PersonalRepository personalRepository;
    private final UserRepository userRepository;

    @Transactional(readOnly = true)
    public List<PersonalResponseDto> getPersonalBoards(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(NotFoundEmailException::new);
        List<PersonalBoard> personalBoards = personalRepository.findByUser(user, Sort.by(Sort.Direction.ASC, "endDate"));
        return listOf(personalBoards);
    }

    @Transactional
    public Long create(String email, PersonalRequestDto personalRequestDto) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(NotFoundEmailException::new);
        PersonalBoard entityToShareBoard = personalRequestDto.toEntity();
        entityToShareBoard.setUser(user);
        PersonalBoard personalBoard = personalRepository.save(entityToShareBoard);
        return personalBoard.getId();
    }

    @Transactional
    public void batchInsert(String email, List<PersonalRequestDto> personalRequestDtoList) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(NotFoundEmailException::new);
        List<PersonalBoard> personalBoardList = new ArrayList<>();
        int batchCount = 0;
        for (PersonalRequestDto personalRequestDto : personalRequestDtoList) {
            PersonalBoard personalBoard = personalRequestDto.toEntity();
            personalBoard.setUser(user);
            personalBoardList.add(personalBoard);
            batchCount += 1;
            if (batchCount % 100 == 0) {
                personalRepository.saveAll(personalBoardList);
                personalBoardList = new ArrayList<>();
            }
        }
    }
}
