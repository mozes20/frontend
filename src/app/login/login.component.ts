import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {Subscription} from "rxjs";
import {UserService} from "../user.service";
import {Router} from "@angular/router";


interface Login {
  username: FormControl<string>,
  password: FormControl<string>
}
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent  implements OnInit,OnDestroy {
  form!: FormGroup<Login>;
  sub: Subscription  = new Subscription();

  constructor(private fb: FormBuilder,private  userService: UserService, private router: Router){}
  ngOnInit(): void {
    const nameCtrl = new FormControl<string>('', {nonNullable: true});
    const passwordCtrl = new FormControl<string>('', {nonNullable: true});
    this.form = new FormGroup<Login>({
      username: nameCtrl,
      password: passwordCtrl,
    });
    this.sub = this.form.valueChanges.subscribe(res => console.log(res));
  }

  onSubmit(eventData:any) {
    this.userService.getAuthenticate(eventData).subscribe(res => {
      console.log(res)
      localStorage.setItem('token', res.jwt);
      this.userService.getUsers().subscribe(res=>{
        console.log(res)
        this.router.navigate(['/']);
      })
    })

    //alert('Form submitted:\n' + JSON.stringify(eventData));
    this.form.reset();
  }

  ngOnDestroy(){
    if(this.sub) this.sub.unsubscribe();
  }

  protected readonly name = name;
}
