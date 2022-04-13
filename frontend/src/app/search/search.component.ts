import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { Contact } from '../../models/contact';
import { SearchService } from '../search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {

  results: Contact[] = [];
  searchValue$ = new Subject<string>();
  searchControl = new FormControl('');

  constructor(
    private router: Router,
    private searchService: SearchService,
  ) {
    this.searchControl.valueChanges
      .subscribe((value) => this.searchValue$.next(value));

    this.searchService.search(this.searchValue$)
      .subscribe((results: any) => {
        this.results = results;
      })
  }

  clearSearch() {
    this.searchControl.setValue('');
    this.router.navigateByUrl('/');
  }

}
