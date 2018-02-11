import { Ingredient } from "../shared/ingredient.model";
import { EventEmitter } from "@angular/core";

export class ShoppingListService {

    ingredients : Ingredient[] = [
        new Ingredient('Apples', 5),
        new Ingredient('Tomatoes', 10),
      ];

      addToShoppingList = new EventEmitter<void>();

      getIngredients() : Ingredient[] {
          return this.ingredients.slice();
      }

      addIngredientToShoppingList(ingredient : Ingredient){
          this.ingredients.push(ingredient);
          this.addToShoppingList.emit();
      }

      addIngredientsToShoppingList(ingredients : Ingredient[]){
          this.ingredients = this.ingredients.concat(ingredients);
          this.addToShoppingList.emit();
      }
}