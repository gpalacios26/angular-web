import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from '../../models/user';
import { Post } from '../../models/post';
import { UserService } from '../../services/user.service';
import { GLOBAL } from '../../services/global';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers: [UserService]
})
export class ProfileComponent implements OnInit {

  public page_title: string;
  public user: User;
  public posts: Post[];
  public url: string;
  public token;
  public identity;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService
  ) {
    this.page_title = "Profile Usuario del Blog";
    this.token = this._userService.getToken();
    this.identity = this._userService.getIdentity();
    this.url = GLOBAL.url;
  }

  ngOnInit() {
    // Cargamos el usuario
    this.getUser();
  }

  getUser() {
    this._route.params.subscribe(params => {
      let id = +params['id'];
      this._userService.getUser(id).subscribe(
        response => {
          if (response.status == 'success') {
            this.user = response.user;
            // Cargamos los post del usuario
            this.getUserPosts();
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

  getUserPosts() {
    this._route.params.subscribe(params => {
      let id = +params['id'];
      this._userService.getUserPosts(id).subscribe(
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
