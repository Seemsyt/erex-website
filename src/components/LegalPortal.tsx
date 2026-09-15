import { useState, useMemo } from 'react';
import Markdown from 'react-markdown';
import { 
  FileText, 
  ShieldCheck, 
  AlertTriangle, 
  CreditCard, 
  Lock, 
  Scale, 
  BookOpen, 
  ArrowLeft, 
  ExternalLink, 
  Search, 
  Copy, 
  Check, 
  Download, 
  Github, 
  ChevronRight,
  List,
  Sparkles
} from 'lucide-react';
import { LEGAL_DOCS, REPO_DOCS_URL, LegalDoc } from '../legalData';

interface LegalPortalProps {
  initialDocId?: string;
  onBackToHome: () => void;
}

export default function LegalPortal({ initialDocId = 'terms', onBackToHome }: LegalPortalProps) {
  const [activeDocId, setActiveDocId] = useState<string>(initialDocId);
  const [searchQuery, setSearchQuery] = useState('');
  const [copied, setCopied] = useState(false);

  const activeDoc = useMemo(() => {
    return LEGAL_DOCS.find(d => d.id === activeDocId) || LEGAL_DOCS[0];
  }, [activeDocId]);

  // Extract headings from markdown content for table of contents
  const headings = useMemo(() => {
    if (!activeDoc) return [];
    const lines = activeDoc.content.split('\n');
    const result: Array<{ text: string; level: number; id: string }> = [];

    lines.forEach(line => {
      const match = line.match(/^(#{1,3})\s+(.*)$/);
      if (match) {
        const level = match[1].length;
        const text = match[2].trim();
        const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
        result.push({ text, level, id });
      }
    });
    return result;
  }, [activeDoc]);

  // Filter documents or search matches
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const q = searchQuery.toLowerCase();
    return LEGAL_DOCS.filter(doc => 
      doc.title.toLowerCase().includes(q) || 
      doc.shortDesc.toLowerCase().includes(q) || 
      doc.content.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  const copyDocText = () => {
    if (!activeDoc) return;
    navigator.clipboard.writeText(activeDoc.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getDocIcon = (iconName: string) => {
    switch (iconName) {
      case 'FileText': return <FileText className="w-4 h-4" />;
      case 'ShieldCheck': return <ShieldCheck className="w-4 h-4" />;
      case 'AlertTriangle': return <AlertTriangle className="w-4 h-4" />;
      case 'CreditCard': return <CreditCard className="w-4 h-4" />;
      case 'Lock': return <Lock className="w-4 h-4" />;
      case 'Scale': return <Scale className="w-4 h-4" />;
      default: return <BookOpen className="w-4 h-4" />;
    }
  };

  const currentIndex = LEGAL_DOCS.findIndex(d => d.id === activeDoc.id);
  const prevDoc = currentIndex > 0 ? LEGAL_DOCS[currentIndex - 1] : null;
  const nextDoc = currentIndex < LEGAL_DOCS.length - 1 ? LEGAL_DOCS[currentIndex + 1] : null;

  return (
    <div className="min-h-screen bg-[#070a10] text-[#f1f5f9] flex flex-col selection:bg-emerald-500/30 selection:text-emerald-300">
      {/* Top Legal Navigation Bar */}
      <header className="sticky top-0 z-40 bg-[#090e18]/95 backdrop-blur-md border-b border-slate-800/80 px-4 sm:px-6 py-3.5 shadow-xl">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={onBackToHome}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700 text-xs font-semibold transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Landing Page</span>
            </button>

            <div className="h-4 w-px bg-slate-800 hidden sm:block" />

            <div className="flex items-center gap-2 text-xs">
              <span className="text-slate-400">EREX</span>
              <span className="text-slate-600">/</span>
              <span className="text-emerald-400 font-medium">Legal & Compliance</span>
            </div>
          </div>

          {/* Quick Search & GitHub Repo link */}
          <div className="flex items-center gap-2.5">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search policies (refund, logs, DDoS)..."
                className="w-48 sm:w-64 pl-8 pr-3 py-1.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 placeholder:text-slate-500"
              />
            </div>

            <a
              href={REPO_DOCS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#0f172a] hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700/80 text-xs font-medium transition-colors"
            >
              <Github className="w-3.5 h-3.5 text-emerald-400" />
              <span className="hidden md:inline">Seemsyt/EREX-Releases</span>
              <ExternalLink className="w-3 h-3 text-slate-400" />
            </a>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 flex-1">
        {/* Search Results Dropdown/Banner if searching */}
        {searchQuery.trim() && (
          <div className="mb-6 p-4 rounded-2xl bg-[#0e1626] border border-emerald-500/30">
            <div className="text-xs font-mono text-emerald-400 mb-2">
              Found {searchResults.length} document{searchResults.length === 1 ? '' : 's'} matching "{searchQuery}":
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
              {searchResults.map(doc => (
                <button
                  key={doc.id}
                  onClick={() => {
                    setActiveDocId(doc.id);
                    setSearchQuery('');
                  }}
                  className="p-2.5 rounded-xl bg-slate-900 hover:bg-emerald-950/40 text-left border border-slate-800 hover:border-emerald-500/40 transition-colors"
                >
                  <div className="text-xs font-bold text-white">{doc.title}</div>
                  <div className="text-[11px] text-slate-400 truncate">{doc.shortDesc}</div>
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Sidebar: Document Navigation */}
          <aside className="lg:col-span-3 space-y-4">
            <div className="p-4 rounded-2xl bg-[#0c111d] border border-slate-800 shadow-lg sticky top-20">
              <div className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 mb-3 px-2 flex items-center justify-between">
                <span>Legal Documents</span>
                <span className="text-[10px] px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-300">
                  {LEGAL_DOCS.length} Docs
                </span>
              </div>

              <nav className="space-y-1">
                {LEGAL_DOCS.map(doc => {
                  const isActive = doc.id === activeDoc.id;
                  return (
                    <button
                      key={doc.id}
                      onClick={() => setActiveDocId(doc.id)}
                      className={`w-full text-left p-2.5 rounded-xl transition-all duration-200 flex items-center justify-between group cursor-pointer ${
                        isActive
                          ? 'bg-emerald-500/15 border border-emerald-500/40 text-white shadow-sm'
                          : 'hover:bg-slate-800/60 text-slate-300 hover:text-white border border-transparent'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div className={`p-1.5 rounded-lg ${isActive ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-800 text-slate-400 group-hover:text-slate-200'}`}>
                          {getDocIcon(doc.icon)}
                        </div>
                        <div className="truncate">
                          <div className={`text-xs font-semibold truncate ${isActive ? 'text-emerald-300' : 'text-slate-200'}`}>
                            {doc.title}
                          </div>
                          <div className="text-[10px] text-slate-400 truncate">
                            {doc.file}
                          </div>
                        </div>
                      </div>

                      <span className={`text-[9px] px-1.5 py-0.5 rounded font-mono shrink-0 ml-1 ${
                        isActive ? 'bg-emerald-500/30 text-emerald-200' : 'bg-slate-800/80 text-slate-400'
                      }`}>
                        {doc.badge}
                      </span>
                    </button>
                  );
                })}
              </nav>

              {/* Public GitHub Repo Notice */}
              <div className="mt-6 pt-4 border-t border-slate-800/80 text-xs text-slate-400 space-y-2">
                <div className="flex items-center gap-1.5 text-slate-300 font-semibold text-[11px]">
                  <Github className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Publicly Versioned</span>
                </div>
                <p className="text-[11px] leading-relaxed text-slate-400">
                  Every commit, revision, and term update is recorded on our official GitHub repository.
                </p>
                <a
                  href={REPO_DOCS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[11px] text-emerald-400 hover:text-emerald-300 font-medium"
                >
                  <span>Explore Repository History</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </aside>

          {/* Main Document Content Area */}
          <main className="lg:col-span-9 space-y-6">
            <div className="p-6 sm:p-10 rounded-3xl bg-[#0c121e] border border-slate-800 shadow-2xl relative">
              {/* Document Header Bar */}
              <div className="pb-6 border-b border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-bold">
                      {activeDoc.badge}
                    </span>
                    <span className="text-xs font-mono text-slate-500">
                      File: {activeDoc.file}
                    </span>
                  </div>
                  <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                    {activeDoc.title}
                  </h1>
                  <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl leading-relaxed">
                    {activeDoc.shortDesc}
                  </p>
                </div>

                {/* Quick Actions */}
                <div className="flex items-center gap-2 self-start sm:self-auto shrink-0">
                  <button
                    onClick={copyDocText}
                    className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700 text-xs font-medium transition-colors flex items-center gap-1.5"
                    title="Copy Markdown"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400 text-xs">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-slate-400" />
                        <span className="text-xs">Copy</span>
                      </>
                    )}
                  </button>

                  <a
                    href={activeDoc.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3.5 py-2.5 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 hover:text-white border border-emerald-500/40 text-xs font-semibold transition-colors flex items-center gap-1.5"
                  >
                    <Github className="w-3.5 h-3.5" />
                    <span>View on GitHub</span>
                    <ExternalLink className="w-3 h-3 text-emerald-400" />
                  </a>
                </div>
              </div>

              {/* Headings Quick Jump Strip (if document has multiple sections) */}
              {headings.length > 2 && (
                <div className="my-6 p-4 rounded-2xl bg-[#080d16] border border-slate-800/80">
                  <div className="text-xs font-mono font-bold text-slate-400 mb-2 flex items-center gap-2">
                    <List className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Document Table of Contents</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {headings.filter(h => h.level <= 2).slice(0, 8).map((h, i) => (
                      <span
                        key={i}
                        className="text-[11px] px-2.5 py-1 rounded-lg bg-slate-900 text-slate-300 border border-slate-800 font-mono"
                      >
                        {h.text}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Rendered Markdown Body */}
              <div className="markdown-body legal-markdown mt-6">
                <Markdown>{activeDoc.content}</Markdown>
              </div>

              {/* Previous / Next Document Navigation */}
              <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                {prevDoc ? (
                  <button
                    onClick={() => setActiveDocId(prevDoc.id)}
                    className="w-full sm:w-auto px-4 py-3 rounded-2xl bg-slate-900 hover:bg-slate-800 text-left border border-slate-800 hover:border-slate-700 transition-colors"
                  >
                    <div className="text-[10px] font-mono text-slate-500">← Previous Document</div>
                    <div className="text-xs font-bold text-white mt-0.5">{prevDoc.title}</div>
                  </button>
                ) : <div />}

                {nextDoc ? (
                  <button
                    onClick={() => setActiveDocId(nextDoc.id)}
                    className="w-full sm:w-auto px-4 py-3 rounded-2xl bg-slate-900 hover:bg-slate-800 text-right border border-slate-800 hover:border-emerald-500/40 transition-colors"
                  >
                    <div className="text-[10px] font-mono text-emerald-400">Next Document →</div>
                    <div className="text-xs font-bold text-white mt-0.5">{nextDoc.title}</div>
                  </button>
                ) : <div />}
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
