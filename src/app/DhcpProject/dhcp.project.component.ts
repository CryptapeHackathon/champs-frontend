import { Component, OnInit } from "@angular/core"
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Http } from '@angular/http'
import { environment } from "../../environments/environment";
import axios from 'axios'

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
    private teamProject: string = ""
    private hackathons: Object[];
    private teams: Object[];
    private selectedHackathon: any = { current_status: 'default' };
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

                    console.log(this.selectedHackathon, 'selectedHackathon')
                    switch(this.selectedHackathon.current_status) {
                      case 'preparation':
                        this.selectedHackathon.statusText = "开始众筹"
                        break;
                      case 'crow_funding':
                        this.selectedHackathon.statusText = "我要捐款"
                        break;
                      case 'apply_participation':
                        this.selectedHackathon.statusText = "我要报名"
                        break;
                      case 'gaming':
                        this.selectedHackathon.statusText = "结束比赛"
                        break;
                    }
                    if(this.selectedHackathon['contract'] != undefined && this.selectedHackathon['contract'] != null){
                        console.log(this.selectedHackathon['contract'])
                        this.host_fund = this.selectedHackathon['contract']['crowd_fund_target'] -
                            this.selectedHackathon['contract']['remain_crowd_fund'];
                        this.target_fund = this.selectedHackathon['contract']['crowd_fund_target'];
                        console.log(this.selectedHackathon['contract'])
                        console.log(this.selectedHackathon)
                    }
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

    constructor(private activatedRoute: ActivatedRoute, private http: Http) { }



    private showByStatus(status: string, byStatus: string) {
        var sequence: number = this.statusMap[status];
        var bar: number = this.statusMap[byStatus];
        if (sequence >= bar) {
            return true;
        } else {
            return false;
        }
    }


    voteForTeamWithAddress(address){
        alert(address)
    }

    private showTeamProjectWithName(teamName: string, teamProject: string) {
        this.teamName = teamName;
        this.teamProject = teamProject;
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

    public statusBtn() {
      console.log("status ben")
      console.log(this.selectedHackathon);

      (async () => {
        switch(this.selectedHackathon.current_status){
          case 'preparation':
          await preparation(this.selectedHackathon)
          location.reload()
          break;
          case 'crow_funding':
          await crowFunding(this.selectedHackathon)
          // location.reload()
          break;

          case 'apply_participation':
          await startSignUp(this.selectedHackathon)
          break;
          case 'gaming':
          await startVote(this.selectedHackathon)
          break;
        }
      })().catch(console.error)

    }
}

async function preparation(selectedHackathon) {
  const { data } = await axios.post('http://192.168.2.70:3000/hackathons/encode.json', {
    "function": "startCrowdFound",
    "args":[],
    "contract": "hackathon"
  })

  const res = await window['nervosweb3'].eth.sendTransaction({
    to: selectedHackathon.address,
    nonce: Date.now(),
    quota: 1000000000,
    data: data.data,
    value: 0,
    chainId: 1,
    version: 0,
  })

  await getReceipt(res.hash)
}

// window.MyAddress
async function crowFunding(selectedHackathon) {
  const address = window['MyAddress']
  console.log({
    "function": "buy",
    "args":[address],
    "contract": "hackathon"
  })
  const { data } = await axios.post('http://192.168.2.70:3000/hackathons/encode.json', {
    "function": "buy",
    "args":[address],
    "contract": "hackathon"
  })


  const res = await window['nervosweb3'].eth.sendTransaction({
    to: selectedHackathon.address,
    nonce: Date.now(),
    quota: 1000000000,
    data: data.data,
    value: 20,
    chainId: 1,
    version: 0,
  })

  await getReceipt(res.hash)
}

async function startSignUp(selectedHackathon) {
  const { data } = await axios.post('http://192.168.2.70:3000/hackathons/encode.json', {
    "function": "startSignUp",
    "args":[],
    "contract": "hackathon"
  })

  const res = await window['nervosweb3'].eth.sendTransaction({
    to: selectedHackathon.address,
    nonce: Date.now(),
    quota: 1000000000,
    data: data.data,
    value: 20,
    chainId: 1,
    version: 0,
  })

  await getReceipt(res.hash)
}

async function startVote(selectedHackathon) {
  const { data } = await axios.post('http://192.168.2.70:3000/hackathons/encode.json', {
    "function": "startVote",
    "args":[],
    "contract": "hackathon"
  })

  const res = await window['nervosweb3'].eth.sendTransaction({
    to: selectedHackathon.address,
    nonce: Date.now(),
    quota: 1000000000,
    data: data.data,
    value: 20,
    chainId: 1,
    version: 0,
  })

  await getReceipt(res.hash)
}

async function getReceipt(hash) {
  while(true) {
    const data = await window['nervosweb3'].eth.getTransactionReceipt(hash)

    if (!data.result) {
      continue
    }

    console.log(data)
    return data
  }
}
