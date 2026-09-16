import {ChangeDetectionStrategy, Component, signal, inject, computed} from '@angular/core';
import {RouterOutlet, RouterLink, RouterLinkActive, Router, NavigationEnd} from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import {ContentService} from './services/content.service';
import {CartService} from './services/cart.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive, MatIconModule],
  template: `
    <div class="min-h-screen flex flex-col selection:bg-brand-200 selection:text-brand-900 bg-brand-50 relative overflow-x-clip">
      <!-- Ambient Background -->
      <div class="fixed inset-0 z-0 pointer-events-none">
        <div class="absolute top-0 left-0 w-[800px] h-[800px] bg-brand-200/40 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2"></div>
        <div class="absolute bottom-0 right-0 w-[600px] h-[600px] bg-brand-300/20 rounded-full blur-[100px] translate-x-1/3 translate-y-1/3"></div>
      </div>

      <!-- Scroll Fade Mask -->
      <div class="fixed top-0 left-0 right-0 h-24 sm:h-32 bg-gradient-to-b from-brand-50 via-brand-50/90 to-transparent z-40 pointer-events-none backdrop-blur-[2px] [mask-image:linear-gradient(to_bottom,black_20%,transparent_100%)]"></div>

      <!-- Navbar (Glassy Site-Wide Header) -->
      <header class="sticky top-4 sm:top-6 z-50 mx-4 sm:mx-6 lg:mx-[64px]">
        <div class="gradient-shell !rounded-full shadow-lg">
          <div class="gradient-shell-inner !rounded-full px-6 sm:px-8 py-3.5 sm:py-4 flex justify-between items-center bg-white/80 backdrop-blur-xl border border-white/60">
            <!-- Logo -->
            <a routerLink="/" class="flex items-center gap-3 group">
              <img src="/image.png" alt="Su Collection Logo" class="h-12 w-12 sm:h-14 sm:w-14 rounded-full object-cover border-2 border-brand-100 shadow-sm transition-transform group-hover:scale-105">
              <span class="font-serif text-xl sm:text-2xl font-normal tracking-tight text-brand-900">Su Collection</span>
            </a>

            <!-- Desktop Nav -->
            <nav class="hidden md:flex items-center gap-8 lg:gap-10">
              @for (link of navLinks(); track link.path) {
                @if (!link.mobileOnly) {
                  <a [routerLink]="link.path" 
                     routerLinkActive="!text-brand-900 !font-bold" 
                     [routerLinkActiveOptions]="{exact: link.exact}"
                     class="text-brand-900/70 hover:text-brand-900 transition-colors label-md tracking-wider uppercase text-[12px]">
                    {{link.label}}
                  </a>
                }
              }
            </nav>

            <!-- Desktop Actions -->
            <div class="hidden md:flex items-center gap-4 lg:gap-6">
              <a routerLink="/cart" class="p-2 text-brand-900/70 hover:text-brand-900 transition-colors relative" title="Shopping Cart">
                <mat-icon>shopping_bag</mat-icon>
                @if (cartService.totalItems() > 0) {
                  <span class="absolute top-1 right-1 bg-brand-900 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-medium">{{ cartService.totalItems() }}</span>
                }
              </a>
              <a routerLink="/admin" class="p-2 text-brand-900/70 hover:text-brand-900 transition-colors relative" title="Admin Dashboard">
                <mat-icon>admin_panel_settings</mat-icon>
              </a>
              @if (false) {
                <a routerLink="/sew-and-su" class="btn-primary !px-5 !py-2.5 text-[13px] flex items-center gap-2">
                  <span>Custom Order</span>
                </a>
              }
            </div>

            <!-- Mobile Actions & Menu Button -->
            <div class="md:hidden flex items-center gap-2">
              <a routerLink="/cart" class="p-2 text-brand-900/70 hover:text-brand-900 transition-colors relative" title="Shopping Cart" (click)="isMobileMenuOpen.set(false)">
                <mat-icon>shopping_bag</mat-icon>
                @if (cartService.totalItems() > 0) {
                  <span class="absolute top-1 right-1 bg-brand-900 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-medium">{{ cartService.totalItems() }}</span>
                }
              </a>
              <button (click)="isMobileMenuOpen.set(!isMobileMenuOpen())" 
                      aria-label="Toggle Menu"
                      class="p-2 text-brand-900/80 hover:text-brand-900 focus:outline-none">
                <mat-icon>{{ isMobileMenuOpen() ? 'close' : 'menu' }}</mat-icon>
              </button>
            </div>
          </div>
        </div>
      </header>

      <!-- Mobile Menu -->
      @if (isMobileMenuOpen()) {
        <div class="fixed inset-0 z-40 bg-brand-50/98 backdrop-blur-3xl md:hidden pt-[120px] px-[64px] pb-[64px] flex flex-col overflow-y-auto">
          <nav class="flex flex-col gap-6 sm:gap-[24px] mt-[24px]">
            @for (link of navLinks(); track link.path) {
              <a [routerLink]="link.path" 
                 (click)="isMobileMenuOpen.set(false)"
                 routerLinkActive="!text-brand-900 !font-bold"
                 [routerLinkActiveOptions]="{exact: link.exact}"
                 class="font-serif text-3xl sm:text-4xl text-brand-900/60 hover:text-brand-900 transition-colors">
                {{link.label}}
              </a>
            }
          </nav>
        </div>
      }

      <!-- Main Content -->
      <main class="flex-1 flex flex-col w-full">
        <router-outlet></router-outlet>
      </main>

      <!-- Footer -->
      <footer class="mt-auto px-4 sm:px-6 lg:px-[64px] pb-10 sm:pb-[64px] relative z-10 pt-10 sm:pt-[64px]">
        <div class="gradient-shell">
          <div class="gradient-shell-inner p-6 sm:p-10 lg:p-[64px] bg-brand-900/95 backdrop-blur-[64px]">
            <div class="grid grid-cols-2 md:grid-cols-4 gap-8 sm:gap-[64px]">
              <div class="col-span-2 md:col-span-1">
                <div class="flex items-center gap-3 mb-5 sm:mb-[24px]">
                  <img src="/image.png" alt="Su Collection Logo" class="h-12 w-12 sm:h-16 sm:w-16 rounded-full object-cover bg-white shadow-md border-2 border-white/20 opacity-95">
                  <span class="font-serif text-[22px] sm:text-[28px] font-normal text-brand-900 tracking-tight">Su Collection</span>
                </div>
                <p class="body-md text-brand-700 mb-5 sm:mb-[24px] text-[13px] sm:text-[14px]">
                  {{ contentService.content().app.footerBrand }}
                </p>
                <div class="flex items-center gap-[12px] text-brand-900">
                  <a href="#" class="w-10 h-10 rounded-full bg-brand-100 flex items-center justify-center hover:bg-brand-200 transition-colors"><mat-icon>facebook</mat-icon></a>
                  <a href="#" class="w-10 h-10 rounded-full bg-brand-100 flex items-center justify-center hover:bg-brand-200 transition-colors"><mat-icon>video_library</mat-icon></a>
                </div>
              </div>
              
              <div>
                <h4 class="label-md text-brand-900 mb-4 sm:mb-[24px] text-[11px] sm:text-[12px]">Explore</h4>
                <ul class="flex flex-col gap-3 sm:gap-[12px] body-md text-brand-700 text-[13px] sm:text-[14px]">
                  <li><a routerLink="/learn" class="hover:text-brand-900 transition-colors">{{ contentService.content().app.navCourses }}</a></li>
                  @if (false) {
                    <li><a routerLink="/sew-and-su" class="hover:text-brand-900 transition-colors">{{ contentService.content().app.navCustom }}</a></li>
                    <li><a routerLink="/shop" class="hover:text-brand-900 transition-colors">{{ contentService.content().app.navShop }}</a></li>
                  }
                  <li><a routerLink="/about" class="hover:text-brand-900 transition-colors">{{ contentService.content().app.navAbout }}</a></li>
                </ul>
              </div>
              
              <div>
                <h4 class="label-md text-brand-900 mb-4 sm:mb-[24px] text-[11px] sm:text-[12px]">Support</h4>
                <ul class="flex flex-col gap-3 sm:gap-[12px] body-md text-brand-700 text-[13px] sm:text-[14px]">
                  <li><a routerLink="/contact" class="hover:text-brand-900 transition-colors">Contact Us</a></li>
                </ul>
              </div>

              <div class="col-span-2 sm:col-span-1">
                <h4 class="label-md text-brand-900 mb-4 sm:mb-[24px] text-[11px] sm:text-[12px]">Newsletter</h4>
                <form class="flex flex-col gap-3 sm:gap-[12px]">
                  <input type="email" placeholder="Your email address" class="bg-brand-50 border border-brand-200 text-brand-900 px-5 py-3 rounded-full focus:outline-none focus:border-brand-400 placeholder:text-brand-900/50 transition-colors body-md text-[13px] sm:text-[14px]">
                  <button type="submit" class="bg-brand-900 text-white px-5 py-3 rounded-full hover:bg-brand-800 transition-colors label-md border border-brand-900/30 text-center text-[12px] sm:text-[14px]">
                    Subscribe
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  `
})
export class App {
  private router = inject(Router);
  contentService = inject(ContentService);
  cartService = inject(CartService);
  isMobileMenuOpen = signal(false);
  
  constructor() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        if (typeof window !== 'undefined') {
          window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
        }
      }
    });
  }

  navLinks = computed(() => [
    { path: '/', label: this.contentService.content().app.navHome, exact: true },
    { path: '/learn', label: this.contentService.content().app.navCourses, exact: false },
    // { path: '/sew-and-su', label: this.contentService.content().app.navCustom, exact: false }, // Hidden for now
    // { path: '/shop', label: this.contentService.content().app.navShop, exact: false }, // Hidden for now
    { path: '/contact', label: 'Contact Us', exact: false, mobileOnly: true },
    { path: '/about', label: this.contentService.content().app.navAbout, exact: false },
  ]);
}
