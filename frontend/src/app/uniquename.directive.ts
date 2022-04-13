import { Injectable } from "@angular/core";
import { AbstractControl, AsyncValidator, ValidationErrors } from "@angular/forms";
import { catchError, map, Observable, of } from "rxjs";
import { SearchService } from "./search.service";

interface CheckResult {
  found: boolean;
}

@Injectable({
  providedIn: 'root'
})

export class UniqeNameValidator implements AsyncValidator {
  constructor(
    private searchService: SearchService,
  ) { }

  validate(
    control: AbstractControl
  ): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    return this.searchService.checkContact(control.value).pipe(
      map((res) => {
        const r = res as CheckResult;
        return r.found ? r : null;
      }),
      catchError(() => of(null)),
    )
  }
}
