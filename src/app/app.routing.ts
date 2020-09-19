// Importar los modulos del router de angular
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Importar los componentes que voy a generar su pagina
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ProfileComponent } from './components/profile/profile.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { CategoryNewComponent } from './components/category-new/category-new.component';
import { CategoryDetailComponent } from './components/category-detail/category-detail.component';
import { PostNewComponent } from './components/post-new/post-new.component';
import { PostDetailComponent } from './components/post-detail/post-detail.component';
import { PostEditComponent } from './components/post-edit/post-edit.component';
import { ErrorComponent } from './components/error/error.component';

// Importar el Guard para proteger las rutas
import { IdentityGuard } from './services/identity.guard';

// Array de rutas
const appRoutes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'inicio', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'logout/:sure', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'perfil/:id', component: ProfileComponent },
    { path: 'ajustes', component: UserEditComponent, canActivate: [IdentityGuard] },
    { path: 'crear-categoria', component: CategoryNewComponent, canActivate: [IdentityGuard] },
    { path: 'categoria/:id', component: CategoryDetailComponent },
    { path: 'crear-entrada', component: PostNewComponent, canActivate: [IdentityGuard] },
    { path: 'entrada/:id', component: PostDetailComponent },
    { path: 'editar-entrada/:id', component: PostEditComponent, canActivate: [IdentityGuard] },
    { path: '**', component: ErrorComponent }
];

// Exportar modulo de rutas
export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders<any> = RouterModule.forRoot(appRoutes);