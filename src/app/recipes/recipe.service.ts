import { Recipe } from "./recipe.model";
import { EventEmitter, Injectable } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Subject } from "rxjs/Subject";

@Injectable()
export class RecipeService {

    private recipes : Recipe[] = [
        new Recipe('First Test Recipe', 'This is simply a test', 
        'https://upload.wikimedia.org/wikipedia/commons/1/15/Recipe_logo.jpeg',
        [
            new Ingredient('Meat', 1),
            new Ingredient('Frenchr Fries', 20)
        ]),
        new Recipe('Second Test Recipe', 'This is simply a test',
         'https://upload.wikimedia.org/wikipedia/commons/1/15/Recipe_logo.jpeg',
         [
            new Ingredient('Buns', 2),
            new Ingredient('Meat', 1)
        ]),
        new Recipe('Easy turkey crown',
            'Serve a traditional roast turkey for Christmas',
            'https://www.bbcgoodfood.com/sites/default/files/styles/recipe/public/recipe/recipe-image/2017/10/turkey-crown.jpg?itok=q1YQKJTq',
            [
                new Ingredient('butter',1),
                new Ingredient('turkey',1),
                new Ingredient('honey',4)
            ]),
        new Recipe('Turkey crown',
        'Turkey crown with roast garlic & pancetta',
        'https://www.bbcgoodfood.com/sites/default/files/styles/recipe/public/user-collections/my-colelction-image/2015/12/recipe-image-legacy-id--833470_11.jpg?itok=VLE3aG1f',
            [
                new Ingredient('turkey',1),
                new Ingredient('bacon',10),
                new Ingredient('onion',2),
                new Ingredient('garlic',3)
            ]
        )
      ];
      
    constructor(private shoppinglistservice : ShoppingListService ) {}
    recipeWasSelected : EventEmitter<Recipe> = new EventEmitter<Recipe>();
    recipesChanged : Subject<Recipe[]> = new Subject<Recipe[]>(); 
      
    getRecipes(): Recipe[] {
        return this.recipes.slice();        // return a copy of the recipes array
    }

    recipeIsSelected(recipe : Recipe){
        this.recipeWasSelected.emit(recipe);
    }

    addRecipeIngredientsToShoppingList(recipe : Recipe){
        this.shoppinglistservice.addIngredientsToShoppingList(recipe.ingredients);
    }

    getRecipe(id:number){
          return this.recipes[id];
    }

    updateRecipe(index : number , newrecipe : Recipe){
        this.recipes[index] = newrecipe;
        this.recipesChanged.next(this.recipes.slice());
    }

    addRecipe(newrecipe : Recipe){
        this.recipes.push(newrecipe);
        this.recipesChanged.next(this.recipes.slice());
    }

    deleteRecipe(index : number){
        this.recipes.splice(index);
        this.recipesChanged.next(this.recipes.slice());
    }
}