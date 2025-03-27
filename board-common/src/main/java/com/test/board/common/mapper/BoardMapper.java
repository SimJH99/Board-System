package com.test.board.common.mapper;


import com.test.board.common.model.Board;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface BoardMapper {

    List<Board> getBoardList();

    Board getBoard(Long boardId);

    void createBoard(Board board);

    void updateBoard(Board board);

    void deleteBoard(Long boardId);
}
