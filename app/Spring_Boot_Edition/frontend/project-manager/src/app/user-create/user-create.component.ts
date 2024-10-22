import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Service } from '../service';
import { Employee } from '../employee';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrl: './user-create.component.css'
})
export class UserCreateComponent {
  @Input() title: string = 'Default Title';
  @Input() message: string = 'Default message.';
  @Output() userCreated = new EventEmitter<Employee>();
  public passwordMatch: number | null = null;

  isOpen: boolean = false;
  constructor(private service: Service) { }

  open() {
    this.isOpen = true;
  }

  close() {
    this.isOpen = false;
  }

  public createUser(fullname: string, username: string, pass_word: string, pass_word2: string): void {
    if (pass_word == pass_word2) {
      this.service.createUser(fullname, username, pass_word)
      .subscribe(
        (response: Employee) => {
          this.passwordMatch = null;
          const createdUser: Employee = {
            ID_EMPLOYEE: 0,  // Temporary value (we don't have the actual ID)
            FULLNAME: fullname,
            USERNAME: username,
            PASS_WORD: pass_word,
            ID_EMPLOYEE_ROLE: 2, // This can be filled in with actual data if needed
            STATUS: 1 // Assuming the new user is active
          };

          // Emit the newly created user (without ID)
          this.userCreated.emit(createdUser);
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
