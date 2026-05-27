package kth.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import kth.models.users;
import kth.services.userService;

@RestController
@RequestMapping("/user")
@CrossOrigin("*")
public class UserController {

    @Autowired
    userService US;

    // REGISTER USER
    @PostMapping("/signup")
    public Object signup(

            @RequestBody users U
    ) {

        return US.signup(U);
    }

    // LOGIN USER
    @PostMapping("/signin")
    public Object signin(

            @RequestBody
            Map<String, Object> data
    ) {

        return US.signin(data);
    }

    // USER INFO
    @GetMapping("/uinfo")
    public Object uinfo(

            @RequestHeader("Token")
            String token
    ) {

        return US.uinfo(token);
    }

    // USER PROFILE
    @GetMapping("/profile")
    public Object profile(

            @RequestHeader("Token")
            String token
    ) {

        return US.profile(token);
    }

    // ADMIN - GET ALL USERS
    @GetMapping("/all")
    public Object getUsers() {

        return US.getAllUsers();
    }

    // ADMIN - DELETE USER
    @DeleteMapping("/delete/{id}")
    public Object deleteUser(

            @PathVariable Long id
    ) {

        return US.deleteUser(id);
    }
}