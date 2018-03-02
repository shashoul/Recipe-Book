import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Params, Router } from '@angular/router';



@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

  //@Input() recipe : Recipe;
  recipe : Recipe;
  selectRecipe : boolean = false;
  recipeId : number;
  
  constructor(private recipeservice : RecipeService,
    private route:ActivatedRoute,
    private router:Router) { }

  ngOnInit() {
    /* this.recipeservice.recipeWasSelected.subscribe(
      (recipe:Recipe) => {
        this.recipe = recipe;
        this.selectRecipe = true;
      }
    ); */

    this.route.params.subscribe(
      (params:Params) => {
        this.recipeId = +params['id'];
        this.recipe = this.recipeservice.getRecipe(+params['id']);
      }
    );
  }

  addIngredients(){
    this.recipeservice.addRecipeIngredientsToShoppingList(this.recipe);
  }

  onEditRecipe(){
    //this.router.navigate(['/recipes',this.recipeId,'edit']);    // or we can use relative path 
    this.router.navigate(['edit'], {relativeTo : this.route});
  }

  onDelete(){
    this.recipeservice.deleteRecipe(this.recipeId);
    this.router.navigate(['/recipes']);
  }
}
