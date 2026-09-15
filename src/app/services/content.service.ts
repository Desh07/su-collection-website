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
    content1: string;
    content2: string;
    content3: string;
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
    heroTitle: "Cut with precision. Sew with confidence.",
    heroDesc: "Stop guessing with confusing patterns. Master dressmaking, perfect garment fitting, and pattern drafting with Swarna Herath—backed by 34 years of real workshop experience and 150,000+ social followers across Sri Lanka.",
    stat1: "34+", stat1Label: "Years Master Tailoring",
    stat2: "150k+", stat2Label: "TikTok & FB Followers",
    stat3: "1-on-1", stat3Label: "Personal WhatsApp Mentorship",
    meetTitle: "Meet Swarna Herath",
    meetDesc: "34 years of fitting real bodies, sewing bespoke bridalwear, and mentoring hundreds of women to start profitable home fashion boutiques.",
    meetBtn: "Read Swarna's Story",
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
    heroDesc: "34 years of experience making beautiful dresses. A lifelong passion for teaching others how to sew.",
    content1: "For over three decades, Swarna Herath has been at the forefront of the custom tailoring industry. What began as a local passion project has evolved into a nationwide movement, teaching thousands how to sew beautiful clothes.",
    content2: "\"The biggest mistake people make,\" Swarna notes, \"is thinking that sewing is just about following a pattern. It's not. It's about looking at a design, understanding how clothes are made and making them fit a person perfectly.\"",
    content3: "This simple idea is the heart of what we teach at Su Collection. Today, with over 150,000 followers across social media, Swarna focuses on empowering the next generation of tailors—helping them transition from hobbyists to successful online business owners."
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
    this.listenToContent();
  }

  private listenToContent() {
    const docRef = doc(db, 'content', 'website');
    onSnapshot(docRef, (docSnap) => {
      this.loading.set(false);
      if (docSnap.exists()) {
        const data = docSnap.data() as WebsiteContent;
        // Merge to ensure no missing keys break the UI if schema updates
        this.content.set(this.mergeDeep(defaultContent, data));
      } else {
        this.content.set(defaultContent);
      }
    }, (error) => {
      console.error("Error fetching content:", error);
      this.loading.set(false);
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
