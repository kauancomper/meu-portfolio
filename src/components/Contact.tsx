import { motion } from 'framer-motion';
import { Mail } from 'lucide-react';
import { LinkedinIcon, GithubIcon, WhatsappIcon } from './Icons';
import { useLanguage } from '../context/LanguageContext';
import AmbientGlows from './AmbientGlows';

interface ContactProps {
  hideCalendar?: boolean;
}

export default function Contact({ hideCalendar = false }: ContactProps) {
  const { t, language } = useLanguage();
  const { contact } = t;

  return (
    <section id="contato" className="relative w-full px-6 pt-28 pb-20 lg:pb-32 flex flex-col items-center overflow-hidden">
      <AmbientGlows />

      <div className={`relative z-10 w-full max-w-7xl mx-auto flex flex-col ${hideCalendar ? 'items-center' : 'lg:flex-row gap-12 lg:gap-16 items-start'}`}>
        
        {/* Left Column: Text & Socials */}
        <div className={`w-full flex flex-col gap-10 ${hideCalendar ? 'max-w-3xl items-center' : 'lg:w-1/2'}`}>
          {/* Header */}
          <motion.div
            className={hideCalendar ? 'text-center flex flex-col items-center' : 'text-left'}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-2 h-2 rounded-full bg-brand-primary-red animate-pulse" />
              <span className="text-brand-secondary-red font-mono text-xs tracking-[0.4em] uppercase font-bold">
                {t.hero.badge_label}
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-7xl font-sans font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-[#EF4444] to-[#F87171] pb-2 leading-tight">
              {contact.page_title}
            </h2>
            <p className={`text-white/70 text-base md:text-lg mt-6 font-medium leading-relaxed ${hideCalendar ? 'max-w-2xl text-center mx-auto' : 'max-w-lg'}`}>
              {contact.description}
            </p>
            <p className={`text-white/40 text-sm mt-4 font-medium leading-relaxed ${hideCalendar ? 'text-center' : ''}`}>
              {contact.subtitle}
            </p>
          </motion.div>

          {/* Socials Grid */}
          <motion.div
            className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.09, delayChildren: 0.3 } } }}
          >
            {[
              { href: contact.email, label: 'E-mail', sub: language === 'pt' ? 'Enviar E-mail' : language === 'es' ? 'Enviar Email' : 'Send Email', icon: <Mail size={18} /> },
              { href: contact.linkedin, label: 'LinkedIn', sub: language === 'pt' ? 'Acessar Perfil' : language === 'es' ? 'Ver Perfil' : 'Visit Profile', icon: <LinkedinIcon />, external: true },
              { href: contact.github, label: 'GitHub', sub: '/kauancomper', icon: <GithubIcon />, external: true },
              { href: contact.whatsapp, label: 'WhatsApp', sub: language === 'pt' ? 'Enviar Mensagem' : language === 'es' ? 'Enviar Mensaje' : 'Send Message', icon: <WhatsappIcon size={18} />, external: true },
            ].map((card) => (
              <motion.a
                key={card.label}
                href={card.href}
                target={card.external ? '_blank' : undefined}
                rel={card.external ? 'noreferrer' : undefined}
                variants={{
                  hidden: { opacity: 0, y: 20, scale: 0.95 },
                  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
                }}
                whileHover={{ y: -5, scale: 1.03, transition: { duration: 0.2 } }}
                className="group flex items-center gap-4 p-3 pr-6 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md hover:bg-white/10 hover:border-brand-primary-red/50 transition-colors shadow-lg cursor-pointer"
              >
                <div className="w-12 h-12 rounded-full flex items-center justify-center bg-brand-primary-red/10 text-brand-primary-red group-hover:bg-brand-primary-red group-hover:text-white transition-colors shrink-0">
                  {card.icon}
                </div>
                <div className="overflow-hidden">
                  <p className="text-[10px] font-bold text-white/40 tracking-widest mb-0.5 uppercase">{card.label}</p>
                  <p className="text-xs font-bold text-white/90 truncate">{card.sub}</p>
                </div>
              </motion.a>
            ))}
          </motion.div>
        </div>

        {/* Right Column: Calendar Embed Box */}
        {!hideCalendar && (
          <div className="w-full lg:w-1/2">
            <motion.div
              className="w-full bg-white rounded-3xl overflow-hidden shadow-2xl relative h-[600px]"
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <iframe
                src="https://calendar.google.com/calendar/appointments/schedules/AcZssZ1pUkCT7hMwD7UGU5JZhPv-9-A0FRk6jDSkJzcTP-Os4_n8D9SqTInXRpbyZulCkGXs1jtW-Bmq?gv=true"
                width="100%"
                height="100%"
                frameBorder="0"
                loading="lazy"
                className="absolute inset-0 w-full h-full bg-white relative z-10"
              ></iframe>
            </motion.div>
          </div>
        )}
      </div>

    </section>
  );
}
