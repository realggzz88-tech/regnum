    // ========== FLOATING CTA BUTTON ========== 
    const ctaFloatBtn = document.getElementById('ctaFloatBtn');
    if (ctaFloatBtn) {
        ctaFloatBtn.addEventListener('click', function() {
            // Try to scroll to contact section if it exists
            const contactSection = document.getElementById('kontakt');
            if (contactSection) {
                contactSection.scrollIntoView({ behavior: 'smooth' });
            } else {
                // Fallback: open the consultation modal
                const modal = document.getElementById('consultModal');
                if (modal) {
                    modal.classList.add('show');
                    document.body.style.overflow = 'hidden';
                }
            }
        });
    }
    // Helper to show only the last 2 chat messages (latest question + answer)
// ...existing code...
/* ========================================
   REGNUM CONSULTING - JAVASCRIPT
   Smooth Scroll & Fade-In Animations
   ======================================== */

'use strict';

// ========== ENVIRONMENT & SECURITY ==========
const IS_PRODUCTION = window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1';

/**
 * Escapes HTML entities to prevent XSS attacks
 * @param {string} text - Untrusted text input
 * @returns {string} Safely escaped text
 */
function escapeHTML(text) {
    if (typeof text !== 'string') return '';
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

/**
 * Creates a text node safely (no HTML interpretation)
 * @param {string} text - Untrusted text
 * @returns {Text} Text node
 */
function createSafeText(text) {
    return document.createTextNode(text || '');
}

/**
 * Validates contact input (email or phone)
 * @param {string} contact 
 * @returns {boolean}
 */
function isValidContact(contact) {
    if (!contact || typeof contact !== 'string') return false;
    const trimmed = contact.trim();
    // Email pattern
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // Phone pattern (international)
    const phoneRegex = /^[\d\s\-+()]{6,20}$/;
    return emailRegex.test(trimmed) || phoneRegex.test(trimmed);
}

/**
 * Secure logging - only logs in development
 * @param {string} level - 'log', 'warn', 'error'
 * @param  {...any} args 
 */
function secureLog(level, ...args) {
    if (!IS_PRODUCTION) {
        console[level]?.(...args);
    }
}

// ========== LEAD SUBMISSION ==========
function submitLead(data) {
    // Accept all premium chat fields, fallback for compatibility
    const sanitizedData = {
        name: String(data.name || '').slice(0, 100),
        phone: String(data.phone || '').slice(0, 40),
        email: String(data.email || '').slice(0, 100),
        answers: Array.isArray(data.answers) ? data.answers.map(String) : (data.answers ? String(data.answers) : ''),
        problem: String(data.problem || '').slice(0, 200),
        intent: String(data.intent || data.timeline || '').slice(0, 100),
        selectedService: String(data.selectedService || data.businessType || '').slice(0, 100),
        contact: String(data.contact || '').slice(0, 200)
    };

    fetch('/api/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(sanitizedData)
    }).catch(function() {
        // Silent fail — the chat already shows a thank-you message
    });
}

// ========== LANGUAGE SWITCHING ==========
const translations = {
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
        'model.title': 'Regnum Execution Framework™',
        'model.step1.title': 'Diagnosis and Analysis',
        'model.step1.desc': 'We analyze your complete business model, sales flow, and points of revenue loss.',
        'model.step2.title': 'Structure Design',
        'model.step2.desc': 'We create a clear operational and sales system with defined processes.',
        'model.step3.title': 'Technical Implementation',
        'model.step3.desc': 'We implement CRM, automation, and control mechanisms.',
        'model.step4.title': 'Integration and Synchronization',
        'model.step4.desc': 'We connect all tools into one centralized infrastructure.',
        'model.step5.title': 'Optimization and Scaling',
        'model.step5.desc': 'We prepare the system for aggressive and controlled growth.',
        'case.title': 'System Implementations',
        'case1.meta': 'B2B SaaS Platform',
        'case1.title': 'CRM Architecture Deployment',
        'case1.label.challenge': 'Infrastructure Challenge',
        'case1.desc.challenge': 'Sales team operating without pipeline visibility. Unstructured deal tracking across email and spreadsheets. Inconsistent follow-up protocols. Revenue dependent on individual rep memory.',
        'case1.label.system': 'System Architecture Deployed',
        'case1.desc.system': 'Custom HubSpot implementation with automated lead scoring, pipeline stage enforcement, and real-time revenue dashboards. Integrated data synchronization from marketing automation platform.',
        'case1.label.impact': 'Operational Impact',
        'case1.impact1': 'increase in close rate (90 days post-deployment)',
        'case1.impact2': 'eliminated per rep daily (automation)',
        'case1.impact3': 'pipeline visibility across sales organization',
        'case1.view': 'View Full Project →',
        'case2.meta': 'Professional Services',
        'case2.title': 'End-to-End Automation Infrastructure',
        'case2.label.challenge': 'Infrastructure Challenge',
        'case2.desc.challenge': 'Manual proposal generation (8–12 hours per client). No standardized onboarding workflow. Client data scattered across CRM, email, and shared drives. Revenue growth stalled at $2M due to operational inefficiency.',
        'case2.label.system': 'System Architecture Deployed',
        'case2.desc.system': 'Automated proposal generation with dynamic template system. E-signature integration with DocuSign. Client onboarding automation with milestone-based task distribution. Centralized CRM with automated reporting dashboards.',
        'case2.label.impact': 'Operational Impact',
        'case2.impact1': 'ARR achieved without headcount increase',
        'case2.impact2': 'proposal turnaround time',
        'case2.impact3': 'eliminated per week (administrative tasks)',
        'case2.view': 'View Full Project →',
        'case3.meta': 'E-commerce Enterprise',
        'case3.title': 'Unified Data & Marketing Automation',
        'case3.label.challenge': 'Infrastructure Challenge',
        'case3.desc.challenge': 'Customer data fragmented across 5 platforms. No single customer view. Marketing and sales disconnected. Campaign performance unmeasured.',
        'case3.label.system': 'System Architecture Deployed',
        'case3.desc.system': 'Centralized customer data platform with Salesforce integration. Automated behavioral segmentation. Multi-channel marketing automation with real-time analytics.',
        'case3.label.impact': 'Operational Impact',
        'case3.impact1': 'uplift in customer lifetime value',
        'case3.impact2': 'increase in email campaign conversion rates',
        'case3.impact3': 'single view of customer across all channels',
        'case3.view': 'View Full Project →',
        'services.modules.title': 'Digital System Modules',
        'services.modules.subline': 'We build structured digital systems. Foundation first, scale when you are ready.',
        'services.modules.note': 'Prices start from the listed amount and depend on project complexity.',
        'services.modules.foundation': 'Foundation',
        'services.modules.control': 'Control',
        'services.modules.growth': 'Growth',
        'services.title': 'Services',
        'services.audit.title': 'Strategic Audit',
        'services.audit.desc': 'Deep structural analysis of your IT infrastructure, operational workflows, and system dependencies. We engineer a technical roadmap designed for sustainable scaling.',
        'services.implementation.title': 'System Implementation',
        'services.implementation.desc': 'Full architecture deployment: CRM systems, automation infrastructure, and integrated workflows. We engineer every layer—from configuration to deployment—ensuring operational reliability.',
        'services.optimization.title': 'Operational Optimization',
        'services.optimization.desc': 'Continuous refinement of deployed systems. We monitor performance metrics, eliminate operational friction, and scale infrastructure to match revenue acceleration.',
        'about.title': 'Our Vision',
        'about.desc': 'Regnum Consulting exists to redefine how companies grow in the digital era.\n\nWe believe sustainable growth doesn\'t come from chaotic tools and improvisation, but from a clearly built structure that connects sales, marketing, automation, and intelligent technologies into one integrated system.\n\nOur vision is to build businesses that operate with precision, scale in a controlled manner, and create long-term value.',
        'cta.title': 'Build a system that drives growth.',
        'cta.subline': 'Complete digital implementation. No chaos. With results.',
        'cta.button': 'BOOK A CONSULTATION',
        'footer.copyright': '© 2026 Regnum Consulting.',
        'footer.link': 'IT Consulting North Macedonia',
        'modal.title': 'Request Strategic Consultation',
        'modal.desc': 'Connect directly with our engineering team to discuss your infrastructure requirements.',
        'modal.whatsapp': 'WhatsApp',
        'modal.viber': 'Viber',
        'modal.call': 'Direct Call',
        'growth.hero.eyebrow': 'PERFORMANCE MARKETING',
        'growth.hero.title.line1': 'Marketing is not a campaign.',
        'growth.hero.title.line2': 'Marketing is a performance system.',
        'growth.hero.subtitle': 'We design and implement performance marketing infrastructure that generates predictable leads, conversions, and measurable ROI.',
        'growth.hero.primary': 'Start Performance Strategy',
        'growth.hero.secondary': 'See How It Works',
        'growth.hero.cred1': '• Paid Media Systems',
        'growth.hero.cred2': '• Funnel Optimization',
        'growth.hero.cred3': '• Data-Driven Performance',
        'growth.dash.revenue': 'Revenue Trajectory',
        'growth.dash.conv': 'Conversion Rate',
        'growth.dash.funnel': 'Funnel Health',
        'growth.dash.kpis': 'KPI Metrics',
        'growth.dash.cac': 'CAC',
        'growth.dash.ltv': 'LTV',
        'growth.dash.roas': 'ROAS',
        'growth.data.card1': '+127% Avg Conversion Growth',
        'growth.data.card2': '4x Funnel Optimization',
        'growth.data.card3': 'Performance-First Marketing Architecture',
        'growth.manifesto.label': 'EXECUTION > CAMPAIGNS',
        'growth.manifesto.title1': 'Marketing without systems is expense.',
        'growth.manifesto.title2': 'Marketing with systems is performance.',
        'growth.manifesto.row1': 'Every channel operates on clear KPIs.',
        'growth.manifesto.row2': 'Every decision is data-driven.',
        'growth.manifesto.row3': 'Every scale phase is controlled.'
    },
    mk: {
        'nav.model': 'Модел',
        'nav.caseStudies': 'Имплементации',
        'nav.services': 'Услуги',
        'nav.about': 'За нас',
        'nav.bookConsultation': 'Закажи консултација',
        'buttons.consultation': 'Контактирај нè',
        'buttons.viewWork': 'Наши проекти',
        'hero.title': 'Дигитализирај го твојот бизнис.',
        'hero.subtitle': 'Биди онлајн. Продавај попаметно. Расти побрзо.',
        'fast.title': 'Брзо лансирање веб-страна',
        'fast.subline': 'Професионално дигитално присуство — испорака за 48–72 часа.',
        'fast.desc': 'Секоја компанија денес мора да има професионално онлајн присуство. Градиме структурирани, мобилно-оптимизирани веб-страни брзо — без компромис во дизајн или идната скалабилност.',
        'fast.bullet1': 'Регулативно усогласена структура',
        'fast.bullet2': 'Чист модерен дизајн',
        'fast.bullet3': 'Мобилно оптимизирана',
        'fast.bullet4': 'SEO-оптимизирана основа',
        'fast.bullet5': 'Подготвена за CRM интеграција подоцна',
        'fast.bullet6': 'Испорака во рок од 3 дена',
        'fast.price': 'ОД 89€',
        'fast.priceNote': 'Финалната цена се дефинира по кратка консултација.',
        'fast.cta': 'Започни лансирање →',
        'scale.title': 'Изградено за скалирање',
        'scale.desc': 'Веб-страната е основата. Кога ќе бидете подготвени, интегрираме CRM системи, автоматизација и интелигентна инфраструктура за раст — без повторна изградба.',
        'scale.module1': 'Веб-страна',
        'scale.module2': 'CRM',
        'scale.module3': 'Автоматизација',
        'chaos.title': 'Од хаос до профит.',
        'chaos.subtitle': 'Кога системот работи, растот станува предвидлив.',
        'chaos.pipe.website': 'Веб-страна',
        'chaos.pipe.leads': 'Лидови',
        'chaos.pipe.crm': 'CRM систем',
        'chaos.pipe.automation': 'Автоматизација',
        'chaos.pipe.reporting': 'Контрола и извештаи',
        'chaos.pipe.profit': '📈 Профит што расте побрзо од трошоците',
        'chaos.footer': 'Системот овозможува раст без хаос, без повеќе вработени и без изгубени клиенти.',
        'transform.title': 'Дигитализација. Структура. Раст.',
        'transform.subtitle': 'Од структура до маркетинг. Сè поврзано во еден систем.',
        'transform.desc': 'Regnum Consulting создава комплетна дигитална основа за развој на бизнисот — од првиот контакт со клиентот до контрола на приходите.\n\nГрадиме веб-страни што генерираат побарувања.\nДизајнираме продажни pipeline процеси.\nИмплементираме CRM системи со целосна видливост.\nАвтоматизираме повторливи задачи.\nЈа подготвуваме структурата за ефективни маркетинг стратегии.\n\nСекој дел е интегриран во една архитектура што овозможува контролирано и скалабилно проширување.',
        'transform.col1.title': 'Дигитализација',
        'transform.col1.desc': 'Градиме веб-страни што генерираат побарувања. Дизајнираме продажни pipeline процеси. Креираме вашата дигитална присуства од основа.',
        'transform.col2.title': 'Структура',
        'transform.col2.desc': 'Имплементираме CRM системи со целосна видливост. Автоматизираме повторливи задачи. Организираме целиот систем за ефикасна работа.',
        'transform.col3.title': 'Раст',
        'transform.col3.desc': 'Маркетингот носи сообраќај. Системот го претвора во профит. Контролиран раст без хаос, без повеќе трошоци.',
        'transform.emphasis': 'Маркетингот носи сообраќај. Системот го претвора во профит.',
        'timeline.title': 'Како го градиме растот',
        'timeline.subline': 'Јасен процес. Прецизна изведба. Контролиран резултат.',
        'timeline.step1.title': 'АНАЛИЗА',
        'timeline.step1.desc': 'Го анализираме моделот на приходи и точките на фрикција.',
        'timeline.step2.title': 'ДИЗАЈН',
        'timeline.step2.desc': 'Ја дефинираме оперативната и продажната структура.',
        'timeline.step3.title': 'ИЗГРАДБА',
        'timeline.step3.desc': 'Имплементираме CRM, автоматизација, веб и AI инфраструктура.',
        'timeline.step4.title': 'СКАЛИРАЊЕ',
        'timeline.step4.desc': 'Го подготвуваме системот за агресивен и контролиран раст.',
        'model.title': 'Регнум Execution Framework™',
        'model.step1.title': 'Дијагностика и анализа',
        'model.step1.desc': 'Го анализираме целиот бизнис модел, продажен тек и точките на губење приход.',
        'model.step2.title': 'Дизајн на структура',
        'model.step2.desc': 'Креираме јасен оперативен и продажен систем со дефинирани процеси.',
        'model.step3.title': 'Техничка имплементација',
        'model.step3.desc': 'Имплементираме CRM, автоматизација и контролни механизми.',
        'model.step4.title': 'Интеграција и синхронизација',
        'model.step4.desc': 'Ги поврзуваме сите алатки во една централизирана инфраструктура.',
        'model.step5.title': 'Оптимизација и скалирање',
        'model.step5.desc': 'Го подготвуваме системот за агресивен и контролиран раст.',
        'case.title': 'Системски имплементации',
        'case1.meta': 'B2B SaaS платформа',
        'case1.title': 'Имплементација на CRM архитектура',
        'case1.label.challenge': 'Инфраструктурен предизвик',
        'case1.desc.challenge': 'Продажниот тим работеше без видливост на pipeline. Неструктурирано следење на зделки преку е-пошта и табели. Неконзистентни протоколи за follow-up. Приходот зависеше од меморијата на поединечни продавачи.',
        'case1.label.system': 'Имплементирана системска архитектура',
        'case1.desc.system': 'Прилагодена HubSpot имплементација со автоматизирано скорирање на лидови, дисциплина на pipeline фази и реално-временски контролни табли за приход. Интегрирана синхронизација на податоци од маркетинг автоматизациска платформа.',
        'case1.label.impact': 'Оперативен ефект',
        'case1.impact1': 'зголемување на стапката на затворање (90 дена по имплементација)',
        'case1.impact2': 'помалку дневно по продавач (автоматизација)',
        'case1.impact3': 'видливост на pipeline низ продажниот тим',
        'case1.view': 'Види цел проект →',
        'case2.meta': 'Професионални услуги',
        'case2.title': 'Инфраструктура за целосна автоматизација',
        'case2.label.challenge': 'Инфраструктурен предизвик',
        'case2.desc.challenge': 'Рачно изготвување понуди (8–12 часа по клиент). Нема стандарден onboarding процес. Податоците за клиенти се расфрлани низ CRM, е-пошта и споделени дискови. Растот на приходот заглави на $2M поради оперативна неефикасност.',
        'case2.label.system': 'Имплементирана системска архитектура',
        'case2.desc.system': 'Автоматизирано креирање понуди со динамични шаблони. E-signature интеграција со DocuSign. Автоматизиран onboarding со распределба на задачи по фази. Централизиран CRM со автоматизирани извештајни табли.',
        'case2.label.impact': 'Оперативен ефект',
        'case2.impact1': 'ARR постигнат без зголемување на тим',
        'case2.impact2': 'време за понуди',
        'case2.impact3': 'заштедени неделно (административни задачи)',
        'case2.view': 'Види цел проект →',
        'case3.meta': 'Е-трговски ентерпрајз',
        'case3.title': 'Обединети податоци и маркетинг автоматизација',
        'case3.label.challenge': 'Инфраструктурен предизвик',
        'case3.desc.challenge': 'Податоците за клиенти се фрагментирани низ 5 платформи. Нема единствен поглед на клиент. Маркетингот и продажбата се неусогласени. Перформансите на кампањите не се мерат.',
        'case3.label.system': 'Имплементирана системска архитектура',
        'case3.desc.system': 'Централизирана платформа за податоци за клиенти со Salesforce интеграција. Автоматизирана сегментација според однесување. Мулти-канална маркетинг автоматизација со реално-временски аналитики.',
        'case3.label.impact': 'Оперативен ефект',
        'case3.impact1': 'раст на вредноста на клиентот (LTV)',
        'case3.impact2': 'зголемување на конверзијата од email кампањи',
        'case3.impact3': 'единствен поглед на клиентот низ сите канали',
        'case3.view': 'Види цел проект →',
        'services.modules.title': 'Услуги',
        'services.modules.subline': 'Комплетна дигитална имплементација — од присуство до автоматизиран профит.',
        'services.modules.note': 'Цените започнуваат од наведениот износ и зависат од комплексноста на проектот.',
        'services.modules.foundation': 'Фондација',
        'services.modules.control': 'Контрола',
        'services.modules.growth': 'Раст',
        'services.title': 'Услуги',
        'services.audit.title': 'Стратешка ревизија',
        'services.audit.desc': 'Длабинска структурна анализа на твојата ИТ инфраструктура, оперативни работни текови и системски зависности. Инженеруваме техничка мапа за одржлив раст.',
        'services.implementation.title': 'Имплементација на систем',
        'services.implementation.desc': 'Целосна архитектурна имплементација: CRM системи, автоматизациска инфраструктура и интегрирани работни текови. Го инженеруваме секој слој — од конфигурација до пуштање — за оперативна стабилност.',
        'services.optimization.title': 'Оперативна оптимизација',
        'services.optimization.desc': 'Континуирано унапредување на имплементираните системи. Следиме перформанс метрики, ја елиминираме оперативната фрикција и ја скалираме инфраструктурата според растот на приходите.',
        'about.title': 'Нашата визија',
        'about.desc': 'Regnum Consulting постои за да ја редефинира начинот на кој компаниите растат во дигиталната ера.\n\nВеруваме дека одржливиот раст не доаѓа од хаотични алатки и импровизација, туку од јасно изградена структура што ги поврзува продажбата, маркетингот, автоматизацијата и интелигентните технологии во еден интегриран систем.\n\nНашата визија е да изградиме бизниси што функционираат со прецизност, контролирано се скалираат и создаваат долгорочна вредност.',
        'cta.title': 'Изгради систем што носи раст.',
        'cta.subline': 'Комплетна дигитална имплементација. Без хаос. Со резултати.',
        'cta.button': 'ЗАКАЖИ КОНСУЛТАЦИЈА',
        'footer.copyright': '© 2026 Regnum Consulting.',
        'footer.link': 'ИТ консалтинг Македонија',
        'modal.title': 'Контактирај нè',
        'modal.desc': 'Поврзете се директно со нас.',
        'modal.whatsapp': 'WhatsApp',
        'modal.viber': 'Viber',
        'modal.call': 'Директен повик',
        'growth.hero.eyebrow': 'ПЕРФОРМАНС МАРКЕТИНГ',
        'growth.hero.title.line1': 'Маркетинг не е кампања.',
        'growth.hero.title.line2': 'Маркетинг е систем за перформанс.',
        'growth.hero.subtitle': 'Дизајнираме и имплементираме performance маркетинг инфраструктура што генерира предвидливи лидови, конверзии и мерлив ROI.',
        'growth.hero.primary': 'Започни перформанс стратегија',
        'growth.hero.secondary': 'Види како работи системот',
        'growth.hero.cred1': '• Paid Media системи',
        'growth.hero.cred2': '• Funnel оптимизација',
        'growth.hero.cred3': '• Data-driven перформанс',
        'growth.dash.revenue': 'Revenue Trajectory',
        'growth.dash.conv': 'Conversion Rate',
        'growth.dash.funnel': 'Funnel Health',
        'growth.dash.kpis': 'KPI Metrics',
        'growth.dash.cac': 'CAC',
        'growth.dash.ltv': 'LTV',
        'growth.dash.roas': 'ROAS',
        'growth.data.card1': '+127% Просечен раст на конверзии',
        'growth.data.card2': '4x Funnel оптимизација',
        'growth.data.card3': 'Performance-first маркетинг архитектура',
        'growth.manifesto.label': 'ИЗВЕДБА > КАМПАЊА',
        'growth.manifesto.title1': 'Маркетинг без систем е трошок.',
        'growth.manifesto.title2': 'Маркетинг со систем е перформанс.',
        'growth.manifesto.row1': 'Секој канал работи со јасен KPI.',
        'growth.manifesto.row2': 'Секоја одлука е data-driven.',
        'growth.manifesto.row3': 'Секое скалирање е контролирано.'
    }
};

