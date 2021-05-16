package com.uos.cinemaseoul.controller.movie;

import com.uos.cinemaseoul.dto.movie.InsertMovieDto;
import com.uos.cinemaseoul.dto.movie.UpdateMovieDto;
import com.uos.cinemaseoul.service.movie.MovieService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "/movie")
@RequiredArgsConstructor
public class MovieController {

    private final MovieService movieService;

    @PostMapping("/add")
    public void insertMovie(@RequestBody InsertMovieDto iMDto){
        movieService.insertMovie(iMDto);
    }

    @DeleteMapping("/{movi_id}")
    public void deleteMovie(@PathVariable int movi_id){
        movieService.deleteMovie(movi_id);
    }

    @PutMapping("/update")
    public void updateMovie(@RequestBody UpdateMovieDto uMDto){
        movieService.updateMovie(uMDto);
    }
}
