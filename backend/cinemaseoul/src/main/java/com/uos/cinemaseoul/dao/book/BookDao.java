package com.uos.cinemaseoul.dao.book;

import com.uos.cinemaseoul.common.paging.BookSearchCriteria;
import com.uos.cinemaseoul.dto.book.book.*;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@Mapper
public interface BookDao {

    //가능 영화 조회
    List<MovieShortCutDto> getBookAvailableMovie();

    //영화 - 날짜의 상영일정 조회
    List<ShowScheduleFromDateMovieDto> getScheduleFromMoviDate(ScheduleAskDto sADto);

    //우선 상영관의 좌석현황 조회, 예약좌석 조회 -> 비교
    List<ShowScheduleSeatDto> getShowScheduleSeat(int show_id);
    List<ShowScheduleSeatDto> getBookedSeat(int show_id);

    //영화의 기초적인 내용 조회 -> 좌석조회
    BookDto getBookInfo(int book_id);
    int[] getMyBookedSeat(int book_id);

    //예매 취소
    void cancel(int book_id);

    //예매내역 조회
    int countList(BookSearchCriteria bookSearchCriteria);
    List<BookListInfoDto> selectBookList(BookSearchCriteria bookSearchCriteria);
}
