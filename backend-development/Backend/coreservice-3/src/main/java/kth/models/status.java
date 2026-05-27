package kth.models;

import java.time.LocalDateTime;

import jakarta.persistence.*;

@Entity
@Table(name = "status")
public class status {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // ISSUE ID LINK
    private Long issueId;

    // OPEN / RESOLVED / CLOSED
    private String statusName;

    // UPDATED TIME
    private LocalDateTime updatedAt;

    public status() {

    }

    // AUTO TIME
    @PrePersist
    public void prePersist() {

        this.updatedAt =
            LocalDateTime.now();
    }

    // GETTERS AND SETTERS

    public Long getId() {

        return id;
    }

    public void setId(Long id) {

        this.id = id;
    }

    public Long getIssueId() {

        return issueId;
    }

    public void setIssueId(
            Long issueId
    ) {

        this.issueId = issueId;
    }

    public String getStatusName() {

        return statusName;
    }

    public void setStatusName(
            String statusName
    ) {

        this.statusName = statusName;
    }

    public LocalDateTime getUpdatedAt() {

        return updatedAt;
    }

    public void setUpdatedAt(
            LocalDateTime updatedAt
    ) {

        this.updatedAt = updatedAt;
    }
}