import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Category } from '../../models/category';
import { UserService } from '../../services/user.service';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-category-new',
  templateUrl: './category-new.component.html',
  styleUrls: ['./category-new.component.css'],
  providers: [UserService, CategoryService]
})
export class CategoryNewComponent implements OnInit {

  public page_title: string;
  public category: Category;
  public status: string;
  public token;
  public identity;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _categoryService: CategoryService
  ) {
    this.page_title = "Crear nueva categoria";
    this.token = this._userService.getToken();
    this.identity = this._userService.getIdentity();
    this.category = new Category(1, '');
  }

  ngOnInit(): void {
  }

  onSubmit(form) {
    this._categoryService.create(this.token, this.category).subscribe(
      response => {
        if (response.status == 'success') {
          this.status = response.status;
          this.category = response.category;
          // Limpiar el formulario
          form.reset();
          // Redireccionar a la pantalla principal
          this._router.navigate(['inicio']);
        } else {
          this.status = 'error';
        }
      },
      error => {
        console.log(error);
        this.status = 'error';
      }
    );
  }

}
