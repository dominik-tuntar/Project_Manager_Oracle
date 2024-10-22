import { Component, Input } from '@angular/core';
import { Service } from '../service';
import { Custom_Attribute } from '../custom_attribute';
import { Employee } from '../employee';

@Component({
  selector: 'app-cattribute-create',
  templateUrl: './cattribute-create.component.html',
  styleUrl: './cattribute-create.component.css'
})
export class CattributeCreateComponent {
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

  public createCustomAttribute(table_name: string, table_row: number, title: string, content: string): void {
    this.service.createCustomAttribute(table_name, table_row, title, content)
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
