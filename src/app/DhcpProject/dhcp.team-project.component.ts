import { Component, Input, Output, EventEmitter, OnInit } from "@angular/core";
import { Http } from "@angular/http";

@Component({
    selector: 'team-project',
    templateUrl: './dhcp.team-project.component.html',
    styleUrls: ['./dhcp.team-project.component.css']
})

export class DhcpTeamProjectComponent implements OnInit{
    @Input() TeamName: string;
    
    constructor(private http: Http){}

    private teams: Object[];
    private intro: string = "ssss";
    private editIntro(){
        this.intro = ((document.getElementById("teamIntro") as HTMLInputElement).value);
        alert(this.intro);
    }

    ngOnInit(){
        this.http.get('http://192.168.2.70:3000/hackathons/2/teams.json')
        .subscribe(
            (data) => {
                console.log('onNext')
                this.teams = JSON.parse(data['_body']);
            },
            (err) => {
                console.error(err);
            },
            () => {}
        )
    }
}