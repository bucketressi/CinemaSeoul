package com.uos.cinemaseoul.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.FORBIDDEN)
public class BlackListException extends RuntimeException{
    public BlackListException(String message){
        super(message);
    }
}
