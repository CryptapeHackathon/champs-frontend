import { Component, OnInit } from "@angular/core"
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Http } from '@angular/http' 
import { environment } from "../../environments/environment";

@Component({
    moduleId: module.id,
    templateUrl: './dhcp.project.component.html',
    styleUrls: ['./dhcp.project.component.css']
})

export class DhcpProjectComponent implements OnInit {
    private poolInfo: boolean = true;
    private showTeamProject: boolean = false;
    private projectId: string = "";
    private currentTeamProjectName: string = "";
    private teamName: string = ""
    private hackathons: Object[];
    private teams: Object[];
    private selectedHackathon: Object = {current_status:'default'};
    private statusMap = {
        default: -1,
        preparation: 0,
        crow_funding: 1,
        apply_participation: 2,
        gaming: 3,
        voting: 4,
        finished: 5,
        failed: 6
    }
    private host_fund: number = 0;
    private target_fund: number = 0;
    

    //need a functino to get all information about a specific hks
    ngOnInit() {
        console.log("onint called");
        console.log("going to call get information for the hackthon Id")
        // subscribe to router event
        this.activatedRoute.params.subscribe((params: Params) => {
            this.projectId = params['projectId'];
            console.log(this.projectId);
        });

        var url = environment.backendServerUrl;
        var getHackasons = environment.backendMethods.getMethod;
        var getTeams = environment.backendMethods.getTeamMethod;

        this.http.get("http://" + url + "/" + getHackasons)
        .subscribe(
            (data) => {
                console.log('onNext')
                this.hackathons = JSON.parse(data['_body']);
                console.log(this.projectId);
                this.selectedHackathon = this.hackathons.filter(x => x['id'] == Number.parseInt(this.projectId))[0];
                if(this.selectedHackathon['host_fund_eth'] != undefined 
                    &&this.selectedHackathon['host_fund_eth'] != null
                    && this.selectedHackathon['target_fund_eth'] != undefined
                    && this.selectedHackathon['target_fund_eth'] != null){
                    this.host_fund = this.selectedHackathon['host_fund_eth'];
                    this.target_fund = this.selectedHackathon['target_fund_eth'];    
                }
                console.log(this.selectedHackathon)
            },
            (err) => {
                console.log('error: ' + err)
            },
            () => {
                console.log('get hackathons complete');
            }
        );

        console.log("http://" + url + "/hackathons/" + this.projectId + "/teams.json");
        this.http.get("http://" + url + "/hackathons/" + this.projectId + "/teams.json")
        .subscribe(
            (data) => {
                this.teams = JSON.parse(data['_body']);
                console.log(this.teams);
            },
            (err) => {
                console.error('error: ' + err)
            },
            () => {
                console.log('get teams complete');
            }
        );
    }

    constructor(private activatedRoute: ActivatedRoute, private http:Http) { }

    

    private showByStatus(status: string, byStatus: string){
        var sequence: number = this.statusMap[status];
        var bar: number = this.statusMap[byStatus];
        if(sequence >= bar){
            return true;
        }else {
            return false;
        }
    }

    private showTeamProjectWithName(teamName: string) {
        this.teamName = teamName;
        this.showTeamProject = true;
    }

    private getHackathon(getHackathonId: number) {
        //this method will get all information from back-end
    }

    private closeTeamProject() {
        this.showTeamProject = false;
    }

    private showPoolInfo() {
        this.poolInfo = true;
    }

    private showTeams() {
        this.poolInfo = false;
    }

    private setProgressClass(poolCurrent: number, poolTotal: number) {
        if (poolTotal != 0) {
            if (poolCurrent / poolTotal >= 1) {
                return "bg-success"
            }
        }
        return "";
    }

    private setPercentage(poolCurrent: number, poolTotal: number) {
        if (poolTotal == 0) {
            return 0;
        }
        return (poolCurrent / poolTotal) * 100 + "%";
    }
}