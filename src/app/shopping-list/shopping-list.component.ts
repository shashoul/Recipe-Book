import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {

  /* ingredients : Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10),
  ];
 */ 
  ingredients : Ingredient[] = [];
  constructor(private shoppinglistservice : ShoppingListService) { }

  ngOnInit() {
    this.ingredients = this.shoppinglistservice.getIngredients();
    this.shoppinglistservice.addToShoppingList.subscribe(
      () => {
        this.ingredients = this.shoppinglistservice.getIngredients();
      }
    );
  }

  /* newIngredient(ingredient : Ingredient){
    this.ingredients.push(ingredient);
  } */

}
