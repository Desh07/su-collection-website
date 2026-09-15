import {ChangeDetectionStrategy, Component, computed, inject, OnInit} from '@angular/core';
import {RouterLink, Router} from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import {CartService} from './services/cart.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-cart',
  imports: [RouterLink, MatIconModule],
  template: `
    <main class="min-h-screen pt-[120px] pb-[64px] px-6 max-w-[1200px] mx-auto">
      <div class="flex items-center justify-between mb-[48px]">
        <h1 class="display-lg text-brand-900">Your Cart</h1>
        <a routerLink="/learn" class="text-brand-900 hover:text-brand-700 label-md flex items-center transition-colors">
          Continue Shopping <mat-icon class="ml-2 text-[18px]">arrow_forward</mat-icon>
        </a>
      </div>

      @if (cartService.totalItems() === 0) {
        <div class="bg-white rounded-[32px] p-[64px] text-center border border-brand-100 shadow-sm">
          <mat-icon class="text-[64px] text-brand-200 mb-[24px]">shopping_bag</mat-icon>
          <h2 class="font-serif text-[32px] text-brand-900 mb-[16px]">Your cart is empty</h2>
          <p class="body-md text-brand-900/60 mb-[32px]">Looks like you haven't added any items to your cart yet.</p>
          <a routerLink="/learn" class="btn-primary inline-flex items-center gap-2">
            Explore our services and products
          </a>
        </div>
      } @else {
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-[48px]">
          <!-- Cart Items -->
          <div class="lg:col-span-2 flex flex-col gap-[24px]">
            @for (item of cartService.items(); track item.id) {
              <div class="flex items-center gap-[24px] bg-white p-[24px] rounded-[24px] border border-brand-100 shadow-sm">
                <img [src]="item.image" [alt]="item.name" class="w-[120px] h-[120px] object-cover rounded-[16px]" referrerpolicy="no-referrer">
                
                <div class="flex-1">
                  <h3 class="font-serif text-[24px] text-brand-900 mb-[8px]">{{ item.name }}</h3>
                  <p class="text-brand-600 font-medium mb-[16px]">LKR {{ item.price.toLocaleString() }}</p>
                  
                  <div class="flex items-center gap-[16px]">
                      <span class="px-3 font-medium text-[14px]">Qty: 1</span>
                    <button (click)="cartService.removeItem(item.id)" class="text-brand-900/40 hover:text-red-500 transition-colors text-[14px] uppercase tracking-wider font-medium">
                      Remove
                    </button>
                  </div>
                </div>
                
                <div class="text-right">
                  <p class="font-medium text-brand-900">LKR {{ (item.price * item.quantity).toLocaleString() }}</p>
                </div>
              </div>
            }
          </div>

          <!-- Order Summary -->
          <div class="bg-brand-900 text-white p-[40px] rounded-[32px] h-fit sticky top-[120px]">
            <h2 class="font-serif text-[32px] mb-[32px]">Order Summary</h2>
            
            <div class="flex flex-col gap-[16px] mb-[32px] body-md">
              <div class="flex justify-between text-white/80">
                <span>Subtotal ({{ cartService.totalItems() }} items)</span>
                <span>LKR {{ cartService.totalPrice().toLocaleString() }}</span>
              </div>
              <div class="flex justify-between text-white/80">
                <span>Delivery</span>
                <span>Instant access</span>
              </div>
            </div>
            
            <div class="border-t border-white/20 pt-[32px] mb-[40px]">
              <div class="flex justify-between font-serif text-[24px]">
                <span>Total</span>
                <span>LKR {{ cartService.totalPrice().toLocaleString() }}</span>
              </div>
            </div>
            
            <button (click)="checkout()" class="w-full bg-white text-brand-900 py-[16px] rounded-full label-md hover:bg-brand-50 transition-colors mb-[16px] flex justify-center items-center gap-2">
              <mat-icon>lock</mat-icon> Secure Checkout
            </button>
            <p class="text-center text-white/60 text-[12px]">All prices are final. No hidden fees.</p>
          </div>
        </div>
      }
    </main>
  `
})
export class Cart implements OnInit {
  cartService = inject(CartService);
  private router = inject(Router);

  ngOnInit() {
  }

  checkout() {
    this.router.navigate(['/checkout']);
  }
}
