document.addEventListener('DOMContentLoaded', () => {

    /* --- SQL CONSOLE LOGIC --- */
    const sqlInput = document.getElementById('sqlInput');
    const sqlRunBtn = document.getElementById('sqlRunBtn');
    const sqlResults = document.getElementById('sqlResults');

    if (sqlInput && sqlRunBtn && sqlResults) {
        // Estado inicial de la consola SQL
        sqlResults.innerHTML = '<div class="sql-success" style="color:#6B7280; padding:20px; font-size:0.85rem;">Esperando consulta... Escribe un comando SQL y pulsa "Ejecutar" o "Enter".</div>';

        const renderTable = (data) => {
            if(data.length === 0) return `<div class="sql-empty">0 rows returned.</div>`;
            const headers = Object.keys(data[0]);
            let ths = headers.map(h => `<th>${h}</th>`).join('');
            let rows = data.map(row => {
                return `<tr>${headers.map(h => `<td>${row[h]}</td>`).join('')}</tr>`;
            }).join('');
            return `<table class="sql-table"><thead><tr>${ths}</tr></thead><tbody>${rows}</tbody></table>`;
        };

        const dataExperience = [
            { role: 'Data & BI Developer', company: 'Santander', focus: 'Risk Reporting, DAX' },
            { role: 'Data & BI Dev (Prácticas)', company: 'Nter Tech', focus: 'ETL Pipelines, Power BI' },
            { role: 'DAX Assistant Dev', company: 'NFQ Solutions', focus: 'AI LLMs, SQL Server' }
        ];
        
        const dataSkills = [
            { category: 'BI', tool: 'Power BI', level: 'Avanzado' },
            { category: 'Data Engineering', tool: 'Python/SQL', level: 'Avanzado' },
            { category: 'AI', tool: 'LLMs/Groq', level: 'Intermedio' }
        ];

        const executeSQL = () => {
            const query = sqlInput.value.trim().toUpperCase();
            sqlResults.innerHTML = '';
            
            // Animación de carga
            sqlRunBtn.innerHTML = '⏳ Executing...';
            sqlRunBtn.style.opacity = '0.7';

            setTimeout(() => {
                sqlRunBtn.innerHTML = '▶ Ejecutar (F5)';
                sqlRunBtn.style.opacity = '1';

                if (query.includes('FROM EXPERIENCE')) {
                    if(query.includes("'SANTANDER'")) {
                        sqlResults.innerHTML = renderTable(dataExperience.filter(d => d.company === 'Santander'));
                    } else {
                        sqlResults.innerHTML = renderTable(dataExperience);
                    }
                } else if (query.includes('FROM SKILLS')) {
                    sqlResults.innerHTML = renderTable(dataSkills);
                } else if (query === '') {
                    sqlResults.innerHTML = `<div class="sql-empty">Error: La consulta no puede estar vacía.</div>`;
                } else {
                    sqlResults.innerHTML = `<div class="sql-empty">Error: Tabla no encontrada o error de sintaxis. Prueba con <i>SELECT * FROM experience</i></div>`;
                }
            }, 400);
        };

        sqlRunBtn.addEventListener('click', executeSQL);
        sqlInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') executeSQL();
        });
    }

    /* --- JUPYTER CELL LOGIC --- */
    const jCell = document.getElementById('jupyterCell');
    const jPrompt = document.getElementById('jPrompt');
    const jOut = document.getElementById('jOut');
    let jExecuted = false;

    if (jCell) {
        // Cambiado de 'mouseenter' a 'click' para que sea intencionado
        jCell.addEventListener('click', () => {
            if (!jExecuted) {
                jPrompt.innerHTML = 'In [*]:';
                // Ocultar texto de ayuda al hacer clic
                const hint = jCell.querySelector('.j-hover-hint');
                if(hint) hint.style.display = 'none';

                setTimeout(() => {
                    jPrompt.innerHTML = 'In [1]:';
                    jOut.style.display = 'flex';
                    jExecuted = true;
                }, 600); // Simulamos el retraso de pandas procesando
            }
        });
    }

    /* --- PROGRESS BAR --- */
    window.addEventListener('scroll', () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        document.getElementById('scrollProgress').style.width = scrolled + '%';
        
        // Nav Shadow
        const nav = document.getElementById('nav');
        if(window.scrollY > 50) { nav.style.boxShadow = '0 4px 20px rgba(0,0,0,.07)'; } 
        else { nav.style.boxShadow = 'none'; }
    });

    /* --- HAMBURGUESA & MOBILE NAV --- */
    const burger = document.getElementById('navBurger');
    const navMobile = document.getElementById('navMobile');
    burger.addEventListener('click', () => {
        const open = navMobile.classList.toggle('open');
        burger.classList.toggle('open', open);
        document.body.style.overflow = open ? 'hidden' : '';
    });
    document.querySelectorAll('.mob-link, .mob-cta').forEach(a => {
        a.addEventListener('click', () => {
            navMobile.classList.remove('open');
            burger.classList.remove('open');
            document.body.style.overflow = '';
        });
    });

    /* --- TYPEWRITER EFFECT --- */
    const text = "~/  Data & BI Developer  ·  Data Management Consultant  ·  Full-Stack";
    const speed = 40;
    let i = 0;
    const typeWriterEl = document.getElementById("typewriter");
    function typeWriter() {
        if (i < text.length) {
            typeWriterEl.innerHTML += text.charAt(i);
            i++;
            setTimeout(typeWriter, speed);
        }
    }
    setTimeout(typeWriter, 1000);

    /* --- EMAIL --- */
    (function(){
        const u='oscarherruzom', d='gmail.com', email=u+'@'+d;
        const subject='?subject=Hola%20%C3%93scar%20-%20Contacto%20desde%20portfolio';
        const link = document.getElementById('emailLink');
        const display = document.getElementById('emailDisplay');
        if(display) display.textContent = email;
        if(link){
            const href = 'mailto:'+email+subject;
            link.setAttribute('href', href);
            link.addEventListener('click', function(e){
                e.preventDefault();
                window.location.href = href;
            });
        }
    })();

    /* --- CURSOR & MAGNETIC --- */
    const isTouch = (('ontouchstart' in window) || (navigator.maxTouchPoints > 0));
    if(!isTouch) {
        const cDot = document.getElementById('cDot');
        const cRing = document.getElementById('cRing');
        let mx = 0, my = 0, rx = 0, ry = 0;
        
        document.addEventListener('mousemove', e => {
            mx = e.clientX; 
            my = e.clientY;
            cDot.style.left = mx + 'px';
            cDot.style.top = my + 'px';
        });
        
        const loop = () => {
            rx += (mx - rx) * 0.15; 
            ry += (my - ry) * 0.15;
            cRing.style.left = rx + 'px';
            cRing.style.top = ry + 'px';
            requestAnimationFrame(loop);
        };
        loop();

        document.querySelectorAll('a, button, .tilt-card').forEach(el => {
            el.addEventListener('mouseenter', () => {
                cRing.style.width = '60px'; cRing.style.height = '60px';
                cRing.style.backgroundColor = 'rgba(163, 230, 53, 0.1)';
                cDot.style.transform = 'translate(-50%, -50%) scale(0.5)';
            });
            el.addEventListener('mouseleave', () => {
                cRing.style.width = '40px'; cRing.style.height = '40px';
                cRing.style.backgroundColor = 'transparent';
                cDot.style.transform = 'translate(-50%, -50%) scale(1)';
            });
        });

        /* Botones Magnéticos */
        document.querySelectorAll('.magnetic').forEach(elem => {
            elem.addEventListener('mousemove', e => {
                const rect = elem.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                elem.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
            });
            elem.addEventListener('mouseleave', () => {
                elem.style.transform = 'translate(0px, 0px)';
            });
        });

        /* Tarjetas 3D Tilt */
        document.querySelectorAll('.tilt-card').forEach(card => {
            card.addEventListener('mousemove', e => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const rotateX = ((y - centerY) / centerY) * -8; 
                const rotateY = ((x - centerX) / centerX) * 8;
                
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
                
                if(card.classList.contains('skill-card') || card.classList.contains('learn-card') || card.classList.contains('jupyter-cell')) {
                    card.style.setProperty('--mouse-x', `${x}px`);
                    card.style.setProperty('--mouse-y', `${y}px`);
                }
            });
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
            });
        });
    }

    /* --- COUNTER ANIMATION --- */
    const runCounter = (el) => {
        const target = parseInt(el.getAttribute('data-target'));
        const duration = 2000;
        const step = target / (duration / 16); 
        let current = 0;
        
        const update = () => {
            current += step;
            if(current < target) {
                el.innerText = Math.ceil(current);
                requestAnimationFrame(update);
            } else {
                el.innerText = target;
            }
        };
        update();
    };

    /* --- SCROLL REVEAL --- */
    const obs = new IntersectionObserver(entries => {
        entries.forEach(e => {
            if(e.isIntersecting) {
                e.target.classList.add('vis');
                
                e.target.querySelectorAll('.sk-bar').forEach(b => { b.style.width = b.getAttribute('data-w') + '%'; });
                e.target.querySelectorAll('.learn-progress').forEach(b => { b.style.width = b.getAttribute('data-w') + '%'; });
                e.target.querySelectorAll('.counter').forEach(c => {
                    if(!c.classList.contains('counted')) {
                        runCounter(c);
                        c.classList.add('counted');
                    }
                });
                obs.unobserve(e.target);
            }
        });
    }, {threshold: .1});
    document.querySelectorAll('.reveal, .stagger, .metric-item').forEach(el => obs.observe(el));

    /* --- SMOOTH SCROLL --- */
    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', e => {
            const target = a.getAttribute('href');
            if(target === '#') return;
            e.preventDefault();
            const t = document.querySelector(target);
            if(t) t.scrollIntoView({behavior:'smooth',block:'start'});
        });
    });

    /* --- DATA NETWORK CANVAS (HERO) --- */
    const canvas = document.getElementById('dataCanvas');
    if(canvas && !isTouch) {
        const ctx = canvas.getContext('2d');
        let width, height;
        let particles = [];
        
        const resize = () => {
            width = canvas.width = canvas.offsetWidth;
            height = canvas.height = canvas.offsetHeight;
        };
        window.addEventListener('resize', resize);
        resize();
        
        class Particle {
            constructor() {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.size = Math.random() * 2 + 1;
                this.speedX = Math.random() * 0.4 - 0.2;
                this.speedY = Math.random() * 0.4 - 0.2;
                this.baseOpacity = Math.random() * 0.5 + 0.2;
            }
            update() {
                this.x += this.speedX;
                this.y += this.speedY;
                if (this.x > width) this.x = 0; else if (this.x < 0) this.x = width;
                if (this.y > height) this.y = 0; else if (this.y < 0) this.y = height;
                
                // Interacción con ratón
                const dx = mx - this.x;
                const dy = my - this.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                if (distance < 120) {
                    this.x -= dx * 0.01;
                    this.y -= dy * 0.01;
                }
            }
            draw() {
                ctx.fillStyle = `rgba(163, 230, 53, ${this.baseOpacity})`;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }
        
        const initParticles = () => {
            particles = [];
            const particleCount = Math.min(Math.floor(width * height / 12000), 120);
            for (let i = 0; i < particleCount; i++) {
                particles.push(new Particle());
            }
        };
        initParticles();
        
        const animateCanvas = () => {
            ctx.clearRect(0, 0, width, height);
            for (let i = 0; i < particles.length; i++) {
                for (let j = i; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    
                    if (distance < 150) {
                        ctx.beginPath();
                        ctx.strokeStyle = `rgba(21, 128, 61, ${0.2 * (1 - distance/150)})`;
                        ctx.lineWidth = 1;
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                    }
                }
                particles[i].update();
                particles[i].draw();
            }
            requestAnimationFrame(animateCanvas);
        };
        animateCanvas();
    }
});