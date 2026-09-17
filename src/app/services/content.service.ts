import {Injectable, signal} from '@angular/core';
import {db} from '../../lib/firebase';
import {doc, onSnapshot, setDoc} from 'firebase/firestore';

export interface WebsiteContent {
  app: {
    footerBrand: string;
    footerCopy: string;
    navHome: string;
    navCourses: string;
    navCustom: string;
    navShop: string;
    navAbout: string;
    bankName?: string;
    accountName?: string;
    accountNumber?: string;
    branch?: string;
    whatsappNumber?: string;
    whatsappDisplay?: string;
  };
  home: {
    heroTitle: string;
    heroDesc: string;
    stat1: string; stat1Label: string;
    stat2: string; stat2Label: string;
    stat3: string; stat3Label: string;
    meetTitle: string;
    meetDesc: string;
    meetBtn: string;
    videoTitle: string;
    videoDesc: string;
    servicesTitle: string;
    servicesDesc: string;
    howItWorksTitle: string;
    howItWorksStep1: string;
    howItWorksStep2: string;
    howItWorksStep3: string;
    howItWorksStep4: string;
    bento1Title: string;
    bento1Desc: string;
    bento1Btn: string;
    bento2Title: string;
    bento2Desc: string;
    bento2Btn: string;
    bento3Title: string;
    bento3Desc: string;
    bento3Btn: string;
    testimonialQuote: string;
    ctaTitle: string;
    ctaDesc: string;
    ctaBtn1: string;
    ctaBtn2: string;
  };
  learn: {
    heroTitle: string;
    heroDesc: string;
    whyTitle: string;
    whyDesc: string;
    mainCoursePill: string;
    mainCourseTitle: string;
    mainCourseDesc: string;
    mainCourseBtn1: string;
    mainCourseBtn2: string;
    allClassesTitle: string;
  };
  sewAndSu: {
    heroTitle: string;
    heroDesc: string;
    processTitle: string;
    step1Title: string;
    step1Desc: string;
    step2Title: string;
    step2Desc: string;
    step3Title: string;
    step3Desc: string;
    formTitle: string;
  };
  shop: {
    heroTitle: string;
    heroDesc: string;
  };
  about: {
    heroPill: string;
    heroTitle: string;
    heroDesc: string;
    content: string;
  };
  contact: {
    heroTitle: string;
    heroDesc: string;
    whatsappTitle: string;
    whatsappDesc: string;
    whatsappBtn: string;
    formTitle: string;
  };
}