// ========== EXTENDED TRANSLATIONS FOR ALL PAGES ==========
Object.assign(translations.en, {
    // Nav dropdown items
    'nav.analiza': 'ANALYSIS',
    'nav.dizajn': 'DESIGN',
    'nav.websites': 'WEBSITES',
    'nav.crm': 'CRM SYSTEMS',
    'nav.automation': 'AUTOMATION',
    'nav.growth': 'MARKETING & PERFORMANCE',
    'nav.ai': 'AI INTEGRATION',
    // Chat widget
    'chat.title': 'Regnum Digital Assistant',
    'chat.subtitle': 'Structured. Fast. Professional.',
    'chat.welcome': 'Welcome to Regnum. How can we help you today?',
    'chat.launch': 'Launch a Website',
    'chat.crm': 'CRM & Automation',
    'chat.pricing': 'Pricing Information',
    'chat.consult': 'Book a Consultation',
    'chat.qualificationQ': 'What is your main problem?',
    'chat.noClients': 'No clients',
    'chat.weakSales': 'Weak sales',
    'chat.noOnline': 'No online presence',
    'chat.wantImprove': 'I want improvement',
    'chat.websiteFor': 'This website is for:',
    'chat.newBusiness': 'New Business',
    'chat.existingCompany': 'Existing Company',
    'chat.ecommerce': 'E-commerce',
    'chat.informational': 'Informational Page',
    'chat.intentQ': 'How fast do you want results?',
    'chat.immediately': 'Immediately',
    'chat.nextMonth': 'Next month',
    'chat.justBrowsing': 'Just browsing',
    'chat.analysisTitle': '\ud83d\udd0d Analysis:',
    'chat.solutionTitle': '\ud83c\udfaf Solution:',
    'chat.priceTitle': '\ud83d\udcb0 Estimate:',
    'chat.benefitTitle': '\u26a1 Result:',
    'chat.socialProof1': '\u2714\ufe0f Worked with 100+ clients',
    'chat.socialProof2': '\u2714\ufe0f Projects: Botanic, Vodenica Mulino',
    'chat.wantFreePlan': 'Do you want a free plan?',
    'chat.yes': 'Yes, I want!',
    'chat.no': 'No, thanks',
    'chat.contactPrompt': 'Leave your phone or email:',
    'chat.placeholder': 'Phone or email',
    'chat.submit': 'Submit',
    'chat.urgencyMsg': '\u23f3 We respond within 15 minutes',
    'chat.thankYou': 'Thank you! We will contact you within 15 minutes.',
    'chat.noThanks': 'No problem! You can always come back. \ud83d\udc4b',
    'chat.validation': 'Enter a valid email or phone number',
    'chat.r.nc.a1': 'No system for attracting clients',
    'chat.r.nc.a2': 'Digital presence not generating leads',
    'chat.r.ws.a1': 'Unstructured sales process',
    'chat.r.ws.a2': 'No automated follow-up',
    'chat.r.no.a1': 'Without web presence = invisibility',
    'chat.r.no.a2': 'Potential clients searching for you online',
    'chat.r.im.a1': 'Current system can be optimized',
    'chat.r.im.a2': 'Room for conversion growth',
    'chat.r.launch.s1': 'Professional website with conversion focus',
    'chat.r.launch.s2': 'SEO optimization + analytics',
    'chat.r.launch.price': '89\u20ac \u2013 499\u20ac',
    'chat.r.crm.s1': 'CRM system for sales management',
    'chat.r.crm.s2': 'Automation of sales processes',
    'chat.r.crm.price': '299\u20ac \u2013 899\u20ac',
    'chat.r.pricing.s1': 'Custom package based on needs',
    'chat.r.pricing.s2': 'Flexible payment options',
    'chat.r.pricing.price': 'Defined after consultation',
    'chat.r.consult.s1': 'Free strategic consultation',
    'chat.r.consult.s2': 'Detailed analysis and plan',
    'chat.r.consult.price': 'Free',
    'chat.r.fast': 'We can start within 24 hours',
    'chat.r.planned': 'Detailed implementation plan ready',
    'chat.r.explore': 'Free analysis sent to your email',
    // Marquee
    'marquee.web': 'WEBSITE FROM \u20AC89',
    'marquee.crm': 'CRM FROM \u20AC299',
    'marquee.auto': 'AUTOMATION FROM \u20AC49',
    'marquee.ai': 'AI INTEGRATION FROM \u20AC149',
    'marquee.marketing': 'MARKETING FROM \u20AC99/MO',
    // Index service cards
    'card.web.title': 'Websites',
    'card.web.desc': 'A professional website that meets regulations and is ready for growth.',
    'card.web.f1': 'Regulatory-compliant structure',
    'card.web.f2': 'Modern minimalist design',
    'card.web.f3': 'Mobile-first execution',
    'card.web.f4': 'SEO-optimized foundation',
    'card.web.price': 'FROM \u20AC89',
    'card.web.priceNote': 'Final offer after consultation.',
    'card.web.btn': 'See more \u2192',
    'card.crm.title': 'CRM Systems',
    'card.crm.desc': 'A system that organizes sales and provides complete visibility.',
    'card.crm.f1': 'Sales pipeline design',
    'card.crm.f2': 'Follow-up automation',
    'card.crm.f3': 'Web and marketing integration',
    'card.crm.f4': 'Centralized control',
    'card.crm.price': 'FROM \u20AC299',
    'card.crm.priceNote': 'Final offer after consultation.',
    'card.crm.btn': 'See more \u2192',
    'card.auto.title': 'Automation',
    'card.auto.desc': 'Elimination of manual processes and operational friction.',
    'card.auto.f1': 'Email automation',
    'card.auto.f2': 'Sales workflows',
    'card.auto.f3': 'Internal system synchronization',
    'card.auto.price': 'FROM \u20AC49',
    'card.auto.priceNote': 'Final offer after consultation.',
    'card.auto.btn': 'See more \u2192',
    'card.growth.title': 'Marketing & Performance',
    'card.growth.desc': 'Traffic generation and systematic result optimization.',
    'card.growth.f1': 'Meta & Google Ads',
    'card.growth.f2': 'Funnel strategy',
    'card.growth.f3': 'Performance reports',
    'card.growth.price': 'FROM \u20AC99 / month',
    'card.growth.priceNote': 'Final offer after consultation.',
    'card.growth.btn': 'See more \u2192',
    'card.ai.title': 'AI Integration',
    'card.ai.desc': 'Intelligent automation integrated into your system.',
    'card.ai.f1': 'AI chatbot',
    'card.ai.f2': 'Lead scoring',
    'card.ai.f3': 'Predictive analytics',
    'card.ai.f4': 'AI reports',
    'card.ai.price': 'FROM \u20AC149',
    'card.ai.priceNote': 'Final offer after consultation.',
    'card.ai.btn': 'See more \u2192',
    // Shared service page elements
    'shared.investLabel': 'Investment starts from',
    'shared.readyNext': 'Ready for the next level?',
    'shared.structureDecides': 'Structure decides how fast you grow.',
    'shared.startCollab': 'Start collaboration',
    'shared.resultsSpeak': 'Results speak for themselves.',
    'shared.caseStudiesSoon': 'Project case studies coming soon.',
    'shared.contactUs': 'Contact us',
    'shared.viewProjects': 'View projects',
    'shared.whatDeliver': 'What we deliver',
    'shared.howWeWork': 'How we work',
    'shared.methodology': 'METHODOLOGY',
    'shared.proofTitle': 'Results speak for themselves.',
    'shared.proofSoon': 'Project case studies coming soon.',
    // Dizajn page
    'dizajn.badge': 'DESIGN',
    'dizajn.h1': 'Branding that<br>creates recognition.',
    'dizajn.subtitle': 'From logo and visual identity<br>to digital systems and branded communication.<br>Design with strategy behind it.',
    'dizajn.strongline': 'Identity \u2192 System \u2192 Consistency \u2192 Recognition.',
    'dizajn.primaryBtn': 'START BRANDING PROJECT',
    'dizajn.secondaryBtn': 'VIEW PORTFOLIO',
    'dizajn.whatTitle': 'What we design',
    'dizajn.whatSub': 'Every visual element is part of a broader brand system.',
    'dizajn.block1.title': 'Brand Identity',
    'dizajn.block1.desc': 'Logo, typography, brand system, brand book.',
    'dizajn.block2.title': 'Packaging & Labels',
    'dizajn.block2.desc': 'Design for products, packaging and print materials.',
    'dizajn.block3.title': 'Apparel & Merch',
    'dizajn.block3.desc': 'T-shirts, uniforms, print graphics and brand applications.',
    'dizajn.block4.title': 'Digital Visual System',
    'dizajn.block4.desc': 'Web visuals, UI elements, graphic system for online presence.',
    'dizajn.block5.title': 'Marketing Materials',
    'dizajn.block5.desc': 'Social media, ads, banners and campaigns.',
    'dizajn.block6.title': 'Corporate Identity',
    'dizajn.block6.desc': 'Business cards, presentations, documentation and brand consistency.',
    'dizajn.statement': 'We don\'t just make graphics.<br>We build visual systems.',
    'dizajn.statementSub': 'Every element we create is part of a larger brand structure.',
    'dizajn.examples': 'A few examples',
    'dizajn.col1.title': 'LOGO',
    'dizajn.col2.title': 'PACKAGING & LABELS',
    'dizajn.col3.title': 'MARKETING MATERIALS',
    'dizajn.ctaTitle': 'Ready for a brand that stands out?',
    'dizajn.ctaBtn': 'Start branding project \u2192',
    // Websites page
    'web.badge': 'WEBSITES',
    'web.h1': 'Websites<br>that convert.',
    'web.subtitle': 'Fast. Optimized. Structured.<br>We build websites designed<br>for performance, not just looks.',
    'web.strongline': 'Design \u2192 Structure \u2192 Optimize \u2192 Convert.',
    'web.investPrice': '89\u20AC',
    'web.primaryBtn': 'START COLLABORATION',
    'web.secondaryBtn': 'VIEW PROJECTS',
    'web.manifesto': 'We don\'t build websites to look pretty.<br>We design <span class="accent-text">digital systems</span>.',
    'web.manifestoSub': 'And we structure the key elements<br>that impact conversion, trust and revenue.',
    'web.pillar1': 'Conversion focus',
    'web.pillar2': 'Structured UX logic',
    'web.pillar3': 'Optimized performance',
    'web.metricsTitle': 'Standards in every website',
    'web.metricsSub': 'Average metrics from our web projects',
    'web.m1.title': 'Performance',
    'web.m1.value': '0.8 - 1.2s',
    'web.m1.desc': 'Load time',
    'web.m1.impact': 'Reduces bounce rate by 35%',
    'web.m2.title': 'Conversion',
    'web.m2.value': '5-12%',
    'web.m2.desc': 'Average rate',
    'web.m2.impact': 'Industry average is 2-3%',
    'web.m3.title': 'SEO',
    'web.m3.value': '98+',
    'web.m3.desc': 'PageSpeed score',
    'web.m3.impact': 'Optimized for search',
    'web.m4.title': 'Growth',
    'web.m4.value': '200-400%',
    'web.m4.desc': 'ROI in first year',
    'web.m4.impact': 'Investment returns in 2-3 months',
    'web.featuresTitle': 'What we offer',
    'web.feat1.title': 'Design',
    'web.feat1.f1': 'Strategic UX/UI design focused on conversions',
    'web.feat1.f2': 'Full optimization for mobile, tablet and desktop',
    'web.feat1.f3': 'Premium visual identity aligned with brand',
    'web.feat1.f4': 'Design that builds trust and authority',
    'web.feat2.title': 'Development',
    'web.feat2.f1': 'Scalable clean code with long-term maintainability',
    'web.feat2.f2': 'Enterprise-grade HTTPS security',
    'web.feat2.f3': 'Fast infrastructure with high performance',
    'web.feat2.f4': 'Regular updates and automatic backups',
    'web.feat3.title': 'SEO',
    'web.feat3.f1': 'Advanced technical SEO architecture',
    'web.feat3.f2': 'Strategically optimized metadata',
    'web.feat3.f3': 'Schema structured data',
    'web.feat3.f4': 'Google Analytics and Search Console integration',
    'web.feat4.title': 'Growth Systems',
    'web.feat4.f1': 'Automated email marketing workflows',
    'web.feat4.f2': 'High-converting lead capture system',
    'web.feat4.f3': 'CRM integration for full sales pipeline',
    'web.feat4.f4': 'Detailed analytics and performance tracking',
    'web.feat5.title': 'Sales Functionality',
    'web.feat5.f1': 'Stripe & PayPal secure payment integration',
    'web.feat5.f2': 'Complete eCommerce system',
    'web.feat5.f3': 'Smart inventory management',
    'web.feat5.f4': 'Automatic invoices and order confirmations',
    'web.feat6.title': 'Support',
    'web.feat6.f1': 'Intuitive admin panel',
    'web.feat6.f2': 'Multi-language configuration',
    'web.feat6.f3': 'Social and marketing integrations',
    'web.feat6.f4': 'Continuous technical support and monitoring',
    'web.d1.title': 'Strategy and structure',
    'web.d1.desc': 'In-depth analysis of the business model, market position and target audience. We build clear information architecture and user flows that directly support conversion and growth.',
    'web.d2.title': 'UX design focused on conversion',
    'web.d2.desc': 'Every page, every element and every CTA is designed based on user behavior and data-driven principles. Focus on clarity, trust and action.',
    'web.d3.title': 'Development with performance optimization',
    'web.d3.desc': 'Clean, modular code and high performance. Fast loading, full responsiveness and testing under real conditions.',
    'web.d4.title': 'SEO foundation',
    'web.d4.desc': 'Technical SEO structure implemented from day one. Semantic HTML, optimized metadata and readiness for organic growth.',
    'web.d5.title': 'Ready for scaling',
    'web.d5.desc': 'Architecture designed for future expansion. Easy integration with CRM, marketing tools and automation systems.',
    'web.d6.title': 'Analytics and continuous optimization',
    'web.d6.desc': 'Implementation of advanced data and user behavior tracking. Continuous analysis and improvement to increase conversion and ROI.',
    'web.step1.title': 'Analysis',
    'web.step1.desc': 'We conduct in-depth analysis of the business model, market and competitive environment. We define KPI metrics, target audience and technical prerequisites before any implementation begins.',
    'web.step2.title': 'Architecture',
    'web.step2.desc': 'We build clear information architecture and user flows optimized for conversion. UX and visual system are designed based on strategy, data and business goals.',
    'web.step3.title': 'Implementation',
    'web.step3.desc': 'We develop a stable, high-performance system with modular structure. We test, optimize and deliver a production-ready solution prepared for scaling and growth.',
    'web.portfolioTitle': 'See a few examples',
    'web.portfolioSub': 'Real projects. Real performance. Click and see.',
    // CRM Systems page
    'crm.badge': 'CRM SYSTEMS',
    'crm.h1': 'A CRM system that manages your entire business.',
    'crm.subtitle': 'Leads. Sales. Products. Automations. Analytics. Webhooks. Import. Export. Control.',
    'crm.strongline': 'Complex system. Intuitive interface.',
    'crm.microline': 'Built for serious businesses that want structure and performance.',
    'crm.investPrice': '299\u20AC',
    'crm.primaryBtn': 'Book CRM Consultation',
    'crm.secondaryBtn': 'Request Demo',
    'crm.pos1': 'We don\'t install software.',
    'crm.pos2': 'We design CRM architecture.',
    'crm.pos3': 'We build sales infrastructure that connects leads, pipeline, products, automations and analytics into one structured system.',
    'crm.pos4': 'Every pipeline is strategically defined.',
    'crm.pos5': 'Every process is standardized.',
    'crm.pos6': 'Every data point is visible, measurable and controllable.',
    'crm.d1.title': 'Custom CRM architecture',
    'crm.d1.desc': 'We design a CRM system built around your sales process, not the other way around. From lead capture to post-sale support \u2014 everything is configured as a single, logical and scalable system.',
    'crm.d2.title': 'Pipeline strategy and control',
    'crm.d2.desc': 'Clearly defined stages, mandatory steps and progression rules. No chaos. No missed deals. Every deal has structure, responsibility and visible status.',
    'crm.d3.title': 'Automation and operational discipline',
    'crm.d3.desc': 'Lead assignment, follow-up logic, notifications and workflow automations. A CRM that works for the team \u2014 not a team that works for the CRM.',
    'crm.d4.title': 'Integrations and Webhooks',
    'crm.d4.desc': 'Connection to websites, payment platforms, marketing tools and external systems. A CRM that communicates with your entire digital infrastructure in real time.',
    'crm.d5.title': 'Reports and performance analytics',
    'crm.d5.desc': 'Custom reports, KPI metrics and sales performance overview. Every data point is accessible. Every decision is based on numbers.',
    'crm.d6.title': 'Migration, import and scaling',
    'crm.d6.desc': 'Structured migration of existing data, import/export logic and architecture prepared for growth. A CRM system that doesn\'t break when the business grows.',
    'crm.step1.title': 'Strategic diagnostics',
    'crm.step1.desc': 'We analyze your current sales ecosystem \u2014 from lead capture to deal closing. We identify structural weaknesses, inefficiencies and revenue loss points. Goal: clear architecture before configuration.',
    'crm.step2.title': 'CRM system architecture',
    'crm.step2.desc': 'We design pipeline logic, stage enforcement rules, automations and integrations as a single coherent system. Every process has structure. Every step has logic. Every data point has a place.',
    'crm.step3.title': 'Implementation and stabilization',
    'crm.step3.desc': 'Configuration, data migration, testing and team training. The system isn\'t just launched \u2014 it\'s stabilized and optimized for real use.',
    // Automation page
    'auto.badge': 'AUTOMATION',
    'auto.h1': 'Automation that eliminates manual work.',
    'auto.subtitle': 'Integrations, workflow logic and process discipline that connect your tools into an automated operational system.',
    'auto.strongline': 'Trigger \u2192 Action \u2192 Sync \u2192 Report.',
    'auto.investPrice': '49\u20AC',
    'auto.primaryBtn': 'Contact Us',
    'auto.secondaryBtn': 'Book Automation',
    'auto.manifesto': 'We don\'t automate chaos.<br>We design <span class="accent-text">structure</span>.',
    'auto.manifestoSub': 'We automate critical processes that impact <span class="accent-text">revenue</span>, <span class="accent-text">speed</span> and <span class="accent-text">control</span>.',
    'auto.pillar1': 'ROI focus',
    'auto.pillar2': 'Tested workflow',
    'auto.pillar3': 'Sustainable architecture',
    'auto.d1.title': 'Process mapping and analysis',
    'auto.d1.desc': 'Identification of repetitive processes, workflow documentation and calculation of potential savings.',
    'auto.d2.title': 'Lead management automation',
    'auto.d2.desc': 'Lead routing, assignment, follow-up sequences, scoring and qualification without manual intervention.',
    'auto.d3.title': 'Documentation and compliance',
    'auto.d3.desc': 'Automatic generation of contracts, invoices, reports. E-signature integrations. Archiving according to policies.',
    'auto.d4.title': 'Cross-system integrations',
    'auto.d4.desc': 'Connecting CRM, email platforms, financial tools, marketing automation. Data synchronization without duplicates.',
    'auto.d5.title': 'Custom automation infrastructure',
    'auto.d5.desc': 'Building custom processes via Zapier, Make, API integrations or custom development.',
    'auto.d6.title': 'Performance & visibility layer',
    'auto.d6.desc': 'Dashboards with KPI metrics, pipeline velocity and conversion tracking. Full visibility of revenue, statuses and performance in real time.',
    'auto.methodEyebrow': 'METHODOLOGY',
    'auto.methodTitle': 'How we structure growth',
    'auto.methodSub': 'Every step has clear logic, execution and a measurable goal.',
    'auto.step1.title': 'Analysis',
    'auto.step1.desc': 'Complete review of operational structure, revenue model, technology infrastructure and organizational processes. Identification of constraints and systemic weaknesses.',
    'auto.step2.title': 'Architecture',
    'auto.step2.desc': 'Designing a growth framework with defined processes, automation layers and reporting system with clear KPI structures. Scalability is planned in advance.',
    'auto.step3.title': 'Implementation',
    'auto.step3.desc': 'Phased execution with continuous oversight. Data-driven corrections, optimization and built-in accountability model. Every step is measurable.',
    // AI Integration page
    'ai.badge': 'AI INTEGRATION',
    'ai.h1': 'AI Integration',
    'ai.subtitle': 'AI automation and intelligent systems for process optimization.',
    'ai.strongline': 'Intelligent solutions for automated efficiency.',
    'ai.investPrice': '149\u20AC',
    'ai.primaryBtn': 'Contact Us',
    'ai.secondaryBtn': 'Learn More',
    'ai.manifesto': 'AI is not magic.<br><span class="accent-text">AI is infrastructure.</span>',
    'ai.manifestoSub': 'We integrate AI into your processes for automated efficiency and predictable growth.',
    'ai.approachLabel': 'Our approach:',
    'ai.pillar1': 'Process analysis',
    'ai.pillar2': 'AI model design',
    'ai.pillar3': 'Controlled integration',
    'ai.deliverTitle': 'AI solutions we integrate',
    'ai.d1.title': 'AI Chat & Automation',
    'ai.d1.desc': 'Intelligent chatbot systems and AI-powered automation for client communication.',
    'ai.d2.title': 'AI Workflow Optimization',
    'ai.d2.desc': 'Process optimization with AI algorithms for increased efficiency.',
    'ai.d3.title': 'AI Data Analysis',
    'ai.d3.desc': 'In-depth analysis with ML models for extracting insights and patterns.',
    'ai.d4.title': 'Predictive Systems',
    'ai.d4.desc': 'Predictive systems for forecast, demand planning and opportunities.',
    'ai.d5.title': 'Custom AI Models',
    'ai.d5.desc': 'Development of custom AI models tailored to your industry.',
    'ai.d6.title': 'AI Process Architecture',
    'ai.d6.desc': 'Design of complete AI infrastructure integrated into your system.',
    'ai.ctaTitle': 'Ready for AI integration?',
    'ai.ctaSub': 'AI systems increase capacity without proportionally increasing costs.',
    'ai.ctaDesc': 'AI systems increase capacity without proportionally increasing costs.',
    // Analiza page
    'analyze.badge': 'ANALYSIS',
    'analyze.h1': 'Analysis that drives<br>clear decisions.',
    'analyze.subtitle': 'Data and process analysis to uncover weak points, growth opportunities and system optimization.',
    'analyze.strongline': 'Diagnose \u2192 Map \u2192 Recommend \u2192 Execute.',
    'analyze.investPrice': '39\u20AC',
    'analyze.primaryBtn': 'REQUEST ANALYSIS',
    'analyze.secondaryBtn': 'SEE AUTOMATION',
    'analyze.manifesto': 'We don\'t assume.<br>We <span class="accent-text">diagnose</span>.',
    'analyze.manifestoSub': 'We analyze critical processes that impact <span class="accent-text">revenue</span>, <span class="accent-text">efficiency</span> and <span class="accent-text">growth</span>.',
    'analyze.pillar1': 'Data-driven',
    'analyze.pillar2': 'Structured approach',
    'analyze.pillar3': 'Actionable recommendations',
    'analyze.deliverTitle': 'What we analyze',
    'analyze.d1.title': 'Business processes',
    'analyze.d1.desc': 'Mapping all operational flows, identifying bottleneck points and inefficiencies in the system.',
    'analyze.d2.title': 'Sales Funnel',
    'analyze.d2.desc': 'Analysis of conversion rates, drop-off points and opportunities for sales process optimization.',
    'analyze.d3.title': 'CRM structure',
    'analyze.d3.desc': 'Review of data architecture, pipeline logic and client management processes.',
    'analyze.d4.title': 'Automation',
    'analyze.d4.desc': 'Identifying manual processes that can be automated to save time and resources.',
    'analyze.d5.title': 'Data infrastructure',
    'analyze.d5.desc': 'Analysis of data quality, cross-system integrations and reporting capabilities.',
    'analyze.d6.title': 'KPI Framework',
    'analyze.d6.desc': 'Defining metrics for performance tracking and creating a baseline for measuring progress.',
    'analyze.methodEyebrow': 'METHODOLOGY',
    'analyze.methodTitle': 'How we structure the process',
    'analyze.methodSub': 'Every step has clear logic, execution and a measurable goal.',
    'analyze.step1.title': 'Diagnostics',
    'analyze.step1.desc': 'Data collection through interviews, documentation and system review. Deep understanding of the current state.',
    'analyze.step2.title': 'Mapping',
    'analyze.step2.desc': 'Process visualization, identifying critical points and improvement opportunities. Detailed system map.',
    'analyze.step3.title': 'Proposed model',
    'analyze.step3.desc': 'Clear roadmap with priorities, KPI structure and system recommendations for implementation. Action plan.',
    'analyze.resultsTitle': 'What you get',
    'analyze.r1.title': 'Clear Roadmap',
    'analyze.r1.desc': 'Prioritized action plan with defined steps, timelines and expected results.',
    'analyze.r2.title': 'KPI Structure',
    'analyze.r2.desc': 'Defined metrics for measuring success, baseline values and targets for tracking progress.',
    'analyze.r3.title': 'System Recommendations',
    'analyze.r3.desc': 'Concrete recommendations for technology, processes and structure based on the analysis.',
    'analyze.ctaTitle': 'Ready for a clear picture?',
    'analyze.ctaSub': 'Analysis is the first step towards structured growth.',
    'analyze.ctaDesc': 'Analysis is the first step towards structured growth.',
    'analyze.ctaBtn': 'Start analysis',
    // Growth page (remaining)
    'growth.deliver.eyebrow': 'EXECUTION MODULES',
    'growth.deliver.title': 'What we actually deliver',
    'growth.deliver.subtext': 'Every module is part of an integrated performance marketing system.<br>Every channel, budget and metric works in sync.',
    'growth.m1.title': 'Performance audit',
    'growth.m1.desc': 'In-depth analysis of existing channels,<br>ad accounts and funnel structure.<br>Identification of CPA, ROAS and conversion gaps.',
    'growth.m2.title': 'Paid media architecture',
    'growth.m2.desc': 'Structuring Meta, Google and other platforms<br>with clear scaling logic, budget control<br>and audience segmentation.',
    'growth.m3.title': 'Funnel optimization',
    'growth.m3.desc': 'Optimization of landing pages, conversion flow<br>and structured A/B testing<br>to increase CR and LTV.',
    'growth.m4.title': 'Tracking infrastructure',
    'growth.m4.desc': 'Implementation of pixel, server-side tracking,<br>event mapping and clean attribution logic.',
    'growth.m5.title': 'Performance optimization system',
    'growth.m5.desc': 'Continuous optimization, weekly KPI analysis<br>and data-driven budget decisions.',
    'growth.m6.title': 'Automation & scaling system',
    'growth.m6.desc': 'Reporting automation,<br>rule-based optimization and controlled<br>campaign scaling.',
    'growth.processTitle': 'How we structure performance marketing',
    'growth.processSub': 'Clear process. Measurable KPIs. Controlled scaling.',
    'growth.step1.title': 'Performance analysis',
    'growth.step1.desc': 'In-depth review of ad accounts, channels, funnel structure and identification of CPA, ROAS and conversion gaps.',
    'growth.step2.title': 'System structuring',
    'growth.step2.desc': 'Design of paid media architecture, tracking infrastructure and optimization logic with clear KPI models.',
    'growth.step3.title': 'Implementation and optimization',
    'growth.step3.desc': 'Phased launch and scaling with continuous data analysis, budget optimization and performance oversight.',
    // Growth Strategy page
    'gs.h1': 'Growth strategy based on structure.',
    'gs.subtitle': 'We don\'t make plans. We build systems that execute.',
    'gs.primaryBtn': 'Contact us',
    'gs.secondaryBtn': 'View projects',
    'gs.pos1': 'We don\'t write PowerPoint presentations.',
    'gs.pos2': 'We build operational infrastructure that enables scaling.',
    'gs.pos3': 'Every strategy is executable. Every plan has metrics. Every system is sustainable.',
    'gs.d1.title': 'Structural review',
    'gs.d1.desc': 'In-depth analysis of current operational architecture, identification of bottlenecks and growth blockers.',
    'gs.d2.title': 'Revenue architecture design',
    'gs.d2.desc': 'Building a sales model that supports target revenue goals with predictable unit economics.',
    'gs.d3.title': 'Operational scaling roadmap',
    'gs.d3.desc': '90-day execution plan with clear milestones, ownership and success criteria for each phase.',
    'gs.d4.title': 'Technology architecture',
    'gs.d4.desc': 'Selection and implementation of tech stack that supports growth goals without technical friction.',
    'gs.d5.title': 'Performance framework',
    'gs.d5.desc': 'System for tracking growth metrics, quarterly reviews and continuous optimization.',
    'gs.step1.title': 'Analysis',
    'gs.step1.desc': 'Complete review of current operations, revenue model, technology infrastructure and team structure.',
    'gs.step2.title': 'Architecture',
    'gs.step2.desc': 'We design a growth framework with exact processes, systems, automation and reporting that enable scaling.',
    'gs.step3.title': 'Implementation',
    'gs.step3.desc': 'Phased execution with continuous oversight, data-based corrections and built-in accountability.',
    // Lead Generation page
    'lg.h1': 'Lead generation systems that work.',
    'lg.subtitle': 'We don\'t buy lists. We engineer channels.',
    'lg.primaryBtn': 'Contact us',
    'lg.secondaryBtn': 'View projects',
    'lg.pos1': 'We don\'t spend money on ads without structure.',
    'lg.pos2': 'We build systems that generate leads predictably.',
    'lg.pos3': 'Every campaign is tested. Every channel is measurable. Every lead has value.',
    'lg.d1.title': 'Lead funnel architecture',
    'lg.d1.desc': 'We design the complete flow from cold audience to qualified lead ready for sales.',
    'lg.d2.title': 'Multi-channel strategy',
    'lg.d2.desc': 'LinkedIn, Google, Meta, email outreach. Every channel is optimized for your industry and audience.',
    'lg.d3.title': 'Qualification system',
    'lg.d3.desc': 'Lead scoring model that automatically ranks leads by potential value and readiness.',
    'lg.d4.title': 'Performance tracking',
    'lg.d4.desc': 'Real-time reports with exact cost per lead, conversion and ROI for each channel.',
    'lg.d5.title': 'CRM integration',
    'lg.d5.desc': 'Automatic lead entry into CRM with full history, tagging and activity tracking.',
    'lg.step1.title': 'Analysis',
    'lg.step1.desc': 'We identify target personas, channels with highest potential and competitive position.',
    'lg.step2.title': 'Architecture',
    'lg.step2.desc': 'We build campaign structure, landing pages, automated follow-up sequences and tracking systems.',
    'lg.step3.title': 'Implementation',
    'lg.step3.desc': 'We launch, measure, optimize. Continuous testing until target metrics are achieved.',
    // Reporting page
    'rpt.h1': 'Reporting systems that make growth visible.',
    'rpt.subtitle': 'Real-time data. Strategic decisions.',
    'rpt.primaryBtn': 'Contact us',
    'rpt.secondaryBtn': 'View projects',
    'rpt.pos1': 'We don\'t make fancy charts.',
    'rpt.pos2': 'We build intelligence systems that show what works and what doesn\'t.',
    'rpt.pos3': 'Every dashboard is focused. Every metric is relevant. Every report leads to action.',
    'rpt.d1.title': 'Real-time dashboards',
    'rpt.d1.desc': 'Visualization of critical metrics: revenue pipeline, customer acquisition cost, LTV, conversion rates.',
    'rpt.d2.title': 'Executive reporting',
    'rpt.d2.desc': 'Automated weekly/monthly reports with trends, anomalies and recommendations for the management team.',
    'rpt.d3.title': 'Team performance tracking',
    'rpt.d3.desc': 'Individual and team performance metrics. Activity tracking. Target vs actual analysis.',
    'rpt.d4.title': 'Forecast models',
    'rpt.d4.desc': 'Predictive models based on historical data for accurate revenue forecasting.',
    'rpt.d5.title': 'Data integration infrastructure',
    'rpt.d5.desc': 'Connecting all data sources into one centralized reporting platform.',
    'rpt.step1.title': 'Analysis',
    'rpt.step1.desc': 'We define which metrics are critical for the business, what decisions need to be made and what data is needed.',
    'rpt.step2.title': 'Architecture',
    'rpt.step2.desc': 'We design data flow, dashboard structure and automated reporting processes.',
    'rpt.step3.title': 'Implementation',
    'rpt.step3.desc': 'We build dashboards, set up alerts, train team on data interpretation.',
    // IT Consulting Macedonia page
    'itc.h1': 'IT Consulting & Systems Engineering.<br>North Macedonia.',
    'itc.subtitle': 'Architecting digital infrastructure for Macedonian enterprises. CRM systems, SaaS platforms, automation architecture, and technology transformation.',
    'itc.primaryBtn': 'Request Strategic Consultation',
    'itc.secondaryBtn': 'View Case Studies',
    'itc.introTitle': 'Your Infrastructure Determines Your Ceiling.',
    'itc.introP1': 'Many businesses in North Macedonia operate on disconnected systems, underutilized CRM platforms, and manual workflows that restrict scalability. When infrastructure is weak, growth becomes inefficient and unpredictable.',
    'itc.introP2': 'Regnum Consulting is a North Macedonia–based IT consulting firm specializing in digital infrastructure, CRM architecture, automation systems, and scalable operational frameworks. We design structured ecosystems that align technology with revenue strategy.',
    'itc.introP3': 'As an IT consulting North Macedonia partner, we build systems engineered for performance, visibility, and long-term scale — eliminating operational friction and preventing future technical debt.',
    'itc.servicesTitle': 'Our IT Consulting Services',
    'itc.s1.title': 'Website & Landing Page Development',
    'itc.s1.desc': 'Professional web development that converts visitors into customers. We build fast, responsive websites optimized for both user experience and search engines. Every site is custom-designed to reflect your brand and architected for performance. From corporate websites to high-converting landing pages, we create digital storefronts that represent your business professionally and drive measurable results.',
    'itc.s2.title': 'CRM System Implementation',
    'itc.s2.desc': 'Customer Relationship Management systems that bring clarity to your sales process. We implement and customize platforms like HubSpot, Salesforce, and Pipedrive, configuring them specifically for your business model. Custom pipelines, automated workflows, lead scoring, and real-time reporting—everything your team needs to manage relationships at scale. Our CRM consulting Macedonia services ensure your system grows with your business.',
    'itc.s3.title': 'Custom SaaS Development',
    'itc.s3.desc': 'Software-as-a-Service solutions built for your specific business requirements. Whether you need an internal tool to streamline operations or a customer-facing platform to deliver services, we architect and develop scalable SaaS applications. Cloud-native architecture, secure authentication, subscription management, and seamless integrations with your existing systems. SaaS development Macedonia expertise that turns complex requirements into elegant solutions.',
    'itc.s4.title': 'Automation & Workflow Systems',
    'itc.s4.desc': 'Intelligent automation that eliminates repetitive tasks and reduces human error. We design workflow systems that connect your tools, automate data entry, trigger follow-ups, and keep your team focused on high-value activities. From simple email sequences to complex multi-step business processes, we build automation layers that run your operations on autopilot.',
    'itc.s5.title': 'Business Process Optimization',
    'itc.s5.desc': 'Strategic analysis and redesign of your operational workflows. We map your current processes, identify inefficiencies, and implement structured improvements. This isn\'t just about technology—it\'s about aligning people, processes, and systems to create predictable, scalable operations. Digital consulting Macedonia services that transform how your business operates.',
    'itc.capTitle': 'Engineering Capabilities',
    'itc.capIntro': 'We combine strategic consulting with senior-level technical execution. Our engineers architect scalable IT infrastructure that maintains performance and reliability as your business grows. From frontend optimization to backend deployment, we engineered every layer of your digital architecture.',
    'itc.cap1.title': 'Frontend Engineering',
    'itc.cap1.desc': 'We architect responsive, high-performance user interfaces that convert visitors into customers. Modern frontend development requires strategic decisions about frameworks, performance optimization, and accessibility. We optimize every pixel and interaction, building interfaces that scale from mobile to enterprise deployments.',
    'itc.cap2.title': 'Backend & Infrastructure',
    'itc.cap2.desc': 'Robust backend systems are the foundation of scalable IT infrastructure. We design and deploy APIs that handle growth, databases optimized for your access patterns, and server architecture that maintains uptime. Whether you need REST APIs, GraphQL, or real-time systems, we architect backend solutions that support sustainable scaling.',
    'itc.cap3.title': 'CRM & Automation Systems',
    'itc.cap3.desc': 'CRM implementation extends beyond platform selection. We architect custom CRM solutions integrated with your business workflows. Our approach combines native CRM capabilities with custom automation, building systems that eliminate manual processes and create predictable revenue operations. This is IT infrastructure purpose-built for sales teams.',
    'itc.cap4.title': 'DevOps & Deployment',
    'itc.cap4.desc': 'Modern IT infrastructure requires automated deployment, monitoring, and scalability. We engineer CI/CD pipelines that deliver code reliably, containerize applications for portability, and implement monitoring that keeps systems running. Every deployment is architected for safety, speed, and observability.',
    'itc.clientsTitle': 'Who We Work With',
    'itc.clientsIntro': 'Our IT consulting North Macedonia practice serves businesses across multiple industries, from early-stage startups to established enterprises ready to modernize their operations.',
    'itc.cl1.title': 'Local SMEs',
    'itc.cl1.desc': 'Small and medium businesses scaling beyond manual processes',
    'itc.cl2.title': 'E-commerce Businesses',
    'itc.cl2.desc': 'Online retailers building integrated sales infrastructure',
    'itc.cl3.title': 'Digital Agencies',
    'itc.cl3.desc': 'Marketing agencies implementing client management systems',
    'itc.cl4.title': 'Growing Tech Startups',
    'itc.cl4.desc': 'Technology companies building scalable product foundations',
    'itc.cl5.title': 'Service-Based Companies',
    'itc.cl5.desc': 'Professional services firms automating delivery workflows',
    'itc.modelTitle': 'The Regnum Infrastructure Model™',
    'itc.modelIntro': 'Our structured approach to digital transformation ensures every project delivers measurable business value. This is how we turn technology investments into competitive advantages.',
    'itc.ph1.title': '01 — Analysis',
    'itc.ph1.desc': 'Deep-dive assessment of your current systems, workflows, and business objectives. We document existing processes, identify bottlenecks, and map the customer journey from first contact to delivery.',
    'itc.ph2.title': '02 — Architecture',
    'itc.ph2.desc': 'Strategic system design that aligns technology with business goals. We create detailed technical specifications, data models, and integration blueprints before writing a single line of code.',
    'itc.ph3.title': '03 — Implementation',
    'itc.ph3.desc': 'Hands-on development and configuration of your systems. Whether it\'s CRM setup, custom software development, or automation workflows, we build solutions that match the exact requirements defined in the architecture phase.',
    'itc.ph4.title': '04 — Optimization',
    'itc.ph4.desc': 'Continuous refinement based on real-world usage and performance data. We monitor key metrics, gather team feedback, and make iterative improvements to ensure your systems evolve with your business needs.',
    'itc.whyTitle': 'Why Macedonian Companies Choose Regnum',
    'itc.b1.title': 'Strategic Planning Before Execution',
    'itc.b1.desc': 'We don\'t jump straight into development. Every project begins with strategic analysis to understand your business model, competitive landscape, and growth objectives. Technology decisions are made based on business outcomes, not trends.',
    'itc.b2.title': 'Technical Execution That Delivers',
    'itc.b2.desc': 'Our team combines business consulting expertise with hands-on technical skills. We don\'t just advise—we build, configure, and implement. From database architecture to user interface design, we handle the full spectrum of digital infrastructure development.',
    'itc.b3.title': 'Business-Focused Solutions',
    'itc.b3.desc': 'Technology for technology\'s sake doesn\'t interest us. Every system we build is designed to solve a specific business problem: increase conversion rates, reduce operational costs, improve customer retention, or accelerate sales cycles. We measure success in business metrics, not technical specifications.',
    'itc.b4.title': 'Scalable Systems Architecture',
    'itc.b4.desc': 'The infrastructure we build today needs to support your business three years from now. We architect systems with scalability built in from day one—databases that handle growth, APIs that support integrations, and workflows that adapt to changing requirements.',
    'itc.b5.title': 'Long-Term Growth Infrastructure',
    'itc.b5.desc': 'Quick fixes create technical debt. We build foundations that support sustainable growth. Whether it\'s a CRM that centralizes customer data or automation that eliminates manual tasks, our solutions create lasting competitive advantages that compound over time.',
    'itc.ctaTitle': 'Looking for IT Consulting in North Macedonia?',
    'itc.ctaDesc': 'Let\'s discuss how structured digital infrastructure can transform your business operations and support scalable growth.',
    'itc.ctaBtn': 'Book Strategic Consultation'
});

