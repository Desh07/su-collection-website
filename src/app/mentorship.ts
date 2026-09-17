import {ChangeDetectionStrategy, Component, inject, OnInit, signal} from '@angular/core';
import {Title, Meta} from '@angular/platform-browser';
import {MatIconModule} from '@angular/material/icon';
import {ContentService} from './services/content.service';
import {CartService} from './services/cart.service';
import {RouterLink, Router} from '@angular/router';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-mentorship',
  imports: [MatIconModule],
  template: `
    <div class="bg-white min-h-screen pb-20 pt-8 lg:pt-12">
      <!-- Top Banner -->
      <div class="bg-slate-950 text-white text-center py-2.5 text-[12px] sm:text-[13px] font-bold tracking-widest uppercase">
        100-DAY GUIDED BUSINESS BUILDING PROGRAMME
      </div>

      <main class="max-w-[1120px] mx-auto px-5 sm:px-8 mt-12 sm:mt-16">
        
        <!-- Hero Section -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center py-8 lg:py-14">
          
          <!-- Image Placeholder -->
          <div class="min-h-[350px] lg:min-h-[540px] bg-brand-50 rounded-[24px] sm:rounded-[32px] flex items-center justify-center text-brand-900/40 text-center border border-brand-100 shadow-sm relative overflow-hidden">
            <div class="border border-dashed border-brand-200 p-8 rounded-2xl relative z-10 bg-white/50 backdrop-blur-sm">
              <mat-icon class="text-[48px] mb-4 text-brand-300">image</mat-icon>
              <div class="font-medium text-brand-900">PROGRAMME HERO IMAGE</div>
              <small class="text-brand-900/60 mt-2 block">Replace with a strong tailoring/business image</small>
            </div>
          </div>

          <!-- Hero Content -->
          <div>
            <span class="inline-block bg-brand-100 text-brand-900 rounded-full px-4 py-1.5 text-[11px] font-bold uppercase tracking-widest mb-6">100-Day Mentorship</span>
            <h1 class="font-serif text-[36px] sm:text-[44px] lg:text-[48px] leading-[1.1] tracking-tight text-slate-950 mb-5">Tailoring Business Growth Mentorship</h1>
            <p class="text-[18px] sm:text-[20px] text-slate-800 font-medium mb-6 leading-snug">You already have a skill. Now build something real with it.</p>
            <p class="text-[15px] sm:text-[16px] text-slate-600 mb-8 leading-relaxed">
              A 100-day guided business-building programme for people who are ready to stop wondering whether they could build a future from their sewing skills — and start doing the work to make it possible.
            </p>
            
            <div class="border-y border-slate-200 py-6 my-8 flex items-baseline gap-3">
              <span class="line-through text-slate-400 text-[18px] font-medium">LKR 65,000</span>
              <span class="text-[28px] sm:text-[32px] font-extrabold text-slate-950">LKR 50,000</span>
            </div>
            
            <div class="bg-slate-50 border-l-4 border-slate-800 p-4 text-[13px] sm:text-[14px] text-slate-700 mb-8 rounded-r-lg">
              <strong>Launch offer:</strong> Reserve your place with <strong>LKR 5,000</strong>. Total launch programme fee: <strong>LKR 55,000</strong>. The LKR 5,000 is part of the programme fee.
            </div>
            
            @if (proceeding()) {
              <button disabled class="block w-full text-center bg-slate-800 text-white py-4 rounded-xl font-bold text-[15px] sm:text-[16px] shadow-md opacity-80 cursor-wait flex items-center justify-center gap-2">
                <mat-icon class="animate-spin">sync</mat-icon> Proceeding...
              </button>
            } @else if (cartService.hasItem('course-' + courseId)) {
              <a routerLink="/checkout" class="block w-full text-center bg-emerald-600 hover:bg-emerald-700 text-white py-4 rounded-xl font-bold text-[15px] sm:text-[16px] transition-colors shadow-md flex items-center justify-center gap-2">
                <mat-icon>check_circle</mat-icon> Proceed to Checkout
              </a>
            } @else {
              <button (click)="enroll()" class="block w-full text-center bg-slate-950 hover:bg-slate-800 text-white py-4 rounded-xl font-bold text-[15px] sm:text-[16px] transition-colors shadow-md">
                Reserve Your Place — LKR 5,000
              </button>
            }
            <p class="text-slate-500 text-[12px] text-center mt-4 font-medium">Full-payment offer: LKR 50,000</p>
          </div>
        </div>

        <!-- Section: You Don't Need More Information -->
        <section class="py-16 sm:py-20 border-t border-slate-100 mt-8">
          <h2 class="font-serif text-[28px] sm:text-[36px] text-slate-950 tracking-tight mb-4">You Don't Need More Information. You Need a Way Forward.</h2>
          <p class="text-slate-600 text-[16px] sm:text-[18px] max-w-[720px] mb-12 leading-relaxed">
            Maybe you have been sewing for years. Maybe you learned recently. Maybe you have made clothes for family and friends and keep thinking,
            <strong>“Could I actually turn this into a business?”</strong><br><br>
            The gap is rarely the dream. It is knowing what to do next — and having someone experienced enough to guide you through it.
          </p>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div class="border border-slate-200 p-6 sm:p-8 rounded-2xl bg-white shadow-sm hover:shadow-md transition-shadow">
              <div class="text-[11px] text-brand-700 font-extrabold tracking-widest mb-4 uppercase">From Skill</div>
              <h3 class="text-[18px] font-bold text-slate-950 mb-3 leading-snug">“I know how to sew. But what can I actually sell?”</h3>
              <p class="text-[14px] text-slate-600 leading-relaxed">Move from a general tailoring skill to a practical product or service with a customer, price and clear offer.</p>
            </div>
            <div class="border border-slate-200 p-6 sm:p-8 rounded-2xl bg-white shadow-sm hover:shadow-md transition-shadow">
              <div class="text-[11px] text-brand-700 font-extrabold tracking-widest mb-4 uppercase">From Invisibility</div>
              <h3 class="text-[18px] font-bold text-slate-950 mb-3 leading-snug">“I make good things, but nobody knows I'm here.”</h3>
              <p class="text-[14px] text-slate-600 leading-relaxed">Build a simple online presence that helps the right people discover your business and reach you through WhatsApp.</p>
            </div>
            <div class="border border-slate-200 p-6 sm:p-8 rounded-2xl bg-white shadow-sm hover:shadow-md transition-shadow">
              <div class="text-[11px] text-brand-700 font-extrabold tracking-widest mb-4 uppercase">From Uncertainty</div>
              <h3 class="text-[18px] font-bold text-slate-950 mb-3 leading-snug">“People ask. They look. But they don't buy.”</h3>
              <p class="text-[14px] text-slate-600 leading-relaxed">Build a clearer path from attention to enquiry, conversation, order and follow-up.</p>
            </div>
          </div>

          <div class="bg-slate-950 text-white p-8 sm:p-10 rounded-2xl sm:rounded-[32px] mt-12 shadow-xl">
            <h3 class="text-[22px] sm:text-[26px] font-bold mb-4 font-serif">This Programme Is Not for Everyone.</h3>
            <p class="text-slate-300 text-[15px] sm:text-[16px] mb-6 leading-relaxed">
              We deliberately do not want people who simply want to watch another course and collect another certificate.
              The people we want are the ones who are genuinely prepared to build.
            </p>
            <ul class="space-y-3 text-slate-200 text-[14px] sm:text-[15px] list-disc list-inside marker:text-brand-500 mb-8">
              <li>You will have to do the work.</li>
              <li>You will have to make decisions.</li>
              <li>You will have to create your products and content.</li>
              <li>You will have to speak to customers.</li>
              <li>You will have to test, make mistakes and improve.</li>
              <li>You will have to stay committed for the 100 days.</li>
            </ul>
            <p class="font-bold text-brand-300 text-[15px] sm:text-[16px]">If you are looking for someone to build the business for you, this is not that programme.</p>
          </div>
        </section>

        <!-- Section: 100 Days Roadmap -->
        <section class="py-16 sm:py-20 border-t border-slate-100">
          <h2 class="font-serif text-[28px] sm:text-[36px] text-slate-950 tracking-tight mb-4">100 Days to Build the Foundations You Keep Putting Off</h2>
          <p class="text-slate-600 text-[16px] sm:text-[18px] max-w-[720px] mb-12 leading-relaxed">
            You do not need to have everything figured out before you start. We guide you from the beginning, one business problem at a time.
          </p>

          <div class="grid grid-cols-1 md:grid-cols-5 border border-slate-200 rounded-2xl overflow-hidden bg-white shadow-sm">
            <!-- Phase 1 -->
            <div class="p-6 border-b md:border-b-0 md:border-r border-slate-200 bg-slate-50/50 hover:bg-slate-50 transition-colors">
              <div class="text-[11px] text-brand-700 font-extrabold tracking-widest mb-3 uppercase">Days 1–15</div>
              <h3 class="text-[16px] font-bold text-slate-950 mb-2 leading-snug">Stop Guessing What to Sell</h3>
              <p class="text-[13px] text-slate-600">Choose a practical offer and know who it is for.</p>
            </div>
            <!-- Phase 2 -->
            <div class="p-6 border-b md:border-b-0 md:border-r border-slate-200 hover:bg-slate-50 transition-colors">
              <div class="text-[11px] text-brand-700 font-extrabold tracking-widest mb-3 uppercase">Days 16–35</div>
              <h3 class="text-[16px] font-bold text-slate-950 mb-2 leading-snug">Build Something People Can Buy</h3>
              <p class="text-[13px] text-slate-600">Develop, price and shape a clear offer.</p>
            </div>
            <!-- Phase 3 -->
            <div class="p-6 border-b md:border-b-0 md:border-r border-slate-200 bg-slate-50/50 hover:bg-slate-50 transition-colors">
              <div class="text-[11px] text-brand-700 font-extrabold tracking-widest mb-3 uppercase">Days 36–55</div>
              <h3 class="text-[16px] font-bold text-slate-950 mb-2 leading-snug">Give Customers a Way to Find You</h3>
              <p class="text-[13px] text-slate-600">Connect Facebook, TikTok and WhatsApp Business.</p>
            </div>
            <!-- Phase 4 -->
            <div class="p-6 border-b md:border-b-0 md:border-r border-slate-200 hover:bg-slate-50 transition-colors">
              <div class="text-[11px] text-brand-700 font-extrabold tracking-widest mb-3 uppercase">Days 56–80</div>
              <h3 class="text-[16px] font-bold text-slate-950 mb-2 leading-snug">Turn Attention Into Enquiries</h3>
              <p class="text-[13px] text-slate-600">Use content and WhatsApp to create a sales path.</p>
            </div>
            <!-- Phase 5 -->
            <div class="p-6 hover:bg-slate-50 transition-colors bg-slate-50/50">
              <div class="text-[11px] text-brand-700 font-extrabold tracking-widest mb-3 uppercase">Days 81–100</div>
              <h3 class="text-[16px] font-bold text-slate-950 mb-2 leading-snug">Know What to Scale</h3>
              <p class="text-[13px] text-slate-600">Test paid acquisition and plan your next 90 days.</p>
            </div>
          </div>
        </section>

        <!-- Section: What You Get -->
        <section class="py-16 sm:py-20 border-t border-slate-100">
          <h2 class="font-serif text-[28px] sm:text-[36px] text-slate-950 tracking-tight mb-4">What You Get for the Next 100 Days</h2>
          <p class="text-slate-600 text-[16px] sm:text-[18px] max-w-[720px] mb-12 leading-relaxed">
            Not just lessons. You get a structured path, practical tools, mentor guidance and checkpoints designed to keep you moving.
          </p>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-0">
            <!-- Left Column -->
            <div class="flex flex-col">
              <div class="py-4 border-b border-slate-200 flex flex-col gap-1">
                <strong class="text-slate-900 text-[15px]">100 Days of Guided Mentorship</strong>
                <span class="text-slate-500 text-[13px]">A structured business-building journey from product to growth.</span>
              </div>
              <div class="py-4 border-b border-slate-200 flex flex-col gap-1">
                <strong class="text-slate-900 text-[15px]">20 Live Sessions</strong>
                <span class="text-slate-500 text-[13px]">Training, demonstrations, implementation clinics and reviews.</span>
              </div>
              <div class="py-4 border-b border-slate-200 flex flex-col gap-1">
                <strong class="text-slate-900 text-[15px]">4 Business Evaluations</strong>
                <span class="text-slate-500 text-[13px]">Product & Offer, Digital Business, Organic Sales and Growth Plan.</span>
              </div>
              <div class="py-4 border-b border-slate-200 flex flex-col gap-1">
                <strong class="text-slate-900 text-[15px]">Technical Tailoring Guidance</strong>
                <span class="text-slate-500 text-[13px]">Product development and technical guidance from Su Collection.</span>
              </div>
              <div class="py-4 border-b border-slate-200 flex flex-col gap-1">
                <strong class="text-slate-900 text-[15px]">Business Mentorship</strong>
                <span class="text-slate-500 text-[13px]">Customer, offer, pricing, positioning and business-building guidance.</span>
              </div>
              <div class="py-4 border-b border-slate-200 flex flex-col gap-1">
                <strong class="text-slate-900 text-[15px]">WhatsApp Business Training</strong>
                <span class="text-slate-500 text-[13px]">Build a practical customer enquiry and sales flow.</span>
              </div>
              <div class="py-4 border-b border-slate-200 flex flex-col gap-1">
                <strong class="text-slate-900 text-[15px]">Facebook & TikTok Training</strong>
                <span class="text-slate-500 text-[13px]">Build your presence and use content to attract customers.</span>
              </div>
            </div>

            <!-- Right Column -->
            <div class="flex flex-col">
              <div class="py-4 border-b border-slate-200 flex flex-col gap-1">
                <strong class="text-slate-900 text-[15px]">Organic Sales System</strong>
                <span class="text-slate-500 text-[13px]">Learn how to move from content and attention to enquiries and sales.</span>
              </div>
              <div class="py-4 border-b border-slate-200 flex flex-col gap-1">
                <strong class="text-slate-900 text-[15px]">Facebook & TikTok Ads</strong>
                <span class="text-slate-500 text-[13px]">Learn paid acquisition, testing and measurement fundamentals.</span>
              </div>
              <div class="py-4 border-b border-slate-200 flex flex-col gap-1">
                <strong class="text-slate-900 text-[15px]">Business Growth Workbook</strong>
                <span class="text-slate-500 text-[13px]">One integrated workbook used throughout the programme.</span>
              </div>
              <div class="py-4 border-b border-slate-200 flex flex-col gap-1">
                <strong class="text-slate-900 text-[15px]">100-Day Action Checklist</strong>
                <span class="text-slate-500 text-[13px]">Clear implementation actions to keep you moving.</span>
              </div>
              <div class="py-4 border-b border-slate-200 flex flex-col gap-1">
                <strong class="text-slate-900 text-[15px]">Practical Templates & Tools</strong>
                <span class="text-slate-500 text-[13px]">Worksheets, checklists, planners and sales frameworks.</span>
              </div>
              <div class="py-4 border-b border-slate-200 flex flex-col gap-1">
                <strong class="text-slate-900 text-[15px]">Programme Community</strong>
                <span class="text-slate-500 text-[13px]">Structured community access for questions, implementation and support.</span>
              </div>
              <div class="py-4 border-b md:border-none border-slate-200 flex flex-col gap-1">
                <strong class="text-slate-900 text-[15px]">Session Recordings</strong>
                <span class="text-slate-500 text-[13px]">Access to programme recordings for revision and catch-up.</span>
              </div>
            </div>
          </div>
        </section>

        <!-- Section: How It Works (Dark) -->
        <section class="py-12 sm:py-16">
          <div class="bg-slate-950 text-white p-8 sm:p-12 rounded-[24px] sm:rounded-[32px] shadow-2xl relative overflow-hidden">
            <!-- Decorative circle -->
            <div class="absolute top-0 right-0 w-[400px] h-[400px] bg-brand-900/20 rounded-full blur-[80px] translate-x-1/3 -translate-y-1/3 pointer-events-none"></div>
            
            <div class="relative z-10">
              <h2 class="font-serif text-[28px] sm:text-[36px] text-white tracking-tight mb-2">How the Mentorship Works</h2>
              <p class="text-slate-300 text-[16px] mb-12">We guide you through the process. You build the business.</p>

              <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6 sm:gap-8">
                <div class="border-t border-slate-700 pt-5">
                  <strong class="text-brand-300 tracking-wider text-[13px] block mb-2 uppercase">01 · Learn</strong>
                  <p class="text-slate-400 text-[13px] leading-relaxed">Understand what needs to be done and how.</p>
                </div>
                <div class="border-t border-slate-700 pt-5">
                  <strong class="text-brand-300 tracking-wider text-[13px] block mb-2 uppercase">02 · Build</strong>
                  <p class="text-slate-400 text-[13px] leading-relaxed">Apply it to your own business.</p>
                </div>
                <div class="border-t border-slate-700 pt-5">
                  <strong class="text-brand-300 tracking-wider text-[13px] block mb-2 uppercase">03 · Submit</strong>
                  <p class="text-slate-400 text-[13px] leading-relaxed">Submit important milestones for review.</p>
                </div>
                <div class="border-t border-slate-700 pt-5">
                  <strong class="text-brand-300 tracking-wider text-[13px] block mb-2 uppercase">04 · Improve</strong>
                  <p class="text-slate-400 text-[13px] leading-relaxed">Use feedback to strengthen your work.</p>
                </div>
                <div class="border-t border-slate-700 pt-5">
                  <strong class="text-brand-300 tracking-wider text-[13px] block mb-2 uppercase">05 · Grow</strong>
                  <p class="text-slate-400 text-[13px] leading-relaxed">Test, measure and plan your next move.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Section: What Changes -->
        <section class="py-16 sm:py-20 border-t border-slate-100">
          <h2 class="font-serif text-[28px] sm:text-[36px] text-slate-950 tracking-tight mb-4">What Changes for You Over These 100 Days?</h2>
          <p class="text-slate-600 text-[16px] sm:text-[18px] max-w-[720px] mb-12 leading-relaxed">
            You may already have the tailoring skill. The difficult part is turning that skill into something people want to buy, getting those people to notice you, and turning interest into actual orders. This programme is built around those problems.
          </p>

          <div class="max-w-[820px] divide-y divide-slate-200">
            <!-- Accordion 1 -->
            <details class="group py-5" open>
              <summary class="flex justify-between items-center font-bold text-slate-900 cursor-pointer list-none text-[15px] sm:text-[16px]">
                “I can sew, but I don't know what I should actually sell.”
                <span class="transition group-open:rotate-180">
                  <mat-icon class="text-slate-400">expand_more</mat-icon>
                </span>
              </summary>
              <p class="text-slate-600 text-[14px] mt-4 leading-relaxed pr-8">
                We help you choose a practical product or service around your tailoring ability, identify who it is for, and turn the idea into a clear starting business direction.
              </p>
            </details>

            <!-- Accordion 2 -->
            <details class="group py-5">
              <summary class="flex justify-between items-center font-bold text-slate-900 cursor-pointer list-none text-[15px] sm:text-[16px]">
                “I make things, but I don't know if people will actually buy them.”
                <span class="transition group-open:rotate-180">
                  <mat-icon class="text-slate-400">expand_more</mat-icon>
                </span>
              </summary>
              <p class="text-slate-600 text-[14px] mt-4 leading-relaxed pr-8">
                You work on a viable product or service, improve it with guidance, work through costing and pricing, and shape it into an offer that is easier for a customer to understand and buy.
              </p>
            </details>

            <!-- Accordion 3 -->
            <details class="group py-5">
              <summary class="flex justify-between items-center font-bold text-slate-900 cursor-pointer list-none text-[15px] sm:text-[16px]">
                “I have Facebook/TikTok/WhatsApp, but they are not bringing me customers.”
                <span class="transition group-open:rotate-180">
                  <mat-icon class="text-slate-400">expand_more</mat-icon>
                </span>
              </summary>
              <p class="text-slate-600 text-[14px] mt-4 leading-relaxed pr-8">
                Instead of treating social media as something you simply post on, you build a connected customer journey: people discover you, understand what you offer, contact you on WhatsApp and move toward an order.
              </p>
            </details>

            <!-- Accordion 4 -->
            <details class="group py-5">
              <summary class="flex justify-between items-center font-bold text-slate-900 cursor-pointer list-none text-[15px] sm:text-[16px]">
                “I get views or enquiries, but people don't become customers.”
                <span class="transition group-open:rotate-180">
                  <mat-icon class="text-slate-400">expand_more</mat-icon>
                </span>
              </summary>
              <p class="text-slate-600 text-[14px] mt-4 leading-relaxed pr-8">
                You build a practical enquiry-to-sale process, including how to respond, present the offer, handle common objections, close the conversation and follow up.
              </p>
            </details>

            <!-- Accordion 5 -->
            <details class="group py-5">
              <summary class="flex justify-between items-center font-bold text-slate-900 cursor-pointer list-none text-[15px] sm:text-[16px]">
                “I don't know what to post every day.”
                <span class="transition group-open:rotate-180">
                  <mat-icon class="text-slate-400">expand_more</mat-icon>
                </span>
              </summary>
              <p class="text-slate-600 text-[14px] mt-4 leading-relaxed pr-8">
                You leave with a repeatable content system and a 30-day content plan built around your own products, customers and sales goals—so you are not starting from zero every time you need to post.
              </p>
            </details>

            <!-- Accordion 6 -->
            <details class="group py-5">
              <summary class="flex justify-between items-center font-bold text-slate-900 cursor-pointer list-none text-[15px] sm:text-[16px]">
                “I don't know how to get customers without constantly chasing people.”
                <span class="transition group-open:rotate-180">
                  <mat-icon class="text-slate-400">expand_more</mat-icon>
                </span>
              </summary>
              <p class="text-slate-600 text-[14px] mt-4 leading-relaxed pr-8">
                You build an organic customer-acquisition process using Facebook and TikTok content, clear calls to action and WhatsApp Business, giving interested customers a simple path to contact you.
              </p>
            </details>

            <!-- Accordion 7 -->
            <details class="group py-5">
              <summary class="flex justify-between items-center font-bold text-slate-900 cursor-pointer list-none text-[15px] sm:text-[16px]">
                “I'm afraid of spending money on Facebook or TikTok ads without knowing what I'm doing.”
                <span class="transition group-open:rotate-180">
                  <mat-icon class="text-slate-400">expand_more</mat-icon>
                </span>
              </summary>
              <p class="text-slate-600 text-[14px] mt-4 leading-relaxed pr-8">
                Before you put money behind advertising, you learn how to structure a campaign, choose an audience, prepare the creative and connect the ad to your sales process. You also learn what the numbers are telling you so you can make better decisions.
              </p>
            </details>

            <!-- Accordion 8 -->
            <details class="group py-5 border-b border-slate-200">
              <summary class="flex justify-between items-center font-bold text-slate-900 cursor-pointer list-none text-[15px] sm:text-[16px]">
                “I don't know what I should do next to actually grow.”
                <span class="transition group-open:rotate-180">
                  <mat-icon class="text-slate-400">expand_more</mat-icon>
                </span>
              </summary>
              <p class="text-slate-600 text-[14px] mt-4 leading-relaxed pr-8">
                By the end of the programme, you have a clearer picture of what is working, what needs attention and what to focus on next—with a practical 90-day growth plan to keep moving after the mentorship ends.
              </p>
            </details>
          </div>
        </section>

        <!-- Section: Four Business Milestones -->
        <section class="py-16 sm:py-20 border-t border-slate-100">
          <h2 class="font-serif text-[28px] sm:text-[36px] text-slate-950 tracking-tight mb-8">Four Business Milestones</h2>
          
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div class="border border-slate-200 p-6 sm:p-8 rounded-2xl bg-white shadow-sm hover:shadow-md transition-shadow">
              <div class="text-[11px] text-brand-700 font-extrabold tracking-widest mb-4 uppercase">01 · Product</div>
              <h3 class="text-[18px] font-bold text-slate-950 mb-3 leading-snug">Product & Offer Evaluation</h3>
              <p class="text-[14px] text-slate-600 leading-relaxed">Review your product, customer, costing, pricing and offer.</p>
            </div>
            <div class="border border-slate-200 p-6 sm:p-8 rounded-2xl bg-white shadow-sm hover:shadow-md transition-shadow">
              <div class="text-[11px] text-brand-700 font-extrabold tracking-widest mb-4 uppercase">02 · Digital</div>
              <h3 class="text-[18px] font-bold text-slate-950 mb-3 leading-snug">Digital Business Review</h3>
              <p class="text-[14px] text-slate-600 leading-relaxed">Review Facebook, TikTok and WhatsApp Business.</p>
            </div>
            <div class="border border-slate-200 p-6 sm:p-8 rounded-2xl bg-white shadow-sm hover:shadow-md transition-shadow">
              <div class="text-[11px] text-brand-700 font-extrabold tracking-widest mb-4 uppercase">03 · Sales</div>
              <h3 class="text-[18px] font-bold text-slate-950 mb-3 leading-snug">Organic Sales Review</h3>
              <p class="text-[14px] text-slate-600 leading-relaxed">Review your content, enquiry flow, WhatsApp sales process and follow-up.</p>
            </div>
          </div>
          
          <div class="max-w-md">
            <div class="border border-slate-200 p-6 sm:p-8 rounded-2xl bg-white shadow-sm hover:shadow-md transition-shadow bg-gradient-to-br from-white to-slate-50">
              <div class="text-[11px] text-brand-700 font-extrabold tracking-widest mb-4 uppercase">04 · Growth</div>
              <h3 class="text-[18px] font-bold text-slate-950 mb-3 leading-snug">Final Growth Plan Review</h3>
              <p class="text-[14px] text-slate-600 leading-relaxed">Review your progress and your next 90-day business plan.</p>
            </div>
          </div>
        </section>

        <!-- Section: What You Have Built -->
        <section class="py-16 sm:py-20 border-t border-slate-100">
          <h2 class="font-serif text-[28px] sm:text-[36px] text-slate-950 tracking-tight mb-8">What You Should Have Built by Day 100</h2>
          
          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            <div class="border border-slate-200 p-6 rounded-xl bg-white shadow-sm">
              <h3 class="text-[16px] font-bold text-slate-950 mb-2 leading-snug">A Product or Service</h3>
              <p class="text-[13px] text-slate-600">A defined starting offer you have developed and worked through.</p>
            </div>
            <div class="border border-slate-200 p-6 rounded-xl bg-white shadow-sm">
              <h3 class="text-[16px] font-bold text-slate-950 mb-2 leading-snug">An Online Presence</h3>
              <p class="text-[13px] text-slate-600">Facebook, TikTok and WhatsApp Business connected to your customer journey.</p>
            </div>
            <div class="border border-slate-200 p-6 rounded-xl bg-white shadow-sm">
              <h3 class="text-[16px] font-bold text-slate-950 mb-2 leading-snug">A Sales System</h3>
              <p class="text-[13px] text-slate-600">A practical path from content and enquiries to customer conversations and sales.</p>
            </div>
            <div class="border border-slate-200 p-6 rounded-xl bg-white shadow-sm">
              <h3 class="text-[16px] font-bold text-slate-950 mb-2 leading-snug">An Advertising Foundation</h3>
              <p class="text-[13px] text-slate-600">The knowledge to plan, test and measure paid campaigns.</p>
            </div>
            <div class="border border-slate-200 p-6 rounded-xl bg-white shadow-sm">
              <h3 class="text-[16px] font-bold text-slate-950 mb-2 leading-snug">A 90-Day Growth Plan</h3>
              <p class="text-[13px] text-slate-600">A practical roadmap for continuing after the programme.</p>
            </div>
          </div>
        </section>

        <!-- Section: Price & Value -->
        <section class="py-16 sm:py-20 border-t border-slate-100">
          <h2 class="font-serif text-[28px] sm:text-[36px] text-slate-950 tracking-tight mb-8">Why We Put a Real Price on This</h2>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch mb-10">
            <div class="border border-slate-200 p-8 sm:p-10 rounded-[24px] bg-white shadow-sm">
              <div class="text-[11px] text-brand-700 font-extrabold tracking-widest mb-4 uppercase">The Value</div>
              <h3 class="text-[20px] font-bold text-slate-950 mb-4 leading-snug">This is far more than a collection of lessons.</h3>
              <p class="text-[15px] text-slate-600 leading-relaxed mb-4">
                You are getting 100 days of structured guidance across product development, business building, digital sales, organic customer acquisition and paid growth — supported by practical tools, live sessions and milestone evaluations.
              </p>
              <p class="text-[15px] text-slate-600 leading-relaxed">
                We believe the complete programme represents <strong class="text-slate-900">more than LKR 200,000 in value</strong> when considered against the depth of guidance and the different areas covered.
              </p>
            </div>
            
            <div class="border border-slate-900 bg-slate-50 p-8 sm:p-10 rounded-[24px] shadow-sm relative overflow-hidden">
              <div class="absolute top-0 right-0 w-32 h-32 bg-brand-100 rounded-full blur-[40px] translate-x-1/2 -translate-y-1/2"></div>
              <div class="relative z-10">
                <div class="text-[11px] text-brand-700 font-extrabold tracking-widest mb-4 uppercase">Why the launch price is lower</div>
                <h3 class="text-[20px] font-bold text-slate-950 mb-4 leading-snug">Because we want to open the door for Sri Lanka's sewing community.</h3>
                <p class="text-[15px] text-slate-600 leading-relaxed mb-4">
                  We know there are people with real skill, real ambition and a dream of building something of their own who would never be able to justify a conventional business mentorship at that level.
                </p>
                <p class="text-[15px] text-slate-600 leading-relaxed">
                  So we are offering this programme at a fraction of that value — not because the work is worth less, but because we want more people with genuine potential to have a starting point.
                </p>
              </div>
            </div>
          </div>

          <div class="bg-slate-950 text-white p-8 sm:p-10 rounded-[24px] sm:rounded-[32px] shadow-xl">
            <h3 class="text-[22px] sm:text-[26px] font-bold mb-4 font-serif">The Price Is Also a Commitment.</h3>
            <p class="text-slate-300 text-[15px] sm:text-[16px] mb-4 leading-relaxed">
              We could make this cheaper. But when someone puts nothing at stake, it becomes very easy to postpone the work, miss the sessions and let a good opportunity disappear.
            </p>
            <p class="text-brand-300 text-[15px] sm:text-[16px] font-bold mb-4 leading-relaxed">
              Your payment is not a guarantee of success. It is your commitment to yourself to show up and do the work.
            </p>
            <p class="text-slate-300 text-[15px] sm:text-[16px] leading-relaxed">
              If you are serious about building something from your tailoring skill, we want to be the people who guide you from the beginning.
            </p>
          </div>
        </section>

        <!-- Section: One Important Thing -->
        <section class="py-12 border-t border-slate-100 text-center max-w-3xl mx-auto">
          <h2 class="font-serif text-[28px] text-slate-950 tracking-tight mb-4">One Important Thing</h2>
          <p class="text-[18px] text-slate-800 font-bold mb-4">We provide the knowledge, frameworks, tools, guidance and feedback. You do the building.</p>
          <p class="text-[14px] text-slate-500 leading-relaxed">
            The programme does not include done-for-you website development, social media management, content production, individual ad management, unlimited private consultations or guaranteed sales/income.
          </p>
        </section>

        <!-- Final CTA -->
        <div id="order" class="bg-brand-50 border border-brand-100 rounded-[32px] p-10 sm:p-16 text-center mt-12 shadow-sm">
          <h2 class="font-serif text-[32px] sm:text-[40px] text-slate-950 tracking-tight mb-4">Are You Ready to Actually Build?</h2>
          <p class="text-[16px] sm:text-[18px] text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed">
            If you are prepared to put in the work for the next 100 days, we will give you the roadmap, the guidance and the support to build from where you are now.
          </p>
          
          @if (proceeding()) {
            <button disabled class="inline-flex items-center justify-center gap-2 bg-slate-800 text-white px-8 sm:px-12 py-4 sm:py-5 rounded-xl font-bold text-[16px] sm:text-[18px] shadow-lg shadow-slate-900/20 mb-6 opacity-80 cursor-wait">
              <mat-icon class="animate-spin">sync</mat-icon> Proceeding...
            </button>
          } @else if (cartService.hasItem('course-' + courseId)) {
            <a routerLink="/checkout" class="inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-8 sm:px-12 py-4 sm:py-5 rounded-xl font-bold text-[16px] sm:text-[18px] transition-colors shadow-lg shadow-emerald-900/20 mb-6">
              <mat-icon>check_circle</mat-icon> Proceed to Checkout
            </a>
          } @else {
            <button (click)="enroll()" class="inline-block bg-slate-950 hover:bg-slate-800 text-white px-8 sm:px-12 py-4 sm:py-5 rounded-xl font-bold text-[16px] sm:text-[18px] transition-colors shadow-lg shadow-slate-900/20 mb-6">
              I'm Ready — Reserve My Place for LKR 5,000
            </button>
          }
          
          <p class="text-[13px] text-slate-500 font-medium mb-8">Total launch programme fee: LKR 55,000 · Full-payment offer: LKR 50,000</p>
          
          <p class="text-[12px] text-slate-400 max-w-xl mx-auto leading-relaxed border-t border-slate-200/60 pt-6">
            This programme requires your active participation. We guide you. You do the building. Results depend on your effort, implementation, market and business decisions.
          </p>
        </div>

      </main>
    </div>
  `
})
export class Mentorship implements OnInit {
  contentService = inject(ContentService);
  cartService = inject(CartService);
  private router = inject(Router);
  private title = inject(Title);
  private meta = inject(Meta);

  courseId = '6-month-tailoring-business-mentorship';
  proceeding = signal(false);

  enroll() {
    this.proceeding.set(true);
    this.cartService.addItem({
      id: 'course-' + this.courseId,
      name: 'මාස 6ක මැහුම් සහ ව්යාපාරික මඟපෙන්වීම (Mentorship)',
      price: 45000,
      image: 'https://images.unsplash.com/photo-1551893665-f843f600794e?q=80&w=800&auto=format&fit=crop',
      quantity: 1
    });
    
    setTimeout(() => {
      this.router.navigate(['/checkout']);
    }, 400);
  }

  ngOnInit() {
    this.title.setTitle('Tailoring Business Growth Mentorship | Su Collection');
    this.meta.updateTag({ name: 'description', content: 'A 100-day guided business-building programme for people who are ready to build a future from their sewing skills.' });
    if (typeof window !== 'undefined') {
      window.scrollTo(0, 0);
    }
  }
}
