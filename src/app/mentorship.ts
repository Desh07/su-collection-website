import {ChangeDetectionStrategy, Component, inject, OnInit, OnDestroy, signal, computed, PLATFORM_ID} from '@angular/core';
import {isPlatformBrowser} from '@angular/common';
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
    <div class="bg-white min-h-screen pb-20 pt-8 lg:pt-12">
      <!-- Top Banner -->
      <div class="bg-brand-900 text-white text-center py-2.5 text-[12px] sm:text-[13px] font-bold tracking-widest uppercase">
        දින 100ක Guided Business Building Programme
      </div>

      <main class="max-w-[1120px] mx-auto px-5 sm:px-8 mt-12 sm:mt-16">
        
        <!-- Hero Section -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center py-8 lg:py-14">
          
          <!-- Left Column (Image & Price) -->
          <div class="flex flex-col gap-8 lg:gap-10">
            <!-- Image Placeholder -->
            <div class="min-h-[350px] lg:min-h-[440px] bg-brand-50 rounded-[24px] sm:rounded-[32px] flex items-center justify-center text-brand-900/40 text-center border border-brand-100 shadow-sm relative overflow-hidden">
              <div class="border border-dashed border-brand-200 p-8 rounded-2xl relative z-10 bg-white/50 backdrop-blur-sm">
                <mat-icon class="text-[48px] mb-4 text-brand-300">image</mat-icon>
                <div class="font-medium text-brand-900">PROGRAMME HERO IMAGE</div>
                <small class="text-brand-900/60 mt-2 block">Replace with a strong tailoring/business image</small>
              </div>
            </div>

            <!-- Price and Buttons -->
            <div>
              @if (isOfferValid()) {
                <div class="flex flex-col">
                  <div class="flex items-baseline gap-3 mb-6 border-b border-brand-200 pb-4">
                    <span class="line-through text-brand-900/50 text-[18px] font-medium">LKR 65,000</span>
                    <span class="text-[26px] sm:text-[32px] font-extrabold text-brand-900">LKR 50,000</span>
                  </div>
                  
                  @if (proceeding()) {
                    <button disabled class="block w-full text-center bg-brand-800 text-white py-4 rounded-xl font-bold text-[15px] shadow-md opacity-80 cursor-wait flex items-center justify-center gap-2 mb-3">
                      <mat-icon class="animate-spin">sync</mat-icon> Proceeding...
                    </button>
                  } @else if (cartService.hasItem('course-' + courseId) || cartService.hasItem('course-' + courseId + '-reserve')) {
                    <a routerLink="/checkout" class="block w-full text-center bg-emerald-600 hover:bg-emerald-700 text-white py-4 rounded-xl font-bold text-[15px] transition-colors shadow-md flex items-center justify-center gap-2 mb-3">
                      <mat-icon>check_circle</mat-icon> Proceed to Checkout
                    </a>
                  } @else {
                    <div class="flex flex-col gap-3.5">
                      <button (click)="enroll(true)" class="block w-full text-center bg-brand-900 hover:bg-brand-800 text-white py-4 rounded-xl font-bold text-[15px] sm:text-[16px] transition-colors shadow-md">
                        Reserve Place (LKR 5,000)
                      </button>
                      <button (click)="enroll(false)" class="block w-full text-center bg-white border-2 border-brand-900 text-brand-900 hover:bg-brand-50 py-3.5 rounded-xl font-bold text-[15px] sm:text-[16px] transition-colors shadow-sm">
                        Pay in Full (LKR 50,000)
                      </button>
                    </div>
                  }
                  <p class="text-brand-900/60 text-[12px] text-center mt-5 font-medium">Total reservation fee: LKR 55,000</p>
                </div>
              } @else {
                <div class="border-b border-brand-200 pb-4 mb-6 flex items-baseline gap-3">
                  <span class="text-[28px] sm:text-[32px] font-extrabold text-brand-900">LKR 65,000</span>
                </div>
                
                @if (proceeding()) {
                  <button disabled class="block w-full text-center bg-brand-800 text-white py-4 rounded-xl font-bold text-[15px] sm:text-[16px] shadow-md opacity-80 cursor-wait flex items-center justify-center gap-2 mb-3">
                    <mat-icon class="animate-spin">sync</mat-icon> Proceeding...
                  </button>
                } @else if (cartService.hasItem('course-' + courseId)) {
                  <a routerLink="/checkout" class="block w-full text-center bg-emerald-600 hover:bg-emerald-700 text-white py-4 rounded-xl font-bold text-[15px] sm:text-[16px] transition-colors shadow-md flex items-center justify-center gap-2 mb-3">
                    <mat-icon>check_circle</mat-icon> Proceed to Checkout
                  </a>
                } @else {
                  <button (click)="enroll(false)" class="block w-full text-center bg-brand-900 hover:bg-brand-800 text-white py-4 rounded-xl font-bold text-[15px] sm:text-[16px] transition-colors shadow-md mb-3">
                    Pay in Full (LKR 65,000)
                  </button>
                }
              }
            </div>
          </div>

          <!-- Right Column (Text & Countdown) -->
          <div class="flex flex-col h-full lg:pl-4">
            <span class="inline-block bg-brand-100 text-brand-900 rounded-full px-4 py-1.5 text-[11px] font-bold uppercase tracking-widest mb-6 self-start">100-Day Mentorship</span>
            <h1 class="font-serif text-[36px] sm:text-[44px] lg:text-[48px] leading-[1.1] tracking-tight text-brand-900 mb-5">Tailoring Business Growth Mentorship</h1>
            <p class="text-[18px] sm:text-[20px] text-brand-900/90 font-medium mb-6 leading-snug">You already have a skill. Now build something real with it.</p>
            <p class="text-[15px] sm:text-[16px] text-brand-900/70 mb-8 leading-relaxed">
              මැහුම් වැඩ කරන්න පුළුවන් වුණාට, ඒකෙන් හොඳ ආදායමක් හදාගන්නේ කොහොමද? තමන්ගේම මැහුම් ව්යාපාරයක් පටන්ගන්නේ කොහෙන්ද? කියලා තාම හිත හිත ඉන්නවා නම්, දැන් ඒ ගැන හිතන එක විතරක් නෙවෙයි — වැඩේ පටන්ගන්න කාලේ හරි. දින 100ක් පුරා Step-By-Step මඟපෙන්වීමක් එක්ක, ඔයාගේ මැහුම් හැකියාව ව්යාපාරයක් බවට පත්කරගන්න අවශ්ය දේ එකින් එක ඉගෙනගෙන ක්රියාවට නංවන්න ඔයාට මේ Business-Building Programme එකෙන් පුලුවන්. 
            </p>
            
            @if (isOfferValid()) {
              <!-- Countdown & Info -->
              <div class="bg-brand-50 border border-brand-200 rounded-2xl p-6 sm:p-8 flex flex-col shadow-sm mt-auto">
                <div class="text-[12px] font-bold uppercase tracking-wider text-brand-900/80 mb-5">Launch offer ends in</div>
                <div class="flex items-center gap-2 sm:gap-3 mb-6">
                  <div class="flex flex-col items-center bg-white border border-brand-200 px-3 sm:px-4 py-2 sm:py-3 rounded-lg min-w-[50px] sm:min-w-[60px] shadow-sm"><span class="text-[20px] sm:text-[24px] font-extrabold text-brand-900">{{ timeRemaining().days }}</span><span class="text-[10px] uppercase font-bold text-brand-900/60">Days</span></div>
                  <div class="flex flex-col items-center bg-white border border-brand-200 px-3 sm:px-4 py-2 sm:py-3 rounded-lg min-w-[50px] sm:min-w-[60px] shadow-sm"><span class="text-[20px] sm:text-[24px] font-extrabold text-brand-900">{{ timeRemaining().hours }}</span><span class="text-[10px] uppercase font-bold text-brand-900/60">Hrs</span></div>
                  <div class="flex flex-col items-center bg-white border border-brand-200 px-3 sm:px-4 py-2 sm:py-3 rounded-lg min-w-[50px] sm:min-w-[60px] shadow-sm"><span class="text-[20px] sm:text-[24px] font-extrabold text-brand-900">{{ timeRemaining().minutes }}</span><span class="text-[10px] uppercase font-bold text-brand-900/60">Mins</span></div>
                  <div class="flex flex-col items-center bg-white border border-brand-200 px-3 sm:px-4 py-2 sm:py-3 rounded-lg min-w-[50px] sm:min-w-[60px] shadow-sm"><span class="text-[20px] sm:text-[24px] font-extrabold text-brand-900">{{ timeRemaining().seconds }}</span><span class="text-[10px] uppercase font-bold text-brand-900/60">Secs</span></div>
                </div>
                <p class="text-[14px] sm:text-[15px] text-brand-900/80 leading-relaxed">
                  දැන්ම <strong>LKR 5,000</strong>ක් ගෙවලා ඔයාගේ place එක වෙන්කරගන්න. ඉතිරි <strong>LKR 50,000</strong> පසුව ගෙවන්න.
                </p>
              </div>
            }
          </div>
        </div>

        <!-- Section: You Don't Need More Information -->
        <section class="py-16 sm:py-20 border-t border-brand-100 mt-8">
          <h2 class="font-serif text-[28px] sm:text-[36px] text-brand-900 tracking-tight mb-4">You Don't Need More Information. You Need a Way Forward.</h2>
          <p class="text-brand-900/70 text-[16px] sm:text-[18px] max-w-[720px] mb-12 leading-relaxed">
            සමහරවිට ඔයා අවුරුදු ගාණක් තිස්සේ මැහුම් කරන කෙනෙක් වෙන්න පුළුවන්. එහෙම නැත්නම් මේ වැඩේ ඉගෙනගෙන තාම වැඩි කාලයක් නැතුව ඇති. ගෙදර අයට, යාළුවන්ට ඇඳුම් මහලා දීලා, <strong>“මට මේකෙන් ඇත්තටම Business එකක් පටන්ගන්න පුළුවන්ද?”</strong> කියලා ඔයාත් හිතලා ඇති.<br><br>
            හැබැයි හීනයක් තියෙන එක විතරක් මදි. <strong>ඊළඟට කරන්න ඕනේ මොකක්ද කියලා දැනගන්න ඕනේ.</strong> ඒ වගේම, ඒ ගමන දැනටමත් ගිය කෙනෙක්ගෙන් හරි මඟපෙන්වීමක් ලැබෙන එකත් ගොඩක් වටිනවා.<br><br>
            ඒකයි <strong>The UVA VEC</strong> එක්ක එකතු වෙලා මේ දින 100ක Programme එක අපි හදලා තියෙන්නේ.<br>
            මේ දින 100 ඇතුළත ඔයාගේ මැහුම් Skill එක නිකන් Skill එකක් විදිහට තියෙන්නෙ නැතුව, <strong>ආදායමක් හදාගන්න පුළුවන් Business එකක්</strong> බවට ගොඩනගන්න අපි ඔයා එක්ක වැඩ කරනවා.
          </p>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div class="border border-brand-200 p-6 sm:p-8 rounded-2xl bg-white shadow-sm hover:shadow-md transition-shadow">
              <div class="text-[11px] text-brand-700 font-extrabold tracking-widest mb-4 uppercase">SKILL එකෙන් → විකුණන්න පුළුවන් දෙයක් දක්වා</div>
              <h3 class="text-[18px] font-bold text-brand-900 mb-3 leading-snug">“I know how to sew. But what can I actually sell?”</h3>
              <p class="text-[14px] text-brand-900/70 leading-relaxed">මැහුම් කරන්න පුළුවන් කියන එකෙන් එහාට ගිහින්, කාටද විකුණන්නේ, මොනවද විකුණන්නේ, කීයටද විකුණන්නේ කියන දේවල් පැහැදිලි කරගන්න. ඔයාට ගැළපෙන Product එකක් හෝ Service එකක් හදාගන්න.</p>
            </div>
            <div class="border border-brand-200 p-6 sm:p-8 rounded-2xl bg-white shadow-sm hover:shadow-md transition-shadow">
              <div class="text-[11px] text-brand-700 font-extrabold tracking-widest mb-4 uppercase">කවුරුත් නොදන්න තැනින් → ඔයාව හොයාගෙන එන තැනට</div>
              <h3 class="text-[18px] font-bold text-brand-900 mb-3 leading-snug">“I make good things, but nobody knows I'm here.”</h3>
              <p class="text-[14px] text-brand-900/70 leading-relaxed">ඔයා කරන වැඩ ටික Online (Facebook / Instagram / TikTok) වලින් නිවැරදි අයට පේන්න පටන්ගන්න Simple Online Presence එකක් හදාගන්න. Interested වෙන කෙනෙක්ට WhatsApp හරහා ඔයාත් එක්ක පහසුවෙන් Connect වෙන්න පුළුවන් විදිහට Business එක Set කරගන්න.</p>
            </div>
            <div class="border border-brand-200 p-6 sm:p-8 rounded-2xl bg-white shadow-sm hover:shadow-md transition-shadow">
              <div class="text-[11px] text-brand-700 font-extrabold tracking-widest mb-4 uppercase">බලාගෙන ඉන්න තැනින් → Orders ගන්න තැනට</div>
              <h3 class="text-[18px] font-bold text-brand-900 mb-3 leading-snug">“People ask. They look. But they don't buy.”</h3>
              <p class="text-[14px] text-brand-900/70 leading-relaxed">ඔයාගේ වැඩ දැක්ක තැන ඉඳන් Enquiry → Conversation → Order → Follow-Up දක්වා ගෙනියන්න පුළුවන් Simple System එකක් හදාගන්න.</p>
            </div>
          </div>

          <div class="bg-brand-900 text-white p-8 sm:p-10 rounded-2xl sm:rounded-[32px] mt-12 shadow-xl">
            <h3 class="text-[22px] sm:text-[26px] font-bold mb-4 font-serif">This Programme Is Not for Everyone.</h3>
            <p class="text-white/80 text-[15px] sm:text-[16px] mb-6 leading-relaxed">
              මේ Programme එක තවත් Course එකක් බලලා Certificate එකක් අරගෙන නවතින්න හදපු එකක් නෙවෙයි. <strong>ඇත්තටම තමන්ගේ Skill එකෙන් දෙයක් ගොඩනගන්න ලෑස්ති අය වෙනුවෙන් හදපු දින 100ක වැඩපිළිවෙළක්.</strong> 
            </p>
            <ul class="space-y-3 text-white/90 text-[14px] sm:text-[15px] list-disc list-inside marker:text-brand-400 mb-8 font-bold">
              <li>මහන්සි වෙලා වැඩ කරන්න වෙනවා.</li>
              <li>තීරණ ගන්න වෙනවා.</li>
              <li>ඔයාගේ Products සහ Content හදාගන්න වෙනවා.</li>
              <li>Customers ල එක්ක කතා කරන්න වෙනවා.</li>
              <li>තමන්ගෙ උපරිමයෙන් Try කරන්න, වැරදි වෙන්න පුලුවන්, ඒවායෙන් ඉගෙනගෙන ආයෙත් Improve වෙන්න.</li>
              <li>දින 100 පුරාම මේකට Commit වෙලා ඉන්න වෙනවා.</li>
            </ul>
            <p class="text-brand-200 text-[15px] sm:text-[16px]">Business එක ඔයා වෙනුවෙන් අපි හදලා දෙන්නෙ නැහැ. අපි ඔයාට මඟ පෙන්වනවා, දැනුම දෙනවා, Support කරනවා — <strong>හැබැයි ඒ හීනය Business එකක් බවට පත්කරන්නේ ඔයාමයි.</strong></p>
          </div>
        </section>

        <!-- Section: 100 Days Roadmap -->
        <section class="py-16 sm:py-20 border-t border-brand-100">
          <h2 class="font-serif text-[28px] sm:text-[36px] text-brand-900 tracking-tight mb-4">100 Days to Build the Foundations You Keep Putting Off</h2>
          <p class="text-brand-900/70 text-[16px] sm:text-[18px] max-w-[720px] mb-12 leading-relaxed">
            Business එක පටන්ගන්න කලින් හැමදේම දැනගෙන ඉන්න ඕනේ නැහැ. අපි මුල ඉඳන්ම ඔයා එක්ක යනවා. ඔක්කොම දේවල් එකවර කරන්නෙ නැතුව, එක Business Problem එකක් ගානේ විසඳගෙන ඉස්සරහට යමු.
          </p>

          <div class="grid grid-cols-1 md:grid-cols-5 border border-brand-200 rounded-2xl overflow-hidden bg-white shadow-sm">
            <!-- Phase 1 -->
            <div class="p-6 border-b md:border-b-0 md:border-r border-brand-200 bg-brand-50/50 hover:bg-brand-50 transition-colors">
              <div class="text-[11px] text-brand-700 font-extrabold tracking-widest mb-3 uppercase">Days 1–15</div>
              <h3 class="text-[16px] font-bold text-brand-900 mb-2 leading-snug">Stop Guessing What to Sell</h3>
              <p class="text-[13px] text-brand-900/70">ඔයාට කරන්න පුළුවන් Skill එකෙන්, විකුණන්න පුළුවන් Practical Offer එකක් හදාගන්න. ඒක කාටද කියලාත් පැහැදිලි කරගන්න.</p>
            </div>
            <!-- Phase 2 -->
            <div class="p-6 border-b md:border-b-0 md:border-r border-brand-200 hover:bg-brand-50 transition-colors">
              <div class="text-[11px] text-brand-700 font-extrabold tracking-widest mb-3 uppercase">Days 16–35</div>
              <h3 class="text-[16px] font-bold text-brand-900 mb-2 leading-snug">Build Something People Can Buy</h3>
              <p class="text-[13px] text-brand-900/70">ඔයාගේ Product / Service එක හරියට Develop කරලා, Price එක තීරණය කරලා, Customer කෙනෙක්ට තේරෙන විදිහට Offer එක සකස් කරගන්න.</p>
            </div>
            <!-- Phase 3 -->
            <div class="p-6 border-b md:border-b-0 md:border-r border-brand-200 bg-brand-50/50 hover:bg-brand-50 transition-colors">
              <div class="text-[11px] text-brand-700 font-extrabold tracking-widest mb-3 uppercase">Days 36–55</div>
              <h3 class="text-[16px] font-bold text-brand-900 mb-2 leading-snug">Give Customers a Way to Find You</h3>
              <p class="text-[13px] text-brand-900/70">Facebook, TikTok සහ WhatsApp Business එක Connect කරලා, ඔයාගේ Business එක Online වලින් පේන්න පටන්ගන්න විදිහට Online Presence එක හදාගන්න.</p>
            </div>
            <!-- Phase 4 -->
            <div class="p-6 border-b md:border-b-0 md:border-r border-brand-200 hover:bg-brand-50 transition-colors">
              <div class="text-[11px] text-brand-700 font-extrabold tracking-widest mb-3 uppercase">Days 56–80</div>
              <h3 class="text-[16px] font-bold text-brand-900 mb-2 leading-snug">Turn Attention Into Enquiries</h3>
              <p class="text-[13px] text-brand-900/70">Content සහ WhatsApp Use කරලා, කෙනෙක් ඔයාගේ වැඩක් දැක්ක තැන ඉඳන් Enquiry එකක් දාන තැනට, එතනින් Order එකක් ගන්න තැනට යන Simple Sales Path එකක් හදාගන්න.</p>
            </div>
            <!-- Phase 5 -->
            <div class="p-6 hover:bg-brand-50 transition-colors bg-brand-50/50">
              <div class="text-[11px] text-brand-700 font-extrabold tracking-widest mb-3 uppercase">Days 81–100</div>
              <h3 class="text-[16px] font-bold text-brand-900 mb-2 leading-snug">Know What to Scale</h3>
              <p class="text-[13px] text-brand-900/70">Paid Ads වගේ Methods Test කරලා, මොන දේ වැඩ කරනවද කියලා බලන්න. ඊළඟ දින 90 තුළ Business එක තවත් Grow කරගන්න ඔයාගේ Next Plan එක හදාගන්න.</p>
            </div>
          </div>
        </section>

        <!-- Section: What You Get -->
        <section class="py-16 sm:py-20 border-t border-brand-100">
          <h2 class="font-serif text-[28px] sm:text-[36px] text-brand-900 tracking-tight mb-4">What You Get for the Next 100 Days</h2>
          <p class="text-brand-900/70 text-[16px] sm:text-[18px] max-w-[720px] mb-12 leading-relaxed">
            මේක නිකන් Lessons ටිකක් බලලා ඉවර වෙන Program එකක් නෙවෙයි. <strong>ඔයාට කරන්න ඕනේ දේ, භාවිතා කරන්න ඕනේ Tools, අපෙන් ලැබෙන Guidance සහ අතරමඟ Checkpoints</strong> එක්ක, Business එක එකින් එක ගොඩනගාගෙන යන්න පුළුවන් විදිහට මේ දින 100 අපි හදලා තියෙනවා.
          </p>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-0">
            <!-- Left Column -->
            <div class="flex flex-col">
              <div class="py-4 border-b border-brand-200 flex flex-col gap-1">
                <strong class="text-brand-900 text-[15px]">100 Days of Guided Mentorship</strong>
                <span class="text-brand-900/60 text-[13px]">Product එකක් හදාගන්න තැන ඉඳන් Business එක Grow කරන තැන දක්වා, <strong>Step-By-Step</strong> අපි එක්ක යන ගමනක්.</span>
              </div>
              <div class="py-4 border-b border-brand-200 flex flex-col gap-1">
                <strong class="text-brand-900 text-[15px]">20 Live Sessions</strong>
                <span class="text-brand-900/60 text-[13px]">Training, Live Demonstrations, ඔයා කරන වැඩ Check කරගන්න <strong>Implementation Clinics සහ Reviews</strong>.</span>
              </div>
              <div class="py-4 border-b border-brand-200 flex flex-col gap-1">
                <strong class="text-brand-900 text-[15px]">4 Business Evaluations</strong>
                <span class="text-brand-900/60 text-[13px]"><strong>Product & Offer → Digital Business → Organic Sales → Growth Plan</strong> කියන ප්රධාන අදියර 4කදී ඔයාගේ Business එක බලලා, ඊළඟට කරන්න ඕනේ දේ පැහැදිලි කරගන්න පුලුවන්.</span>
              </div>
              <div class="py-4 border-b border-brand-200 flex flex-col gap-1">
                <strong class="text-brand-900 text-[15px]">Technical Tailoring Guidance</strong>
                <span class="text-brand-900/60 text-[13px]"><strong>Su Collection වෙතින් Product Development සහ මැහුම් කටයුතු සම්බන්ධ Technical Guidance</strong> ඔයාට ලබා දෙනවා.</span>
              </div>
              <div class="py-4 border-b border-brand-200 flex flex-col gap-1">
                <strong class="text-brand-900 text-[15px]">Business Mentorship</strong>
                <span class="text-brand-900/60 text-[13px]">Customers, Offers, Pricing, Positioning සහ Business එක ගොඩනගන විදිහ ගැන <strong>ප්රායෝගික Guidance</strong> එකක් ජාත්යන්තරව පිළිගත් ආයතනයක් වන <strong>THE UVA VEC</strong> හරහා ඔයාට ලබා දෙනවා.</span>
              </div>
              <div class="py-4 border-b border-brand-200 flex flex-col gap-1">
                <strong class="text-brand-900 text-[15px]">WhatsApp Business Training</strong>
                <span class="text-brand-900/60 text-[13px]">Customer කෙනෙක් Enquiry කරන තැන ඉඳන් Sales එකක් දක්වා ගෙනියන්න පුළුවන් <strong>Practical WhatsApp Business Flow</strong> එකක් හදාගන්න ඔයාට මේ හරහා අවස්ථාව උදා වෙනවා.</span>
              </div>
              <div class="py-4 border-b border-brand-200 flex flex-col gap-1">
                <strong class="text-brand-900 text-[15px]">Facebook & TikTok Training</strong>
                <span class="text-brand-900/60 text-[13px]">ඔයාගේ Online Presence එක හදාගෙන, <strong>Content හරහා නිවැරදි Customers ලා ඔයා ළඟට ගෙන්නගන්න</strong> ඉගෙනගන්න පුලුවන්.</span>
              </div>
            </div>

            <!-- Right Column -->
            <div class="flex flex-col">
              <div class="py-4 border-b border-brand-200 flex flex-col gap-1">
                <strong class="text-brand-900 text-[15px]">Organic Sales System</strong>
                <span class="text-brand-900/60 text-[13px]">Content බලන කෙනෙක් <strong>Enquiry එකක් දාන තැනට, එතනින් Sale එකක් ගන්න තැනට</strong> ගෙනියන ක්රමය හදාගන්න පුලුවන්.</span>
              </div>
              <div class="py-4 border-b border-brand-200 flex flex-col gap-1">
                <strong class="text-brand-900 text-[15px]">Facebook & TikTok Ads</strong>
                <span class="text-brand-900/60 text-[13px]">Paid Ads පටන්ගන්න විදිහ, <strong>Test කරන්න, Results බලන්න</strong> සහ මොන වගේ Ads ද තමන්ට වැඩ කරන්නෙ කියල <strong>තේරුම්ගන්න</strong> අවශ්ය Basics ඉගෙනගන්න පුලුවන්.</span>
              </div>
              <div class="py-4 border-b border-brand-200 flex flex-col gap-1">
                <strong class="text-brand-900 text-[15px]">Business Growth Workbook</strong>
                <span class="text-brand-900/60 text-[13px]">දින 100 පුරාම භාවිතා කරන <strong>එකම Business Workbook එකක්</strong> — ඉගෙනගන්න දේවල් සහ කරන වැඩ එක තැනක තියාගන්න ඔයාට පුලුවන්.</span>
              </div>
              <div class="py-4 border-b border-brand-200 flex flex-col gap-1">
                <strong class="text-brand-900 text-[15px]">100-Day Action Checklist</strong>
                <span class="text-brand-900/60 text-[13px]">දිනෙන් දින <strong>කරන්න ඕනේ වැඩ පැහැදිලිව Track කරගෙන ඉස්සරහට යන්න</strong> Action Checklist එකක් ඔයාට ලැබෙනවා.</span>
              </div>
              <div class="py-4 border-b border-brand-200 flex flex-col gap-1">
                <strong class="text-brand-900 text-[15px]">Practical Templates & Tools</strong>
                <span class="text-brand-900/60 text-[13px]">Worksheets, Checklists, Planners සහ Sales Frameworks වගේ <strong>වැඩේටම භාවිතා කරන්න පුළුවන් Practical Templates & Tools</strong> අපි ඔයාට ලබා දෙනවා.</span>
              </div>
              <div class="py-4 border-b border-brand-200 flex flex-col gap-1">
                <strong class="text-brand-900 text-[15px]">Programme Community</strong>
                <span class="text-brand-900/60 text-[13px]">ප්රශ්න අහන්න, තමන් කරන වැඩ Share කරගන්න, <strong>අතරමඟ Support එකක් ගන්න</strong> Structured Community එකක් ඔයත් එක්ක ඉන්නවා.</span>
              </div>
              <div class="py-4 border-b md:border-none border-brand-200 flex flex-col gap-1">
                <strong class="text-brand-900 text-[15px]">Session Recordings</strong>
                <span class="text-brand-900/60 text-[13px]">Live Sessions <strong>Miss වුණොත් බය වෙන්න දෙයක් නෑ</strong>, පස්සේ ආයෙත් බලලා <strong>Revision කරගන්නත්</strong> Programme Recordings Access එක අපි ඔයාට ලබා දෙනවා.</span>
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
              <h2 class="font-serif text-[28px] sm:text-[36px] text-white tracking-tight mb-2">How the Mentorship Works</h2>
              <p class="text-white/80 text-[16px] mb-12">ඔයාගේ හීනයට අපි මඟ පෙන්වන්නම්. ඒ හීනය Business විදියට ගොඩනගන්නේ ඔයාමයි.</p>

              <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6 sm:gap-8 mb-12">
                <div class="border-t border-brand-800/50 pt-5">
                  <strong class="text-brand-200 tracking-wider text-[13px] block mb-2 uppercase">01 · LEARN</strong>
                  <p class="text-white/70 text-[13px] leading-relaxed">Business එක ගොඩනගන්න <strong>මොනවද කරන්න ඕනේ, ඒක කරන්නෙ කොහොමද</strong> කියලා තේරුම්ගන්න.</p>
                </div>
                <div class="border-t border-brand-800/50 pt-5">
                  <strong class="text-brand-200 tracking-wider text-[13px] block mb-2 uppercase">02 · BUILD</strong>
                  <p class="text-white/70 text-[13px] leading-relaxed">ඉගෙනගත්ත දේ <strong>ඔයාගේම Business එකට Apply කරලා</strong>, ඇත්තටම වැඩ කරන්න පටන්ගන්න.</p>
                </div>
                <div class="border-t border-brand-800/50 pt-5">
                  <strong class="text-brand-200 tracking-wider text-[13px] block mb-2 uppercase">03 · SUBMIT</strong>
                  <p class="text-white/70 text-[13px] leading-relaxed">වැදගත් Milestones ටික අපිට <strong>Submit කරලා Review කරගන්න</strong>.</p>
                </div>
                <div class="border-t border-brand-800/50 pt-5">
                  <strong class="text-brand-200 tracking-wider text-[13px] block mb-2 uppercase">04 · IMPROVE</strong>
                  <p class="text-white/70 text-[13px] leading-relaxed">ලැබෙන Feedback අනුව, <strong>ඔයාගේ වැඩේ තවත් හොඳ කරගන්න</strong>. අවශ්ය තැන් වෙනස් කරලා ආයෙත් Try කරන්න.</p>
                </div>
                <div class="border-t border-brand-800/50 pt-5">
                  <strong class="text-brand-200 tracking-wider text-[13px] block mb-2 uppercase">05 · GROW</strong>
                  <p class="text-white/70 text-[13px] leading-relaxed">මොන දේ වැඩ කරනවද Test කරලා, Results බලලා, ඊළඟට <strong>Business එක Grow කරන්න ඕනේ කොහොමද කියලා Plan කරගන්න</strong>.</p>
                </div>
              </div>

              <p class="text-white/80 text-[14px] sm:text-[15px] border-t border-white/10 pt-8 max-w-[800px] leading-relaxed">
                <strong>අපි දැනුම සහ Guidance එක දෙනවා. ඔයා ඒ දේවල් ඔයාට Apply කර ගන්නවා. ඒ දෙක එකතු වුණාම තමයි Business එකක් හරි විදියට ගොඩනැගෙන්නේ.</strong>
              </p>
            </div>
          </div>
        </section>

        <!-- Section: What Changes -->
        <section class="py-16 sm:py-20 border-t border-brand-100">
          <h2 class="font-serif text-[28px] sm:text-[36px] text-brand-900 tracking-tight mb-4">What Changes for You Over These 100 Days?</h2>
          <p class="text-brand-900/70 text-[16px] sm:text-[18px] max-w-[720px] mb-4 leading-relaxed">
            ඔයාට දැනටමත් මැහුම් Skill එක තියෙන්න පුළුවන්. හැබැයි අමාරුම කොටස තමයි <strong>ඒ Skill එකෙන් මිනිස්සු ඇත්තටම ගන්න කැමති දෙයක් හදාගන්න එක, ඒ අයට ඔයාව හොයාගන්න සලස්වන එක, සහ කෙනෙක්ගෙ Interest එක ඇත්තටම Order එකක් බවට පත්කරගන්න එක.</strong>
          </p>
          <p class="text-brand-900/70 text-[16px] sm:text-[18px] max-w-[720px] mb-12 leading-relaxed">
            මේ Programme එක හදලා තියෙන්නේ ඒ වැඩ ටික එකින් එක හදාගන්නයි.
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
                ඔයාගේ Tailoring Skill එකට ගැළපෙන Practical Product/Service එකක් තෝරගෙන, ඒක කාටද, ඇයි එයාලා ගන්නේ කියලා Clear කරගෙන, Business එක පටන් ගන්න Direction එක හදගන්න අපි Guide කරනවා.
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
                Product/Service එක Develop කරලා, Feedback අරගෙන Improve කරලා, Costing සහ Pricing හදාගෙන, Customer කෙනෙක්ට තේරෙන්නත් ගන්න ලේසි වෙන්නත් Offer එක Shape කරගන්න.
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
                Social Media එකේ Post දාන එක විතරක් කරන්නේ නැතුව, Customer Journey එකක් හදමු. කෙනෙක් ඔයාව දකිනවා → Offer එක තේරුම් ගන්නවා → WhatsApp එකෙන් Contact කරනවා → Order එකකට යනවා.
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
                Enquiry එක ආවම Reply කරන්නේ කොහොමද, Offer එක Present කරන්නේ කොහොමද, Common Questions/Objections Handle කරන්නේ කොහොමද, Sale එක Close කරන්නේ සහ Follow-Up කරන්නේ කොහොමද කියලා Practical System එකක් හදගන්න.
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
                හැමදාම “අද මොනවා දාන්නද?” කියලා Blank වෙන්න ඕන නැති වෙන්න, ඔයාගේ Products, Customers සහ Sales Goals වලට ගැළපෙන Repeatable Content System එකක් සහ 30-Day Content Plan එකක් හදගන්න.
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
                Facebook සහ TikTok Content, Clear CTA සහ WhatsApp Business Use කරලා, Interested Customer කෙනෙක්ට ඔයා වෙත එන්න ලේසි Organic Customer-Acquisition Flow එකක් හදගන්න.
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
                Ads වලට Budget දාන්න කලින් Campaign එක Structure කරන්නේ කොහොමද, Audience එක තෝරන්නේ කොහොමද, Creative එක හදන්නේ කොහොමද, Ad එක Sales Process එකට Connect කරන්නේ කොහොමද කියලා ඉගෙනගන්නවා. Results වල Numbers කියන්නේ මොනවාද කියලත් බලමු.
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
                Programme එක ඉවර වෙද්දී මොන දේවල් Work වෙනවද, මොනවා Improve කරන්න ඕනද, ඊළඟට Focus කරන්න ඕන මොනවද කියලා Clear Picture එකක් තියෙයි. ඉන් පස්සේ යන්න 90-Day Growth Plan එකකුත් තියෙයි.
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
              <p class="text-[14px] text-brand-900/70 leading-relaxed">Product එක, Customer, Costing, Pricing සහ Offer එක Review කරමු.</p>
            </div>
            <div class="border border-brand-200 p-6 sm:p-8 rounded-2xl bg-white shadow-sm hover:shadow-md transition-shadow">
              <div class="text-[11px] text-brand-700 font-extrabold tracking-widest mb-4 uppercase">02 · Digital</div>
              <h3 class="text-[18px] font-bold text-brand-900 mb-3 leading-snug">Digital Business Review</h3>
              <p class="text-[14px] text-brand-900/70 leading-relaxed">Facebook, TikTok සහ WhatsApp Business Setup එක Review කරමු.</p>
            </div>
            <div class="border border-brand-200 p-6 sm:p-8 rounded-2xl bg-white shadow-sm hover:shadow-md transition-shadow">
              <div class="text-[11px] text-brand-700 font-extrabold tracking-widest mb-4 uppercase">03 · Sales</div>
              <h3 class="text-[18px] font-bold text-brand-900 mb-3 leading-snug">Organic Sales Review</h3>
              <p class="text-[14px] text-brand-900/70 leading-relaxed">Content, Enquiry Flow, WhatsApp Sales Process සහ Follow-Up Review කරමු.</p>
            </div>
          </div>
          
          <div class="max-w-md">
            <div class="border border-brand-200 p-6 sm:p-8 rounded-2xl bg-white shadow-sm hover:shadow-md transition-shadow bg-gradient-to-br from-white to-brand-50">
              <div class="text-[11px] text-brand-700 font-extrabold tracking-widest mb-4 uppercase">04 · Growth</div>
              <h3 class="text-[18px] font-bold text-brand-900 mb-3 leading-snug">Final Growth Plan Review</h3>
              <p class="text-[14px] text-brand-900/70 leading-relaxed">ඔයාගේ Progress එක සහ ඊළඟ දින 90ට Business Plan එක Review කරමු.</p>
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
              ඔයා ගෙවන මුදල Success එකේ Guarantee එකක් නෙවෙයි. ඒක ඔයාටම දෙන Commitment එකක් — Show Up වෙලා වැඩේ කරන්න.
            </p>
            <p class="text-white/80 text-[15px] sm:text-[16px] leading-relaxed">
              ඔයා Tailoring Skill එකෙන් ඇත්තටම දෙයක් Build කරන්න Serious නම්, මුල ඉඳන් ඒ Journey එකේ Guide කරන්න අපි කැමතියි.
            </p>
          </div>
        </section>

        <!-- Section: One Important Thing -->
        <section class="py-12 border-t border-brand-100 text-center max-w-3xl mx-auto">
          <h2 class="font-serif text-[28px] text-brand-900 tracking-tight mb-4">එක දෙයක් මතක තියාගන්න.</h2>
          <p class="text-[18px] text-brand-900 font-bold mb-4">Knowledge, frameworks, tools, guidance සහ feedback අපි දෙනවා. Build කරන්නේ ඔයා.</p>
          <p class="text-[14px] text-brand-900/60 leading-relaxed">
            මේ Programme එකට Done-For-You Website Development, Social Media Management, Content Production, Individual Ad Management, Unlimited Private Consultations හෝ Guaranteed Sales/Income ඇතුළත් නෑ.
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
          } @else if (cartService.hasItem('course-' + courseId) || cartService.hasItem('course-' + courseId + '-reserve')) {
            <a routerLink="/checkout" class="inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-8 sm:px-12 py-4 sm:py-5 rounded-xl font-bold text-[16px] sm:text-[18px] transition-colors shadow-lg shadow-emerald-900/20 mb-6">
              <mat-icon>check_circle</mat-icon> Proceed to Checkout
            </a>
          } @else {
            <div class="flex flex-col sm:flex-row gap-4 mb-6">
              @if (isOfferValid()) {
                <button (click)="enroll(true)" class="inline-block bg-brand-900 hover:bg-brand-800 text-white px-8 sm:px-12 py-4 sm:py-5 rounded-xl font-bold text-[16px] sm:text-[18px] transition-colors shadow-lg shadow-brand-900/20">
                  මම ලෑස්තියි — LKR 5,000කින් Place එක Reserve කරන්න
                </button>
                <button (click)="enroll(false)" class="inline-block bg-white border-2 border-brand-900 text-brand-900 hover:bg-brand-50 px-8 sm:px-12 py-3.5 sm:py-4 rounded-xl font-bold text-[16px] sm:text-[18px] transition-colors shadow-sm">
                  Pay in Full (LKR 50,000)
                </button>
              } @else {
                <button (click)="enroll(false)" class="inline-block bg-brand-900 hover:bg-brand-800 text-white px-8 sm:px-12 py-4 sm:py-5 rounded-xl font-bold text-[16px] sm:text-[18px] transition-colors shadow-lg shadow-brand-900/20">
                  මම ලෑස්තියි — Pay in Full (LKR 65,000)
                </button>
              }
            </div>
          }
          
          @if (isOfferValid()) {
            <p class="text-[13px] text-brand-900/60 font-medium mb-8">Total reservation programme fee: LKR 55,000 · Full payment: LKR 50,000</p>
          }
          
          <p class="text-[12px] text-brand-900/50 max-w-xl mx-auto leading-relaxed border-t border-brand-200/60 pt-6">
            මේ Programme එකට ඔයාගේ Active Participation එක අත්‍යවශ්‍යයි. අපි Guide කරනවා. Build කරන්නේ ඔයා. Results ඔයාගේ Effort, Implementation, Market එක සහ Business Decisions මත වෙනස් වෙනවා.
          </p>
        </div>

      </main>
    </div>
  `
})
export class Mentorship implements OnInit, OnDestroy {
  contentService = inject(ContentService);
  cartService = inject(CartService);
  private router = inject(Router);
  private title = inject(Title);
  private meta = inject(Meta);
  platformId = inject(PLATFORM_ID);

  courseId = '6-month-tailoring-business-mentorship';
  proceeding = signal(false);

  deadline = new Date(2026, 8, 30, 23, 59, 59).getTime();
  now = signal(Date.now());
  isOfferValid = computed(() => this.now() < this.deadline);

  timeRemaining = computed(() => {
    const diff = this.deadline - this.now();
    if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / 1000 / 60) % 60),
      seconds: Math.floor((diff / 1000) % 60)
    };
  });

  private timerInterval: any;

  async enroll(isReserve: boolean) {
    this.proceeding.set(true);
    
    let courseName = 'Tailoring Business Growth Mentorship';
    let coursePrice = isReserve ? 5000 : (this.isOfferValid() ? 50000 : 65000);
    
    try {
      const docRef = doc(db, 'courses', this.courseId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        courseName = data['title'] || courseName;
      }
    } catch (e) {
      console.error('Failed to fetch course data for cart', e);
    }

    if (isReserve) {
      courseName += ' (Seat Reservation)';
    }

    this.cartService.addItem({
      id: 'course-' + this.courseId + (isReserve ? '-reserve' : ''),
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

    if (isPlatformBrowser(this.platformId)) {
      this.now.set(Date.now());
      this.timerInterval = setInterval(() => {
        this.now.set(Date.now());
      }, 1000);
    }
  }

  ngOnDestroy() {
    if (this.timerInterval) clearInterval(this.timerInterval);
  }
}
