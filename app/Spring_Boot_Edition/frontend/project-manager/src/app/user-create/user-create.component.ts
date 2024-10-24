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
        (response: any) => {
          this.passwordMatch = null;

          
          this.userCreated.emit();
          this.close();
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
