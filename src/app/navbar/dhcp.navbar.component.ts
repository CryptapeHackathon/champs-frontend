import { Component } from "@angular/core";
import { environment } from "../../environments/environment"

@Component({
    selector: "dhcp-navbar",
    templateUrl: './dhcp.navbar.component.html',
    styleUrls: ['./dhcp.navbar.component.css']
})

export class DhcpNavBar{
    private frontendurl = environment.angularServerUrl;
    private path = "dhcpList";
    private introductionPath = "dhcpIntro";
    private homePath = "http://" + this.frontendurl + "/" + this.path;
    private introductionFullPath = "http://" + this.frontendurl + "/" + this.introductionPath;
}