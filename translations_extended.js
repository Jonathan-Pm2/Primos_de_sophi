// Traducciones extendidas para todos los textos del juego
const extendedTranslations = {
    tutorial: {
        es: {
            title: "🎓 Aprende sobre Raíces Digitales",
            desc: "La <strong>raíz digital</strong> se obtiene sumando dígitos repetidamente hasta obtener uno solo.",
            examples: "<strong>Ejemplos:</strong> 23 → 2+3 = 5 | 89 → 8+9 = 17 → 1+7 = 8",
            calculator: "🧮 Calculadora de Raíz Digital",
            number: "Número",
            calculate: "Calcular",
            discovery: "🔍 Descubrimiento Clave",
            discoveryDesc: "Los primos de Sophie Germain (excepto 3) tienen raíces digitales <strong>exclusivamente en {2, 5, 8}</strong>.",
            efficiency: "Esto permite filtrar candidatos y acelerar la búsqueda en ~67%.",
            understood: "✅ Entendido, continuar",
            root: "Raíz",
            validNumber: "❌ Número válido requerido"
        },
        en: {
            title: "🎓 Learn about Digital Roots",
            desc: "The <strong>digital root</strong> is obtained by repeatedly summing digits until obtaining a single one.",
            examples: "<strong>Examples:</strong> 23 → 2+3 = 5 | 89 → 8+9 = 17 → 1+7 = 8",
            calculator: "🧮 Digital Root Calculator",
            number: "Number",
            calculate: "Calculate",
            discovery: "🔍 Key Discovery",
            discoveryDesc: "Sophie Germain primes (except 3) have digital roots <strong>exclusively in {2, 5, 8}</strong>.",
            efficiency: "This allows filtering candidates and speeding up the search by ~67%.",
            understood: "✅ Understood, continue",
            root: "Root",
            validNumber: "❌ Valid number required"
        },
        fr: {
            title: "🎓 Apprenez sur les Racines Numériques",
            desc: "La <strong>racine numérique</strong> s'obtient en additionnant les chiffres de manière répétée jusqu'à obtenir un seul.",
            examples: "<strong>Exemples:</strong> 23 → 2+3 = 5 | 89 → 8+9 = 17 → 1+7 = 8",
            calculator: "🧮 Calculatrice de Racine Numérique",
            number: "Nombre",
            calculate: "Calculer",
            discovery: "🔍 Découverte Clé",
            discoveryDesc: "Les nombres premiers de Sophie Germain (sauf 3) ont des racines numériques <strong>exclusivement dans {2, 5, 8}</strong>.",
            efficiency: "Cela permet de filtrer les candidats et d'accélérer la recherche d'environ 67%.",
            understood: "✅ Compris, continuer",
            root: "Racine",
            validNumber: "❌ Nombre valide requis"
        }
    },
    classicBag: {
        es: {
            title: "🎯 Saco Digital Clásico",
            desc: "Retira 1-6 bolas por turno. Quien tome la última gana.",
            restriction: "<strong>Restricción:</strong> Solo raíces digitales 1-6.",
            balls: "Bolas",
            player: "Jugador",
            remove: "Retirar",
            removeLabel: "Retirar (1-6):",
            reset: "🔄 Reiniciar",
            moves: "📝 Movimientos",
            remaining: "Quedan"
        },
        en: {
            title: "🎯 Classic Digital Bag",
            desc: "Remove 1-6 balls per turn. Whoever takes the last one wins.",
            restriction: "<strong>Restriction:</strong> Only digital roots 1-6.",
            balls: "Balls",
            player: "Player",
            remove: "Remove",
            removeLabel: "Remove (1-6):",
            reset: "🔄 Reset",
            moves: "📝 Moves",
            remaining: "Remaining"
        },
        fr: {
            title: "🎯 Sac Numérique Classique",
            desc: "Retirez 1-6 boules par tour. Celui qui prend la dernière gagne.",
            restriction: "<strong>Restriction:</strong> Seulement racines numériques 1-6.",
            balls: "Boules",
            player: "Joueur",
            remove: "Retirer",
            removeLabel: "Retirer (1-6):",
            reset: "🔄 Réinitialiser",
            moves: "📝 Mouvements",
            remaining: "Restant"
        }
    },
    sophiePattern: {
        es: {
            title: "🔢 Patrón de Sophie Germain",
            desc: "Solo raíces digitales {2, 5, 8}. El patrón descubierto.",
            valid: "Válidas",
            quantity: "Cantidad",
            validNumbers: "Válidos: 2, 5, 8, 11, 14, 17, 20..."
        },
        en: {
            title: "🔢 Sophie Germain Pattern",
            desc: "Only digital roots {2, 5, 8}. The discovered pattern.",
            valid: "Valid",
            quantity: "Quantity",
            validNumbers: "Valid: 2, 5, 8, 11, 14, 17, 20..."
        },
        fr: {
            title: "🔢 Motif de Sophie Germain",
            desc: "Seulement racines numériques {2, 5, 8}. Le motif découvert.",
            valid: "Valides",
            quantity: "Quantité",
            validNumbers: "Valides: 2, 5, 8, 11, 14, 17, 20..."
        }
    }
};
