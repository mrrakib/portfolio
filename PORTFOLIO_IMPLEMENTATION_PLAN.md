# Senior Full-Stack Portfolio Website - Implementation Plan

## Context

**Problem:** Need a premium, professional portfolio website that showcases senior-level engineering capability to recruiters, companies, remote employers, freelance clients, and startup founders.

**Approach:** Single-deployment architecture — Angular 18 SPA served from a .NET 8 Web API. All content driven by API (no hardcoded data in frontend). MySQL database with Pomelo EF Core (database-first, snake_case). Designed for future CMS extensibility without requiring frontend changes.

**Intended Outcome:** A production-ready, SEO-optimized, accessible, dark/light mode portfolio that achieves Lighthouse 90+ scores, sub-2s FCP, WCAG 2.1 AA compliance, and serves as a portfolio piece itself.

---

## 1. Project Vision

- Present professional credentials with maximum impact
- Lighthouse 90+ across all categories
- Sub-2-second First Contentful Paint
- WCAG 2.1 AA accessibility compliance
- Dark/Light mode with system preference detection
- Single .NET 8 application serving both API and SPA
- Future CMS integration without frontend changes

**Not in Phase 1:** Admin panel, user auth, real-time features, blog CMS

---

## 2. Functional Requirements

### Sections (Recommended)
| Section | Priority | Justification |
|---------|----------|---------------|
| Hero | Must | First impression, name + role + CTA |
| About | Must | Personal brand story |
| Skills | Must | Technical competency overview |
| Experience | Must | Work history timeline |
| Projects | Must | Portfolio showcase |
| Education | Must | Academic credentials |
| Certifications | Should | Professional validation |
| GitHub Statistics | Should | Open source activity proof |
| Tech Stack | Should | Visual technology display |
| Resume Download | Must | Recruiters expect this |
| Contact | Must | Lead generation |
| Social Links | Must | Professional network |
| Blog Placeholder | Could | Future content marketing |
| Testimonials | Could | Social proof (Phase 2) |
| Services | Could | Freelance positioning (Phase 2) |

