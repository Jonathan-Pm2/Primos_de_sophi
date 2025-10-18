// Aventura de los Primos de Sophie Germain - Lógica del Juego
// Basado en el descubrimiento de patrones en raíces digitales

class SophieGermainGame {
    constructor() {
        this.currentLevel = 1;
        this.maxLevel = 6;
        this.score = 0;
        this.achievements = [];
        this.gameState = {
            balls: 60,
            player: 'A',
            moves: [],
            correctValidations: 0,
            foundPrimes: 0
        };
        
        this.levels = [
            { id: 1, name: "Introducción a Raíces Digitales", type: "tutorial", unlocked: true },
            { id: 2, name: "Saco Digital Clásico", type: "classic_bag", unlocked: false, balls: 60 },
            { id: 3, name: "Patrón Sophie Germain", type: "sophie_pattern", unlocked: false, balls: 45 },
            { id: 4, name: "Validador Criptográfico", type: "crypto_validator", unlocked: false },
            { id: 5, name: "Generador Optimizado", type: "optimized_generator", unlocked: false },
            { id: 6, name: "Maestro de Patrones", type: "master_challenge", unlocked: false, balls: 81 }
        ];
        
        this.init();
    }
    
    init() {
        this.renderLevels();
        this.updateProgress();
        this.loadGameState();
    }
    
    digitalRoot(n) {
        if (n === 0) return 0;
        return 1 + (n - 1) % 9;
    }
    
    isPrime(n) {
        if (n < 2) return false;
        if (n === 2) return true;
        if (n % 2 === 0) return false;
        for (let i = 3; i <= Math.sqrt(n); i += 2) {
            if (n % i === 0) return false;
        }
        return true;
    }
    
    isSophieGermainPrime(p) {
        return this.isPrime(p) && this.isPrime(2 * p + 1);
    }
    
    renderLevels() {
        const selector = document.getElementById('levelSelector');
        selector.innerHTML = '';
        
        this.levels.forEach(level => {
            const btn = document.createElement('button');
            btn.className = 'level-btn';
            btn.innerHTML = `<div>Nivel ${level.id}</div><div style="font-size: 0.8em; margin-top: 5px;">${level.name}</div>`;
            
            if (level.unlocked) {
                if (level.id === this.currentLevel) {
                    btn.classList.add('current');
                } else {
                    btn.classList.add('unlocked');
                }
                btn.onclick = () => this.loadLevel(level.id);
            } else {
                btn.classList.add('locked');
                btn.innerHTML += '<div style="font-size: 0.7em;">🔒 Bloqueado</div>';
            }
            
            selector.appendChild(btn);
        });
    }
    
    loadLevel(levelId) {
        const level = this.levels.find(l => l.id === levelId);
        if (!level || !level.unlocked) return;
        
        this.currentLevel = levelId;
        this.gameState = {
            balls: level.balls || 60,
            player: 'A',
            moves: [],
            correctValidations: 0,
            foundPrimes: 0
        };
        
        document.getElementById('gameTitle').innerHTML = `🎮 ${level.name}`;
        this.renderGame(level);
        this.renderLevels();
    }
    
    renderGame(level) {
        switch (level.type) {
            case 'tutorial': this.renderTutorial(); break;
            case 'classic_bag': this.renderClassicBag(); break;
            case 'sophie_pattern': this.renderSophiePattern(); break;
            case 'crypto_validator': this.renderCryptoValidator(); break;
            case 'optimized_generator': this.renderOptimizedGenerator(); break;
            case 'master_challenge': this.renderMasterChallenge(); break;
        }
    }
    
