const fs = require('fs');

let code = fs.readFileSync('src/app/case-studies/[slug]/page.tsx', 'utf8');

const newContent = `
            <h3 id="project-overview" className="text-2xl sm:text-3xl font-display font-bold mb-5 text-slate-900 tracking-tight leading-snug scroll-mt-32">Project Overview</h3>
            <p className="font-sans text-[16px] sm:text-[17px] md:text-[18px] text-slate-700 leading-[1.68] sm:leading-[1.72] tracking-[-0.014em] mb-12 font-normal antialiased">
              {study.desc}
            </p>

            <h2 id="core-strategy" className="text-xl sm:text-2xl font-display font-bold mb-4 text-slate-900 tracking-tight scroll-mt-32">Core Strategy</h2>
            <p className="font-sans text-[16px] sm:text-[17px] md:text-[18px] text-slate-700 leading-[1.68] sm:leading-[1.72] tracking-[-0.014em] mb-10 font-normal antialiased">
              Through rigorous architectural planning and execution, our Next.js App Router implementation 
              bypassed legacy limitations. We focused on decoupling the monolithic backend into microservices, providing agility and accelerating time-to-market.
            </p>

            <h2 id="implementation-details" className="text-xl sm:text-2xl font-display font-bold mb-4 text-slate-900 tracking-tight scroll-mt-32">Implementation Details</h2>
            <p className="font-sans text-[16px] sm:text-[17px] md:text-[18px] text-slate-700 leading-[1.68] sm:leading-[1.72] tracking-[-0.014em] mb-10 font-normal antialiased">
              By harnessing global edge caching, React Server Components, and 
              advanced asset optimization, we delivered an enterprise-grade digital experience. Our team integrated robust ORMs with scalable databases, ensuring data integrity and lightning-fast queries.
            </p>

            <h2 id="roi-analysis" className="text-xl sm:text-2xl font-display font-bold mb-4 text-slate-900 tracking-tight scroll-mt-32">ROI Analysis</h2>
            <p className="font-sans text-[16px] sm:text-[17px] md:text-[18px] text-slate-700 leading-[1.68] sm:leading-[1.72] tracking-[-0.014em] mb-12 font-normal antialiased">
              The transformation directly translates to business impact. Post-launch metrics indicated a significant reduction in server costs and a massive improvement in core web vitals, drastically increasing user retention and conversion rates.
            </p>

            <h2 id="project-timeline" className="text-xl sm:text-2xl font-display font-bold mb-6 text-slate-900 tracking-tight scroll-mt-32">Project Timeline</h2>
            <ProjectTimeline />
`;

const oldContentRegex = /<h3 className="text-2xl sm:text-3xl font-display font-bold mb-5 text-slate-900 tracking-tight leading-snug">Project Overview<\/h3>[\s\S]*?<ProjectTimeline \/>/s;

code = code.replace(oldContentRegex, newContent.trim());
fs.writeFileSync('src/app/case-studies/[slug]/page.tsx', code);
console.log('Replaced content in overview.');
