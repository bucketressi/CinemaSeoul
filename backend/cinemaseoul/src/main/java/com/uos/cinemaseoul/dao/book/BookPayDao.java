package com.uos.cinemaseoul.dao.book;

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
    String getUserCode(int user_id);
    void insertBookPay(BookPayVo bookPayVo);
    void insertBook(BookVo bookVo);
    void insertBookSeats(List<BookSeatDto> seatDtos);

    //취소정보 -> 취소로 변경
    BookPayVo getCancelInfo(int book_id);
    void setCancel(int book_id, String pay_state_cancel);


}
