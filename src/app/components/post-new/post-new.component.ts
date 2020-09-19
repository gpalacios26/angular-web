import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Category } from '../../models/category';
import { Post } from '../../models/post';
import { UserService } from '../../services/user.service';
import { CategoryService } from '../../services/category.service';
import { PostService } from '../../services/post.service';
import { GLOBAL } from '../../services/global';

@Component({
  selector: 'app-post-new',
  templateUrl: './post-new.component.html',
  styleUrls: ['./post-new.component.css'],
  providers: [UserService, CategoryService, PostService]
})
export class PostNewComponent implements OnInit {

  public page_title: string;
  public categories: Category[];
  public post: Post;
  public status: string;
  public url: string;
  public token;
  public identity;

  public froala_options: Object = {
    charCounterCount: true,
    language: 'es',
    toolbarButtons: ['bold', 'italic', 'underline', 'undo', 'redo'],
    toolbarButtonsXS: ['bold', 'italic', 'underline', 'undo', 'redo'],
    toolbarButtonsSM: ['bold', 'italic', 'underline', 'undo', 'redo'],
    toolbarButtonsMD: ['bold', 'italic', 'underline', 'undo', 'redo']
  };

  public afuConfig = {
    multiple: false,
    formatsAllowed: ".jpg,.png,.gif,.jpeg",
    maxSize: "50",
    uploadAPI: {
      url: GLOBAL.url + "post/upload",
      method: "POST",
      headers: {
        "Authorization": this._userService.getToken()
      },
      responseType: 'json',
    },
    theme: "attachPin",
    hideProgressBar: true,
    hideResetBtn: true,
    hideSelectBtn: true,
    attachPinText: 'Sube la imagen de la entrada'
  };

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _categoryService: CategoryService,
    private _postService: PostService
  ) {
    this.page_title = "Crear nueva entrada";
    this.token = this._userService.getToken();
    this.identity = this._userService.getIdentity();
    this.post = new Post(1, this.identity.sub, 0, '', '', '', null);
    this.url = GLOBAL.url;
  }

  ngOnInit() {
    // Cargamos las categorias
    this.getCategories();
  }

  onSubmit(form) {
    this._postService.create(this.token, this.post).subscribe(
      response => {
        if (response.status == 'success') {
          this.status = response.status;
          this.post = response.post;
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

  imageUpload(image_data) {
    if (image_data) {
      let result = JSON.parse(image_data.response);
      if (result.status == 'success') {
        this.post.image = result.image;
      }
    }
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
