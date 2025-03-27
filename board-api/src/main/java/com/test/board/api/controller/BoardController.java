package com.test.board.api.controller;

import com.test.board.common.dto.ResponseDto;
import com.test.board.common.model.Board;
import com.test.board.api.service.BoardService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/board")
public class BoardController {
    private final BoardService boardService;

    @GetMapping
    public ResponseEntity<ResponseDto> getBoardList() {
        List<Board> boardList = boardService.getBoardList();

        ResponseDto responseDto = new ResponseDto(true, boardList);
        return ResponseEntity.ok(responseDto);
    }
}
