package com.uos.cinemaseoul.common.constatnt;

import com.uos.cinemaseoul.dao.code.CodeDao;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.PostConstruct;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

@Component
@RequiredArgsConstructor
public class ConstantTable {
    public static String USER_AUTH_MEMBER = "100001";
    public static String USER_AUTH_NONMEMBER = "100002" ;
    public static String POINT_CODE_ADD;
    public static String POINT_CODE_USE;
    public static String POINT_CODE_NOTADD;
    public static String POINT_CODE_NOTUSE;

    public static String SEAT_TYPE_OK;
    public static String SEAT_TYPE_DISABLED;

    public static HashMap<String, List<CodeVo>> codeMap = new HashMap<>();
    public static List<MessageVo> message = new ArrayList<>();

    private final ConstantService constantService;

    @PostConstruct
    public void init(){
        constantService.initCode();
        constantService.initMessage();
        constantService.initCodeStat();
    }


    @Component
    @Transactional
    @RequiredArgsConstructor
    static class ConstantService{

        private final CodeDao codeDao;

        public void initMessage(){
            message = codeDao.getMessage();
        }

        public void initCode(){
            List<CodeVo> codes = codeDao.getCode();
            List<CodeVo> parentList = new ArrayList<>();
            List<CodeVo> childList = new ArrayList<>();
            String key;

            for (CodeVo v: codes) {
                //부모타입
                if(v.getParent_code() == null){
                    parentList.add(v);
                    key = v.getCode_name();
                    childList = new ArrayList<>();
                    codeMap.put(key, childList);
                }
                //자식타입입
                else{
                    childList.add(v);
                }
            }
        }

        public void initCodeStat(){
            List<CodeVo> code = codeMap.get("이용자권한구분");
            USER_AUTH_MEMBER = code.get(0).getCode_id();
            USER_AUTH_NONMEMBER = code.get(1).getCode_id();

            code = codeMap.get("포인트구분");
            POINT_CODE_ADD = code.get(0).getCode_id();
            POINT_CODE_USE = code.get(1).getCode_id();
            POINT_CODE_NOTADD = code.get(2).getCode_id();
            POINT_CODE_NOTUSE = code.get(3).getCode_id();

            code = codeMap.get("좌석구분");
            SEAT_TYPE_OK = code.get(0).getCode_id();
            SEAT_TYPE_DISABLED = code.get(1).getCode_id();
        }
    }
}
