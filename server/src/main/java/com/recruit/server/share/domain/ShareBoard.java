package com.recruit.server.share.domain;

import com.recruit.server.common.domain.BaseTimeEntity;
import com.recruit.server.user.domain.User;
import lombok.*;
import org.springframework.lang.Nullable;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;
import java.time.LocalDateTime;

/**
 * Created by Minky on 2021-10-20
 */

@NoArgsConstructor(access = AccessLevel.PUBLIC)
@Getter
@Setter
@Entity
public class ShareBoard extends BaseTimeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "share_sequence_gen")
    @SequenceGenerator(name = "share_sequence_gen", sequenceName = "share_sequence")
    @Column(name = "share_id")
    private Long id;

    @Nullable
    private String url;

    @NotEmpty
    private String title;

    @Nullable
    private String desc;

    @Nullable
    private LocalDateTime startDate;

    @Nullable
    private LocalDateTime endDate;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @Builder
    public ShareBoard(Long id, String url, String title, String desc, LocalDateTime startDate, LocalDateTime endDate) {
        this.id = id;
        this.url = url;
        this.title = title;
        this.desc = desc;
        this.startDate = startDate;
        this.endDate = endDate;
    }
}
