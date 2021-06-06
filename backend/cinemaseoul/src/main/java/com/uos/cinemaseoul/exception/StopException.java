package com.uos.cinemaseoul.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.PAYMENT_REQUIRED)
public class StopException extends RuntimeException{
    public StopException(String msg){
        super(msg);
    }
}