Object.assign(translations.mk, {
    // Nav dropdown items
    'nav.analiza': 'АНАЛИЗА',
    'nav.dizajn': 'ДИЗАЈН',
    'nav.websites': 'ВЕБ-СТРАНИ',
    'nav.crm': 'CRM СИСТЕМИ',
    'nav.automation': 'АВТОМАТИЗАЦИЈА',
    'nav.growth': 'МАРКЕТИНГ И ПЕРФОРМАНСИ',
    'nav.ai': 'AI ИНТЕГРАЦИЈА',
    // Chat widget
    'chat.title': 'Regnum Дигитален асистент',
    'chat.subtitle': 'Структурирано. Брзо. Професионално.',
    'chat.welcome': 'Добредојдовте во Regnum. Како можеме да помогнеме денес?',
    'chat.launch': 'Лансирај веб-страна',
    'chat.crm': 'CRM и автоматизација',
    'chat.pricing': 'Информации за цени',
    'chat.consult': 'Закажи консултација',
    'chat.qualificationQ': 'Кој ти е главниот проблем?',
    'chat.noClients': 'Нема клиенти',
    'chat.weakSales': 'Слаба продажба',
    'chat.noOnline': 'Немам online присуство',
    'chat.wantImprove': 'Сакам подобрување',
    'chat.websiteFor': 'Оваа веб-страна е за:',
    'chat.newBusiness': 'Нов бизнис',
    'chat.existingCompany': 'Постоечка компанија',
    'chat.ecommerce': 'Е-трговија',
    'chat.informational': 'Информативна страница',
    'chat.intentQ': 'Колку брзо сакаш резултат?',
    'chat.immediately': 'Веднаш',
    'chat.nextMonth': 'Во нареден месец',
    'chat.justBrowsing': 'Само разгледувам',
    'chat.analysisTitle': '\ud83d\udd0d Анализа:',
    'chat.solutionTitle': '\ud83c\udfaf Решение:',
    'chat.priceTitle': '\ud83d\udcb0 Проценка:',
    'chat.benefitTitle': '\u26a1 Резултат:',
    'chat.socialProof1': '\u2714\ufe0f Работено со 100+ клиенти',
    'chat.socialProof2': '\u2714\ufe0f Проекти: Botanic, Vodenica Mulino',
    'chat.wantFreePlan': 'Дали сакаш бесплатен план?',
    'chat.yes': 'Да, сакам!',
    'chat.no': 'Не, благодарам',
    'chat.contactPrompt': 'Остави телефон или е-пошта:',
    'chat.placeholder': 'Телефон или е-пошта',
    'chat.submit': 'Испрати',
    'chat.urgencyMsg': '\u23f3 Одговараме во рок од 15 минути',
    'chat.thankYou': 'Ви благодариме! Ќе ве контактираме во рок од 15 минути.',
    'chat.noThanks': 'Нема проблем! Секогаш можеш да се вратиш. \ud83d\udc4b',
    'chat.validation': 'Внесете валидна е-пошта или телефонски број',
    'chat.r.nc.a1': 'Немате систем за привлекување клиенти',
    'chat.r.nc.a2': 'Дигиталното присуство не генерира leads',
    'chat.r.ws.a1': 'Неструктуриран продажен процес',
    'chat.r.ws.a2': 'Нема автоматизиран follow-up',
    'chat.r.no.a1': 'Без веб-присуство = невидливост',
    'chat.r.no.a2': 'Потенцијалните клиенти ве бараат online',
    'chat.r.im.a1': 'Постојниот систем може да се оптимизира',
    'chat.r.im.a2': 'Има простор за раст на конверзија',
    'chat.r.launch.s1': 'Професионална веб-страна со фокус на конверзија',
    'chat.r.launch.s2': 'SEO оптимизација + аналитика',
    'chat.r.launch.price': '89\u20ac \u2013 499\u20ac',
    'chat.r.crm.s1': 'CRM систем за управување со продажба',
    'chat.r.crm.s2': 'Автоматизација на продажни процеси',
    'chat.r.crm.price': '299\u20ac \u2013 899\u20ac',
    'chat.r.pricing.s1': 'Прилагоден пакет според потреби',
    'chat.r.pricing.s2': 'Флексибилни опции за плаќање',
    'chat.r.pricing.price': 'Се дефинира по консултација',
    'chat.r.consult.s1': 'Бесплатна стратешка консултација',
    'chat.r.consult.s2': 'Детална анализа и план',
    'chat.r.consult.price': 'Бесплатно',
    'chat.r.fast': 'Можеме да стартуваме за 24 часа',
    'chat.r.planned': 'Детален план за имплементација подготвен',
    'chat.r.explore': 'Бесплатна анализа испратена на вашиот email',
    // Marquee
    'marquee.web': 'ВЕБ-САЈТ ОД 89\u20AC',
    'marquee.crm': 'CRM ОД 299\u20AC',
    'marquee.auto': 'АВТОМАТИЗАЦИЈА ОД 49\u20AC',
    'marquee.ai': 'AI ИНТЕГРАЦИЈА ОД 149\u20AC',
    'marquee.marketing': 'МАРКЕТИНГ ОД 99\u20AC/МЕС',
    // Index service cards
    'card.web.title': 'Веб-страни',
    'card.web.desc': 'Професионална веб-страна што ги исполнува регулативите и е подготвена за раст.',
    'card.web.f1': 'Регулативно усогласена структура',
    'card.web.f2': 'Модерен минималистички дизајн',
    'card.web.f3': 'Mobile-first изведба',
    'card.web.f4': 'SEO-оптимизирана основа',
    'card.web.price': 'ОД 89\u20AC',
    'card.web.priceNote': 'Финална понуда по консултација.',
    'card.web.btn': 'Види повеќе \u2192',
    'card.crm.title': 'CRM Системи',
    'card.crm.desc': 'Систем што ја организира продажбата и дава целосна видливост.',
    'card.crm.f1': 'Дизајн на продажен pipeline',
    'card.crm.f2': 'Автоматизација на follow-up',
    'card.crm.f3': 'Интеграција со веб и маркетинг',
    'card.crm.f4': 'Централизирана контрола',
    'card.crm.price': 'ОД 299\u20AC',
    'card.crm.priceNote': 'Финална понуда по консултација.',
    'card.crm.btn': 'Види повеќе \u2192',
    'card.auto.title': 'Автоматизација',
    'card.auto.desc': 'Елиминација на рачни процеси и оперативна фрикција.',
    'card.auto.f1': 'Email автоматизација',
    'card.auto.f2': 'Продажни работни текови',
    'card.auto.f3': 'Внатрешна системска синхронизација',
    'card.auto.price': 'ОД 49\u20AC',
    'card.auto.priceNote': 'Финална понуда по консултација.',
    'card.auto.btn': 'Види повеќе \u2192',
    'card.growth.title': 'Маркетинг и перформанси',
    'card.growth.desc': 'Генерирање сообраќај и систематска оптимизација на резултати.',
    'card.growth.f1': 'Meta и Google Ads',
    'card.growth.f2': 'Funnel стратегија',
    'card.growth.f3': 'Извештаи за перформанси',
    'card.growth.price': 'ОД 99\u20AC / месечно',
    'card.growth.priceNote': 'Финална понуда по консултација.',
    'card.growth.btn': 'Види повеќе \u2192',
    'card.ai.title': 'AI Интеграција',
    'card.ai.desc': 'Интелигентна автоматизација интегрирана во вашиот систем.',
    'card.ai.f1': 'AI четбот',
    'card.ai.f2': 'Скорирање на лидови',
    'card.ai.f3': 'Предиктивна аналитика',
    'card.ai.f4': 'AI извештаи',
    'card.ai.price': 'ОД 149\u20AC',
    'card.ai.priceNote': 'Финална понуда по консултација.',
    'card.ai.btn': 'Види повеќе \u2192',
    // Shared service page elements
    'shared.investLabel': 'Инвестиција започнува од',
    'shared.readyNext': 'Подготвени за следното ниво?',
    'shared.structureDecides': 'Структурата одлучува колку брзо ќе растеш.',
    'shared.startCollab': 'Започни соработка',
    'shared.resultsSpeak': 'Резултатите зборуваат сами.',
    'shared.caseStudiesSoon': 'Проектни студии на случај доаѓаат наскоро.',
    'shared.contactUs': 'Контактирај нè',
    'shared.viewProjects': 'Погледни проекти',
    'shared.whatDeliver': 'Што испорачуваме',
    'shared.howWeWork': 'Како работиме',
    'shared.methodology': 'МЕТОДОЛОГИЈА',
    'shared.proofTitle': 'Резултатите зборуваат сами.',
    'shared.proofSoon': 'Проектни студии на случај доаѓаат наскоро.',
    // Dizajn page
    'dizajn.badge': 'ДИЗАЈН',
    'dizajn.h1': 'Брендинг што<br>создава препознатливост.',
    'dizajn.subtitle': 'Од лого и визуелен идентитет<br>до дигитални системи и брендирана комуникација.<br>Дизајн што има стратегија зад себе.',
    'dizajn.strongline': 'Identity \u2192 System \u2192 Consistency \u2192 Recognition.',
    'dizajn.primaryBtn': 'ЗАПОЧНИ БРЕНДИНГ ПРОЕКТ',
    'dizajn.secondaryBtn': 'ПОГЛЕДНИ ПОРТФОЛИО',
    'dizajn.whatTitle': 'Што дизајнираме',
    'dizajn.whatSub': 'Секој визуелен елемент е дел од поширок бренд систем.',
    'dizajn.block1.title': 'Бренд Идентитет',
    'dizajn.block1.desc': 'Лого, типографија, бренд систем, brand book.',
    'dizajn.block2.title': 'Пакување и Етикети',
    'dizajn.block2.desc': 'Дизајн за производи, амбалажа и печатни материјали.',
    'dizajn.block3.title': 'Облека и Мерч',
    'dizajn.block3.desc': 'T-shirts, униформи, печатни графики и бренд апликации.',
    'dizajn.block4.title': 'Дигитален Визуелен Систем',
    'dizajn.block4.desc': 'Web визуали, UI елементи, графички систем за онлајн присуство.',
    'dizajn.block5.title': 'Маркетинг Материјали',
    'dizajn.block5.desc': 'Социјални мрежи, реклами, банери и кампањи.',
    'dizajn.block6.title': 'Корпоративен Идентитет',
    'dizajn.block6.desc': 'Визитки, презентации, документација и бренд доследност.',
    'dizajn.statement': 'Ние не правиме само графика.<br>Градиме визуелен систем.',
    'dizajn.statementSub': 'Секој елемент што го креираме е дел од поголема бренд структура.',
    'dizajn.examples': 'Неколку примери',
    'dizajn.col1.title': 'LOGO',
    'dizajn.col2.title': 'ПАКУВАЊЕ И ЕТИКЕТИ',
    'dizajn.col3.title': 'МАРКЕТИНГ МАТЕРИЈАЛИ',
    'dizajn.ctaTitle': 'Подготвени за бренд што се издвојува?',
    'dizajn.ctaBtn': 'Започни брендинг проект \u2192',
    // Websites page
    'web.badge': 'ВЕБ-СТРАНИ',
    'web.h1': 'Веб-страници<br>што конвертираат.',
    'web.subtitle': 'Брзи. Оптимизирани. Структурирани.<br>Градиме веб-страници дизајнирани<br>за перформанс, не само за изглед.',
    'web.strongline': 'Design \u2192 Structure \u2192 Optimize \u2192 Convert.',
    'web.investPrice': '89\u20AC',
    'web.primaryBtn': 'ПОЧНИ СОРАБОТКА',
    'web.secondaryBtn': 'ПОГЛЕДНИ ПРОЕКТИ',
    'web.manifesto': 'Ние не градиме веб-страни за да изгледаат убаво.<br>Ние дизајнираме <span class="accent-text">дигитални системи</span>.',
    'web.manifestoSub': 'И ги структурираме клучните елементи<br>што влијаат на конверзија, доверба и приход.',
    'web.pillar1': 'Конверзија фокус',
    'web.pillar2': 'Структурирана UX логика',
    'web.pillar3': 'Оптимизиран перформанс',
    'web.metricsTitle': 'Стандарди во секоја веб-страна',
    'web.metricsSub': 'Просечни метрики од нашите веб проекти',
    'web.m1.title': 'Перформанса',
    'web.m1.value': '0.8 - 1.2s',
    'web.m1.desc': 'Време за вчитување',
    'web.m1.impact': 'Го намалува bounce rate за 35%',
    'web.m2.title': 'Конверзија',
    'web.m2.value': '5-12%',
    'web.m2.desc': 'Просечна стапка',
    'web.m2.impact': 'Индустриски просек е 2-3%',
    'web.m3.title': 'SEO',
    'web.m3.value': '98+',
    'web.m3.desc': 'PageSpeed скор',
    'web.m3.impact': 'Оптимизирано за пребарување',
    'web.m4.title': 'Раст',
    'web.m4.value': '200-400%',
    'web.m4.desc': 'ROI во прва година',
    'web.m4.impact': 'Инвестицијата се враќа во 2-3 месеца',
    'web.featuresTitle': 'Што нудиме',
    'web.feat1.title': 'Дизајн',
    'web.feat1.f1': 'Стратешки UX/UI дизајн фокусиран на конверзии',
    'web.feat1.f2': 'Целосна оптимизација за мобилни, таблет и десктоп уреди',
    'web.feat1.f3': 'Премиум визуелен идентитет усогласен со брендот',
    'web.feat1.f4': 'Дизајн кој гради доверба и авторитет',
    'web.feat2.title': 'Развој',
    'web.feat2.f1': 'Скалибилен и чист код со долгорочна одржливост',
    'web.feat2.f2': 'Enterprise-grade HTTPS безбедност',
    'web.feat2.f3': 'Брза инфраструктура со високи перформанси',
    'web.feat2.f4': 'Редовни ажурирања и автоматски бекапи',
    'web.feat3.title': 'SEO',
    'web.feat3.f1': 'Напредна техничка SEO архитектура',
    'web.feat3.f2': 'Стратешки оптимизирани мета податоци',
    'web.feat3.f3': 'Schema структурирани податоци',
    'web.feat3.f4': 'Интеграција со Google Analytics и Search Console',
    'web.feat4.title': 'Растови системи',
    'web.feat4.f1': 'Автоматизирани email маркетинг флоу процеси',
    'web.feat4.f2': 'Високо-конвертирачки lead capture систем',
    'web.feat4.f3': 'CRM интеграција за целосен sales pipeline',
    'web.feat4.f4': 'Детална аналитика и performance tracking',
    'web.feat5.title': 'Продажна функционалност',
    'web.feat5.f1': 'Stripe & PayPal сигурна платежна интеграција',
    'web.feat5.f2': 'Комплетен eCommerce систем',
    'web.feat5.f3': 'Паметно управување со инвентар',
    'web.feat5.f4': 'Автоматски фактури и потврди за нарачки',
    'web.feat6.title': 'Поддршка',
    'web.feat6.f1': 'Интуитивен админ панел',
    'web.feat6.f2': 'Мултијазична конфигурација',
    'web.feat6.f3': 'Социјални и маркетинг интеграции',
    'web.feat6.f4': 'Континуирана техничка поддршка и мониторинг',
    'web.d1.title': 'Стратегија и структура',
    'web.d1.desc': 'Длабинска анализа на бизнис моделот, пазарната позиција и целната публика. Градиме јасна информациска архитектура и кориснички флоу кои директно поддржуваат конверзија и раст.',
    'web.d2.title': 'UX дизајн со фокус на конверзија',
    'web.d2.desc': 'Секоја страница, секој елемент и секој CTA е дизајниран врз база на охнесување на корисници и data-driven принципи. Фокус на јасност, доверба и акција.',
    'web.d3.title': 'Развој со перформанс оптимизација',
    'web.d3.desc': 'Чист, модуларен код и високи перформанси. Брзо вчитување, целосна респонзивност и тестирање под реални оптоварувања.',
    'web.d4.title': 'SEO основа',
    'web.d4.desc': 'Техничка SEO структура имплементирана од првиот ден. Семантички HTML, оптимизирани мета податоци и подготвеност за органски раст.',
    'web.d5.title': 'Подготвено за скалирање',
    'web.d5.desc': 'Архитектура дизајнирана за идно проширување. Лесна интеграција со CRM, маркетинг алатки и автоматизациски системи.',
    'web.d6.title': 'Аналитика и континуирана оптимизација',
    'web.d6.desc': 'Имплементација на напредно следење на податоци и корисничко однесување. Континуирана анализа и подобрување со цел зголемување на конверзија и ROI.',
    'web.step1.title': 'Анализа',
    'web.step1.desc': 'Спроведуваме длабинска анализа на бизнис моделот, пазарот и конкурентската средина. Ги дефинираме KPI метриките, целната публика и техничките предуслови пред да започне було каква имплементација.',
    'web.step2.title': 'Архитектура',
    'web.step2.desc': 'Градиме јасна информациска архитектура и кориснички флоу оптимизирани за конверзија. UX и визуелниот систем се дизајнираат врз база на стратегија, податоци и бизнис цели.',
    'web.step3.title': 'Имплементација',
    'web.step3.desc': 'Развиваме стабилен, перформантен систем со модуларна структура. Тестираме, оптимизираме и испорачуваме решение подготвено за продукција, скалирање и раст.',
    'web.portfolioTitle': 'Погледнете неколку примери',
    'web.portfolioSub': 'Реални проекти. Реални перформанси. Кликнете и погледнете.',
    // CRM Systems page
    'crm.badge': 'CRM СИСТЕМИ',
    'crm.h1': 'CRM систем што управува со целиот ваш бизнис.',
    'crm.subtitle': 'Leads. Продажба. Производи. Автоматизации. Аналитика. Webhooks. Импорт. Експорт. Контрола.',
    'crm.strongline': 'Комплексен систем. Интуитивен интерфејс.',
    'crm.microline': 'Изграден за сериозни бизниси што сакаат структура и перформанс.',
    'crm.investPrice': '299\u20AC',
    'crm.primaryBtn': 'Закажи CRM консултација',
    'crm.secondaryBtn': 'Побарај демо',
    'crm.pos1': 'Ние не инсталираме софтвер.',
    'crm.pos2': 'Ние дизајнираме CRM архитектура.',
    'crm.pos3': 'Градиме продажна инфраструктура што ги поврзува leads, pipeline, производи, автоматизации и аналитика во еден структуриран систем.',
    'crm.pos4': 'Секој pipeline е стратегиски дефиниран.',
    'crm.pos5': 'Секој процес е стандардизиран.',
    'crm.pos6': 'Секој податок е видлив, мерлив и контролируем.',
    'crm.d1.title': 'Прилагодена CRM архитектура',
    'crm.d1.desc': 'Дизајнираме CRM систем изграден околу вашиот продажен процес, не обратно. Од lead capture до пост-продажна поддршка \u2013 с\u0435 е конфигурирано како единствен, логичен и скалабилен систем.',
    'crm.d2.title': 'Pipeline стратегија и контрола',
    'crm.d2.desc': 'Јасно дефинирани stage-и, обврзни чекори и правила за напредување. Нема хаос. Нема пропуштени зделки. Секој deal има структура, одговорност и видлив статус.',
    'crm.d3.title': 'Автоматизација и оперативна дисциплина',
    'crm.d3.desc': 'Lead assignment, follow-up логика, нотификации и workflow автоматизации. CRM што работи за тимот \u2013 не тим што работи за CRM.',
    'crm.d4.title': 'Интеграции и Webhooks',
    'crm.d4.desc': 'Поврзување со веб-страници, платформи за плаќање, маркетинг алатки и надворешни системи. CRM што комуницира со целата ваша дигитална инфраструктура во реално време.',
    'crm.d5.title': 'Извештаи и перформанс аналитика',
    'crm.d5.desc': 'Прилагодени извештаи, KPI метрики и преглед на продажни перформанси. Секој податок е достапен. Секоја одлука е базирана на бројки.',
    'crm.d6.title': 'Миграција, импорт и скалирање',
    'crm.d6.desc': 'Структурирана миграција на постоечки податоци, import/export логика и архитектура подготвена за раст. CRM систем што не се распаѓа кога бизнисот расте.',
    'crm.step1.title': 'Стратешка дијагностика',
    'crm.step1.desc': 'Го анализираме вашиот тековен продажен екосистем \u2014 од lead capture до затворање на зделка. Идентификуваме структурни слабости, неефикасности и точки на губење приход. Цел: јасна архитектура пред конфигурација.',
    'crm.step2.title': 'CRM системска архитектура',
    'crm.step2.desc': 'Дизајнираме pipeline логика, stage enforcement правила, автоматизации и интеграции како единствен кохерентен систем. Секој процес има структура. Секој чекор има логика. Секој податок има место.',
    'crm.step3.title': 'Имплементација и стабилизација',
    'crm.step3.desc': 'Конфигурација, миграција на податоци, тестирање и обука на тимот. Системот не се само лансира \u2014 туку се стабилизира и оптимизира за реална употреба.',
    // Automation page
    'auto.badge': 'АВТОМАТИЗАЦИЈА',
    'auto.h1': 'Автоматизација што елиминира рачна работа.',
    'auto.subtitle': 'Интеграции, workflow логика и процесна дисциплина што ги поврзуваат вашите алатки во автоматизиран оперативен систем.',
    'auto.strongline': 'Trigger \u2192 Action \u2192 Sync \u2192 Report.',
    'auto.investPrice': '49\u20AC',
    'auto.primaryBtn': 'Контактирај нè',
    'auto.secondaryBtn': 'Закажи автоматизација',
    'auto.manifesto': 'Ние не автоматизираме хаос.<br>Ние дизајнираме <span class="accent-text">структура</span>.',
    'auto.manifestoSub': 'Ги автоматизираме критичните процеси што влијаат на <span class="accent-text">приход</span>, <span class="accent-text">брзина</span> и <span class="accent-text">контрола</span>.',
    'auto.pillar1': 'ROI фокус',
    'auto.pillar2': 'Тестиран workflow',
    'auto.pillar3': 'Одржлива архитектура',
    'auto.d1.title': 'Process mapping и анализа',
    'auto.d1.desc': 'Идентификација на повторливи процеси, документирање на workflow-и и калкулација на потенцијална заштеда.',
    'auto.d2.title': 'Автоматизација на Lead management',
    'auto.d2.desc': 'Lead routing, assignment, follow-up секвенци, скорирање и квалификација без рачна интервенција.',
    'auto.d3.title': 'Документирање и compliance',
    'auto.d3.desc': 'Автоматско генерирање на договори, фактури, извештаи. E-signature интеграции. Архивирање според политики.',
    'auto.d4.title': 'Интеграции меѓу системи',
    'auto.d4.desc': 'Поврзување на CRM, email platforms, financial tools, marketing automation. Синхронизација на податоци без дупликати.',
    'auto.d5.title': 'Custom automation infrastructure',
    'auto.d5.desc': 'Градење на прилагодени процеси преку Zapier, Make, API интеграции или custom development.',
    'auto.d6.title': 'Performance & visibility layer',
    'auto.d6.desc': 'Дашборди со KPI метрики, pipeline velocity и conversion tracking. Целосна видливост на приходи, статуси и перформанс во реално време.',
    'auto.methodEyebrow': 'МЕТОДОЛОГИЈА',
    'auto.methodTitle': 'Како го структурираме растот',
    'auto.methodSub': 'Секој чекор има јасна логика, изведба и мерлива цел.',
    'auto.step1.title': 'Анализа',
    'auto.step1.desc': 'Целосна ревизија на оперативна структура, revenue модел, технолошка инфраструктура и организациски процеси. Идентификација на ограничувања и системски слабости.',
    'auto.step2.title': 'Архитектура',
    'auto.step2.desc': 'Дизајнирање на growth framework со дефинирани процеси, automation слоеви и reporting систем со јасни KPI структури. Скалабилноста се планира однапред.',
    'auto.step3.title': 'Имплементација',
    'auto.step3.desc': 'Фазно извршување со континуиран oversight. Data-driven корекции, оптимизација и вграден accountability модел. Секој чекор е мерлив.',
    // AI Integration page
    'ai.badge': 'AI ИНТЕГРАЦИЈА',
    'ai.h1': 'AI Интеграција',
    'ai.subtitle': 'AI автоматизација и интелигентни системи за оптимизација на процеси.',
    'ai.strongline': 'Интелигентни решенија за автоматизирана ефикасност.',
    'ai.investPrice': '149\u20AC',
    'ai.primaryBtn': 'Контактирај нè',
    'ai.secondaryBtn': 'Дознај повеќе',
    'ai.manifesto': 'AI не е магија.<br><span class="accent-text">AI е инфраструктура.</span>',
    'ai.manifestoSub': 'Интегрираме AI во вашите процеси за автоматизирана ефикасност и предвидлив раст.',
    'ai.approachLabel': 'Наш пристап:',
    'ai.pillar1': 'Анализа на процеси',
    'ai.pillar2': 'Дизајн на AI модел',
    'ai.pillar3': 'Контролирана интеграција',
    'ai.deliverTitle': 'AI решенија што ги интегрираме',
    'ai.d1.title': 'AI Chat & Automation',
    'ai.d1.desc': 'Интелигентни chatbot системи и AI-powered автоматизација за клиентска комуникација.',
    'ai.d2.title': 'AI Workflow Optimization',
    'ai.d2.desc': 'Оптимизација на процеси со AI алгоритми за зголемена ефикасност.',
    'ai.d3.title': 'AI Data Analysis',
    'ai.d3.desc': 'Длабинска анализа со ML модели за извлекување на insights и patterns.',
    'ai.d4.title': 'Predictive Systems',
    'ai.d4.desc': 'Предвидливи системи за forecast, demand planning и можности.',
    'ai.d5.title': 'Custom AI Models',
    'ai.d5.desc': 'Развој на прилагодени AI модели според вашата индустрија.',
    'ai.d6.title': 'AI Process Architecture',
    'ai.d6.desc': 'Дизајн на целосна AI инфраструктура интегрирана во вашиот систем.',
    'ai.ctaTitle': 'Подготвени за AI интеграција?',
    'ai.ctaSub': 'AI системите го зголемуваат капацитетот без пропорционално зголемување на трошоците.',
    'ai.ctaDesc': 'AI системите го зголемуваат капацитетот без пропорционално зголемување на трошоците.',
    // Analiza page
    'analyze.badge': 'АНАЛИЗА',
    'analyze.h1': 'Анализа што носи<br>јасни одлуки.',
    'analyze.subtitle': 'Податочна и процесна анализа за да се откријат слабите точки, можностите за раст и оптимизација на системот.',
    'analyze.strongline': 'Diagnose \u2192 Map \u2192 Recommend \u2192 Execute.',
    'analyze.investPrice': '39\u20AC',
    'analyze.primaryBtn': 'ПОБАРАЈ АНАЛИЗА',
    'analyze.secondaryBtn': 'ВИДИ АВТОМАТИЗАЦИЈА',
    'analyze.manifesto': 'Ние не претпоставуваме.<br>Ние <span class="accent-text">дијагностицираме</span>.',
    'analyze.manifestoSub': 'Ги анализираме критичните процеси што влијаат на <span class="accent-text">приход</span>, <span class="accent-text">ефикасност</span> и <span class="accent-text">раст</span>.',
    'analyze.pillar1': 'Data-driven',
    'analyze.pillar2': 'Структуриран пристап',
    'analyze.pillar3': 'Акциони препораки',
    'analyze.deliverTitle': 'Што анализираме',
    'analyze.d1.title': 'Бизнис процеси',
    'analyze.d1.desc': 'Мапирање на сите оперативни текови, идентификување на bottleneck точки и неефикасности во системот.',
    'analyze.d2.title': 'Sales Funnel',
    'analyze.d2.desc': 'Анализа на conversion rates, drop-off точки и можности за оптимизација на продажниот процес.',
    'analyze.d3.title': 'CRM структура',
    'analyze.d3.desc': 'Ревизија на податочната архитектура, pipeline логика и процеси за управување со клиенти.',
    'analyze.d4.title': 'Автоматизација',
    'analyze.d4.desc': 'Идентификување на рачни процеси кои можат да се автоматизираат за заштеда на време и ресурси.',
    'analyze.d5.title': 'Податочна инфраструктура',
    'analyze.d5.desc': 'Анализа на квалитетот на податоците, интеграции меѓу системи и reporting можности.',
    'analyze.d6.title': 'KPI Framework',
    'analyze.d6.desc': 'Дефинирање на метрики за следење на перформанс и создавање на baseline за мерење на напредок.',
    'analyze.methodEyebrow': 'МЕТОДОЛОГИЈА',
    'analyze.methodTitle': 'Како го структурираме процесот',
    'analyze.methodSub': 'Секој чекор има јасна логика, изведба и мерлива цел.',
    'analyze.step1.title': 'Дијагностика',
    'analyze.step1.desc': 'Собирање на податоци преку интервјуа, документација и системска ревизија. Длабоко разбирање на тековната состојба.',
    'analyze.step2.title': 'Мапирање',
    'analyze.step2.desc': 'Визуелизација на процеси, идентификување на критични точки и можности за подобрување. Детална карта на системот.',
    'analyze.step3.title': 'Предлог модел',
    'analyze.step3.desc': 'Јасен roadmap со приоритети, KPI структура и систем препораки за имплементација. Акционен план.',
    'analyze.resultsTitle': 'Што добивате',
    'analyze.r1.title': 'Јасен Roadmap',
    'analyze.r1.desc': 'Приоритизиран план за акција со дефинирани чекори, временски рамки и очекувани резултати.',
    'analyze.r2.title': 'KPI Структура',
    'analyze.r2.desc': 'Дефинирани метрики за мерење на успех, baseline вредности и цели за следење на напредок.',
    'analyze.r3.title': 'Систем препораки',
    'analyze.r3.desc': 'Конкретни препораки за технологија, процеси и структура базирани на анализата.',
    'analyze.ctaTitle': 'Подготвени за јасна слика?',
    'analyze.ctaSub': 'Анализата е првиот чекор кон структуриран раст.',
    'analyze.ctaDesc': 'Анализата е првиот чекор кон структуриран раст.',
    'analyze.ctaBtn': 'Започни анализа',
    // Growth page (remaining)
    'growth.deliver.eyebrow': 'ИЗВЕДБЕНИ МОДУЛИ',
    'growth.deliver.title': 'Што реално испорачуваме',
    'growth.deliver.subtext': 'Секој модул е дел од интегриран performance маркетинг систем.<br>Секој канал, буџет и метрика работи синхронизирано.',
    'growth.m1.title': 'Performance аудит',
    'growth.m1.desc': 'Длабинска анализа на постоечки канали,<br>ad accounts и funnel структура.<br>Идентификација на CPA, ROAS и conversion gaps.',
    'growth.m2.title': 'Paid media архитектура',
    'growth.m2.desc': 'Структурирање на Meta, Google и други платформи<br>со јасна scaling логика, контрола на буџет<br>и audience segmentation.',
    'growth.m3.title': 'Funnel оптимизација',
    'growth.m3.desc': 'Оптимизација на landing pages, conversion flow<br>и структурирано A/B тестирање<br>за зголемување на CR и LTV.',
    'growth.m4.title': 'Tracking инфраструктура',
    'growth.m4.desc': 'Имплементација на pixel, server-side tracking,<br>event mapping и чиста attribution логика.',
    'growth.m5.title': 'Performance оптимизациски систем',
    'growth.m5.desc': 'Континуирана оптимизација, weekly KPI анализа<br>и data-driven буџет одлуки.',
    'growth.m6.title': 'Automation & scaling систем',
    'growth.m6.desc': 'Автоматизација на reporting,<br>rule-based оптимизација и контролирано<br>скалирање на кампањи.',
    'growth.processTitle': 'Како го структурираме перформанс маркетингот',
    'growth.processSub': 'Јасен процес. Мерливи KPI. Контролирано скалирање.',
    'growth.step1.title': 'Анализа на перформанс',
    'growth.step1.desc': 'Длабинска ревизија на ad accounts, канали, funnel структура и идентификација на CPA, ROAS и conversion gaps.',
    'growth.step2.title': 'Структурирање на систем',
    'growth.step2.desc': 'Дизајн на paid media архитектура, tracking инфраструктура и оптимизациска логика со јасни KPI модели.',
    'growth.step3.title': 'Имплементација и оптимизација',
    'growth.step3.desc': 'Фазно лансирање и scaling со континуирана data анализа, буџет оптимизација и performance oversight.',
    // Growth Strategy page
    'gs.h1': 'Раст стратегија заснована на структура.',
    'gs.subtitle': 'Не правиме планови. Градиме системи што се извршуваат.',
    'gs.primaryBtn': 'Контактирај нè',
    'gs.secondaryBtn': 'Погледни проекти',
    'gs.pos1': 'Ние не пишуваме PowerPoint презентации.',
    'gs.pos2': 'Ние градиме оперативна инфраструктура која го овозможува скалирањето.',
    'gs.pos3': 'Секоја стратегија е изводлива. Секој plan има метрика. Секој систем е одржлив.',
    'gs.d1.title': 'Структурна ревизија',
    'gs.d1.desc': 'Длабинска анализа на тековна оперативна архитектура, идентификација на тесни грла и growth blockers.',
    'gs.d2.title': 'Revenue architecture дизајн',
    'gs.d2.desc': 'Градење на продажен модел кој поддржува таргет revenue goals со predictable unit economics.',
    'gs.d3.title': 'Operational scaling roadmap',
    'gs.d3.desc': '90-day execution план со јасни milestone-и, ownership и success criteria за секоја фаза.',
    'gs.d4.title': 'Технолошка архитектура',
    'gs.d4.desc': 'Селекција и имплементација на tech stack кој ги поддржува growth цели без техничка фрикција.',
    'gs.d5.title': 'Performance framework',
    'gs.d5.desc': 'Систем за tracking на growth метрики, quarterly reviews и continuous optimization.',
    'gs.step1.title': 'Анализа',
    'gs.step1.desc': 'Целосна ревизија на тековни операции, revenue модел, технолошка инфраструктура и тимска структура.',
    'gs.step2.title': 'Архитектура',
    'gs.step2.desc': 'Дизајнираме growth framework со exact процеси, системи, automation и reporting кои го овозможуваат скалирањето.',
    'gs.step3.title': 'Имплементација',
    'gs.step3.desc': 'Фазно извршување со континуиран oversight, корекции врз основа на податоци и built-in accountability.',
    // Lead Generation page
    'lg.h1': 'Системи за генерирање лидови што работат.',
    'lg.subtitle': 'Не купуваме списоци. Инженеруваме канали.',
    'lg.primaryBtn': 'Контактирај нè',
    'lg.secondaryBtn': 'Погледни проекти',
    'lg.pos1': 'Ние не трошиме пари на реклами без структура.',
    'lg.pos2': 'Ние градиме системи што генерираат лидови предвидливо.',
    'lg.pos3': 'Секоја кампања е тестирана. Секој канал е мерлив. Секој лид има вредност.',
    'lg.d1.title': 'Lead funnel архитектура',
    'lg.d1.desc': 'Дизајнираме целосен тек од студена аудиториум до квалификуван лид подготвен за продажба.',
    'lg.d2.title': 'Мулти-канална стратегија',
    'lg.d2.desc': 'LinkedIn, Google, Meta, email outreach. Секој канал е оптимизиран за твојата индустрија и аудиториум.',
    'lg.d3.title': 'Квалификациски систем',
    'lg.d3.desc': 'Lead scoring модел што автоматски ги рангира лидовите според потенцијална вредност и спремност.',
    'lg.d4.title': 'Performance tracking',
    'lg.d4.desc': 'Реално-временски извештаи со точен трошок по лид, конверзија и ROI за секој канал.',
    'lg.d5.title': 'CRM интеграција',
    'lg.d5.desc': 'Автоматско внесување на лидови во CRM со целосна историја, тагирање и следење на активности.',
    'lg.step1.title': 'Анализа',
    'lg.step1.desc': 'Идентификуваме target personas, канали со највисок потенцијал и конкурентска позиција.',
    'lg.step2.title': 'Архитектура',
    'lg.step2.desc': 'Градиме campaign структура, landing pages, автоматизирани follow-up секвенци и tracking системи.',
    'lg.step3.title': 'Имплементација',
    'lg.step3.desc': 'Лансираме, мериме, оптимизираме. Континуирано тестирање до постигање на таргет метрики.',
    // Reporting page
    'rpt.h1': 'Reporting системи кои го прават растот видлив.',
    'rpt.subtitle': 'Реално-временски податоци. Стратешки одлуки.',
    'rpt.primaryBtn': 'Контактирај нè',
    'rpt.secondaryBtn': 'Погледни проекти',
    'rpt.pos1': 'Ние не правиме fancy графикони.',
    'rpt.pos2': 'Ние градиме intelligence системи кои покажуваат што работи и што не.',
    'rpt.pos3': 'Секој dashboard е фокусиран. Секоја метрика е релевантна. Секој извештај води до акција.',
    'rpt.d1.title': 'Реално-временски dashboards',
    'rpt.d1.desc': 'Визуелизација на критични метрики: revenue pipeline, customer acquisition cost, LTV, conversion rates.',
    'rpt.d2.title': 'Executive reporting',
    'rpt.d2.desc': 'Автоматизирани weekly/monthly извештаи со trendovi, anomalies и препораки за management тимот.',
    'rpt.d3.title': 'Team performance tracking',
    'rpt.d3.desc': 'Individual и тимска перформанс метрика. Activity tracking. Target vs actual анализа.',
    'rpt.d4.title': 'Forecast модели',
    'rpt.d4.desc': 'Предиктивни модели засновани на историски податоци за точно revenue forecasting.',
    'rpt.d5.title': 'Data integration infrastructure',
    'rpt.d5.desc': 'Поврзување на сите извори на податоци во една централизирана reporting платформа.',
    'rpt.step1.title': 'Анализа',
    'rpt.step1.desc': 'Дефинираме кои метрики се критични за бизнисот, кои одлуки треба да се донесат и кои податоци се потребни.',
    'rpt.step2.title': 'Архитектура',
    'rpt.step2.desc': 'Дизајнираме data flow, dashboard структура и автоматизирани reporting процеси.',
    'rpt.step3.title': 'Имплементација',
    'rpt.step3.desc': 'Градиме dashboards, поставуваме alerts, обучуваме тим за интерпретација на податоци.',
    // IT Consulting Macedonia page (MK translations)
    'itc.h1': 'ИТ Консалтинг и Системски Инженеринг.<br>Северна Македонија.',
    'itc.subtitle': 'Архитектура на дигитална инфраструктура за македонски претпријатија. CRM системи, SaaS платформи, архитектура на автоматизација и технолошка трансформација.',
    'itc.primaryBtn': 'Побарај стратешка консултација',
    'itc.secondaryBtn': 'Погледни проекти',
    'itc.introTitle': 'Вашата инфраструктура го одредува вашиот максимум.',
    'itc.introP1': 'Многу бизниси во Северна Македонија работат на неповрзани системи, недоволно искористени CRM платформи и рачни работни текови кои го ограничуваат растот. Кога инфраструктурата е слаба, растот станува неефикасен и непредвидлив.',
    'itc.introP2': 'Regnum Consulting е ИТ консалтинг фирма базирана во Северна Македонија, специјализирана за дигитална инфраструктура, CRM архитектура, системи за автоматизација и скалабилни оперативни рамки. Дизајнираме структурирани екосистеми кои ја усогласуваат технологијата со стратегијата за приходи.',
    'itc.introP3': 'Како ИТ консалтинг партнер во Северна Македонија, градиме системи проектирани за перформанс, видливост и долгорочно скалирање — елиминирајќи оперативна фрикција и спречувајќи иден технички долг.',
    'itc.servicesTitle': 'Наши ИТ консалтинг услуги',
    'itc.s1.title': 'Развој на веб-страници и landing pages',
    'itc.s1.desc': 'Професионален веб развој кој ги претвора посетителите во клиенти. Градиме брзи, респонзивни веб-страници оптимизирани за корисничко искуство и пребарувачи. Секој сајт е прилагодено дизајниран за вашиот бренд и архитектуриран за перформанс.',
    'itc.s2.title': 'Имплементација на CRM системи',
    'itc.s2.desc': 'CRM системи кои носат јасност во вашиот продажен процес. Имплементираме и прилагодуваме платформи како HubSpot, Salesforce и Pipedrive, конфигурирани специфично за вашиот бизнис модел. Прилагодени pipeline-и, автоматизирани работни текови, lead scoring и реално-временски извештаи.',
    'itc.s3.title': 'Развој на SaaS решенија',
    'itc.s3.desc': 'Software-as-a-Service решенија изградени за вашите специфични бизнис потреби. Без разлика дали ви треба интерна алатка или платформа за клиенти, ние архитектурираме и развиваме скалабилни SaaS апликации со cloud-native архитектура и безбедна автентикација.',
    'itc.s4.title': 'Автоматизација и Workflow системи',
    'itc.s4.desc': 'Интелигентна автоматизација која елиминира повторливи задачи и ги намалува грешките. Дизајнираме workflow системи кои ги поврзуваат вашите алатки, автоматизираат внес на податоци и го одржуваат фокусот на тимот на активности со висока вредност.',
    'itc.s5.title': 'Оптимизација на бизнис процеси',
    'itc.s5.desc': 'Стратешка анализа и редизајн на вашите оперативни работни текови. Ги мапираме тековните процеси, идентификуваме неефикасности и имплементираме структурирани подобрувања. Усогласуваме луѓе, процеси и системи за предвидливи, скалабилни операции.',
    'itc.capTitle': 'Инженерски капацитети',
    'itc.capIntro': 'Комбинираме стратешки консалтинг со техничка изведба на сениор ниво. Нашите инженери архитектурираат скалабилна ИТ инфраструктура која одржува перформанс и доверливост додека вашиот бизнис расте.',
    'itc.cap1.title': 'Frontend инженеринг',
    'itc.cap1.desc': 'Архитектурираме респонзивни, високо-перформансни кориснички интерфејси кои ги претвораат посетителите во клиенти. Оптимизираме секој пиксел и интеракција за скалирање од мобилен до enterprise ниво.',
    'itc.cap2.title': 'Backend и инфраструктура',
    'itc.cap2.desc': 'Робусни backend системи се темелот на скалабилна ИТ инфраструктура. Дизајнираме и деплоираме API-ја кои го поддржуваат растот, бази оптимизирани за вашите пристапни патерни и серверска архитектура со висок uptime.',
    'itc.cap3.title': 'CRM и системи за автоматизација',
    'itc.cap3.desc': 'CRM имплементацијата оди подалеку од избор на платформа. Архитектурираме прилагодени CRM решенија интегрирани со вашите бизнис работни текови, комбинирајќи native CRM способности со custom автоматизација.',
    'itc.cap4.title': 'DevOps и деплојмент',
    'itc.cap4.desc': 'Модерната ИТ инфраструктура бара автоматизиран деплојмент, мониторинг и скалабилност. Инженерираме CI/CD pipeline-и, контејнеризираме апликации и имплементираме мониторинг кој ги одржува системите активни.',
    'itc.clientsTitle': 'Со кого работиме',
    'itc.clientsIntro': 'Нашата ИТ консалтинг практика во Северна Македонија опслужува бизниси од повеќе индустрии, од стартапи во рана фаза до етаблирани претпријатија подготвени да ги модернизираат операциите.',
    'itc.cl1.title': 'Локални МСП',
    'itc.cl1.desc': 'Мали и средни бизниси кои растат надвор од рачни процеси',
    'itc.cl2.title': 'E-commerce бизниси',
    'itc.cl2.desc': 'Онлајн трговци кои градат интегрирана продажна инфраструктура',
    'itc.cl3.title': 'Дигитални агенции',
    'itc.cl3.desc': 'Маркетинг агенции кои имплементираат системи за управување со клиенти',
    'itc.cl4.title': 'Растечки tech стартапи',
    'itc.cl4.desc': 'Технолошки компании кои градат скалабилни продуктни основи',
    'itc.cl5.title': 'Сервисни компании',
    'itc.cl5.desc': 'Професионални сервисни фирми кои ги автоматизираат работните текови',
    'itc.modelTitle': 'Regnum Infrastructure Model™',
    'itc.modelIntro': 'Нашиот структуриран пристап кон дигитална трансформација обезбедува секој проект да испорача мерлива бизнис вредност. Така ги претвораме технолошките инвестиции во конкурентски предности.',
    'itc.ph1.title': '01 — Анализа',
    'itc.ph1.desc': 'Длабинска проценка на вашите тековни системи, работни текови и бизнис цели. Документираме постоечки процеси, идентификуваме тесни грла и го мапираме патот на клиентот.',
    'itc.ph2.title': '02 — Архитектура',
    'itc.ph2.desc': 'Стратешки дизајн на систем кој ја усогласува технологијата со бизнис целите. Креираме детални технички спецификации, податочни модели и интеграциски планови.',
    'itc.ph3.title': '03 — Имплементација',
    'itc.ph3.desc': 'Практичен развој и конфигурација на вашите системи. Без разлика дали е CRM, development или автоматизација, градиме решенија кои точно одговараат на дефинираните барања.',
    'itc.ph4.title': '04 — Оптимизација',
    'itc.ph4.desc': 'Континуирано подобрување базирано на реална употреба и податоци за перформанс. Следиме клучни метрики, собираме повратни информации и правиме итеративни подобрувања.',
    'itc.whyTitle': 'Зошто македонските компании го избираат Regnum',
    'itc.b1.title': 'Стратешко планирање пред изведба',
    'itc.b1.desc': 'Не скокаме директно во развој. Секој проект започнува со стратешка анализа за разбирање на бизнис моделот, конкурентскиот пејзаж и целите за раст. Технолошките одлуки се базираат на бизнис резултати, не трендови.',
    'itc.b2.title': 'Техничка изведба што испорачува',
    'itc.b2.desc': 'Нашиот тим комбинира бизнис консалтинг експертиза со практични технички вештини. Не само советуваме — градиме, конфигурираме и имплементираме. Од архитектура на бази до дизајн на интерфејси.',
    'itc.b3.title': 'Бизнис-фокусирани решенија',
    'itc.b3.desc': 'Технологија заради технологија не нè интересира. Секој систем е дизајниран да реши специфичен бизнис проблем: зголемување на конверзии, намалување на оперативни трошоци, подобрување на задржување на клиенти.',
    'itc.b4.title': 'Скалабилна системска архитектура',
    'itc.b4.desc': 'Инфраструктурата што ја градиме денес треба да го поддржи вашиот бизнис три години однапред. Архитектурираме системи со вградена скалабилност од првиот ден.',
    'itc.b5.title': 'Долгорочна инфраструктура за раст',
    'itc.b5.desc': 'Брзите поправки создаваат технички долг. Ние градиме темели кои поддржуваат одржлив раст. Нашите решенија создаваат трајни конкурентски предности кои се зголемуваат со времето.',
    'itc.ctaTitle': 'Барате ИТ консалтинг во Северна Македонија?',
    'itc.ctaDesc': 'Да разговараме како структурирана дигитална инфраструктура може да ги трансформира вашите бизнис операции и да поддржи скалабилен раст.',
    'itc.ctaBtn': 'Закажи стратешка консултација'
});

