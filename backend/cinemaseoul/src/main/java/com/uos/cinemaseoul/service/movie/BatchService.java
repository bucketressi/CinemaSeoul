package com.uos.cinemaseoul.service.movie;

import com.uos.cinemaseoul.dao.movie.BatchDao;
import com.uos.cinemaseoul.dto.movie.batch.*;
import com.uos.cinemaseoul.vo.movie.SalesVo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class BatchService {

    private final BatchDao batchDao;

    @Transactional
    //매일 새벽 1시에 업데이트, server zone = Asia/Seoul
    //@Scheduled(cron = "0 0 1 * * *", zone = "Asia/Seoul")
    public void updateAudience(){
        //어제 날짜 획득
       String yesterday = LocalDateTime.now().minusDays(1).format(DateTimeFormatter.ofPattern("yyyyMMdd"));
       System.out.println(yesterday);
       List<Integer> moviId = batchDao.getMovies(yesterday);

       if(moviId != null){
           batchDao.insertAudience(yesterday, moviId);

           //영화목록 업데이트
           for (Integer i: moviId) {
               batchDao.updateAudienceMovies(i);
           }
       }
    }

    @Transactional
    //매일 새벽 1시에 업데이트, server zone = Asia/Seoul
    //@Scheduled(cron = "0 0 1 * * *", zone = "Asia/Seoul")
    public void updateSales(){

        //어제 날짜 획득
        String yesterday = LocalDateTime.now().minusDays(1).format(DateTimeFormatter.ofPattern("yyyyMMdd"));
        SalesVo vo = batchDao.selectSales(yesterday);
        updateSalesRule(vo,yesterday);
    }

    @Transactional
    //관람객 수 받아오기
    public AudienceRecordSumDto getAudience(DateRangeDto dateRange){
        AudienceRecordSumDto audienceRecordSumDto = new AudienceRecordSumDto();
        List<AudienceRecordDto> ardto = batchDao.selectAudienceTotal(dateRange)
                .stream().map(
                o -> new AudienceRecordDto(o.getReco_date(), o.getAudi_amount()))
                .collect(Collectors.toList());

        //마지막이 소계
        audienceRecordSumDto.setSum(ardto.get(ardto.size()-1).getAudi_amount());
        ardto.remove(ardto.size()-1);
        audienceRecordSumDto.setRecords(ardto);

        return audienceRecordSumDto;
    }

    @Transactional
    //매출 받아오기
    public SalesSumDto getSales(DateRangeDto dateRangeDto){
        SalesSumDto salesSumDto = new SalesSumDto();
        List<SalesDto> sadto = batchDao.selectSalesTotal(dateRangeDto)
                .stream().map(
                        o -> new SalesDto(o.getSale_date(), o.getMovi_sales(), o.getProd_sales(), o.getTota_sales()))
                .collect(Collectors.toList());

        //마지막이 소계
        salesSumDto.setMovi_total(sadto.get(sadto.size()-1).getMovi_sale());
        salesSumDto.setProd_total(sadto.get(sadto.size()-1).getProd_sale());
        salesSumDto.setTotal_sum(sadto.get(sadto.size()-1).getTotal_sale());
        sadto.remove(sadto.size()-1);
        salesSumDto.setSales(sadto);

        return salesSumDto;
    }

    @Transactional
    public void updateSalesToday() {
        //오늘 날짜 획득
        String yesterday = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyyMMdd"));
        SalesVo vo = batchDao.selectSales(yesterday);
        updateSalesRule(vo,yesterday);

    }

    @Transactional
    public void updateSalesRule(SalesVo vo, String yesterday){
        //최초
        if(vo == null){
            batchDao.insertSales(yesterday);
        }
        //update
        else{
            batchDao.updateSales(yesterday);
        }
        batchDao.updateTotal(yesterday);
    }
}
