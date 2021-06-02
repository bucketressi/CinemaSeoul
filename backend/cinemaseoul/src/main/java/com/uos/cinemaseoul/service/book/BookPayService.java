package com.uos.cinemaseoul.service.book;

import com.uos.cinemaseoul.common.constatnt.ConstantTable;
import com.uos.cinemaseoul.common.constatnt.MD5;
import com.uos.cinemaseoul.common.mapper.BookPayMapper;
import com.uos.cinemaseoul.dao.book.BookPayDao;
import com.uos.cinemaseoul.dao.user.PointDao;
import com.uos.cinemaseoul.dto.book.bookpay.BookPayIdDto;
import com.uos.cinemaseoul.dto.book.bookpay.BookPayInsertDto;
import com.uos.cinemaseoul.dto.book.bookpay.BookSeatDto;
import com.uos.cinemaseoul.exception.WrongArgException;
import com.uos.cinemaseoul.service.user.PointService;
import com.uos.cinemaseoul.vo.book.BookPayVo;
import com.uos.cinemaseoul.vo.book.BookVo;
import com.uos.cinemaseoul.vo.user.PointVo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class BookPayService {

    private final BookPayDao bookPayDao;
    private final BookPayMapper bookPayMapper;
    private final PointDao pointDao;
    private final PointService pointService;

    @Transactional
    public BookPayIdDto payBook(BookPayInsertDto bookPayInsertDto) {

        if(bookPayInsertDto.getSeat_list().size() != bookPayInsertDto.getTeen() + bookPayInsertDto.getAdult() + bookPayInsertDto.getSenior() + bookPayInsertDto.getImpaired()){
            throw new WrongArgException("Disappeared Seat");
        }

        BookPayVo bookPayVo = bookPayMapper.insertIntoBookPayVoByBookInsertDto(bookPayInsertDto);
        int pointRatio = 0;

        //유저등급에 따라 적립포인트 다름
        String user_code = pointDao.getUserCode(bookPayInsertDto.getUser_id());
        pointRatio = ConstantTable.getPointRatio(user_code);
        bookPayVo.calAccu_point(pointRatio);

        try{
            //시스템의 나노초로 사용코드 발급
            bookPayVo.createCode(MD5.makeCode(Long.toString(System.nanoTime())));
            //예매 결제 insert
            bookPayDao.insertBookPay(bookPayVo);
        }
        //만약 에러 발생시 (충돌시) 다시 한번 더
        catch (Exception e){
            bookPayVo.createCode(MD5.makeCode(Long.toString(System.nanoTime())));
            bookPayDao.insertBookPay(bookPayVo);
        }

        //포인트 사용했으면, 사용한 것도 추가
        if(bookPayVo.getAccu_point() != 0){
            pointService.updatePoint(bookPayVo.getUser_id(),
                    bookPayVo.getUse_point(),
                    ConstantTable.POINT_CODE_USE,
                    "영화 예매 시 "+bookPayVo.getAccu_point()+"포인트 사용");
        }

        //결제 금액이 있으면 추가
        if(bookPayVo.getPrice() > 0){
            pointService.updatePoint(bookPayVo.getUser_id(),
                    bookPayVo.getAccu_point(),
                    ConstantTable.POINT_CODE_ADD,
                    "영화 예매로 인한 "+bookPayVo.getPrice()+"원 결제, 회원등급에 따라 "+pointRatio+"% 적립");
        }

        //예매 insert
        BookVo bookVo = bookPayMapper.insertIntoBookVoByBookInsertDto(bookPayInsertDto);
        bookVo.setBook_pay_id(bookPayVo.getBook_pay_id());
        bookPayDao.insertBook(bookVo);

        //예매좌석 insert
        List<BookSeatDto> seatDtos = new ArrayList<>();
        for(Integer i : bookPayInsertDto.getSeat_list()){
            seatDtos.add(new BookSeatDto(bookVo.getBook_id(), bookPayInsertDto.getHall_id(), i, bookPayInsertDto.getShow_id()));
        }
        bookPayDao.insertBookSeats(seatDtos);

        return new BookPayIdDto(bookVo.getBook_id(), bookPayVo.getBook_pay_id());
    }
}
