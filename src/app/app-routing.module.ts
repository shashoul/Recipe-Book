import { Routes, RouterModule } from '@angular/router';
import { RecipesComponent } from './recipes/recipes.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { NgModule } from '@angular/core';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { RecipeSelectComponent } from './recipes/recipe-select/recipe-select.component';
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';

const appRoutes : Routes = [
    {path:'', redirectTo:'/recipes',pathMatch:'full'},
    {path:'recipes', component: RecipesComponent , children:[
        {path:'',component:RecipeSelectComponent},
        {path:'new' , component: RecipeEditComponent},
        {path:':id' , component: RecipeDetailComponent},
        {path:':id/edit' , component: RecipeEditComponent}
    ] },
    {path:'shoppinglist', component: ShoppingListComponent}
  ];

  @NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)    
    ],
    exports:[
        RouterModule
    ]

})

export class AppRoutingModule {

}