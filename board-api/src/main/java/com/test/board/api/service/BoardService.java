package com.test.board.api.service;

import com.test.board.common.mapper.BoardMapper;
import com.test.board.common.model.Board;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BoardService {
    private final BoardMapper boardMapper;

    public List<Board> getBoardList() {
        List<Board> boardList = boardMapper.getBoardList();

        return boardList;
    }

    public Board getBoard(Long boardId) {
        Board board = boardMapper.getBoard(boardId);

        return board;
    }

    public void createBoard(Board board) {
        boardMapper.createBoard(board);
    }

    public void updateBoard(Board board) {
        boardMapper.updateBoard(board);
    }

    public void deleteBoard(Long boardId) {
        boardMapper.deleteBoard(boardId);
    }
}
