package com.uos.cinemaseoul.controller.movie;

import com.uos.cinemaseoul.common.paging.Criteria;
import com.uos.cinemaseoul.dto.movie.people.PeopleDto;
import com.uos.cinemaseoul.service.movie.PeopleService;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Required;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequiredArgsConstructor
public class PeopleController {

    private final PeopleService peopleService;

    @PostMapping("/people/search")
    public ResponseEntity<?> getPeopleSearchList(@RequestBody Map<String, String> map){
        return ResponseEntity.ok(peopleService.getPeopleSearchList(map.get("peop_name")));
    }

    @GetMapping("/people/{peop_id}")
    public ResponseEntity<?> getPeopleDetail(@PathVariable(name = "peop_id") int peop_id){
        return ResponseEntity.ok(peopleService.getPeopleDetail(peop_id));
    }

    @PostMapping("/people/list")
    public ResponseEntity<?> getPeopleList(@RequestBody Criteria criteria){
        return ResponseEntity.ok(peopleService.getPeopleList(criteria));
    }

    @PostMapping("/people/add")
    public void addPeople(@RequestBody PeopleDto peopleDto){
        peopleService.addPeople(peopleDto);
    }
    @PutMapping("/people")
    public void updatePeople(@RequestBody PeopleDto peopleDto){
        peopleService.updatePeople(peopleDto);
    }

    @PutMapping("/people/image")
    public void updatePeopleImage(@RequestBody PeopleDto peopleDto){
        peopleService.updatePeopleImage(peopleDto);
    }
    @DeleteMapping("/people/delete/{peop_id}")
    public void deletePeople(@PathVariable(name = "peop_id") int peop_id){
        peopleService.deletePeople(peop_id);
    }
}
