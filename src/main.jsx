import React, { useEffect, useRef, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { motion, AnimatePresence, useReducedMotion } from 'motion/react'
import { ArrowUpRight, ArrowRight, Check, Copy, CodeXml as Github, Mail, Pause, Play, Asterisk } from 'lucide-react'
import { profile } from './profile'
import './index.css'
import { FeaturedProjects, ProjectShowcase } from './ProjectShowcase'

const videoUrl = 'https://stream.mux.com/kimF2ha9zLrX64H00UgLGPflCzNtl1T0215MlAmeOztv8.m3u8'
function Background({ paused }) {
  const ref = useRef(null)
  const [ready, setReady] = useState(false)
  useEffect(() => {
    const video = ref.current
    if (paused) { video.pause(); return }
    let hls, disposed = false
    const play = () => { if (!disposed) video.play().catch(() => {}) }
    if (video.canPlayType('application/vnd.apple.mpegurl')) { video.src = videoUrl; play() }
    else import('hls.js').then(({ default: Hls }) => {
      if (disposed || !Hls.isSupported()) return
      hls = new Hls({ enableWorker: true })
      hls.loadSource(videoUrl); hls.attachMedia(video)
      hls.on(Hls.Events.MANIFEST_PARSED, play)
      hls.on(Hls.Events.ERROR, (_, data) => { if (data.fatal) { setReady(false); hls.destroy() } })
    }).catch(() => setReady(false))
    return () => { disposed = true; hls?.destroy(); video.pause(); video.removeAttribute('src'); video.load() }
  }, [paused])
  return <div className="background" aria-hidden="true"><div className="ambient"/><div className="orbit orbit-one"/><div className="orbit orbit-two"/><video ref={ref} muted loop playsInline onPlaying={() => setReady(true)} onError={() => setReady(false)} className={ready ? 'video ready' : 'video'}/><div className="shade"/><div className="grid-fade"/><div className="noise"/></div>
}
const pages = ['home', 'about', 'work', 'contact']
const getPage = () => pages.includes(location.hash.slice(1).split('/')[0]) ? location.hash.slice(1).split('/')[0] : 'home'
function Nav({ page }) {
  return <nav className="nav-wrap" aria-label="主导航"><div className="liquid-glass navbar"><a href="#home" className="brand" aria-label="elio 首页"><Asterisk size={27} strokeWidth={1.5}/><span>{profile.name}<span className="brand-dot">.</span></span></a><div className="nav-links">{[['home','Home'],['about','About'],['work','Work']].map(([id,label]) => <a key={id} href={`#${id}`} aria-current={page === id ? 'page' : undefined} className={page === id ? 'active' : ''}>{label}</a>)}</div><a className="nav-contact glass-pill" href="#contact">Let's talk <ArrowUpRight size={14}/></a></div></nav>
}
function SchoolSeal({ short, tone, logo }) { return <div className={`school-seal ${tone}`} aria-label={`${short} 校徽`}><img src={logo} alt={`${short} 校徽`} /><span className="seal-fallback">{short === 'HKU' ? '港' : '建'}</span></div> }
function SchoolCard({ school }) { return <article className="school-card liquid-glass"><SchoolSeal short={school.short} tone={school.tone} logo={school.logo}/><div className="school-info"><div className="card-kicker">EDUCATION / {school.period}</div><h3>{school.school}</h3><p>{school.degree}</p></div><ArrowUpRight className="card-arrow" size={16}/></article> }
function BookCard({ book, index }) { return <article className={`book-card book-${book.tone}`} style={{'--book-index': index}}><div className="book-cover"><span className="book-mark">{book.mark}</span><div className="book-title">{book.title}</div><div className="book-author">{book.author}</div><span className="book-spine">{String(index + 1).padStart(2, '0')}</span></div><div className="book-caption"><strong>{book.title}</strong><span>{book.note}</span></div></article> }
function AestheticCard({ work }) { return <article className={`aesthetic-card ${work.tone}`}><div className="aesthetic-art"><span className="art-index">{work.kind}</span><span className="art-symbol" aria-hidden="true"/></div><div className="aesthetic-caption"><h3>{work.title}</h3><p>{work.description}</p><ArrowUpRight size={16}/></div></article> }
function Home() { return <div className="home-page"><section className="hero-content home-hero"><div className="eyebrow"><span className="tiny-line"/> ALGORITHM ENGINEER · HONG KONG</div><h1>Stay curious.<br/>Make <em>something</em> matter.</h1><p className="intro">{profile.intro}<br/><span>算法、视觉与自动化，让想法落地。</span></p><div className="hero-actions"><a className="primary-button liquid-glass" href="#work">探索我的项目 <ArrowRight size={16}/></a><a className="text-link" href="#about">认识我 <ArrowUpRight size={14}/></a></div><div className="hero-note"><span className="status-dot"/> OPEN TO NEW IDEAS & CONNECTIONS</div><span className="scroll-cue">SCROLL TO EXPLORE <span>↓</span></span></section><FeaturedProjects/><section className="home-section education-section" aria-labelledby="education-title"><div className="section-heading"><div><div className="eyebrow left">01 / THE PLACES THAT SHAPED ME</div><h2 id="education-title">学习，成为<br/><em>持续发生的事。</em></h2></div><p>两段教育经历，连接工程训练、设计思维和对真实世界的好奇。</p></div><div className="school-list">{profile.education.map(school => <SchoolCard key={school.school} school={school}/>)}</div></section><section className="home-section books-section" aria-labelledby="books-title"><div className="section-heading"><div><div className="eyebrow left">02 / ON MY SHELF</div><h2 id="books-title">最近在读<br/><em>也一直在想。</em></h2></div><p>书是我保存问题、想象力和他人经验的一种方式。</p></div><div className="book-grid">{profile.books.map((book, index) => <BookCard key={book.title} book={book} index={index}/>)}</div></section><section className="home-section aesthetic-section" aria-labelledby="aesthetic-title"><div className="section-heading"><div><div className="eyebrow left">03 / A PERSONAL PALETTE</div><h2 id="aesthetic-title">我的审美<br/><em>仍在形成。</em></h2></div><p>我喜欢克制的结构、被光照亮的细节，以及不急着解释的作品。</p></div><div className="aesthetic-grid">{profile.aestheticWorks.map(work => <AestheticCard key={work.title} work={work}/>)}</div></section></div> }
function About() { return <div className="interior about-page"><div className="eyebrow">01 / A BIT ABOUT ME</div><h1>Hello, I'm <em>{profile.name}.</em></h1><p className="interior-copy">{profile.about}</p><div className="resume-grid"><div><h3>EDUCATION</h3>{profile.education.map(item => <div className="resume-item" key={item.school}><strong>{item.school}</strong><span>{item.degree}</span><small>{item.period}</small></div>)}</div><div><h3>EXPERIENCE</h3>{profile.experience.map(item => <div className="resume-item" key={item.company}><strong>{item.company}</strong><span>{item.role}</span><small>{item.period}</small></div>)}</div></div><div className="skill-row"><span>TOOLS & SKILLS</span>{profile.skills.slice(0, 6).map(skill => <b key={skill}>{skill}</b>)}</div><a className="primary-button liquid-glass" href="#contact">打个招呼 <ArrowUpRight size={16}/></a></div> }
function Work() { return <><ProjectShowcase/><div className="interior archive-work"><div className="eyebrow">EARLIER EXPLORATIONS / 研究与实践</div><div className="projects">{profile.projects.map(project => <article className="project liquid-glass" key={project.title}><div className="project-meta">{project.type}</div><h2>{project.title}</h2><p>{project.description}</p><div className="tags">{project.tags.map(tag => <span key={tag}>{tag}</span>)}</div></article>)}</div></div></> }
function Contact() {
  const [copied,setCopied] = useState(false)
  const [error,setError] = useState('')
  useEffect(() => { if (!copied) return; const id = setTimeout(() => setCopied(false), 2500); return () => clearTimeout(id) }, [copied])
  async function copy() { try { await navigator.clipboard.writeText(profile.email); setCopied(true); setError('') } catch { setError('请长按或选中上方邮箱复制。') } }
  return <div className="interior"><div className="eyebrow">03 / START A CONVERSATION</div><h1>Good things start<br/>with a <em>hello.</em></h1><p className="interior-copy">有个有趣的想法，或只是想打个招呼？<br/>期待收到你的来信。</p><div className="email-box liquid-glass"><a href={`mailto:${profile.email}`}>{profile.email}</a><button onClick={copy} aria-label="复制邮箱">{copied ? <Check size={18}/> : <Copy size={18}/>}</button></div><p className="copy-status" role="status">{copied ? '邮箱已复制' : error || '点击邮箱，使用你的邮件应用发送邮件。'}</p><a className="text-link" href={profile.github} target="_blank" rel="noreferrer"><Github size={16}/> 在 GitHub 找到我 <ArrowUpRight size={14}/></a></div>
}
function scrollToProject() {
  const id = location.hash.split('/')[1]
  const target = id && document.getElementById(id)
  if (target) target.scrollIntoView({ block: 'start' })
}
function App() {
  const [page,setPage] = useState(getPage)
  const reduced = useReducedMotion()
  const [manualPause,setManualPause] = useState(null)
  const paused = manualPause ?? !!reduced
  const headingArea = useRef(null)
  useEffect(() => { const update = () => { setPage(getPage()); headingArea.current?.focus({preventScroll:true}); if(location.hash.startsWith('#work/')) requestAnimationFrame(scrollToProject); else headingArea.current?.scrollTo(0,0) }; window.addEventListener('hashchange',update); return () => window.removeEventListener('hashchange',update) }, [])
  useEffect(() => { document.title = `${profile.name} — ${ {home:'Personal Space',about:'About',work:'Work',contact:'Contact'}[page]}` }, [page])
  return <main className="site-shell"><a className="skip-link" href="#content">跳转到内容</a><Background paused={paused}/><Nav page={page}/><section id="content" ref={headingArea} tabIndex={-1} className={`main-content ${page === 'work' ? 'work-content' : ''}`}><AnimatePresence mode="wait"><motion.div key={page} initial={{opacity:0,y:reduced ? 0 : 16}} animate={{opacity:1,y:0}} exit={{opacity:0,y:reduced ? 0 : -8}} transition={{duration:reduced ? 0 : .4}} onAnimationComplete={scrollToProject} className="page">{page === 'home' ? <Home/> : page === 'about' ? <About/> : page === 'work' ? <Work/> : <Contact/>}</motion.div></AnimatePresence></section><footer><span className="copyright">© {new Date().getFullYear()} {profile.name}<span className="footer-slash"> / </span><span className="footer-subtitle">A work in progress.</span></span><div className="footer-right"><a href={profile.github} target="_blank" rel="noreferrer" aria-label="访问 elio 的 GitHub"><Github size={16}/></a><a href={`mailto:${profile.email}`} aria-label="发送邮件给 elio"><Mail size={17}/></a><span className="footer-divider"/><button onClick={() => setManualPause(!paused)} aria-label={paused ? '播放背景视频' : '暂停背景视频'}>{paused ? <Play size={13}/> : <Pause size={13}/>}<span>{paused ? 'PLAY' : 'PAUSE'}</span></button></div></footer></main>
}
createRoot(document.getElementById('root')).render(<App />)
