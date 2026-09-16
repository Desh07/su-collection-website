import {ChangeDetectionStrategy, Component, signal, OnInit, inject} from '@angular/core';
import {Router, ActivatedRoute, RouterLink} from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import {db} from '../lib/firebase';
import {collection, query, orderBy, onSnapshot} from 'firebase/firestore';
import {ContentService} from './services/content.service';
import {CartService} from './services/cart.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-learn',
  imports: [MatIconModule, RouterLink],
  template: `
    <!-- Header -->
    <header class="pt-6 pb-6 px-4 sm:px-6 text-center max-w-[1600px] mx-auto">
      <div class="relative w-full rounded-[28px] sm:rounded-[48px] overflow-hidden p-8 sm:p-16 border border-white/20 shadow-2xl text-white bg-slate-950 group min-h-[240px] flex items-center justify-center">
        <!-- Background Editorial Fashion Tailoring Image -->
        <div class="absolute inset-0 z-0">
          <img src="https://images.unsplash.com/photo-1620799139502-2cce8c227e77?q=80&w=2000&auto=format&fit=crop" 
               alt="" 
               class="w-full h-full object-cover opacity-45 mix-blend-luminosity group-hover:scale-105 transition-transform duration-1000" 
               referrerpolicy="no-referrer">
          <div class="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-slate-900/50"></div>
        </div>

        <div class="relative z-10 max-w-4xl mx-auto">
          <span class="inline-block px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-brand-300 label-md uppercase tracking-[0.2em] text-[11px] sm:text-[12px] mb-4 sm:mb-6">
            {{ c().app.navCourses }}
          </span>
          <h1 class="font-serif text-[30px] sm:text-[48px] lg:text-[64px] font-normal leading-tight mb-4 sm:mb-6 text-white">{{ c().learn.heroTitle }}</h1>
          <p class="body-md text-[15px] sm:text-[18px] text-white/90 max-w-2xl mx-auto font-light leading-relaxed">
            {{ c().learn.heroDesc }}
          </p>
        </div>
      </div>
    </header>

    <main class="px-4 sm:px-6 lg:px-[64px] pb-12 sm:pb-[64px] w-full">
      <div class="flex flex-col gap-8 sm:gap-[48px] max-w-[1400px] mx-auto">
        @for (course of displayCourses(); track course.id) {
          <div [id]="course.id">
            <div class="gradient-shell">
            <div class="gradient-shell-inner p-6 sm:p-10 lg:p-[64px] relative overflow-hidden flex flex-col lg:flex-row gap-8 sm:gap-10 lg:gap-[64px] items-center">
              
              <!-- Background Image -->
              <div class="absolute inset-0 z-0">
                <img src="https://images.unsplash.com/photo-1584034879669-e74f1d431051?q=80&w=1600&auto=format&fit=crop" alt="Background" class="w-full h-full object-cover opacity-20 mix-blend-multiply scale-105" referrerpolicy="no-referrer">
                <div class="absolute inset-0 bg-gradient-to-r from-brand-50/95 via-white/90 to-brand-100/90"></div>
              </div>

              <!-- Image Side -->
              <div class="w-full lg:w-1/2 rounded-[24px] sm:rounded-[32px] overflow-hidden relative shadow-xl aspect-[4/3] z-10 group">
                <img [src]="course.image" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" [alt]="course.title" referrerpolicy="no-referrer">
                <div class="absolute top-4 left-4 glass-panel text-brand-900 px-4 py-2 rounded-full shadow-sm label-md font-semibold text-[12px] sm:text-[14px]">
                  {{ course.level }}
                </div>
              </div>
              
              <!-- Text Side -->
              <div class="w-full lg:w-1/2 relative z-10">
                <div class="flex items-center gap-2 text-brand-600 mb-3 label-md font-medium">
                  <mat-icon class="text-[16px]">star</mat-icon>
                  <span>{{ course.duration }}</span>
                </div>
                <h2 class="font-serif text-[26px] sm:text-[36px] lg:text-[44px] text-brand-900 mb-3 sm:mb-4 leading-tight tracking-tight">{{ course.title }}</h2>
                <div class="body-md font-medium text-brand-900 text-[20px] sm:text-[24px] mb-3 sm:mb-4">{{ course.price }}</div>
                <p class="body-md text-[14px] sm:text-[16px] text-brand-900/80 mb-8 sm:mb-10 leading-relaxed">
                  {{ course.description }}
                </p>
                <div class="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                  @if (cartService.isInCart('course-' + course.id)()) {
                    <a routerLink="/checkout" class="btn-primary !bg-emerald-600 hover:!bg-emerald-700 flex items-center justify-center gap-2 !px-8 !py-3.5">
                      <mat-icon class="text-[18px]">check_circle</mat-icon>
                      <span>Proceed to Checkout</span>
                    </a>
                  } @else {
                    <button (click)="enrollCourse(course)" class="btn-primary flex items-center justify-center gap-2 !px-8 !py-3.5">
                      <mat-icon class="text-[18px]">{{ course.level === 'PDF E-Book' ? 'book' : 'school' }}</mat-icon>
                      <span>{{ course.level === 'PDF E-Book' ? 'Get E-Book' : 'Enroll in Mentorship' }}</span>
                    </button>
                  }
                  <a [routerLink]="['/learn', course.id]" [state]="{ course: course }" class="btn-primary !bg-brand-800 hover:!bg-brand-900 flex items-center justify-center gap-2 !px-8 !py-3.5">
                    <mat-icon class="text-[18px]">visibility</mat-icon>
                    <span>View Details</span>
                  </a>
                  <button (click)="inquireCourse(course)" class="btn-secondary bg-white/80 backdrop-blur-sm flex items-center justify-center gap-2 !px-8 !py-3.5">
                    <mat-icon class="text-[18px]">chat</mat-icon>
                    <span>Inquire on WhatsApp</span>
                  </button>
                </div>
              </div>

            </div>
          </div>
          </div>
        } @empty {
          <div class="py-16 text-center">
             <div class="animate-pulse flex space-x-4 justify-center">
                <div class="rounded-full bg-brand-200 h-10 w-10"></div>
                <div class="flex-1 space-y-6 py-1 max-w-sm">
                  <div class="h-2 bg-brand-200 rounded"></div>
                  <div class="space-y-3">
                    <div class="grid grid-cols-3 gap-4">
                      <div class="h-2 bg-brand-200 rounded col-span-2"></div>
                      <div class="h-2 bg-brand-200 rounded col-span-1"></div>
                    </div>
                    <div class="h-2 bg-brand-200 rounded"></div>
                  </div>
                </div>
              </div>
          </div>
        }
      </div>
    </main>
  `
})
export class Learn implements OnInit {
  contentService = inject(ContentService);
  cartService = inject(CartService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  c = this.contentService.content;

  defaultCourses = [
    {
      id: 'couture-and-tailoring-business-mentorship',
      title: '6-Month Couture & Tailoring Business Mentorship',
      description: 'Personal 1-on-1 mentorship with Swarna. Learn advanced draping, bridal fitting, and launching your own profitable custom dress boutique.',
      level: 'Mentorship',
      price: 'Rs. 45,000',
      duration: '6 Months',
      image: 'https://images.unsplash.com/photo-1551893665-f843f600794e?q=80&w=800&auto=format&fit=crop'
    },
    {
      id: 'sri-lankan-saree-jacket-master-blueprint',
      title: 'Sri Lankan Saree Jacket Master Blueprint (PDF)',
      description: 'The definitive guide to cutting, curved dart drafting, and fitting traditional and modern saree jackets without puckering or loose necklines.',
      level: 'PDF E-Book',
      price: 'Rs. 2,500',
      duration: '48 Pages',
      image: 'https://images.unsplash.com/photo-1620799139502-2cce8c227e77?q=80&w=800&auto=format&fit=crop'
    }
  ];

  dbCourses = signal<any[]>([]);
  displayCourses = signal<any[]>(this.defaultCourses);

  ngOnInit() {
    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
      localStorage.removeItem('sc_current_order');
    }

    // Handle fragment scroll with proper navbar offset — bypasses Angular router's native snap
    this.route.fragment.subscribe(fragment => {
      if (!fragment || typeof window === 'undefined') return;
      const doScroll = () => {
        const el = document.getElementById(fragment);
        if (el) {
          const navbarHeight = 120;
          const top = el.getBoundingClientRect().top + window.scrollY - navbarHeight;
          window.scrollTo({ top, behavior: 'smooth' });
        } else {
          // Retry after Firestore data loads
          setTimeout(() => {
            const el2 = document.getElementById(fragment);
            if (el2) {
              const navbarHeight = 120;
              const top = el2.getBoundingClientRect().top + window.scrollY - navbarHeight;
              window.scrollTo({ top, behavior: 'smooth' });
            }
          }, 500);
        }
      };
      setTimeout(doScroll, 150);
    });

    const q = query(collection(db, 'courses'), orderBy('createdAt', 'desc'));
    onSnapshot(q, (snapshot) => {
      if (!snapshot.empty) {
        const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        this.dbCourses.set(items);
        this.displayCourses.set(items);
      } else {
        this.displayCourses.set(this.defaultCourses);
      }
    });
  }

