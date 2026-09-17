import {ChangeDetectionStrategy, Component, signal, OnInit, inject} from '@angular/core';
import {Router, ActivatedRoute, RouterLink} from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import {db} from '../lib/firebase';
import {collection, query, orderBy, onSnapshot} from 'firebase/firestore';
import {ContentService} from './services/content.service';
import {CartService} from './services/cart.service';
import {FormatTextPipe} from './pipes/format-text.pipe';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-learn',
  imports: [RouterLink, MatIconModule, FormatTextPipe],
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
          <h1 class="font-serif text-[30px] sm:text-[48px] lg:text-[64px] font-normal leading-tight mb-4 sm:mb-6 text-white" [innerHTML]="c().learn.heroTitle | formatText"></h1>
          <p class="body-md text-brand-50/90 text-[14px] sm:text-[18px] lg:text-[20px] max-w-2xl mx-auto font-light leading-relaxed mb-6 sm:mb-10" [innerHTML]="c().learn.heroDesc | formatText">
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
                <div class="flex items-center gap-3 text-brand-600 mb-3 font-medium">
                  <span class="px-3 py-1 bg-brand-50 text-brand-900 text-[11px] font-semibold uppercase tracking-wider rounded-lg">{{ course.level }}</span>
                  <div class="flex items-center gap-1.5 label-md text-[13px]">
                    <mat-icon class="text-[16px]">schedule</mat-icon>
                    <span>{{ course.duration }}</span>
                  </div>
                  @if (course.badge) {
                    <span class="bg-brand-900 text-white px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider rounded-full shadow-sm ml-auto sm:ml-0">{{ course.badge }}</span>
                  }
                </div>
                <h2 class="font-serif text-[26px] sm:text-[36px] lg:text-[44px] text-brand-900 mb-3 sm:mb-4 leading-tight tracking-tight">{{ course.title }}</h2>
                <div class="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-800 px-4 py-2 rounded-full mb-4 sm:mb-6 shadow-sm w-fit">
                  <mat-icon class="text-[20px]">local_offer</mat-icon>
                  <span class="body-md font-semibold text-[18px] sm:text-[20px]">{{ course.price }}</span>
                </div>
                <p class="body-md text-[14px] sm:text-[16px] text-brand-900/80 mb-6 leading-relaxed">
                  {{ course.description }}
                </p>
                @if (course.features && course.features.length) {
                  <ul class="flex flex-col gap-3 mb-10 text-[14px] text-brand-900/90 font-medium">
                    @for (feat of course.features; track feat) {
                      <li class="flex items-start gap-2.5">
                        <mat-icon class="text-emerald-600 text-[18px] shrink-0">check_circle</mat-icon>
                        <span class="leading-snug">{{ feat }}</span>
                      </li>
                    }
                  </ul>
                } @else {
                  <div class="mb-10"></div>
                }
                <div class="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                  @if (cartService.isInCart('course-' + course.id)()) {
                    <a routerLink="/checkout" class="btn-primary !bg-emerald-600 hover:!bg-emerald-700 flex items-center justify-center gap-2 !px-8 !py-3.5">
                      <mat-icon class="text-[18px]">check_circle</mat-icon>
                      <span>Proceed to Checkout</span>
                    </a>
                  } @else {
                    <button (click)="enrollCourse(course)" class="btn-primary flex items-center justify-center gap-2 !px-8 !py-3.5">
                      <mat-icon class="text-[18px]">{{ course.level === 'PDF E-Book' ? 'book' : 'school' }}</mat-icon>
                      <span>{{ course.btnJoinText || (course.level === 'PDF E-Book' ? 'Get E-Book' : 'Join Now') }}</span>
                    </button>
                  }
                  <a [routerLink]="['/learn', course.id]" [state]="{ course: course }" class="btn-primary !bg-brand-800 hover:!bg-brand-900 flex items-center justify-center gap-2 !px-8 !py-3.5">
                    <mat-icon class="text-[18px]">visibility</mat-icon>
                    <span>{{ course.btnViewText || 'View Details' }}</span>
                  </a>
                  <button (click)="inquireCourse(course)" class="btn-secondary bg-white/80 backdrop-blur-sm flex items-center justify-center gap-2 !px-8 !py-3.5">
                    <mat-icon class="text-[18px]">chat</mat-icon>
                    <span>{{ course.btnInquireText || 'WhatsApp Us' }}</span>
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
      id: '6-month-tailoring-business-mentorship',
      title: 'මාස 6ක මැහුම් සහ ව්යාපාරික මඟපෙන්වීම (Mentorship)',
      description: 'ස්වර්ණා සමඟ පුද්ගලිකව (1-on-1) සිදු කරන විශේෂ මඟපෙන්වීමකි. උසස් මට්ටමේ ඇඳුම් නිර්මාණ (Advanced draping), මනාලියන්ගේ ඇඳුම් මිනුම් සහ ඔබේම ලාභදායී ඇඳුම් ව්යාපාරයක් (Boutique) සාර්ථකව ආරම්භ කරන ආකාරය මෙහිදී ඉගෙනගත හැක.',
      level: 'Mentorship',
      price: 'රු. 45,000 (පහසු ගෙවීමේ ක්රමයටද ලබාගත හැක)',
      duration: 'මාස 6යි (6 Months)',
      badge: 'Limited Slots',
      features: [
        'Weekly 1-on-1 voice & video reviews',
        'Direct WhatsApp line to Swarna Herath',
        'Bridal, frock, & saree jacket masterclasses',
        'Boutique pricing & fabric sourcing guidance'
      ],
      image: 'https://images.unsplash.com/photo-1551893665-f843f600794e?q=80&w=800&auto=format&fit=crop'
    },
    {
      id: '100-day-tailoring-business-workbook',
      title: 'Sri Lankan Saree Jacket Master Blueprint (PDF)',
      description: 'The definitive guide to cutting, curved dart drafting, and fitting traditional and modern saree jackets without puckering or loose necklines.',
      level: 'PDF E-Book',
      price: 'LKR 2,500',
      duration: '48 Pages',
      badge: 'Best Seller',
      features: [
        'Precise cup dart manipulation formulas',
        'Deep back neck stabilization secrets',
        'Printable standard Sri Lankan size charts',
        'Step-by-step lining & piping tutorial'
      ],
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
