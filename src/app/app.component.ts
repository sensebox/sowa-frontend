import { AuthService } from './services/auth.service';
import { Component, ViewChildren, QueryList } from '@angular/core';
import { combineLatest, timer } from 'rxjs';
import { map, switchMap, mapTo } from 'rxjs/operators';

@Component({
  selector: 'senph-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'senph-frontend';
  
    // resourceType : Filter[] = [
    //   {
    //     id: "en",
    //     title: "English",
    //     active: true,
    //   },
    //   {
    //     id: "de",
    //     title: "German",
    //   },
    //   {
    //     id: "es",
    //     title: "Spanish",
    //   },
    //   {
    //     id: "it",
    //     title: "Italian",
    //   },
    // ]
    // levels : Filter[] = [
    //   {
    //     id: "beginner",
    //     title: "Beginner",
    //     active: true,
    //   },
    //   {
    //     id: "intermediate",
    //     title: "Intermediate",
    //   },
    //   {
    //     id: "advanced",
    //     title: "Advanced",
    //   },
    // ]
  
    // @ViewChildren(FiltersComponent) filters : QueryList<FiltersComponent>;
  resources: any;
  
    ngAfterViewInit() {
      // const filters = this.filters.map(f => f.changeFilter);
      // // console.log(filters);
  
      // this.resources = combineLatest(filters).pipe(
      //   map(( filters : ActiveFilter[] ) => 
      //        filters.map(filter => `${filter.group}=${filter.id}`).join("&")),
      //   switchMap(this.getData)
      // );
    }

    constructor(private auth: AuthService){
      //Check if token is in localstorage and try to recover session
      if(window.localStorage.getItem('sb_refreshtoken'))
        this.auth.recoverSession(window.localStorage.getItem('sb_refreshtoken'))

    }
  
    // getData( query ) {
    //   // Simulate HTTP request..
    //   return timer(1000).pipe(mapTo("https://api.com?" + query));
    // }
  }