    renderTutorial() {
        document.getElementById('gameArea').innerHTML = `
            <div class="hint-panel">
                <h3>🎓 Aprende sobre Raíces Digitales</h3>
                <p>La <strong>raíz digital</strong> se obtiene sumando dígitos repetidamente hasta obtener uno solo.</p>
                <p><strong>Ejemplos:</strong> 23 → 2+3 = 5 | 89 → 8+9 = 17 → 1+7 = 8</p>
            </div>
            
            <div class="controls">
                <h4>🧮 Calculadora de Raíz Digital</h4>
                <div class="input-group">
                    <input type="number" id="tutorialInput" placeholder="Número" min="1" max="9999">
                    <button class="btn btn-primary" onclick="game.calculateDigitalRoot()">Calcular</button>
                </div>
                <div id="tutorialResult" style="margin-top: 15px; font-size: 1.2em; font-weight: bold;"></div>
            </div>
            
            <div class="sophie-germain-info">
                <h4>🔍 Descubrimiento Clave</h4>
                <p>Los primos de Sophie Germain (excepto 3) tienen raíces digitales <strong>exclusivamente en {2, 5, 8}</strong>.</p>
                <p>Esto permite filtrar candidatos y acelerar la búsqueda en ~67%.</p>
            </div>
            
            <button class="btn btn-success" onclick="game.completeLevel(1)" style="margin-top: 20px;">
                ✅ Entendido, continuar
            </button>
        `;
    }
    
    renderClassicBag() {
        document.getElementById('gameArea').innerHTML = `
            <div class="hint-panel">
                <h3>🎯 Saco Digital Clásico</h3>
                <p>Retira 1-6 bolas por turno. Quien tome la última gana.</p>
                <p><strong>Restricción:</strong> Solo raíces digitales 1-6.</p>
            </div>
            
            <div class="digital-root-display">
                Bolas: ${this.gameState.balls} | Jugador: ${this.gameState.player}
            </div>
            
            <div class="balls-container" id="ballsContainer">
                ${this.renderBalls(this.levels[1].balls, this.gameState.balls)}
            </div>
            
            <div class="controls">
                <div class="input-group">
                    <label>Retirar (1-6):</label>
                    <input type="number" id="moveInput" min="1" max="6" value="1">
                    <button class="btn btn-primary" onclick="game.makeMove()">Retirar</button>
                </div>
                <button class="btn btn-warning" onclick="game.resetLevel()">🔄 Reiniciar</button>
            </div>
            
            <div id="moveHistory"><h4>📝 Movimientos</h4><div id="movesList"></div></div>
        `;
    }
    
    renderSophiePattern() {
        document.getElementById('gameArea').innerHTML = `
            <div class="hint-panel">
                <h3>🔢 Patrón de Sophie Germain</h3>
                <p>Solo raíces digitales {2, 5, 8}. El patrón descubierto.</p>
            </div>
            
            <div class="digital-root-display">
                Bolas: ${this.gameState.balls} | Jugador: ${this.gameState.player} | Válidas: {2, 5, 8}
            </div>
            
            <div class="balls-container" id="ballsContainer">${this.renderBalls(this.levels[2].balls, this.gameState.balls)}</div>
            
            <div class="controls">
                <div class="input-group">
                    <label>Cantidad:</label>
                    <input type="number" id="moveInput" min="1" max="20" value="2">
                    <button class="btn btn-primary" onclick="game.makeSophieMove()">Retirar</button>
                </div>
                <div><small>Válidos: 2, 5, 8, 11, 14, 17, 20...</small></div>
                <button class="btn btn-warning" onclick="game.resetLevel()">🔄 Reiniciar</button>
            </div>
            
            <div id="moveHistory"><h4>📝 Movimientos</h4><div id="movesList"></div></div>
        `;
    }
    
    renderCryptoValidator() {
        document.getElementById('gameArea').innerHTML = `
            <div class="hint-panel">
                <h3>🔐 Validador Criptográfico</h3>
                <p>Identifica primos de Sophie Germain usando el patrón de raíces digitales.</p>
            </div>
            
            <div class="controls">
                <div class="input-group">
                    <label>Número:</label>
                    <input type="number" id="primeInput" min="2" max="10000" value="23">
                    <button class="btn btn-primary" onclick="game.validatePrime()">Validar</button>
                </div>
                <button class="btn btn-success" onclick="game.generateRandomPrime()">🎲 Aleatorio</button>
            </div>
            
            <div id="validationResult" style="margin-top: 20px; padding: 20px; border-radius: 10px; display: none;"></div>
            
            <div class="sophie-germain-info">
                <h4>🎯 Desafío: Valida 5 números correctamente</h4>
                <p>Validaciones: <span id="correctValidations">0</span>/5</p>
            </div>
        `;
    }
    
