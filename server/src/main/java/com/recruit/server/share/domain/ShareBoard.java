package com.recruit.server.share.domain;

import lombok.*;
import org.springframework.lang.Nullable;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;

/**
 * Created by Minky on 2021-10-20
 */

@NoArgsConstructor(access = AccessLevel.PUBLIC)
@Getter
@Setter
@Entity
public class ShareBoard {
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

    @Builder
    public ShareBoard(Long id, String url, String title, String desc) {
        this.id = id;
        this.url = url;
        this.title = title;
        this.desc = desc;
    }
}
