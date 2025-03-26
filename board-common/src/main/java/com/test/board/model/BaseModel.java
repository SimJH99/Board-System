package com.test.board.model;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class BaseModel {

    private Long regId;
    private LocalDateTime regDt;
    private Long updId;
    private LocalDateTime updDt;

}
