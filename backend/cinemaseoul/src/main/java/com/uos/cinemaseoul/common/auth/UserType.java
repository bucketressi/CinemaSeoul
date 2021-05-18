package com.uos.cinemaseoul.common.auth;

public enum UserType {
    USERS{
        @Override
        public String toString(){
            return "U";
        }
    },
    ADMIN{
        @Override
        public String toString(){
            return "A";
        }
    }
}
