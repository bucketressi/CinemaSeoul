package com.uos.cinemaseoul.dao.movie;

import com.uos.cinemaseoul.dto.movie.batch.DateRangeDto;
import com.uos.cinemaseoul.dto.movie.batch.SalesSumDto;
import com.uos.cinemaseoul.dto.movie.batch.UserTypeRecordDto;
import com.uos.cinemaseoul.vo.movie.AudienceRecordVo;
import com.uos.cinemaseoul.vo.movie.SalesVo;
import com.uos.cinemaseoul.vo.movie.UserTypeRecordVo;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@Mapper
public interface BatchDao {

    //해당일 상영 영화
    List<Integer> getMovies(String yesterday);
    //관객 insert
    void insertAudience(String yesterday, List<Integer> moviId);

    //영화별 업데이트
    void updateAudienceMovies(int movi_id);

    //등급 업데이트
    void updateUserType(int accu_point, String user_type_code);
    int countList();
    void batchInsertTypeRecord(List<UserTypeRecordVo> users);
    void resetUserPoint();

    //특정일 조회
    SalesVo selectSales(String yesterday);
    void insertSales(String yesterday);
    void updateTotal(String yesterday);
    void updateSales(String yesterday);

    //기간별 합산 관객수
    List<AudienceRecordVo> selectAudienceTotal(DateRangeDto dateRangeDto);

    List<SalesVo> selectSalesTotal(DateRangeDto dateRangeDto);


    List<UserTypeRecordVo> getUpdateTypeRecord(int page, int amount);

    //회원의 변경이력 반환
    List<UserTypeRecordDto> getUserTypeRecord(int user_id);
}
