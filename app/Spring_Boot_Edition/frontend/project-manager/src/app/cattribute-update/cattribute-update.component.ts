import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Employee } from '../employee';
import { Service } from '../service';
import { Custom_Attribute } from '../custom_attribute';

@Component({
  selector: 'app-cattribute-update',
  templateUrl: './cattribute-update.component.html',
  styleUrl: './cattribute-update.component.css'
})
export class CattributeUpdateComponent {
  @Input() title: string = 'Default Title';
  @Input() message: string = 'Default message.';
  @Input() selectedCatt: Custom_Attribute | null = null;
  @Output() customAttributeUpdated = new EventEmitter<Custom_Attribute>();
  isOpen: boolean = false;
  constructor(private service: Service) { }

  open() {
    this.isOpen = true;
  }

  close() {
    this.isOpen = false;
  }

  public updateCustomAttribute(id_c_attribute: number, title: string, content: string): void {
    if (this.selectedCatt && this.selectedCatt.ID_C_ATTRIBUTE) {
      const id_c_attribute = this.selectedCatt.ID_C_ATTRIBUTE;
      this.service.updateCustomAttribute(id_c_attribute, title, content)
      .subscribe(
        (response: any) => {
          if (this.selectedCatt) {
            this.selectedCatt.TITLE = title;
            this.selectedCatt.CONTENT_ = content;
            this.customAttributeUpdated.emit(this.selectedCatt);
            this.close();
          } else {
            console.error('Error: selectedCatt is null after update');
          }
        },
        (error: any) => {
          console.error('Error:', error);
        }
      );
    }
  }
}
