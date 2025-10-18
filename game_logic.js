// Aventura de los Primos de Sophie Germain - Lógica del Juego
// Basado en el descubrimiento de patrones en raíces digitales

// Sistema de Traducción Multiidioma
const translations = {
    es: {
        title: "🔢 Aventura de los Primos de Sophie Germain",
        subtitle: "Descubre los secretos de las raíces digitales y los patrones matemáticos a través de juegos interactivos. Basado en el descubrimiento de que todos los primos de Sophie Germain tienen raíces digitales en {2, 5, 8}.",
        levels: "🎯 Niveles de Juego",
        progress: "📊 Tu Progreso",
        currentLevel: "Nivel actual",
        of: "de",
        score: "Puntuación",
        achievements: "🏆 Logros Desbloqueados",
        selectLevel: "🎮 Selecciona un Nivel",
        selectLevelDesc: "Elige un nivel para comenzar tu aventura matemática.",
        locked: "🔒 Bloqueado",
        sophieInfo: "🔍 ¿Qué son los Primos de Sophie Germain?",
        sophieDesc1: "Un primo p es un <strong>primo de Sophie Germain</strong> si 2p+1 también es primo. Por ejemplo: 2, 5, 11, 23, 29...",
        sophieDesc2: "<strong>Descubrimiento:</strong> Todos estos primos (excepto 3) tienen raíces digitales exclusivamente en {2, 5, 8}.",
        sophieDesc3: "<strong>Raíz Digital:</strong> Suma repetida de dígitos hasta obtener un solo dígito. Ejemplo: 23 → 2+3 = 5",
        levelNames: [
            "Introducción a Raíces Digitales",
            "Saco Digital Clásico",
            "Patrón Sophie Germain",
            "Validador Criptográfico",
            "Generador Optimizado",
            "Maestro de Patrones"
        ],
        help: "Ayuda",
        instructions: "Instrucciones",
        hints: "Pistas",
        close: "Cerrar",
        levelInstructions: [
            {
                title: "Cómo calcular raíces digitales",
                steps: [
                    "<strong>Paso 1:</strong> Ingresa cualquier número en el campo de texto",
                    "<strong>Paso 2:</strong> Haz clic en 'Calcular' para ver su raíz digital",
                    "<strong>Ejemplo:</strong> 23 → 2+3 = 5 (raíz digital es 5)",
                    "<strong>Objetivo:</strong> Entender el concepto antes de avanzar"
                ],
                hints: [
                    "💡 La raíz digital siempre es un número del 1 al 9",
                    "💡 Prueba con números grandes como 999 o 1234",
                    "💡 Los primos de Sophie Germain tienen raíces en {2, 5, 8}"
                ]
            },
            {
                title: "Cómo jugar el Saco Digital",
                steps: [
                    "<strong>Objetivo:</strong> Tomar la última bola para ganar",
                    "<strong>Tu turno:</strong> Retira cualquier cantidad de bolas",
                    "<strong>Restricción:</strong> El número debe tener raíz digital 1-6",
                    "<strong>Ejemplos válidos:</strong> 1, 6, 10 (1+0=1), 15 (1+5=6), 24 (2+4=6)"
                ],
                hints: [
                    "💡 Puedes retirar más de 6 bolas si la raíz digital es válida",
                    "💡 Intenta dejar múltiplos de 7 bolas al oponente",
                    "💡 Planifica varios movimientos por adelantado"
                ]
            },
            {
                title: "Desafío de Primos Sophie Germain",
                steps: [
                    "<strong>Regla:</strong> Solo puedes retirar PRIMOS DE SOPHIE GERMAIN",
                    "<strong>Victoria:</strong> Gana quien deja al oponente SIN movimientos válidos",
                    "<strong>Ejemplos válidos:</strong> 2, 5, 11, 23, 29, 41 (2×2+1=5, 2×5+1=11...)",
                    "<strong>Estrategia:</strong> Deja al oponente con 0 bolas o sin primos SG disponibles"
                ],
                hints: [
                    "💡 Los primos SG hasta 46: 2, 5, 11, 23, 29, 41",
                    "💡 Si dejas 1, 3, 4, 6-10, 12-22, 24-28, 30-40, 42-46 bolas, el oponente no puede moverse",
                    "💡 Planifica para dejar números sin primos SG disponibles"
                ]
            },
            {
                title: "Validador de Primos",
                steps: [
                    "<strong>Objetivo:</strong> Validar 5 números correctamente",
                    "<strong>Ingresa un número:</strong> Cualquier entero ≥ 2",
                    "<strong>El sistema verifica:</strong> Si es primo de Sophie Germain",
                    "<strong>Aprende:</strong> Observa el patrón de raíces digitales"
                ],
                hints: [
                    "💡 Usa el botón 'Aleatorio' para probar rápidamente",
                    "💡 Primos de Sophie Germain: 2, 5, 11, 23, 29, 41...",
                    "💡 Nota que casi todos tienen raíces {2, 5, 8}"
                ]
            },
            {
                title: "Generador Optimizado",
                steps: [
                    "<strong>Objetivo:</strong> Encontrar 3 primos de Sophie Germain",
                    "<strong>Define un rango:</strong> Por ejemplo, 100 a 200",
                    "<strong>Haz clic en Buscar:</strong> El algoritmo usa el filtro de raíces",
                    "<strong>Analiza resultados:</strong> Observa la eficiencia del método"
                ],
                hints: [
                    "💡 Rangos más amplios = más primos encontrados",
                    "💡 El filtro elimina ~67% de candidatos",
                    "💡 Prueba rangos como 10-100, 100-300, 500-700"
                ]
            },
            {
                title: "Desafío Maestro",
                steps: [
                    "<strong>Regla:</strong> Solo primos de Sophie Germain que ADEMÁS tengan raíz digital {2, 5, 8}",
                    "<strong>Válidos:</strong> 2, 5, 11, 23, 29, 83... (primo SG Y raíz {2,5,8})",
                    "<strong>Inválidos:</strong> 41 (primo SG pero raíz 5... espera, 4+1=5, sí es válido!)",
                    "<strong>Victoria:</strong> Toma la última bola para ganar"
                ],
                hints: [
                    "💡 Todos los primos SG tienen raíz {2,5,8}, así que todos son válidos",
                    "💡 Este nivel demuestra el patrón descubierto: SG → {2,5,8}",
                    "💡 Es como el nivel 3, pero con la restricción adicional de raíces"
                ]
            }
        ]
    },
    en: {
        title: "🔢 Sophie Germain Primes Adventure",
        subtitle: "Discover the secrets of digital roots and mathematical patterns through interactive games. Based on the discovery that all Sophie Germain primes have digital roots in {2, 5, 8}.",
        levels: "🎯 Game Levels",
        progress: "📊 Your Progress",
        currentLevel: "Current level",
        of: "of",
        score: "Score",
        achievements: "🏆 Unlocked Achievements",
        selectLevel: "🎮 Select a Level",
        selectLevelDesc: "Choose a level to begin your mathematical adventure.",
        locked: "🔒 Locked",
        sophieInfo: "🔍 What are Sophie Germain Primes?",
        sophieDesc1: "A prime p is a <strong>Sophie Germain prime</strong> if 2p+1 is also prime. For example: 2, 5, 11, 23, 29...",
        sophieDesc2: "<strong>Discovery:</strong> All these primes (except 3) have digital roots exclusively in {2, 5, 8}.",
        sophieDesc3: "<strong>Digital Root:</strong> Repeated sum of digits until obtaining a single digit. Example: 23 → 2+3 = 5",
        levelNames: [
            "Introduction to Digital Roots",
            "Classic Digital Bag",
            "Sophie Germain Pattern",
            "Cryptographic Validator",
            "Optimized Generator",
            "Pattern Master"
        ],
        help: "Help",
        instructions: "Instructions",
        hints: "Hints",
        close: "Close",
        levelInstructions: [
            {
                title: "How to calculate digital roots",
                steps: [
                    "<strong>Step 1:</strong> Enter any number in the text field",
                    "<strong>Step 2:</strong> Click 'Calculate' to see its digital root",
                    "<strong>Example:</strong> 23 → 2+3 = 5 (digital root is 5)",
                    "<strong>Goal:</strong> Understand the concept before advancing"
                ],
                hints: [
                    "💡 Digital root is always a number from 1 to 9",
                    "💡 Try large numbers like 999 or 1234",
                    "💡 Sophie Germain primes have roots in {2, 5, 8}"
                ]
            },
            {
                title: "How to play Digital Bag",
                steps: [
                    "<strong>Goal:</strong> Take the last ball to win",
                    "<strong>Your turn:</strong> Remove any amount of balls",
                    "<strong>Restriction:</strong> The number must have digital root 1-6",
                    "<strong>Valid examples:</strong> 1, 6, 10 (1+0=1), 15 (1+5=6), 24 (2+4=6)"
                ],
                hints: [
                    "💡 You can remove more than 6 balls if the digital root is valid",
                    "💡 Try to leave multiples of 7 balls for opponent",
                    "💡 Plan several moves ahead"
                ]
            },
            {
                title: "Sophie Germain Primes Challenge",
                steps: [
                    "<strong>Rule:</strong> You can only remove SOPHIE GERMAIN PRIMES",
                    "<strong>Victory:</strong> Win by leaving opponent WITHOUT valid moves",
                    "<strong>Valid examples:</strong> 2, 5, 11, 23, 29, 41 (2×2+1=5, 2×5+1=11...)",
                    "<strong>Strategy:</strong> Leave opponent with 0 balls or no SG primes available"
                ],
                hints: [
                    "💡 SG primes up to 46: 2, 5, 11, 23, 29, 41",
                    "💡 If you leave 1, 3, 4, 6-10, 12-22, 24-28, 30-40, 42-46 balls, opponent can't move",
                    "💡 Plan to leave numbers with no available SG primes"
                ]
            },
            {
                title: "Prime Validator",
                steps: [
                    "<strong>Goal:</strong> Validate 5 numbers correctly",
                    "<strong>Enter a number:</strong> Any integer ≥ 2",
                    "<strong>System checks:</strong> If it's a Sophie Germain prime",
                    "<strong>Learn:</strong> Observe the digital root pattern"
                ],
                hints: [
                    "💡 Use 'Random' button to test quickly",
                    "💡 Sophie Germain primes: 2, 5, 11, 23, 29, 41...",
                    "💡 Notice almost all have roots {2, 5, 8}"
                ]
            },
            {
                title: "Optimized Generator",
                steps: [
                    "<strong>Goal:</strong> Find 3 Sophie Germain primes",
                    "<strong>Define a range:</strong> For example, 100 to 200",
                    "<strong>Click Search:</strong> Algorithm uses root filter",
                    "<strong>Analyze results:</strong> Observe method efficiency"
                ],
                hints: [
                    "💡 Wider ranges = more primes found",
                    "💡 Filter eliminates ~67% of candidates",
                    "💡 Try ranges like 10-100, 100-300, 500-700"
                ]
            },
            {
                title: "Master Challenge",
                steps: [
                    "<strong>Rule:</strong> Only Sophie Germain primes that ALSO have digital root {2, 5, 8}",
                    "<strong>Valid:</strong> 2, 5, 11, 23, 29, 83... (SG prime AND root {2,5,8})",
                    "<strong>Invalid:</strong> 41 (SG prime but root 5... wait, 4+1=5, it's valid!)",
                    "<strong>Victory:</strong> Take the last ball to win"
                ],
                hints: [
                    "💡 All SG primes have root {2,5,8}, so all are valid",
                    "💡 This level proves the discovered pattern: SG → {2,5,8}",
                    "💡 It's like level 3, but with the additional root restriction"
                ]
            }
        ]
    },
    fr: {
        title: "🔢 Aventure des Nombres Premiers de Sophie Germain",
        subtitle: "Découvrez les secrets des racines numériques et des motifs mathématiques à travers des jeux interactifs. Basé sur la découverte que tous les nombres premiers de Sophie Germain ont des racines numériques dans {2, 5, 8}.",
        levels: "🎯 Niveaux de Jeu",
        progress: "📊 Votre Progrès",
        currentLevel: "Niveau actuel",
        of: "de",
        score: "Score",
        achievements: "🏆 Succès Débloqués",
        selectLevel: "🎮 Sélectionnez un Niveau",
        selectLevelDesc: "Choisissez un niveau pour commencer votre aventure mathématique.",
        locked: "🔒 Verrouillé",
        sophieInfo: "🔍 Qu'est-ce que les Nombres Premiers de Sophie Germain?",
        sophieDesc1: "Un nombre premier p est un <strong>nombre premier de Sophie Germain</strong> si 2p+1 est également premier. Par exemple: 2, 5, 11, 23, 29...",
        sophieDesc2: "<strong>Découverte:</strong> Tous ces nombres premiers (sauf 3) ont des racines numériques exclusivement dans {2, 5, 8}.",
        sophieDesc3: "<strong>Racine Numérique:</strong> Somme répétée des chiffres jusqu'à obtenir un seul chiffre. Exemple: 23 → 2+3 = 5",
        levelNames: [
            "Introduction aux Racines Numériques",
            "Sac Numérique Classique",
            "Motif Sophie Germain",
            "Validateur Cryptographique",
            "Générateur Optimisé",
            "Maître des Motifs"
        ],
        help: "Aide",
        instructions: "Instructions",
        hints: "Astuces",
        close: "Fermer",
        levelInstructions: [
            {
                title: "Comment calculer les racines numériques",
                steps: [
                    "<strong>Étape 1:</strong> Entrez un nombre dans le champ de texte",
                    "<strong>Étape 2:</strong> Cliquez sur 'Calculer' pour voir sa racine numérique",
                    "<strong>Exemple:</strong> 23 → 2+3 = 5 (racine numérique est 5)",
                    "<strong>Objectif:</strong> Comprendre le concept avant d'avancer"
                ],
                hints: [
                    "💡 La racine numérique est toujours un nombre de 1 à 9",
                    "💡 Essayez de grands nombres comme 999 ou 1234",
                    "💡 Les nombres premiers de Sophie Germain ont des racines dans {2, 5, 8}"
                ]
            },
            {
                title: "Comment jouer au Sac Numérique",
                steps: [
                    "<strong>Objectif:</strong> Prendre la dernière boule pour gagner",
                    "<strong>Votre tour:</strong> Retirez n'importe quelle quantité de boules",
                    "<strong>Restriction:</strong> Le nombre doit avoir une racine numérique 1-6",
                    "<strong>Exemples valides:</strong> 1, 6, 10 (1+0=1), 15 (1+5=6), 24 (2+4=6)"
                ],
                hints: [
                    "💡 Vous pouvez retirer plus de 6 boules si la racine numérique est valide",
                    "💡 Essayez de laisser des multiples de 7 boules à l'adversaire",
                    "💡 Planifiez plusieurs coups à l'avance"
                ]
            },
            {
                title: "Défi des Nombres Premiers Sophie Germain",
                steps: [
                    "<strong>Règle:</strong> Vous ne pouvez retirer que des NOMBRES PREMIERS DE SOPHIE GERMAIN",
                    "<strong>Victoire:</strong> Gagnez en laissant l'adversaire SANS coups valides",
                    "<strong>Exemples valides:</strong> 2, 5, 11, 23, 29, 41 (2×2+1=5, 2×5+1=11...)",
                    "<strong>Stratégie:</strong> Laissez l'adversaire avec 0 boules ou sans nombres premiers SG disponibles"
                ],
                hints: [
                    "💡 Nombres premiers SG jusqu'à 46: 2, 5, 11, 23, 29, 41",
                    "💡 Si vous laissez 1, 3, 4, 6-10, 12-22, 24-28, 30-40, 42-46 boules, l'adversaire ne peut pas bouger",
                    "💡 Planifiez pour laisser des nombres sans nombres premiers SG disponibles"
                ]
            },
            {
                title: "Validateur de Nombres Premiers",
                steps: [
                    "<strong>Objectif:</strong> Valider 5 nombres correctement",
                    "<strong>Entrez un nombre:</strong> N'importe quel entier ≥ 2",
                    "<strong>Le système vérifie:</strong> S'il s'agit d'un nombre premier de Sophie Germain",
                    "<strong>Apprenez:</strong> Observez le motif de racine numérique"
                ],
                hints: [
                    "💡 Utilisez le bouton 'Aléatoire' pour tester rapidement",
                    "💡 Nombres premiers de Sophie Germain: 2, 5, 11, 23, 29, 41...",
                    "💡 Remarquez que presque tous ont des racines {2, 5, 8}"
                ]
            },
            {
                title: "Générateur Optimisé",
                steps: [
                    "<strong>Objectif:</strong> Trouver 3 nombres premiers de Sophie Germain",
                    "<strong>Définissez une plage:</strong> Par exemple, 100 à 200",
                    "<strong>Cliquez sur Rechercher:</strong> L'algorithme utilise le filtre de racines",
                    "<strong>Analysez les résultats:</strong> Observez l'efficacité de la méthode"
                ],
                hints: [
                    "💡 Plages plus larges = plus de nombres premiers trouvés",
                    "💡 Le filtre élimine ~67% des candidats",
                    "💡 Essayez des plages comme 10-100, 100-300, 500-700"
                ]
            },
            {
                title: "Défi Maître",
                steps: [
                    "<strong>Règle:</strong> Seulement nombres premiers de Sophie Germain qui ont AUSSI racine numérique {2, 5, 8}",
                    "<strong>Valides:</strong> 2, 5, 11, 23, 29, 83... (nombre premier SG ET racine {2,5,8})",
                    "<strong>Invalides:</strong> 41 (nombre premier SG mais racine 5... attendez, 4+1=5, c'est valide!)",
                    "<strong>Victoire:</strong> Prenez la dernière boule pour gagner"
                ],
                hints: [
                    "💡 Tous les nombres premiers SG ont racine {2,5,8}, donc tous sont valides",
                    "💡 Ce niveau prouve le motif découvert: SG → {2,5,8}",
                    "💡 C'est comme le niveau 3, mais avec la restriction de racine supplémentaire"
                ]
            }
        ]
    }
};

