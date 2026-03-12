document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.nft-card');
    
    // 3D Tilt Effect
    cards.forEach(card => {
        card.addEventListener('mousemove', handleMouseMove);
        card.addEventListener('mouseleave', handleMouseLeave);
        card.addEventListener('mouseenter', handleMouseEnter);
        card.addEventListener('click', handleCardClick);
    });
    
    function handleMouseMove(e) {
        const card = e.currentTarget;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 8;
        const rotateY = (centerX - x) / 8;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px) scale(1.02)`;
        
        // Update glow position
        const glow = card.querySelector('.card-glow');
        if (glow) {
            const glowX = (x / rect.width) * 100;
            const glowY = (y / rect.height) * 100;
            glow.style.background = glow.style.background.replace(
                /circle at \d+% \d+%/,
                `circle at ${glowX}% ${glowY}%`
            );
        }
    }
    
    function handleMouseLeave(e) {
        const card = e.currentTarget;
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px) scale(1)';
        card.style.transition = 'transform 0.5s ease';
        
        setTimeout(() => {
            card.style.transition = 'all 0.3s ease';
        }, 500);
    }
    
    function handleMouseEnter(e) {
        const card = e.currentTarget;
        card.style.transition = 'all 0.1s ease';
    }
    
    function handleCardClick(e) {
        const card = e.currentTarget;
        
        // Create ripple effect
        const ripple = document.createElement('div');
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        ripple.style.position = 'absolute';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.style.width = '0px';
        ripple.style.height = '0px';
        ripple.style.borderRadius = '50%';
        ripple.style.background = 'rgba(255, 255, 255, 0.3)';
        ripple.style.transform = 'translate(-50%, -50%)';
        ripple.style.animation = 'ripple 0.6s linear';
        ripple.style.pointerEvents = 'none';
        
        card.appendChild(ripple);
        
        // Pulse effect
        card.style.animation = 'cardPulse 0.3s ease';
        
        setTimeout(() => {
            ripple.remove();
            card.style.animation = '';
        }, 600);
    }
    
    // Add dynamic styles
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                width: 200px;
                height: 200px;
                opacity: 0;
            }
        }
        
        @keyframes cardPulse {
            0% { transform: scale(1); }
            50% { transform: scale(0.98); }
            100% { transform: scale(1); }
        }
        
        @keyframes glitch {
            0% { transform: translate(0); }
            20% { transform: translate(-2px, 2px); }
            40% { transform: translate(-2px, -2px); }
            60% { transform: translate(2px, 2px); }
            80% { transform: translate(2px, -2px); }
            100% { transform: translate(0); }
        }
    `;
    document.head.appendChild(style);
    
    // Parallax effect for background orbs
    document.addEventListener('mousemove', function(e) {
        const orbs = document.querySelectorAll('.orb');
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;
        
        orbs.forEach((orb, index) => {
            const speed = (index + 1) * 0.5;
            const xPos = (x - 0.5) * speed * 20;
            const yPos = (y - 0.5) * speed * 20;
            
            orb.style.transform = `translate(${xPos}px, ${yPos}px)`;
        });
    });
    
    // Random glitch effect
    setInterval(() => {
        const randomCard = cards[Math.floor(Math.random() * cards.length)];
        const title = randomCard.querySelector('.card-title');
        
        if (Math.random() < 0.1) { // 10% chance
            title.style.animation = 'glitch 0.3s ease';
            setTimeout(() => {
                title.style.animation = '';
            }, 300);
        }
    }, 5000);
    
    // Enhanced crystal rotation on hover
    cards.forEach(card => {
        const crystal = card.querySelector('.crystal');
        
        card.addEventListener('mouseenter', () => {
            crystal.style.animationDuration = '2s';
        });
        
        card.addEventListener('mouseleave', () => {
            crystal.style.animationDuration = '8s';
        });
    });
    
    // Entrance animation
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px)';
        
        setTimeout(() => {
            card.style.transition = 'all 0.8s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 200);
    });
});