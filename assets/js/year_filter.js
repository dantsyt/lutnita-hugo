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
        const PROGRAMMATIC_BLOCK_MS = 1400;
        const VISUAL_OFFSET_RATIO = 0.25;

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
            let programmaticTarget = null;
            let programmaticTimer = null;
            const setTitle = y => { if (y===cur) return; cur=y; btn.textContent = y || ''; };

            const isAtBottom = () => window.innerHeight + window.scrollY >= document.body.scrollHeight - 1;
            const isAtTop = () => window.scrollY <= TOP_THRESHOLD;

            const init = () => {
                const els = dateEls();
                if (!els.length) return;
                if (isAtTop()) return setTitle(getYear(els[0]));
                const mid = window.innerHeight * 0.5;
                let best=els[0],bd=Infinity;
                for (const e of els) {
                    const r=e.getBoundingClientRect();
                    const c=r.top+r.height/2;
                    const d=Math.abs(c-mid);
                    if (d<bd) { bd=d; best=e }
                }
                setTitle(getYear(best));
            };
            init();

            const scrollToYear = year => {
                const els = dateEls();                
                const lastEl = els[els.length - 1];
                const target = els.find(el => getYear(el) === year) || lastEl;
                const VISUAL_OFFSET = Math.round(window.innerHeight * VISUAL_OFFSET_RATIO);

                programmaticTarget = year;
                clearTimeout(programmaticTimer);
                programmaticTimer = setTimeout(() => { programmaticTarget = null; }, PROGRAMMATIC_BLOCK_MS);
                
                setTitle(year);

                if (!target) {
                    const maxTop = Math.max(0, document.body.scrollHeight - window.innerHeight - 1);
                    window.scrollTo({ top: maxTop, behavior: 'smooth' });
                    return;
                }

                const rect = target.getBoundingClientRect();
                const desiredTop = Math.round(window.scrollY + rect.top - VISUAL_OFFSET);

                const maxTop = Math.max(0, document.body.scrollHeight - window.innerHeight - 1);
                const top = Math.min(Math.max(0, desiredTop), maxTop);

                window.scrollTo({ top, behavior: 'smooth' });

                let lastY = null, stableFrames = 0;
                const TOLERANCE = 6;
                const CHECK_FRAMES = 6;

                const check = () => {
                    const nowY = window.scrollY;
                    if (Math.abs(nowY - top) <= TOLERANCE) {
                    clearTimeout(programmaticTimer);
                    programmaticTarget = null;
                    return;
                    }
                    if (lastY === nowY) stableFrames++; else stableFrames = 0;
                    lastY = nowY;
                    if (stableFrames < CHECK_FRAMES) requestAnimationFrame(check);
                    else { clearTimeout(programmaticTimer); programmaticTarget = null; }
                };
                requestAnimationFrame(check);
            };

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

            if ('IntersectionObserver' in window) {
                const ioCallback = entries => {
                    if (isAtBottom()) { setTitle(BOTTOM_YEAR); programmaticTarget = null; return; }
                    if (isAtTop()) { const e = dateEls()[0]; if (e) { setTitle(getYear(e)); programmaticTarget = null; return; } }

                    if (programmaticTarget) {
                        const checkpoint = window.innerHeight * 0.6;
                        const intendedEntry = entries.find(en => {
                            if (getYear(en.target) !== programmaticTarget) return false;
                            const r = en.target.getBoundingClientRect();
                            return en.isIntersecting || (r.top <= checkpoint && r.bottom >= 0) || (r.top <= window.innerHeight * 0.75);
                        });
                        if (intendedEntry) {
                            setTitle(programmaticTarget);
                            clearTimeout(programmaticTimer);
                            programmaticTarget = null;
                        }
                        return;
                    }

                    const vis = entries.filter(e => e.isIntersecting);
                    if (!vis.length) return;
                    vis.sort((a, b) => b.intersectionRatio - a.intersectionRatio);
                    setTitle(getYear(vis[0].target));
                };

                const io = new IntersectionObserver(ioCallback, { root: null, rootMargin: '-40% 0px -60% 0px', threshold: [0, 0.01, 0.25, 0.5, 0.75, 1] });
                const observe = () => { io.disconnect(); dateEls().forEach(d => io.observe(d)); };
                observe();

                window.addEventListener('scroll', () => {
                    if (isAtBottom()) { setTitle(BOTTOM_YEAR); programmaticTarget = null; return; }
                    if (isAtTop()) { const e = dateEls()[0]; if (e) { setTitle(getYear(e)); programmaticTarget = null; return; } }
                }, { passive: true });

            } else {
                let ticking = false;
                const onScroll = () => {
                    if (ticking) return;
                    ticking = true;
                    requestAnimationFrame(() => {
                        if (isAtBottom()) { setTitle(BOTTOM_YEAR); programmaticTarget = null; ticking = false; return; }
                        if (isAtTop()) { const e = dateEls()[0]; if (e) { setTitle(getYear(e)); programmaticTarget = null; ticking = false; return; } }
                        if (programmaticTarget) { ticking = false; return; }

                        const cp = window.innerHeight * 0.6;
                        for (const el of dateEls()) {
                            const r = el.getBoundingClientRect();
                            if (r.top <= cp && r.bottom >= cp) { setTitle(getYear(el)); ticking = false; return; }
                        }
                        const es = dateEls();
                        if (es.length) setTitle(getYear(es[es.length - 1]));
                        ticking = false;
                    });
                };
                window.addEventListener('scroll', onScroll, { passive: true });
                onScroll();
            }

            window.addEventListener('resize', () => { if (picker.classList.contains('open')) closePicker(); });
        });
    }
})