class SophieGermainGame {
    constructor() {
        this.currentLevel = 1;
        this.maxLevel = 6;
        this.score = 0;
        this.achievements = [];
        this.currentLang = localStorage.getItem('gameLang') || 'es';
        this.gameState = {
            balls: 60,
            player: 'A',
            moves: [],
            correctValidations: 0,
            foundPrimes: 0,
            levelCompleted: false
        };
        
        this.levels = [
            { id: 1, type: "tutorial", unlocked: true, completed: false },
            { id: 2, type: "classic_bag", unlocked: false, completed: false, balls: 60 },
            { id: 3, type: "sophie_pattern", unlocked: false, completed: false, balls: 46 },
            { id: 4, type: "crypto_validator", unlocked: false, completed: false },
            { id: 5, type: "optimized_generator", unlocked: false, completed: false },
            { id: 6, type: "master_challenge", unlocked: false, completed: false, balls: 81 }
        ];
        
        this.init();
    }
    
    t(key) {
        const keys = key.split('.');
        let value = translations[this.currentLang];
        for (const k of keys) {
            value = value[k];
            if (value === undefined) return key;
        }
        return value;
    }
    
    changeLanguage(lang) {
        if (translations[lang]) {
            this.currentLang = lang;
            localStorage.setItem('gameLang', lang);
            this.updateLanguageButtons();
            this.updateAllText();
            this.renderLevels();
            const currentLevelObj = this.levels.find(l => l.id === this.currentLevel);
            if (currentLevelObj) {
                this.renderGame(currentLevelObj);
            }
        }
    }
    