let currentLang = localStorage.getItem('lang') || 'mk';

function setLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('lang', lang);
    document.documentElement.lang = lang === 'mk' ? 'mk' : 'en';
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[lang] && translations[lang][key]) {
            const arrow = el.querySelector('.nav-arrow');
            if (arrow) {
                el.childNodes.forEach(node => {
                    if (node.nodeType === Node.TEXT_NODE) node.remove();
                });
                el.insertBefore(document.createTextNode(translations[lang][key] + ' '), arrow);
            } else {
                el.textContent = translations[lang][key];
            }
        }
    });
    // Handle elements needing innerHTML (contains <br>, <span> etc.)
    document.querySelectorAll('[data-i18n-html]').forEach(el => {
        const key = el.getAttribute('data-i18n-html');
        if (translations[lang] && translations[lang][key]) {
            el.innerHTML = translations[lang][key];
        }
    });
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-lang') === lang) {
            btn.classList.add('active');
        }
    });
    // Re-render chat widget if open
    if (typeof renderChat === 'function' && chatBody) {
        renderChat();
    }
}

window.addEventListener('DOMContentLoaded', () => {
    setLanguage(currentLang);
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            setLanguage(btn.getAttribute('data-lang'));
        });
    });
});

// ========== MOBILE MENU TOGGLE ==========
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (mobileMenuToggle && navLinks) {
    mobileMenuToggle.addEventListener('click', () => {
        mobileMenuToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
        document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
        // Close all open dropdowns when closing the menu
        if (!navLinks.classList.contains('active')) {
            document.querySelectorAll('.nav-dropdown').forEach(d => d.classList.remove('open'));
        }
    });
}

// Close mobile menu when a nav link is clicked
document.querySelectorAll('.nav-links a').forEach(item => {
    item.addEventListener('click', (e) => {
        if (item.closest('.nav-dropdown-toggle')) return;
        if (mobileMenuToggle) mobileMenuToggle.classList.remove('active');
        if (navLinks) navLinks.classList.remove('active');
        document.body.style.overflow = '';
        document.querySelectorAll('.nav-dropdown').forEach(d => d.classList.remove('open'));
    });
});

// Dropdown toggle (click to open/close on both desktop and mobile)
document.querySelectorAll('.nav-dropdown').forEach(dropdown => {
    const toggle = dropdown.querySelector('.nav-dropdown-toggle');
    if (!toggle) return;
    toggle.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        const isOpen = dropdown.classList.contains('open');
        // Close all other dropdowns first
        document.querySelectorAll('.nav-dropdown').forEach(d => {
            if (d !== dropdown) {
                d.classList.remove('open');
                const t = d.querySelector('.nav-dropdown-toggle');
                if (t) t.setAttribute('aria-expanded', 'false');
            }
        });
        // Toggle clicked dropdown
        dropdown.classList.toggle('open', !isOpen);
        toggle.setAttribute('aria-expanded', String(!isOpen));
    });
});

// Close dropdowns when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.nav-dropdown')) {
        document.querySelectorAll('.nav-dropdown').forEach(d => {
            d.classList.remove('open');
            const t = d.querySelector('.nav-dropdown-toggle');
            if (t) t.setAttribute('aria-expanded', 'false');
        });
    }
});

