package com.recruit.server.personal.dto;

import com.recruit.server.personal.domain.PersonalBoard;
import javax.validation.constraints.NotBlank;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

/**
 * Created by Minky on 2021-10-22
 */
public class PersonalRequestDto {
    private String url;
    @NotBlank(message = "title cannot be null")
    private String title;
    private String desc;
    private String startDate;
    private String endDate;

    public PersonalRequestDto(String url, String title, String desc, String startDate, String endDate) {
        this.url = url;
        this.title = title;
        this.desc = desc;
        this.startDate = startDate;
        this.endDate = endDate;
    }

    public PersonalBoard toEntity() {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy/MM/dd HH:mm:ss");
        LocalDateTime startDate = null;
        LocalDateTime endDate = null;
        if (this.startDate != null) {
            startDate = LocalDateTime.parse(this.startDate, formatter);
        }
        if (this.endDate != null) {
            endDate = LocalDateTime.parse(this.endDate, formatter);
        }
        return new PersonalBoard(null, url, title, desc, startDate, endDate);
    }
}
