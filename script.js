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
        'modal.desc': 'Поврзи се директно со нашиот инженерски тим за да ги разгледаме твоите инфраструктурни потреби.',
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

let currentLang = localStorage.getItem('lang') || 'mk';

function setLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('lang', lang);
    document.documentElement.lang = lang === 'mk' ? 'mk' : 'en';
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[lang][key]) {
            el.textContent = translations[lang][key];
        }
    });
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-lang') === lang) {
            btn.classList.add('active');
        }
    });
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

mobileMenuToggle.addEventListener('click', () => {
    mobileMenuToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close mobile menu when a link is clicked
const navItems = document.querySelectorAll('.nav-links a');
navItems.forEach(item => {
    item.addEventListener('click', () => {
        mobileMenuToggle.classList.remove('active');
        navLinks.classList.remove('active');
    });
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
const modal = document.getElementById('consultModal');
const consultButtons = document.querySelectorAll('.consultBtn');
const closeModalBtn = document.querySelector('.closeModal');

// Open modal when any consultation button is clicked
consultButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        modal.classList.add('show');
        document.body.style.overflow = 'hidden'; // Prevent background scroll
    });
});

// Close modal when X is clicked
if (closeModalBtn) {
    closeModalBtn.addEventListener('click', () => {
        modal.classList.remove('show');
        document.body.style.overflow = 'auto';
    });
}

// Close modal when clicking outside the modal content
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.classList.remove('show');
        document.body.style.overflow = 'auto';
    }
});

// Close modal on Escape key press
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('show')) {
        modal.classList.remove('show');
        document.body.style.overflow = 'auto';
    }
});

// ========== FLOATING CHAT WIDGET ==========
const chatToggle = document.querySelector('.chat-toggle');
const chatPanel = document.querySelector('.chat-panel');
const chatBody = document.getElementById('chatBody');
const chatClose = document.querySelector('.chat-close');

