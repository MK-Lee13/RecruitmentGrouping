package com.recruit.server.personal.dto;

import com.recruit.server.personal.domain.PersonalBoard;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Created by Minky on 2021-10-22
 */

@NoArgsConstructor
@Getter
public class PersonalResponseDto {
    private Long id;
    private String url;
    private String title;
    private String desc;
    private LocalDateTime startDate;
    private LocalDateTime endDate;

    public PersonalResponseDto(
            Long id,
            String url,
            String title,
            String desc,
            LocalDateTime startDate,
            LocalDateTime endDate
    ) {
        this.id = id;
        this.url = url;
        this.title = title;
        this.desc = desc;
        this.startDate = startDate;
        this.endDate = endDate;
    }

    public static PersonalResponseDto of(PersonalBoard personalBoard) {
        return new PersonalResponseDto(
                personalBoard.getId(),
                personalBoard.getUrl(),
                personalBoard.getTitle(),
                personalBoard.getDesc(),
                personalBoard.getStartDate(),
                personalBoard.getEndDate()
        );
    }

    public static List<PersonalResponseDto> listOf(List<PersonalBoard> personalBoards) {
        return personalBoards.stream()
                .map(PersonalResponseDto::of)
                .collect(Collectors.toList());
    }
}
