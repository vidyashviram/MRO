import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router,private fb: FormBuilder) { }

  username: string;
  password: string;
  validatemsg: boolean;
  validatemsgs: boolean;
  status: string
  message: string;

  loginForm = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(10)]],
    password: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(10)]]

  })

  login(): void {
    if (this.username == 'admin' && this.password == 'admin') {
      this.router.navigate(["home/dashboard"]);
    }


    else {
      this.validatemsg = true;
    }

  }
  
  ngOnInit() {
  }

}
