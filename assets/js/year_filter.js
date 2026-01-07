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
        const YEAR_RE = /\b(19|20)\d{2}$\b/;

        const getYearFromEl = el => {
            if (!el) return null;
            const txt = el.textContent || '';
            const m = txt.match(YEAR_RE);
            return m ? m[0] : null;
        };

        const titleYearEl = document.createElement('span');
        titleYearEl.classList.add('current_year')
        document.querySelector('.exhib_title').appendChild(titleYearEl)

        // find all exhibition date elements
        const dateEls = Array.from(document.querySelectorAll('.exhibition_date'));

        // Map element -> year
        const elYears = dateEls.map(el => ({ el, year: getYearFromEl(el) })).filter(x => x.year);

        // Utility to set the visible year (idempotent)
        let current = null;
        const setYear = y => {
            if (y === current) return;
            current = y;
            titleYearEl.textContent = y || '';
        };

        // Special bottom-of-page behaviour: force year to "2022" (desktop parity)
        const BOTTOM_YEAR = '2022';
        const isAtBottom = () => window.innerHeight + window.scrollY >= document.body.scrollHeight - 1;
        const checkBottomAndApply = () => {
            if (isAtBottom()) {
            setYear(BOTTOM_YEAR);
            return true;
            }
            return false;
        };

        // Top-of-page behaviour: force first exhibition's year when at very top
        const TOP_THRESHOLD = 8; // px from top considered "at top"
        const isAtTop = () => window.scrollY <= TOP_THRESHOLD;
        const checkTopAndApply = () => {
            if (isAtTop()) {
                setYear(elYears[0].year);
                return true;
            }
            return false;
        };

        // INITIALIZATION: if page is at top, show the first exhibition's year,
        // otherwise pick the element nearest the viewport center
        if (isAtTop()) {
            setYear(elYears[0].year);
        } else {
            // pick the element whose center is closest to viewport middle
            const viewportMiddle = window.innerHeight * 0.5;
            let best = elYears[0];
            let bestDist = Infinity;
            for (const ew of elYears) {
            const r = ew.el.getBoundingClientRect();
            const center = r.top + r.height / 2;
            const dist = Math.abs(center - viewportMiddle);
            if (dist < bestDist) { bestDist = dist; best = ew; }
            }
            setYear(best ? best.year : elYears[0].year);
        }

        // If browser supports IntersectionObserver, use it (recommended)
        if ('IntersectionObserver' in window) {
            // We want to find the element that is near a checkpoint vertical position.
            // Use rootMargin to bias the observable area toward a point ~40-60% of viewport height.
            const rootMargin = `-40% 0px -60% 0px`; // element is "in view" when it crosses ~center area
            const io = new IntersectionObserver((entries) => {
                // bottom override has highest priority
                if (checkBottomAndApply()) return;                
                if (checkTopAndApply()) return;
                
                // Among intersecting entries pick the one with the largest intersectionRatio
                const visible = entries.filter(e => e.isIntersecting);
                if (visible.length === 0) return;

                visible.sort((a, b) => b.intersectionRatio - a.intersectionRatio);
                const topEntry = visible[0];
                const y = getYearFromEl(topEntry.target) || null;
                setYear(y);
            }, { root: null, rootMargin, threshold: [0, 0.01, 0.25, 0.5, 0.75, 1] });

            elYears.forEach(({ el }) => io.observe(el));

            // Listen for scroll only to detect bottom-of-page/top-of-page (cheap)
            window.addEventListener('scroll', () => {
            if (checkBottomAndApply()) return;
            checkTopAndApply();
            }, { passive: true });

            return;
        }

        // Fallback (no IO): throttled / requestAnimationFrame-based scroll handler
        let ticking = false;
        const onScroll = () => {
            if (ticking) return;
            ticking = true;
            requestAnimationFrame(() => {
            // priority checks
            if (checkBottomAndApply()) {
                ticking = false;
                return;
            }
            if (checkTopAndApply()) {
                ticking = false;
                return;
            }

            const checkpoint = window.innerHeight * 0.6;
            for (const { el, year } of elYears) {
                const r = el.getBoundingClientRect();
                if (r.top <= checkpoint && r.bottom >= checkpoint) {
                setYear(year);
                ticking = false;
                return;
                }
            }

            // If nothing matched, fallback to the last element's year
            setYear(elYears[elYears.length - 1].year);
            ticking = false;
            });
        };

        window.addEventListener('scroll', onScroll, { passive: true });
        // also run once to ensure state is correct after load
        onScroll();
    }
})