  enrollCourse(course: any) {
    const numericPrice = typeof course.price === 'number'
      ? course.price
      : parseInt(String(course.price).replace(/\D/g, ''), 10) || 15000;

    this.cartService.addItem({
      id: 'course-' + course.id,
      name: course.title,
      price: numericPrice,
      image: course.image
    });
    this.router.navigate(['/checkout']);
  }

  inquireCourse(course: any) {
    const phone = (this.contentService.content().app.whatsappNumber || '94771234567').replace(/\D/g, '').replace(/^0/, '94');
    const msg = encodeURIComponent(`Hello Swarna, I would like to inquire about the course "${course.title}" (${course.price}). Could you please guide me on how to register and share the bank details?`);
    window.open(`https://wa.me/${phone}?text=${msg}`, '_blank');
  }

  enrollMainCourse() {
    this.cartService.addItem({
      id: 'main-foundation-course',
      name: this.c().learn.mainCourseTitle || 'Foundation: The Complete Tailoring Methodology',
      price: 25000,
      image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=800&auto=format&fit=crop'
    });
    this.router.navigate(['/checkout']);
  }

  inquireMainCourse() {
    const phone = (this.contentService.content().app.whatsappNumber || '94771234567').replace(/\D/g, '').replace(/^0/, '94');
    const msg = encodeURIComponent(`Hello Swarna, I want to learn more about the 1-on-1 Tailoring Mentorship and Foundation course. Please let me know the upcoming batch schedule!`);
    window.open(`https://wa.me/${phone}?text=${msg}`, '_blank');
  }
}
