package com.uos.cinemaseoul.controller.book;

import com.uos.cinemaseoul.common.paging.BookSearchCriteria;
import com.uos.cinemaseoul.dto.book.book.MovieShortCutDto;
import com.uos.cinemaseoul.dto.book.book.ScheduleAskDto;
import com.uos.cinemaseoul.service.book.BookService;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/book")
@RequiredArgsConstructor
public class BookController {

    private final BookService bookService;

    @GetMapping("/movie")
    public ResponseEntity<?> getBookAvailableMovie(){
        return ResponseEntity.ok(new Movie_List(bookService.getBookAvailableMovie()));
    }

    @Getter
    static class Movie_List{
        List<?> movie_list;
        public Movie_List(List<?> list){
            this.movie_list = list;
        }
    }

    @PostMapping("/schedule")
    public ResponseEntity<?> getScheduleFromMoviDate(@RequestBody ScheduleAskDto sADto){
        return ResponseEntity.ok(new Showschedule_List(bookService.getScheduleFromMoviDate(sADto)));

    }
    @Getter
    static class Showschedule_List{
        List<?> showschedule_list;
        public Showschedule_List(List<?> list){
            this.showschedule_list = list;
        }
    }

    @GetMapping("/{show_id}/seat")
    public ResponseEntity<?> getSeatFromShowSchedule(@PathVariable(name = "show_id") int show_id){
        return ResponseEntity.ok(new Seat_List(bookService.getSeatFromShowSchedule(show_id)));
    }

    @Getter
    static class Seat_List{
        List<?> seat_list;
        public Seat_List(List<?> list){this.seat_list = list;}
    }

    @PostMapping("/list")
    public ResponseEntity<?> getBookList(@RequestBody BookSearchCriteria bookSearchCriteria){
        return ResponseEntity.ok(bookService.getBookList(bookSearchCriteria));
    }

    @GetMapping("/{book_id}")
    public ResponseEntity<?> getBook(@PathVariable(name = "book_id")int book_id){
        return ResponseEntity.ok(bookService.getBook(book_id));
    }

    @DeleteMapping("/cancel/{book_id}")
    public void cancelBook(@PathVariable(name = "book_id") int book_id){
        bookService.cancelBook(book_id);
    }


}