### API Endpoints
| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/profile` | GET | Name, title, bio, avatar, tagline |
| `/api/projects` | GET | Portfolio projects list |
| `/api/projects/{slug}` | GET | Single project detail |
| `/api/experience` | GET | Work history |
| `/api/skills` | GET | Skills grouped by category |
| `/api/education` | GET | Degrees and courses |
| `/api/certifications` | GET | Professional certifications |
| `/api/github/stats` | GET | GitHub statistics (cached) |
| `/api/contact` | POST | Contact form submission |
| `/api/resume` | GET | Resume file download |
| `/api/social-links` | GET | Social media links |
| `/api/meta/{page}` | GET | SEO meta data per route |

### Common API Response Model
```
{
  "status_code": 200,
  "is_success": true,
  "errors": null | [{ "error_message": "...", "error_code": "..." }],
  "data": T | T[]
}
```

---

## 3. Non-Functional Requirements

- **Performance:** FCP < 2s, LCP < 2.5s, CLS < 0.1, FID < 100ms
- **Accessibility:** WCAG 2.1 Level AA
- **SEO:** Meta tags, OG, Twitter Cards, JSON-LD, sitemap, robots.txt
- **Security:** CORS, rate limiting, input validation, security headers
- **Responsive:** Mobile-first, breakpoints at 480/768/1024/1280/1536px
- **Browser Support:** Last 2 versions of Chrome, Firefox, Safari, Edge

---

## 4. UI/UX Design Plan

### Color Palette
```
Primary:       #1a1a2e (Deep Navy) / #0f3460 (Royal Blue)
Accent:        #e94560 (Coral Red) — CTAs, highlights
Secondary:     #16213e (Midnight) 
Surface Light: #ffffff / #f8f9fa / #e9ecef
Surface Dark:  #0d1117 / #161b22 / #21262d
Text Light:    #1a1a2e / #4a4a6a
Text Dark:     #e6edf3 / #8b949e
Success:       #2ea043
Warning:       #d29922
```

### Typography
- **Headings:** Inter (Google Fonts) — clean, modern, professional
- **Body:** Inter — excellent readability at all sizes
- **Monospace:** JetBrains Mono — code snippets
- **Scale:** 1.25 ratio (Major Third): 12, 14, 16, 20, 25, 31, 39, 49px
- **Line height:** 1.5 body, 1.2 headings

### Spacing System
- Base unit: 4px
- Scale: 4, 8, 12, 16, 24, 32, 48, 64, 96, 128px
- Section padding: 96px vertical (desktop), 64px (mobile)

### Animation Strategy
- **Library:** CSS animations + Angular's `@angular/animations` for route transitions
- **Principles:** 
  - Entrance animations: fade-up with 20px translate, 0.6s ease-out
  - Stagger children: 0.1s delay between items
  - Scroll-triggered via Intersection Observer
  - Reduced motion: respect `prefers-reduced-motion`
  - No animation on first paint (performance)
- **Transitions:** 200ms for hover states, 300ms for theme toggle, 400ms for route changes

### Icons
- **Lucide Icons** (tree-shakeable, consistent, MIT licensed)
- Custom SVG for brand/tech stack icons (devicons)

### Dark/Light Mode
- System preference detection on first visit
- Manual toggle with localStorage persistence
- CSS custom properties for all colors
- Smooth 300ms transition between themes

### Responsive Breakpoints
```
xs: 0-479px     (mobile portrait)
sm: 480-767px   (mobile landscape)
md: 768-1023px  (tablet)
lg: 1024-1279px (small desktop)
xl: 1280-1535px (desktop)
2xl: 1536px+    (large desktop)
```

---

## 5. Angular Architecture

### Folder Structure
```
src/Portfolio.Web/
├── angular.json
├── package.json
├── tsconfig.json
├── tsconfig.app.json
├── src/
│   ├── index.html
│   ├── main.ts
│   ├── styles.css                    # Global styles, CSS variables
│   ├── app/
│   │   ├── app.component.ts          # Root standalone component
│   │   ├── app.routes.ts             # Route definitions
│   │   ├── app.config.ts             # App configuration providers
│   │   │
│   │   ├── core/                     # Singleton services, guards, interceptors
│   │   │   ├── services/
│   │   │   │   ├── api.service.ts           # Axios instance + response parsing
│   │   │   │   ├── theme.service.ts         # Dark/light mode management
│   │   │   │   ├── seo.service.ts           # Meta tags, OG, JSON-LD
│   │   │   │   ├── scroll.service.ts        # Scroll position, smooth scroll
│   │   │   │   └── loading.service.ts       # Global loading state (Signal)
│   │   │   ├── interceptors/
│   │   │   │   └── axios.interceptor.ts     # Request/response interceptor setup
│   │   │   ├── models/
│   │   │   │   ├── api-response.model.ts    # Common response wrapper
│   │   │   │   ├── profile.model.ts
│   │   │   │   ├── project.model.ts
│   │   │   │   ├── experience.model.ts
│   │   │   │   ├── skill.model.ts
│   │   │   │   ├── education.model.ts
│   │   │   │   ├── certification.model.ts
│   │   │   │   ├── github-stats.model.ts
│   │   │   │   ├── contact.model.ts
│   │   │   │   └── social-link.model.ts
│   │   │   └── constants/
│   │   │       ├── api-endpoints.ts         # Centralized endpoint URLs
│   │   │       └── app.constants.ts         # App-wide constants
│   │   │
│   │   ├── shared/                   # Reusable UI components
│   │   │   ├── components/
│   │   │   │   ├── section-header/
│   │   │   │   ├── skill-badge/
│   │   │   │   ├── project-card/
│   │   │   │   ├── timeline-item/
│   │   │   │   ├── social-icon/
│   │   │   │   ├── loading-spinner/
│   │   │   │   ├── theme-toggle/
│   │   │   │   ├── scroll-to-top/
│   │   │   │   └── animated-section/       # Intersection Observer wrapper
│   │   │   ├── directives/
│   │   │   │   ├── animate-on-scroll.directive.ts
│   │   │   │   └── lazy-image.directive.ts
│   │   │   └── pipes/
│   │   │       ├── truncate.pipe.ts
│   │   │       └── safe-url.pipe.ts
│   │   │
│   │   ├── layout/                   # Structural components
│   │   │   ├── header/               # Navbar with navigation
│   │   │   ├── footer/               # Footer with links
│   │   │   └── layout.component.ts   # Shell (header + router-outlet + footer)
│   │   │
│   │   ├── features/                 # Feature sections (lazy-loaded)
│   │   │   ├── home/                 # Landing page orchestrator
│   │   │   │   ├── home.component.ts
│   │   │   │   ├── sections/
│   │   │   │   │   ├── hero/
│   │   │   │   │   ├── about/
│   │   │   │   │   ├── skills/
│   │   │   │   │   ├── experience/
│   │   │   │   │   ├── projects/
│   │   │   │   │   ├── education/
│   │   │   │   │   ├── certifications/
│   │   │   │   │   ├── github-stats/
│   │   │   │   │   ├── tech-stack/
│   │   │   │   │   └── contact/
│   │   │   │   └── home.routes.ts
│   │   │   ├── project-detail/       # Individual project page
│   │   │   └── not-found/            # 404 page
│   │   │
│   │   └── environments/
│   │       ├── environment.ts
│   │       └── environment.prod.ts
│   │
│   └── assets/
│       ├── images/
│       ├── icons/
│       └── fonts/
```

### Architecture Decisions

**Standalone Components:** All components are standalone (Angular 18 default). No NgModules.

**Signals vs RxJS:**
- **Signals** for: UI state (theme, loading, scroll position), component-local state, derived/computed values
- **RxJS** for: HTTP responses from axios (wrapped in Observable-like patterns), complex async flows, event streams
- Principle: Signals for synchronous reactivity, RxJS for async data fetching

**State Management:** No external library (NgRx overkill for portfolio). Use:
- Services with Signals for global state (theme, loading)
- Component-level signals for local state
- API service caches responses in-memory (data rarely changes)

**Lazy Loading:**
- Home page loads eagerly (it IS the portfolio)
- Project detail page lazy-loaded
- 404 page lazy-loaded
- All section components loaded together with Home (they're above/below fold — lazy per-section would cause layout shift)

**API Layer (Axios):**
- Single axios instance configured in `api.service.ts`
- Base URL from environment config
- Response interceptor parses `ApiResponse<T>` wrapper
- Error interceptor maps to typed error model
- Request interceptor adds common headers

**Image Optimization:**
- `loading="lazy"` on below-fold images
- `NgOptimizedImage` directive for critical images
- WebP format with fallback
- Responsive `srcset` for different viewport sizes

---

## 6. .NET Architecture

### Project Structure
```
src/Portfolio.Api/
├── Portfolio.Api.csproj
├── Program.cs
├── appsettings.json
├── appsettings.Development.json
├── appsettings.Production.json
│
├── Controllers/
│   ├── ProfileController.cs
│   ├── ProjectsController.cs
│   ├── ExperienceController.cs
│   ├── SkillsController.cs
│   ├── EducationController.cs
│   ├── CertificationsController.cs
│   ├── GithubController.cs
│   ├── ContactController.cs
│   ├── ResumeController.cs
│   └── SocialLinksController.cs
│
├── Services/
│   ├── Interfaces/
│   │   ├── IProfileService.cs
│   │   ├── IProjectService.cs
│   │   ├── IExperienceService.cs
│   │   ├── ISkillService.cs
│   │   ├── IEducationService.cs
│   │   ├── ICertificationService.cs
│   │   ├── IGithubService.cs
│   │   ├── IContactService.cs
│   │   └── ISocialLinkService.cs
│   └── Implementations/
│       ├── ProfileService.cs
│       ├── ProjectService.cs
│       ├── ExperienceService.cs
│       ├── SkillService.cs
│       ├── EducationService.cs
│       ├── CertificationService.cs
│       ├── GithubService.cs         # Calls GitHub API, caches results
│       ├── ContactService.cs        # Email notification
│       └── SocialLinkService.cs
│
├── Data/
│   ├── PortfolioDbContext.cs
│   ├── Entities/                    # EF Core entities (maps to DB tables)
│   │   ├── Profile.cs
│   │   ├── Project.cs
│   │   ├── ProjectTechnology.cs
│   │   ├── Experience.cs
│   │   ├── Skill.cs
│   │   ├── SkillCategory.cs
│   │   ├── Education.cs
│   │   ├── Certification.cs
│   │   ├── SocialLink.cs
│   │   └── ContactMessage.cs
│   └── Configurations/             # EF Fluent API configs
│       └── ...EntityConfiguration.cs
│
├── DTOs/
│   ├── ProfileDto.cs
│   ├── ProjectDto.cs
│   ├── ProjectDetailDto.cs
│   ├── ExperienceDto.cs
│   ├── SkillDto.cs
│   ├── SkillCategoryDto.cs
│   ├── EducationDto.cs
│   ├── CertificationDto.cs
│   ├── GithubStatsDto.cs
│   ├── ContactRequestDto.cs
│   ├── SocialLinkDto.cs
│   └── MetaDto.cs
│
├── Models/
│   ├── ApiResponse.cs              # Common response wrapper
│   ├── ApiError.cs
│   └── PaginationMeta.cs
│
├── Middleware/
│   ├── ExceptionMiddleware.cs      # Global exception handler
│   └── RequestLoggingMiddleware.cs
│
├── Extensions/
│   ├── ServiceCollectionExtensions.cs
│   └── ApplicationBuilderExtensions.cs
│
├── Mappings/
│   └── MappingProfile.cs           # AutoMapper or manual mapping
│
├── Configuration/
│   └── GithubOptions.cs            # Typed configuration classes
│
└── wwwroot/                        # Angular build output goes here
    ├── index.html
    ├── *.js
    ├── *.css
    └── assets/
