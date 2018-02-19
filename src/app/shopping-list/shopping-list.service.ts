import { Ingredient } from "../shared/ingredient.model";
import { EventEmitter } from "@angular/core";
import { Subject } from "rxjs/Subject";

export class ShoppingListService {

    ingredients : Ingredient[] = [
        new Ingredient('Apples', 5),
        new Ingredient('Tomatoes', 10),
      ];

      //addToShoppingList = new EventEmitter<void>();
      addToShoppingList = new Subject<Ingredient[]>();
      editIngredient = new Subject<number>();

      getIngredients() : Ingredient[] {
          return this.ingredients.slice();
      }

      getIngredient(index : number) : Ingredient{
        return this.ingredients[index];
      }

      deleteIngredient(index : number){
        this.ingredients.splice(index,1);
        this.addToShoppingList.next(this.ingredients);
      }

      updateIngredient(index:number,newIngredient:Ingredient){
          this.ingredients[index] = newIngredient;
          this.addToShoppingList.next(this.ingredients);
      }

      addIngredientToShoppingList(ingredient : Ingredient){
          this.ingredients.push(ingredient);
          //this.addToShoppingList.emit();
          this.addToShoppingList.next(this.ingredients);
      }

      addIngredientsToShoppingList(ingredients : Ingredient[]){
          this.ingredients = this.ingredients.concat(ingredients);
          //this.addToShoppingList.emit();
          this.addToShoppingList.next(this.ingredients);
      }
}