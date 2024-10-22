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

  public updateUser(id_employee: number, fullname: string, username: string, pass_word: string, pass_word2: string): void {
    if (pass_word == pass_word2) {
      this.service.updateUser(id_employee, fullname, username, pass_word)
      .subscribe(
        (response: any) => {
          this.passwordMatch = null;
          if (this.selectedUser) {
            this.selectedUser.FULLNAME = fullname;
            this.selectedUser.USERNAME = username;
            this.selectedUser.PASS_WORD = pass_word;
            this.userUpdated.emit(this.selectedUser);
          }
          this.close();
          //location.reload()
        },
        (error: any) => {
          console.error('Error:', error);
        }
      );
    } else {
      this.passwordMatch = 0;
    }
  }
}
