import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component'
import {AddDriverComponent} from './add-driver/add-driver.component'
import {AddPackageComponent} from './add-package/add-package.component'
import {DeleteDriverComponent} from './delete-driver/delete-driver.component'
import {DeletePackageComponent} from './delete-package/delete-package.component'
import {InvalidDataComponent} from './invalid-data/invalid-data.component'
import {ListDriversComponent} from './list-drivers/list-drivers.component'
import {ListPackagesComponent} from './list-packages/list-packages.component'
import {StatisticsComponent} from './statistics/statistics.component'
import {UpdateDriverComponent} from './update-driver/update-driver.component'
import {UpdatePackageComponent} from './update-package/update-package.component'
import { TranslateDescriptionComponent } from './translate-description/translate-description.component';



export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'add-driver', component: AddDriverComponent }, 
    { path: 'add-package', component: AddPackageComponent },
    { path: 'delete-driver', component: DeleteDriverComponent },
    { path: 'delete-package', component: DeletePackageComponent },
    { path: 'list-drivers', component: ListDriversComponent }, 
    { path: 'list-packages', component: ListPackagesComponent },
    { path: 'statistics', component: StatisticsComponent },
    { path: 'update-driver', component: UpdateDriverComponent },
    { path: 'translate', component:TranslateDescriptionComponent},
    { path: 'update-package', component: UpdatePackageComponent },
    { path: 'invalid-data', component: InvalidDataComponent },
    { path: '**', component: PageNotFoundComponent }

];