// ========== FADE-IN ON SCROLL ANIMATION ==========
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all elements with fade-in classes
const fadeElements = document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-up');
fadeElements.forEach(element => {
    observer.observe(element);
});

// ========== SMOOTH SCROLL FOR ANCHOR LINKS ==========
// Note: CSS scroll-behavior: smooth handles this, but this provides fallback
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        // Skip dropdown toggles — they only control menus, not scroll
        if (this.classList.contains('nav-dropdown-toggle')) return;

        const href = this.getAttribute('href');
        
        // Skip if it's just "#", email link, or consultation button
        if (href === '#' || href.includes('mailto:') || this.classList.contains('consultBtn')) {
            return;
        }
        
        e.preventDefault();
        const target = document.querySelector(href);
        
        if (target) {
            const offsetTop = target.offsetTop - 80; // Account for sticky navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ========== NAVBAR BACKGROUND ON SCROLL ==========
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Add subtle shadow when scrolled
    if (currentScroll > 100) {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.3)';
    } else {
        navbar.style.boxShadow = 'none';
    }
    
    lastScroll = currentScroll;
});

// ========== INITIALIZE ==========
// Immediately show hero content on page load
window.addEventListener('load', () => {
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.classList.add('visible');
    }
});

// ========== CONSULTATION MODAL ==========
// ========== UNIVERSAL CONTACT MODAL LOGIC ==========
function openContactModal() {
    const modal = document.getElementById('consultModal');
    if (modal) {
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
    }
}

