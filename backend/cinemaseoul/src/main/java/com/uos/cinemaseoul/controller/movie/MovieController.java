package com.uos.cinemaseoul.controller.movie;

import com.uos.cinemaseoul.vo.common.CodeVo;
import com.uos.cinemaseoul.common.constatnt.ConstantTable;
import com.uos.cinemaseoul.common.paging.MovieCriteria;
import com.uos.cinemaseoul.common.paging.MovieSearchCriteria;
import com.uos.cinemaseoul.dto.movie.*;
import com.uos.cinemaseoul.service.movie.MovieService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping(value = "/movie")
@RequiredArgsConstructor
public class MovieController {

    private final MovieService movieService;
    private final ConstantTable constantTable;

    @PostMapping("/add")
    public ResponseEntity<?> insertMovie(@RequestBody InsertMovieDto iMDto){
        return ResponseEntity.ok(movieService.insertMovie(iMDto));
    }

    @PostMapping("/updateGenre")
    public void insertMovie(@RequestBody InsertGenreDto iMDto){
        movieService.updateMovieGenre(iMDto);
    }

    @PostMapping("/updateCast")
    public void insertMovie(@RequestBody InsertCastDto iMDto){
        movieService.updateMovieCast(iMDto);
    }

    @DeleteMapping("/delete")
    public void deleteMovie( @RequestBody Map<String, Integer> map){
        movieService.deleteMovie(map.get("movi_id"));
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
        List<CodeVo> genre = constantTable.childMap.get("장르구분");
        return ResponseEntity.ok(genre);
    }
}