if (chatToggle && chatPanel && chatBody && chatClose) {
    const chatState = {
        step: 'start',
        topic: null,
        websiteType: null,
        timeline: null
    };

    /**
     * Safely create a chat message element
     * @param {string} text - Message text (will be escaped)
     * @returns {HTMLElement}
     */
    const createChatMessage = (text) => {
        const div = document.createElement('div');
        div.className = 'chat-message';
        div.textContent = text; // Safe - uses textContent, not innerHTML
        return div;
    };

    /**
     * Safely create a chat option button
     * @param {string} action - Action identifier
     * @param {string} label - Button label (will be escaped)
     * @param {string} value - Optional data value
     * @returns {HTMLButtonElement}
     */
    const createChatOption = (action, label, value = null) => {
        const btn = document.createElement('button');
        btn.className = 'chat-option';
        btn.setAttribute('data-action', action);
        if (value !== null) {
            btn.setAttribute('data-value', value);
        }
        btn.textContent = label; // Safe - uses textContent
        return btn;
    };

    /**
     * Safely create an actions container with buttons
     * @param {Array} buttons - Array of {action, label, value} objects
     * @returns {HTMLElement}
     */
    const createChatActions = (buttons) => {
        const container = document.createElement('div');
        container.className = 'chat-actions';
        buttons.forEach(({ action, label, value }) => {
            container.appendChild(createChatOption(action, label, value));
        });
        return container;
    };

    /**
     * Safely create contact form
     * @returns {HTMLFormElement}
     */
    const createContactForm = () => {
        const form = document.createElement('form');
        form.className = 'chat-form';
        form.setAttribute('data-action', 'submitLead');
        
        const input = document.createElement('input');
        input.className = 'chat-input';
        input.type = 'text';
        input.name = 'contact';
        input.placeholder = 'Е-пошта или телефон';
        input.required = true;
        input.maxLength = 200; // Prevent excessive input
        input.autocomplete = 'email';
        
        const submit = document.createElement('button');
        submit.className = 'chat-submit';
        submit.type = 'submit';
        submit.textContent = 'Испрати';
        
        form.appendChild(input);
        form.appendChild(submit);
        return form;
    };

    const renderChat = () => {
        // Clear previous content safely
        chatBody.textContent = '';

        if (chatState.step === 'start') {
            chatBody.appendChild(createChatMessage('Добредојдовте во Regnum. Како можеме да помогнеме денес?'));
            chatBody.appendChild(createChatActions([
                { action: 'launch', label: 'Лансирај веб-страна' },
                { action: 'crm', label: 'CRM и автоматизација' },
                { action: 'pricing', label: 'Информации за цени' },
                { action: 'consult', label: 'Закажи консултација' }
            ]));
        }

        if (chatState.step === 'website-type') {
            chatBody.appendChild(createChatMessage('Оваа веб-страна е за:'));
            chatBody.appendChild(createChatActions([
                { action: 'websiteType', label: 'Нов бизнис', value: 'Нов бизнис' },
                { action: 'websiteType', label: 'Постоечка компанија', value: 'Постоечка компанија' },
                { action: 'websiteType', label: 'Е-трговија', value: 'Е-трговија' },
                { action: 'websiteType', label: 'Информативна страница', value: 'Информативна страница' }
            ]));
        }

        if (chatState.step === 'timeline') {
            chatBody.appendChild(createChatMessage('Кој е вашиот рок?'));
            chatBody.appendChild(createChatActions([
                { action: 'timeline', label: 'Итно (48–72ч)', value: 'Итно (48–72ч)' },
                { action: 'timeline', label: 'Во рок од 2 недели', value: 'Во рок од 2 недели' },
                { action: 'timeline', label: 'Флексибилно', value: 'Флексибилно' }
            ]));
        }

        if (chatState.step === 'contact') {
            chatBody.appendChild(createChatMessage('Оставете е-пошта или телефон и ќе ве контактираме во рок од 24 часа.'));
            chatBody.appendChild(createContactForm());
        }

        if (chatState.step === 'done') {
            chatBody.appendChild(createChatMessage('Ви благодариме. Ќе ве контактираме во рок од 24 часа.'));
        }
    };

    const openChat = () => {
        chatPanel.classList.add('open');
        chatPanel.setAttribute('aria-hidden', 'false');
        chatToggle.setAttribute('aria-expanded', 'true');
        renderChat();
    };

    const closeChat = () => {
        chatPanel.classList.remove('open');
        chatPanel.setAttribute('aria-hidden', 'true');
        chatToggle.setAttribute('aria-expanded', 'false');
    };

    chatToggle.addEventListener('click', () => {
        if (chatPanel.classList.contains('open')) {
            closeChat();
        } else {
            openChat();
        }
    });

    chatClose.addEventListener('click', () => {
        closeChat();
    });

    chatBody.addEventListener('click', (event) => {
        const target = event.target;
        if (!target.classList.contains('chat-option')) {
            return;
        }

        const action = target.getAttribute('data-action');
        const value = target.getAttribute('data-value');

        if (action === 'launch') {
            chatState.topic = 'Launch a Website';
            chatState.step = 'website-type';
        }

        if (action === 'crm') {
            chatState.topic = 'CRM & Automation';
            chatState.step = 'contact';
        }

        if (action === 'pricing') {
            chatState.topic = 'Pricing Information';
            chatState.step = 'contact';
        }

        if (action === 'consult') {
            chatState.topic = 'Book Consultation';
            chatState.step = 'contact';
        }

        if (action === 'websiteType') {
            chatState.websiteType = value;
            chatState.step = 'timeline';
        }

        if (action === 'timeline') {
            chatState.timeline = value;
            chatState.step = 'contact';
        }

        renderChat();
    });

    chatBody.addEventListener('submit', (event) => {
        const form = event.target;
        if (!form.classList.contains('chat-form')) {
            return;
        }
        event.preventDefault();
        const input = form.querySelector('input[name="contact"]');
        const contact = input.value.trim();
        
        // Validate contact format (email or phone)
        if (!contact || !isValidContact(contact)) {
            input.setCustomValidity('Внесете валидна е-пошта или телефонски број');
            input.reportValidity();
            input.focus();
            return;
        }
        
        input.setCustomValidity(''); // Clear any previous validation message

        const lead = {
            topic: chatState.topic,
            websiteType: chatState.websiteType,
            timeline: chatState.timeline,
            contact
        };

        secureLog('log', 'Regnum chat lead submitted');
        // telegram integration removed, form data no longer sent to external service
        chatState.step = 'done';
        renderChat();
    });
}

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