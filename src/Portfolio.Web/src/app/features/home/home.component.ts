import { Component } from '@angular/core';
import { HeroComponent } from './sections/hero/hero.component';
import { AboutComponent } from './sections/about/about.component';
import { SkillsComponent } from './sections/skills/skills.component';
import { ExperienceComponent } from './sections/experience/experience.component';
import { ProjectsComponent } from './sections/projects/projects.component';
import { EducationComponent } from './sections/education/education.component';
import { CertificationsComponent } from './sections/certifications/certifications.component';
import { GithubStatsComponent } from './sections/github-stats/github-stats.component';
import { ContactComponent } from './sections/contact/contact.component';
import { ScrollToTopComponent } from '../../shared/components/scroll-to-top/scroll-to-top.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeroComponent,
    AboutComponent,
    SkillsComponent,
    ExperienceComponent,
    ProjectsComponent,
    EducationComponent,
    CertificationsComponent,
    GithubStatsComponent,
    ContactComponent,
    ScrollToTopComponent,
  ],
  template: `
    <app-hero />
    <app-about />
    <app-skills />
    <app-experience />
    <app-projects />
    <app-education />
    <app-certifications />
    <app-github-stats />
    <app-contact />
    <app-scroll-to-top />
  `,
})
export class HomeComponent {}
