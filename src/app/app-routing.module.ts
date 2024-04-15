import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContentComponent } from './content/content.component';
import { ArticlesComponent } from './articles/articles.component';
import { AddArticleComponent } from './add-article/add-article.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AboutusComponent } from './aboutus/aboutus.component';

const routes: Routes = [ {path:'dashboard', component:DashboardComponent},
  {path: '', component: ContentComponent},
                        {path:'articles', component: ArticlesComponent},
                      {path:'addarticles', component:AddArticleComponent},
                    {path:'contactus', component:ContactUsComponent},
                    {path:'footer', component:FooterComponent},
                    {path:'login',component:LoginComponent},
                    {path:'aboutus',component:AboutusComponent}

                  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
