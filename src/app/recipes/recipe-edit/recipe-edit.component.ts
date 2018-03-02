import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { Ingredient } from '../../shared/ingredient.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {

  id:number;
  editMode :boolean = false;
  editform : FormGroup;
  recipe : Recipe;

  constructor(private route:ActivatedRoute,
              private router:Router,
              private recipeservice:RecipeService) { }

  ngOnInit() {

    this.route.params.subscribe(
      (params:Params) => {
        this.id = +params['id'];
        this.editMode = params['id'] != null ;      
      }
    );

    if(this.editMode){
      this.recipe = this.recipeservice.getRecipe(this.id);
      this.initEditForm();
    }
    else{
      this.initForm();
    }

  }


  initEditForm(){

    let recipeingredientarr = new FormArray([]);
    this.recipe.ingredients.forEach(element => {

      const formgroup = new FormGroup({
        'name' : new FormControl(element.name,Validators.required),
        'amount' : new FormControl(element.amount,Validators.required)
      });

      recipeingredientarr.push(formgroup);

    });

    this.editform = new FormGroup({
      'recipename' : new FormControl(this.recipe.name,Validators.required),
      'recipedescription' : new FormControl(this.recipe.description,Validators.required),
      'recipeimgpath' : new FormControl(this.recipe.imagePath),
      'recipeingredients' : recipeingredientarr
    });
  }

  initForm(){
    this.editform = new FormGroup({
      'recipename' : new FormControl(null,Validators.required),
      'recipedescription' : new FormControl(null,Validators.required),
      'recipeimgpath' : new FormControl(null),
      'recipeingredients' : new FormArray([])
    });
  }

  onAddrecipeingredient(){
    const formgroup = new FormGroup({
      'name' : new FormControl(null,Validators.required),
      'amount' : new FormControl(null,Validators.required)
    });
    (<FormArray>this.editform.get('recipeingredients')).push(formgroup);
  }

  onDeleterecipeingredient(index : number){
    (<FormArray>this.editform.get('recipeingredients')).removeAt(index);
  }

  onCancel(){
    if(this.editMode){
      this.router.navigate(['/recipes',this.id]);
    }
    else{
      this.router.navigate(['/recipes']);
    }
  }

  onSubmit(){
    
    let ingredientsarr : Ingredient[] = [];
    
    const recipename = this.editform.value.recipename;
    
    const recipedescription = this.editform.value.recipedescription;
    
    const recipeimgpath = this.editform.value.recipeimgpath;
    
    const arr = (<FormArray>this.editform.controls.recipeingredients);
    for(let control of arr.controls){
      ingredientsarr.push(new Ingredient(control.value.name,control.value.amount));
    }

    const newRecipe = new Recipe(recipename,recipedescription,
      recipeimgpath,ingredientsarr);

  if(this.editMode){  
    this.recipeservice.updateRecipe(this.id,newRecipe);
    this.router.navigate(['/recipes',this.id]);
  }   
  else{
    this.recipeservice.addRecipe(newRecipe);
    this.router.navigate(['/recipes']);
  }

}

}
