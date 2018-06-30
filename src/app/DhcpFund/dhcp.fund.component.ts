import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { environment } from '../../environments/environment';
import axios from 'axios'
import * as moment from 'moment'
import * as $ from 'jquery'

@Component({
    moduleId: module.id,
    templateUrl: './dhcp.fund.component.html',
    styleUrls: ['./dhcp.fund.component.css']

})

export class DhcpFundComponent implements OnInit {

    private name: string = '';
    private targetEth: number = 0;
    private fundPeriod: string = '';
    private registerPeriod: string = '';
    private gamePeriod: string = '';
    private votingPeriod: string = '';
    private securityDeposit: string = '';
    private registerFee: string = '';
    private first: string = '';
    private secondly: string = '';
    private third: string = '';
    private votingfee: string = '';
    private limit: string = '';
    private lowerLimit: string = '';
    private hostIntroduction: string = '';

    constructor(private http: Http, private activatedRoute: ActivatedRoute){}

    public submitHackathon(e){
      this.name = $('#name').val()
      this.targetEth = parseInt($('#target_eth').val())
      this.fundPeriod = $('#fund_period').val()
      this.registerPeriod = $('#register_period').val()
      this.gamePeriod = $('#game_period').val()
      this.votingPeriod = $('#voting_period').val()
      this.securityDeposit = $('#security_deposit').val()
      this.registerFee = $('#register_fee').val()
      this.first = $('#first').val()
      this.secondly = $('#secondly').val()
      this.third = $('#third').val()
      this.votingfee = $('#voting_fee').val()
      this.lowerLimit = $('#lower_limit').val()
      this.hostIntroduction = $('#host_introduction').val()

      // 时间都转成毫秒
      // 冠军奖励百分比, 4个加起来不能超过100并且要等于100
      const nowTime = Date.now()

      const args = [
        this.targetEth,
        moment(nowTime).add(this.fundPeriod, 'd').valueOf() - nowTime,
        moment(nowTime).add(this.registerPeriod, 'd').valueOf() - nowTime,
        moment(nowTime).add(this.gamePeriod, 'd').valueOf() - nowTime,
        moment(nowTime).add(this.votingPeriod, 'd').valueOf() - nowTime,
        parseInt(this.securityDeposit),
        parseInt(this.registerFee),
        parseInt(this.first),
        parseInt(this.secondly),
        parseInt(this.third),
        parseInt(this.votingfee),
        parseInt(this.lowerLimit),
        parseInt(this.lowerLimit),
      ]

      console.log(args)
      axios.post('http://192.168.2.70:3000/hackathons/encode.json', {
        "function": "CreateHackathon",
      	"args":args,
      	"contract": "hackathonFactory"
      })
      .then(function (response) {
        console.log(response)
        const abiData = response.data.data
        return window.nervosweb3.eth.sendTransaction({
          to: '0x430ae2d2860a2aadd7acdb4fb3c1e7574964217c',
          nonce: Date.now(),
          quota: 1000000000,
          data: abiData,
          value: 0,
          chainId: 1,
          version: 0,
        })
      }).then(data => {
        setTimeout(() => {
          getReceipt(data.hash).then(address => {
            axios.post('http://192.168.2.70:3000/hackathons.json', {
              name: this.name,
              host_introduction: this.hostIntroduction,
              contract: args,
              address,
            })
            .then(data => {
              location.href = `/dhcpProject;projectId=${data.data.id}`
              console.log(data, 'create hackathon')
            })
            .catch(console.error)
          })
        }, 1000)
      })
      .catch(function (error) {
        console.log(error);
      });
    }

    ngOnInit(){
    }
}

async function getReceipt(hash) {
  while(true) {
    const data = await window.nervosweb3.eth.getTransactionReceipt(hash)

    if (!data.result) {
      continue
    }

    const { logs } = data.result
    const a = Array.from(logs[1].topics[2])
    return Promise.resolve(`0x${a.slice(26, a.length).join('')}`)
  }
}
