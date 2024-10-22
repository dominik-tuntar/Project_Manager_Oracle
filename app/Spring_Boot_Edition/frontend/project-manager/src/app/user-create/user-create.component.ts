import { Component, Input } from '@angular/core';
import { Service } from '../service';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrl: './user-create.component.css'
})
export class UserCreateComponent {
  @Input() title: string = 'Default Title';
  @Input() message: string = 'Default message.';

  isOpen: boolean = false;
  constructor(private service: Service) { }

  open() {
    this.isOpen = true;
  }

  close() {
    this.isOpen = false;
  }

  public createUser(fullname: string, username: string, pass_word: string): void {
    this.service.createUser(fullname, username, pass_word)
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
