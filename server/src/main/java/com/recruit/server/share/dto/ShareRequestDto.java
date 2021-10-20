package com.recruit.server.share.dto;

import com.recruit.server.share.domain.ShareBoard;
import org.springframework.lang.Nullable;

import javax.validation.constraints.NotBlank;
import java.time.LocalDateTime;

/**
 * Created by Minky on 2021-10-20
 */
public class ShareRequestDto {
    private String url;
    @NotBlank(message = "title cannot be null")
    private String title;
    private String desc;
    private LocalDateTime startDate;
    private LocalDateTime endDate;

    public ShareRequestDto(String url, String title, String desc, LocalDateTime startDate, LocalDateTime endDate) {
        this.url = url;
        this.title = title;
        this.desc = desc;
        this.startDate = startDate;
        this.endDate = endDate;
    }

    public ShareBoard toEntity() {
        return new ShareBoard(null, url, title, desc, startDate, endDate);
    }
}
