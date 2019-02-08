
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { RecipeService } from './../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class DataStorageService {
  constructor(private httpClient: HttpClient,
     private recipeService: RecipeService, private authService: AuthService) {}

  storeRecipes() {
    const token = this.authService.getToken();

    return this.httpClient.put('https://recipe-project-ng.firebaseio.com/recipes.json?auth=' + token,
    this.recipeService.getRecipes());
  }

  getRecipes() {
    const token = this.authService.getToken();

    this.httpClient.get('https://recipe-project-ng.firebaseio.com/recipes.json?auth=' + token)
    .pipe(
      map((res: any) => {
        const recipes: Recipe[] = res;

        for (const recipe of recipes) {
          if (!recipe['ingredients']) {
            console.log(recipe);
            recipe['ingredients'] = [];
          }
        }

        return recipes;
      })
    )
    .subscribe(
      (response: any) => {
        this.recipeService.setRecipes(response);
      }
    );
  }

}
