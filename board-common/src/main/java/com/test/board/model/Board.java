package com.test.board.model;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class Board extends BaseModel {
    private Long boardId;
    private String boardNm;
    private String description;
    private String attchEnable;
    private String commentEnable;
    private String useYn;
    private String delYn;
}
