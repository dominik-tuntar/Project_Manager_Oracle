import { Component, EventEmitter, Input, Output } from '@angular/core';
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
  @Output() customAttributeCreated = new EventEmitter<Custom_Attribute>();

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
        (response: Custom_Attribute) => {
          const createdCustomAttribute: Custom_Attribute = {
            ID_C_ATTRIBUTE: 0,  // Temporary value (we don't have the actual ID)
            TABLE_NAME: table_name,
            TABLE_ROW: table_row,
            TITLE: title,
            CONTENT_: content, // This can be filled in with actual data if needed
          };

          // Emit the newly created user (without ID)
          this.customAttributeCreated.emit(createdCustomAttribute); // Emit the new attribute
          this.close();
          //location.reload()
        },
        (error: any) => {
          console.error('Error:', error);
        }
      );
  }
}
