import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {UserService} from "../../user.service";
import {Router} from "@angular/router";
import {UserCreate} from "../../models/UserCreate";
import {Subscription} from "rxjs";

interface UserCreateForm {
  username: FormControl<string>,
  password: FormControl<string>,
  name: FormControl<string>,
  email: FormControl<string>,
  address: FormControl<string>,
}

@Component({
  selector: 'app-createuser',
  templateUrl: './createuser.component.html',
  styleUrls: ['./createuser.component.css']
})
export class CreateuserComponent implements OnInit{
  errorMessage : string = ""
  creationError: string = ""
  userCreateform!: FormGroup<UserCreateForm>;
  sub: Subscription  = new Subscription();
  @Output() createFinished = new EventEmitter<boolean>();

  constructor(private fb: FormBuilder,private  userService: UserService, private router: Router){}

  ngOnInit(): void {
    const nameCtrl = new FormControl<string>('', {nonNullable: true});
    const usernameCtrl = new FormControl<string>('', {nonNullable: true});
    const passwordCtrl = new FormControl<string>('', {nonNullable: true});
    const addressCtrl = new FormControl<string>('', {nonNullable: true});
    const emailCtrl = new FormControl<string>('', {nonNullable: true});
    this.userCreateform = new FormGroup<UserCreateForm>({
      email: emailCtrl,
      name: nameCtrl,
      address : addressCtrl,
      username: usernameCtrl,
      password: passwordCtrl
    });
    this.sub = this.userCreateform.valueChanges.subscribe(res => console.log(res));
  }


  onSubmit(eventData:any) {
    if (this.userCreateform.invalid) {
      this.errorMessage = 'Kérjük, töltse ki az összes mezőt!';
      return;
    }
    eventData.userRole = {roles: "ADMIN"}
    this.userService.createUser(eventData).subscribe((res) => {
      this.createFinished.emit()
      this.userCreateform.reset()
    },(error) => {
      const errorObj = JSON.parse(error);
      this.creationError = errorObj.error;
    })
  }




}
