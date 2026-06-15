package kth.services;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import kth.models.issues;
import kth.models.users;
import kth.repository.issuesRepository;
import kth.repository.statusRepository;
import kth.repository.usersRepository;

@Service
public class userService {

    @Autowired
    usersRepository UR;

    @Autowired
    issuesRepository IR;

    @Autowired
    statusRepository SR;

    @Autowired
    jwtService JWT;

    // SIGNUP
    public Object signup(users U) {

        Map<String, Object> response =
                new HashMap<>();

        try {

            users existingUser =
                    UR.findByEmail(
                            U.getEmail()
                    );

            if(existingUser != null) {

                response.put(
                        "code",
                        501
                );

                response.put(
                        "message",
                        "Email already registered"
                );

            } else {

                // DEFAULT ROLE
                U.setRole("USER");

                UR.save(U);

                response.put(
                        "code",
                        200
                );

                response.put(
                        "message",
                        "Signup successful"
                );

                response.put(
                        "user",
                        U
                );
            }

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

    // SIGNIN
    public Object signin(
            Map<String, Object> data
    ) {

        Map<String, Object> response =
                new HashMap<>();

        try {

            String email =
                    data.get("email")
                            .toString();

            String password =
                    data.get("password")
                            .toString();

            users U =
                    UR.findByEmail(email);

            if(

                    U != null &&

                    U.getPassword()
                            .equals(password)

            ) {

                String token =
                        JWT.generateJWT(

                                email,

                                U.getRole()
                        );

                response.put(
                        "code",
                        200
                );

                response.put(
                        "message",
                        "Login Successful"
                );

                response.put(
                        "jwt",
                        token
                );

                response.put(
                        "user",
                        U
                );

            } else {

                response.put(
                        "code",
                        404
                );

                response.put(
                        "message",
                        "Invalid Credentials"
                );
            }

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

    // USER INFO
    public Object uinfo(
            String token
    ) {

        Map<String, Object> response =
                new HashMap<>();

        try {

            Map<String, Object> payload =
                    JWT.validateJWT(token);

            String email =
                    payload.get("email")
                            .toString();

            users U =
                    UR.findByEmail(email);

            response.put(
                    "code",
                    200
            );

            response.put(
                    "user",
                    U
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

    // PROFILE
    public Object profile(
            String token
    ) {

        return uinfo(token);
    }

    // GET ALL USERS
    public Object getAllUsers() {

        Map<String, Object> response =
                new HashMap<>();

        try {

            List<users> usersList =
                    UR.findAll();

            response.put(
                    "code",
                    200
            );

            response.put(
                    "users",
                    usersList
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

    // DELETE USER
    @Transactional
    public Object deleteUser(
            Long id
    ) {

        Map<String, Object> response =
                new HashMap<>();

        try {

            if(!UR.existsById(id)) {

                response.put(
                        "code",
                        404
                );

                response.put(
                        "message",
                        "User Not Found"
                );

                return response;
            }

            List<issues> userIssues =
                    IR.findByCreatedBy(id);

            for(issues issue : userIssues) {

                SR.deleteByIssueId(
                        issue.getId()
                );
            }

            IR.deleteByCreatedBy(id);

            UR.deleteById(id);

            response.put(
                    "code",
                    200
            );

            response.put(
                    "message",
                    "User Deleted Successfully"
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
