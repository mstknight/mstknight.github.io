import React, { useEffect, useRef, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { motion, AnimatePresence, useReducedMotion } from 'motion/react'
import { ArrowUpRight, ArrowRight, Check, Copy, CodeXml as Github, Mail, Pause, Play, Asterisk } from 'lucide-react'
import { profile } from './profile'
import './index.css'

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
const getPage = () => pages.includes(location.hash.slice(1)) ? location.hash.slice(1) : 'home'
function Nav({ page }) {
  return <nav className="nav-wrap" aria-label="主导航"><div className="liquid-glass navbar"><a href="#home" className="brand" aria-label="elio 首页"><Asterisk size={27} strokeWidth={1.5}/><span>{profile.name}<span className="brand-dot">.</span></span></a><div className="nav-links">{[['home','Home'],['about','About'],['work','Work']].map(([id,label]) => <a key={id} href={`#${id}`} aria-current={page === id ? 'page' : undefined} className={page === id ? 'active' : ''}>{label}</a>)}</div><a className="nav-contact glass-pill" href="#contact">Let's talk <ArrowUpRight size={14}/></a></div></nav>
}
function Home() { return <div className="hero-content"><div className="eyebrow"><span className="tiny-line"/> ALGORITHM ENGINEER · HONG KONG</div><h1>Stay curious.<br/>Make <em>something</em> matter.</h1><p className="intro">{profile.intro}<br/><span>算法、视觉与自动化，让想法落地。</span></p><div className="hero-actions"><a className="primary-button liquid-glass" href="#work">探索我的项目 <ArrowRight size={16}/></a><a className="text-link" href="#about">认识我 <ArrowUpRight size={14}/></a></div><div className="hero-note"><span className="status-dot"/> OPEN TO NEW IDEAS & CONNECTIONS</div></div> }
function About() { return <div className="interior about-page"><div className="eyebrow">01 / A BIT ABOUT ME</div><h1>Hello, I'm <em>{profile.name}.</em></h1><p className="interior-copy">{profile.about}</p><div className="resume-grid"><div><h3>EDUCATION</h3>{profile.education.map(item => <div className="resume-item" key={item.school}><strong>{item.school}</strong><span>{item.degree}</span><small>{item.period}</small></div>)}</div><div><h3>EXPERIENCE</h3>{profile.experience.map(item => <div className="resume-item" key={item.company}><strong>{item.company}</strong><span>{item.role}</span><small>{item.period}</small></div>)}</div></div><div className="skill-row"><span>TOOLS & SKILLS</span>{profile.skills.slice(0, 6).map(skill => <b key={skill}>{skill}</b>)}</div><a className="primary-button liquid-glass" href="#contact">打个招呼 <ArrowUpRight size={16}/></a></div> }
function Work() { return <div className="interior work-page"><div className="eyebrow">02 / IDEAS INTO REALITY</div><h1>Things I <em>make.</em></h1><div className="projects">{profile.projects.map(project => <article className="project liquid-glass" key={project.title}><div className="project-meta">{project.type}</div><h2>{project.title}</h2><p>{project.description}</p><div className="tags">{project.tags.map(tag => <span key={tag}>{tag}</span>)}</div></article>)}</div><a className="text-link" href={profile.github} target="_blank" rel="noreferrer">在 GitHub 查看代码 <ArrowUpRight size={16}/></a></div> }
function Contact() {
  const [copied,setCopied] = useState(false)
  const [error,setError] = useState('')
  useEffect(() => { if (!copied) return; const id = setTimeout(() => setCopied(false), 2500); return () => clearTimeout(id) }, [copied])
  async function copy() { try { await navigator.clipboard.writeText(profile.email); setCopied(true); setError('') } catch { setError('请长按或选中上方邮箱复制。') } }
  return <div className="interior"><div className="eyebrow">03 / START A CONVERSATION</div><h1>Good things start<br/>with a <em>hello.</em></h1><p className="interior-copy">有个有趣的想法，或只是想打个招呼？<br/>期待收到你的来信。</p><div className="email-box liquid-glass"><a href={`mailto:${profile.email}`}>{profile.email}</a><button onClick={copy} aria-label="复制邮箱">{copied ? <Check size={18}/> : <Copy size={18}/>}</button></div><p className="copy-status" role="status">{copied ? '邮箱已复制' : error || '点击邮箱，使用你的邮件应用发送邮件。'}</p><a className="text-link" href={profile.github} target="_blank" rel="noreferrer"><Github size={16}/> 在 GitHub 找到我 <ArrowUpRight size={14}/></a></div>
}
function App() {
  const [page,setPage] = useState(getPage)
  const reduced = useReducedMotion()
  const [manualPause,setManualPause] = useState(null)
  const paused = manualPause ?? !!reduced
  const headingArea = useRef(null)
  useEffect(() => { const update = () => { setPage(getPage()); headingArea.current?.focus() }; window.addEventListener('hashchange',update); return () => window.removeEventListener('hashchange',update) }, [])
  useEffect(() => { document.title = `${profile.name} — ${ {home:'Personal Space',about:'About',work:'Work',contact:'Contact'}[page]}` }, [page])
  return <main className="site-shell"><a className="skip-link" href="#content">跳转到内容</a><Background paused={paused}/><Nav page={page}/><section id="content" ref={headingArea} tabIndex={-1} className="main-content"><AnimatePresence mode="wait"><motion.div key={page} initial={{opacity:0,y:reduced ? 0 : 16}} animate={{opacity:1,y:0}} exit={{opacity:0,y:reduced ? 0 : -8}} transition={{duration:reduced ? 0 : .4}} className="page">{page === 'home' ? <Home/> : page === 'about' ? <About/> : page === 'work' ? <Work/> : <Contact/>}</motion.div></AnimatePresence></section><footer><span className="copyright">© {new Date().getFullYear()} {profile.name}<span className="footer-slash"> / </span><span className="footer-subtitle">A work in progress.</span></span><div className="footer-right"><a href={profile.github} target="_blank" rel="noreferrer" aria-label="访问 elio 的 GitHub"><Github size={16}/></a><a href={`mailto:${profile.email}`} aria-label="发送邮件给 elio"><Mail size={17}/></a><span className="footer-divider"/><button onClick={() => setManualPause(!paused)} aria-label={paused ? '播放背景视频' : '暂停背景视频'}>{paused ? <Play size={13}/> : <Pause size={13}/>}<span>{paused ? 'PLAY' : 'PAUSE'}</span></button></div></footer></main>
}
createRoot(document.getElementById('root')).render(<App />)
