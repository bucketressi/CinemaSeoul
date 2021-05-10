package com.uos.cinemaseoul.common.auth;

public enum UserType {
    USERS{
        @Override
        public String toString(){
            return "USERS";
        }
    },
    ADMIN{
        @Override
        public String toString(){
            return "ADMIN";
        }
    }
}
