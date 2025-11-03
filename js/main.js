document.addEventListener('DOMContentLoaded', () => {

    gsap.registerPlugin(ScrollTrigger);

    // --- BARRA DE PROGRESSO (Controlada pelo Scroll) ---
    gsap.to('#progress-bar', {
        width: '100%',
        ease: 'none',
        scrollTrigger: {
            trigger: 'body',
            start: 'top top',
            end: 'bottom bottom',
            scrub: 0.5
        }
    });

    // --- 1. HERO (ANIMAÇÃO DE INTRODUÇÃO AUTOMÁTICA) ---
    const heroIntroTimeline = gsap.timeline(); 
    
    heroIntroTimeline
        .to({}, { duration: 2.7 }) 
        .to('#foto1', { 
            opacity: 0, 
            duration: 0.7, 
            ease: 'power2.inOut' 
        }, "transition-start") 
        .to('#photo-caption', { 
            opacity: 1, 
            transform: 'translate(-50%, -50%)', 
            duration: 0.7, 
            ease: 'power2.out' 
        }, "transition-start") 
        .to('#foto2', { 
            opacity: 1, 
            duration: 0.7, 
            ease: 'power2.inOut' 
        }, "transition-start");

    // --- 2. HOBBIES ---
    gsap.to('#hobbies h2', {
        opacity: 1, y: 0, duration: 0.5,
        scrollTrigger: {
            trigger: '#hobbies h2',
            start: 'top 80%' 
        }
    });

    const slides = gsap.utils.toArray('#hobbies .carousel-slide');
    const fadeTime = 0.5; 
    const stayTime = 3.0; 
    const slidesTL = gsap.timeline({
        scrollTrigger: {
            trigger: '.carousel-container',
            start: 'top 80%' 
        },
        delay: 0.6, 
        repeat: -1 
    });
    
    // Diz à timeline para começar fazendo o fade in do primeiro slide
    slidesTL.to(slides[0], { opacity: 1, duration: fadeTime });

    // Constrói a timeline de loop
    slides.forEach((slide, i) => {
        const nextSlide = slides[(i + 1) % slides.length];
        
        slidesTL
            .to(slide, { duration: stayTime }) 
            .to(slide, { opacity: 0, duration: fadeTime }, 'fade-' + i) 
            .to(nextSlide, { opacity: 1, duration: fadeTime }, 'fade-' + i); 
    });


    // --- 3. PREFEITURA ---
    gsap.to('#prefeitura .timeline-content p', {
        opacity: 1, y: 0, stagger: 0.3, duration: 0.7,
        scrollTrigger: {
            trigger: '#prefeitura .timeline-content',
            start: 'top 80%'
        }
    });

    // --- LÓGICA DO FLUXO (Condicional) ---
    const fluxoContainer = document.querySelector('#prefeitura .fluxo-container');
    const fluxoImg = document.getElementById('fluxo-img');
    const processoImg = document.getElementById('processo-img');
    const popover = document.getElementById('fluxo-popover');
    
    let isMobile = window.matchMedia("(max-width: 768px)").matches;

    if (isMobile) {
        // LÓGICA DE MOBILE: Click/Tap para alternar
        let isFluxoVisible = true;
        const hintText = document.querySelector('.mobile-click-hint');
        let hintClicked = false;
        
        fluxoContainer.addEventListener('click', () => { 
            // Esconde o hint no primeiro clique e marca como clicado
            if (hintText && !hintClicked) {
                gsap.to(hintText, { opacity: 0, duration: 0.3, onComplete: () => hintText.style.display = 'none' });
                hintClicked = true;
            }

            isFluxoVisible = !isFluxoVisible; 
            
            if (isFluxoVisible) {
                // Mostra fluxo
                gsap.to(fluxoImg, { opacity: 1, duration: 0.3 });
                gsap.to(processoImg, { opacity: 0, duration: 0.3 });
            } else {
                // Mostra processo
                gsap.to(fluxoImg, { opacity: 0, duration: 0.3 });
                gsap.to(processoImg, { opacity: 1, duration: 0.3 });
            }
        });

    } else {
        // LÓGICA DE DESKTOP: Hover In/Out
        fluxoContainer.addEventListener('mouseenter', () => {
            gsap.to(fluxoImg, { opacity: 1, duration: 0.3 });
            gsap.to(popover, { opacity: 1, duration: 0.3 });
            gsap.to(processoImg, { opacity: 0, duration: 0.3 });
        });

        fluxoContainer.addEventListener('mouseleave', () => {
            gsap.to(fluxoImg, { opacity: 0, duration: 0.3 });
            gsap.to(popover, { opacity: 0, duration: 0.3 });
            gsap.to(processoImg, { opacity: 1, duration: 0.3 });
        });
    }
 
    // Animação do texto do popover
    gsap.fromTo('#fluxo-popover p', { opacity: 0, y: 10 }, {
        opacity: 1, y: 0, stagger: 0.25,
        scrollTrigger: { trigger: '#fluxo-popover', start: 'top 90%' }
    });
 
    
    // --- 4. PANDEMIA & AUTOMAÇÃO  ---
    gsap.to('#pandemia h2', { opacity: 1, y: 0, duration: 0.7, scrollTrigger: { trigger: '#pandemia h2', start: 'top 80%' } });
    gsap.to('#pandemia p', { opacity: 1, y: 0, duration: 0.7, scrollTrigger: { trigger: '#pandemia p', start: 'top 80%' } });
    gsap.to('.service-links a', {
        opacity: 1, y: 0, stagger: 0.2, duration: 0.5,
        scrollTrigger: {
            trigger: '.service-links',
            start: 'top 80%'
        }
    });

    // --- 5. FLUXÃO ZOOMÁVEL  ---
    gsap.to('#fluxao h2', { opacity: 1, y: 0, duration: 0.7, scrollTrigger: { trigger: '#fluxao h2', start: 'top 80%' } });
    gsap.to('#fluxao p', {
        opacity: 1, y: 0, stagger: 0.3, duration: 0.7,
        scrollTrigger: {
            trigger: '#fluxao p',
            start: 'top 80%'
        }
    });

    const fluxaoImg = document.getElementById('fluxao-img');
    const panzoom = Panzoom(fluxaoImg, {
        maxScale: 5,
        minScale: 0.5
    });
    fluxaoImg.parentElement.addEventListener('wheel', panzoom.zoomWithWheel);

    // --- 6. EDUCAÇÃO ---
    gsap.to('#educacao .education-text h2', { opacity: 1, y: 0, duration: 0.7, scrollTrigger: { trigger: '#educacao .education-text h2', start: 'top 80%' } });
    gsap.to('#educacao .education-text p', {
        opacity: 1, y: 0, stagger: 0.3, duration: 0.7,
        scrollTrigger: {
            trigger: '#educacao .education-text p',
            start: 'top 80%'
        }
    });
    gsap.to('#educacao .education-text2 p', {
        opacity: 1, y: 0, stagger: 0.3, duration: 0.7,
        scrollTrigger: {
            trigger: '#educacao .education-text2 p',
            start: 'top 80%'
        },
    });
    
    const sonicGif = document.querySelector('#educacao .sonic');
    const gallery = document.querySelector('.education-gallery');
    const galleryTL = gsap.timeline({
        paused: true,
        repeat: -1 
    });
    
    const imageCount = 14;
    const galleryFadeTime = 0.5; 
    const galleryStayTime = 1.0; 

    let allImages = [];
    for (let i = 0; i < imageCount; i++) {
        const letter = String.fromCharCode(97 + i); 
        const img = document.createElement('img');
        img.src = `assets/${letter}.png`;
        img.alt = `Imagem da faculdade / certificados ${i + 1}`;
        gallery.appendChild(img);
        allImages.push(img); 
    }

    galleryTL.to(allImages[0], { opacity: 1, duration: galleryFadeTime });

    allImages.forEach((img, i) => {
        const nextImg = allImages[(i + 1) % allImages.length]; 
        
        galleryTL
            .to(img, { duration: galleryStayTime }) 
            .to(img, { opacity: 0, duration: galleryFadeTime }, 'gallery-fade-' + i) 
            .to(nextImg, { opacity: 1, duration: galleryFadeTime }, 'gallery-fade-' + i); 
    });
    const eduSequenceTL = gsap.timeline({
        scrollTrigger: {
            trigger: sonicGif,
            start: 'top 80%'
        },
        delay: 0.6
    });

    eduSequenceTL
        .to(sonicGif, { opacity: 1, duration: 0.5 }) // GIF aparece (fade in)
        .to({}, { duration: 3.0 }) // GIF playng
        .to(sonicGif, { opacity: 0, duration: 0.5, onComplete: () => {
            gsap.set(sonicGif, { display: 'none' }); // Esconde o GIF 😎
        }})
        .set(gallery, { display: 'block' }) // Mostra a galeria
        .to(gallery, { opacity: 1, duration: 0.5 }, "-=0.3") 
        .call(() => {
            galleryTL.play(); // COMEÇA o loop da galeria
        });

        
    // --- 7. ESTÁGIO 2025  ---
    gsap.to('#estagio h2', { opacity: 1, y: 0, duration: 0.7, scrollTrigger: { trigger: '#estagio h2', start: 'top 80%' } });
    gsap.to('#estagio p', { opacity: 1, y: 0, stagger: 0.3, duration: 0.7, scrollTrigger: { trigger: '#estagio p', start: 'top 80%' } });
    
    const estagioVideo = document.getElementById('estagio-video');
    if (estagioVideo) {
        const videoContainer = estagioVideo.parentElement;
        const hintText2 = document.querySelector('.mobile-click-hint2'); 
        let hint2Clicked = false; 
        if (videoContainer && videoContainer.classList.contains('video')) {            
            if (!isMobile) { 
                videoContainer.addEventListener('mouseenter', () => {
                    estagioVideo.play();
                });  
                videoContainer.addEventListener('mouseleave', () => {
                    estagioVideo.pause();
                    estagioVideo.currentTime = 0; 
                });
            }
            videoContainer.addEventListener('click', () => {            
                // Lógica para esconder o hint de click
                if (isMobile && hintText2 && !hint2Clicked) {
                    gsap.to(hintText2, { opacity: 0, duration: 0.3, onComplete: () => hintText2.style.display = 'none' });
                    hint2Clicked = true;
                }               
                if (estagioVideo.paused) {
                    estagioVideo.play();
                } else {
                    estagioVideo.pause();
                }
            });
        }
    }
    gsap.to(['#docker-icon', '#api-icon', '#response-icon'], {
        opacity: 1, scale: 1, stagger: 0.8,
        repeat: -1, 
        repeatDelay: 2, 
        duration: 0.5,
        scrollTrigger: {
            trigger: '.tech-flow',
            start: 'top 80%'
        }
    });

    gsap.to(['#docker-icon', '#api-icon', '#response-icon'], {
        opacity: 1, scale: 1, stagger: 0.8,
        repeat: -1, 
        repeatDelay: 2, 
        duration: 0.5,
        scrollTrigger: {
            trigger: '.tech-flow',
            start: 'top 80%'
        }
    });

    // --- 8. BETTERFLIX  ---
    gsap.to('#betterflix h2', { opacity: 1, y: 0, duration: 0.7, scrollTrigger: { trigger: '#betterflix h2', start: 'top 80%' } });
    gsap.to('#betterflix p', {
        opacity: 1, y: 0, stagger: 0.3, duration: 0.7,
        scrollTrigger: {
            trigger: '#betterflix p',
            start: 'top 80%'
        }
    });

    // --- 9. SKILLS ---
    gsap.to('#skills h2', { opacity: 1, y: 0, duration: 0.7, scrollTrigger: { trigger: '#skills h2', start: 'top 80%' } });
    gsap.to('#skills p', {
        opacity: 1, y: 0, stagger: 0.3, duration: 0.7,
        scrollTrigger: {
            trigger: '#skills p',
            start: 'top 80%'
        }
    });
    
    // --- 10. CTA  ---
    gsap.to('#cta h2', { opacity: 1, y: 0, duration: 0.7, scrollTrigger: { trigger: '#cta h2', start: 'top 80%' } });
    gsap.to('#cta p', { opacity: 1, y: 0, duration: 0.7, scrollTrigger: { trigger: '#cta p', start: 'top 80%' } });

    const presentButton = document.getElementById('present-button');
    const modal = document.getElementById('contact-modal');
    const closeModalButton = document.getElementById('close-modal');
    const copyPhoneButton = document.getElementById('copy-phone');
    
    presentButton.addEventListener('click', () => {
        modal.classList.add('visible');
        modal.setAttribute('aria-hidden', 'false');
        
        if (typeof confetti === 'function' && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 }
            });
        }
    });

    closeModalButton.addEventListener('click', () => {
        modal.classList.remove('visible');
        modal.setAttribute('aria-hidden', 'true');
    });

    copyPhoneButton.addEventListener('click', () => {
        const phoneNumber = document.getElementById('phone-number').innerText;
        navigator.clipboard.writeText(phoneNumber).then(() => {
            copyPhoneButton.innerText = 'Copiado!';
            setTimeout(() => { copyPhoneButton.innerText = 'Copiar Telefone'; }, 2000);
        });
    });
});