package com.uos.cinemaseoul.controller.interactive;

import com.uos.cinemaseoul.common.paging.Criteria;
import com.uos.cinemaseoul.dto.interactive.event.EventDto;
import com.uos.cinemaseoul.service.interactive.EventService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequiredArgsConstructor
public class EventController {

    private final EventService eventService;

    @RequestMapping(path = "/event/add", method = RequestMethod.POST, consumes = "multipart/form-data")
    public void addEvent(Authentication authentication,
                         @RequestPart("event") EventDto eventDto,
                         @RequestPart(value = "image", required = false) MultipartFile image){
        eventDto.setAdmi_id(Integer.parseInt(authentication.getName()));
        eventService.addEvent(eventDto);
    }

    @PutMapping("/event/update")
    public void updateEvent(Authentication authentication, @RequestBody EventDto eventDto){
        eventDto.setAdmi_id(Integer.parseInt(authentication.getName()));
        eventService.updateEvent(eventDto);
    }

    @RequestMapping(path = "/event/image/{event_id}", method = RequestMethod.PUT, consumes = "multipart/form-data")
    public void updateEventImage(Authentication authentication,
                                 @PathVariable(value = "event_id") int event_id,
                                 @RequestPart(value = "image", required = false) MultipartFile image) throws IOException {

        EventDto eventDto = new EventDto();
        eventDto.setEvent_id(event_id);
        eventDto.setAdmi_id(Integer.parseInt(authentication.getName()));
        if(image != null){
            eventDto.setImage(image.getBytes());
        }
        eventService.updateEventImage(eventDto);
    }

    @DeleteMapping("/event/delete/{event_id}")
    public void deleteEvent(@PathVariable(name = "event_id") int event_id){
        eventService.deleteEvent(event_id);
    }

    @PostMapping("/event/list")
    public ResponseEntity<?> getEventList(@RequestBody Criteria criteria){
        return ResponseEntity.ok(eventService.getEventList(criteria));
    }

    @GetMapping("/event/{event_id}")
    public ResponseEntity<?> getEvent(@PathVariable(name = "event_id") int event_id){
        return ResponseEntity.ok(eventService.getEvent(event_id));
    }

}
