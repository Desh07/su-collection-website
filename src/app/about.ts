import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {ContentService} from './services/content.service';
import {FormatTextPipe} from './pipes/format-text.pipe';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-about',
  imports: [MatIconModule, FormatTextPipe],
  template: `
    <header class="pt-6 pb-6 px-4 sm:px-6 text-center max-w-[1600px] mx-auto">
      <div class="relative w-full rounded-[28px] sm:rounded-[48px] overflow-hidden p-8 sm:p-16 border border-white/20 shadow-2xl text-white bg-slate-950 group min-h-[260px] flex items-center justify-center">
        <!-- Background Editorial Fashion Tailoring Image -->
        <div class="absolute inset-0 z-0">
          <img src="/images/Swarnas_Story_Headline.png" 
               alt="Couture Atelier" 
               class="w-full h-full object-cover object-[center_70%] opacity-100 group-hover:scale-105 transition-transform duration-1000" 
               referrerpolicy="no-referrer">
          <div class="absolute inset-0 bg-gradient-to-t from-slate-950/50 via-slate-950/20 to-transparent pointer-events-none"></div>
        </div>

        <div class="relative z-10 max-w-4xl mx-auto">
          <span class="inline-block px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-brand-300 label-md uppercase tracking-[0.2em] text-[11px] sm:text-[12px] mb-4 sm:mb-6">
            {{ c().about.heroPill }}
          </span>
          <h1 class="font-serif text-[32px] sm:text-[52px] lg:text-[64px] font-normal leading-tight mb-4 sm:mb-6 text-white" [innerHTML]="c().about.heroTitle | formatText"></h1>
          <p class="body-md text-[15px] sm:text-[18px] text-white/90 max-w-2xl mx-auto font-light leading-relaxed" [innerHTML]="c().about.heroDesc | formatText">
          </p>
        </div>
      </div>
    </header>

    <main class="px-4 sm:px-6 lg:px-[64px] pb-12 sm:pb-[64px] w-full">
      <div class="gradient-shell">
        <div class="gradient-shell-inner p-6 sm:p-12 lg:p-[80px] flex flex-col gap-12 sm:gap-16 lg:gap-[64px]">
          
          <div class="flex flex-col lg:flex-row gap-10 sm:gap-16 lg:gap-[80px] items-center">
            <div class="w-full lg:w-1/2">
              <div class="relative mx-4 sm:mx-0">
                <div class="absolute inset-0 bg-brand-200 rounded-[28px] sm:rounded-[40px] -translate-x-3 sm:-translate-x-[24px] translate-y-3 sm:translate-y-[24px]"></div>
                <img src="/images/SwarnaHerath.jpg" alt="Swarna Herath in her sewing studio" class="relative z-10 w-full rounded-[28px] sm:rounded-[40px] shadow-[0_25px_50px_-12px_rgba(248,58,100,0.2)] object-cover aspect-[4/5]" referrerpolicy="no-referrer">
              </div>
            </div>
            
            <div class="w-full lg:w-1/2 flex flex-col justify-center">
              <h2 class="font-serif text-[32px] sm:text-[40px] lg:text-[48px] text-brand-900 mb-8 sm:mb-12 leading-tight">The Journey</h2>
              
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-12">
                <div>
                  <span class="block font-serif text-[56px] sm:text-[72px] lg:text-[80px] text-brand-900 mb-2 leading-none">30+</span>
                  <span class="label-md text-brand-600 text-[14px] sm:text-[16px] uppercase tracking-wider">Years Experience</span>
                </div>
                <div>
                  <span class="block font-serif text-[56px] sm:text-[72px] lg:text-[80px] text-brand-900 mb-2 leading-none">150k</span>
                  <span class="label-md text-brand-600 text-[14px] sm:text-[16px] uppercase tracking-wider">Community</span>
                </div>
              </div>
            </div>
          </div>

          <div class="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-16 pt-10 border-t border-brand-200/60">
            <!-- Sinhala Column -->
            <div class="body-md text-[15px] sm:text-[16px] text-brand-900/80 leading-[1.8] font-medium font-['Noto_Sans_Sinhala'] flex flex-col gap-4">
              <p>අවුරුදු <strong>30කට වැඩි කාලයක්</strong> තිස්සේ මැහුම් කලාවත් එක්ක ගත කරපු ගමනක් තමයි අද <strong>Su Collection</strong> කියන්නේ. මුලින් මැහුම් ගැන තිබුණු ආසාවත් එක්ක පොඩියට පටන්ගත්ත මේ ගමන, අද වෙනකොට දහස් ගණනකට ලස්සනට, නිවැරදිව ඇඳුම් මහන්න ඉගෙනගන්න පුළුවන් තැනක් වෙලා තියෙනවා.</p>

              <p><strong>“මැහුම් ඉගෙනගන්න ගොඩක් අය කරන ලොකුම වැරැද්ද තමයි, පතරොමක් බලාගෙන ඒ විදිහටම මහන්න පුළුවන් වුණාම මැහුම් දන්නවා කියලා හිතන එක.”</strong></p>

              <p>ඇත්තටම මැහුම් කියන්නේ ඒක විතරක් නෙවෙයි.</p>

              <p>Design එකක් දැක්කාම ඒක හැදිලා තියෙන්නේ කොහොමද කියලා තේරුම්ගන්න, ඒකට ගැළපෙන Pattern එක හදාගන්න, නිවැරදිව Cut කරගන්න, අන්තිමේදී ඒ ඇඳුම අඳින කෙනාගේ ඇඟට ලස්සනට Fit වෙන විදිහට නිම කරන්න දැනගන්න ඕනේ.</p>

              <p><strong>Su Collection එකේ අපි උගන්වන්නේ ඒ Skill එක.</strong></p>

              <p>අද වෙනකොට Social Media හරහා <strong>150,000කට වැඩි පිරිසක්</strong> අපිත් එක්ක එකතු වෙලා ඉන්නවා. දැන් මගේ බලාපොරොත්තුව මැහුම් කරන හැටි කියලා දීලා එතනින් නවතින එක නෙවෙයි.</p>

              <p>මැහුම් Hobby එකක් විදිහට කරන කෙනෙක්ට ඒ Skill එක තවත් දියුණු කරගෙන, තමන්ගේම ආදායමක් හදන්න, Customers ලා හොයාගන්න, Online එකේ තමන්ගේම Brand එකක් හදාගෙන Business එකක් විදිහට ඉස්සරහට යන්න අවශ්‍ය මඟපෙන්වීම ලබාදෙන එකයි.</p>

              <p>ඒ ගමන තවත් ඉස්සරහට අරගෙන යන්න තමයි <strong>Su Collection, The UVA VEC එක්ක එකතු වෙන්නේ.</strong> Su Collection එකෙන් ලැබෙන මැහුම් සහ Product Development අත්දැකීමත්, <strong>The UVA VEC වෙතින් ලැබෙන Business, Digital සහ Technology පැත්තේ මඟපෙන්වීමත්</strong> එකට එකතු කරලා, ඔයාගේ Skill එක වර්තමානයට ගැළපෙන <strong>Business එකක් විදිහට ගොඩනගාගන්න අවශ්‍ය Support එක ලබාදෙනවා.</strong></p>

              <p><strong>මැහුම් කියන්නේ Skill එකක් විතරක් නෙවෙයි. හරියට ගොඩනගාගත්තොත්, ඒකෙන් ඔයාගේම අනාගතයක් හදාගන්න පුළුවන්.</strong></p>
            </div>

            <!-- English Column -->
            <div class="body-md text-[15px] sm:text-[16px] text-brand-900/80 leading-[1.8] font-medium flex flex-col gap-4">
              <p>For over <strong>30 years</strong>, Swarna Herath has dedicated her journey to the art of tailoring. What began with a simple passion for sewing has grown into <strong>Su Collection</strong> — a trusted learning community that has helped thousands learn how to create beautiful, well-fitted garments with confidence.</p>

              <p><strong>“One of the biggest mistakes people make is thinking that knowing how to follow a pattern means knowing how to sew.”</strong></p>

              <p>For Swarna, tailoring goes much deeper than that.</p>

              <p>It is about looking at a design and understanding <strong>how the garment is constructed</strong>, creating the right pattern, cutting it accurately, shaping it correctly, and ultimately making it <strong>fit beautifully on the person wearing it.</strong></p>

              <p><strong>That is the skill we teach at Su Collection.</strong></p>

              <p>Today, more than <strong>150,000 people</strong> are connected with Su Collection across social media. But Swarna’s vision goes beyond simply teaching people how to sew.</p>

              <p>The goal is to help people who may have started sewing as a hobby develop their skills further, <strong>create an income from what they know, find customers, build their own brand online, and eventually turn their tailoring skills into a real business.</strong></p>

              <p>To take that journey even further, <strong>Su Collection has joined forces with The UVA VEC.</strong> By bringing together Su Collection’s practical tailoring and product development experience with <strong>The UVA VEC’s expertise in business, digital transformation and technology</strong>, the aim is to give aspiring entrepreneurs the guidance and support they need to turn their skills into a <strong>modern, sustainable business.</strong></p>

              <p><strong>Tailoring doesn’t have to remain just a skill. With the right knowledge, guidance and action, it can become something you build your future around.</strong></p>
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