    renderOptimizedGenerator() {
        document.getElementById('gameArea').innerHTML = `
            <div class="hint-panel">
                <h3>⚡ Generador Optimizado</h3>
                <p>Usa el filtro de raíz digital para encontrar primos eficientemente.</p>
            </div>
            
            <div class="controls">
                <div class="input-group">
                    <input type="number" id="rangeStart" min="10" max="1000" value="100" placeholder="Desde">
                    <input type="number" id="rangeEnd" min="50" max="2000" value="200" placeholder="Hasta">
                    <button class="btn btn-primary" onclick="game.generatePrimesOptimized()">🔍 Buscar</button>
                </div>
            </div>
            
            <div id="generatorResults" style="margin-top: 20px;"></div>
            
            <div class="sophie-germain-info">
                <h4>🎯 Encuentra 3 primos de Sophie Germain</h4>
                <p>Encontrados: <span id="foundPrimes">0</span>/3</p>
            </div>
        `;
    }
    
    renderMasterChallenge() {
        document.getElementById('gameArea').innerHTML = `
            <div class="hint-panel">
                <h3>🏆 Maestro de Patrones</h3>
                <p>Combina todos los conceptos aprendidos. ¡El desafío final!</p>
            </div>
            
            <div class="digital-root-display">
                Bolas: ${this.gameState.balls} | Jugador: ${this.gameState.player}
            </div>
            
            <div class="balls-container" id="ballsContainer">${this.renderBalls(this.levels[5].balls, this.gameState.balls)}</div>
            
            <div class="controls">
                <div class="input-group">
                    <label>Movimiento maestro:</label>
                    <input type="number" id="moveInput" min="1" max="30" value="2">
                    <button class="btn btn-primary" onclick="game.makeMasterMove()">Ejecutar</button>
                </div>
                <button class="btn btn-warning" onclick="game.resetLevel()">🔄 Reiniciar</button>
            </div>
            
            <div class="sophie-germain-info">
                <h4>🎯 Reglas Especiales</h4>
                <p>Solo números que sean primos de Sophie Germain O tengan raíz digital {2, 5, 8}</p>
            </div>
            
            <div id="moveHistory"><h4>📝 Movimientos</h4><div id="movesList"></div></div>
        `;
    }
    
    renderBalls(totalBalls, remainingBalls = null) {
        let html = '';
        const remaining = remainingBalls !== null ? remainingBalls : totalBalls;
        const removed = totalBalls - remaining;
        
        // Render all balls up to 50 (or total if less)
        for (let i = 1; i <= Math.min(totalBalls, 50); i++) {
            const isRemoved = i <= removed;
            const ballClass = isRemoved ? 'ball ball-removed' : 'ball ball-available';
            const ballContent = isRemoved ? '❌' : i;
            html += `<div class="${ballClass}" title="${isRemoved ? 'Retirada' : 'Disponible'}">${ballContent}</div>`;
        }
        
        // If more than 50 balls, show remaining count
        if (totalBalls > 50) {
            const extraRemaining = Math.max(0, remaining - 50);
            if (extraRemaining > 0) {
                html += `<div class="ball ball-extra">+${extraRemaining}</div>`;
            }
        }
        
        return html;
    }
    
    calculateDigitalRoot() {
        const input = document.getElementById('tutorialInput');
        const result = document.getElementById('tutorialResult');
        const num = parseInt(input.value);
        
        if (isNaN(num) || num < 1) {
            result.innerHTML = '❌ Número válido requerido';
            result.style.color = 'red';
            return;
        }
        
        const root = this.digitalRoot(num);
        const steps = this.getDigitalRootSteps(num);
        
        result.innerHTML = `
            <div style="color: green;">
                ✅ ${num} → ${steps} → <strong>Raíz: ${root}</strong>
            </div>
        `;
    }
    
