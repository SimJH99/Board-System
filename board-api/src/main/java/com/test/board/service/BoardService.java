package com.test.board.service;

import com.test.board.mapper.BoardMapper;
import com.test.board.model.Board;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BoardService {
    private final BoardMapper boardMapper;

    public List<Board> getBoard() {
        List<Board> boardList = boardMapper.getBoard();

        return boardList;
    }
}
