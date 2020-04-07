import { Injectable } from '@angular/core';
import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();

 private recipes: Recipe[] = [
   new Recipe('Tasty schnitzel', 'A super-tasy Schnitzel - just welcome','https://upload.wikimedia.org/wikipedia/commons/7/72/Schnitzel.JPG', [new Ingredient('Meat', 1), new Ingredient('French Fries', 20)]),
    new Recipe('Big Fat burger', 'What else you need to say?', 'https://upload.wikimedia.org/wikipedia/commons/9/9b/YOKOSUKA-NAVY-BURGER-TSUNAMI.JPG',[new Ingredient('Buns', 2), new Ingredient('Meat', 1)]),
  ];

  constructor(private shoppingListService: ShoppingListService) { }

  getRecipe(index: number) { 
    return this.recipes[index];
  }

  getRecipes() { 
    return this.recipes.slice();
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) { this.shoppingListService.addIngredients(ingredients) }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;    
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }
}
