import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { GLOBAL } from '../../services/global';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css'],
  providers: [UserService]
})
export class UserEditComponent implements OnInit {

  public page_title: string;
  public user: User;
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
      url: GLOBAL.url + "user/upload",
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
    attachPinText: 'Sube la imagen del usuario'
  };

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService
  ) {
    this.page_title = "Ajustes";
    this.token = this._userService.getToken();
    this.identity = this._userService.getIdentity();
    this.url = GLOBAL.url;
  }

  ngOnInit() {
    // Rellenar objeto usuario identificado
    let id = this.identity.sub;
    this.getUser(id);
  }

  onSubmit(form) {
    this._userService.update(this.token, this.user).subscribe(
      response => {
        if (response.status == 'success') {
          this.status = response.status;
          this.getUser(this.identity.sub);
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
        this.user.image = result.image;
      }
    }
  }

  getUser(id) {
    this._userService.getUser(id).subscribe(
      response => {
        this.user = new User(1, '', '', 'ROLE_USER', '', '', '', '');
        if (response.status == 'success') {
          this.user.id = response.user.id;
          this.user.name = response.user.name;
          this.user.surname = response.user.surname;
          this.user.role = response.user.role;
          this.user.email = response.user.email;
          this.user.description = response.user.description;
          this.user.image = response.user.image;
        }
      },
      error => {
        console.log(error);
      }
    );
  }

}
