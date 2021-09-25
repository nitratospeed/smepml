import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  template: ''
})
export class LogoutComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
    localStorage.setItem('isLoggedIn', "");
    this.router.navigate(['login']);
    window.location.reload();
  }

}
