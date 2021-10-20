package com.recruit.server.share.repository;

import com.recruit.server.share.domain.ShareBoard;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Created by Minky on 2021-10-20
 */
@Repository
public interface ShareRepository extends JpaRepository<ShareBoard,Long> {
}
