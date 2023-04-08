import {Component, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {UserService} from "../user.service";
import {Router} from "@angular/router";
import {User} from "../models/User";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  errorMessage: string | undefined;
  sub: Subscription  = new Subscription()
  users: User[] = []
  userDetail = {}


  constructor(private  userService: UserService, private router: Router){
  }
  ngOnInit(): void {
    this.userService.getUsers().subscribe(resUsers => {
    resUsers.map((data:User) => this.users.push(data))
    }, (error) => {
      this.errorMessage = error;
    })
    console.log(this.users)
  }

  userCreated(event: boolean) {
    this.users = [];
    this.userService.getUsers().subscribe(resUsers => {
      resUsers.map((data:User) => this.users.push(data))
    }, (error) => {
      this.errorMessage = error;
    })
  }

  deleteUser(id: number) {
    this.userService.deleteUser(id).subscribe(res => {
      this.userCreated(true);
    }, (error) => {
      this.errorMessage = error;
    });
  }
  getDetailedUser(id: number) {
    this.userService.getUser(id).subscribe(res => {
      console.log(res)
      this.userDetail = res
    }, (error) => {
        this.errorMessage = error;
      }
    );
  }

  logout(): void {
    console.log("kilépve")
    localStorage.removeItem("token")
    this.router.navigate(['/login'])
  }

  protected readonly Object = Object;
}
