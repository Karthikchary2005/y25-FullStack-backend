package kth.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import kth.models.issues;

@Repository
public interface issuesRepository
        extends JpaRepository<issues, Long> {

    // GET ISSUES CREATED BY USER
    List<issues> findByCreatedBy(
            Long createdBy
    );

    // DELETE ISSUES CREATED BY USER
    void deleteByCreatedBy(
            Long createdBy
    );
}
