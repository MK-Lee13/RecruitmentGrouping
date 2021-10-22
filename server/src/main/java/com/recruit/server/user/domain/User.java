package com.recruit.server.user.domain;


import com.recruit.server.common.domain.BaseTimeEntity;
import com.recruit.server.personal.domain.PersonalBoard;
import com.recruit.server.share.domain.ShareBoard;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.util.Collection;
import java.util.Collections;
import java.util.List;

/**
 * User Domain
 */

@NoArgsConstructor(access = AccessLevel.PUBLIC)
@Getter
@Setter
@Entity
public class User extends BaseTimeEntity implements UserDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "user_sequence_gen")
    @SequenceGenerator(name = "user_sequence_gen", sequenceName = "user_sequence")
    @Column(name = "user_id")
    private Long id;

    @NotEmpty
    private String nickName;

    @NotEmpty
    @Column(length = 100, nullable = false, unique = true)
    private String email;

    @NotEmpty
    @Column(nullable = false)
    private String password;

    @Setter
    @Column(nullable = false, length = 50)
    @Enumerated(EnumType.STRING)
    private UserRole userRole;

    @NotNull
    @Column(nullable = false)
    private Boolean accessNotify;

    @OneToMany(mappedBy = "user", cascade = CascadeType.PERSIST, orphanRemoval = true)
    private List<ShareBoard> shareBoards;

    @OneToMany(mappedBy = "user", cascade = CascadeType.PERSIST, orphanRemoval = true)
    private List<PersonalBoard> personalBoards;

    @Builder
    public User(Long id, String nickName, String email, String password, UserRole userRole, Boolean accessNotify) {
        this.id = id;
        this.nickName = nickName;
        this.email = email;
        this.password = password;
        this.userRole = userRole;
        this.accessNotify = accessNotify;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return Collections.singletonList(new SimpleGrantedAuthority(this.userRole.name()));
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
