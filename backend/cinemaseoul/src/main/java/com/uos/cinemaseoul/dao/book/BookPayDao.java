package com.uos.cinemaseoul.dao.book;

import com.uos.cinemaseoul.common.paging.PayListCriteria;
import com.uos.cinemaseoul.dto.book.bookpay.BookPayInfoDto;
import com.uos.cinemaseoul.dto.book.bookpay.BookSeatDto;
import com.uos.cinemaseoul.vo.book.BookPayVo;
import com.uos.cinemaseoul.vo.book.BookVo;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@Mapper
public interface BookPayDao {

    //예매 과정
    void insertBookPay(BookPayVo bookPayVo);
    void insertBook(BookVo bookVo);
    void insertBookSeats(List<BookSeatDto> seatDtos);

    //취소정보 -> 취소로 변경
    BookPayVo getCancelInfo(int book_id);
    void setCancel(int book_pay_id, String pay_state_cancel);

    //코드 사용
    BookPayVo selectBookPay(String use_code);
    void useCode(String use_code, String pay_state_fin);

    //결제내역 조회
    int countList(PayListCriteria payListCriteria);
    List<BookPayInfoDto> selectBookPayList(PayListCriteria payListCriteria);
}
