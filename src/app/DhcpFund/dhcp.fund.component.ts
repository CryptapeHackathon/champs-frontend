import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { environment } from '../../environments/environment';

@Component({
    moduleId: module.id,
    templateUrl: './dhcp.fund.component.html',
    styleUrls: ['./dhcp.fund.component.css']

})

export class DhcpFundComponent implements OnInit {

    private hackathonName: string = '';
    private hackathonIntro: string = '';
    private address: string = '';
    private target_eth: string = '';
    private host_eth: string = '';
    private fund_start_time: string ='';
    private fund_end_time: string = '';
    private game_start_time: string = '';
    private game_end_time: string = '';


    constructor(private http: Http, private activatedRoute: ActivatedRoute){}

    private submitHackathon(){
        this.hackathonName = ((document.getElementById("hackathonName") as HTMLInputElement).value);
        this.hackathonIntro = ((document.getElementById("hackathonIntro") as HTMLInputElement).value);
        this.address = ((document.getElementById("address") as HTMLInputElement).value);
        this.target_eth = ((document.getElementById("target_eth") as HTMLInputElement).value);
        this.host_eth = ((document.getElementById("host_eth") as HTMLInputElement).value);;
        this.fund_start_time = ((document.getElementById("fund_start_time") as HTMLInputElement).value);;
        this.fund_end_time = ((document.getElementById("fund_end_time") as HTMLInputElement).value);;
        this.game_start_time = ((document.getElementById("game_start_time") as HTMLInputElement).value);;
        this.game_end_time = ((document.getElementById("game_end_time") as HTMLInputElement).value);;
    }

    ngOnInit(){
    }

}