    updateLanguageButtons() {
        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        const activeBtn = document.getElementById(`lang-${this.currentLang}`);
        if (activeBtn) {
            activeBtn.classList.add('active');
        }
    }
    
    updateAllText() {
        document.querySelector('.header h1').innerHTML = this.t('title');
        document.querySelector('.header p').innerHTML = this.t('subtitle');
        document.querySelector('.level-panel h2').innerHTML = this.t('levels');
        document.querySelector('.status-panel h3').innerHTML = this.t('progress');
        document.getElementById('gameTitle').innerHTML = this.t('selectLevel');
        
        const helpButton = document.getElementById('helpButton');
        if (helpButton) {
            helpButton.title = this.t('help');
        }
        
        const sophieInfo = document.querySelector('.sophie-germain-info');
        if (sophieInfo) {
            sophieInfo.innerHTML = `
                <h3>${this.t('sophieInfo')}</h3>
                <p>${this.t('sophieDesc1')}</p>
                <p>${this.t('sophieDesc2')}</p>
                <p>${this.t('sophieDesc3')}</p>
            `;
        }
    }
    
    init() {
        this.updateLanguageButtons();
        this.updateAllText();
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
        // El 3 se excluye por convención, aunque técnicamente 2*3+1=7 es primo
        if (p === 3) return false;
        return this.isPrime(p) && this.isPrime(2 * p + 1);
    }
    
