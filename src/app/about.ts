import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {ContentService} from './services/content.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-about',
  imports: [MatIconModule],
  template: `
    <header class="pt-6 pb-6 px-4 sm:px-6 text-center max-w-[1600px] mx-auto">
      <div class="relative w-full rounded-[28px] sm:rounded-[48px] overflow-hidden p-8 sm:p-16 border border-white/20 shadow-2xl text-white bg-slate-950 group min-h-[260px] flex items-center justify-center">
        <!-- Background Editorial Fashion Tailoring Image -->
        <div class="absolute inset-0 z-0">
          <img src="https://images.unsplash.com/photo-1584034879669-e74f1d431051?q=80&w=2000&auto=format&fit=crop" 
               alt="Couture Atelier" 
               class="w-full h-full object-cover opacity-45 mix-blend-luminosity group-hover:scale-105 transition-transform duration-1000" 
               referrerpolicy="no-referrer">
          <div class="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-slate-900/50"></div>
        </div>

        <div class="relative z-10 max-w-4xl mx-auto">
          <span class="inline-block px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-brand-300 label-md uppercase tracking-[0.2em] text-[11px] sm:text-[12px] mb-4 sm:mb-6">
            {{ c().about.heroPill }}
          </span>
          <h1 class="font-serif text-[32px] sm:text-[52px] lg:text-[64px] font-normal leading-tight mb-4 sm:mb-6 text-white">{{ c().about.heroTitle }}</h1>
          <p class="body-md text-[15px] sm:text-[18px] text-white/90 max-w-2xl mx-auto font-light leading-relaxed">
            Over 25 years of crafting beautiful dresses with love. A lifelong journey and passion for teaching others the art of sewing.
          </p>
        </div>
      </div>
    </header>

    <main class="px-4 sm:px-6 lg:px-[64px] pb-12 sm:pb-[64px] w-full">
      <div class="gradient-shell">
        <div class="gradient-shell-inner p-6 sm:p-12 lg:p-[80px] flex flex-col lg:flex-row gap-10 sm:gap-16 lg:gap-[80px] items-center">
          <div class="w-full lg:w-1/2">
            <div class="relative mx-4 sm:mx-0">
              <div class="absolute inset-0 bg-brand-200 rounded-[28px] sm:rounded-[40px] -translate-x-3 sm:-translate-x-[24px] translate-y-3 sm:translate-y-[24px]"></div>
              <img src="https://images.unsplash.com/photo-1551893665-f843f600794e?q=80&w=1000&auto=format&fit=crop" alt="Swarna Herath in her sewing studio" class="relative z-10 w-full rounded-[28px] sm:rounded-[40px] shadow-[0_25px_50px_-12px_rgba(248,58,100,0.2)] object-cover aspect-[4/5]" referrerpolicy="no-referrer">
            </div>
          </div>
          
          <div class="w-full lg:w-1/2 flex flex-col">
            <h2 class="font-serif text-[32px] sm:text-[40px] lg:text-[48px] text-brand-900 mb-6 sm:mb-8 leading-tight">The Journey</h2>
            
            <div class="body-md text-[15px] sm:text-[16px] text-brand-900/80 leading-relaxed flex flex-col gap-5">
              <p class="font-medium text-brand-900 leading-[1.6]">වසර 25කට වැඩි කාලයක් පුරා ස්වර්ණා හේරත් වන මම, ඇඳුම් නිර්මාණ කලාවේ ඉදිරියෙන්ම සිටිමින් කටයුතු කර ඇත්තෙමි. කුඩා ආශාවකින් ආරම්භ වූ මෙම ගමන, අද වන විට දහස් සංඛ්යාත පිරිසකට ලස්සනට අඳින්න, මහන්න උගන්වන පුළුල් මෙහෙයුමක් බවට පත්ව ඇත.</p>
              <p class="font-medium text-brand-900 leading-[1.6]">"මිනිස්සු කරන ලොකුම වැරැද්ද තමයි, මැහුම් කියන්නේ නිකන් පතරොමක් බලාගෙන මහන එකක් විතරක් කියලා හිතන එක," ස්වර්ණා පවසයි. "ඒක නෙවෙයි; ඩිසයින් එකක් දිහා බලලා, ඇඳුමක් හැදෙන හැටි තේරුම් අරන්, කෙනෙකුගේ සිරුරට හරියටම ගැලපෙන විදිහට ඒක නිමවන එකයි වැදගත්."</p>
              <p class="font-medium text-brand-900 leading-[1.6]">මේ සරල සත්යය තමයි අපි Su Collection එකේදී උගන්වන්නේ. අද වන විට සමාජ මාධ්ය හරහා 150,000 කට අධික පිරිසකගේ ආදරය දිනාගනිමින්, ස්වර්ණා වන මම උත්සාහ කරන්නේ අලුත් පරම්පරාව සවිබල ගන්වන්නයි — විනෝදාංශයක් ලෙස මැහුම් කරන අය සාර්ථක ඔන්ලයින් ව්යාපාරිකයන් බවට පත් කිරීමට මම උදව් වෙමි.</p>
              
              <div class="h-px w-16 bg-brand-200 my-2"></div>
              
              <p>{{ c().about.content1 }}</p>
              <p>{{ c().about.content2 }}</p>
              <p>{{ c().about.content3 }}</p>
            </div>

            <div class="grid grid-cols-2 gap-6 sm:gap-8 pt-8 mt-8 border-t border-brand-200">
              <div>
                <span class="block font-serif text-[44px] sm:text-[56px] lg:text-[64px] text-brand-900 mb-1 leading-none">25+</span>
                <span class="label-md text-brand-600 text-[13px] sm:text-[14px]">Years Experience</span>
              </div>
              <div>
                <span class="block font-serif text-[44px] sm:text-[56px] lg:text-[64px] text-brand-900 mb-1 leading-none">150k</span>
                <span class="label-md text-brand-600 text-[13px] sm:text-[14px]">Community</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  `
})
export class About {
  contentService = inject(ContentService);
  c = this.contentService.content;
}
