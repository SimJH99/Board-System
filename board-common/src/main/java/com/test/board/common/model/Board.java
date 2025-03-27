package com.test.board.common.model;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class Board extends BaseModel {
    private Long id;
    private String title;
    private String content;
    private String delYn;
}
