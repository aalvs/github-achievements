import { Difficulty } from './types';
import { ACHIEVEMENTS } from './constants';
import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Globe,
  Lock,
  Info,
  Github,
  ExternalLink,
  Sparkles,
  Zap,
  Search,
  Loader2,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';


type Language = 'en' | 'pt';
type Filter = 'all' | 'obtainable' | 'legacy';

const DifficultyBadge = ({ difficulty, lang }: { difficulty: Difficulty; lang: Language }) => {
  const colors = {
    Easy: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    Medium: 'bg-amber-100 text-amber-700 border-amber-200',
    Hard: 'bg-rose-100 text-rose-700 border-rose-200',
    Legacy: 'bg-slate-100 text-slate-700 border-slate-200',
  };

  const labels = {
    Easy: { en: 'Easy', pt: 'Fácil' },
    Medium: { en: 'Medium', pt: 'Médio' },
    Hard: { en: 'Hard', pt: 'Difícil' },
    Legacy: { en: 'Legacy', pt: 'Legado' },
  };

  return (
    <span className={`px-2 py-0.5 rounded-full text-xs font-semibold border ${colors[difficulty]}`}>
      {labels[difficulty][lang]}
    </span>
  );
};

export default function App() {
  const [lang, setLang] = useState<Language>('pt');
  const [filter, setFilter] = useState<Filter>('obtainable');
  const [username, setUsername] = useState('');
  const [scanning, setScanning] = useState(false);
  const [unlockedIds, setUnlockedIds] = useState<string[]>([]);
  const [scanError, setScanError] = useState<string | null>(null);

  const handleScan = async (e: React.SubmitEvent) => {
    e.preventDefault();
    if (!username.trim()) return;

    setScanning(true);
    setScanError(null);
    try {
      const response = await fetch(`/api/scan/${username.trim()}`);
      if (!response.ok) throw new Error('Scan failed');
      const data = await response.json();
      setUnlockedIds(data.unlockedIds);
    } catch (err) {
      setScanError(t.scannerError[lang]);
      setUnlockedIds([]);
    } finally {
      setScanning(false);
    }
  };

  const filteredAchievements = useMemo(() => {
    return ACHIEVEMENTS.filter((a) => {
      if (filter === 'all') return true;
      if (filter === 'obtainable') return !a.isLegacy;
      if (filter === 'legacy') return a.isLegacy;
      return true;
    }).sort((a, b) => a.order - b.order);
  }, [filter]);

  const t = {
    title: { en: 'GitHub Achievements', pt: 'Conquistas do GitHub' },
    subtitle: {
      en: 'A roadmap to unlock all GitHub badges, from easiest to hardest.',
      pt: 'Um guia para desbloquear todos os badges do GitHub, do mais fácil ao mais difícil.'
    },
    filters: {
      all: { en: 'All', pt: 'Todas' },
      obtainable: { en: 'Obtainable', pt: 'Obtíveis' },
      legacy: { en: 'Legacy', pt: 'Legado' },
    },
    howTo: { en: 'How to get', pt: 'Como conseguir' },
    noResults: { en: 'No achievements found.', pt: 'Nenhuma conquista encontrada.' },
    aboutTitle: { en: 'What are GitHub Achievements?', pt: 'O que são as Conquistas do GitHub?' },
    aboutDescription: {
      en: 'Launched on June 9, 2022, GitHub Achievements are digital badges that celebrate your journey as a developer. They recognize your contributions to open source, community engagement, and specific milestones on the platform.',
      pt: 'Lançadas em 9 de junho de 2022, as Conquistas do GitHub são badges digitais que celebram sua jornada como desenvolvedor. Elas reconhecem suas contribuições para o código aberto, engajamento na comunidade e marcos específicos na plataforma.'
    },
    authorTitle: { en: 'About the Author', pt: 'Sobre o Autor' },
    authorDescription: {
      en: 'Frontend Developer and UX/UI Designer',
      pt: 'Frontend Developer e UX/UI Designer'
    },
    scannerTitle: { en: 'Scan your Profile', pt: 'Escaneie seu Perfil' },
    scannerIncentive: {
      en: 'Curious about your progress? Scan your profile to see which badges you already have!',
      pt: 'Curioso sobre seu progresso? Escaneie seu perfil para ver quais badges você já conquistou!'
    },
    scannerPlaceholder: { en: 'Enter GitHub username', pt: 'Digite o usuário do GitHub' },
    scannerButton: { en: 'Scan', pt: 'Escanear' },
    scannerLoading: { en: 'Scanning...', pt: 'Escaneando...' },
    scannerSuccess: { en: 'Scan complete!', pt: 'Escaneamento concluído!' },
    scannerError: { en: 'User not found or profile is private.', pt: 'Usuário não encontrado ou perfil privado.' },
    unlocked: { en: 'Unlocked', pt: 'Conquistado' },
    locked: { en: 'Locked', pt: 'Bloqueado' },
  };

  return (
    <div className="min-h-screen bg-[#0d1117] text-[#c9d1d9] font-sans selection:bg-blue-500/30">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#0d1117]/80 backdrop-blur-md border-b border-[#30363d] py-4">
        <div className="max-w-4xl mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="bg-slate-600 p-2 rounded-lg shadow-lg shadow-blue-500/20">
              <Github className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-xl font-bold text-white tracking-tight hidden sm:block">
              {t.title[lang]}
            </h1>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setLang(lang === 'en' ? 'pt' : 'en')}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#21262d] hover:bg-[#30363d] border border-[#30363d] transition-all text-sm font-medium"
            >
              <Globe className="w-4 h-4" />
              {lang.toUpperCase()}
            </button>
            <a
              href="https://github.com/aalvs/github-achievements"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full hover:bg-[#30363d] transition-colors"
            >
              <Github className="w-5 h-5" />
            </a>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-4xl sm:text-5xl font-extrabold text-white mb-4 tracking-tight">
              {t.title[lang]}
            </h2>
            <p className="text-[#8b949e] text-lg max-w-2xl mx-auto">
              {t.subtitle[lang]}
            </p>
          </motion.div>

          {/* About Section */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-8 max-w-2xl mx-auto bg-[#161b22] border border-[#30363d] rounded-2xl p-6 text-left"
          >
            <div className="flex items-center gap-2 text-blue-400 font-bold mb-2">
              <Info className="w-4 h-4" />
              {t.aboutTitle[lang]}
            </div>
            <p className="text-[#8b949e] text-sm text-center mt-2">
              {t.aboutDescription[lang]}
            </p>
          </motion.div>

          {/* Scanner Section */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="hidden mt-8 max-w-2xl mx-auto"
          >
            <div className="text-center mb-6">
              <h3 className="text-xl font-bold text-white mb-2 flex items-center justify-center gap-2">
                <Sparkles className="w-5 h-5 text-blue-400" />
                {t.scannerTitle[lang]}
              </h3>
              <p className="text-sm text-[#8b949e]">
                {t.scannerIncentive[lang]}
              </p>
            </div>
            <form onSubmit={handleScan} className="relative group">
              <div className="absolute -inset-1 bg-linear-to-r from-blue-500 to-cyan-500 rounded-2xl blur opacity-20 group-focus-within:opacity-40 transition duration-500" />
              <div className="relative flex flex-col sm:flex-row gap-3 bg-[#161b22] border border-[#30363d] p-2 rounded-2xl">
                <div className="flex-1 flex items-center px-4 gap-3">
                  <Search className="w-5 h-5 text-[#8b949e]" />
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder={t.scannerPlaceholder[lang]}
                    className="w-full bg-transparent border-none focus:ring-0 text-white placeholder-[#484f58] text-sm py-2"
                  />
                </div>
                <button
                  type="submit"
                  disabled={scanning}
                  className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:bg-blue-600/50 text-white font-bold text-sm transition-all flex items-center justify-center gap-2 min-w-30"
                >
                  {scanning ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      {t.scannerLoading[lang]}
                    </>
                  ) : (
                    <>
                      <Zap className="w-4 h-4" />
                      {t.scannerButton[lang]}
                    </>
                  )}
                </button>
              </div>
            </form>
            {scanError && (
              <p className="text-rose-400 text-xs mt-3 flex items-center gap-1 justify-center">
                <AlertCircle className="w-3 h-3" />
                {scanError}
              </p>
            )}
            {unlockedIds.length > 0 && !scanning && (
              <p className="text-emerald-400 text-xs mt-3 flex items-center gap-1 justify-center">
                <CheckCircle2 className="w-3 h-3" />
                {t.scannerSuccess[lang]} ({unlockedIds.length} {t.filters.all[lang]})
              </p>
            )}
          </motion.div>

          {/* Filters */}
          <div className="flex justify-center gap-2 mt-10">
            {(['obtainable', 'legacy', 'all'] as Filter[]).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all border ${filter === f
                  ? 'bg-blue-600 text-white border-blue-500 shadow-lg shadow-blue-500/20'
                  : 'bg-[#21262d] text-[#8b949e] border-[#30363d] hover:border-[#8b949e]'
                  }`}
              >
                {t.filters[f][lang]}
              </button>
            ))}
          </div>
        </div>

        {/* Trail / Roadmap */}
        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-8 sm:left-1/2 top-0 bottom-0 w-0.5 bg-linear-to-b from-blue-500 via-[#30363d] to-transparent transform sm:-translate-x-1/2" />

          <div className="space-y-12 relative">
            <AnimatePresence mode="popLayout">
              {filteredAchievements.map((achievement, index) => (
                <motion.div
                  key={achievement.id}
                  layout
                  initial={{
                    opacity: 0,
                    x: typeof window !== 'undefined' && window.innerWidth < 640
                      ? 20
                      : (index % 2 === 0 ? -30 : 30)
                  }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className={`flex flex-col sm:flex-row items-start sm:items-center gap-8 ${index % 2 === 0 ? 'sm:flex-row' : 'sm:flex-row-reverse'
                    }`}
                >
                  {/* Achievement Card */}
                  <div className={`w-full sm:w-[45%] group pl-12 sm:pl-0`}>
                    <div className={`bg-[#161b22] border rounded-2xl p-5 sm:p-6 transition-all relative overflow-hidden ${unlockedIds.includes(achievement.id)
                      ? 'border-emerald-500/50 shadow-2xl shadow-emerald-500/5'
                      : 'border-[#30363d] hover:border-blue-500/50 hover:shadow-2xl hover:shadow-blue-500/5'
                      }`}>
                      {/* Background Glow */}
                      <div className={`absolute -right-10 -top-10 w-32 h-32 blur-3xl transition-all ${unlockedIds.includes(achievement.id)
                        ? 'bg-emerald-500/10'
                        : 'bg-blue-500/5 group-hover:bg-blue-500/10'
                        }`} />

                      <div className="flex flex-col xs:flex-row items-start gap-4 mb-4">
                        <div className="relative shrink-0">
                          <img
                            src={achievement.image}
                            alt={achievement.name[lang]}
                            className={`w-14 h-14 sm:w-16 sm:h-16 object-contain drop-shadow-md transition-transform duration-300 ${unlockedIds.includes(achievement.id) ? 'scale-110' : 'group-hover:scale-110'
                              }`}
                            referrerPolicy="no-referrer"
                          />
                          {achievement.isLegacy ? (
                            <div className="absolute -top-1 -right-1 bg-slate-800 p-1 rounded-full border border-slate-600">
                              <Lock className="w-3 h-3 text-slate-400" />
                            </div>
                          ) : unlockedIds.includes(achievement.id) && (
                            <div className="absolute -top-1 -right-1 bg-emerald-600 p-1 rounded-full border border-emerald-400 shadow-lg shadow-emerald-500/50">
                              <CheckCircle2 className="w-3 h-3 text-white" />
                            </div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                            <h3 className={`text-lg sm:text-xl font-bold transition-colors truncate ${unlockedIds.includes(achievement.id) ? 'text-emerald-400' : 'text-white group-hover:text-blue-400'
                              }`}>
                              {achievement.name[lang]}
                            </h3>
                            <div className="flex items-center gap-2">
                              {unlockedIds.includes(achievement.id) && (
                                <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-tighter bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20">
                                  {t.unlocked[lang]}
                                </span>
                              )}
                              <DifficultyBadge difficulty={achievement.difficulty} lang={lang} />
                            </div>
                          </div>
                          <p className="text-sm text-[#8b949e] leading-relaxed">
                            {achievement.description[lang]}
                          </p>
                        </div>
                      </div>

                      <div className="pt-4 border-t border-[#30363d] mt-4">
                        <div className="flex items-center gap-2 text-xs font-bold text-blue-400 uppercase tracking-wider mb-2">
                          <Zap className="w-3 h-3" />
                          {t.howTo[lang]}
                        </div>
                        <p className="text-sm text-[#c9d1d9] bg-[#0d1117] p-3 rounded-xl border border-[#30363d]">
                          {achievement.howToGet[lang]}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Center Node */}
                  <div className="absolute left-8 sm:left-1/2 transform -translate-x-1/2 w-5 h-5 sm:w-10 sm:h-10 rounded-full bg-[#0d1117] border-2 sm:border-4 border-[#30363d] flex items-center justify-center z-10 group-hover:border-blue-500 transition-colors shadow-[0_0_15px_rgba(0,0,0,0.5)]">
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#30363d] group-hover:bg-blue-500 transition-colors" />
                  </div>

                  {/* Spacer for the other side */}
                  <div className="hidden sm:block w-[45%]" />
                </motion.div>
              ))}
            </AnimatePresence>

            {filteredAchievements.length === 0 && (
              <div className="text-center py-20">
                <Info className="w-12 h-12 text-[#30363d] mx-auto mb-4" />
                <p className="text-[#8b949e]">{t.noResults[lang]}</p>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Author Section */}
      <section className="max-w-4xl mx-auto px-4 py-12 border-t border-[#30363d]">
        <div className="bg-linear-to-r from-[#161b22] to-[#0d1117] border border-[#30363d] rounded-3xl p-8 flex flex-col sm:flex-row items-center gap-8">
          <div className="relative group">
            <div className="absolute -inset-1 bg-linear-to-r from-blue-500 to-purple-500 rounded-full blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200" />
            <img
              src="https://github.com/aalvs.png"
              alt="Author"
              className="relative w-24 h-24 rounded-full border-2 border-[#30363d]"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="flex-1 text-center sm:text-left">
            <h4 className="text-[#8b949e] text-sm font-bold uppercase tracking-widest mb-1">
              {t.authorTitle[lang]}
            </h4>
            <h3 className="text-2xl font-bold text-white mb-2">André Alves</h3>
            <p className="text-[#8b949e] mb-4">
              {t.authorDescription[lang]}
            </p>
            <a
              href="https://github.com/aalvs"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#21262d] hover:bg-[#30363d] border border-[#30363d] text-white transition-all font-medium"
            >
              <Github className="w-4 h-4" />
              @aalvs
              <ExternalLink className="w-3 h-3 opacity-50" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
