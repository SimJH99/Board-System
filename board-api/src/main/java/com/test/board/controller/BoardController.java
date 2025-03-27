package com.test.board.controller;

import com.test.board.dto.ResponseDto;
import com.test.board.model.Board;
import com.test.board.service.BoardService;
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
    public ResponseEntity<ResponseDto> getBoard() {
        List<Board> boardList = boardService.getBoard();

        ResponseDto responseDto = new ResponseDto(true, boardList);
        return ResponseEntity.ok(responseDto);
    }
}
