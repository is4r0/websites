function initCursor() {
    const cursor = document.querySelector('.cursor');

    document.addEventListener('mousemove', e => {
        cursor.style.transform = `translate(${e.clientX - 16}px, ${e.clientY - 16}px)`;
    });

    document.querySelectorAll('a, button, .project').forEach(el => {
        el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
        el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
    });
}

// Progress bar
function initProgressBar() {
    const progressBar = document.querySelector('.progress-bar');

    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = (window.scrollY / windowHeight) * 100;
        progressBar.style.width = `${progress}%`;
    });
}

// Scroll fade effect
function initScrollFade() {
    const fadeElements = document.querySelectorAll('.project');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            } else {
                entry.target.style.opacity = '0';
                entry.target.style.transform = 'translateY(50px)';
            }
        });
    }, { threshold: 0.1 });

    fadeElements.forEach(el => {
        el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        el.style.opacity = '0';
        el.style.transform = 'translateY(50px)';
        observer.observe(el);
    });
}



// Easter Eggs
function initEasterEggs() {
    const projectImages = document.querySelectorAll('.project-img');
    
    projectImages.forEach(img => {
        img.addEventListener('mouseover', () => {
            img.style.transform = `rotate(${Math.random() * 10 - 5}deg) scale(1.1)`;
        });
        
        img.addEventListener('mouseout', () => {
            img.style.transform = 'rotate(0deg) scale(1)';
        });
    });
}

// Email subscription modal
function initEmailModal() {
    const modal = document.getElementById('emailModal');
    const subscribeBtn = document.getElementById('subscribeBtn');
    const closeBtn = document.querySelector('.close-button');
    const form = document.getElementById('emailForm');

    // Show modal
    subscribeBtn.addEventListener('click', () => {
        modal.classList.add('show');
        requestAnimationFrame(() => {
            modal.querySelector('.modal-content').style.transform = 'translateY(0)';
        });
    });

    // Hide modal
    function hideModal() {
        modal.querySelector('.modal-content').style.transform = 'translateY(-20px)';
        modal.classList.remove('show');
    }

    closeBtn.addEventListener('click', hideModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) hideModal();
    });

    // Handle form submission
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        window.location.href = '404.html';
    });
}


function initSubscribeModal() {
 
}


function confettiBurst(x, y, count = 24, size = {w:10, h:14}){
    const colors = ['#ff3b3b','#ff8a00','#ffd400','#2ecc40','#00aaff','#8a2be2'];
    for(let i=0;i<count;i++){
        const el = document.createElement('div');
        el.className = 'confetti-piece';
        el.style.width = (size.w || 10) + 'px';
        el.style.height = (size.h || 14) + 'px';
        el.style.left = x + 'px';
        el.style.top = y + 'px';
        el.style.background = colors[i % colors.length];
        el.style.transform = `translate(-50%, -50%) rotate(${Math.random()*360}deg)`;
        document.body.appendChild(el);

        const angle = (Math.random()*Math.PI*2);
        const velocity = 80 + Math.random()*160;
        const vx = Math.cos(angle) * velocity;
        const vy = Math.sin(angle) * velocity - 30; // lift
        const duration = 700 + Math.random()*500;

        el.animate([
            { transform: el.style.transform, opacity: 1 },
            { transform: `translate(${vx}px, ${vy + 60}px) rotate(${Math.random()*720}deg)`, opacity: 0 }
        ], { duration, easing: 'cubic-bezier(.2,.9,.2,1)' }).onfinish = () => el.remove();
    }
}




function initHearts(){

}


function initFourthSpin(){

}

document.addEventListener('DOMContentLoaded', () => {
    initCursor();
    initProgressBar();
    initScrollFade();
    initEasterEggs();
    initEmailModal();
    initSubscribeModal();
    initHearts();
    initFourthSpin();
    
    const pressureTexts = document.querySelectorAll('.pressure-text');

    pressureTexts.forEach(text => {
        // Split text into characters if not already split
        if (!text.querySelector('.char')) {
            const content = text.textContent;
            text.textContent = '';
            content.split('').forEach(char => {
                const span = document.createElement('span');
                span.className = 'char';
                span.textContent = char;
                text.appendChild(span);
            });
        }

        const chars = Array.from(text.querySelectorAll('.char'));

       
        function computeCenters() {
            return chars.map(ch => {
                const r = ch.getBoundingClientRect();
                return {
                    el: ch,
                    cx: r.left + r.width / 2,
                    cy: r.top + r.height / 2,
                    current: 0 
                };
            });
        }

        let centers = computeCenters();
        
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => centers = computeCenters(), 120);
        });

        let mouseX = -9999, mouseY = -9999;
        let running = false;
        const maxDistance = 150; 
        const lerp = 0.3; 

        function rafLoop() {
            let anyActive = false;
                    centers.forEach(c => {
                        const dx = mouseX - c.cx;
                        const dy = mouseY - c.cy;
                        const dist = Math.sqrt(dx * dx + dy * dy);
                        const target = Math.max(0, 1 - dist / maxDistance);

                       
                        c.current += (target - c.current) * lerp;

                        
                        const strength = c.current; // 0..1
                        if (strength > 0.001) anyActive = true;

                        
                        const clamp = maxDistance * 1.2;
                        const cdx = Math.max(-clamp, Math.min(clamp, dx));
                        const cdy = Math.max(-clamp, Math.min(clamp, dy));

                        const tx = cdx * strength * 0.5; // horizontal move
                        const ty = cdy * strength * 0.3; // vertical move
                        const scale = 1 + strength * 1.0; 
                        const skew = (cdx / maxDistance) * strength * 20;
                        const rotate = (cdx * cdy) * 0.0008 * strength * 40; 

                       
                        c.el.style.transform = `translate3d(${tx.toFixed(2)}px, ${ty.toFixed(2)}px, 0) rotate(${rotate.toFixed(2)}deg) skewX(${skew.toFixed(2)}deg) scale(${scale.toFixed(3)})`;

                              
                                const shadowOpacity = Math.min(0.45, strength * 0.7);
                                c.el.style.textShadow = shadowOpacity > 0 ? `0 ${Math.max(0.8, strength * 4)}px ${Math.max(1.5, strength * 6)}px rgba(0,0,0,${shadowOpacity})` : '';
                              
                                const weight = Math.round(200 + strength * 250); 
                                c.el.style.fontWeight = weight;
                    });

            if (anyActive || (mouseX > -9000 && mouseY > -9000 && mouseX !== -9999)) {
              
                requestAnimationFrame(rafLoop);
            } else {
                running = false;
            }
        }

        function onMove(e) {
            mouseX = e.clientX;
            mouseY = e.clientY;
            if (!running) {
                running = true;
                requestAnimationFrame(rafLoop);
            }
        }

        function onLeave() {
         
            mouseX = -9999;
            mouseY = -9999;
            if (!running) {
                running = true;
                requestAnimationFrame(rafLoop);
            }
        }

        text.addEventListener('mousemove', onMove);
        text.addEventListener('mouseleave', onLeave);
    });
});
