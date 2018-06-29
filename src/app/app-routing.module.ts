import { Routes, RouterModule } from "@angular/router";
import { NgModule, Component } from '@angular/core';
import { DhcpListComponent } from './DhcpList/dhcp.list.component';
import { DhcpNewProjectComponent } from './DhcpNewProject/dhcp.new-project.component';
import { DhcpProjectComponent } from './DhcpProject/dhcp.project.component';

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
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule {}