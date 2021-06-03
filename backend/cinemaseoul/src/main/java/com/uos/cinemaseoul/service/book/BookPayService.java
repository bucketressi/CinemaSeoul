package com.uos.cinemaseoul.service.book;

import com.uos.cinemaseoul.common.constatnt.ConstantTable;
import com.uos.cinemaseoul.common.constatnt.MD5;
import com.uos.cinemaseoul.common.mapper.BookPayMapper;
import com.uos.cinemaseoul.common.paging.PayListCriteria;
import com.uos.cinemaseoul.dao.book.BookPayDao;
import com.uos.cinemaseoul.dao.user.PointDao;
import com.uos.cinemaseoul.dto.book.bookpay.BookPayIdDto;
import com.uos.cinemaseoul.dto.book.bookpay.BookPayInsertDto;
import com.uos.cinemaseoul.dto.book.bookpay.BookPayListDto;
import com.uos.cinemaseoul.dto.book.bookpay.BookSeatDto;
import com.uos.cinemaseoul.exception.DuplicateException;
import com.uos.cinemaseoul.exception.NotAllowedException;
import com.uos.cinemaseoul.exception.NotFoundException;
import com.uos.cinemaseoul.exception.WrongArgException;
import com.uos.cinemaseoul.service.user.PointService;
import com.uos.cinemaseoul.vo.book.BookPayVo;
import com.uos.cinemaseoul.vo.book.BookVo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

import static com.uos.cinemaseoul.common.constatnt.ConstantTable.PAY_STAT_CANCEL;
import static com.uos.cinemaseoul.common.constatnt.ConstantTable.PAY_STAT_FIN;

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

        //유저등급에 따라 적립포인트 다름
        String user_code = pointDao.getUserCode(bookPayInsertDto.getUser_id());
        int pointRatio = ConstantTable.getPointRatio(user_code);
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
        if(bookPayVo.getUse_point() != 0){
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

    @Transactional
    public void useProductCode(String use_code) {
        BookPayVo vo = bookPayDao.selectBookPay(use_code);

        if(vo == null)
            throw new NotFoundException("Not founded Code");

        //이미 사용
        if(vo.getUse_datetime() != null && vo.getPay_state_code().equals(PAY_STAT_FIN))
            throw new DuplicateException("Already Used");

        //사용불가 OR 취소
        else if(vo.getPay_state_code().equals(PAY_STAT_FIN) || vo.getPay_state_code().equals(PAY_STAT_CANCEL))
            throw new NotAllowedException("Not Allowed Code");

        bookPayDao.useCode(use_code, PAY_STAT_FIN);
    }

    @Transactional
    public BookPayListDto getList(PayListCriteria payListCriteria) {
        BookPayListDto bookPayListDto = new BookPayListDto();
        //페이지 계산
        int totalCount = bookPayDao.countList(payListCriteria);
        int totalPage =  totalCount / payListCriteria.getAmount();
        if(totalCount % payListCriteria.getAmount() > 0){
            totalPage++;
        }

        bookPayListDto.setBookpayinfo(bookPayDao.selectBookPayList(payListCriteria));
        bookPayListDto.setPageInfo(totalPage, payListCriteria.getPage(), payListCriteria.getAmount());
        return bookPayListDto;
    }
}
