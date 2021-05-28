package com.uos.cinemaseoul.service.book;

import com.uos.cinemaseoul.dao.book.BookDao;
import com.uos.cinemaseoul.dto.book.book.*;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@AllArgsConstructor
public class BookService {
    private final BookDao bookDao;

    @Transactional
    public List<MovieShortCutDto> getBookAvailableMovie() {
        return bookDao.getBookAvailableMovie();
    }

    @Transactional
    public List<ShowScheduleFromDateMovieDto> getScheduleFromMoviDate(ScheduleAskDto sADto) {
        return bookDao.getScheduleFromMoviDate(sADto);
    }

    @Transactional
    public List<ShowScheduleSeatDto> getSeatFromShowSchedule(int show_id) {
        List<ShowScheduleSeatDto> seat_list = bookDao.getShowScheduleSeat(show_id);
        List<ShowScheduleSeatDto> book_seat_list = bookDao.getBookedSeat(show_id);
        //리스트는 순서대로 오리라 가정
        for(ShowScheduleSeatDto b : book_seat_list){
            seat_list.get(b.getSeat_num()).set_booked(true);
        }

        return seat_list;
    }
    @Transactional
    public BookDto getBook(int book_id) {
        BookDto bookDto = bookDao.getBookInfo(book_id);
        bookDto.setSeat_num(bookDao.getMyBookedSeat(bookDto.getBook_id()));
        return bookDto;
    }

    @Transactional
    public void cancelBook(int book_id) {
        bookDao.cancel(book_id);
    }
}
