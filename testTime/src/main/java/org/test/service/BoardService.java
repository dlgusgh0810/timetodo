package org.test.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.test.dto.BoardDTO;
import org.test.entity.BoardEntity;
import org.test.repository.BoardRepository;

import java.util.ArrayList;
import java.util.List;

//DTO -> Entity (Entity class)
//Entity -> DTO (DTO class)

@Service
@RequiredArgsConstructor
public class BoardService {

    private final BoardRepository boardRepository;

    public void save(BoardDTO boardDTO) {
        BoardEntity boardEntity = BoardEntity.toSaveEntity(boardDTO);
        boardRepository.save(boardEntity);
    }

    public List<BoardDTO> findAll() {
        List<BoardEntity> boardEntityList = boardRepository.findAll();
        List<BoardDTO> boardDTOList = new ArrayList<>();
        for(BoardEntity boardEntity : boardEntityList) {
            boardDTOList.add(BoardDTO.toBoardDTO(boardEntity));
        }
        return boardDTOList;
    }
}
