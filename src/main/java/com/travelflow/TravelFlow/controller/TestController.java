package com.travelflow.TravelFlow.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TestController {

    @GetMapping("/api/test")
    public String test() {
        return "TravelFlow Backend is Running";
    }

    @GetMapping("/api/protected")
    public String protectedApi() {
        return "JWT Authentication Successful";
    }
}