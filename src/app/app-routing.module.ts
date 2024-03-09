import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContentComponent } from './content/content.component';
import { ArticlesComponent } from './articles/articles.component';
import { AddArticleComponent } from './add-article/add-article.component';
import { ContactUsComponent } from './contact-us/contact-us.component';

const routes: Routes = [{path: '', component: ContentComponent},
                        {path:'articles', component: ArticlesComponent},
                      {path:'addarticles', component:AddArticleComponent},
                    {path:'contactus', component:ContactUsComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
