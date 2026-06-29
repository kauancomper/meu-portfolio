import { useState, useEffect, useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  Plus, Trash2, Download, Upload, LogOut, Save,
  ChevronRight, ArrowLeft, Languages, Loader2, X,
} from 'lucide-react';
import {
  loadSiteData, saveDraft, clearDraft, exportSiteData, emptyProject,
} from '../services/projectsData';
import type { SiteData, ProjectData, ContentOverrides } from '../services/projectsData';
import { fetchGithubProjects } from '../services/github';
import type { GithubRepo } from '../services/github';
import { portfolioContent } from '../data/content';
import type { Language, PortfolioContent } from '../data/content';

const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD ?? '';
const AUTH_KEY = 'portfolio-admin-auth';
const LOCKOUT_KEY = 'portfolio-admin-lockout';
const MAX_ATTEMPTS = 5;
const LOCKOUT_MS = 5 * 60 * 1000; // 5 minutos

function getLockoutState(): { attempts: number; until: number } {
  try { return JSON.parse(localStorage.getItem(LOCKOUT_KEY) ?? '{"attempts":0,"until":0}'); }
  catch { return { attempts: 0, until: 0 }; }
}
function setLockoutState(s: { attempts: number; until: number }) {
  localStorage.setItem(LOCKOUT_KEY, JSON.stringify(s));
}
const LANGS: Language[] = ['pt', 'en', 'es'];

type Section =
  | 'nav' | 'hero' | 'sobre' | 'projetos-texto'
  | 'recentes' | 'processo' | 'contato' | 'projetos-cms';

// ─── Translation ──────────────────────────────────────────────────────────────

