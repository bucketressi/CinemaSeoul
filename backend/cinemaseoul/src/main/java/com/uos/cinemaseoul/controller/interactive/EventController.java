package com.uos.cinemaseoul.controller.interactive;

import com.uos.cinemaseoul.common.paging.Criteria;
import com.uos.cinemaseoul.dto.interactive.event.EventDto;
import com.uos.cinemaseoul.service.interactive.EventService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
public class EventController {

    private final EventService eventService;

    @PostMapping("/event/add")
    public void addEvent(Authentication authentication, @RequestBody EventDto eventDto){
        eventDto.setAdmi_id(Integer.parseInt(authentication.getName()));
        eventService.addEvent(eventDto);
    }

    @PutMapping("/event/update")
    public void updateEvent(Authentication authentication, @RequestBody EventDto eventDto){
        eventDto.setAdmi_id(Integer.parseInt(authentication.getName()));
        eventService.updateEvent(eventDto);
    }

    @PutMapping("/event/image")
    public void updateEventImage(Authentication authentication, @RequestBody EventDto eventDto){
        eventDto.setAdmi_id(Integer.parseInt(authentication.getName()));
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
