import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Post } from '../../models/post';
import { UserService } from '../../services/user.service';
import { PostService } from '../../services/post.service';
import { GLOBAL } from '../../services/global';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [UserService, PostService]
})
export class HomeComponent implements OnInit {

  public page_title: string;
  public posts: Post[];
  public url: string;
  public token;
  public identity;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _postService: PostService
  ) {
    this.page_title = "Inicio - Bienvenido al Blog";
    this.token = this._userService.getToken();
    this.identity = this._userService.getIdentity();
    this.url = GLOBAL.url;
  }

  ngOnInit() {
    // Cargamos los posts
    this.getPosts();
  }

  getPosts() {
    this._postService.getPosts().subscribe(
      response => {
        if (response.status == 'success') {
          this.posts = response.posts;
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  actualizarListado(event) {
    this.posts = event.posts;
  }

}
