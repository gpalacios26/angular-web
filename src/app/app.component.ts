import { Component, OnInit, DoCheck } from '@angular/core';
import { Category } from './models/category';
import { UserService } from './services/user.service';
import { CategoryService } from './services/category.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [UserService, CategoryService]
})
export class AppComponent implements OnInit, DoCheck {

  public title = 'Bienvenido - Proyecto de Angular con Laravel';
  public categories: Category[];
  public token;
  public identity;

  constructor(
    private _userService: UserService,
    private _categoryService: CategoryService
  ) {
    this.token = this._userService.getToken();
    this.identity = this._userService.getIdentity();
  }

  ngOnInit() {
    // Cargamos las categorias
    this.getCategories();
  }

  ngDoCheck() {
    this.token = this._userService.getToken();
    this.identity = this._userService.getIdentity();
  }

  getCategories() {
    this._categoryService.getCategories().subscribe(
      response => {
        if (response.status == 'success') {
          this.categories = response.categories;
        }
      },
      error => {
        console.log(error);
      }
    );
  }

}
