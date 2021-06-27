package com.uos.cinemaseoul.service.movie;

import com.uos.cinemaseoul.common.mapper.PeopleMapper;
import com.uos.cinemaseoul.common.paging.Criteria;
import com.uos.cinemaseoul.dao.movie.PeopleDao;
import com.uos.cinemaseoul.dto.movie.people.PeopleDetailDto;
import com.uos.cinemaseoul.dto.movie.people.PeopleDto;
import com.uos.cinemaseoul.dto.movie.people.PeopleInfoDto;
import com.uos.cinemaseoul.dto.movie.people.PeopleListDto;
import com.uos.cinemaseoul.exception.NotFoundException;
import com.uos.cinemaseoul.exception.WrongArgException;
import com.uos.cinemaseoul.vo.movie.PeopleVo;
import lombok.RequiredArgsConstructor;
import org.apache.tomcat.util.codec.binary.Base64;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@Service
@RequiredArgsConstructor
public class PeopleService {

    private final PeopleDao peopleDao;
    private final PeopleMapper peopleMapper;

    @Transactional
    public List<PeopleInfoDto> getPeopleSearchList(String peop_name) {
        return peopleDao.searchPeople("%"+peop_name+"%");
    }

    @Transactional
    public PeopleDetailDto getPeopleDetail(int peop_id) {
        PeopleDetailDto peopleDetailDto = peopleDao.getPeople(peop_id);

        if(peopleDetailDto.getImage() != null){
            peopleDetailDto.setImageBase64(Base64.encodeBase64String(peopleDetailDto.getImage()));
        }

        if(peopleDetailDto != null){
            peopleDetailDto.setMovies(peopleDao.getCastMovies(peop_id));
        }else{
            throw new NotFoundException("No People");
        }

        return peopleDetailDto;
    }

    @Transactional
    public PeopleListDto getPeopleList(Criteria criteria) {
        PeopleListDto peopleListDto = new PeopleListDto();

        //페이지 계산
        int totalCount = peopleDao.countList(criteria);
        int totalPage =  totalCount / criteria.getAmount();
        if(totalCount % criteria.getAmount() > 0){
            totalPage++;
        }
        peopleListDto.setPeop_list(peopleDao.getPeopleList(criteria));
        peopleListDto.setPageInfo(totalPage, criteria.getPage(), criteria.getAmount());
        return peopleListDto;
    }

    @Transactional
    public void addPeople(PeopleDto peopleDto){
        peopleDao.insertPeople(peopleMapper.insertPeopleVoFromPeopleDto(peopleDto));
    }

    @Transactional
    public void deletePeople(int peop_id){
        if(peopleDao.deletePeople(peop_id) > 1){
            throw new WrongArgException("Too much Deleted");
        }
    }

    @Transactional
    public void updatePeopleImage(PeopleDto peopleDto){
        if(peopleDao.updatePeopleImage(peopleMapper.insertPeopleVoFromPeopleDto(peopleDto)) > 1){
            throw new WrongArgException("Too much Updated");
        }
    }


    @Transactional
    public void updatePeople(PeopleDto peopleDto){
        PeopleVo peopleVo = peopleMapper.insertPeopleVoFromPeopleDto(peopleDto);
        String pastName = peopleDao.getPeople(peopleVo.getPeop_id()).getPeop_name();

        if(peopleDao.updatePeople(peopleVo) > 1){
            throw new WrongArgException("Too much Updated");
        }
        //이름이 변경되었으면, 참조무결성을 위해 Casting의 이름들도 다 변경
        if(peopleVo.getPeop_name() != pastName){
            peopleDao.updateCasting(peopleVo);
        }

    }
}
