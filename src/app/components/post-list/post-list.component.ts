import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Post } from '../../models/post';
import { UserService } from '../../services/user.service';
import { CategoryService } from '../../services/category.service';
import { PostService } from '../../services/post.service';
import { GLOBAL } from '../../services/global';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css'],
  providers: [UserService, CategoryService, PostService]
})
export class PostListComponent implements OnInit {

  @Input() posts: Post[];
  @Input() page: string;
  @Output() ActualizarListado = new EventEmitter();

  public status: string;
  public url: string;
  public token;
  public identity;
  
  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _categoryService: CategoryService,
    private _postService: PostService
  ) {
    this.token = this._userService.getToken();
    this.identity = this._userService.getIdentity();
    this.url = GLOBAL.url;
  }

  ngOnInit(): void {
  }

  deletePost(id, page) {
    // Muestro Confirmación
    Swal.fire({
      title: 'Alerta',
      text: 'Deseas eliminar el registro seleccionado?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'ACEPTAR',
      cancelButtonText: 'CANCELAR'
    }).then((result) => {
      if (result.value) {
        this._postService.delete(this.token, id).subscribe(
          response => {
            if (response.status == 'success') {
              this.status = response.status;
              // Muestro alerta
              Swal.fire({
                title: 'Entrada eliminada!!!',
                text: 'La entrada se ha eliminado correctamente',
                icon: 'success'
              });
              // Actualizar listado home
              if(page == 'home'){ this.getHomePosts(); }
              // Actualizar listado por categoria
              if(page == 'category'){ this.getCategoryPosts(); }
              // Actualizar listado por usuario
              if(page == 'profile'){ this.getUserPosts(); }
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
    });
  }

  getHomePosts() {
    this._postService.getPosts().subscribe(
      response => {
        if (response.status == 'success') {
          this.ActualizarListado.emit({ posts: response.posts });
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  getCategoryPosts() {
    this._route.params.subscribe(params => {
      let id = +params['id'];
      this._categoryService.getCategoryPosts(id).subscribe(
        response => {
          if (response.status == 'success') {
            this.ActualizarListado.emit({ posts: response.posts });
          }
        },
        error => {
          console.log(error);
        }
      );
    });
  }

  getUserPosts() {
    this._route.params.subscribe(params => {
      let id = +params['id'];
      this._userService.getUserPosts(id).subscribe(
        response => {
          if (response.status == 'success') {
            this.ActualizarListado.emit({ posts: response.posts });
          }
        },
        error => {
          console.log(error);
        }
      );
    });
  }

}
