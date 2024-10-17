import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Employee } from '../employee';  // PascalCase for interface/class
import { Service } from '../service';  // PascalCase for service
import { UserUpdateComponent } from '../user-update/user-update.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']  // Use 'styleUrls' (plural)
})
export class UsersComponent implements OnInit {
  title = 'Users';
  public employees: Employee[] = [];  // Use Employee (PascalCase)

  constructor(private empservice: Service) { }  // Use Service (PascalCase)

  ngOnInit() {
    this.getAllUsers();
  }

  public getAllUsers(): void {
    this.empservice.getAllUsers().subscribe(
      (response: Employee[]) => {  // Use Employee[] (PascalCase)
        this.employees = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
  @ViewChild('popup') popup!: UserUpdateComponent; // Reference to the user update popup component

  showPopup() {
    this.popup.open(); // Call the open method of the popup
  }
}
