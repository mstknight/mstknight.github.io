import { ArrowUpRight, ArrowRight } from 'lucide-react'
import { featuredProjects } from './featuredProjects'

function ProjectVisual({ project }) {
  return <div className={`project-visual visual-${project.theme}`}>
    {project.image ? <img src={project.image} alt={project.imageAlt} loading="lazy"/> : <>
      <div className="visual-label"><span>{project.category}</span><span>CONCEPT / 示意</span></div>
      <svg viewBox="0 0 600 300" fill="none" aria-hidden="true">
        {project.theme === 'flight' ? <g stroke="currentColor">
          {[60,100,140,180,220,260].map(y => <path key={y} d={`M30 ${y} C180 ${y-45} 410 ${y+55} 570 ${y}`} opacity=".2"/>)}
          <ellipse cx="300" cy="159" rx="130" ry="66" strokeDasharray="4 8" opacity=".4"/>
          <path d="M234 111L364 207M366 111L234 207" strokeWidth="9"/>
          {[[234,111],[366,111],[234,207],[366,207]].map(([x,y])=><ellipse key={`${x}${y}`} cx={x} cy={y} rx="37" ry="15" strokeWidth="2"/>)}
          <path d="M278 140L322 140L327 176L273 176Z" fill="currentColor" fillOpacity=".25"/>
          <path d="M300 65V35M285 48L300 33L315 48"/><text x="318" y="42" fill="currentColor" stroke="none" fontSize="10">Z</text>
        </g> : project.theme === 'glass' ? <g stroke="currentColor">
          {[0,1,2].map(i=><g key={i} transform={`translate(${135+i*60},${65+i*29})`}><path d="M0 18Q0 0 18 0H76L99 23H201Q220 23 220 42V120Q220 139 202 139H18Q0 139 0 121Z" fill="currentColor" fillOpacity={.03+i*.03} strokeOpacity={.3+i*.2}/><path d="M12 50H208" strokeOpacity=".25"/></g>)}
        </g> : <g stroke="currentColor">
          {[70,145,220].map((y,i)=><g key={y}><path d={`M50 ${y}H550`} opacity=".15"/><path d={`M50 ${y}L110 ${y-8}L150 ${y+6}L180 ${y-3}L210 ${y+2}L238 ${y-7}L260 ${y+9}L285 ${y-34+i*5}L299 ${y+35}L316 ${y-45}L330 ${y+15}L355 ${y-5}L400 ${y+7}L450 ${y-3}L550 ${y}`} strokeWidth="2"/></g>)}
          <path d="M280 35H340V258H280Z" fill="currentColor" fillOpacity=".08" strokeDasharray="3 5"/>
        </g>}
      </svg>
      <div className="visual-caption"><strong>{project.name}</strong><span>项目图片待补充</span></div>
    </>}
  </div>
}
export function FeaturedProjects() {
  return <section className="home-section featured-section" aria-labelledby="featured-title"><div className="section-heading"><div><div className="eyebrow left">SELECTED WORK / ENGINEERING & DESIGN</div><h2 id="featured-title">把想法<br/><em>做成作品。</em></h2></div><a className="text-link" href="#work">项目详解 <ArrowRight size={16}/></a></div><div className="featured-grid">{featuredProjects.map(p=><a className="featured-card" key={p.id} href={`#work/${p.id}`}><ProjectVisual project={p}/><div className="featured-copy"><span>{p.category}</span><h3>{p.name}<ArrowUpRight size={17}/></h3><p>{p.summary}</p></div></a>)}</div></section>
}
export function ProjectShowcase() {
  return <div className="showcase"><header className="showcase-header"><div className="eyebrow left">SELECTED WORK / 01—03</div><h1>Built to <em>explore.</em></h1><p>从飞行实验到桌面材质，再到数据诊断。<br/>在算法、工程与体验之间，让想法成为可使用的工具。</p><nav aria-label="项目目录" className="project-index">{featuredProjects.map((p,i)=><a href={`#work/${p.id}`} key={p.id}><span>0{i+1}</span>{p.name}<ArrowRight size={14}/></a>)}</nav></header>
    {featuredProjects.map((p,i)=><article className={`case-study case-${p.theme}`} id={p.id} key={p.id}>
      <div className="case-topline"><span>0{i+1} / {p.category}</span><span>PROJECT NOTES</span></div>
      <div className="case-heading"><div><h2>{p.name}</h2><p>{p.subtitle}</p></div><a className="primary-button liquid-glass" href={p.url} target="_blank" rel="noreferrer">查看 GitHub <ArrowUpRight size={15}/></a></div>
      <div className="case-layout"><div><ProjectVisual project={p}/><p className="image-reservation">{p.image ? p.imageAlt : p.visualNote}</p><div className="tags">{p.tags.map(t=><span key={t}>{t}</span>)}</div></div><div className="case-description"><h3>{p.summary}</h3><p>{p.description}</p><ol className="case-flow">{p.flow.map((s,n)=><li key={s}><span>0{n+1}</span>{s}</li>)}</ol>{p.access && <small>{p.access}</small>}</div></div>
      <div className="feature-details">{p.features.map(([title,body],n)=><section key={title}><span>0{n+1}</span><h3>{title}</h3><p>{body}</p></section>)}</div><p className="case-boundary"><span>当前范围</span>{p.boundary}</p>
    </article>)}
  </div>
}
