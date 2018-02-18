import { Component, OnInit, OnDestroy } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit,OnDestroy {

   /* ingredients : Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10),
  ];
 */ 
  ingredients : Ingredient[] = [];
  subscription = new Subscription();

  constructor(private shoppinglistservice : ShoppingListService) { }

  ngOnInit() {
    this.ingredients = this.shoppinglistservice.getIngredients();
    this.subscription = this.shoppinglistservice.addToShoppingList.subscribe(
      (ingredientList : Ingredient[]) => {
        //this.ingredients = this.shoppinglistservice.getIngredients();
        this.ingredients = ingredientList;
      }
    );
  }

  /* newIngredient(ingredient : Ingredient){
    this.ingredients.push(ingredient);
  } */

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
