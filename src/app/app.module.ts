import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { DhcpListComponent } from './DhcpList/dhcp.list.component';
import { DhcpNewProjectComponent } from './DhcpNewProject/dhcp.new-project.component';
import { DhcpProjectComponent } from './DhcpProject/dhcp.project.component';
import { DhcpTeamProjectComponent } from './DhcpProject/dhcp.team-project.component';
import { DhcpIntroductionComponent } from './DhcpIntroduction/dhcp.introduction.component';
import { DhcpRegisterComponent } from './DhcpRegister/dhcp.register.component';
import { DhcpFundComponent } from './DhcpFund/dhcp.fund.component';

import { DhcpNavBar } from './navbar/dhcp.navbar.component';

@NgModule({
  declarations: [
    AppComponent,
    DhcpListComponent,
    DhcpNewProjectComponent,
    DhcpProjectComponent,
    DhcpNavBar,
    DhcpTeamProjectComponent,
    DhcpIntroductionComponent,
    DhcpRegisterComponent,
    DhcpFundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    FormsModule
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
