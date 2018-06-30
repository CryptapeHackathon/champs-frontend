import { Component } from '@angular/core'
import { Http } from '@angular/http';

@Component({
    moduleId: module.id,
    templateUrl: './dhcp.register.component.html',
    styleUrls: ['./dhcp.register.component.css']
})

export class DhcpRegisterComponent {
    private userName: string = 'default';
    private password: string = 'defaultPsswd';
    private address: string = 'dfaultAddr';
    private bio: string = 'defaultBio';

    private user = {
        userName: this.userName,
        password: this.password
    }
    constructor(private http: Http) { }

    private registerNewUser() {
        // this.userName = ((document.getElementById("userName") as HTMLInputElement).value);
        // this.password = ((document.getElementById("password") as HTMLInputElement).value);
        // this.address = ((document.getElementById("address") as HTMLInputElement).value);
        // this.bio = ((document.getElementById("bio") as HTMLInputElement).value);
        console.log(this.userName);
        console.log(this.password);
        console.log(this.address);
        console.log(this.bio);
        
        var postData = {
            name: this.userName,
            introduction: this.bio,
            address: this.address,
            password: this.password
        };
        
        var headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');

        this.http.post('http://192.168.2.70:3000/users.json', postData)
            .subscribe(
                (res) => {
                    var result = res;
                    console.log(res);
                }, 
                (err) => {
                    console.log(err);
                }, 
                () => {
                    console.log('onComplete')
                });
    }
} 