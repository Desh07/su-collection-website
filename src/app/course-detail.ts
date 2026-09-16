import {ChangeDetectionStrategy, Component, computed, inject, signal, OnInit} from '@angular/core';
import {RouterLink, ActivatedRoute, Router} from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import {db} from '../lib/firebase';
import {doc, getDoc} from 'firebase/firestore';
import {CartService} from './services/cart.service';
import {Location} from '@angular/common';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-course-detail',
  imports: [RouterLink, MatIconModule],
  template: `
    <main class="min-h-screen pt-[120px] pb-[64px] px-6 max-w-[1200px] mx-auto">
      <button (click)="goBack()" class="inline-flex items-center text-brand-900/60 hover:text-brand-900 mb-[40px] transition-colors label-md bg-transparent outline-none">
        <mat-icon class="mr-2 text-[18px]">arrow_back</mat-icon> Back to Courses
      </button>

      @if (loading()) {
        <div class="py-24 flex justify-center">
          <mat-icon class="animate-spin text-brand-900">refresh</mat-icon>
        </div>
      } @else if (course()) {
        <div class="grid grid-cols-1 md:grid-cols-2 gap-[48px] lg:gap-[64px]">
          <!-- Image -->
          <div class="rounded-[32px] overflow-hidden bg-slate-50 shadow-sm border border-brand-100 aspect-[4/3] relative">
            <img [src]="course()?.image" [alt]="course()?.title" class="w-full h-full object-cover" referrerpolicy="no-referrer">
            <div class="absolute top-4 left-4 glass-panel text-brand-900 px-4 py-2 rounded-full shadow-sm label-md font-semibold text-[12px] sm:text-[14px]">
              {{ course()?.level }}
            </div>
          </div>

          <!-- Details -->
          <div class="flex flex-col justify-center">
            <div class="flex items-center gap-2 text-brand-600 mb-4 label-md font-medium">
              <mat-icon class="text-[18px]">schedule</mat-icon>
              <span>{{ course()?.duration }}</span>
            </div>
            
            <h1 class="font-serif text-[32px] lg:text-[44px] text-brand-900 leading-tight mb-[16px]">{{ course()?.title }}</h1>
            
            <div class="body-md font-medium text-emerald-800 text-[24px] sm:text-[28px] mb-[32px]">{{ course()?.price }}</div>
            
            <p class="body-md text-brand-900/80 leading-[1.8] mb-[48px] text-[16px] lg:text-[18px]">
              {{ course()?.description }}
            </p>

            <div class="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-[48px]">
              @if (cartService.isInCart('course-' + course()?.id)()) {
                <button (click)="goToCheckout()" class="btn-primary flex-1 flex items-center justify-center gap-2 shadow-sm !bg-emerald-600 hover:!bg-emerald-700 !py-4">
                  <mat-icon>check_circle</mat-icon> Proceed to Checkout
                </button>
              } @else {
                <button (click)="enroll()" class="btn-primary flex-1 flex items-center justify-center gap-2 shadow-sm !py-4">
                  <mat-icon>{{ course()?.level === 'PDF E-Book' ? 'book' : 'school' }}</mat-icon>
                  {{ course()?.level === 'PDF E-Book' ? 'Get E-Book Now' : 'Enroll Now' }}
                </button>
              }
            </div>
            
            <div class="border-t border-brand-100 pt-[32px]">
              <div class="flex items-start gap-[16px] mb-[24px]">
                <div class="w-10 h-10 rounded-full bg-brand-50 flex items-center justify-center text-brand-600 flex-shrink-0">
                  <mat-icon>verified</mat-icon>
                </div>
                <div>
                  <h3 class="font-medium text-brand-900 mb-1">Instant Access</h3>
                  <p class="text-[13px] text-brand-900/60 leading-relaxed">
                    {{ course()?.level === 'PDF E-Book' ? 'Receive the PDF download immediately after payment verification.' : 'Get enrolled instantly upon successful payment.' }}
                  </p>
                </div>
              </div>
              
              <div class="flex items-start gap-[16px]">
                <div class="w-10 h-10 rounded-full bg-brand-50 flex items-center justify-center text-brand-600 flex-shrink-0">
                  <mat-icon>support_agent</mat-icon>
                </div>
                <div>
                  <h3 class="font-medium text-brand-900 mb-1">Dedicated WhatsApp Support</h3>
                  <p class="text-[13px] text-brand-900/60 leading-relaxed">
                    Have questions? Chat directly with Swarna for personalized assistance and guidance.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      } @else {
        <div class="py-24 text-center">
          <mat-icon class="text-[48px] text-brand-200 mb-4">error_outline</mat-icon>
          <h2 class="font-serif text-[24px] text-brand-900 mb-2">Course Not Found</h2>
          <p class="text-brand-900/60 mb-8">The course or book you are looking for does not exist or has been removed.</p>
          <a routerLink="/learn" class="btn-primary">Browse All Courses</a>
        </div>
      }
    </main>
  `
})
export class CourseDetail implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  cartService = inject(CartService);
  private location = inject(Location);

  course = signal<any>(null);
  loading = signal(true);

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

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.fetchCourse(id);
      } else {
        this.loading.set(false);
      }
    });
  }

  async fetchCourse(id: string) {
    this.loading.set(true);
    try {
      const docRef = doc(db, 'courses', id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        this.course.set({ id: docSnap.id, ...docSnap.data() });
      } else {
        const mockCourse = this.defaultCourses.find(c => c.id === id);
        if (mockCourse) {
          this.course.set(mockCourse);
        }
      }
    } catch (e) {
      console.error(e);
      const mockCourse = this.defaultCourses.find(c => c.id === id);
      if (mockCourse) {
        this.course.set(mockCourse);
      }
    } finally {
      this.loading.set(false);
    }
  }

  enroll() {
    const c = this.course();
    if (!c) return;
    
    // Convert string price 'Rs. 45,000' to number 45000
    const rawPrice = c.price || '0';
    const numericPrice = Number(rawPrice.replace(/[^0-9]/g, ""));
    
    this.cartService.addItem({
      id: 'course-' + c.id,
      name: c.title,
      price: numericPrice,
      image: c.image || '',
      quantity: 1
    });
    
    this.router.navigate(['/checkout']);
  }

  goToCheckout() {
    this.router.navigate(['/checkout']);
  }
  
  goBack() {
    this.location.back();
  }
}
