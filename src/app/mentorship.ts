import {ChangeDetectionStrategy, Component, inject, OnInit, signal} from '@angular/core';
import {doc, getDoc} from 'firebase/firestore';
import {db} from '../lib/firebase';
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
    <div class="bg-white min-h-screen pb-20 pt-8 lg:pt-12 noto-sinhala-page">
      <!-- Top Banner -->
      <div class="bg-brand-900 text-white text-center py-2.5 text-[12px] sm:text-[13px] font-bold tracking-widest uppercase">
        දින 100ක Guided Business Building Programme
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
            <h1 class="font-serif text-[36px] sm:text-[44px] lg:text-[48px] leading-[1.1] tracking-tight text-brand-900 mb-5">Tailoring Business Growth Mentorship</h1>
            <p class="text-[18px] sm:text-[20px] text-brand-900/90 font-medium mb-6 leading-snug">ඔයාට tailoring skill එක තියෙනවා. දැන් ඒ skill එකෙන් ඇත්තටම business එකක් හදමු.</p>
            <p class="text-[15px] sm:text-[16px] text-brand-900/70 mb-8 leading-relaxed">
              මහන වැඩේ දන්න එක විතරක් නෙවෙයි. ඒ skill එකෙන් income එකක් ගන්න පුළුවන් business එකක් හදන්නේ කොහොමද කියලා, දින 100ක් අපිත් එක්ක step by step build කරන programme එකක්.
            </p>
            
            <div class="border-y border-brand-200 py-6 my-8 flex items-baseline gap-3">
              <span class="line-through text-brand-900/50 text-[18px] font-medium">LKR 65,000</span>
              <span class="text-[28px] sm:text-[32px] font-extrabold text-brand-900">LKR 50,000</span>
            </div>
            
            <div class="bg-brand-50 border-l-4 border-brand-800 p-4 text-[13px] sm:text-[14px] text-brand-900/80 mb-8 rounded-r-lg">
              <strong>Launch Offer:</strong> ඔයාගේ place එක <strong>LKR 5,000</strong>කින් reserve කරන්න. Total programme fee එක <strong>LKR 55,000</strong>යි. මේ LKR 5,000 එක total fee එකේම කොටසක්.
            </div>
            
            @if (proceeding()) {
              <button disabled class="block w-full text-center bg-brand-800 text-white py-4 rounded-xl font-bold text-[15px] sm:text-[16px] shadow-md opacity-80 cursor-wait flex items-center justify-center gap-2">
                <mat-icon class="animate-spin">sync</mat-icon> Proceeding...
              </button>
            } @else if (cartService.hasItem('course-' + courseId)) {
              <a routerLink="/checkout" class="block w-full text-center bg-emerald-600 hover:bg-emerald-700 text-white py-4 rounded-xl font-bold text-[15px] sm:text-[16px] transition-colors shadow-md flex items-center justify-center gap-2">
                <mat-icon>check_circle</mat-icon> Proceed to Checkout
              </a>
            } @else {
              <button (click)="enroll()" class="block w-full text-center bg-brand-900 hover:bg-brand-800 text-white py-4 rounded-xl font-bold text-[15px] sm:text-[16px] transition-colors shadow-md">
                LKR 5,000කින් Place එක Reserve කරන්න
              </button>
            }
            <p class="text-brand-900/60 text-[12px] text-center mt-4 font-medium">Full payment: LKR 50,000</p>
          </div>
        </div>

        <!-- Section: You Don't Need More Information -->
        <section class="py-16 sm:py-20 border-t border-brand-100 mt-8">
          <h2 class="font-serif text-[28px] sm:text-[36px] text-brand-900 tracking-tight mb-4">තව Course එකක් ඕන නෑ. ඔයාට ඕනේ දැන් මොනවා කරන්නද කියලා දැනගන්න එක.</h2>
          <p class="text-brand-900/70 text-[16px] sm:text-[18px] max-w-[720px] mb-12 leading-relaxed">
            ඔයා අවුරුදු ගාණක් මහන වැඩේ කරන කෙනෙක් වෙන්න පුළුවන්. එහෙම නැත්නම් දැන් තමයි seriously පටන් ගත්තේ. Family එකට, යාළුවන්ට ඇඳුම් මහලා දීලා,
            <br><br><strong>“මට මේකෙන් ඇත්තටම business එකක් හදන්න පුළුවන්ද?”</strong><br><br>
            කියලා ඔයාටත් හිතෙන්න ඇති. ප්‍රශ්නේ dream එක නැති එක නෙවෙයි. ඊළඟට මොකක් කරන්නද කියලා clear නැති එක. ඒකයි අපි මේ දින 100 පුරා guide කරන්නේ.
          </p>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div class="border border-brand-200 p-6 sm:p-8 rounded-2xl bg-white shadow-sm hover:shadow-md transition-shadow">
              <div class="text-[11px] text-brand-700 font-extrabold tracking-widest mb-4 uppercase">SKILL එකෙන්</div>
              <h3 class="text-[18px] font-bold text-brand-900 mb-3 leading-snug">“මට මහන්න පුළුවන්. ඒත් මම ඇත්තටම මොනවාද sell කරන්නේ?”</h3>
              <p class="text-[14px] text-brand-900/70 leading-relaxed">ඔයාගේ skill එකට ගැළපෙන product/service එකක් තෝරගෙන, කාටද sell කරන්නේ, කීයටද sell කරන්නේ කියලා clear කරගන්න.</p>
            </div>
            <div class="border border-brand-200 p-6 sm:p-8 rounded-2xl bg-white shadow-sm hover:shadow-md transition-shadow">
              <div class="text-[11px] text-brand-700 font-extrabold tracking-widest mb-4 uppercase">කවුරුත් දන්නේ නෑ කියන තැනින්</div>
              <h3 class="text-[18px] font-bold text-brand-900 mb-3 leading-snug">“මම හොඳට හදනවා. ඒත් මාව දන්න කෙනෙක් නෑ.”</h3>
              <p class="text-[14px] text-brand-900/70 leading-relaxed">Facebook, TikTok සහ WhatsApp Business එක එකට connect කරලා, interested customer කෙනෙක්ට ඔයාව හොයාගෙන message කරන්න ලේසි system එකක් හදගන්න.</p>
            </div>
            <div class="border border-brand-200 p-6 sm:p-8 rounded-2xl bg-white shadow-sm hover:shadow-md transition-shadow">
              <div class="text-[11px] text-brand-700 font-extrabold tracking-widest mb-4 uppercase">අනේ මොකද කරන්නේ කියන තැනින්</div>
              <h3 class="text-[18px] font-bold text-brand-900 mb-3 leading-snug">“අය අහනවා. බලනවා. ඒත් order එකක් දාන්නේ නෑ.”</h3>
              <p class="text-[14px] text-brand-900/70 leading-relaxed">Content එකක් දැක්ක තැනින් enquiry එකකට, enquiry එකෙන් conversation එකකට, එතනින් order එකකට යන clear sales flow එකක් හදගන්න.</p>
            </div>
          </div>

          <div class="bg-brand-900 text-white p-8 sm:p-10 rounded-2xl sm:rounded-[32px] mt-12 shadow-xl">
            <h3 class="text-[22px] sm:text-[26px] font-bold mb-4 font-serif">මේ Programme එක හැමෝටම නෙවෙයි.</h3>
            <p class="text-white/80 text-[15px] sm:text-[16px] mb-6 leading-relaxed">
              තවත් course එකක් බලලා certificate එකක් අරගෙන නවතින්න හිතාගෙන ඉන්න අය අපිට ඕන නෑ. අපිට ඕනේ ඇත්තටම build කරන්න ලෑස්ති අය. ඉගෙනගෙන, ඒක තමන්ගේ business එකට apply කරන්න ලෑස්ති අය.
            </p>
            <ul class="space-y-3 text-white/90 text-[14px] sm:text-[15px] list-disc list-inside marker:text-brand-400 mb-8">
              <li>වැඩේ කරන්න වෙන්නේ ඔයාට.</li>
              <li>තීරණ ගන්න වෙන්නේ ඔයාට.</li>
              <li>Product සහ content හදන්න වෙන්නේ ඔයාට.</li>
              <li>Customers එක්ක කතා කරන්න වෙන්නේ ඔයාට.</li>
              <li>Test කරන්න, වැරදි වෙන්න, ඒවා හදාගන්න වෙන්නේ ඔයාට.</li>
              <li>දින 100 පුරා මේකට commit වෙලා ඉන්න වෙන්නේ ඔයාට.</li>
            </ul>
            <p class="font-bold text-brand-200 text-[15px] sm:text-[16px]">ඔයා වෙනුවෙන් business එක හදලා දෙන්න කෙනෙක් හොයනවා නම්, මේ programme එක ඒක නෙවෙයි.</p>
          </div>
        </section>

        <!-- Section: 100 Days Roadmap -->
        <section class="py-16 sm:py-20 border-t border-brand-100">
          <h2 class="font-serif text-[28px] sm:text-[36px] text-brand-900 tracking-tight mb-4">හැමදාම “පස්සේ කරමු” කියලා දාගෙන ඉන්න Business එකේ වැඩ ටික — දින 100කින් Build කරමු.</h2>
          <p class="text-brand-900/70 text-[16px] sm:text-[18px] max-w-[720px] mb-12 leading-relaxed">
            පටන් ගන්න කලින් හැම දෙයක්ම දැනගෙන ඉන්න ඕන නෑ. මුල ඉඳන් එක එක business problem එක solve කරගෙන අපි ඔයාව guide කරනවා.
          </p>

          <div class="grid grid-cols-1 md:grid-cols-5 border border-brand-200 rounded-2xl overflow-hidden bg-white shadow-sm">
            <!-- Phase 1 -->
            <div class="p-6 border-b md:border-b-0 md:border-r border-brand-200 bg-brand-50/50 hover:bg-brand-50 transition-colors">
              <div class="text-[11px] text-brand-700 font-extrabold tracking-widest mb-3 uppercase">Days 1–15</div>
              <h3 class="text-[16px] font-bold text-brand-900 mb-2 leading-snug">මොනවාද Sell කරන්නේ කියලා guess කරන එක නවත්වමු</h3>
              <p class="text-[13px] text-brand-900/70">Sell කරන්න පුළුවන් practical offer එකක් තෝරගෙන, ඒක කාටද කියලා clear කරගමු.</p>
            </div>
            <!-- Phase 2 -->
            <div class="p-6 border-b md:border-b-0 md:border-r border-brand-200 hover:bg-brand-50 transition-colors">
              <div class="text-[11px] text-brand-700 font-extrabold tracking-widest mb-3 uppercase">Days 16–35</div>
              <h3 class="text-[16px] font-bold text-brand-900 mb-2 leading-snug">මිනිස්සු ගන්න කැමති දෙයක් හදමු</h3>
              <p class="text-[13px] text-brand-900/70">Product එක develop කරලා, costing/pricing හදලා, clear offer එකක් කරගමු.</p>
            </div>
            <!-- Phase 3 -->
            <div class="p-6 border-b md:border-b-0 md:border-r border-brand-200 bg-brand-50/50 hover:bg-brand-50 transition-colors">
              <div class="text-[11px] text-brand-700 font-extrabold tracking-widest mb-3 uppercase">Days 36–55</div>
              <h3 class="text-[16px] font-bold text-brand-900 mb-2 leading-snug">Customersලාට ඔයාව හොයාගන්න පාරක් හදමු</h3>
              <p class="text-[13px] text-brand-900/70">Facebook, TikTok සහ WhatsApp Business එක එකට connect කරගමු.</p>
            </div>
            <!-- Phase 4 -->
            <div class="p-6 border-b md:border-b-0 md:border-r border-brand-200 hover:bg-brand-50 transition-colors">
              <div class="text-[11px] text-brand-700 font-extrabold tracking-widest mb-3 uppercase">Days 56–80</div>
              <h3 class="text-[16px] font-bold text-brand-900 mb-2 leading-snug">Views ටික Enquiries වලට හරවමු</h3>
              <p class="text-[13px] text-brand-900/70">Content සහ WhatsApp use කරලා enquiry → sale path එක හදමු.</p>
            </div>
            <!-- Phase 5 -->
            <div class="p-6 hover:bg-brand-50 transition-colors bg-brand-50/50">
              <div class="text-[11px] text-brand-700 font-extrabold tracking-widest mb-3 uppercase">Days 81–100</div>
              <h3 class="text-[16px] font-bold text-brand-900 mb-2 leading-snug">මොන දේද Grow කරන්න ඕන කියලා දැනගමු</h3>
              <p class="text-[13px] text-brand-900/70">Paid ads test කරලා, results බලලා, ඊළඟ දින 90ට plan එකක් හදමු.</p>
            </div>
          </div>
        </section>

        <!-- Section: What You Get -->
        <section class="py-16 sm:py-20 border-t border-brand-100">
          <h2 class="font-serif text-[28px] sm:text-[36px] text-brand-900 tracking-tight mb-4">ඊළඟ දින 100ට ඔයාට ලැබෙන්නේ මොනවාද?</h2>
          <p class="text-brand-900/70 text-[16px] sm:text-[18px] max-w-[720px] mb-12 leading-relaxed">
            මේක lessons ටිකක් විතරක් නෙවෙයි. ඔයාට තියෙන්නේ follow කරන්න පුළුවන් path එකක්, practical tools, mentor guidance සහ progress check කරන checkpoints.
          </p>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-0">
            <!-- Left Column -->
            <div class="flex flex-col">
              <div class="py-4 border-b border-brand-200 flex flex-col gap-1">
                <strong class="text-brand-900 text-[15px]">දින 100ක Guided Mentorship</strong>
                <span class="text-brand-900/60 text-[13px]">Product එකේ ඉඳන් business growth එක දක්වා step-by-step journey එක.</span>
              </div>
              <div class="py-4 border-b border-brand-200 flex flex-col gap-1">
                <strong class="text-brand-900 text-[15px]">Live Sessions 20ක්</strong>
                <span class="text-brand-900/60 text-[13px]">Training, demonstrations, implementation clinics සහ reviews.</span>
              </div>
              <div class="py-4 border-b border-brand-200 flex flex-col gap-1">
                <strong class="text-brand-900 text-[15px]">Business Evaluations 4ක්</strong>
                <span class="text-brand-900/60 text-[13px]">Product & Offer, Digital Business, Organic Sales සහ Growth Plan.</span>
              </div>
              <div class="py-4 border-b border-brand-200 flex flex-col gap-1">
                <strong class="text-brand-900 text-[15px]">Technical Tailoring Guidance</strong>
                <span class="text-brand-900/60 text-[13px]">Su Collection එකෙන් product development සහ tailoring side එකේ guidance.</span>
              </div>
              <div class="py-4 border-b border-brand-200 flex flex-col gap-1">
                <strong class="text-brand-900 text-[15px]">Business Mentorship</strong>
                <span class="text-brand-900/60 text-[13px]">Customer, offer, pricing, positioning සහ business building ගැන guidance.</span>
              </div>
              <div class="py-4 border-b border-brand-200 flex flex-col gap-1">
                <strong class="text-brand-900 text-[15px]">WhatsApp Business Training</strong>
                <span class="text-brand-900/60 text-[13px]">Customer enquiry එකේ ඉඳන් sale එක දක්වා practical flow එකක් හදගන්න.</span>
              </div>
              <div class="py-4 border-b border-brand-200 flex flex-col gap-1">
                <strong class="text-brand-900 text-[15px]">Facebook & TikTok Training</strong>
                <span class="text-brand-900/60 text-[13px]">Online presence එක හදලා content හරහා customersලා attract කරගන්න.</span>
              </div>
            </div>

            <!-- Right Column -->
            <div class="flex flex-col">
              <div class="py-4 border-b border-brand-200 flex flex-col gap-1">
                <strong class="text-brand-900 text-[15px]">Organic Sales System</strong>
                <span class="text-brand-900/60 text-[13px]">Content සහ attention එක enquiry සහ sales වලට හරවන්නේ කොහොමද කියලා build කරගන්න.</span>
              </div>
              <div class="py-4 border-b border-brand-200 flex flex-col gap-1">
                <strong class="text-brand-900 text-[15px]">Facebook & TikTok Ads</strong>
                <span class="text-brand-900/60 text-[13px]">Paid ads run කරන basic structure, testing සහ results measure කරන හැටි.</span>
              </div>
              <div class="py-4 border-b border-brand-200 flex flex-col gap-1">
                <strong class="text-brand-900 text-[15px]">Business Growth Workbook</strong>
                <span class="text-brand-900/60 text-[13px]">දින 100 පුරාම use කරන එකම integrated workbook එක.</span>
              </div>
              <div class="py-4 border-b border-brand-200 flex flex-col gap-1">
                <strong class="text-brand-900 text-[15px]">100-Day Action Checklist</strong>
                <span class="text-brand-900/60 text-[13px]">Stage එකෙන් stage එකට කරන්න ඕන වැඩ clear කරලා දෙන checklist එක.</span>
              </div>
              <div class="py-4 border-b border-brand-200 flex flex-col gap-1">
                <strong class="text-brand-900 text-[15px]">Practical Templates & Tools</strong>
                <span class="text-brand-900/60 text-[13px]">Worksheets, checklists, planners සහ sales frameworks.</span>
              </div>
              <div class="py-4 border-b border-brand-200 flex flex-col gap-1">
                <strong class="text-brand-900 text-[15px]">Programme Community</strong>
                <span class="text-brand-900/60 text-[13px]">Questions අහන්න, progress share කරන්න සහ support ගන්න structured community එක.</span>
              </div>
              <div class="py-4 border-b md:border-none border-brand-200 flex flex-col gap-1">
                <strong class="text-brand-900 text-[15px]">Session Recordings</strong>
                <span class="text-brand-900/60 text-[13px]">Miss වුණ session එකක් නැවත බලන්න recordings.</span>
              </div>
            </div>
          </div>
        </section>

        <!-- Section: How It Works (Dark) -->
        <section class="py-12 sm:py-16">
          <div class="bg-brand-900 text-white p-8 sm:p-12 rounded-[24px] sm:rounded-[32px] shadow-2xl relative overflow-hidden">
            <!-- Decorative circle -->
            <div class="absolute top-0 right-0 w-[400px] h-[400px] bg-white/10 rounded-full blur-[80px] translate-x-1/3 -translate-y-1/3 pointer-events-none"></div>
            
            <div class="relative z-10">
              <h2 class="font-serif text-[28px] sm:text-[36px] text-white tracking-tight mb-2">මේ Mentorship එක වැඩ කරන්නේ මෙහෙමයි</h2>
              <p class="text-white/80 text-[16px] mb-12">අපි guide කරනවා. Business එක build කරන්නේ ඔයා.</p>

              <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6 sm:gap-8">
                <div class="border-t border-brand-800/50 pt-5">
                  <strong class="text-brand-200 tracking-wider text-[13px] block mb-2 uppercase">01 · ඉගෙනගමු</strong>
                  <p class="text-white/70 text-[13px] leading-relaxed">මොනවා කරන්නද, කොහොමද කරන්නෙ කියලා තේරුම් ගමු.</p>
                </div>
                <div class="border-t border-brand-800/50 pt-5">
                  <strong class="text-brand-200 tracking-wider text-[13px] block mb-2 uppercase">02 · Build කරමු</strong>
                  <p class="text-white/70 text-[13px] leading-relaxed">ඒක ඔයාගේ business එකට apply කරමු.</p>
                </div>
                <div class="border-t border-brand-800/50 pt-5">
                  <strong class="text-brand-200 tracking-wider text-[13px] block mb-2 uppercase">03 · Submit කරමු</strong>
                  <p class="text-white/70 text-[13px] leading-relaxed">වැදගත් milestones review එකට submit කරමු.</p>
                </div>
                <div class="border-t border-brand-800/50 pt-5">
                  <strong class="text-brand-200 tracking-wider text-[13px] block mb-2 uppercase">04 · Improve කරමු</strong>
                  <p class="text-white/70 text-[13px] leading-relaxed">ලැබෙන feedback අනුව වැඩේ හදාගමු.</p>
                </div>
                <div class="border-t border-brand-800/50 pt-5">
                  <strong class="text-brand-200 tracking-wider text-[13px] block mb-2 uppercase">05 · Grow කරමු</strong>
                  <p class="text-white/70 text-[13px] leading-relaxed">Test කරලා, numbers බලලා, ඊළඟ move එක plan කරමු.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Section: What Changes -->
        <section class="py-16 sm:py-20 border-t border-brand-100">
          <h2 class="font-serif text-[28px] sm:text-[36px] text-brand-900 tracking-tight mb-4">දින 100 ඉවර වෙද්දී ඔයාට මොන වෙනසක් වෙයිද?</h2>
          <p class="text-brand-900/70 text-[16px] sm:text-[18px] max-w-[720px] mb-12 leading-relaxed">
            Tailoring skill එක ඔයාට දැනටමත් තියෙන්න පුළුවන්. අමාරුම දේ ඒ skill එකෙන් මිනිස්සු ගන්න කැමති දෙයක් හදන එක, ඒ මිනිස්සුන්ට ඔයාව හොයාගන්න සලස්වන එක, ඒ interest එක actual orders වලට හරවන එක. අපි මේ programme එක හදලා තියෙන්නේ ඒ ප්‍රශ්න ටික solve කරන්න.
          </p>

          <div class="max-w-[820px] divide-y divide-brand-200">
            <!-- Accordion 1 -->
            <details class="group py-5" open>
              <summary class="flex justify-between items-center font-bold text-brand-900 cursor-pointer list-none text-[15px] sm:text-[16px]">
                “මට මහන්න පුළුවන්. ඒත් මම ඇත්තටම මොනවාද sell කරන්නේ?”
                <span class="transition group-open:rotate-180">
                  <mat-icon class="text-brand-900/50">expand_more</mat-icon>
                </span>
              </summary>
              <p class="text-brand-900/70 text-[14px] mt-4 leading-relaxed pr-8">
                ඔයාගේ tailoring skill එකට ගැළපෙන practical product/service එකක් තෝරගෙන, ඒක කාටද, ඇයි එයාලා ගන්නේ කියලා clear කරගෙන, business එක පටන් ගන්න direction එක හදගන්න අපි guide කරනවා.
              </p>
            </details>

            <!-- Accordion 2 -->
            <details class="group py-5">
              <summary class="flex justify-between items-center font-bold text-brand-900 cursor-pointer list-none text-[15px] sm:text-[16px]">
                “මම දේවල් හදනවා. ඒත් මේවා මිනිස්සු ගනීද කියලා මට sure නෑ.”
                <span class="transition group-open:rotate-180">
                  <mat-icon class="text-brand-900/50">expand_more</mat-icon>
                </span>
              </summary>
              <p class="text-brand-900/70 text-[14px] mt-4 leading-relaxed pr-8">
                Product/service එක develop කරලා, feedback අරගෙන improve කරලා, costing සහ pricing හදාගෙන, customer කෙනෙක්ට තේරෙන්නත් ගන්න ලේසි වෙන්නත් offer එක shape කරගන්න.
              </p>
            </details>

            <!-- Accordion 3 -->
            <details class="group py-5">
              <summary class="flex justify-between items-center font-bold text-brand-900 cursor-pointer list-none text-[15px] sm:text-[16px]">
                “Facebook/TikTok/WhatsApp තියෙනවා. ඒත් customersලා එන්නේ නෑ.”
                <span class="transition group-open:rotate-180">
                  <mat-icon class="text-brand-900/50">expand_more</mat-icon>
                </span>
              </summary>
              <p class="text-brand-900/70 text-[14px] mt-4 leading-relaxed pr-8">
                Social media එකේ post දාන එක විතරක් කරන්නේ නැතුව, customer journey එකක් හදමු. කෙනෙක් ඔයාව දකිනවා → offer එක තේරුම් ගන්නවා → WhatsApp එකෙන් contact කරනවා → order එකකට යනවා.
              </p>
            </details>

            <!-- Accordion 4 -->
            <details class="group py-5">
              <summary class="flex justify-between items-center font-bold text-brand-900 cursor-pointer list-none text-[15px] sm:text-[16px]">
                “Views එනවා, enquiries එනවා. ඒත් customersලා වෙන්නේ නෑ.”
                <span class="transition group-open:rotate-180">
                  <mat-icon class="text-brand-900/50">expand_more</mat-icon>
                </span>
              </summary>
              <p class="text-brand-900/70 text-[14px] mt-4 leading-relaxed pr-8">
                Enquiry එක ආවම reply කරන්නේ කොහොමද, offer එක present කරන්නේ කොහොමද, common questions/objections handle කරන්නේ කොහොමද, sale එක close කරන්නේ සහ follow-up කරන්නේ කොහොමද කියලා practical system එකක් හදගන්න.
              </p>
            </details>

            <!-- Accordion 5 -->
            <details class="group py-5">
              <summary class="flex justify-between items-center font-bold text-brand-900 cursor-pointer list-none text-[15px] sm:text-[16px]">
                “හැමදාම මොනවා post කරන්නද කියලා මට තේරෙන්නේ නෑ.”
                <span class="transition group-open:rotate-180">
                  <mat-icon class="text-brand-900/50">expand_more</mat-icon>
                </span>
              </summary>
              <p class="text-brand-900/70 text-[14px] mt-4 leading-relaxed pr-8">
                හැමදාම “අද මොනවා දාන්නද?” කියලා blank වෙන්න ඕන නැති වෙන්න, ඔයාගේ products, customers සහ sales goals වලට ගැළපෙන repeatable content system එකක් සහ 30-day content plan එකක් හදගන්න.
              </p>
            </details>

            <!-- Accordion 6 -->
            <details class="group py-5">
              <summary class="flex justify-between items-center font-bold text-brand-900 cursor-pointer list-none text-[15px] sm:text-[16px]">
                “හැම වෙලේම මිනිස්සු පස්සේ ගිහින් customers හොයන්න මට බෑ.”
                <span class="transition group-open:rotate-180">
                  <mat-icon class="text-brand-900/50">expand_more</mat-icon>
                </span>
              </summary>
              <p class="text-brand-900/70 text-[14px] mt-4 leading-relaxed pr-8">
                Facebook සහ TikTok content, clear CTA සහ WhatsApp Business use කරලා, interested customer කෙනෙක්ට ඔයා වෙත එන්න ලේසි organic customer-acquisition flow එකක් හදගන්න.
              </p>
            </details>

            <!-- Accordion 7 -->
            <details class="group py-5">
              <summary class="flex justify-between items-center font-bold text-brand-900 cursor-pointer list-none text-[15px] sm:text-[16px]">
                “මම දන්නේ නැතුව Facebook/TikTok ads වලට සල්ලි දාන්න බයයි.”
                <span class="transition group-open:rotate-180">
                  <mat-icon class="text-brand-900/50">expand_more</mat-icon>
                </span>
              </summary>
              <p class="text-brand-900/70 text-[14px] mt-4 leading-relaxed pr-8">
                Ads වලට budget දාන්න කලින් campaign එක structure කරන්නේ කොහොමද, audience එක තෝරන්නේ කොහොමද, creative එක හදන්නේ කොහොමද, ad එක sales process එකට connect කරන්නේ කොහොමද කියලා ඉගෙනගන්නවා. Results වල numbers කියන්නේ මොනවාද කියලත් බලමු.
              </p>
            </details>

            <!-- Accordion 8 -->
            <details class="group py-5 border-b border-brand-200">
              <summary class="flex justify-between items-center font-bold text-brand-900 cursor-pointer list-none text-[15px] sm:text-[16px]">
                “දැන් business එක grow කරන්න ඊළඟට මොනවා කරන්නද කියලා මට තේරෙන්නේ නෑ.”
                <span class="transition group-open:rotate-180">
                  <mat-icon class="text-brand-900/50">expand_more</mat-icon>
                </span>
              </summary>
              <p class="text-brand-900/70 text-[14px] mt-4 leading-relaxed pr-8">
                Programme එක ඉවර වෙද්දී මොන දේවල් work වෙනවද, මොනවා improve කරන්න ඕනද, ඊළඟට focus කරන්න ඕන මොනවද කියලා clear picture එකක් තියෙයි. ඉන් පස්සේ යන්න 90-day growth plan එකකුත් තියෙයි.
              </p>
            </details>
          </div>
        </section>

        <!-- Section: Four Business Milestones -->
        <section class="py-16 sm:py-20 border-t border-brand-100">
          <h2 class="font-serif text-[28px] sm:text-[36px] text-brand-900 tracking-tight mb-8">Business එකේ ප්‍රධාන Milestones 4ක්</h2>
          
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div class="border border-brand-200 p-6 sm:p-8 rounded-2xl bg-white shadow-sm hover:shadow-md transition-shadow">
              <div class="text-[11px] text-brand-700 font-extrabold tracking-widest mb-4 uppercase">01 · Product</div>
              <h3 class="text-[18px] font-bold text-brand-900 mb-3 leading-snug">Product & Offer Evaluation</h3>
              <p class="text-[14px] text-brand-900/70 leading-relaxed">Product එක, customer, costing, pricing සහ offer එක review කරමු.</p>
            </div>
            <div class="border border-brand-200 p-6 sm:p-8 rounded-2xl bg-white shadow-sm hover:shadow-md transition-shadow">
              <div class="text-[11px] text-brand-700 font-extrabold tracking-widest mb-4 uppercase">02 · Digital</div>
              <h3 class="text-[18px] font-bold text-brand-900 mb-3 leading-snug">Digital Business Review</h3>
              <p class="text-[14px] text-brand-900/70 leading-relaxed">Facebook, TikTok සහ WhatsApp Business setup එක review කරමු.</p>
            </div>
            <div class="border border-brand-200 p-6 sm:p-8 rounded-2xl bg-white shadow-sm hover:shadow-md transition-shadow">
              <div class="text-[11px] text-brand-700 font-extrabold tracking-widest mb-4 uppercase">03 · Sales</div>
              <h3 class="text-[18px] font-bold text-brand-900 mb-3 leading-snug">Organic Sales Review</h3>
              <p class="text-[14px] text-brand-900/70 leading-relaxed">Content, enquiry flow, WhatsApp sales process සහ follow-up review කරමු.</p>
            </div>
          </div>
          
          <div class="max-w-md">
            <div class="border border-brand-200 p-6 sm:p-8 rounded-2xl bg-white shadow-sm hover:shadow-md transition-shadow bg-gradient-to-br from-white to-brand-50">
              <div class="text-[11px] text-brand-700 font-extrabold tracking-widest mb-4 uppercase">04 · Growth</div>
              <h3 class="text-[18px] font-bold text-brand-900 mb-3 leading-snug">Final Growth Plan Review</h3>
              <p class="text-[14px] text-brand-900/70 leading-relaxed">ඔයාගේ progress එක සහ ඊළඟ දින 90ට business plan එක review කරමු.</p>
            </div>
          </div>
        </section>

        <!-- Section: What You Have Built -->
        <section class="py-16 sm:py-20 border-t border-brand-100">
          <h2 class="font-serif text-[28px] sm:text-[36px] text-brand-900 tracking-tight mb-8">දින 100 ඉවර වෙද්දී ඔයා හදගෙන තියෙන්න ඕන දේවල්</h2>
          
          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            <div class="border border-brand-200 p-6 rounded-xl bg-white shadow-sm">
              <h3 class="text-[16px] font-bold text-brand-900 mb-2 leading-snug">A Product or Service</h3>
              <p class="text-[13px] text-brand-900/70">ඔයා develop කරලා, test කරලා, වැඩ කරගෙන ආපු clear starting offer එකක්.</p>
            </div>
            <div class="border border-brand-200 p-6 rounded-xl bg-white shadow-sm">
              <h3 class="text-[16px] font-bold text-brand-900 mb-2 leading-snug">An Online Presence</h3>
              <p class="text-[13px] text-brand-900/70">Facebook, TikTok සහ WhatsApp Business customer journey එකට connect කරපු setup එකක්.</p>
            </div>
            <div class="border border-brand-200 p-6 rounded-xl bg-white shadow-sm">
              <h3 class="text-[16px] font-bold text-brand-900 mb-2 leading-snug">A Sales System</h3>
              <p class="text-[13px] text-brand-900/70">Content/enquiry ඉඳන් customer conversation සහ sale එක දක්වා යන practical flow එකක්.</p>
            </div>
            <div class="border border-brand-200 p-6 rounded-xl bg-white shadow-sm">
              <h3 class="text-[16px] font-bold text-brand-900 mb-2 leading-snug">An Advertising Foundation</h3>
              <p class="text-[13px] text-brand-900/70">Paid campaigns plan, test සහ measure කරන්න ඕන basic knowledge එක.</p>
            </div>
            <div class="border border-brand-200 p-6 rounded-xl bg-white shadow-sm">
              <h3 class="text-[16px] font-bold text-brand-900 mb-2 leading-snug">A 90-Day Growth Plan</h3>
              <p class="text-[13px] text-brand-900/70">Programme එකෙන් පස්සේ business එක continue කරන්න practical roadmap එකක්.</p>
            </div>
          </div>
        </section>

        <!-- Section: Price & Value -->
        <section class="py-16 sm:py-20 border-t border-brand-100">
          <h2 class="font-serif text-[28px] sm:text-[36px] text-brand-900 tracking-tight mb-8">මේකට මේ වගේ Price එකක් තියෙන්නේ ඇයි?</h2>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch mb-10">
            <div class="border border-brand-200 p-8 sm:p-10 rounded-[24px] bg-white shadow-sm">
              <div class="text-[11px] text-brand-700 font-extrabold tracking-widest mb-4 uppercase">Value එක</div>
              <h3 class="text-[20px] font-bold text-brand-900 mb-4 leading-snug">මේක lessons ටිකක් එකතු කරපු course එකක් නෙවෙයි.</h3>
              <p class="text-[15px] text-brand-900/70 leading-relaxed mb-4">
                You are getting 100 days of structured guidance across product development, business building, digital sales, organic customer acquisition and paid growth — supported by practical tools, live sessions and milestone evaluations.
              </p>
              <p class="text-[15px] text-brand-900/70 leading-relaxed">
                We believe the complete programme represents <strong class="text-brand-900">more than LKR 200,000 in value</strong> when considered against the depth of guidance and the different areas covered.
              </p>
            </div>
            
            <div class="border border-brand-900 bg-brand-50 p-8 sm:p-10 rounded-[24px] shadow-sm relative overflow-hidden">
              <div class="absolute top-0 right-0 w-32 h-32 bg-brand-100 rounded-full blur-[40px] translate-x-1/2 -translate-y-1/2"></div>
              <div class="relative z-10">
                <div class="text-[11px] text-brand-700 font-extrabold tracking-widest mb-4 uppercase">Launch Price එක අඩු ඇයි?</div>
                <h3 class="text-[20px] font-bold text-brand-900 mb-4 leading-snug">Sri Lanka sewing community එකට මේකට ඇතුල් වෙන්න අවස්ථාවක් දෙන්න ඕන නිසා.</h3>
                <p class="text-[15px] text-brand-900/70 leading-relaxed mb-4">
                  We know there are people with real skill, real ambition and a dream of building something of their own who would never be able to justify a conventional business mentorship at that level.
                </p>
                <p class="text-[15px] text-brand-900/70 leading-relaxed">
                  So we are offering this programme at a fraction of that value — not because the work is worth less, but because we want more people with genuine potential to have a starting point.
                </p>
              </div>
            </div>
          </div>

          <div class="bg-brand-900 text-white p-8 sm:p-10 rounded-[24px] sm:rounded-[32px] shadow-xl">
            <h3 class="text-[22px] sm:text-[26px] font-bold mb-4 font-serif">මේ Price එක Commitment එකකුත්.</h3>
            <p class="text-white/80 text-[15px] sm:text-[16px] mb-4 leading-relaxed">
              We could make this cheaper. But when someone puts nothing at stake, it becomes very easy to postpone the work, miss the sessions and let a good opportunity disappear.
            </p>
            <p class="text-brand-200 text-[15px] sm:text-[16px] font-bold mb-4 leading-relaxed">
              ඔයා ගෙවන මුදල success එකේ guarantee එකක් නෙවෙයි. ඒක ඔයාටම දෙන commitment එකක් — show up වෙලා වැඩේ කරන්න.
            </p>
            <p class="text-white/80 text-[15px] sm:text-[16px] leading-relaxed">
              ඔයා tailoring skill එකෙන් ඇත්තටම දෙයක් build කරන්න serious නම්, මුල ඉඳන් ඒ journey එකේ guide කරන්න අපි කැමතියි.
            </p>
          </div>
        </section>

        <!-- Section: One Important Thing -->
        <section class="py-12 border-t border-brand-100 text-center max-w-3xl mx-auto">
          <h2 class="font-serif text-[28px] text-brand-900 tracking-tight mb-4">එක දෙයක් මතක තියාගන්න.</h2>
          <p class="text-[18px] text-brand-900 font-bold mb-4">Knowledge, frameworks, tools, guidance සහ feedback අපි දෙනවා. Build කරන්නේ ඔයා.</p>
          <p class="text-[14px] text-brand-900/60 leading-relaxed">
            මේ programme එකට done-for-you website development, social media management, content production, individual ad management, unlimited private consultations හෝ guaranteed sales/income ඇතුළත් නෑ.
          </p>
        </section>

        <!-- Final CTA -->
        <div id="order" class="bg-brand-50 border border-brand-100 rounded-[32px] p-10 sm:p-16 text-center mt-12 shadow-sm">
          <h2 class="font-serif text-[32px] sm:text-[40px] text-brand-900 tracking-tight mb-4">ඇත්තටම Build කරන්න ලෑස්තිද?</h2>
          <p class="text-[16px] sm:text-[18px] text-brand-900/70 max-w-2xl mx-auto mb-10 leading-relaxed">
            If you are prepared to put in the work for the next 100 days, we will give you the roadmap, the guidance and the support to build from where you are now.
          </p>
          
          @if (proceeding()) {
            <button disabled class="inline-flex items-center justify-center gap-2 bg-brand-800 text-white px-8 sm:px-12 py-4 sm:py-5 rounded-xl font-bold text-[16px] sm:text-[18px] shadow-lg shadow-brand-900/20 mb-6 opacity-80 cursor-wait">
              <mat-icon class="animate-spin">sync</mat-icon> Proceeding...
            </button>
          } @else if (cartService.hasItem('course-' + courseId)) {
            <a routerLink="/checkout" class="inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-8 sm:px-12 py-4 sm:py-5 rounded-xl font-bold text-[16px] sm:text-[18px] transition-colors shadow-lg shadow-emerald-900/20 mb-6">
              <mat-icon>check_circle</mat-icon> Proceed to Checkout
            </a>
          } @else {
            <button (click)="enroll()" class="inline-block bg-brand-900 hover:bg-brand-800 text-white px-8 sm:px-12 py-4 sm:py-5 rounded-xl font-bold text-[16px] sm:text-[18px] transition-colors shadow-lg shadow-brand-900/20 mb-6">
              මම ලෑස්තියි — LKR 5,000කින් Place එක Reserve කරන්න
            </button>
          }
          
          <p class="text-[13px] text-brand-900/60 font-medium mb-8">Total launch programme fee: LKR 55,000 · Full payment: LKR 50,000</p>
          
          <p class="text-[12px] text-brand-900/50 max-w-xl mx-auto leading-relaxed border-t border-brand-200/60 pt-6">
            මේ programme එකට ඔයාගේ active participation එක අත්‍යවශ්‍යයි. අපි guide කරනවා. Build කරන්නේ ඔයා. Results ඔයාගේ effort, implementation, market එක සහ business decisions මත වෙනස් වෙනවා.
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

  async enroll() {
    this.proceeding.set(true);
    
    let courseName = 'Tailoring Business Growth Mentorship';
    let coursePrice = 45000;
    
    try {
      const docRef = doc(db, 'courses', this.courseId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        courseName = data['title'] || courseName;
        if (data['price']) {
          const numericPrice = typeof data['price'] === 'number'
            ? data['price']
            : parseInt(String(data['price']).replace(/\D/g, ''), 10) || coursePrice;
          coursePrice = numericPrice;
        }
      }
    } catch (e) {
      console.error('Failed to fetch course data for cart', e);
    }

    this.cartService.addItem({
      id: 'course-' + this.courseId,
      name: courseName,
      price: coursePrice,
      image: 'https://images.unsplash.com/photo-1551893665-f843f600794e?q=80&w=800&auto=format&fit=crop',
      quantity: 1
    });
    
    this.router.navigate(['/checkout']);
  }

  ngOnInit() {
    this.title.setTitle('Tailoring Business Growth Mentorship | Su Collection');
    this.meta.updateTag({ name: 'description', content: 'A 100-day guided business-building programme for people who are ready to build a future from their sewing skills.' });
    if (typeof window !== 'undefined') {
      window.scrollTo(0, 0);
    }
  }
}
