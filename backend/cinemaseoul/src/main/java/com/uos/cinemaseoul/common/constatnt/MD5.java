package com.uos.cinemaseoul.common.constatnt;

import java.math.BigInteger;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

public class MD5 {
    public static String makeCode(String input){
        String code = null;
        try {
            MessageDigest msg = MessageDigest.getInstance("MD5");
            msg.update(input.getBytes(StandardCharsets.UTF_8), 0, input.length());
            code = new BigInteger(1, msg.digest()).toString(16).substring(0,16);
        } catch (NoSuchAlgorithmException e) {
            e.printStackTrace();
        }
        return code;
    }
}