function closeContactModal() {
    const modal = document.getElementById('consultModal');
    if (modal) {
        modal.classList.remove('show');
        document.body.style.overflow = 'auto';
    }
}

// ========== GLOBAL MODAL EVENT DELEGATION ========== 
document.addEventListener('click', function(e) {
    // Open contact modal for any .open-contact-modal element (event delegation)
    const trigger = e.target.closest('.open-contact-modal');
    if (trigger) {
        e.preventDefault();
        // Try to find modal with id 'contactModal', fallback to 'consultModal' for legacy
        let modal = document.getElementById('contactModal') || document.getElementById('consultModal');
        if (!modal) {
            console.error('[Modal] contactModal or consultModal not found in DOM.');
            return;
        }
        // Add 'show' class (or 'active' if required by your CSS)
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
        return;
    }

    // Close modal on .close-modal click
    if (e.target.classList.contains('close-modal')) {
        let modal = document.getElementById('contactModal') || document.getElementById('consultModal');
        if (modal) {
            modal.classList.remove('show');
            document.body.style.overflow = 'auto';
        }
        return;
    }

    // Close modal when clicking outside modal content
    let modal = document.getElementById('contactModal') || document.getElementById('consultModal');
    if (modal && modal.classList.contains('show') && e.target === modal) {
        modal.classList.remove('show');
        document.body.style.overflow = 'auto';
    }
});

