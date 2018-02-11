import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { Router, ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

  //@Output() recipeselected = new EventEmitter<Recipe>();

  recipes : Recipe[] = [];
  /* recipes : Recipe[] = [
    new Recipe('First Test Recipe', 'This is simply a test', 'https://upload.wikimedia.org/wikipedia/commons/1/15/Recipe_logo.jpeg'),
    new Recipe('Second Test Recipe', 'This is simply a test', 'https://upload.wikimedia.org/wikipedia/commons/1/15/Recipe_logo.jpeg')
  ]; */

  constructor(private recipeservice : RecipeService,
      private router:Router,
      private route:ActivatedRoute) { }

  ngOnInit() {
    this.recipes = this.recipeservice.getRecipes();
  }

  /* onRecipeSelceted(recipe:Recipe){
    //console.log(recipe);
    this.recipeselected.emit(recipe);
  }
 */
  onNewRecipe(){
    this.router.navigate(['/recipes','new']);
  }
}
