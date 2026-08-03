const fs = require('fs');

const globalData = JSON.parse(fs.readFileSync('./src/content/global.json', 'utf8'));
fs.writeFileSync('./src/content/global.json', JSON.stringify({
  PT: {
    topbar: globalData.topbar_pt,
    contact_email: globalData.contact_email,
    instagram_url: globalData.instagram_url,
    footer_text: globalData.footer_text_pt
  },
  EN: {
    topbar: globalData.topbar_en,
    contact_email: globalData.contact_email,
    instagram_url: globalData.instagram_url,
    footer_text: globalData.footer_text_en
  },
  FR: {
    topbar: globalData.topbar_en,
    contact_email: globalData.contact_email,
    instagram_url: globalData.instagram_url,
    footer_text: globalData.footer_text_en
  }
}, null, 2));

const homeData = JSON.parse(fs.readFileSync('./src/content/home.json', 'utf8'));
fs.writeFileSync('./src/content/home.json', JSON.stringify({
  PT: {
    heroTitle: homeData.heroTitle,
    heroSubtitle: homeData.heroSubtitle,
    heroImage: homeData.heroImage
  },
  EN: {
    heroTitle: homeData.heroTitle,
    heroSubtitle: homeData.heroSubtitle,
    heroImage: homeData.heroImage
  },
  FR: {
    heroTitle: homeData.heroTitle,
    heroSubtitle: homeData.heroSubtitle,
    heroImage: homeData.heroImage
  }
}, null, 2));

const menData = JSON.parse(fs.readFileSync('./src/content/men.json', 'utf8'));
if (menData.br) {
  fs.writeFileSync('./src/content/men.json', JSON.stringify({
    PT: menData.br,
    EN: menData.en,
    FR: menData.fr || menData.en
  }, null, 2));
}

const womenData = JSON.parse(fs.readFileSync('./src/content/women.json', 'utf8'));
if (womenData.br) {
  fs.writeFileSync('./src/content/women.json', JSON.stringify({
    PT: womenData.br,
    EN: womenData.en,
    FR: womenData.fr || womenData.en
  }, null, 2));
}

const kidsData = JSON.parse(fs.readFileSync('./src/content/kids.json', 'utf8'));
if (kidsData.br) {
  fs.writeFileSync('./src/content/kids.json', JSON.stringify({
    PT: kidsData.br,
    EN: kidsData.en,
    FR: kidsData.fr || kidsData.en
  }, null, 2));
}

const faqData = JSON.parse(fs.readFileSync('./src/content/faq.json', 'utf8'));
if (faqData.questions && faqData.questions[0] && faqData.questions[0].q_pt) {
  fs.writeFileSync('./src/content/faq.json', JSON.stringify({
    PT: {
      questions: faqData.questions.map(q => ({ q: q.q_pt, a: q.a_pt }))
    },
    EN: {
      questions: faqData.questions.map(q => ({ q: q.q_en, a: q.a_en }))
    },
    FR: {
      questions: faqData.questions.map(q => ({ q: q.q_en, a: q.a_en }))
    }
  }, null, 2));
}

const aboutData = JSON.parse(fs.readFileSync('./src/content/about.json', 'utf8'));
if (!aboutData.FR) {
  fs.writeFileSync('./src/content/about.json', JSON.stringify({
    PT: aboutData.PT,
    EN: aboutData.EN,
    FR: aboutData.EN
  }, null, 2));
}

console.log("Migration complete");
