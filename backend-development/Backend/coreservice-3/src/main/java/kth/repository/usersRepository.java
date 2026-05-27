package kth.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import kth.models.users;

@Repository
public interface usersRepository
        extends JpaRepository<users, Long> {

    // FIND USER BY EMAIL
    users findByEmail(
            String email
    );

    // OPTIONAL EMAIL CHECK
    Optional<users> findOneByEmail(
            String email
    );
}