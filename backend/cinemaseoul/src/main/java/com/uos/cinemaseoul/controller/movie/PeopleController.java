package com.uos.cinemaseoul.controller.movie;

import com.uos.cinemaseoul.common.paging.Criteria;
import com.uos.cinemaseoul.dto.movie.people.PeopleDto;
import com.uos.cinemaseoul.service.movie.PeopleService;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Required;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;

@RestController
@RequiredArgsConstructor
public class PeopleController {

    private final PeopleService peopleService;

    @PostMapping("/people/search")
    public ResponseEntity<?> getPeopleSearchList(@RequestBody Map<String, String> map){
        return ResponseEntity.ok(peopleService.getPeopleSearchList(map.get("peop_name")));
    }

    @GetMapping("/people/select/{peop_id}")
    public ResponseEntity<?> getPeopleDetail(@PathVariable(name = "peop_id") int peop_id){
        return ResponseEntity.ok(peopleService.getPeopleDetail(peop_id));
    }

    @PostMapping("/people/list")
    public ResponseEntity<?> getPeopleList(@RequestBody Criteria criteria){
        return ResponseEntity.ok(peopleService.getPeopleList(criteria));
    }

    @RequestMapping(path = "/people/add", method = RequestMethod.POST, consumes = "multipart/form-data")
    public void addPeople(@RequestPart("people") PeopleDto peopleDto,
                          @RequestPart(value = "image", required = false) MultipartFile image) throws IOException {
        if(image != null){
            peopleDto.setImage(image.getBytes());
        }
        peopleService.addPeople(peopleDto);
    }
    @PutMapping("/people/update")
    public void updatePeople(@RequestBody PeopleDto peopleDto){
        peopleService.updatePeople(peopleDto);
    }

    @RequestMapping(path = "/people/image/{peop_id}",  method = RequestMethod.PUT,consumes = "multipart/form-data")
    public void updatePeopleImage(@PathVariable(name = "peop_id") int peop_id
            ,@RequestPart(value = "image", required = false) MultipartFile image) throws IOException {

        PeopleDto peopleDto = new PeopleDto();
        peopleDto.setPeop_id(peop_id);
        peopleDto.setImage(image.getBytes());

        peopleService.updatePeopleImage(peopleDto);
    }
    @DeleteMapping("/people/delete/{peop_id}")
    public void deletePeople(@PathVariable(name = "peop_id") int peop_id){
        peopleService.deletePeople(peop_id);
    }
}
