package com.uos.cinemaseoul.controller.movie;

import com.uos.cinemaseoul.common.constatnt.CodeVo;
import com.uos.cinemaseoul.common.constatnt.ConstantTable;
import com.uos.cinemaseoul.common.paging.MovieCriteria;
import com.uos.cinemaseoul.common.paging.MovieSearchCriteria;
import com.uos.cinemaseoul.dto.movie.InsertMovieDto;
import com.uos.cinemaseoul.dto.movie.MovieListDto;
import com.uos.cinemaseoul.dto.movie.SelectMovieDto;
import com.uos.cinemaseoul.dto.movie.UpdateMovieDto;
import com.uos.cinemaseoul.service.movie.MovieService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/movie")
@RequiredArgsConstructor
public class MovieController {

    private final MovieService movieService;
    private final ConstantTable constantTable;

    @PostMapping("/add")
    public void insertMovie(@RequestBody InsertMovieDto iMDto){
        movieService.insertMovie(iMDto);
    }

    @DeleteMapping("/delete")
    public void deleteMovie(@ModelAttribute(name = "movi_id") int movi_id){
        movieService.deleteMovie(movi_id);
    }

    @PutMapping("/update")
    public void updateMovie(@RequestBody UpdateMovieDto uMDto){
        movieService.updateMovie(uMDto);
    }

    @PutMapping("/update/image")
    public void updateMovieImage(@ModelAttribute(name = "movi_id") int movi_id, @ModelAttribute(name = "image") byte[] image){
        movieService.updateMovieImage(movi_id, image);
    }

    @GetMapping("/{movi_id}")
    public ResponseEntity<?> selectMovie(@PathVariable int movi_id){
        SelectMovieDto sMDto = movieService.selectMovie(movi_id);
        return ResponseEntity.ok(sMDto);
    }

    @PostMapping("/search")
    public ResponseEntity<?> searchMovie(@RequestBody MovieSearchCriteria movieSearchCriteria){
        MovieListDto movieListDto = movieService.searchMovie(movieSearchCriteria);
        return ResponseEntity.ok(movieListDto);
    }

    @PostMapping("/list")
    public ResponseEntity<?> selectMovieList(@RequestBody MovieCriteria movieCriteria){
        MovieListDto movieListDto = movieService.selectMovieList(movieCriteria);
        return ResponseEntity.ok(movieListDto);
    }

    @GetMapping("/genre/list")
    public ResponseEntity<?> selectGenreList(){
        List<CodeVo> genre = constantTable.codeMap.get("장르구분");
        return ResponseEntity.ok(genre);
    }
}
