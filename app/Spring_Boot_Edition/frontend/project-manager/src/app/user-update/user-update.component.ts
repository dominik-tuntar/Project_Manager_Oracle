import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Employee } from '../employee';
import { Service } from '../service';

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrl: './user-update.component.css'
})

export class UserUpdateComponent {
  @Input() title: string = 'Default Title';
  @Input() message: string = 'Default message.';
  @Input() selectedUser: Employee | null = null;
  @Output() userUpdated = new EventEmitter<Employee>();
  isOpen: boolean = false;
  constructor(private service: Service) { }
  public passwordMatch: number | null = null;

  open() {
    this.isOpen = true;
  }

  close() {
    this.isOpen = false;
  }

  public updateUser(fullname: string, username: string, pass_word: string, pass_word2: string): void {
    // First, ensure that selectedUser is not null and contains id_employee
    if (this.selectedUser && this.selectedUser.ID_EMPLOYEE) {
      const id_employee = this.selectedUser.ID_EMPLOYEE;
      if (pass_word === pass_word2) {
        // Proceed with update if passwords match
        this.service.updateUser(id_employee, fullname, username, pass_word)
        .subscribe(
          (response: any) => {

            if (this.selectedUser) { // Check if selectedUser is still valid
              this.passwordMatch = null;
              // Update selected user details
              this.selectedUser.FULLNAME = fullname;
              this.selectedUser.USERNAME = username;
              this.selectedUser.PASS_WORD = pass_word;
  
              // Emit the updated user back to parent component
              this.userUpdated.emit(this.selectedUser);
              this.close();  // Close the popup
            } else {
              console.error('Error: selectedUser is null after update');
            }
          },
          (error: any) => {
            console.error('Error updating user:', error);
          }
        );
      } else {
        // Handle password mismatch
        this.passwordMatch = 0;
      }
    } else {
      console.error('Error: selectedUser or ID_EMPLOYEE is undefined');
    }
  }
}
