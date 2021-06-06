package com.uos.cinemaseoul.exception;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
@Slf4j
public class ExceptionController {

    //400
    @ExceptionHandler({WrongArgException.class, RuntimeException.class})
    public ResponseEntity<?> BadRequestException(final RuntimeException ex){
        return ResponseEntity.badRequest().body(ex.getMessage());
    }

    //401
    @ExceptionHandler({DuplicateException.class})
    public ResponseEntity<?> UnAuthorizedException(final DuplicateException ex){
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(ex.getMessage());
    }


    //402
    @ExceptionHandler({StopException.class})
    public ResponseEntity<?> StopException(final StopException ex){
        return ResponseEntity.status(HttpStatus.PAYMENT_REQUIRED).body(ex.getMessage());
    }

    //403
    @ExceptionHandler({BlackListException.class})
    public ResponseEntity<?> ForbiddenException(final BlackListException ex){
        return ResponseEntity.status(HttpStatus.FORBIDDEN).body(ex.getMessage());
    }

    //404
    @ExceptionHandler({NotFoundException.class})
    public ResponseEntity<?> NotFoundException(final NotFoundException ex){
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());
    }

    //405
    @ExceptionHandler({NotAllowedException.class})
    public ResponseEntity<?> NotAllowedException(final NotAllowedException ex){
        return ResponseEntity.status(HttpStatus.METHOD_NOT_ALLOWED).body(ex.getMessage());
    }

    //500
    @ExceptionHandler({Exception.class})
    public ResponseEntity<?> handleAll(final Exception ex) {
        return new ResponseEntity<>(ex.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
