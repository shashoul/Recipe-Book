import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[appDropDown]'
})
export class DropDownDirective {

  constructor() { }
  @HostBinding('class.open') dropopen:boolean = false;

  @HostListener('click') dropdownclick(){
    this.dropopen = !this.dropopen;
  }
  
}
