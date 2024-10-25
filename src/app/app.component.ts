import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SwPush, SwUpdate } from '@angular/service-worker';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'coffeelog';

  constructor(
    //Let user know that new version is avalable. While user download latest version, old version will be displayed
    private snackBar: MatSnackBar,
    private swUpdate: SwUpdate,
    private swPush: SwPush
    ) {
  }

/*   // creatiang function for registration pushing
  registerForpush(){
    //checking if server swPush enabled or not
    if(this.swPush.isEnabled) {
      //Asking for permission first
      Notification.requestPermission( Permission => {
        if(Permission == "granted")  {    // IF it's granted
          //requesting for subscription
          this.swPush.requestSubscription({
            //passing service public key
            serverPublicKey: "BIGwwD-A3owMqONls6bUN1sAMhvLUvCOH97Muzb69zkPQkzsQmfL5LeQocyUrmd22gMDDY6IbVSBYlQ8sF7DKHk"
              }).then ( registration => {
                // TODO: send these details to a push backend server
                console.log(registration);
              })
            }
        })
    }
  }

 */


  registerForPush() {   // creatiang function for registration pushing
    if (this.swPush.isEnabled) {  //checking if server swPush enabled or not
       Notification.requestPermission( permission => {  //Asking for permission first
         if (permission == "granted") {  // IF it's granted
            this.swPush.requestSubscription({ //requesting for subscription
                //passing service public key
                serverPublicKey: "BOyLcNqrsGD7vgrZZcZUeqOUj-eJ9HX_7MqMxCPf7b-1Jux_3xa6hiQrW9QaavjFZ-CrGaiOY1TuPYpDGUfXk8U"
            }).then( registration => {
             // TODO: Send these details to a push backend server
             console.log(registration);
            })
         }
       })
       
    }
 }


  //PRIVATE KEY: 0F7ow_b1PqUQ6ifIhaFsl1g6T1cSJoXVmJEVoiinsvA
  
  UpdateNetworlStatusUI(){
    if(navigator.onLine) {
      //False positive
      (document.querySelector("body") as any).style = "";
    }else {
      //we are offline
      (document.querySelector("body") as any).style = "filter:grayscale(1)";
    }
  }


  ngOnInit() {
    //Checking SW-based updates
    if ( this.swUpdate.isEnabled ){
        this.swUpdate.checkForUpdate();  //checking for updates
        this.swUpdate.versionUpdates.subscribe(update => {  //getting informaton about updates
          if (update.type = "VERSION_READY") { //checking for type of Update
            //Asking user if they want to install NEW VERSION of app
            // location.reload();  //this will reload automatically nad install latest version if there is any. NOT very user frindly

            //Intead using snackbar
            const sb = this.snackBar.open("There is new version available...", "INSTALL NOW", {duration: 5000});
            sb.onAction().subscribe( () => {  //when user press INSTALL
              // TODO: UX CHECK before reloading
              location.reload();  //reloading current version
            }) 
          } 
        })  
    }


    //changing UI base on network status
    this.UpdateNetworlStatusUI();
    window.addEventListener("online",this.UpdateNetworlStatusUI);
    window.addEventListener("offline",this.UpdateNetworlStatusUI);

    //Inviting user for Installation
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
