import { Routes } from '@angular/router';
import { ResolverService } from './resolver.service';
import { DepartmentDashboardComponent } from './pages/department-dashboard/department-dashboard.component';
import { DepartmentListComponent } from './pages/department-list/department-list.component';
import { EmployeeDashboardComponent } from './pages/employee-dashboard/employee-dashboard.component';


export const routes: Routes = [  
    { path: 'department-dashboard/:id', component: DepartmentDashboardComponent, resolve: { data: ResolverService} },
    { path: 'employee-dashboard/:id', component: EmployeeDashboardComponent, resolve: { data: ResolverService} },
    { path: 'department-list', component: DepartmentListComponent, resolve: { data: ResolverService} },
    { path: '', component: DepartmentListComponent, resolve: { data: ResolverService} },
];
