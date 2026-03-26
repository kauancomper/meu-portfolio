import { motion } from 'framer-motion';
import { Mail, MessageSquare } from 'lucide-react';
import { LinkedinIcon, GithubIcon } from './Icons';

import { portfolioContent } from '../data/content';

export default function Contact() {
  const { contact } = portfolioContent;

  return (
    <section id="contato" className="relative w-full max-w-7xl mx-auto px-6 py-20 lg:py-32 flex flex-col items-center">

      {/* Background Decorative Rings/Glow */}
      <div className="absolute top-0 right-10 w-64 h-64 bg-brand-primary-red/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Header */}
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h2 className="text-4xl md:text-5xl lg:text-7xl font-sans font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-[#EF4444] to-[#F87171] pb-2">
          {contact.page_title}
        </h2>
        <p className="text-white/50 text-base md:text-lg mt-4 font-medium max-w-2xl mx-auto">
          {contact.subtitle}
        </p>
      </motion.div>

      {/* Calendar Embed Box */}
      <motion.div
        className="w-full max-w-5xl bg-white rounded-3xl overflow-hidden shadow-2xl relative h-[680px] mb-6"
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
      >
        {
          <iframe
            src="https://calendar.google.com/calendar/appointments/schedules/AcZssZ1pUkCT7hMwD7UGU5JZhPv-9-A0FRk6jDSkJzcTP-Os4_n8D9SqTInXRpbyZulCkGXs1jtW-Bmq?gv=true"
            width="100%"
            height="100%"
            frameBorder="0"
            className="absolute inset-0 w-full h-full bg-white relative z-10"
          ></iframe>
        }
      </motion.div>

      {/* Bottom Contact Cards Grid */}
      <motion.div
        className="w-full max-w-5xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4 }}
      >
        {/* Email */}
        <a href={`mailto:${contact.email}`} className="group flex items-center gap-4 p-5 rounded-3xl bg-[#0a0a0a] border border-white/5 hover:border-brand-primary-red/50 transition-colors shadow-lg">
          <div className="w-12 h-12 rounded-full flex items-center justify-center bg-brand-primary-red/10 text-brand-primary-red group-hover:bg-brand-primary-red group-hover:text-white transition-colors">
            <Mail size={18} />
          </div>
          <div>
            <p className="text-[10px] font-bold text-white/40 tracking-widest mb-0.5 uppercase">E-mail</p>
            <p className="text-xs font-bold text-white/90">Enviar E-mail</p>
          </div>
        </a>

        {/* LinkedIn */}
        <a href={contact.linkedin} target="_blank" rel="noreferrer" className="group flex items-center gap-4 p-5 rounded-3xl bg-[#0a0a0a] border border-white/5 hover:border-brand-primary-red/50 transition-colors shadow-lg">
          <div className="w-12 h-12 rounded-full flex items-center justify-center bg-brand-primary-red/10 text-brand-primary-red group-hover:bg-brand-primary-red group-hover:text-white transition-colors">
            <LinkedinIcon />
          </div>
          <div>
            <p className="text-[10px] font-bold text-white/40 tracking-widest mb-0.5 uppercase">Linkedin</p>
            <p className="text-xs font-bold text-white/90">Acessar Perfil</p>
          </div>
        </a>

        {/* GitHub */}
        <a href={contact.github} target="_blank" rel="noreferrer" className="group flex items-center gap-4 p-5 rounded-3xl bg-[#0a0a0a] border border-white/5 hover:border-brand-primary-red/50 transition-colors shadow-lg">
          <div className="w-12 h-12 rounded-full flex items-center justify-center bg-brand-primary-red/10 text-brand-primary-red group-hover:bg-brand-primary-red group-hover:text-white transition-colors">
            <GithubIcon />
          </div>
          <div>
            <p className="text-[10px] font-bold text-white/40 tracking-widest mb-0.5 uppercase">Github</p>
            <p className="text-xs font-bold text-white/90">/Portfólio-2026</p>
          </div>
        </a>

        {/* WhatsApp */}
        <a href={contact.whatsapp} target="_blank" rel="noreferrer" className="group flex items-center gap-4 p-5 rounded-3xl bg-[#0a0a0a] border border-white/5 hover:border-brand-primary-red/50 transition-colors shadow-lg">
          <div className="w-12 h-12 rounded-full flex items-center justify-center bg-brand-primary-red/10 text-brand-primary-red group-hover:bg-brand-primary-red group-hover:text-white transition-colors">
            <MessageSquare size={18} />
          </div>
          <div>
            <p className="text-[10px] font-bold text-white/40 tracking-widest mb-0.5 uppercase">Whatsapp</p>
            <p className="text-xs font-bold text-white/90">Enviar Mensagem</p>
          </div>
        </a>
      </motion.div>

    </section>
  );
}
