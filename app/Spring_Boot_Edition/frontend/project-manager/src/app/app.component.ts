import { Component } from '@angular/core';
import { Employee } from './employee';
import { HttpErrorResponse } from '@angular/common/http';
import { Service } from './service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Project Manager';
  public employees: Employee[] = [];

  constructor(private empservice: Service) { }

  ngOnInit() {
    this.getAllUsers();
  }

  public getAllUsers(): void {
    this.empservice.getAllUsers().subscribe(
      (response: Employee[]) => {
        this.employees = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message)
      }
    )
  }
}
