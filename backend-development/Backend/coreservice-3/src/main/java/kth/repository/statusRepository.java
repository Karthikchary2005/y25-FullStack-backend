package kth.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import kth.models.status;

@Repository
public interface statusRepository
        extends JpaRepository<status, Long> {

    status findByIssueId(
            Long issueId
    );
}