import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Category } from '../../models/category';
import { Post } from '../../models/post';
import { UserService } from '../../services/user.service';
import { CategoryService } from '../../services/category.service';
import { GLOBAL } from '../../services/global';

@Component({
  selector: 'app-category-detail',
  templateUrl: './category-detail.component.html',
  styleUrls: ['./category-detail.component.css'],
  providers: [UserService, CategoryService]
})
export class CategoryDetailComponent implements OnInit {

  public page_title: string;
  public category: Category;
  public posts: Post[];
  public url: string;
  public token;
  public identity;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _categoryService: CategoryService
  ) {
    this.page_title = "Categoria del Blog";
    this.token = this._userService.getToken();
    this.identity = this._userService.getIdentity();
    this.url = GLOBAL.url;
  }

  ngOnInit() {
    // Cargamos la categoria
    this.getCategory();
  }

  getCategory() {
    this._route.params.subscribe(params => {
      let id = +params['id'];
      this._categoryService.getCategory(id).subscribe(
        response => {
          if (response.status == 'success') {
            this.category = response.category;
            // Cargamos los post de la categoria
            this.getCategoryPosts();
          } else {
            this._router.navigate(['inicio']);
          }
        },
        error => {
          console.log(error);
        }
      );
    });
  }

  getCategoryPosts() {
    this._route.params.subscribe(params => {
      let id = +params['id'];
      this._categoryService.getCategoryPosts(id).subscribe(
        response => {
          if (response.status == 'success') {
            this.posts = response.posts;
          }
        },
        error => {
          console.log(error);
        }
      );
    });
  }

  actualizarListado(event) {
    this.posts = event.posts;
  }

}
