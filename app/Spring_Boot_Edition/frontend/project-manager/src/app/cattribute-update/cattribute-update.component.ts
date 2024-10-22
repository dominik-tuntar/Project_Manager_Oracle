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
    this.service.updateCustomAttribute(id_c_attribute, title, content)
      .subscribe(
        (response: Custom_Attribute) => {
          this.customAttributeUpdated.emit(response);
          this.close();
          //location.reload()
        },
        (error: any) => {
          console.error('Error:', error);
        }
      );
  }
}
