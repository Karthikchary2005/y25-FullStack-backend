package kth.services;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kth.models.issues;
import kth.models.status;
import kth.repository.issuesRepository;
import kth.repository.statusRepository;

@Service
public class IssueService {

    @Autowired
    issuesRepository IR;

    @Autowired
    statusRepository SR;

    // CREATE ISSUE
    public Object createIssue(
            issues issue
    ) {

        Map<String, Object> response =
                new HashMap<>();

        try {

            // DEFAULT STATUS
            issue.setStatus("OPEN");

            // SAVE ISSUE
            issues savedIssue =
                    IR.save(issue);

            // CREATE STATUS ENTRY
            status ST = new status();

            ST.setIssueId(
                    savedIssue.getId()
            );

            ST.setStatusName("OPEN");

            SR.save(ST);

            response.put(
                    "code",
                    200
            );

            response.put(
                    "message",
                    "Issue Created Successfully"
            );

            response.put(
                    "issue",
                    savedIssue
            );

        } catch(Exception e) {

            response.put(
                    "code",
                    500
            );

            response.put(
                    "message",
                    e.getMessage()
            );
        }

        return response;
    }

    // GET ALL ISSUES
    public Object getIssues() {

        Map<String, Object> response =
                new HashMap<>();

        try {

            List<issues> issuesList =
                    IR.findAll();

            response.put(
                    "code",
                    200
            );

            response.put(
                    "issues",
                    issuesList
            );

        } catch(Exception e) {

            response.put(
                    "code",
                    500
            );

            response.put(
                    "message",
                    e.getMessage()
            );
        }

        return response;
    }

    // GET USER ISSUES
    public Object getUserIssues(
            Long userId
    ) {

        Map<String, Object> response =
                new HashMap<>();

        try {

            List<issues> issuesList =
                    IR.findByCreatedBy(userId);

            response.put(
                    "code",
                    200
            );

            response.put(
                    "issues",
                    issuesList
            );

        } catch(Exception e) {

            response.put(
                    "code",
                    500
            );

            response.put(
                    "message",
                    e.getMessage()
            );
        }

        return response;
    }

    // UPDATE STATUS
    public Object updateStatus(

            Long id,

            Map<String, String> data
    ) {

        Map<String, Object> response =
                new HashMap<>();

        try {

            issues issue =
                    IR.findById(id)
                            .orElse(null);

            if(issue == null) {

                response.put(
                        "code",
                        404
                );

                response.put(
                        "message",
                        "Issue Not Found"
                );

                return response;
            }

            // UPDATE ISSUE TABLE
            issue.setStatus(
                    data.get("status")
            );

            IR.save(issue);

            // UPDATE STATUS TABLE
            status ST =
                    SR.findByIssueId(id);

            if(ST != null) {

                ST.setStatusName(
                        data.get("status")
                );

                SR.save(ST);
            }

            response.put(
                    "code",
                    200
            );

            response.put(
                    "message",
                    "Status Updated"
            );

        } catch(Exception e) {

            response.put(
                    "code",
                    500
            );

            response.put(
                    "message",
                    e.getMessage()
            );
        }

        return response;
    }

    // DELETE ISSUE
    public Object deleteIssue(
            Long id
    ) {

        Map<String, Object> response =
                new HashMap<>();

        try {

            IR.deleteById(id);

            response.put(
                    "code",
                    200
            );

            response.put(
                    "message",
                    "Issue Deleted"
            );

        } catch(Exception e) {

            response.put(
                    "code",
                    500
            );

            response.put(
                    "message",
                    e.getMessage()
            );
        }

        return response;
    }
}