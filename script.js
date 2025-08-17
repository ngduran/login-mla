document.addEventListener('DOMContentLoaded', function() {
    // Efeito de digitação no placeholder
    const inputs = document.querySelectorAll('input[type="text"], input[type="password"]');
    
    inputs.forEach(input => {
        const originalPlaceholder = input.placeholder;
        
        input.addEventListener('focus', function() {
            this.placeholder = '';
            typeWriter(this, originalPlaceholder, 100);
        });
        
        input.addEventListener('blur', function() {
            if (this.value === '') {
                this.placeholder = originalPlaceholder;
            }
        });
    });
    
    function typeWriter(element, text, speed) {
        let i = 0;
        element.placeholder = '';
        
        function type() {
            if (i < text.length) {
                element.placeholder += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        type();
    }
    
    // Efeito de partículas no fundo
    createParticles();
    
    function createParticles() {
        const particleContainer = document.createElement('div');
        particleContainer.className = 'particles';
        particleContainer.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: -1;
        `;
        document.body.appendChild(particleContainer);
        
        for (let i = 0; i < 50; i++) {
            createParticle(particleContainer);
        }
    }
    
    function createParticle(container) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: 2px;
            height: 2px;
            background: #00d4ff;
            border-radius: 50%;
            opacity: 0.7;
            animation: float ${Math.random() * 10 + 5}s linear infinite;
        `;
        
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 5 + 's';
        
        container.appendChild(particle);
        
        // Remove e recria a partícula após a animação
        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
                createParticle(container);
            }
        }, (Math.random() * 10 + 5) * 1000);
    }
    
    // Adiciona CSS para animação das partículas
    const style = document.createElement('style');
    style.textContent = `
        @keyframes float {
            0% {
                transform: translateY(100vh) translateX(0px);
                opacity: 0;
            }
            10% {
                opacity: 0.7;
            }
            90% {
                opacity: 0.7;
            }
            100% {
                transform: translateY(-100px) translateX(${Math.random() * 200 - 100}px);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
    
    // Efeito de scan line
    createScanLine();
    
    function createScanLine() {
        const scanLine = document.createElement('div');
        scanLine.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 2px;
            background: linear-gradient(90deg, transparent, #00d4ff, transparent);
            z-index: 1000;
            animation: scan 4s linear infinite;
            opacity: 0.6;
        `;
        document.body.appendChild(scanLine);
        
        const scanStyle = document.createElement('style');
        scanStyle.textContent = `
            @keyframes scan {
                0% { top: 0; opacity: 0; }
                50% { opacity: 0.6; }
                100% { top: 100vh; opacity: 0; }
            }
        `;
        document.head.appendChild(scanStyle);
    }
    
    // Efeito de glitch no título
    const title = document.querySelector('.logo h1');
    if (title) {
        setInterval(() => {
            if (Math.random() < 0.1) { // 10% de chance
                title.style.textShadow = '2px 0 #ff0000, -2px 0 #00ffff';
                setTimeout(() => {
                    title.style.textShadow = '0 0 10px rgba(0, 212, 255, 0.5)';
                }, 100);
            }
        }, 2000);
    }
    
    // Atualização dinâmica dos dados do sistema
    const dataValues = document.querySelectorAll('.data-value');
    
    function updateSystemData() {
        dataValues.forEach((value, index) => {
            switch(index) {
                case 1: // Conexões
                    const connections = Math.floor(Math.random() * 50) + 200;
                    value.textContent = connections;
                    break;
                case 2: // Uptime
                    const uptime = (99.5 + Math.random() * 0.4).toFixed(1);
                    value.textContent = uptime + '%';
                    break;
            }
        });
    }
    
    // Atualiza os dados a cada 3 segundos
    setInterval(updateSystemData, 3000);
    
    // Efeito de hover nos inputs
    inputs.forEach(input => {
        input.addEventListener('mouseenter', function() {
            this.style.boxShadow = '0 0 15px rgba(0, 212, 255, 0.3)';
        });
        
        input.addEventListener('mouseleave', function() {
            if (this !== document.activeElement) {
                this.style.boxShadow = 'none';
            }
        });
    });
    
    // Validação do formulário com efeitos visuais
    const loginBtn = document.querySelector('.login-btn');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    
    if (loginBtn) {
        loginBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Efeito de loading
            this.innerHTML = '<span>PROCESSANDO...</span>';
            this.style.background = 'linear-gradient(45deg, #ff6b00, #ff8c00)';
            
            // Simula processo de login
            setTimeout(() => {
                if (usernameInput.value && passwordInput.value) {
                    this.innerHTML = '<span>ACESSO AUTORIZADO</span>';
                    this.style.background = 'linear-gradient(45deg, #00ff88, #00cc66)';
                    
                    // Efeito de sucesso
                    document.body.style.animation = 'fadeOut 1s ease-out forwards';
                    
                    setTimeout(() => {
                        alert('Login realizado com sucesso! (Demo)');
                        location.reload();
                    }, 1500);
                } else {
                    this.innerHTML = '<span>ACESSO NEGADO</span>';
                    this.style.background = 'linear-gradient(45deg, #ff4444, #cc0000)';
                    
                    // Efeito de erro
                    document.querySelector('.login-box').style.animation = 'shake 0.5s ease-in-out';
                    
                    setTimeout(() => {
                        this.innerHTML = '<span>ACESSAR SISTEMA</span>';
                        this.style.background = 'linear-gradient(45deg, #00d4ff, #0099cc)';
                        document.querySelector('.login-box').style.animation = '';
                    }, 2000);
                }
            }, 2000);
        });
    }
    
    // Adiciona animações CSS adicionais
    const additionalStyles = document.createElement('style');
    additionalStyles.textContent = `
        @keyframes fadeOut {
            to { opacity: 0; transform: scale(0.9); }
        }
        
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-10px); }
            75% { transform: translateX(10px); }
        }
        
        .login-box {
            transition: all 0.3s ease;
        }
    `;
    document.head.appendChild(additionalStyles);
});

