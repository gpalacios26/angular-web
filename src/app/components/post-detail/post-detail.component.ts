import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Post } from '../../models/post';
import { UserService } from '../../services/user.service';
import { PostService } from '../../services/post.service';
import { GLOBAL } from '../../services/global';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css'],
  providers: [UserService, PostService]
})
export class PostDetailComponent implements OnInit {

  public page_title: string;
  public post: Post;
  public status: string;
  public url: string;
  public token;
  public identity;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _postService: PostService
  ) {
    this.page_title = "Blog Post";
    this.token = this._userService.getToken();
    this.identity = this._userService.getIdentity();
    this.url = GLOBAL.url;
  }

  ngOnInit() {
    // Cargamos el post
    this.getPost();
  }

  getPost() {
    this._route.params.subscribe(params => {
      let id = +params['id'];
      this._postService.getPost(id).subscribe(
        response => {
          if (response.status == 'success') {
            this.post = response.post;
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

}
