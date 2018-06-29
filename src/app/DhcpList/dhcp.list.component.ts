import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment'
import { Http } from '@angular/http'

@Component({
    moduleId: module.id,
    templateUrl: './dhcp.list.component.html',
    styleUrls: ['./dhcp.list.component.css']
})

export class DhcpListComponent implements OnInit {

    private hackathons: Object[];
    private selectedHackathons: Object[];

    constructor(public http: Http) { }

    private selectHackathon(filterName: string) {
        this.selectedHackathons = this.hackathons.filter(x => x['current_status'] == filterName)
    }

    ngOnInit() {
        var url = environment.backendServerUrl;
        var methodName = environment.backendMethods.getMethod;

        this.http.get("http://" + url + "/" + methodName)
            .subscribe(
                (data) => {
                    console.log('onNext')
                    this.hackathons = JSON.parse(data['_body']);
                    for(var i = 0; i < this.hackathons.length; i++){
                        var currentHackathon = this.hackathons[i];
                    }
                    this.selectedHackathons = this.hackathons.filter(x => x['current_status'] == 'preparation')
                    console.log(this.selectedHackathons)
                },
                (err) => {
                    console.log('error: ' + err)
                },
                () => {
                    console.log('complete')
                }
            );
    }
}