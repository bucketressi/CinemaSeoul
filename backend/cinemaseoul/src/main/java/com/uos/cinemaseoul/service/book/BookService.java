package com.uos.cinemaseoul.service.book;

import com.uos.cinemaseoul.common.constatnt.ConstantTable;
import com.uos.cinemaseoul.common.paging.BookSearchCriteria;
import com.uos.cinemaseoul.dao.book.BookDao;
import com.uos.cinemaseoul.dao.book.BookPayDao;
import com.uos.cinemaseoul.dao.user.PointDao;
import com.uos.cinemaseoul.dto.book.book.*;
import com.uos.cinemaseoul.exception.NotFoundException;
import com.uos.cinemaseoul.service.user.PointService;
import com.uos.cinemaseoul.vo.book.BookPayVo;
import com.uos.cinemaseoul.vo.user.PointVo;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@AllArgsConstructor
public class BookService {
    private final BookDao bookDao;
    private final BookPayDao bookPayDao;
    private final PointDao pointDao;
    private final PointService pointService;

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

        if(seat_list == null){
            throw new NotFoundException("No showschedule");
        }

        //리스트는 순서대로 오리라 가정
        for(ShowScheduleSeatDto b : book_seat_list){
            seat_list.get(b.getSeat_num()).setBooked(true);
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

        //결제ID, 사용 포인트, 적립 포인트 받아오기
        BookPayVo bookPayVo = bookPayDao.getCancelInfo(book_id);

        //결제 취소로 변경
        bookPayDao.setCancel(bookPayVo.getBook_pay_id(), ConstantTable.PAY_STAT_CANCEL);


        //사용 포인트가 있으면
        if(bookPayVo.getUse_point() > 0){
            pointService.updatePoint(bookPayVo.getUser_id(),
                    bookPayVo.getUse_point(),
                    ConstantTable.POINT_CODE_NOTUSE,
                    "예매 취소로 인한 사용 포인트 재적립");
        }

        //
        if(bookPayVo.getAccu_point() > 0){
            pointService.updatePoint(bookPayVo.getUser_id(),
                    bookPayVo.getAccu_point(),
                    ConstantTable.POINT_CODE_NOTADD,
                    "예매 취소로 인한 적립 포인트 취소");
        }

        //삭제
        bookDao.cancel(book_id);
    }

    @Transactional
    public BookListDto getBookList(BookSearchCriteria bookSearchCriteria) {
        BookListDto bookListDto = new BookListDto();

        //페이지 계산
        int totalCount = bookDao.countList(bookSearchCriteria);
        int totalPage =  totalCount / bookSearchCriteria.getAmount();
        if(totalCount % bookSearchCriteria.getAmount() > 0){
            totalPage++;
        }
        bookListDto.setBookrecord_list(bookDao.selectBookList(bookSearchCriteria));
        bookListDto.setPageInfo(totalPage, bookSearchCriteria.getPage(), bookSearchCriteria.getAmount());

        return bookListDto;
    }
}
