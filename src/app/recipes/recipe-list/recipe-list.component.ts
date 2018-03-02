import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';



@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit,OnDestroy {

  //@Output() recipeselected = new EventEmitter<Recipe>();

  recipes : Recipe[] = [];
  subscription = new Subscription();
  /* recipes : Recipe[] = [
    new Recipe('First Test Recipe', 'This is simply a test', 'https://upload.wikimedia.org/wikipedia/commons/1/15/Recipe_logo.jpeg'),
    new Recipe('Second Test Recipe', 'This is simply a test', 'https://upload.wikimedia.org/wikipedia/commons/1/15/Recipe_logo.jpeg')
  ]; */

  constructor(private recipeservice : RecipeService,
      private router:Router,
      private route:ActivatedRoute) { }

  ngOnInit() {
    this.recipes = this.recipeservice.getRecipes();

    this.subscription = this.recipeservice.recipesChanged.subscribe(
      (recipes:Recipe[]) => {
        this.recipes = recipes;
      }
    );
  }

  /* onRecipeSelceted(recipe:Recipe){
    //console.log(recipe);
    this.recipeselected.emit(recipe);
  }
 */
  onNewRecipe(){
    this.router.navigate(['/recipes','new']);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
