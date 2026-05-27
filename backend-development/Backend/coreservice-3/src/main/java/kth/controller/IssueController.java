package kth.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import kth.models.issues;
import kth.services.IssueService;

@RestController
@RequestMapping("/issues")
@CrossOrigin("*")
public class IssueController {

    @Autowired
    IssueService IS;

    // CREATE ISSUE
    @PostMapping("/create")
    public Object createIssue(
            @RequestBody issues issue
    ) {

        return IS.createIssue(issue);
    }

    // GET ALL ISSUES
    @GetMapping("/all")
    public Object getIssues() {

        return IS.getIssues();
    }

    // GET USER ISSUES
    @GetMapping("/user/{userId}")
    public Object getUserIssues(
            @PathVariable Long userId
    ) {

        return IS.getUserIssues(userId);
    }

    // UPDATE STATUS
    @PutMapping("/updatestatus/{id}")
    public Object updateStatus(

            @PathVariable Long id,

            @RequestBody Map<String, String> data
    ) {

        return IS.updateStatus(id, data);
    }

    // DELETE ISSUE
    @DeleteMapping("/delete/{id}")
    public Object deleteIssue(
            @PathVariable Long id
    ) {

        return IS.deleteIssue(id);
    }
}