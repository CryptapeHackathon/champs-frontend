import { Routes, RouterModule } from "@angular/router";
import { NgModule, Component } from '@angular/core';
import { DhcpListComponent } from './DhcpList/dhcp.list.component';
import { DhcpNewProjectComponent } from './DhcpNewProject/dhcp.new-project.component';
import { DhcpProjectComponent } from './DhcpProject/dhcp.project.component';
import { DhcpIntroductionComponent } from './DhcpIntroduction/dhcp.introduction.component'
import { DhcpRegisterComponent } from './DhcpRegister/dhcp.register.component';
import { DhcpFundComponent } from './DhcpFund/dhcp.fund.component';

const routes: Routes = [
    {
        path: "dhcpList",
        component: DhcpListComponent
    },
    {
        path: "dhcpNew",
        component: DhcpNewProjectComponent
    },
    {
        path: "dhcpProject",
        component: DhcpProjectComponent
    },
    {
        path: "dhcpIntro",
        component: DhcpIntroductionComponent
    },
    {
        path: "dhcpReg",
        component: DhcpRegisterComponent
    },
    {
        path: "dhcpFund",
        component: DhcpFundComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule {}
