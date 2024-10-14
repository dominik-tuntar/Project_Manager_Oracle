import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { employee } from './employee';
import { service } from './service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgFor],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {
  title = 'Project Manager';
  public employees: employee[] = [];

  constructor(private empservice: service){}

  ngOnInit() {
    this.getAllUsers();
  }

  public getAllUsers(): void {
    this.empservice.getAllUsers().subscribe(
      (response: employee[]) => {
        this.employees = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message)
      }
    )
  }
}