    getDigitalRootSteps(n) {
        const steps = [n];
        while (n >= 10) {
            const digits = n.toString().split('').map(Number);
            n = digits.reduce((sum, digit) => sum + digit, 0);
            steps.push(n);
        }
        return steps.join(' → ');
    }
    
    makeMove() {
        const move = parseInt(document.getElementById('moveInput').value);
        if (isNaN(move) || move < 1 || move > 6) {
            this.showMessage('❌ Movimiento debe ser 1-6', 'error');
            return;
        }
        
        const root = this.digitalRoot(move);
        if (root > 6) {
            this.showMessage(`❌ Raíz digital ${root} > 6`, 'error');
            return;
        }
        
        if (move > this.gameState.balls) {
            this.showMessage('❌ No hay suficientes bolas', 'error');
            return;
        }
        
        this.executeMove(move, root);
    }
    
    makeSophieMove() {
        const move = parseInt(document.getElementById('moveInput').value);
        if (isNaN(move) || move < 1) {
            this.showMessage('❌ Movimiento inválido', 'error');
            return;
        }
        
        const root = this.digitalRoot(move);
        if (![2, 5, 8].includes(root)) {
            this.showMessage(`❌ Raíz ${root} no válida. Solo {2, 5, 8}`, 'error');
            return;
        }
        
        if (move > this.gameState.balls) {
            this.showMessage('❌ No hay suficientes bolas', 'error');
            return;
        }
        
        this.executeMove(move, root);
    }
    
    makeMasterMove() {
        const move = parseInt(document.getElementById('moveInput').value);
        if (isNaN(move) || move < 1) {
            this.showMessage('❌ Movimiento inválido', 'error');
            return;
        }
        
        const root = this.digitalRoot(move);
        const isSG = this.isSophieGermainPrime(move);
        const hasValidRoot = [2, 5, 8].includes(root);
        
        if (!isSG && !hasValidRoot) {
            this.showMessage(`❌ ${move} no es primo de Sophie Germain ni tiene raíz {2,5,8}`, 'error');
            return;
        }
        
        if (move > this.gameState.balls) {
            this.showMessage('❌ No hay suficientes bolas', 'error');
            return;
        }
        
        this.executeMove(move, root, isSG ? ' (Sophie Germain!)' : '');
    }
    
    executeMove(move, root, extra = '') {
        this.gameState.balls -= move;
        this.gameState.moves.push({
            player: this.gameState.player,
            move: move,
            root: root,
            remaining: this.gameState.balls
        });
        
        this.updateMoveHistory();
        
        // Check if game is over (no balls left or no valid moves)
        if (this.gameState.balls === 0) {
            this.showMessage(`🎉 ¡Jugador ${this.gameState.player} gana!${extra}`, 'success');
            this.completeLevel(this.currentLevel);
            return;
        }
        
        // Switch player
        this.gameState.player = this.gameState.player === 'A' ? 'B' : 'A';
        this.updateGameDisplay();
        
        // Check if current player has valid moves
        if (!this.hasValidMoves()) {
            // Current player loses because they can't move
            const winner = this.gameState.player === 'A' ? 'B' : 'A';
            this.showMessage(`🎉 ¡Jugador ${winner} gana! El jugador ${this.gameState.player} no tiene movimientos válidos.`, 'success');
            this.completeLevel(this.currentLevel);
            return;
        }
        
        if (this.gameState.player === 'B') {
            setTimeout(() => this.makeAIMove(), 1000);
        }
    }
    
    makeAIMove() {
        const validMoves = [];
        const maxMove = this.currentLevel === 2 ? 6 : 20;
        
        for (let i = 1; i <= Math.min(maxMove, this.gameState.balls); i++) {
            const root = this.digitalRoot(i);
            if (this.currentLevel === 2 && root <= 6) validMoves.push(i);
            else if (this.currentLevel === 3 && [2, 5, 8].includes(root)) validMoves.push(i);
            else if (this.currentLevel === 6 && ([2, 5, 8].includes(root) || this.isSophieGermainPrime(i))) validMoves.push(i);
        }
        
        if (validMoves.length > 0) {
            const move = validMoves[Math.floor(Math.random() * validMoves.length)];
            document.getElementById('moveInput').value = move;
            
            if (this.currentLevel === 2) this.makeMove();
            else if (this.currentLevel === 3) this.makeSophieMove();
            else if (this.currentLevel === 6) this.makeMasterMove();
        }
    }
    
