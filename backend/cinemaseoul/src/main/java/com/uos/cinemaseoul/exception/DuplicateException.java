package com.uos.cinemaseoul.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.UNAUTHORIZED)
public class DuplicateException extends RuntimeException{
    public DuplicateException(){
        super();
    }
}