    renderLevels() {
        const selector = document.getElementById('levelSelector');
        selector.innerHTML = '';
        
        this.levels.forEach((level, index) => {
            const btn = document.createElement('button');
            btn.className = 'level-btn';
            const levelName = this.t('levelNames')[index];
            btn.innerHTML = `<div>${this.t('currentLevel').split(' ')[0]} ${level.id}</div><div style="font-size: 0.8em; margin-top: 5px;">${levelName}</div>`;
            
            if (level.unlocked) {
                if (level.id === this.currentLevel) {
                    btn.classList.add('current');
                } else {
                    btn.classList.add('unlocked');
                }
                if (level.completed) {
                    btn.innerHTML += '<div style="font-size: 0.7em;">✅</div>';
                }
                btn.onclick = () => this.loadLevel(level.id);
            } else {
                btn.classList.add('locked');
                btn.innerHTML += `<div style="font-size: 0.7em;">${this.t('locked')}</div>`;
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
            foundPrimes: 0,
            levelCompleted: false
        };
        
        const levelName = this.t('levelNames')[levelId - 1];
        document.getElementById('gameTitle').innerHTML = `🎮 ${levelName}`;
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
        const t = {
            title: this.currentLang === 'es' ? '🎓 Aprende sobre Raíces Digitales' : this.currentLang === 'en' ? '🎓 Learn about Digital Roots' : '🎓 Apprenez sur les Racines Numériques',
            desc: this.currentLang === 'es' ? 'La <strong>raíz digital</strong> se obtiene sumando dígitos repetidamente hasta obtener uno solo.' : this.currentLang === 'en' ? 'The <strong>digital root</strong> is obtained by repeatedly summing digits until obtaining a single one.' : 'La <strong>racine numérique</strong> s\'obtient en additionnant les chiffres de manière répétée jusqu\'\u00e0 obtenir un seul.',
            examples: this.currentLang === 'es' ? '<strong>Ejemplos:</strong> 23 → 2+3 = 5 | 89 → 8+9 = 17 → 1+7 = 8' : this.currentLang === 'en' ? '<strong>Examples:</strong> 23 → 2+3 = 5 | 89 → 8+9 = 17 → 1+7 = 8' : '<strong>Exemples:</strong> 23 → 2+3 = 5 | 89 → 8+9 = 17 → 1+7 = 8',
            calculator: this.currentLang === 'es' ? '🧮 Calculadora de Raíz Digital' : this.currentLang === 'en' ? '🧮 Digital Root Calculator' : '🧮 Calculatrice de Racine Numérique',
            number: this.currentLang === 'es' ? 'Número' : this.currentLang === 'en' ? 'Number' : 'Nombre',
            calculate: this.currentLang === 'es' ? 'Calcular' : this.currentLang === 'en' ? 'Calculate' : 'Calculer',
            discovery: this.currentLang === 'es' ? '🔍 Descubrimiento Clave' : this.currentLang === 'en' ? '🔍 Key Discovery' : '🔍 Découverte Clé',
            discoveryDesc: this.currentLang === 'es' ? 'Los primos de Sophie Germain (excepto 3) tienen raíces digitales <strong>exclusivamente en {2, 5, 8}</strong>.' : this.currentLang === 'en' ? 'Sophie Germain primes (except 3) have digital roots <strong>exclusively in {2, 5, 8}</strong>.' : 'Les nombres premiers de Sophie Germain (sauf 3) ont des racines numériques <strong>exclusivement dans {2, 5, 8}</strong>.',
            efficiency: this.currentLang === 'es' ? 'Esto permite filtrar candidatos y acelerar la búsqueda en ~67%.' : this.currentLang === 'en' ? 'This allows filtering candidates and speeding up the search by ~67%.' : 'Cela permet de filtrer les candidats et d\'accélérer la recherche d\'environ 67%.',
            understood: this.currentLang === 'es' ? '✅ Entendido, continuar' : this.currentLang === 'en' ? '✅ Understood, continue' : '✅ Compris, continuer'
        };
        
        document.getElementById('gameArea').innerHTML = `
            <div class="hint-panel">
                <h3>${t.title}</h3>
                <p>${t.desc}</p>
                <p>${t.examples}</p>
            </div>
            
            <div class="controls">
                <h4>${t.calculator}</h4>
                <div class="input-group">
                    <input type="number" id="tutorialInput" placeholder="${t.number}" min="1" max="9999">
                    <button class="btn btn-primary" onclick="game.calculateDigitalRoot()">${t.calculate}</button>
                </div>
                <div id="tutorialResult" style="margin-top: 15px; font-size: 1.2em; font-weight: bold;"></div>
            </div>
            
            <div class="sophie-germain-info">
                <h4>${t.discovery}</h4>
                <p>${t.discoveryDesc}</p>
                <p>${t.efficiency}</p>
            </div>
            
            <button class="btn btn-success" onclick="game.completeLevel(1)" style="margin-top: 20px;">
                ${t.understood}
            </button>
        `;
    }
    
    renderClassicBag() {
        const t = {
            title: this.currentLang === 'es' ? '🎯 Saco Digital Clásico' : this.currentLang === 'en' ? '🎯 Classic Digital Bag' : '🎯 Sac Numérique Classique',
            desc: this.currentLang === 'es' ? 'Retira bolas por turno. Quien tome la última gana.' : this.currentLang === 'en' ? 'Remove balls per turn. Whoever takes the last one wins.' : 'Retirez des boules par tour. Celui qui prend la dernière gagne.',
            restriction: this.currentLang === 'es' ? '<strong>Restricción:</strong> Solo números con raíz digital 1-6 (ej: 1, 6, 10, 15, 24...)' : this.currentLang === 'en' ? '<strong>Restriction:</strong> Only numbers with digital root 1-6 (e.g: 1, 6, 10, 15, 24...)' : '<strong>Restriction:</strong> Seulement nombres avec racine numérique 1-6 (ex: 1, 6, 10, 15, 24...)',
            balls: this.currentLang === 'es' ? 'Bolas' : this.currentLang === 'en' ? 'Balls' : 'Boules',
            player: this.currentLang === 'es' ? 'Jugador' : this.currentLang === 'en' ? 'Player' : 'Joueur',
            removeLabel: this.currentLang === 'es' ? 'Cantidad:' : this.currentLang === 'en' ? 'Amount:' : 'Quantité:',
            remove: this.currentLang === 'es' ? 'Retirar' : this.currentLang === 'en' ? 'Remove' : 'Retirer',
            reset: this.currentLang === 'es' ? '🔄 Reiniciar' : this.currentLang === 'en' ? '🔄 Reset' : '🔄 Réinitialiser',
            moves: this.currentLang === 'es' ? '📝 Movimientos' : this.currentLang === 'en' ? '📝 Moves' : '📝 Mouvements'
        };
        
        document.getElementById('gameArea').innerHTML = `
            <div class="hint-panel">
                <h3>${t.title}</h3>
                <p>${t.desc}</p>
                <p>${t.restriction}</p>
            </div>
            
            <div class="digital-root-display">
                ${t.balls}: ${this.gameState.balls} | ${t.player}: ${this.gameState.player}
            </div>
            
            <div class="balls-container" id="ballsContainer">
                ${this.renderBalls(this.levels[1].balls, this.gameState.balls)}
            </div>
            
            <div class="controls">
                <div class="input-group">
                    <label>${t.removeLabel}</label>
                    <input type="number" id="moveInput" min="1" max="${this.gameState.balls}" value="1">
                    <button class="btn btn-primary" onclick="game.makeMove()">${t.remove}</button>
                </div>
                <button class="btn btn-warning" onclick="game.resetLevel()">${t.reset}</button>
            </div>
            
            <div id="moveHistory"><h4>${t.moves}</h4><div id="movesList"></div></div>
        `;
    }
    
    renderSophiePattern() {
        const t = {
            title: this.currentLang === 'es' ? '🔢 Desafío de Primos Sophie Germain' : this.currentLang === 'en' ? '🔢 Sophie Germain Primes Challenge' : '🔢 Défi des Nombres Premiers Sophie Germain',
            desc: this.currentLang === 'es' ? 'Solo puedes retirar números que sean PRIMOS DE SOPHIE GERMAIN.' : this.currentLang === 'en' ? 'You can only remove numbers that are SOPHIE GERMAIN PRIMES.' : 'Vous ne pouvez retirer que des NOMBRES PREMIERS DE SOPHIE GERMAIN.',
            explanation: this.currentLang === 'es' ? 'Gana quien deja al oponente sin movimientos válidos (0 bolas o sin primos SG disponibles).' : this.currentLang === 'en' ? 'Win by leaving opponent with no valid moves (0 balls or no SG primes available).' : 'Gagnez en laissant l\'adversaire sans coups valides (0 boules ou pas de nombres premiers SG disponibles).',
            balls: this.currentLang === 'es' ? 'Bolas' : this.currentLang === 'en' ? 'Balls' : 'Boules',
            player: this.currentLang === 'es' ? 'Jugador' : this.currentLang === 'en' ? 'Player' : 'Joueur',
            quantity: this.currentLang === 'es' ? 'Cantidad' : this.currentLang === 'en' ? 'Quantity' : 'Quantité',
            remove: this.currentLang === 'es' ? 'Retirar' : this.currentLang === 'en' ? 'Remove' : 'Retirer',
            validNumbers: this.currentLang === 'es' ? 'Primos SG válidos: 2, 5, 11, 23, 29, 41...' : this.currentLang === 'en' ? 'Valid SG primes: 2, 5, 11, 23, 29, 41...' : 'Nombres premiers SG valides: 2, 5, 11, 23, 29, 41...',
            reset: this.currentLang === 'es' ? '🔄 Reiniciar' : this.currentLang === 'en' ? '🔄 Reset' : '🔄 Réinitialiser',
            moves: this.currentLang === 'es' ? '📝 Movimientos' : this.currentLang === 'en' ? '📝 Moves' : '📝 Mouvements'
        };
        
        document.getElementById('gameArea').innerHTML = `
            <div class="hint-panel">
                <h3>${t.title}</h3>
                <p>${t.desc}</p>
                <p><strong>${t.explanation}</strong></p>
            </div>
            
            <div class="digital-root-display">
                ${t.balls}: ${this.gameState.balls} | ${t.player}: ${this.gameState.player}
            </div>
            
            <div class="balls-container" id="ballsContainer">${this.renderBalls(this.levels[2].balls, this.gameState.balls)}</div>
            
            <div class="controls">
                <div class="input-group">
                    <label>${t.quantity}:</label>
                    <input type="number" id="moveInput" min="1" max="${this.gameState.balls}" value="2">
                    <button class="btn btn-primary" onclick="game.makeSophieMove()">${t.remove}</button>
                </div>
                <div><small>${t.validNumbers}</small></div>
                <button class="btn btn-warning" onclick="game.resetLevel()">${t.reset}</button>
            </div>
            
            <div id="moveHistory"><h4>${t.moves}</h4><div id="movesList"></div></div>
        `;
    }
    
    renderCryptoValidator() {
        const t = {
            title: this.currentLang === 'es' ? '🔐 Validador Criptográfico' : this.currentLang === 'en' ? '🔐 Cryptographic Validator' : '🔐 Validateur Cryptographique',
            desc: this.currentLang === 'es' ? 'Identifica primos de Sophie Germain usando el patrón de raíces digitales.' : this.currentLang === 'en' ? 'Identify Sophie Germain primes using the digital root pattern.' : 'Identifiez les nombres premiers de Sophie Germain en utilisant le motif de racine numérique.',
            number: this.currentLang === 'es' ? 'Número' : this.currentLang === 'en' ? 'Number' : 'Nombre',
            validate: this.currentLang === 'es' ? 'Validar' : this.currentLang === 'en' ? 'Validate' : 'Valider',
            random: this.currentLang === 'es' ? '🎲 Aleatorio' : this.currentLang === 'en' ? '🎲 Random' : '🎲 Aléatoire',
            challenge: this.currentLang === 'es' ? '🎯 Desafío: Valida 5 números correctamente' : this.currentLang === 'en' ? '🎯 Challenge: Validate 5 numbers correctly' : '🎯 Défi: Validez 5 nombres correctement',
            validations: this.currentLang === 'es' ? 'Validaciones' : this.currentLang === 'en' ? 'Validations' : 'Validations'
        };
        
        document.getElementById('gameArea').innerHTML = `
            <div class="hint-panel">
                <h3>${t.title}</h3>
                <p>${t.desc}</p>
            </div>
            
            <div class="controls">
                <div class="input-group">
                    <label>${t.number}:</label>
                    <input type="number" id="primeInput" min="2" max="10000" value="23">
                    <button class="btn btn-primary" onclick="game.validatePrime()">${t.validate}</button>
                </div>
                <button class="btn btn-success" onclick="game.generateRandomPrime()">${t.random}</button>
            </div>
            
            <div id="validationResult" style="margin-top: 20px; padding: 20px; border-radius: 10px; display: none;"></div>
            
            <div class="sophie-germain-info">
                <h4>${t.challenge}</h4>
                <p>${t.validations}: <span id="correctValidations">0</span>/5</p>
            </div>
        `;
    }
    
    renderOptimizedGenerator() {
        const t = {
            title: this.currentLang === 'es' ? '⚡ Generador Optimizado' : this.currentLang === 'en' ? '⚡ Optimized Generator' : '⚡ Générateur Optimisé',
            desc: this.currentLang === 'es' ? 'Usa el filtro de raíz digital para encontrar primos eficientemente.' : this.currentLang === 'en' ? 'Use the digital root filter to find primes efficiently.' : 'Utilisez le filtre de racine numérique pour trouver des nombres premiers efficacement.',
            from: this.currentLang === 'es' ? 'Desde' : this.currentLang === 'en' ? 'From' : 'De',
            to: this.currentLang === 'es' ? 'Hasta' : this.currentLang === 'en' ? 'To' : 'À',
            search: this.currentLang === 'es' ? '🔍 Buscar' : this.currentLang === 'en' ? '🔍 Search' : '🔍 Rechercher',
            challenge: this.currentLang === 'es' ? '🎯 Encuentra 3 primos de Sophie Germain' : this.currentLang === 'en' ? '🎯 Find 3 Sophie Germain primes' : '🎯 Trouvez 3 nombres premiers de Sophie Germain',
            found: this.currentLang === 'es' ? 'Encontrados' : this.currentLang === 'en' ? 'Found' : 'Trouvés'
        };
        
        document.getElementById('gameArea').innerHTML = `
            <div class="hint-panel">
                <h3>${t.title}</h3>
                <p>${t.desc}</p>
            </div>
            
            <div class="controls">
                <div class="input-group">
                    <input type="number" id="rangeStart" min="10" max="1000" value="100" placeholder="${t.from}">
                    <input type="number" id="rangeEnd" min="50" max="2000" value="200" placeholder="${t.to}">
                    <button class="btn btn-primary" onclick="game.generatePrimesOptimized()">${t.search}</button>
                </div>
            </div>
            
            <div id="generatorResults" style="margin-top: 20px;"></div>
            
            <div class="sophie-germain-info">
                <h4>${t.challenge}</h4>
                <p>${t.found}: <span id="foundPrimes">0</span>/3</p>
            </div>
        `;
    }
    
    renderMasterChallenge() {
        const t = {
            title: this.currentLang === 'es' ? '🏆 Maestro de Patrones' : this.currentLang === 'en' ? '🏆 Pattern Master' : '🏆 Maître des Motifs',
            desc: this.currentLang === 'es' ? 'Combina todos los conceptos aprendidos. ¡El desafío final!' : this.currentLang === 'en' ? 'Combine all learned concepts. The final challenge!' : 'Combinez tous les concepts appris. Le défi final!',
            balls: this.currentLang === 'es' ? 'Bolas' : this.currentLang === 'en' ? 'Balls' : 'Boules',
            player: this.currentLang === 'es' ? 'Jugador' : this.currentLang === 'en' ? 'Player' : 'Joueur',
            masterMove: this.currentLang === 'es' ? 'Movimiento maestro' : this.currentLang === 'en' ? 'Master move' : 'Mouvement maître',
            execute: this.currentLang === 'es' ? 'Ejecutar' : this.currentLang === 'en' ? 'Execute' : 'Exécuter',
            reset: this.currentLang === 'es' ? '🔄 Reiniciar' : this.currentLang === 'en' ? '🔄 Reset' : '🔄 Réinitialiser',
            specialRules: this.currentLang === 'es' ? '🎯 Reglas Especiales' : this.currentLang === 'en' ? '🎯 Special Rules' : '🎯 Règles Spéciales',
            rulesDesc: this.currentLang === 'es' ? 'Solo primos de Sophie Germain que además tengan raíz digital {2, 5, 8}. Ejemplos: 2, 5, 11, 23, 29, 83...' : this.currentLang === 'en' ? 'Only Sophie Germain primes that also have digital root {2, 5, 8}. Examples: 2, 5, 11, 23, 29, 83...' : 'Seulement nombres premiers de Sophie Germain qui ont aussi racine numérique {2, 5, 8}. Exemples: 2, 5, 11, 23, 29, 83...',
            moves: this.currentLang === 'es' ? '📝 Movimientos' : this.currentLang === 'en' ? '📝 Moves' : '📝 Mouvements'
        };
        
        document.getElementById('gameArea').innerHTML = `
            <div class="hint-panel">
                <h3>${t.title}</h3>
                <p>${t.desc}</p>
            </div>
            
            <div class="digital-root-display">
                ${t.balls}: ${this.gameState.balls} | ${t.player}: ${this.gameState.player}
            </div>
            
            <div class="balls-container" id="ballsContainer">${this.renderBalls(this.levels[5].balls, this.gameState.balls)}</div>
            
            <div class="controls">
                <div class="input-group">
                    <label>${t.masterMove}:</label>
                    <input type="number" id="moveInput" min="1" max="30" value="2">
                    <button class="btn btn-primary" onclick="game.makeMasterMove()">${t.execute}</button>
                </div>
                <button class="btn btn-warning" onclick="game.resetLevel()">${t.reset}</button>
            </div>
            
            <div class="sophie-germain-info">
                <h4>${t.specialRules}</h4>
                <p>${t.rulesDesc}</p>
            </div>
            
            <div id="moveHistory"><h4>${t.moves}</h4><div id="movesList"></div></div>
        `;
    }
    
    renderBalls(totalBalls, remainingBalls = null) {
        let html = '';
        const remaining = remainingBalls !== null ? remainingBalls : totalBalls;
        const removed = totalBalls - remaining;
        
        // Mostrar todas las bolas si son 100 o menos
        const displayLimit = totalBalls <= 100 ? totalBalls : 100;
        
        for (let i = 1; i <= displayLimit; i++) {
            const isRemoved = i <= removed;
            const ballClass = isRemoved ? 'ball ball-removed' : 'ball ball-available';
            const ballContent = isRemoved ? '❌' : i;
            html += `<div class="${ballClass}" title="${isRemoved ? 'Retirada' : 'Disponible'}">${ballContent}</div>`;
        }
        
        // Si hay más bolas que el límite de visualización
        if (totalBalls > displayLimit) {
            const extraBalls = totalBalls - displayLimit;
            const extraRemoved = Math.max(0, removed - displayLimit);
            const extraRemaining = extraBalls - extraRemoved;
            
            if (extraRemaining > 0) {
                html += `<div class="ball ball-extra" style="background: linear-gradient(45deg, #667eea, #764ba2); color: white; font-weight: bold; font-size: 1.2em;">+${extraRemaining}</div>`;
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
        if (isNaN(move) || move < 1) {
            this.showMessage('❌ Movimiento inválido', 'error');
            return;
        }
        
        const root = this.digitalRoot(move);
        if (root < 1 || root > 6) {
            this.showMessage(`❌ Raíz digital ${root} no válida. Debe estar entre 1-6`, 'error');
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
        
        if (move > this.gameState.balls) {
            this.showMessage('❌ No hay suficientes bolas', 'error');
            return;
        }
        
        // Validar que sea un primo de Sophie Germain
        const isSG = this.isSophieGermainPrime(move);
        if (!isSG) {
            const isPrime = this.isPrime(move);
            const safePrime = 2 * move + 1;
            const isSafePrime = this.isPrime(safePrime);
            
            let message = `❌ ${move} no es un primo de Sophie Germain.`;
            if (!isPrime) {
                message += ` ${move} no es primo.`;
            } else if (!isSafePrime) {
                message += ` ${move} es primo, pero 2×${move}+1 = ${safePrime} no es primo.`;
            }
            
            this.showMessage(message, 'error');
            return;
        }
        
        const root = this.digitalRoot(move);
        const safePrime = 2 * move + 1;
        this.executeMove(move, root, ` (${move} es SG: 2×${move}+1 = ${safePrime} es primo)`);
    }
    
    makeMasterMove() {
        const move = parseInt(document.getElementById('moveInput').value);
        if (isNaN(move) || move < 1) {
            this.showMessage('❌ Movimiento inválido', 'error');
            return;
        }
        
        if (move > this.gameState.balls) {
            this.showMessage('❌ No hay suficientes bolas', 'error');
            return;
        }
        
        const root = this.digitalRoot(move);
        const isSG = this.isSophieGermainPrime(move);
        const hasValidRoot = [2, 5, 8].includes(root);
        
        // Nivel 6: Debe ser primo de Sophie Germain Y tener raíz {2,5,8}
        if (!isSG) {
            this.showMessage(`❌ ${move} no es un primo de Sophie Germain`, 'error');
            return;
        }
        
        if (!hasValidRoot) {
            this.showMessage(`❌ ${move} es primo SG, pero su raíz digital es ${root}, no {2,5,8}`, 'error');
            return;
        }
        
        this.executeMove(move, root, ` (SG con raíz ${root})`);
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
            if (this.gameState.player === 'A') {
                this.showMessage(`🎉 ¡Jugador ${this.gameState.player} gana!${extra}`, 'success');
                this.completeLevel(this.currentLevel);
            } else {
                this.showMessage(`❌ ¡Jugador ${this.gameState.player} ganó! Debes ganar tú para avanzar. Intenta de nuevo.`, 'error');
                setTimeout(() => {
                    this.closeResultModal();
                    this.resetLevel();
                }, 2000);
            }
            return;
        }
        
        // Switch player
        this.gameState.player = this.gameState.player === 'A' ? 'B' : 'A';
        this.updateGameDisplay();
        
        // Check if current player has valid moves
        if (!this.hasValidMoves()) {
            // Current player loses because they can't move
            const winner = this.gameState.player === 'A' ? 'B' : 'A';
            if (winner === 'A') {
                this.showMessage(`🎉 ¡Jugador ${winner} gana! El jugador ${this.gameState.player} no tiene movimientos válidos.`, 'success');
                this.completeLevel(this.currentLevel);
            } else {
                this.showMessage(`❌ ¡Jugador ${winner} ganó! Debes ganar tú para avanzar. Intenta de nuevo.`, 'error');
                setTimeout(() => {
                    this.closeResultModal();
                    this.resetLevel();
                }, 2000);
            }
            return;
        }
        
        if (this.gameState.player === 'B') {
            setTimeout(() => this.makeAIMove(), 1000);
        }
    }
    
    makeAIMove() {
        const validMoves = [];
        const maxMove = Math.min(this.gameState.balls, 50); // Buscar hasta 50 o las bolas disponibles
        
        for (let i = 1; i <= maxMove; i++) {
            const root = this.digitalRoot(i);
            if (this.currentLevel === 2 && root >= 1 && root <= 6) {
                validMoves.push(i);
            } else if (this.currentLevel === 3 && this.isSophieGermainPrime(i)) {
                validMoves.push(i);
            } else if (this.currentLevel === 6 && this.isSophieGermainPrime(i) && [2, 5, 8].includes(root)) {
                // Nivel 6: Debe ser primo SG Y tener raíz {2,5,8}
                validMoves.push(i);
            }
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
        
        // Solo contar como validación correcta si el usuario aprende algo
        // (cualquier validación cuenta como aprendizaje)
        this.gameState.correctValidations++;
        document.getElementById('correctValidations').textContent = this.gameState.correctValidations;
        
        if (this.gameState.correctValidations >= 5) {
            setTimeout(() => {
                this.showMessage('🎉 ¡Validador completado! Has explorado el patrón de los primos de Sophie Germain.', 'success');
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
        // Buscar hasta 30 o el número de bolas disponibles, lo que sea mayor
        const maxSearch = Math.max(30, this.gameState.balls);
        for (let move = 1; move <= maxSearch; move++) {
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
            // Level 3: only Sophie Germain primes allowed
            return this.isSophieGermainPrime(move);
        } else if (this.currentLevel === 6) {
            // Level 6: Sophie Germain primes AND roots {2, 5, 8}
            const isSG = this.isSophieGermainPrime(move);
            const hasValidRoot = [2, 5, 8].includes(root);
            return isSG && hasValidRoot;
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
    
    showHelp() {
        const modal = document.getElementById('instructionsModal');
        const title = document.getElementById('modalTitle');
        const content = document.getElementById('modalContent');
        
        const levelIndex = this.currentLevel - 1;
        const instructions = this.t('levelInstructions')[levelIndex];
        
        title.innerHTML = `📚 ${this.t('instructions')} - ${this.t('levelNames')[levelIndex]}`;
        
        let stepsHTML = '<div class="instruction-step">';
        stepsHTML += `<h4>${instructions.title}</h4>`;
        instructions.steps.forEach(step => {
            stepsHTML += `<p style="margin: 8px 0;">${step}</p>`;
        });
        stepsHTML += '</div>';
        
        let hintsHTML = '<div class="hint-box">';
        hintsHTML += `<h4 style="margin: 0 0 10px 0;">💡 ${this.t('hints')}</h4>`;
        instructions.hints.forEach(hint => {
            hintsHTML += `<p style="margin: 5px 0;">${hint}</p>`;
        });
        hintsHTML += '</div>';
        
        content.innerHTML = stepsHTML + hintsHTML;
        modal.style.display = 'block';
    }
    
    showFinalVictoryMessage() {
        const modal = document.getElementById('resultModal');
        const title = document.getElementById('resultTitle');
        const content = document.getElementById('resultContent');
        
        const messages = {
            es: {
                title: '🏆🎉 ¡FELICITACIONES! 🎉🏆',
                message: `
                    <div style="text-align: center; padding: 20px;">
                        <h2 style="color: #FFD700; margin: 20px 0;">¡Has completado todos los niveles!</h2>
                        <p style="font-size: 1.3em; margin: 15px 0;">🎓 <strong>Eres un Maestro de los Primos de Sophie Germain</strong> 🎓</p>
                        <p style="font-size: 1.1em; line-height: 1.6; margin: 20px 0;">
                            Esperamos que te hayas divertido explorando el fascinante mundo de los <strong>primos de Sophie Germain</strong> 
                            y descubriendo el patrón de las raíces digitales {2, 5, 8}.
                        </p>
                        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 20px; border-radius: 15px; margin: 20px 0; color: white;">
                            <p style="font-size: 1.2em; margin: 10px 0;">📊 <strong>Puntuación Final: ${this.score}</strong></p>
                            <p style="font-size: 1em; margin: 10px 0;">🎯 Niveles completados: ${this.levels.length}/${this.levels.length}</p>
                        </div>
                        <p style="font-size: 1em; margin: 20px 0; font-style: italic;">
                            "¡Las matemáticas son el lenguaje con el que Dios escribió el universo!" - Galileo Galilei
                        </p>
                        <button class="btn btn-success" onclick="game.closeResultModal(); game.loadLevel(1);" style="margin-top: 20px; font-size: 1.1em;">
                            🔄 Jugar de Nuevo
                        </button>
                    </div>
                `
            },
            en: {
                title: '🏆🎉 CONGRATULATIONS! 🎉🏆',
                message: `
                    <div style="text-align: center; padding: 20px;">
                        <h2 style="color: #FFD700; margin: 20px 0;">You've completed all levels!</h2>
                        <p style="font-size: 1.3em; margin: 15px 0;">🎓 <strong>You are a Sophie Germain Primes Master</strong> 🎓</p>
                        <p style="font-size: 1.1em; line-height: 1.6; margin: 20px 0;">
                            We hope you had fun exploring the fascinating world of <strong>Sophie Germain primes</strong> 
                            and discovering the digital root pattern {2, 5, 8}.
                        </p>
                        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 20px; border-radius: 15px; margin: 20px 0; color: white;">
                            <p style="font-size: 1.2em; margin: 10px 0;">📊 <strong>Final Score: ${this.score}</strong></p>
                            <p style="font-size: 1em; margin: 10px 0;">🎯 Levels completed: ${this.levels.length}/${this.levels.length}</p>
                        </div>
                        <p style="font-size: 1em; margin: 20px 0; font-style: italic;">
                            "Mathematics is the language in which God wrote the universe!" - Galileo Galilei
                        </p>
                        <button class="btn btn-success" onclick="game.closeResultModal(); game.loadLevel(1);" style="margin-top: 20px; font-size: 1.1em;">
                            🔄 Play Again
                        </button>
                    </div>
                `
            },
            fr: {
                title: '🏆🎉 FÉLICITATIONS! 🎉🏆',
                message: `
                    <div style="text-align: center; padding: 20px;">
                        <h2 style="color: #FFD700; margin: 20px 0;">Vous avez terminé tous les niveaux!</h2>
                        <p style="font-size: 1.3em; margin: 15px 0;">🎓 <strong>Vous êtes un Maître des Nombres Premiers de Sophie Germain</strong> 🎓</p>
                        <p style="font-size: 1.1em; line-height: 1.6; margin: 20px 0;">
                            Nous espérons que vous vous êtes amusé à explorer le monde fascinant des <strong>nombres premiers de Sophie Germain</strong> 
                            et à découvrir le motif de racines numériques {2, 5, 8}.
                        </p>
                        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 20px; border-radius: 15px; margin: 20px 0; color: white;">
                            <p style="font-size: 1.2em; margin: 10px 0;">📊 <strong>Score Final: ${this.score}</strong></p>
                            <p style="font-size: 1em; margin: 10px 0;">🎯 Niveaux terminés: ${this.levels.length}/${this.levels.length}</p>
                        </div>
                        <p style="font-size: 1em; margin: 20px 0; font-style: italic;">
                            "Les mathématiques sont le langage avec lequel Dieu a écrit l'univers!" - Galileo Galilei
                        </p>
                        <button class="btn btn-success" onclick="game.closeResultModal(); game.loadLevel(1);" style="margin-top: 20px; font-size: 1.1em;">
                            🔄 Rejouer
                        </button>
                    </div>
                `
            }
        };
        
        const msg = messages[this.currentLang] || messages.es;
        title.innerHTML = msg.title;
        content.innerHTML = msg.message;
        modal.style.display = 'block';
    }
    
    completeLevel(levelId) {
        // Marcar nivel como completado
        const currentLevelObj = this.levels.find(l => l.id === levelId);
        if (currentLevelObj) {
            currentLevelObj.completed = true;
            this.gameState.levelCompleted = true;
        }
        
        this.score += 100;
        
        // Desbloquear el siguiente nivel solo si se completó correctamente
        if (levelId < this.levels.length) {
            const nextLevel = this.levels.find(l => l.id === levelId + 1);
            if (nextLevel) {
                nextLevel.unlocked = true;
            }
        }
        
        // Verificar si se completaron todos los niveles (incluyendo el último nivel 6)
        const allCompleted = this.levels.every(l => l.completed);
        const isLastLevel = levelId === this.levels.length;
        
        if (allCompleted && isLastLevel) {
            // Mensaje final de victoria solo cuando se completa el nivel 6
            setTimeout(() => {
                this.showFinalVictoryMessage();
            }, 1500);
        } else {
            // Mostrar mensaje de éxito y avanzar automáticamente
            setTimeout(() => {
                this.closeResultModal();
                if (levelId < this.levels.length) {
                    this.loadLevel(levelId + 1);
                }
            }, 2000);
        }
        
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
        
        // Actualizar etiquetas con traducción
        const progressText = document.querySelector('.status-panel p:nth-child(3)');
        if (progressText) {
            progressText.innerHTML = `${this.t('currentLevel')}: <span id="currentLevel">${this.currentLevel}</span> ${this.t('of')} <span id="totalLevels">${this.levels.length}</span>`;
        }
        const scoreText = document.querySelector('.status-panel p:nth-child(4)');
        if (scoreText) {
            scoreText.innerHTML = `${this.t('score')}: <span id="score">${this.score}</span>`;
        }
    }
    
    saveGameState() {
        const state = {
            currentLevel: this.currentLevel,
            score: this.score,
            unlockedLevels: this.levels.filter(l => l.unlocked).map(l => l.id),
            completedLevels: this.levels.filter(l => l.completed).map(l => l.id)
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
            
            if (state.completedLevels) {
                state.completedLevels.forEach(levelId => {
                    const level = this.levels.find(l => l.id === levelId);
                    if (level) level.completed = true;
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
