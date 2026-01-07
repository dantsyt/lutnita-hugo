import { mob } from "./exhib/utils/mob"

document.addEventListener("DOMContentLoaded", () => {
    const getYear = el => el?.querySelector('.exhibition_date')?.textContent.trim().slice(-4)

    if (!mob) {
        const wait = f => {
            let i = setInterval(() => {
                const ex = [...document.querySelectorAll('.text_container')]
                if (ex.length) clearInterval(i), f(ex)
            }, 100)
        }
        wait(exhibitions => {
            const years = [...new Set(exhibitions.map(getYear).filter(y => /^\d{4}$/.test(y))), "2022"].sort((a, b) => b - a)
            const rightSpace = document.querySelector('.right_space')
            const container = document.createElement('div')
            container.className = 'year_container'
            const yearElements = years.map(y => {
                const p = document.createElement('p')
                p.className = 'year'
                p.textContent = y
                container.appendChild(p)
                return p
            })
            rightSpace?.appendChild(container)
            let cur, highlight = y => yearElements.forEach(p => p.classList.toggle('hovered', p.textContent === y))
            document.addEventListener("scroll", () => {
                if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 1) return cur !== "2022" && (highlight("2022"), cur = "2022")
                const TOP_THRESHOLD = 8
                if (window.scrollY <= TOP_THRESHOLD) {
                    const topYear = getYear(exhibitions[0])
                    return cur !== topYear && (highlight(topYear), cur = topYear)
                }
                const t = window.innerHeight * 0.6
                for (const el of exhibitions) {
                    const r = el.getBoundingClientRect(), y = getYear(el)
                    if (r.top <= t && r.bottom >= t && y && y !== cur) return highlight(y), cur = y
                }
            })
            highlight(cur = getYear(exhibitions[0]))
            yearElements.forEach((p, i) => p.onclick = () =>
                i === 0
                    ? window.scrollTo({ top: 0, behavior: "smooth" })
                    : i === yearElements.length - 1
                        ? window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" })
                        : exhibitions.find(e => getYear(e) === p.textContent)?.scrollIntoView({ behavior: "smooth", block: "start" })
            )
        })
    } else {
        const YEAR_RE = /\b(20)\d{2}$\b/;
        const BOTTOM_YEAR = '2022';
        const TOP_THRESHOLD = 8;

        const getYear = el => {
            if (!el) return null;
            const t = (el.textContent || '').trim();
            const m = t.match(YEAR_RE);
            return m ? m[0].trim() : null;
        };

        const wait = f => {
            let i = setInterval(() => {
            const ds = [...document.querySelectorAll('.exhibition_date')];
            const headerInner = document.querySelector('.exhib_title');
            if (ds.length && headerInner) clearInterval(i), f(headerInner, ds);
            }, 100);
        };

        wait((headerInner) => {
            // inject trigger + picker if not present
            let btn = headerInner.querySelector('.current_year');
            let picker = document.getElementById('year-picker');
            let list = document.getElementById('year-picker-list');

            if (!btn) {
                btn = document.createElement('button');
                btn.type = 'button';
                btn.className = 'current_year';
                btn.textContent = '';
                headerInner.appendChild(btn);
            }

            if (!picker) {
                picker = document.createElement('div');
                picker.id = 'year-picker';
                picker.className = 'year-picker';
                list = document.createElement('ul');
                list.id = 'year-picker-list';
                list.className = 'year-picker-list';
                picker.appendChild(list);
                headerInner.appendChild(picker);
            }

            const dateEls = () => [...document.querySelectorAll('.exhibition_date')];
            const collectYears = () => {
                const ys = dateEls().map(getYear).filter(Boolean);
                const set = [...new Set(ys)];
                if (!set.includes(BOTTOM_YEAR)) set.push(BOTTOM_YEAR);
                return set.sort((a,b)=>Number(b)-Number(a));
            };

            let cur = null;
            const setTitle = y => { if (y===cur) return; cur=y; btn.textContent = y || ''; };

            const isAtBottom = () => window.innerHeight + window.scrollY >= document.body.scrollHeight - 1;
            const isAtTop = () => window.scrollY <= TOP_THRESHOLD;

            // init
            const init = () => {
                const els = dateEls();
                if (!els.length) return;
                if (isAtTop()) return setTitle(getYear(els[0]));
                const mid = window.innerHeight * .5;
                let best=els[0],bd=Infinity;
                for(const e of els){const r=e.getBoundingClientRect();const c=r.top+r.height/2;const d=Math.abs(c-mid);if(d<bd){bd=d;best=e}}
                setTitle(getYear(best));
            };
            init();

            const openPicker = () => {
                list.innerHTML = '';
                collectYears().forEach(y=>{
                    const li = document.createElement('li');
                    const b = document.createElement('button');
                    b.type = 'button'; b.textContent = y; b.dataset.year = y;
                    if (y===cur) b.className = 'active';
                    b.onclick = e => { e.stopPropagation(); picker.classList.remove('open'); document.removeEventListener('click', outside); scrollToYear(y); };
                    li.appendChild(b);
                    list.appendChild(li);
                });
                picker.classList.add('open');
                document.addEventListener('click', outside);
            };
            const closePicker = () => { picker.classList.remove('open'); document.removeEventListener('click', outside); };
            const outside = e => { if (!picker.contains(e.target) && e.target !== btn) closePicker(); };

            btn.onclick = e => { e.stopPropagation(); picker.classList.contains('open') ? closePicker() : openPicker(); };

            const scrollToYear = year => {
                const els = dateEls();
                const target = els.find(el => getYear(el) === year);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                } else if (year === BOTTOM_YEAR) {
                    window.scrollTo({ top: document.body.scrollHeight-20, behavior: 'smooth' });
                }
                setTitle(year);
            };

            if ('IntersectionObserver' in window) {
                const io = new IntersectionObserver(entries => {
                    if (isAtBottom()) { setTitle(BOTTOM_YEAR); return; }
                    if (isAtTop()) { const e=dateEls()[0]; if (e) { setTitle(getYear(e)); return; } }
                    const vis = entries.filter(e=>e.isIntersecting);
                    if (!vis.length) return;
                    vis.sort((a,b)=>b.intersectionRatio-a.intersectionRatio);
                    setTitle(getYear(vis[0].target));
                }, { root:null, rootMargin:'-40% 0px -60% 0px', threshold:[0,0.01,0.25,0.5,0.75,1] });
                const observe = () => { io.disconnect(); dateEls().forEach(d=>io.observe(d)); };
                observe();
                window.addEventListener('scroll', () => {
                    if (isAtBottom()) setTitle(BOTTOM_YEAR); 
                    else if (isAtTop()) {
                        const e=dateEls()[0]; 
                        if (e) setTitle(getYear(e)); 
                    } 
                }, { passive:true });
            } else {
                let t=false;
                const onScroll = () => {
                    if (t) return; t=true;
                    requestAnimationFrame(()=>{
                        if (isAtBottom()){ setTitle(BOTTOM_YEAR); t=false; return; }
                        if (isAtTop()){ 
                            const e=dateEls()[0]; 
                            if (e){ 
                                setTitle(getYear(e)); 
                                t=false; 
                                return; 
                            } 
                        }
                        const cp = window.innerHeight * .6;
                        for(const el of dateEls()){
                            const r=el.getBoundingClientRect(); 
                            if(r.top<=cp && r.bottom>=cp){ 
                                setTitle(getYear(el)); 
                                t=false; 
                                return; 
                            }
                        }
                        const es = dateEls(); 
                        if (es.length) setTitle(getYear(es[es.length-1]));
                        t=false;
                    });
                };
                window.addEventListener('scroll', onScroll, { passive:true });
                onScroll();
            }
        });
    }
})