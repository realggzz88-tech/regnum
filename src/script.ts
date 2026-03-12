/* ========================================
   REGNUM CONSULTING - TYPESCRIPT
   Smooth Scroll & Fade-In Animations
   ======================================== */

const IS_PRODUCTION: boolean = window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1';

function escapeHTML(text: string): string {
    if (typeof text !== 'string') return '';
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function createSafeText(text: string): Text {
    return document.createTextNode(text || '');
}

function isValidContact(contact: string): boolean {
    if (!contact || typeof contact !== 'string') return false;
    const trimmed = contact.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[\d\s\-+()]{6,20}$/;
    return emailRegex.test(trimmed) || phoneRegex.test(trimmed);
}

function secureLog(level: 'log' | 'warn' | 'error', ...args: any[]): void {
    if (!IS_PRODUCTION) {
        (console as any)[level]?.(...args);
    }
}

interface Translations {
    [key: string]: string;
}

type LanguageKey = 'en' | 'mk';

interface LanguageMap {
    en: Translations;
    mk: Translations;
}

const translations: LanguageMap = {
    en: {
        'nav.model': 'Model',
        'nav.caseStudies': 'Case Studies',
        'nav.services': 'Services',
        'nav.about': 'About',
        'nav.bookConsultation': 'Book Consultation',
        'buttons.consultation': 'Request Strategic Consultation',
        'buttons.viewWork': 'View Our Work',
        'hero.title': 'Digitize Your Business.',
        'hero.subtitle': 'Build Online. Sell Smarter. Grow Faster.',
        'fast.title': 'Fast Website Launch',
        'fast.subline': 'A professional digital presence — delivered in 48–72 hours.',
        'fast.desc': 'Every company now requires a professional online presence. We build structured, mobile-optimized websites fast — without compromising design or future scalability.',
        'fast.bullet1': 'Regulatory-ready structure',
        'fast.bullet2': 'Clean modern design',
        'fast.bullet3': 'Mobile optimized',
        'fast.bullet4': 'SEO-ready foundation',
        'fast.bullet5': 'Ready for CRM integration later',
        'fast.bullet6': 'Delivered within 3 days',
        'fast.price': 'From €89',
        'fast.priceNote': 'Final price defined after short consultation.',
        'fast.cta': 'Start Website Launch →',
        'scale.title': 'Built to Scale',
        'scale.desc': 'Your website is the foundation. When you are ready, we integrate CRM systems, automation and intelligent growth infrastructure — without rebuilding from scratch.',
        'scale.module1': 'Website',
        'scale.module2': 'CRM',
        'scale.module3': 'Automation',
        'chaos.title': 'From chaos to profit.',
        'chaos.subtitle': 'When the system works, growth becomes predictable.',
        'chaos.pipe.website': 'Website',
        'chaos.pipe.leads': 'Leads',
        'chaos.pipe.crm': 'CRM System',
        'chaos.pipe.automation': 'Automation',
        'chaos.pipe.reporting': 'Control and reports',
        'chaos.pipe.profit': '📈 Profit growing faster than costs',
        'chaos.footer': 'The system enables growth without chaos, without more employees, and without losing clients.',
        'transform.title': 'Digitalization. Structure. Growth.',
        'transform.subtitle': 'From structure to marketing. Everything connected in one system.',
        'transform.desc': 'Regnum Consulting creates a complete digital foundation for business development — from the first client contact to revenue control.\n\nWe build websites that generate leads.\nWe design sales pipeline processes.\nWe implement CRM systems with full visibility.\nWe automate repetitive tasks.\nWe prepare the structure for effective marketing strategies.\n\nEach component is integrated into one architecture that enables controlled and scalable expansion.',
        'transform.col1.title': 'Digitalization',
        'transform.col1.desc': 'We build websites that generate leads. We design sales pipeline processes. We create your digital presence from scratch.',
        'transform.col2.title': 'Structure',
        'transform.col2.desc': 'We implement CRM systems with full visibility. We automate repetitive tasks. We organize the entire system for efficient operation.',
        'transform.col3.title': 'Growth',
        'transform.col3.desc': 'Marketing brings traffic. The system turns it into profit. Controlled growth without chaos, without additional costs.',
        'transform.emphasis': 'Marketing brings traffic. The system turns it into profit.',
        'timeline.title': 'How we build growth',
        'timeline.subline': 'Clear process. Precise execution. Controlled outcome.',
        'timeline.step1.title': 'ANALYZE',
        'timeline.step1.desc': 'We analyze the revenue model and the points of friction.',
        'timeline.step2.title': 'DESIGN',
        'timeline.step2.desc': 'We define the operational and sales structure.',
        'timeline.step3.title': 'BUILD',
        'timeline.step3.desc': 'We implement CRM, automation, web, and AI infrastructure.',
        'timeline.step4.title': 'SCALE',
        'timeline.step4.desc': 'We prepare the system for aggressive and controlled growth.',
        // ... more translations as in JS
    },
    mk: {
        // existing mk translations omitted for brevity (same as before)
    }
};

const getTranslation = (lang: keyof LanguageMap, key: string): string => {
    return translations[lang]?.[key] ?? key;
};

const setLanguage = (lang: LanguageKey): void => {
    const elements = document.querySelectorAll<HTMLElement>('[data-i18n]');
    elements.forEach((el) => {
        const key = el.dataset.i18n;
        if (!key) return;
        const translation = getTranslation(lang, key);
        if (el.tagName.toLowerCase() === 'input' || el.tagName.toLowerCase() === 'textarea') {
            (el as HTMLInputElement).placeholder = translation;
        } else {
            el.textContent = translation;
        }
    });
};

const setActiveLanguageButton = (lang: LanguageKey): void => {
    const buttons = document.querySelectorAll<HTMLButtonElement>('.lang-btn');
    buttons.forEach((btn) => {
        if (btn.dataset.lang === lang) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
};

const setupLanguageSwitcher = (): void => {
    const switcher = document.querySelector('.language-switcher');
    if (!switcher) return;
    switcher.addEventListener('click', (event: Event) => {
        const target = event.target as HTMLElement;
        if (!target || !target.classList.contains('lang-btn')) return;
        const lang = target.dataset.lang as LanguageKey | undefined;
        if (lang && translations[lang]) {
            setLanguage(lang);
            setActiveLanguageButton(lang);
        }
    });
};

const initScrollFade = (): void => {
    const fadeItems = document.querySelectorAll<HTMLElement>('.fade-in');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1
    });

    fadeItems.forEach((item) => observer.observe(item));
};

const setupMobileMenu = (): void => {
    const menuToggle = document.querySelector<HTMLButtonElement>('.mobile-menu-toggle');
    const nav = document.querySelector<HTMLDivElement>('.nav-container');

    if (!menuToggle || !nav) return;

    menuToggle.addEventListener('click', () => {
        nav.classList.toggle('open');
    });

    document.addEventListener('click', (event) => {
        const target = event.target as Node;
        if (!nav.contains(target) && !menuToggle.contains(target)) {
            nav.classList.remove('open');
        }
    });

    const dropdownToggles = document.querySelectorAll<HTMLAnchorElement>('.nav-dropdown-toggle');
    dropdownToggles.forEach((toggle) => {
        toggle.addEventListener('click', (event) => {
            if (window.getComputedStyle(menuToggle).display !== 'none') {
                event.preventDefault();
                const parent = toggle.closest('.nav-dropdown');
                parent?.classList.toggle('dropdown-open');
            }
        });
    });
};

const init = (): void => {
    setLanguage('mk');
    setActiveLanguageButton('mk');
    setupLanguageSwitcher();
    setupMobileMenu();
    initScrollFade();
};

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
