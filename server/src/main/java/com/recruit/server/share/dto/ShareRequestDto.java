package com.recruit.server.share.dto;

import com.recruit.server.share.domain.ShareBoard;

import javax.validation.constraints.NotBlank;

/**
 * Created by Minky on 2021-10-20
 */
public class ShareRequestDto {
    private String url;
    @NotBlank(message = "title cannot be null")
    private String title;
    private String desc;

    public ShareRequestDto(String url, String title, String desc) {
        this.url = url;
        this.title = title;
        this.desc = desc;
    }

    public ShareBoard toEntity() {
        return new ShareBoard(null, url, title, desc);
    }
}
