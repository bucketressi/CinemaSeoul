package com.uos.cinemaseoul.service.common;

import com.uos.cinemaseoul.common.constatnt.ConstantTable;
import com.uos.cinemaseoul.dao.code.CodeDao;
import com.uos.cinemaseoul.vo.common.CodeVo;
import com.uos.cinemaseoul.vo.common.MessageVo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CodeService {
    private final CodeDao codeDao;
    private final ConstantTable constantTable;

    public List<CodeVo> getCode(){
        return codeDao.getCode(null);
    }

    public List<CodeVo> getGenre(){
        String parent_code = ConstantTable.parentMap.get("장르 구분").getCode_id();
        return codeDao.getCode(parent_code);
    }

    public List<MessageVo> getMessage(){
        return codeDao.getMessage();
    }

}