```

### Key .NET Decisions

**No Repository Pattern:** Services query DbContext directly — repository adds unnecessary abstraction for a read-heavy portfolio with no complex transactions.

**Dependency Injection:** All services registered as Scoped. GitHub service uses IMemoryCache for caching.

**Logging:** Serilog with structured logging. Console sink for dev, File sink for production.

**Exception Handling:** Global middleware catches unhandled exceptions, returns `ApiResponse` format with 500 status.

**Static File Hosting + SPA Fallback:**
```csharp
// Program.cs key configuration:
app.UseStaticFiles();  // Serve wwwroot (Angular build)
app.MapControllers();  // API routes under /api
app.MapFallbackToFile("index.html");  // SPA client-side routing
```

**AutoMapper:** For Entity → DTO mapping. Manual mapping acceptable for simple DTOs.

---

## 7. Database Design (MySQL)

### Tables (snake_case)
```sql
-- profile (single row)
profile: id, full_name, title, subtitle, bio, avatar_url, 
         tagline, location, email, phone, resume_url,
         created_at, updated_at

-- experience
experience: id, company_name, position, description, 
            start_date, end_date, is_current, company_url,
            company_logo_url, location, sort_order,
            created_at, updated_at

-- skill_category
skill_category: id, name, sort_order, icon, created_at

