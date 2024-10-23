import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'coffeelog';

  constructor(private snackBar: MatSnackBar) {

  }

  ngOnInit() {
    if (window.matchMedia('(display-mode: browser').matches) {
      // We are in the browser
      if ('standalone' in navigator) {
        // only available in Safari
        this.snackBar.open("You can install this app, use Share > Add to Home Screen", 
            "", { duration: 3000 })
      } else {
        // it's not Safari
        window.addEventListener("beforeinstallprompt", event => {
          event.preventDefault();
          const sb = this.snackBar.open("You can install this app",
            "Install", { duration: 5000 });
          sb.onAction().subscribe( () => {
             (event as any).prompt();
             (event as any).userChoice.then( (result: any) => {
                if (result.outcome == "dismissed") {
                  // TODO:
                } else {
                  // TODO:
                }
             })
          });
        })
      }
    }
  }
}
