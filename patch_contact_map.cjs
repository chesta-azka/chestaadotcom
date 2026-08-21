const fs = require('fs');
let contact = fs.readFileSync('src/components/organisms/ContactSection.tsx', 'utf-8');

const endDiv = `      </div>
    </section>`;

const mapSection = `
        {/* Location Map Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-20 max-w-5xl mx-auto"
        >
          <div className="text-center mb-8">
            <h3 className="text-xl md:text-2xl font-display font-medium text-slate-900">
              Jangkauan Operasional
            </h3>
            <p className="text-sm text-slate-500 font-sans mt-2">
              Berbasis di BSD & Cisauk, melayani seluruh kawasan Jabodetabek hingga Nasional.
            </p>
          </div>
          <div className="w-full h-[300px] sm:h-[400px] rounded-3xl overflow-hidden border border-slate-200 shadow-sm relative">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126907.03473950672!2d106.56847256673163!3d-6.282928399587445!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69fb20a9906e13%3A0xf775cbab5e8bb720!2sBSD%20City%2C%20Tangerang%2C%20Banten!5e0!3m2!1sen!2sid!4v1700000000000!5m2!1sen!2sid" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen={false} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade" 
              className="absolute inset-0 grayscale-[80%] hover:grayscale-0 opacity-80 hover:opacity-100 transition-all duration-700 ease-in-out"
              title="Operational Area Map"
            />
            {/* Overlay hint */}
            <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow border border-slate-100 text-xs font-mono font-bold text-[#4f46e5] flex items-center gap-2 pointer-events-none">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#4f46e5] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#4f46e5]"></span>
              </span>
              Headquarters Region
            </div>
          </div>
        </motion.div>
      </div>
    </section>`;

contact = contact.replace(endDiv, mapSection);

fs.writeFileSync('src/components/organisms/ContactSection.tsx', contact);
console.log('Fixed ContactSection map');