export const defaultContent: WebsiteContent = {
  app: {
    footerBrand: "Sri Lanka's leading academy for master dressmaking, mentorship, and bespoke tailoring.",
    footerCopy: "© 2024 Su Collection. All rights reserved.",
    navHome: "Home",
    navCourses: "Our Services & Products",
    navCustom: "Custom Sewing",
    navShop: "Shop",
    navAbout: "About Us",
    bankName: "Commercial Bank of Ceylon",
    accountName: "Su Collection (Swarna Herath)",
    accountNumber: "1000 2489 5821",
    branch: "Kandy City Branch",
    whatsappNumber: "94769269586",
    whatsappDisplay: "+94 76 926 9586"
  },
  home: {
    heroTitle: "ඔබේ මැහුම් හැකියාවෙන් සාර්ථක ව්යාපාරයක් ගොඩනගමු!",
    heroDesc: "Stop guessing with confusing patterns. Master dressmaking, perfect garment fitting, and pattern drafting with Swarna Herath—backed by 25 years of real workshop experience and 150,000+ social followers across Sri Lanka.",
    stat1: "25+", stat1Label: "Years Master Tailoring",
    stat2: "150k+", stat2Label: "TikTok & FB Followers",
    stat3: "1-on-1", stat3Label: "Personal WhatsApp Mentorship",
    meetTitle: "Meet Swarna Herath",
    meetDesc: "වසර 25කට වැඩි කාලයක් පුරා විලාසිතා නිර්මාණකරණයේ නියැලෙමින්, කාන්තාවන් සිය ගණනකට සාර්ථක නිවෙස් පදනම් කරගත් විලාසිතා ව්යාපාර ආරම්භ කිරීමට මඟපෙන්වූ ප්රවීණ අත්දැකීම්.",
    meetBtn: "Read Swarna's Story",
    videoTitle: "Watch Swarna in Action",
    videoDesc: "150,000 කට අධික අපගේ සමාජ මාධ්ය ප්රජාව වෙත ගෙන එන ප්රායෝගික මැහුම් රහස්, කෙටි ක්රමවේද (Pattern secrets) සහ අපගේ සිසුන්ගේ සාර්ථකත්වයේ කතන්දර මෙතැනින් නරඹන්න.",
    servicesTitle: "Our Services & Products",
    servicesDesc: "පුද්ගලික මඟපෙන්වීම් (1-on-1 coaching) ලබාගැනීමට හෝ PDF අත්පොත් (Guides) ඇණවුම් කිරීමට පහතින් තෝරාගන්න. සියලුම ගනුදෙනු සහ බැංකු තැන්පතු තහවුරු කිරීම් WhatsApp හරහා ඉතා ආරක්ෂිතව සිදු කෙරේ.",
    howItWorksTitle: "WhatsApp හරහා මුදල් ගෙවා ඇණවුම් කරන ආකාරය",
    howItWorksStep1: "පහතින් ඇති සේවාවන් හෝ PDF අත්පොත් වලින් ඔබට අවශ්ය දේ තෝරාගන්න.",
    howItWorksStep2: "එය ක්ලික් කළ විගස, බැංකු විස්තර ඉල්ලා අපගේ නිල WhatsApp අංකයට ස්වයංක්රීයව පණිවිඩයක් යොමු වේ.",
    howItWorksStep3: "ඔබගේ බැංකු යෙදුමකින් (App එකකින්) හෝ බැංකුව හරහා මුදල් තැන්පත් කර, එම රිසිට්පතෙහි ඡායාරූපයක් අපට එවන්න.",
    howItWorksStep4: "අපගේ කණ්ඩායම ඔබගේ රිසිට්පත පරීක්ෂා කර තහවුරු කළ වහාම, අදාළ PDF අත්පොත එවීමට හෝ පන්ති වේලාවන් වෙන් කිරීමට කටයුතු කරනු ඇත.",
    bento1Title: "Mentorship & Cutting Guides",
    bento1Desc: "Step-by-step masterclasses, downloadable PDF pattern blueprints, and direct WhatsApp voice feedback.",
    bento1Btn: "Explore Programs",
    bento2Title: "Custom Made-to-Measure Outfits",
    bento2Desc: "Send us a design photo. We calculate your custom measurements, source the finest fabrics, and tailor a flawless piece.",
    bento2Btn: "Inquire on WhatsApp",
    bento3Title: "Curated Tailoring Tools",
    bento3Desc: "The exact Japanese shears, rotary cutters, and presser feet Swarna uses every single day in her studio.",
    bento3Btn: "Browse Tools",
    testimonialQuote: "\"I wasted months watching random YouTube tutorials. In just 3 weeks with Swarna's guide, I cut my first perfect princess-line frock without a single crease in the armhole!\"",
    ctaTitle: "Ready to Create Your Own Fashion?",
    ctaDesc: "Whether you want to stitch your own wardrobe, get personal mentorship, or order custom tailoring, we are here on WhatsApp.",
    ctaBtn1: "View Mentorship & Guides",
    ctaBtn2: "Message on WhatsApp"
  },
  learn: {
    heroTitle: "Sewing Classes",
    heroDesc: "Learn to sew your own clothes or start a tailoring business. Step-by-step guidance for beginners and advanced students.",
    whyTitle: "Why Learn With Us?",
    whyDesc: "Stop struggling with complicated paper patterns. Learn how to look at a design, understand how it's made, and sew it perfectly for any body shape.",
    mainCoursePill: "Main Course",
    mainCourseTitle: "Complete Sewing & Business Masterclass",
    mainCourseDesc: "Learn everything from basic stitching to running a successful tailoring business. Swarna will personally guide you to master dressmaking and find your unique style.",
    mainCourseBtn1: "Join the Class",
    mainCourseBtn2: "View Details",
    allClassesTitle: "All Classes"
  },
  sewAndSu: {
    heroTitle: "Custom Made Dresses & Outfits",
    heroDesc: "Send us a picture of the dress you want. We will take your measurements online, choose the right fabric, and sew an outfit that fits you perfectly.",
    processTitle: "How It Works",
    step1Title: "Consultation",
    step1Desc: "Send us a photo of the dress. We’ll discuss the right fabrics, the perfect fit for you, and give you a price.",
    step2Title: "Measurements",
    step2Desc: "We’ll show you exactly how to take your measurements at home. Pay a small deposit to get started.",
    step3Title: "Production",
    step3Desc: "We sew your outfit and deliver it straight to your door, anywhere in the country.",
    formTitle: "Start Your Order"
  },
  shop: {
    heroTitle: "Sewing Tools & Accessories",
    heroDesc: "High-quality sewing tools, machine parts, and scissors—handpicked and trusted by Swarna for her own work."
  },
  about: {
    heroPill: "Meet Swarna Herath",
    heroTitle: "Swarna's Story",
    heroDesc: "Over 25 years of crafting beautiful dresses with love. A lifelong journey and passion for teaching others the art of sewing.",
    content: "වසර 25කට වැඩි කාලයක් පුරා ස්වර්ණා හේරත් වන මම, ඇඳුම් නිර්මාණ කලාවේ ඉදිරියෙන්ම සිටිමින් කටයුතු කර ඇත්තෙමි. කුඩා ආශාවකින් ආරම්භ වූ මෙම ගමන, අද වන විට දහස් සංඛ්යාත පිරිසකට ලස්සනට අඳින්න, මහන්න උගන්වන පුළුල් මෙහෙයුමක් බවට පත්ව ඇත.\n\n\"මිනිස්සු කරන ලොකුම වැරැද්ද තමයි, මැහුම් කියන්නේ නිකන් පතරොමක් බලාගෙන මහන එකක් විතරක් කියලා හිතන එක,\" ස්වර්ණා පවසයි. \"ඒක නෙවෙයි; ඩිසයින් එකක් දිහා බලලා, ඇඳුමක් හැදෙන හැටි තේරුම් අරන්, කෙනෙකුගේ සිරුරට හරියටම ගැලපෙන විදිහට ඒක නිමවන එකයි වැදගත්.\"\n\nමේ සරල සත්යය තමයි අපි Su Collection එකේදී උගන්වන්නේ. අද වන විට සමාජ මාධ්ය හරහා 150,000 කට අධික පිරිසකගේ ආදරය දිනාගනිමින්, ස්වර්ණා වන මම උත්සාහ කරන්නේ අලුත් පරම්පරාව සවිබල ගන්වන්නයි — විනෝදාංශයක් ලෙස මැහුම් කරන අය සාර්ථක ඔන්ලයින් ව්යාපාරිකයන් බවට පත් කිරීමට මම උදව් වෙමි.\n\nOver 25 years of crafting beautiful dresses with love. A lifelong journey and passion for teaching others the art of sewing. Our mission is to empower the next generation of designers and turn hobbyists into successful business owners."
  },
  contact: {
    heroTitle: "Contact Us",
    heroDesc: "Have a question? We are here to help.",
    whatsappTitle: "WhatsApp Us",
    whatsappDesc: "For custom orders, class registrations, or general questions, our team is highly responsive on WhatsApp.",
    whatsappBtn: "Chat on WhatsApp",
    formTitle: "Send a Message"
  }
};

