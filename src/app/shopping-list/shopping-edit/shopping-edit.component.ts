import { Component, OnInit, Output, EventEmitter, ViewChild, OnDestroy } from '@angular/core';
import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit,OnDestroy {

  @ViewChild('f') shoppingeditForm : NgForm;
  editMode = false;
  editIndex:number;
  subscription = new Subscription();

  //@Output() addIngredient = new EventEmitter<Ingredient>();
  constructor(private shoppinglistservice : ShoppingListService) { }

  ngOnInit() {

    this.subscription = this.shoppinglistservice.editIngredient.subscribe(
      (index:number) => {
        const ingredient = this.shoppinglistservice.getIngredient(index);
        this.editIndex = index;
        this.editMode = true;
        this.shoppingeditForm.setValue({
          name : ingredient.name,
          amount : ingredient.amount
        });
      }
    );
    
  }

 /*  onAddIngredient(name:string,amount:number){
    //this.addIngredient.emit(new Ingredient(name,amount));
    this.shoppinglistservice.addIngredientToShoppingList(new Ingredient(name,amount));
  } */

  onSubmit(){
    console.log("On Submitting...");
    console.log(this.shoppingeditForm.value.name);
    console.log(this.shoppingeditForm.value.amount);
    const newIngredient = new Ingredient(
      this.shoppingeditForm.value.name,
      this.shoppingeditForm.value.amount
    );

    if( this.editMode ){
      this.shoppinglistservice.updateIngredient(this.editIndex,newIngredient);
    }
    else{
      this.shoppinglistservice.addIngredientToShoppingList(newIngredient);
    }

    this.shoppingeditForm.reset();
    this.editMode = false;
  }

  onClear(){
    this.shoppingeditForm.reset();
    this.editMode = false;
  }
  
  onDelete(){
    this.shoppinglistservice.deleteIngredient(this.editIndex);
    this.editMode = false;
    this.shoppingeditForm.reset();
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  }
