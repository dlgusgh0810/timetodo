package org.test.controller;

//import ch.qos.logback.core.model.Model;
import org.springframework.ui.Model;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.test.dto.BoardDTO;
import org.test.service.BoardService;

import java.util.List;

@Controller
@RequiredArgsConstructor
@RequestMapping("/board")
public class BoardController {

    private final BoardService boardService;

    @GetMapping("/save")
    public String saveForm() {
        return "save";
    }

    //게시글 작성
    @PostMapping("/save")
    public String save(@ModelAttribute BoardDTO boardDTO) {
        System.out.println("boardDTO = " + boardDTO);
        boardService.save(boardDTO);
        return "index";
    }

    //DB에서 전체 게시글 데이터를 가져와서 list.html에 보여준다
    @GetMapping("/")
    public String findAll(Model model) {
        List<BoardDTO> boardDTOList = boardService.findAll();
        model.addAttribute("boardList",boardDTOList);
        return "list";
    }

//    //게시글 상세조회
//    @GetMapping("/{id}")
//    public String findById(@PathVariable Long id, Model model) {
//
//    }

}
