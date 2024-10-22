import { Component, Input } from '@angular/core';
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
  isOpen: boolean = false;
  constructor(private service: Service) { }

  open() {
    this.isOpen = true;
  }

  close() {
    this.isOpen = false;
  }

  public updateUser(id_employee: number, fullname: string, username: string, pass_word: string): void {
    this.service.updateUser(id_employee, fullname, username, pass_word)
      .subscribe(
        (response: any) => {
          this.close();
          location.reload()
        },
        (error: any) => {
          console.error('Error:', error);
        }
      );
  }
}