    validatePrime() {
        const num = parseInt(document.getElementById('primeInput').value);
        const resultDiv = document.getElementById('validationResult');
        
        if (isNaN(num) || num < 2) {
            this.showMessage('❌ Número ≥ 2 requerido', 'error');
            return;
        }
        
        const isPrime = this.isPrime(num);
        const isSG = this.isSophieGermainPrime(num);
        const root = this.digitalRoot(num);
        const hasValidRoot = [2, 5, 8].includes(root) || num === 3;
        
        let resultClass = '';
        let resultText = '';
        
        if (isSG) {
            resultClass = 'sophie-germain-info';
            resultText = `
                <h4>✅ ¡Primo de Sophie Germain!</h4>
                <p><strong>${num}</strong> es primo y <strong>${2 * num + 1}</strong> también.</p>
                <p>Raíz digital: <strong>${root}</strong> ${hasValidRoot ? '✅' : '⚠️'}</p>
            `;
        } else if (isPrime) {
            resultClass = 'hint-panel';
            resultText = `
                <h4>⚠️ Primo Regular</h4>
                <p><strong>${num}</strong> es primo, pero <strong>${2 * num + 1}</strong> no.</p>
                <p>Raíz digital: <strong>${root}</strong></p>
            `;
        } else {
            resultClass = 'hint-panel';
            resultText = `
                <h4>❌ No es Primo</h4>
                <p><strong>${num}</strong> no es primo.</p>
                <p>Raíz digital: <strong>${root}</strong></p>
            `;
        }
        
        resultDiv.className = resultClass;
        resultDiv.innerHTML = resultText;
        resultDiv.style.display = 'block';
        
        this.gameState.correctValidations++;
        document.getElementById('correctValidations').textContent = this.gameState.correctValidations;
        
        if (this.gameState.correctValidations >= 5) {
            setTimeout(() => {
                this.showMessage('🎉 ¡Validador completado!', 'success');
                this.completeLevel(this.currentLevel);
            }, 1000);
        }
    }
    
