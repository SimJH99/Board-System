package com.test.board.api.controller;

import com.test.board.api.service.BoardService;
import com.test.board.common.dto.ResponseDto;
import com.test.board.common.model.Board;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/board")
public class BoardController {
    private final BoardService boardService;

    //게시글 리스트 조회
    @GetMapping
    public ResponseEntity<ResponseDto> getBoardList() {
        List<Board> boardList = boardService.getBoardList();

        ResponseDto responseDto = new ResponseDto(true, boardList);
        return ResponseEntity.ok(responseDto);
    }

    //게시글 조회
    @GetMapping("/{boardId}")
    public ResponseEntity<ResponseDto> getBoard(@PathVariable Long boardId) {
        Board board = boardService.getBoard(boardId);

        ResponseDto responseDto = new ResponseDto(true, board);
        return ResponseEntity.ok(responseDto);
    }

    //게시글 생성
    @PostMapping
    public ResponseEntity<ResponseDto> createBoard(@RequestBody Board board) {
        boardService.createBoard(board);

        ResponseDto responseDto = new ResponseDto(true);
        return ResponseEntity.ok(responseDto);
    }

    //게시글 수정
    @PutMapping
    public ResponseEntity<ResponseDto> updateBoard(@RequestBody Board board) {
        boardService.updateBoard(board);

        ResponseDto responseDto = new ResponseDto(true);
        return ResponseEntity.ok(responseDto);
    }

    //게시글 삭제
    @DeleteMapping("/{boardId}")
    public ResponseEntity<ResponseDto> deleteBoard(@RequestParam Long boardId) {
        boardService.deleteBoard(boardId);

        ResponseDto responseDto = new ResponseDto(true);
        return ResponseEntity.ok(responseDto);
    }
}
