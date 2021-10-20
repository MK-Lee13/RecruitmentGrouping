package com.recruit.server.share.dto;

import com.recruit.server.share.domain.ShareBoard;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.lang.Nullable;

import javax.validation.constraints.NotEmpty;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Created by Minky on 2021-10-20
 */

@NoArgsConstructor
@Getter
public class ShareResponseDto {
    private Long id;
    private String url;
    private String title;
    private String desc;
    private LocalDateTime startDate;
    private LocalDateTime endDate;
    private String nickname;

    public ShareResponseDto(
            Long id,
            String url,
            String title,
            String desc,
            LocalDateTime startDate,
            LocalDateTime endDate,
            String nickname
    ) {
        this.id = id;
        this.url = url;
        this.title = title;
        this.desc = desc;
        this.startDate = startDate;
        this.endDate = endDate;
        this.nickname = nickname;
    }

    public static ShareResponseDto of(ShareBoard shareBoard) {
        return new ShareResponseDto(
                shareBoard.getId(),
                shareBoard.getUrl(),
                shareBoard.getTitle(),
                shareBoard.getDesc(),
                shareBoard.getStartDate(),
                shareBoard.getEndDate(),
                shareBoard.getUser().getNickName()
        );
    }

    public static List<ShareResponseDto> listOf(List<ShareBoard> shareBoards) {
        return shareBoards.stream()
                .map(ShareResponseDto::of)
                .collect(Collectors.toList());
    }
}
