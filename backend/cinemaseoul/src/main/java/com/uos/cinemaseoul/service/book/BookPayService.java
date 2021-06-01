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

    @Transactional
    public BookPayIdDto payBook(BookPayInsertDto bookPayInsertDto) {

        if(bookPayInsertDto.getSeat_list().size() != bookPayInsertDto.getTeen() + bookPayInsertDto.getAdult() + bookPayInsertDto.getSenior() + bookPayInsertDto.getImpaired()){
            throw new WrongArgException("Disappeared Seat");
        }

        BookPayVo bookPayVo;
        int pointRatio = 0;

        try{
            //유저등급에 따라 적립포인트 다름
            String user_code = bookPayDao.getUserCode(bookPayInsertDto.getUser_id());
            pointRatio = ConstantTable.getPointRatio(user_code);
            bookPayInsertDto.setAccu_point(bookPayInsertDto.getPrice()  * pointRatio / 100);

            //시스템의 나노초로 사용코드 발급
            bookPayInsertDto.setUse_code(MD5.makeCode(Long.toString(System.nanoTime())));

            //예매 결제 insert
            bookPayVo = bookPayMapper.insertIntoBookPayVoByBookInsertDto(bookPayInsertDto);
            bookPayDao.insertBookPay(bookPayVo);
        }

        //만약 에러 발생시 (충돌시) 처음부터 다시 한번 더
        catch (Exception e){
            //시스템의 나노초로 사용코드 발급
            bookPayInsertDto.setUse_code(MD5.makeCode(Long.toString(System.nanoTime())));

            //예매 결제 insert
            bookPayVo = bookPayMapper.insertIntoBookPayVoByBookInsertDto(bookPayInsertDto);
            bookPayDao.insertBookPay(bookPayVo);
        }

        //포인트 사용했으면, 사용한 것도 추가
        if(bookPayInsertDto.getAccu_point() != 0){
            PointVo pointVo = PointVo.builder()
                    .user_id(bookPayInsertDto.getUser_id())
                    .poin_amount(bookPayInsertDto.getAccu_point())
                    .poin_type_code(ConstantTable.POINT_CODE_USE)
                    .message("영화 예매 시 "+bookPayInsertDto.getAccu_point()+"포인트 사용")
                    .build();

            pointDao.updatePoint(pointVo);
            pointDao.minusUserPoint(pointVo);
        }

        //결제 금액이 있으면 추가
        if(bookPayInsertDto.getPrice() > 0){
            PointVo pointVo = PointVo.builder()
                    .user_id(bookPayInsertDto.getUser_id())
                    .poin_amount(bookPayInsertDto.getAccu_point())
                    .poin_type_code(ConstantTable.POINT_CODE_ADD)
                    .message("영화 예매로 인한 "+bookPayInsertDto.getPrice()+"원 결제, 회원등급에 따라 "+pointRatio+"% 적립")
                    .build();
            pointDao.updatePoint(pointVo);
            pointDao.plusUserPoint(pointVo);
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