@Injectable({
  providedIn: 'root'
})
export class ContentService {
  content = signal<WebsiteContent>(defaultContent);
  loading = signal<boolean>(true);

  constructor() {
  }

  init(): Promise<void> {
    return new Promise((resolve) => {
      let resolved = false;
      const docRef = doc(db, 'content', 'website');
      onSnapshot(docRef, (docSnap) => {
        this.loading.set(false);
        if (docSnap.exists()) {
          const data = docSnap.data() as WebsiteContent;
          this.content.set(this.mergeDeep(defaultContent, data));
        } else {
          this.content.set(defaultContent);
        }
        if (!resolved) {
          resolved = true;
          resolve();
        }
      }, (error) => {
        console.error("Error fetching content:", error);
        this.loading.set(false);
        if (!resolved) {
          resolved = true;
          resolve();
        }
      });
    });
  }

  async updateContent(newContent: WebsiteContent) {
    const docRef = doc(db, 'content', 'website');
    await setDoc(docRef, newContent);
  }
  
  private mergeDeep(target: any, source: any): any {
    const isObject = (obj: any) => obj && typeof obj === 'object' && !Array.isArray(obj);
    if (!isObject(target) || !isObject(source)) {
      return source;
    }
    const output = { ...target };
    Object.keys(source).forEach(key => {
      if (isObject(source[key])) {
        if (!(key in target)) {
          Object.assign(output, { [key]: source[key] });
        } else {
          output[key] = this.mergeDeep(target[key], source[key]);
        }
      } else {
        Object.assign(output, { [key]: source[key] });
      }
    });
    return output;
  }
}
