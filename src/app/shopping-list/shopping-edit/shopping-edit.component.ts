import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {

  //@Output() addIngredient = new EventEmitter<Ingredient>();
  constructor(private shoppinglistservice : ShoppingListService) { }

  ngOnInit() {
  }

  onAddIngredient(name:string,amount:number){
    //this.addIngredient.emit(new Ingredient(name,amount));
    this.shoppinglistservice.addIngredientToShoppingList(new Ingredient(name,amount));
  }

}
