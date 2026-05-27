package kth.models;

import java.time.LocalDateTime;

import jakarta.persistence.*;

@Entity
@Table(name = "issues")
public class issues {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    @Column(length = 2000)
    private String description;

    private String category;

    private String priority;

    private String status;

    // USER ID WHO CREATED ISSUE
    private Long createdBy;

    // CREATED TIME
    private LocalDateTime createdAt;

    public issues() {

    }

    // AUTO SET DEFAULT VALUES
    @PrePersist
    public void prePersist() {

        if (this.status == null) {

            this.status = "OPEN";
        }

        this.createdAt =
            LocalDateTime.now();
    }

    // GETTERS AND SETTERS

    public Long getId() {

        return id;
    }

    public void setId(Long id) {

        this.id = id;
    }

    public String getTitle() {

        return title;
    }

    public void setTitle(String title) {

        this.title = title;
    }

    public String getDescription() {

        return description;
    }

    public void setDescription(
            String description
    ) {

        this.description = description;
    }

    public String getCategory() {

        return category;
    }

    public void setCategory(
            String category
    ) {

        this.category = category;
    }

    public String getPriority() {

        return priority;
    }

    public void setPriority(
            String priority
    ) {

        this.priority = priority;
    }

    public String getStatus() {

        return status;
    }

    public void setStatus(
            String status
    ) {

        this.status = status;
    }

    public Long getCreatedBy() {

        return createdBy;
    }

    public void setCreatedBy(
            Long createdBy
    ) {

        this.createdBy = createdBy;
    }

    public LocalDateTime getCreatedAt() {

        return createdAt;
    }

    public void setCreatedAt(
            LocalDateTime createdAt
    ) {

        this.createdAt = createdAt;
    }
}