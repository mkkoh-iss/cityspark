package com.dmss.citysparkapplication.controller;

import com.dmss.citysparkapplication.dto.UserDTO;
import com.dmss.citysparkapplication.model.User;
import com.dmss.citysparkapplication.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@CrossOrigin(exposedHeaders = {"Access-Control-Allow-Origin","Access-Control-Allow-Credentials"})
@RequestMapping("/cityspark/user")
public class UserController {
    private final static Logger log = LoggerFactory.getLogger(PersonController.class);

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    UserService userService;

    @GetMapping("/{email}")
    public User getUserByEmail(@PathVariable String email) {
        return userService.getUserByEmail(email).orElse(null);
    }

    @PostMapping("/create")
    public ResponseEntity<?> createUser(@RequestBody UserDTO user) {
        boolean success = userService.createUser(user);
        if (success) {
            return ResponseEntity.ok().body(Map.of("message", "User created successfully"));
        }
        return ResponseEntity.badRequest().body(Map.of("message", "Failed to create user"));
    }

    @PostMapping("/auth")
    public ResponseEntity<?> authenticateUser(@RequestBody UserDTO user) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(user.getEmail(), user.getPassword())
            );
            SecurityContextHolder.getContext().setAuthentication(authentication);
            
            User authenticatedUser = userService.getUserByEmail(user.getEmail()).orElse(null);
            if (authenticatedUser != null) {
                Map<String, Object> response = new HashMap<>();
                response.put("message", "User authenticated");
                response.put("user", Map.of(
                    "id", authenticatedUser.getId(),
                    "email", authenticatedUser.getEmail(),
                    "createdDate", authenticatedUser.getCreatedDate()
                ));
                return ResponseEntity.ok(response);
            }
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("message", "User not found"));
        } catch (AuthenticationException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("message", "Authentication failed"));
        }
    }
}
