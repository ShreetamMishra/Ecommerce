package com.educative.ecommerce.controller;

import com.educative.ecommerce.common.ApiResponse;
import com.educative.ecommerce.model.Category;
import com.educative.ecommerce.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/category") // Fixed the typo here
public class CategoryController {

    @Autowired
    private CategoryService categoryService;

    @PostMapping("/create")
    public ResponseEntity<ApiResponse> createCategory(@RequestBody Category category) {
        categoryService.createCategory(category);
        return new ResponseEntity<>(new ApiResponse(true, "A new category has been created"), HttpStatus.CREATED);
    }

    @GetMapping("/list")
    public ResponseEntity<List<Category>> listCategory() { // Changed to return ResponseEntity for consistency
        List<Category> categories = categoryService.listCategory();
        return new ResponseEntity<>(categories, HttpStatus.OK);
    }

    @PostMapping("/update/{categoryId}")
    public ResponseEntity<ApiResponse> updateCategory(@PathVariable("categoryId") int categoryId, @RequestBody Category category) {
        if (!categoryService.findById(categoryId)) {
            return new ResponseEntity<>(new ApiResponse(false, "Category does not exist"), HttpStatus.NOT_FOUND);
        }
        categoryService.editCategory(categoryId, category);
        return new ResponseEntity<>(new ApiResponse(true, "Category has been updated"), HttpStatus.OK);
    }
    
}
