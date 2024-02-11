import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Observer, Subscription, interval } from 'rxjs';
import { map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit, OnDestroy {

  private firstObsSubscription: Subscription;

  constructor() { }

  ngOnInit(): void {
    // the interval almost pre-built method that is counting in the console every second. 
    // this.firstObsSubscription = interval(1000).subscribe(count => {
    //   console.log(count);
    // });

    // recreating the pre-built method from scratch for "Building a Custom Observable"
    const customIntervalObservable = new Observable((observer: Observer<number>) => {
      let count = 0;
      setInterval( () => {
        observer.next(count);
        // this next bit is added later in "Errors & Completion" at 4:17
          if (count === 2) {
            observer.complete(); //you don't need to pass any arguments for complete.
          }
        // end of Completion (4:17) for "Errors & Completion"
        // this next bit is adding for "Errors & Completion"
          if (count > 3) {
            observer.error(new Error('Count is greater than 3!'));
          }
        // end "Errors & Completion" addition :) 
        count++;
      }, 1000)
    }); 



    this.firstObsSubscription = customIntervalObservable.pipe(filter(data => { 
      return data > 0;
    }), map((data: number) => {
      return 'Round: ' + (data + 1);
    })).subscribe(data => {
      console.log(data); 
      // the following was the first "Understanding Operators" example, but now we can just change it back to console.log(data) after adding the operator above. 
      // console.log("Round: " + (data + 1)); 
      // having no parentheses around "data + 1" makes a string of 01, 11, 21, etc. 
    }, error => { // adding more handling for "Errors & Completion"
      console.log(error);
      alert("You have been on this page for far too long!" + '\n' + error.message); 
    } // end more handling for "Errors & Completion"
    // adding more for "Errors & Completion" (4:54), the 3rd possible argument to the subscribe method, which is the completion handler function
    , () => {
      console.log('Completed!');
    } // end completion handler function
    );
  }

  ngOnDestroy(): void {
    this.firstObsSubscription.unsubscribe();
  }
}
