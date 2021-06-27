package com.uos.cinemaseoul.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

//405
@ResponseStatus(HttpStatus.METHOD_NOT_ALLOWED)
public class NotAllowedException extends RuntimeException{
    public NotAllowedException(){super();}
    public NotAllowedException(String msg){
        super(msg);
    }
}