async function autoTranslate(text: string, to: 'en' | 'es'): Promise<string> {
  if (!text.trim()) return '';
  try {
    const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=pt|${to}`;
    const res = await fetch(url);
    const data = await res.json();
    return (data.responseData?.translatedText as string) ?? text;
  } catch {
    return text;
  }
}

// ─── Shared UI ────────────────────────────────────────────────────────────────

const inp = 'w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm placeholder:text-white/15 outline-none focus:border-brand-primary-red/50 transition-colors resize-none';

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <label className="text-[9px] font-mono font-bold uppercase tracking-widest text-white/30">{label}</label>
      {children}
    </div>
  );
}

type OverridesUpdater = (o: ContentOverrides | ((prev: ContentOverrides) => ContentOverrides)) => void;

interface FieldRowProps {
  label: string;
  sectionKey: keyof PortfolioContent;
  fieldKey: string;
  overrides: ContentOverrides;
  onChange: OverridesUpdater;
  type?: 'input' | 'textarea' | 'url';
  rows?: number;
  /** Only one value, no translation (name, URLs) */
  shared?: boolean;
}

function FieldRow({ label, sectionKey, fieldKey, overrides, onChange, type = 'input', rows = 3, shared = false }: FieldRowProps) {
  const [translating, setTranslating] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  function getVal(lang: Language): string {
    const ov = (overrides[lang]?.[sectionKey] as Record<string, unknown> | undefined)?.[fieldKey];
    const base = (portfolioContent[lang][sectionKey] as Record<string, unknown>)[fieldKey];
    const v = ov ?? base;
    return typeof v === 'string' ? v : '';
  }

  function setVal(lang: Language, value: string) {
    // Updater funcional: sempre opera sobre o estado mais recente, nunca stale
    onChange((prev: ContentOverrides) => ({
      ...prev,
      [lang]: {
        ...prev[lang],
        [sectionKey]: {
          ...(prev[lang]?.[sectionKey] ?? {}),
          [fieldKey]: value,
        },
      },
    }));
  }

  async function doTranslate(text: string) {
    if (!text.trim()) return;
    setTranslating(true);
    // Ambas as traduções em paralelo — cada uma usa updater funcional para não conflitar
    const [en, es] = await Promise.all([autoTranslate(text, 'en'), autoTranslate(text, 'es')]);
    onChange((prev: ContentOverrides) => ({
      ...prev,
      en: { ...prev.en, [sectionKey]: { ...(prev.en?.[sectionKey] ?? {}), [fieldKey]: en } },
      es: { ...prev.es, [sectionKey]: { ...(prev.es?.[sectionKey] ?? {}), [fieldKey]: es } },
    }));
    setTranslating(false);
  }

  function handlePtChange(value: string) {
    setVal('pt', value);
    if (!shared) {
      if (debounceRef.current) clearTimeout(debounceRef.current);
      debounceRef.current = setTimeout(() => doTranslate(value), 900);
    }
  }

  const InputTag = type === 'textarea' ? 'textarea' : 'input';
  const extraProps = type === 'textarea' ? { rows } : {};

  return (
    <div className="space-y-1.5 group/row">
      <div className="flex items-center gap-2">
        <label className="text-[9px] font-mono font-bold uppercase tracking-widest text-white/30">{label}</label>
        {!shared && (
          <button
            onClick={() => doTranslate(getVal('pt'))}
            disabled={translating}
            className="opacity-0 group-hover/row:opacity-100 transition-opacity flex items-center gap-1 text-[9px] font-mono text-brand-secondary-red/60 hover:text-brand-secondary-red disabled:opacity-40"
          >
            {translating ? <Loader2 size={9} className="animate-spin" /> : <Languages size={9} />}
            {translating ? 'Traduzindo...' : 'Traduzir'}
          </button>
        )}
      </div>
      {shared ? (
        <InputTag
          value={getVal('pt')}
          onChange={e => {
            const v = e.target.value;
            LANGS.forEach(l => setVal(l, v));
          }}
          placeholder="(mesmo para todos os idiomas)"
          className={inp}
          {...(extraProps as object)}
        />
      ) : (
        <div className="grid grid-cols-3 gap-2">
          {LANGS.map(lang => (
            <div key={lang} className="relative">
              <InputTag
                value={getVal(lang)}
                onChange={e => {
                  if (lang === 'pt') handlePtChange(e.target.value);
                  else setVal(lang, e.target.value);
                }}
                placeholder={`${lang.toUpperCase()}…`}
                className={`${inp} pt-5`}
                {...(extraProps as object)}
              />
              <span className="absolute top-1.5 left-2.5 text-[8px] font-mono font-black uppercase text-white/20 pointer-events-none">
                {lang}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Password Gate ─────────────────────────────────────────────────────────────

function PasswordGate({ onAuth }: { onAuth: () => void }) {
  const [v, setV] = useState('');
  const [err, setErr] = useState('');
  const [lockedUntil, setLockedUntil] = useState(() => getLockoutState().until);

  const isLocked = Date.now() < lockedUntil;
  const secondsLeft = Math.ceil((lockedUntil - Date.now()) / 1000);

  function submit(e: React.SyntheticEvent) {
    e.preventDefault();
    if (isLocked) return;
    if (!ADMIN_PASSWORD) {
      setErr('Configure VITE_ADMIN_PASSWORD no ambiente de produção.');
      return;
    }
    const state = getLockoutState();
    if (v === ADMIN_PASSWORD) {
      setLockoutState({ attempts: 0, until: 0 });
      onAuth();
    } else {
      const attempts = state.attempts + 1;
      const until = attempts >= MAX_ATTEMPTS ? Date.now() + LOCKOUT_MS : 0;
      setLockoutState({ attempts, until });
      setLockedUntil(until);
      setErr(attempts >= MAX_ATTEMPTS
        ? `Muitas tentativas. Aguarde 5 minutos.`
        : `Senha incorreta. ${MAX_ATTEMPTS - attempts} tentativa(s) restante(s).`);
      setV('');
    }
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-6">
      <form onSubmit={submit} className="w-full max-w-xs space-y-4">
        <div className="text-center mb-8">
          <div className="w-10 h-10 bg-brand-primary-red/10 border border-brand-primary-red/20 rounded-xl flex items-center justify-center mx-auto mb-4">
            <span className="text-brand-primary-red font-black text-lg">K</span>
          </div>
          <h1 className="text-white font-black text-xl tracking-tight">Admin Panel</h1>
          <p className="text-white/25 text-xs mt-1 font-mono">portfólio · painel de controle</p>
        </div>
        <input type="password" value={v} onChange={e => { setV(e.target.value); setErr(''); }}
          placeholder="Senha" autoFocus disabled={isLocked} className={inp} />
        {isLocked && <p className="text-amber-400 text-xs font-mono flex items-center gap-1"><X size={10} /> Bloqueado — {secondsLeft}s restantes</p>}
        {err && !isLocked && <p className="text-red-400 text-xs font-mono flex items-center gap-1"><X size={10} /> {err}</p>}
        <button type="submit" disabled={isLocked} className="w-full bg-brand-primary-red hover:bg-brand-secondary-red disabled:opacity-40 text-white font-bold text-sm py-2.5 rounded-lg transition-colors">Entrar</button>
      </form>
    </div>
  );
}

// ─── Section Editors ──────────────────────────────────────────────────────────

function NavEditor({ overrides, onChange }: { overrides: ContentOverrides; onChange: OverridesUpdater }) {
  const fProps = (key: string) => ({ sectionKey: 'nav' as const, fieldKey: key, overrides, onChange });
  return (
    <div className="p-8 space-y-6 max-w-4xl">
      <SectionTitle icon="🔗" title="Navegação" desc="Labels do menu principal" />
      <FieldRow label="Início (Home)" {...fProps('home')} />
      <FieldRow label="Sobre" {...fProps('about')} />
      <FieldRow label="Projetos" {...fProps('projects')} />
      <FieldRow label="Contato" {...fProps('contact')} />
    </div>
  );
}

function HeroEditor({ overrides, onChange }: { overrides: ContentOverrides; onChange: OverridesUpdater }) {
  const fProps = (key: string, opts?: Partial<FieldRowProps>) => ({ sectionKey: 'hero' as const, fieldKey: key, overrides, onChange, ...opts });
  return (
    <div className="p-8 space-y-6 max-w-4xl">
      <SectionTitle icon="🏠" title="Hero" desc="Seção principal da página inicial" />
      <FieldRow label="Linha 1 do título" {...fProps('title_line1')} />
      <FieldRow label="Linha 2 do título" {...fProps('title_line2')} />
      <FieldRow label="Nome" {...fProps('title_name', { shared: true })} />
      <FieldRow label="Especialidade / Subtítulo" {...fProps('subtitle')} />
      <FieldRow label="Descrição principal" {...fProps('description', { type: 'textarea', rows: 4 })} />
      <div className="grid grid-cols-2 gap-4">
        <FieldRow label="Botão primário (CTA 1)" {...fProps('cta_primary')} />
        <FieldRow label="Botão secundário (CTA 2)" {...fProps('cta_secondary')} />
      </div>
      <FieldRow label="Badge de disponibilidade" {...fProps('badge_label')} />
      <div className="grid grid-cols-2 gap-4">
        <FieldRow label="Localização" {...fProps('location')} />
        <FieldRow label="Texto remoto" {...fProps('remote')} />
      </div>
      <FieldRow label="Barra de skills (texto)" {...fProps('skills')} />
      <div className="grid grid-cols-2 gap-4">
        <FieldRow label="Label experiência" {...fProps('exp_label')} />
        <FieldRow label="Valor experiência" {...fProps('exp_value')} />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <FieldRow label="Label projetos" {...fProps('projects_label')} />
        <FieldRow label="Valor projetos" {...fProps('projects_value')} />
      </div>
    </div>
  );
}

function AboutEditor({ overrides, onChange }: { overrides: ContentOverrides; onChange: OverridesUpdater }) {
  const fProps = (key: string, opts?: Partial<FieldRowProps>) => ({ sectionKey: 'about' as const, fieldKey: key, overrides, onChange, ...opts });
  return (
    <div className="p-8 space-y-6 max-w-4xl">
      <SectionTitle icon="👤" title="Sobre" desc="Página /sobre — bio e skills" />
      <FieldRow label="Título da página" {...fProps('page_title')} />
      <FieldRow label="Título da bio" {...fProps('bio_title')} />
      <FieldRow label="Parágrafo 1" {...fProps('bio_p1', { type: 'textarea', rows: 3 })} />
      <FieldRow label="Parágrafo 2" {...fProps('bio_p2', { type: 'textarea', rows: 3 })} />
      <FieldRow label="Parágrafo 3" {...fProps('bio_p3', { type: 'textarea', rows: 3 })} />
      <FieldRow label="Parágrafo 4" {...fProps('bio_p4', { type: 'textarea', rows: 3 })} />
      <FieldRow label="Frase de destaque" {...fProps('bio_highlight')} />
      <SkillsEditor overrides={overrides} onChange={onChange} />
    </div>
  );
}

function SkillsEditor({ overrides, onChange }: { overrides: ContentOverrides; onChange: OverridesUpdater }) {
  const [lang, setLang] = useState<Language>('pt');
  const base = portfolioContent[lang].about.skills;
  const ov = (overrides[lang]?.about as { skills?: typeof base } | undefined)?.skills ?? base;

  function setSkills(next: typeof base) {
    onChange((prev: ContentOverrides) => ({
      ...prev,
      [lang]: { ...prev[lang], about: { ...(prev[lang]?.about ?? {}), skills: next } },
    }));
  }
  function setCat(idx: number, val: string) {
    const n = ov.map((c, i) => i === idx ? { ...c, category: val } : c);
    setSkills(n);
  }
  function setItems(idx: number, val: string) {
    const items = val.split(',').map(s => s.trim()).filter(Boolean);
    const n = ov.map((c, i) => i === idx ? { ...c, items } : c);
    setSkills(n);
  }

  return (
    <div className="space-y-4 border-t border-white/[0.06] pt-6">
      <div className="flex items-center gap-3">
        <label className="text-[9px] font-mono font-bold uppercase tracking-widest text-white/30">Skills por categoria</label>
        <div className="flex gap-1 ml-auto">
          {LANGS.map(l => (
            <button key={l} onClick={() => setLang(l)}
              className={`px-3 py-1 rounded-full text-[9px] font-mono font-black uppercase tracking-widest transition-colors ${lang === l ? 'bg-brand-primary-red text-white' : 'text-white/25 hover:text-white'}`}>
              {l}
            </button>
          ))}
        </div>
      </div>
      {ov.map((cat, idx) => (
        <div key={idx} className="p-3 bg-white/[0.02] border border-white/[0.06] rounded-lg space-y-2">
          <Field label={`Categoria ${idx + 1}`}>
            <input value={cat.category} onChange={e => setCat(idx, e.target.value)} className={inp} />
          </Field>
          <Field label="Itens (separados por vírgula)">
            <input value={cat.items.join(', ')} onChange={e => setItems(idx, e.target.value)} className={inp} />
          </Field>
        </div>
      ))}
    </div>
  );
}

function ProjectsTextEditor({ overrides, onChange }: { overrides: ContentOverrides; onChange: OverridesUpdater }) {
  const fProps = (key: string, opts?: Partial<FieldRowProps>) => ({ sectionKey: 'projects' as const, fieldKey: key, overrides, onChange, ...opts });
  return (
    <div className="p-8 space-y-6 max-w-4xl">
      <SectionTitle icon="🗂" title="Projetos — textos" desc="Página /projetos — cabeçalho e labels" />
      <FieldRow label="Título da página" {...fProps('page_title')} />
      <FieldRow label="Subtítulo (etiqueta)" {...fProps('page_subtitle')} />
      <div className="grid grid-cols-2 gap-4">
        <FieldRow label="Linha 1 do título" {...fProps('title_line1')} />
        <FieldRow label="Linha 2 do título" {...fProps('title_line2')} />
      </div>
      <FieldRow label="Descrição" {...fProps('description', { type: 'textarea', rows: 3 })} />
      <FieldRow label="Botão ver projeto" {...fProps('view_project')} />
    </div>
  );
}

function RecentWorksEditor({ overrides, onChange }: { overrides: ContentOverrides; onChange: OverridesUpdater }) {
  const fProps = (key: string) => ({ sectionKey: 'recent_works' as const, fieldKey: key, overrides, onChange });
  return (
    <div className="p-8 space-y-6 max-w-4xl">
      <SectionTitle icon="⚡" title="Trabalhos Recentes" desc="Carrossel marquee na home" />
      <FieldRow label="Subtítulo" {...fProps('subtitle')} />
      <div className="grid grid-cols-2 gap-4">
        <FieldRow label="Título parte 1" {...fProps('title_part1')} />
        <FieldRow label="Título parte 2" {...fProps('title_part2')} />
      </div>
      <FieldRow label="Link ver todos" {...fProps('view_all')} />
    </div>
  );
}

function ProcessEditor({ overrides, onChange }: { overrides: ContentOverrides; onChange: OverridesUpdater }) {
  const fProps = (key: string, opts?: Partial<FieldRowProps>) => ({ sectionKey: 'process' as const, fieldKey: key, overrides, onChange, ...opts });
  return (
    <div className="p-8 space-y-6 max-w-4xl">
      <SectionTitle icon="⚙️" title="Metodologia" desc="Seção de processo na home" />
      <FieldRow label="Título da seção" {...fProps('title')} />
      <FieldRow label="Subtítulo" {...fProps('subtitle')} />
      <FieldRow label="Descrição" {...fProps('description', { type: 'textarea', rows: 3 })} />
      <ProcessStepsEditor overrides={overrides} onChange={onChange} />
    </div>
  );
}

function ProcessStepsEditor({ overrides, onChange }: { overrides: ContentOverrides; onChange: OverridesUpdater }) {
  const [translating, setTranslating] = useState<Record<string, boolean>>({});

  function getSteps(lang: Language) {
    const ov = (overrides[lang]?.process as { steps?: typeof portfolioContent.pt.process.steps } | undefined)?.steps;
    return ov ?? portfolioContent[lang].process.steps;
  }

  function setStep(lang: Language, idx: number, key: string, val: string) {
    onChange((prev: ContentOverrides) => {
      const baseSteps = (prev[lang]?.process as { steps?: typeof portfolioContent.pt.process.steps } | undefined)?.steps
        ?? portfolioContent[lang].process.steps;
      const steps = baseSteps.map((s, i) => i === idx ? { ...s, [key]: val } : s);
      return { ...prev, [lang]: { ...prev[lang], process: { ...(prev[lang]?.process ?? {}), steps } } };
    });
  }

  async function translateStep(idx: number, key: string, ptVal: string) {
    const tKey = `${idx}-${key}`;
    setTranslating(p => ({ ...p, [tKey]: true }));
    const [en, es] = await Promise.all([autoTranslate(ptVal, 'en'), autoTranslate(ptVal, 'es')]);
    // Atualiza EN e ES num único updater funcional para evitar race condition
    onChange((prev: ContentOverrides) => {
      const makeSteps = (lang: Language, val: string) => {
        const base = (prev[lang]?.process as { steps?: typeof portfolioContent.pt.process.steps } | undefined)?.steps
          ?? portfolioContent[lang].process.steps;
        return base.map((s, i) => i === idx ? { ...s, [key]: val } : s);
      };
      return {
        ...prev,
        en: { ...prev.en, process: { ...(prev.en?.process ?? {}), steps: makeSteps('en', en) } },
        es: { ...prev.es, process: { ...(prev.es?.process ?? {}), steps: makeSteps('es', es) } },
      };
    });
    setTranslating(p => ({ ...p, [tKey]: false }));
  }

  const ptSteps = getSteps('pt');

  return (
    <div className="space-y-4 border-t border-white/[0.06] pt-6">
      <label className="text-[9px] font-mono font-bold uppercase tracking-widest text-white/30 block">Etapas</label>
      {ptSteps.map((step, idx) => (
        <div key={step.id} className="p-4 bg-white/[0.02] border border-white/[0.06] rounded-xl space-y-4">
          <p className="text-[9px] font-mono text-brand-secondary-red uppercase tracking-widest">Etapa {step.id}</p>
          {(['title', 'description'] as const).map(key => {
            const tKey = `${idx}-${key}`;
            const ptVal = getSteps('pt')[idx]?.[key] ?? '';
            return (
              <div key={key} className="space-y-1.5 group/row">
                <div className="flex items-center gap-2">
                  <label className="text-[9px] font-mono font-bold uppercase tracking-widest text-white/25">{key === 'title' ? 'Título' : 'Descrição'}</label>
                  <button
                    onClick={() => translateStep(idx, key, ptVal)}
                    disabled={!!translating[tKey]}
                    className="opacity-0 group-hover/row:opacity-100 transition-opacity flex items-center gap-1 text-[9px] font-mono text-brand-secondary-red/60 hover:text-brand-secondary-red disabled:opacity-40"
                  >
                    {translating[tKey] ? <Loader2 size={9} className="animate-spin" /> : <Languages size={9} />}
                    {translating[tKey] ? 'Traduzindo...' : 'Traduzir'}
                  </button>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {LANGS.map(lang => {
                    const val = getSteps(lang)[idx]?.[key] ?? '';
                    const Tag = key === 'description' ? 'textarea' : 'input';
                    return (
                      <div key={lang} className="relative">
                        <Tag
                          value={val}
                          onChange={e => setStep(lang, idx, key, e.target.value)}
                          rows={key === 'description' ? 2 : undefined}
                          className={`${inp} pt-5`}
                        />
                        <span className="absolute top-1.5 left-2.5 text-[8px] font-mono font-black uppercase text-white/20 pointer-events-none">{lang}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}

function ContactEditor({ overrides, onChange }: { overrides: ContentOverrides; onChange: OverridesUpdater }) {
  const fProps = (key: string, opts?: Partial<FieldRowProps>) => ({ sectionKey: 'contact' as const, fieldKey: key, overrides, onChange, ...opts });
  return (
    <div className="p-8 space-y-6 max-w-4xl">
      <SectionTitle icon="✉️" title="Contato" desc="Página /contato — textos e links" />
      <FieldRow label="Título da página" {...fProps('page_title')} />
      <FieldRow label="Subtítulo" {...fProps('subtitle')} />
      <FieldRow label="Descrição" {...fProps('description', { type: 'textarea', rows: 3 })} />
      <div className="border-t border-white/[0.06] pt-4 space-y-4">
        <label className="text-[9px] font-mono font-bold uppercase tracking-widest text-white/30 block">Links (iguais em todos os idiomas)</label>
        <FieldRow label="E-mail (mailto:)" {...fProps('email', { shared: true, type: 'url' })} />
        <FieldRow label="LinkedIn URL" {...fProps('linkedin', { shared: true, type: 'url' })} />
        <FieldRow label="GitHub URL" {...fProps('github', { shared: true, type: 'url' })} />
        <FieldRow label="WhatsApp URL" {...fProps('whatsapp', { shared: true, type: 'url' })} />
      </div>
    </div>
  );
}

// ─── Projects CMS ─────────────────────────────────────────────────────────────

function ProjectEditor({ project, onChange, onDelete }: {
  project: ProjectData; onChange: (p: ProjectData) => void; onDelete: () => void;
}) {
  const [lang, setLang] = useState<Language>('pt');
  const [translating, setTranslating] = useState(false);
  const [fieldTranslating, setFieldTranslating] = useState<Partial<Record<keyof ProjectData['pt'], boolean>>>({});
  const projectRef = useRef(project);
  const debounceRefs = useRef<Partial<Record<keyof ProjectData['pt'], ReturnType<typeof setTimeout>>>>({});
  useEffect(() => { projectRef.current = project; }, [project]);

  function set<K extends keyof ProjectData>(k: K, v: ProjectData[K]) { onChange({ ...project, [k]: v }); }
  function setL(l: Language, k: keyof ProjectData['pt'], v: string) { onChange({ ...project, [l]: { ...project[l], [k]: v } }); }

  async function translateLang() {
    setTranslating(true);
    const fields: (keyof ProjectData['pt'])[] = ['name', 'highlight', 'detail'];
    const results = await Promise.all(
      fields.flatMap(k => [autoTranslate(project.pt[k], 'en'), autoTranslate(project.pt[k], 'es')])
    );
    let r = 0;
    const next = { ...project };
    for (const k of fields) {
      next.en = { ...next.en, [k]: results[r++] };
      next.es = { ...next.es, [k]: results[r++] };
    }
    onChange(next);
    setTranslating(false);
  }

  function handlePtFieldChange(field: keyof ProjectData['pt'], value: string) {
    setL('pt', field, value);
    if (debounceRefs.current[field]) clearTimeout(debounceRefs.current[field]);
    debounceRefs.current[field] = setTimeout(async () => {
      if (!value.trim()) return;
      setFieldTranslating(p => ({ ...p, [field]: true }));
      const [en, es] = await Promise.all([autoTranslate(value, 'en'), autoTranslate(value, 'es')]);
      const cur = projectRef.current;
      onChange({ ...cur, en: { ...cur.en, [field]: en }, es: { ...cur.es, [field]: es } });
      setFieldTranslating(p => ({ ...p, [field]: false }));
    }, 900);
  }

  const translatingAny = Object.values(fieldTranslating).some(Boolean);

  return (
    <div className="p-8 space-y-6 max-w-4xl">
      <div className="flex items-center justify-between">
        <h2 className="text-white font-black text-lg truncate">{project.pt.name || project.repoName || 'Novo Projeto'}</h2>
        <div className="flex items-center gap-2">
          <button onClick={translateLang} disabled={translating}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono text-brand-secondary-red border border-brand-secondary-red/20 rounded-lg hover:bg-brand-secondary-red/10 disabled:opacity-40 transition-colors">
            {translating ? <Loader2 size={11} className="animate-spin" /> : <Languages size={11} />}
            {translating ? 'Traduzindo...' : 'Auto-traduzir PT→EN/ES'}
          </button>
          <button onClick={onDelete} className="flex items-center gap-1 px-3 py-1.5 text-xs font-mono text-red-400/60 hover:text-red-400 border border-red-400/10 hover:border-red-400/30 rounded-lg transition-colors">
            <Trash2 size={11} /> Remover
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Field label="Nome do repositório GitHub">
          <input value={project.repoName} onChange={e => set('repoName', e.target.value)} placeholder="ex: meu-portfolio" className={inp} />
        </Field>
        <Field label="URL ao vivo">
          <input value={project.liveUrl} onChange={e => set('liveUrl', e.target.value)} placeholder="https://..." className={inp} />
        </Field>
      </div>
      <Field label="Imagem de capa (URL ou /caminho.png)">
        <div className="flex gap-2">
          <input value={project.coverImage} onChange={e => set('coverImage', e.target.value)} placeholder="/capa.png" className={inp} />
          {project.coverImage && <img src={project.coverImage} alt="" className="w-12 h-12 rounded-lg object-cover border border-white/10 shrink-0" />}
        </div>
      </Field>
      <div className="grid grid-cols-2 gap-4">
        <Field label="Ferramentas (uma por linha)">
          <textarea rows={3} value={project.tools.join('\n')} onChange={e => set('tools', e.target.value.split('\n').filter(Boolean))} placeholder={"React\nNode.js"} className={inp} />
        </Field>
        <Field label="Screenshots (URLs, uma por linha)">
          <textarea rows={3} value={project.screenshots.join('\n')} onChange={e => set('screenshots', e.target.value.split('\n').filter(Boolean))} placeholder={"/print1.png"} className={inp} />
        </Field>
      </div>

      <div className="border-t border-white/[0.06] pt-4">
        <div className="flex items-center gap-2 mb-4">
          <div className="flex gap-1">
            {LANGS.map(l => (
              <button key={l} onClick={() => setLang(l)}
                className={`px-3 py-1 rounded-full text-[9px] font-mono font-black uppercase tracking-widest transition-colors ${lang === l ? 'bg-brand-primary-red text-white' : 'text-white/25 hover:text-white'}`}>
                {l}
              </button>
            ))}
          </div>
          {lang === 'pt' && translatingAny && (
            <span className="flex items-center gap-1 text-[9px] font-mono text-brand-secondary-red/60">
              <Loader2 size={9} className="animate-spin" /> Traduzindo...
            </span>
          )}
          {lang === 'pt' && !translatingAny && (
            <span className="text-[9px] font-mono text-white/15">Digitar em PT traduz EN/ES automaticamente</span>
          )}
        </div>
        <div className="space-y-4">
          <div className="space-y-1.5 group/row">
            <div className="flex items-center gap-2">
              <label className="text-[9px] font-mono font-bold uppercase tracking-widest text-white/30">Nome do projeto</label>
              {lang === 'pt' && fieldTranslating.name && <Loader2 size={9} className="animate-spin text-brand-secondary-red/60" />}
            </div>
            <input
              value={project[lang].name}
              onChange={e => lang === 'pt' ? handlePtFieldChange('name', e.target.value) : setL(lang, 'name', e.target.value)}
              placeholder="Nome exibido no card"
              className={inp}
            />
          </div>
          <div className="space-y-1.5 group/row">
            <div className="flex items-center gap-2">
              <label className="text-[9px] font-mono font-bold uppercase tracking-widest text-white/30">Destaque (frase curta)</label>
              {lang === 'pt' && fieldTranslating.highlight && <Loader2 size={9} className="animate-spin text-brand-secondary-red/60" />}
            </div>
            <input
              value={project[lang].highlight}
              onChange={e => lang === 'pt' ? handlePtFieldChange('highlight', e.target.value) : setL(lang, 'highlight', e.target.value)}
              placeholder="Frase de destaque"
              className={inp}
            />
          </div>
          <div className="space-y-1.5 group/row">
            <div className="flex items-center gap-2">
              <label className="text-[9px] font-mono font-bold uppercase tracking-widest text-white/30">Descrição detalhada</label>
              {lang === 'pt' && fieldTranslating.detail && <Loader2 size={9} className="animate-spin text-brand-secondary-red/60" />}
            </div>
            <textarea
              rows={4}
              value={project[lang].detail}
              onChange={e => lang === 'pt' ? handlePtFieldChange('detail', e.target.value) : setL(lang, 'detail', e.target.value)}
              placeholder="Descrição completa do projeto..."
              className={inp}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function SectionTitle({ icon, title, desc }: { icon: string; title: string; desc: string }) {
  return (
    <div className="pb-2 border-b border-white/[0.06]">
      <div className="flex items-center gap-2 mb-1">
        <span>{icon}</span>
        <h2 className="text-white font-black text-xl">{title}</h2>
      </div>
      <p className="text-white/30 text-xs font-mono">{desc}</p>
      <p className="text-white/15 text-[10px] font-mono mt-1 flex items-center gap-1">
        <Languages size={9} />  Passe o mouse sobre um campo e clique em "Traduzir" para auto-traduzir PT→EN/ES. Editar PT auto-traduz após 1,2s.
      </p>
    </div>
  );
}

// ─── Admin Panel ──────────────────────────────────────────────────────────────

const SECTIONS: { key: Section; label: string; icon: string }[] = [
  { key: 'nav', label: 'Navegação', icon: '🔗' },
  { key: 'hero', label: 'Hero', icon: '🏠' },
  { key: 'sobre', label: 'Sobre', icon: '👤' },
  { key: 'projetos-texto', label: 'Projetos (textos)', icon: '🗂' },
  { key: 'recentes', label: 'Trabalhos Recentes', icon: '⚡' },
  { key: 'processo', label: 'Metodologia', icon: '⚙️' },
  { key: 'contato', label: 'Contato', icon: '✉️' },
  { key: 'projetos-cms', label: 'Projetos (CMS)', icon: '📦' },
];

function AdminPanel({ onLogout }: { onLogout: () => void }) {
  const [data, setData] = useState<SiteData>({ version: 2, projects: [], overrides: {} });
  const [section, setSection] = useState<Section>('hero');
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const [draftSaved, setDraftSaved] = useState(false);
  const [loading, setLoading] = useState(true);
  const [hasChanges, setHasChanges] = useState(false);
  const [githubRepos, setGithubRepos] = useState<GithubRepo[]>([]);
  const [loadingRepos, setLoadingRepos] = useState(false);

  useEffect(() => {
    loadSiteData().then(d => { setData(d); setLoading(false); });
  }, []);

  // Busca repos GitHub ao entrar na seção de projetos
  useEffect(() => {
    if (section !== 'projetos-cms' || githubRepos.length > 0) return;
    setLoadingRepos(true);
    fetchGithubProjects().then(repos => { setGithubRepos(repos); setLoadingRepos(false); });
  }, [section, githubRepos.length]);

  // Atualiza apenas o estado React — sem salvar no localStorage automaticamente
  const update = useCallback((next: SiteData | ((prev: SiteData) => SiteData)) => {
    setData(prev => {
      const resolved = typeof next === 'function' ? next(prev) : next;
      return resolved;
    });
    setHasChanges(true);
  }, []);

  function saveDraftManual() {
    saveDraft(data);
    setDraftSaved(true);
    setHasChanges(false);
    setTimeout(() => setDraftSaved(false), 2500);
  }

  function handleImport(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) { alert('Arquivo muito grande (máx. 2 MB).'); e.target.value = ''; return; }
    const reader = new FileReader();
    reader.onload = ev => {
      try {
        const parsed = JSON.parse(ev.target?.result as string) as Record<string, unknown>;
        if (typeof parsed !== 'object' || parsed === null || !('version' in parsed)) {
          alert('JSON inválido: estrutura não reconhecida.');
          return;
        }
        update(parsed as unknown as SiteData);
      } catch { alert('JSON inválido: erro ao interpretar o arquivo.'); }
    };
    reader.readAsText(file);
    e.target.value = '';
  }

  function setOverrides(o: ContentOverrides | ((prev: ContentOverrides) => ContentOverrides)) {
    update(prev => {
      const resolved = typeof o === 'function' ? o(prev.overrides ?? {}) : o;
      return { ...prev, overrides: resolved };
    });
  }

  const overrides = data.overrides ?? {};

  return (
    <div className="h-screen bg-[#0a0a0a] flex flex-col overflow-hidden">
      {/* Header */}
      <header className="h-12 border-b border-white/[0.06] flex items-center justify-between px-5 shrink-0">
        <div className="flex items-center gap-3">
          <Link to="/" className="flex items-center gap-1.5 text-white/20 hover:text-white transition-colors text-xs font-mono">
            <ArrowLeft size={12} /> Site
          </Link>
          <span className="text-white/10">·</span>
          <span className="text-white font-bold text-sm">Admin</span>
          {hasChanges && !draftSaved && (
            <span className="text-[9px] font-mono text-amber-400/70 flex items-center gap-1">
              · alterações não salvas
            </span>
          )}
          {draftSaved && (
            <span className="text-[9px] font-mono text-emerald-400 flex items-center gap-1">
              <Save size={8} /> Rascunho salvo
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <label className="flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-mono text-white/35 hover:text-white border border-white/[0.08] rounded-lg cursor-pointer transition-colors">
            <Upload size={11} /> Importar JSON
            <input type="file" accept=".json" className="hidden" onChange={handleImport} />
          </label>
          <button onClick={saveDraftManual}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-bold rounded-lg border transition-colors ${hasChanges ? 'text-white border-white/20 hover:border-white/40' : 'text-white/25 border-white/[0.06] cursor-default'}`}>
            <Save size={11} /> Salvar rascunho
          </button>
          <button onClick={() => exportSiteData(data)}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-brand-primary-red hover:bg-brand-secondary-red text-white text-[11px] font-bold rounded-lg transition-colors">
            <Download size={11} /> Exportar JSON
          </button>
          <button onClick={() => { clearDraft(); onLogout(); }} className="p-2 text-white/20 hover:text-white/60 transition-colors" title="Sair">
            <LogOut size={14} />
          </button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="w-48 border-r border-white/[0.06] flex flex-col shrink-0 overflow-y-auto">
          <nav className="py-2">
            {SECTIONS.map(s => (
              <button key={s.key} onClick={() => { setSection(s.key); setSelectedProject(null); }}
                className={`w-full text-left px-4 py-2.5 flex items-center justify-between text-xs font-medium transition-colors ${section === s.key ? 'text-white bg-white/[0.04] border-r-2 border-brand-primary-red' : 'text-white/40 hover:text-white hover:bg-white/[0.02]'}`}>
                <span className="flex items-center gap-2">
                  <span className="text-sm">{s.icon}</span>
                  <span>{s.label}</span>
                </span>
                <ChevronRight size={11} className={section === s.key ? 'text-brand-primary-red' : 'text-white/10'} />
              </button>
            ))}
          </nav>

          {/* Project list — GitHub repos + CMS data */}
          {section === 'projetos-cms' && (
            <div className="border-t border-white/[0.06] flex-1 overflow-y-auto">
              <div className="flex items-center justify-between px-4 py-2.5">
                <span className="text-[9px] font-mono uppercase tracking-widest text-white/20">
                  {githubRepos.length > 0 ? `${githubRepos.length} repos` : `${data.projects.length} projetos`}
                </span>
                <button
                  onClick={() => {
                    const blank = emptyProject();
                    update({ ...data, projects: [...data.projects, blank] });
                    setSelectedProject(data.projects.length);
                  }}
                  className="text-[9px] font-mono text-brand-secondary-red hover:text-brand-primary-red flex items-center gap-0.5 transition-colors">
                  <Plus size={10} /> Novo
                </button>
              </div>

              {loading || loadingRepos ? (
                <div className="px-4 py-6 text-center"><Loader2 size={14} className="animate-spin text-white/20 mx-auto" /></div>
              ) : githubRepos.length > 0 ? (
                <>
                  {/* Repos do GitHub — todos listados */}
                  {githubRepos.map((repo) => {
                    const cmsIdx = data.projects.findIndex(p => p.repoName === repo.name);
                    const hasCms = cmsIdx !== -1;
                    const isSelected = hasCms && selectedProject === cmsIdx;

                    function handleClick() {
                      if (hasCms) {
                        setSelectedProject(cmsIdx);
                      } else {
                        // Cria entrada pré-preenchida com o nome do repo
                        const novo: ProjectData = {
                          ...emptyProject(),
                          repoName: repo.name,
                          pt: { name: repo.name.replace(/[-_]/g, ' '), highlight: '', detail: '' },
                          en: { name: repo.name.replace(/[-_]/g, ' '), highlight: '', detail: '' },
                          es: { name: repo.name.replace(/[-_]/g, ' '), highlight: '', detail: '' },
                        };
                        const nextProjects = [...data.projects, novo];
                        update({ ...data, projects: nextProjects });
                        setSelectedProject(nextProjects.length - 1);
                      }
                    }

                    return (
                      <button key={repo.id} onClick={handleClick}
                        className={`w-full text-left px-4 py-2.5 transition-colors flex items-center gap-2 ${isSelected ? 'bg-white/[0.05] border-r-2 border-brand-primary-red' : 'hover:bg-white/[0.02]'}`}>
                        {/* Indicador: vermelho = tem dados CMS, cinza = só GitHub */}
                        <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${hasCms ? 'bg-brand-primary-red' : 'bg-white/15'}`} />
                        <div className="min-w-0">
                          <p className={`text-[11px] font-medium truncate ${isSelected ? 'text-white' : hasCms ? 'text-white/60' : 'text-white/30'}`}>
                            {hasCms ? (data.projects[cmsIdx].pt.name || repo.name) : repo.name}
                          </p>
                          {repo.language && (
                            <p className="text-[9px] font-mono text-white/15 truncate">{repo.language}</p>
                          )}
                        </div>
                      </button>
                    );
                  })}

                  {/* Projetos manuais que não têm repo no GitHub */}
                  {data.projects.filter(p => !githubRepos.find(r => r.name === p.repoName)).map((p, i) => {
                    const realIdx = data.projects.indexOf(p);
                    return (
                      <button key={`manual-${i}`} onClick={() => setSelectedProject(realIdx)}
                        className={`w-full text-left px-4 py-2.5 transition-colors flex items-center gap-2 ${selectedProject === realIdx ? 'bg-white/[0.05] border-r-2 border-brand-primary-red' : 'hover:bg-white/[0.02]'}`}>
                        <span className="w-1.5 h-1.5 rounded-full shrink-0 bg-amber-400/60" />
                        <div className="min-w-0">
                          <p className={`text-[11px] font-medium truncate ${selectedProject === realIdx ? 'text-white' : 'text-white/50'}`}>{p.pt.name || p.repoName || 'Sem nome'}</p>
                          <p className="text-[9px] font-mono text-white/15">externo</p>
                        </div>
                      </button>
                    );
                  })}
                </>
              ) : (
                // Fallback: só lista os do JSON se GitHub não carregou
                data.projects.map((p, i) => (
                  <button key={i} onClick={() => setSelectedProject(i)}
                    className={`w-full text-left px-4 py-2.5 transition-colors ${selectedProject === i ? 'bg-white/[0.05] border-r-2 border-brand-primary-red' : 'hover:bg-white/[0.02]'}`}>
                    <p className={`text-[11px] font-medium truncate ${selectedProject === i ? 'text-white' : 'text-white/35'}`}>{p.pt.name || p.repoName || 'Sem nome'}</p>
                    <p className="text-[9px] font-mono text-white/15 truncate">{p.repoName}</p>
                  </button>
                ))
              )}

              {/* Legenda */}
              {githubRepos.length > 0 && (
                <div className="px-4 py-3 border-t border-white/[0.04] space-y-1">
                  <div className="flex items-center gap-1.5 text-[8px] font-mono text-white/20">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-primary-red" /> com dados CMS
                  </div>
                  <div className="flex items-center gap-1.5 text-[8px] font-mono text-white/20">
                    <span className="w-1.5 h-1.5 rounded-full bg-white/15" /> clique para adicionar
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Export hint */}
          <div className="p-3 border-t border-white/[0.06] mt-auto">
            <p className="text-[9px] font-mono text-white/15 leading-relaxed">
              Exporte → salve como<br />
              <code className="text-brand-secondary-red/50">/public/site-data.json</code>
            </p>
          </div>
        </aside>

        {/* Main */}
        <main className="flex-1 overflow-y-auto">
          {section === 'nav' && <NavEditor overrides={overrides} onChange={setOverrides} />}
          {section === 'hero' && <HeroEditor overrides={overrides} onChange={setOverrides} />}
          {section === 'sobre' && <AboutEditor overrides={overrides} onChange={setOverrides} />}
          {section === 'projetos-texto' && <ProjectsTextEditor overrides={overrides} onChange={setOverrides} />}
          {section === 'recentes' && <RecentWorksEditor overrides={overrides} onChange={setOverrides} />}
          {section === 'processo' && <ProcessEditor overrides={overrides} onChange={setOverrides} />}
          {section === 'contato' && <ContactEditor overrides={overrides} onChange={setOverrides} />}
          {section === 'projetos-cms' && selectedProject !== null && data.projects[selectedProject] ? (
            <ProjectEditor
              key={selectedProject}
              project={data.projects[selectedProject]}
              onChange={p => update({ ...data, projects: data.projects.map((x, i) => i === selectedProject ? p : x) })}
              onDelete={() => { update({ ...data, projects: data.projects.filter((_, i) => i !== selectedProject) }); setSelectedProject(null); }}
            />
          ) : section === 'projetos-cms' ? (
            <div className="flex-1 h-full flex items-center justify-center p-12">
              <div className="text-center space-y-2">
                <p className="text-white/20 text-sm">Selecione um projeto ou clique em <strong className="text-brand-secondary-red/60">+ Novo</strong></p>
              </div>
            </div>
          ) : null}
        </main>
      </div>
    </div>
  );
}

// ─── Root ──────────────────────────────────────────────────────────────────────

export default function Admin() {
  const [authed, setAuthed] = useState(() => sessionStorage.getItem(AUTH_KEY) === '1');
  function login() { sessionStorage.setItem(AUTH_KEY, '1'); setAuthed(true); }
  function logout() { sessionStorage.removeItem(AUTH_KEY); setAuthed(false); }
  return authed ? <AdminPanel onLogout={logout} /> : <PasswordGate onAuth={login} />;
}