-- skill
skill: id, skill_category_id, name, proficiency_level,
       icon, sort_order, created_at

-- project
project: id, title, slug, short_description, description,
         image_url, live_url, github_url, is_featured,
         sort_order, created_at, updated_at

-- project_technology
project_technology: id, project_id, technology_name, sort_order

-- education
education: id, institution, degree, field_of_study,
           start_date, end_date, description, logo_url,
           sort_order, created_at

-- certification
certification: id, name, issuing_organization, issue_date,
               expiry_date, credential_id, credential_url,
               logo_url, sort_order, created_at

-- social_link
social_link: id, platform, url, icon, sort_order, is_active, created_at

-- contact_message
contact_message: id, name, email, subject, message,
                 is_read, created_at
```

### EF Core Configuration
- Pomelo.EntityFrameworkCore.MySql package
- `UseSnakeCaseNamingConvention()` via EFCore.NamingConventions package
- Database-first: scaffold from existing DB using `dotnet ef dbcontext scaffold`
- Connection string in appsettings (with user secrets for production)

---

## 8. Routing Strategy

### Angular Routes
```
/                    → Home (all sections)
/projects/:slug      → Project detail page
/**                  → 404 Not Found
```

### Navigation
- Single-page scroll on home (anchor links: `/#about`, `/#skills`, etc.)
- Smooth scroll to sections via `scroll.service.ts`
- Active section highlighting in navbar via Intersection Observer
- Mobile: hamburger menu with slide-in panel

### .NET Routing
- All `/api/*` routes → Controllers
- All other routes → `index.html` (Angular handles client-side)

---

## 9. Data Flow

```
[MySQL DB] → [EF Core Entities] → [Services] → [DTOs] → [Controllers] → [ApiResponse<T>]
     ↕                                                                          ↓
[Seed Data/                                                               [HTTP JSON]
 Migration]                                                                     ↓
                                                              [Angular axios] → [ApiResponse<T> parsed]
                                                                                ↓
                                                              [Typed Models] → [Signals/Component State]
                                                                                ↓
                                                              [Template Binding] → [Rendered UI]
```

---

## 10. Hosting Strategy

**Single Deployment Model:**
1. Angular `ng build --configuration=production` outputs to `src/Portfolio.Api/wwwroot/`
2. .NET serves static files from wwwroot
3. API controllers handle `/api/*`
4. All non-API, non-static routes fall back to `index.html`
5. Single process, single port, single deployment

**Build Pipeline:**
```
npm run build → copies dist to wwwroot → dotnet publish → deploy single artifact
```

---

## 11. Deployment Strategy

### Local Development
- Angular dev server on port 4200 with proxy to .NET on 5000
- .NET runs on port 5000/5001 (HTTP/HTTPS)
- `proxy.conf.json` forwards `/api` calls during development

### Production Build
1. `cd src/Portfolio.Web && ng build --configuration=production`
2. Output → `src/Portfolio.Api/wwwroot/`
3. `cd src/Portfolio.Api && dotnet publish -c Release -o ./publish`
4. Deploy `publish/` folder

### CI/CD (GitHub Actions)
```yaml
- Checkout → Setup Node → npm ci → ng build
- Setup .NET → dotnet publish
- Deploy to hosting (Azure App Service / VPS / Docker)
```

### Docker
```dockerfile
# Multi-stage: Node build → .NET build → Runtime
FROM node:22 AS angular-build
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS dotnet-build
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime
```

---

## 12. Performance Strategy

- **Angular:** Tree-shaking, AOT compilation, lazy routes, deferred views
- **Images:** WebP, responsive srcset, lazy loading, preload hero image
- **Fonts:** `font-display: swap`, preload critical fonts, subset
- **CSS:** Minimal global styles, component-scoped CSS, no framework overhead
- **Caching:** API responses cached in-memory (portfolio data is static), HTTP cache headers
- **Bundle:** Keep under 200KB initial (gzipped), code-split project detail

---

## 13. Security

- **CORS:** Restrict to known origins (production domain only)
- **Rate Limiting:** ASP.NET Core Rate Limiting middleware (contact form: 5/min)
- **Input Validation:** FluentValidation on contact form DTO
- **Headers:** HSTS, X-Content-Type-Options, X-Frame-Options, CSP, Referrer-Policy
- **Contact Form:** Honeypot field + rate limit (no CAPTCHA initially)
- **Secrets:** User secrets for dev, environment variables for production

---

## 14. SEO Strategy

- **Meta Tags:** Title, description, keywords per page via `seo.service.ts`
- **Open Graph:** og:title, og:description, og:image, og:url, og:type
- **Twitter Cards:** twitter:card, twitter:title, twitter:description, twitter:image
- **JSON-LD:** Person schema, WebSite schema on homepage
- **Sitemap:** Static `sitemap.xml` served from wwwroot
- **robots.txt:** Allow all, link to sitemap
- **Canonical URLs:** Self-referencing canonicals on all pages
- **Pre-rendering consideration:** For Phase 2, consider Angular Universal or Prerender.io for crawlers

---

## 15. Accessibility

- Semantic HTML5 (header, nav, main, section, article, footer)
- ARIA labels on interactive elements
- Skip-to-content link
- Focus management on route changes
- Color contrast ratio ≥ 4.5:1 (AA)
- Keyboard navigation for all interactive elements
- Screen reader-friendly content order
- `prefers-reduced-motion` respected

---

## 16. Animation Guidelines

| Element | Animation | Duration | Easing |
|---------|-----------|----------|--------|
| Section enter | fade-up (20px) | 600ms | ease-out |
| Cards | fade-up staggered (100ms) | 500ms | ease-out |
| Skill bars | width grow | 800ms | ease-in-out |
| Navigation | background opacity | 200ms | ease |
| Theme toggle | rotate + scale | 300ms | ease |
| Hover states | transform/opacity | 200ms | ease |
| Route transition | fade | 400ms | ease |
| Hero text | typewriter or fade-in | 1000ms | custom |

**Rules:**
- No animation on initial page load (after LCP)
- Intersection Observer threshold: 0.2
- Once animated, don't re-animate on scroll back
- Mobile: reduce animation distances by 50%

---

## 17. Future Enhancements (Phase 2+)

- Admin panel (Angular + .NET Identity)
- Blog with markdown support
- Testimonials management
- Analytics dashboard
- Multi-language support (i18n)
- PWA capabilities
- Email integration (SendGrid/SMTP)
- Image upload + CDN

---

## 18. Development Phases

### Phase 1: Foundation (Complexity: Medium)
**Objectives:** Project scaffolding, solution structure, basic configuration

**Files Created:**
- `Portfolio.sln`
- `src/Portfolio.Api/` — .NET project with Program.cs, appsettings
- `src/Portfolio.Web/` — Angular project via CLI
- `.gitignore`, `.editorconfig`
- MySQL database schema + seed data script
- Docker compose for MySQL (dev)

**Dependencies:** Node 22, .NET 8 SDK, MySQL, Angular CLI 18.2.19

**Tasks:**
1. Create .NET 8 Web API project
2. Create Angular 18 project (standalone, no SSR)
3. Configure proxy for development
4. Setup EF Core with Pomelo + MySQL connection
5. Create database tables and seed migration
6. Configure static file serving + SPA fallback
7. Verify Angular builds and serves from .NET

**Risks:** Pomelo version compatibility with .NET 8, Angular CLI version constraints

---

### Phase 2: API Layer (Complexity: Medium)
**Objectives:** All API endpoints operational with seed data

**Files Created:**
- All Controllers, Services, DTOs, Models
- `ApiResponse<T>` wrapper
- Exception middleware
- AutoMapper profiles
- EF Core entity configurations

**Dependencies:** Phase 1 complete, seed data in DB

**Tasks:**
1. Implement common `ApiResponse<T>` model
2. Create all EF Core entities and configurations
3. Implement services (Profile, Projects, Experience, Skills, Education, Certifications, Social Links)
4. Implement controllers
5. Setup GitHub API integration with caching
6. Contact form endpoint with validation
7. Resume download endpoint
8. Global exception middleware
9. Request logging
10. Test all endpoints via Swagger

**Risks:** GitHub API rate limiting, proper error mapping

---

### Phase 3: Angular Core + Layout (Complexity: Medium)
**Objectives:** App shell, routing, services, theme system

**Files Created:**
- `app.config.ts`, `app.routes.ts`, `app.component.ts`
- Core services (api, theme, seo, scroll, loading)
- Axios interceptor setup
- All TypeScript models
- Layout components (header, footer)
- Theme toggle component
- CSS custom properties (variables)
- Global styles

**Dependencies:** Phase 2 (API must be callable)

**Tasks:**
1. Setup axios with interceptors and typed response parsing
2. Create all TypeScript interface models
3. Implement theme service with Signals (dark/light/system)
4. Implement SEO service
5. Build header with responsive navigation
6. Build footer
7. Setup CSS custom properties for theming
8. Configure routes with layout shell
9. Verify API connectivity end-to-end

**Risks:** Axios typing with Angular DI (no native HttpClient integration), SSR compatibility

---

### Phase 4: Feature Sections (Complexity: High)
**Objectives:** All portfolio sections built and populated

**Files Created:**
- All feature section components (hero, about, skills, experience, projects, education, certifications, github-stats, tech-stack, contact)
- Shared components (section-header, skill-badge, project-card, timeline-item, etc.)
- Directives (animate-on-scroll, lazy-image)
- Pipes

**Dependencies:** Phase 3 (core services and layout ready)

**Tasks:**
1. Hero section (name, title, CTA, subtle animation)
2. About section (bio, avatar, key facts)
3. Skills section (categorized, proficiency bars/badges)
4. Experience section (timeline layout)
5. Projects section (card grid, featured highlight)
6. Education section (timeline)
7. Certifications section (card/badge layout)
8. GitHub Statistics section (contribution chart, stats)
9. Tech Stack section (icon grid with categories)
10. Contact section (form with validation + honeypot)
11. Resume download button
12. Social links in footer/header
13. Scroll-to-top component
14. Section navigation (scroll spy)

**Risks:** Layout complexity, responsive behavior across 12+ sections, animation performance on mobile

---

### Phase 5: Polish + Animations (Complexity: Medium)
**Objectives:** Animations, transitions, micro-interactions, responsive refinement

**Files Created:**
- Animation definitions
- Intersection Observer directive refinement
- Route transition animations
- Mobile-specific styles

**Dependencies:** Phase 4 (all sections rendered)

**Tasks:**
1. Implement scroll-triggered entrance animations
2. Add route transition animations
3. Micro-interactions (hover states, button feedback)
4. Hero section special animation (typewriter/particle/gradient)
5. Mobile responsive testing and fixes
6. Dark mode visual testing
7. Reduced motion support
8. Loading states and skeleton screens
9. 404 page design

**Risks:** Animation jank on low-end devices, CLS from late-loading animations

---

### Phase 6: SEO + Performance + Accessibility (Complexity: Medium)
**Objectives:** Production-ready quality metrics

**Files Created:**
- `sitemap.xml`, `robots.txt`
- JSON-LD structured data in index.html or via service
- Meta tag configurations
- Performance optimizations

**Dependencies:** Phase 5 (visual complete)

**Tasks:**
1. Implement dynamic meta tags per section/page
2. Add Open Graph + Twitter Card meta
3. Generate sitemap.xml
4. Create robots.txt
5. Add JSON-LD Person + WebSite schema
6. Image optimization (WebP, srcset, lazy)
7. Font optimization (preload, subset, swap)
8. Bundle analysis and optimization
9. Lighthouse audit and fixes
10. Accessibility audit (axe-core) and fixes
11. Keyboard navigation testing
12. Screen reader testing

**Risks:** SPA SEO limitations without pre-rendering, font loading CLS

---

### Phase 7: Deployment + CI/CD (Complexity: Low-Medium)
**Objectives:** Production deployment pipeline

**Files Created:**
- `Dockerfile` (multi-stage)
- `docker-compose.yml` (app + MySQL)
- `.github/workflows/deploy.yml`
- Build scripts

**Dependencies:** Phase 6 (production-quality app)

**Tasks:**
1. Create production build script (Angular → wwwroot → dotnet publish)
2. Create Dockerfile
3. Create docker-compose for local testing
4. Setup GitHub Actions workflow
5. Environment variable configuration
6. SSL/HTTPS setup documentation
7. Final production testing

**Risks:** Docker MySQL volume persistence, environment-specific configurations

---

## 19. Verification Plan

After each phase, verify:
1. **Phase 1:** `dotnet run` serves Angular index.html at localhost
2. **Phase 2:** Swagger UI shows all endpoints returning valid JSON
3. **Phase 3:** Navigation works, theme toggles, API data displays
4. **Phase 4:** All sections render with real data from API
5. **Phase 5:** Animations trigger on scroll, responsive on mobile viewport
6. **Phase 6:** Lighthouse 90+ all categories, axe-core 0 violations
7. **Phase 7:** Docker container runs, CI/CD deploys successfully

---

## Summary

**Total Phases:** 7  
**Estimated Complexity:** Medium-High overall  
**Critical Path:** Phase 1 → 2 → 3 → 4 (sequential), Phase 5/6 can partially overlap  
**Biggest Risk:** Axios integration without Angular's native HttpClient ecosystem  
**Biggest Win:** Single-deployment architecture simplifies DevOps significantly
