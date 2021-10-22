package com.recruit.server.personal.repository;

import com.recruit.server.personal.domain.PersonalBoard;
import com.recruit.server.user.domain.User;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Created by Minky on 2021-10-22
 */
@Repository
public interface PersonalRepository extends JpaRepository<PersonalBoard, Long> {
    List<PersonalBoard> findByUser(User user, Sort endDate);
}