document.addEventListener('keydown', function(e) {
    const modal = document.getElementById('consultModal');
    if (e.key === 'Escape' && modal && modal.classList.contains('show')) {
        closeContactModal();
    }
});

// ========== PREMIUM SMART CHAT WIDGET ==========
// ...existing code...

// ========== SERVICES SLIDER NAVIGATION ==========
const servicesSlider = document.querySelector('.services-slider');
const leftArrow = document.querySelector('.slider-arrow-left');
const rightArrow = document.querySelector('.slider-arrow-right');

if (servicesSlider && leftArrow && rightArrow) {
    leftArrow.addEventListener('click', () => {
        const cardWidth = servicesSlider.querySelector('.service-card').offsetWidth;
        const gap = 24;
        servicesSlider.scrollBy({
            left: -(cardWidth + gap),
            behavior: 'smooth'
        });
    });

    rightArrow.addEventListener('click', () => {
        const cardWidth = servicesSlider.querySelector('.service-card').offsetWidth;
        const gap = 24;
        servicesSlider.scrollBy({
            left: cardWidth + gap,
            behavior: 'smooth'
        });
    });
}
// ========== PREMIUM LAYERED MONEY RAIN ANIMATION ==========
function initMoneyRain() {
    const moneyRainContainer = document.querySelector('.money-rain');
    if (!moneyRainContainer) return;

    // Layer definitions with desktop/mobile counts
    const layers = {
        back: {
            minSize: 12, maxSize: 22,
            minDuration: 18, maxDuration: 30,
            opacity: 'rgba(198, 255, 58, 0.08)',
            blur: 2,
            desktopCount: 40, mobileCount: 20
        },
        mid: {
            minSize: 18, maxSize: 32,
            minDuration: 14, maxDuration: 22,
            opacity: 'rgba(198, 255, 58, 0.12)',
            blur: 1,
            desktopCount: 30, mobileCount: 15
        },
        front: {
            minSize: 26, maxSize: 46,
            minDuration: 10, maxDuration: 18,
            opacity: 'rgba(198, 255, 58, 0.18)',
            blur: 0,
            desktopCount: 20, mobileCount: 10
        }
    };

    const isMobile = window.innerWidth <= 768;

    // Generate symbols for each layer
    Object.keys(layers).forEach(layerName => {
        const layerElement = document.querySelector(`.rain-layer.${layerName}`);
        if (!layerElement) return;

        const config = layers[layerName];
        const symbolCount = isMobile ? config.mobileCount : config.desktopCount;

        for (let i = 0; i < symbolCount; i++) {
            // Random horizontal position
            const randomLeft = Math.random() * 100;

            // Random size within layer range
            const randomSize = config.minSize + Math.random() * (config.maxSize - config.minSize);

            // Random animation duration
            const randomDuration = config.minDuration + Math.random() * (config.maxDuration - config.minDuration);

            // Random negative delay for infinite coverage
            const randomDelay = -(Math.random() * randomDuration);

            // Random rotation (fixed, not animated)
            const randomRotation = Math.random() * 360;

            const symbol = document.createElement('span');
            symbol.textContent = '€';
            symbol.className = 'money-symbol';
            symbol.style.left = randomLeft + '%';
            symbol.style.fontSize = randomSize + 'px';
            symbol.style.color = config.opacity;
            symbol.style.filter = `blur(${config.blur}px)`;
            symbol.style.animation = `rain-fall ${randomDuration}s linear infinite`;
            symbol.style.animationDelay = randomDelay + 's';
            symbol.style.setProperty('--rotate', randomRotation + 'deg');

            layerElement.appendChild(symbol);
        }
    });
}

// Initialize money rain when DOM is ready
document.addEventListener('DOMContentLoaded', initMoneyRain);

// Re-initialize on window resize to adjust for mobile/desktop
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        const moneyRainContainer = document.querySelector('.money-rain');
        if (moneyRainContainer) {
            document.querySelectorAll('.rain-layer').forEach(layer => {
                layer.innerHTML = '';
            });
            initMoneyRain();
        }
    }, 250);
});