    generateRandomPrime() {
        const primes = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97];
        document.getElementById('primeInput').value = primes[Math.floor(Math.random() * primes.length)];
    }
    
    generatePrimesOptimized() {
        const start = parseInt(document.getElementById('rangeStart').value);
        const end = parseInt(document.getElementById('rangeEnd').value);
        const resultsDiv = document.getElementById('generatorResults');
        
        if (isNaN(start) || isNaN(end) || start >= end) {
            this.showMessage('❌ Rango inválido', 'error');
            return;
        }
        
        const startTime = performance.now();
        const foundPrimes = [];
        let candidatesChecked = 0;
        let candidatesFiltered = 0;
        
        for (let n = start; n <= end; n++) {
            candidatesChecked++;
            const root = this.digitalRoot(n);
            
            if (![2, 5, 8].includes(root) && n !== 3) {
                candidatesFiltered++;
                continue;
            }
            
            if (this.isSophieGermainPrime(n)) {
                foundPrimes.push({ prime: n, safePrime: 2 * n + 1, root: root });
            }
        }
        
        const endTime = performance.now();
        const filterEfficiency = (candidatesFiltered / candidatesChecked * 100).toFixed(1);
        
        resultsDiv.innerHTML = `
            <div class="sophie-germain-info">
                <h4>🔍 Resultados de Búsqueda</h4>
                <p><strong>Rango:</strong> ${start} - ${end}</p>
                <p><strong>Tiempo:</strong> ${(endTime - startTime).toFixed(2)} ms</p>
                <p><strong>Candidatos evaluados:</strong> ${candidatesChecked}</p>
                <p><strong>Filtrados por raíz digital:</strong> ${candidatesFiltered} (${filterEfficiency}%)</p>
                <p><strong>Eficiencia del filtro:</strong> Evitó ~${filterEfficiency}% de tests de primalidad</p>
                
                <h5>🎯 Primos de Sophie Germain encontrados: ${foundPrimes.length}</h5>
                ${foundPrimes.length === 0 ? '<p style="color: #666;">Ninguno en este rango. Prueba con un rango más amplio.</p>' : ''}
                <div style="max-height: 200px; overflow-y: auto; border: 1px solid #ddd; border-radius: 5px; padding: 10px; margin: 10px 0;">
                    ${foundPrimes.map(p => `
                        <div style="margin: 3px 0; padding: 8px; background: rgba(76, 175, 80, 0.1); border-radius: 5px; border-left: 3px solid #4CAF50;">
                            <strong>p = ${p.prime}</strong> (raíz digital: ${p.root}) → <strong>2p+1 = ${p.safePrime}</strong>
                        </div>
                    `).join('')}
                </div>
                
                <div style="margin-top: 15px; padding: 10px; background: rgba(33, 150, 243, 0.1); border-radius: 5px;">
                    <p><strong>💡 Análisis:</strong></p>
                    <p>• El filtro de raíz digital eliminó ${candidatesFiltered} candidatos (${filterEfficiency}%)</p>
                    <p>• Esto representa una mejora de eficiencia significativa</p>
                    <p>• Solo se realizaron tests de primalidad en ${candidatesChecked - candidatesFiltered} números</p>
                </div>
                
                <div style="margin-top: 15px; text-align: center;">
                    <button class="btn btn-success" onclick="game.checkGeneratorCompletion(${foundPrimes.length})" style="margin-right: 10px;">
                        ✅ Analizar Resultados
                    </button>
                    <button class="btn btn-primary" onclick="game.clearResults()">
                        🔄 Nueva Búsqueda
                    </button>
                </div>
            </div>
        `;
        
        // Actualizar contador pero NO avanzar automáticamente
        this.gameState.foundPrimes += foundPrimes.length;
        document.getElementById('foundPrimes').textContent = this.gameState.foundPrimes;
    }
    
    checkGeneratorCompletion(newPrimesFound) {
        if (this.gameState.foundPrimes >= 3) {
            this.showMessage(`🎉 ¡Excelente! Has encontrado ${this.gameState.foundPrimes} primos de Sophie Germain usando el método optimizado. ¡Generador completado!`, 'success');
            setTimeout(() => {
                this.completeLevel(this.currentLevel);
            }, 2000);
        } else {
            const remaining = 3 - this.gameState.foundPrimes;
            this.showMessage(`📊 Resultados analizados. Necesitas encontrar ${remaining} primo(s) más para completar el nivel. Prueba con rangos diferentes.`, 'info');
        }
    }
    
    clearResults() {
        document.getElementById('generatorResults').innerHTML = '';
        this.showMessage('🔄 Listo para nueva búsqueda', 'info');
    }
    
    hasValidMoves() {
        // Check if current player has any valid moves available
        for (let move = 1; move <= this.gameState.balls; move++) {
            if (this.isValidMove(move)) {
                return true;
            }
        }
        return false;
    }
    
    isValidMove(move) {
        if (move > this.gameState.balls || move < 1) {
            return false;
        }
        
        const root = this.digitalRoot(move);
        
        // Check based on current level rules
        if (this.currentLevel === 2) {
            // Level 2: roots 1-6 allowed
            return [1, 2, 3, 4, 5, 6].includes(root);
        } else if (this.currentLevel === 3) {
            // Level 3: only roots {2, 5, 8} allowed
            return [2, 5, 8].includes(root);
        } else if (this.currentLevel === 6) {
            // Level 6: Sophie Germain primes OR roots {2, 5, 8}
            const isSG = this.isSophieGermainPrime(move);
            const hasValidRoot = [2, 5, 8].includes(root);
            return isSG || hasValidRoot;
        }
        
        return true; // Default case
    }
    
    updateMoveHistory() {
        const movesList = document.getElementById('movesList');
        if (!movesList) return;
        
        movesList.innerHTML = this.gameState.moves.map(move => `
            <div style="margin: 5px 0; padding: 5px; background: rgba(0,0,0,0.05); border-radius: 5px;">
                ${move.player}: ${move.move} (raíz: ${move.root}) → Quedan: ${move.remaining}
            </div>
        `).join('');
    }
    
    updateGameDisplay() {
        const ballsContainer = document.getElementById('ballsContainer');
        const digitalDisplay = document.getElementById('digitalDisplay');
        
        if (ballsContainer) {
            const totalBalls = this.levels[this.currentLevel - 1].balls;
            ballsContainer.innerHTML = this.renderBalls(totalBalls, this.gameState.balls);
        }
        
        if (digitalDisplay) {
            digitalDisplay.innerHTML = `Bolas: ${this.gameState.balls} | Jugador: ${this.gameState.player}`;
        }
    }
    
    showMessage(message, type) {
        const modal = document.getElementById('resultModal');
        const title = document.getElementById('resultTitle');
        const content = document.getElementById('resultContent');
        
        const icons = { success: '🎉', error: '❌', info: '💡', warning: '⚠️' };
        
        title.innerHTML = `${icons[type] || '📢'} ${type === 'success' ? '¡Éxito!' : type === 'error' ? 'Error' : 'Información'}`;
        content.innerHTML = `<p style="font-size: 1.2em; text-align: center;">${message}</p>`;
        modal.style.display = 'block';
    }
    
    completeLevel(levelId) {
        this.score += 100;
        
        // Desbloquear el siguiente nivel
        if (levelId < this.levels.length) {
            const nextLevel = this.levels.find(l => l.id === levelId + 1);
            if (nextLevel) {
                nextLevel.unlocked = true;
            }
        }
        
        // Mostrar mensaje de éxito y avanzar automáticamente
        setTimeout(() => {
            this.closeResultModal();
            if (levelId < this.levels.length) {
                this.loadLevel(levelId + 1);
            }
        }, 2000);
        
        this.updateProgress();
        this.renderLevels();
        this.saveGameState();
    }
    
    resetLevel() {
        this.loadLevel(this.currentLevel);
    }
    
    updateProgress() {
        const unlockedLevels = this.levels.filter(l => l.unlocked).length;
        const progress = (unlockedLevels / this.levels.length) * 100;
        
        document.getElementById('progressFill').style.width = `${progress}%`;
        document.getElementById('currentLevel').textContent = this.currentLevel;
        document.getElementById('totalLevels').textContent = this.levels.length;
        document.getElementById('score').textContent = this.score;
    }
    
    saveGameState() {
        const state = {
            currentLevel: this.currentLevel,
            score: this.score,
            unlockedLevels: this.levels.filter(l => l.unlocked).map(l => l.id)
        };
        localStorage.setItem('sophieGermainGame', JSON.stringify(state));
    }
    
    loadGameState() {
        const saved = localStorage.getItem('sophieGermainGame');
        if (saved) {
            const state = JSON.parse(saved);
            this.currentLevel = state.currentLevel || 1;
            this.score = state.score || 0;
            
            if (state.unlockedLevels) {
                state.unlockedLevels.forEach(levelId => {
                    const level = this.levels.find(l => l.id === levelId);
                    if (level) level.unlocked = true;
                });
            }
        }
    }
}

// Funciones globales para el HTML
function closeModal() {
    document.getElementById('instructionsModal').style.display = 'none';
}

function closeResultModal() {
    document.getElementById('resultModal').style.display = 'none';
}

// Añadir método closeResultModal a la clase también
SophieGermainGame.prototype.closeResultModal = function() {
    document.getElementById('resultModal').style.display = 'none';
};

// Inicializar el juego cuando se carga la página
let game;
window.onload = function() {
    game = new SophieGermainGame();
};

// Cerrar modales al hacer clic fuera
window.onclick = function(event) {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
};
