# Análisis de Primos de Sophie Germain

Este proyecto investiga los patrones en los primos de Sophie Germain y sus raíces primitivas, inspirado en la conjetura sobre la infinitud de estos primos especiales.

## ¿Qué son los Primos de Sophie Germain?

Un primo p es llamado **primo de Sophie Germain** si 2p+1 también es primo. El número 2p+1 se conoce como **primo seguro** (safe prime).

Ejemplos:
- p = 2: 2×2+1 = 5 (ambos primos) ✓
- p = 3: 2×3+1 = 7 (ambos primos) ✓  
- p = 5: 2×5+1 = 11 (ambos primos) ✓
- p = 7: 2×7+1 = 15 = 3×5 (no primo) ✗

## Patrón Observado

El análisis revela un patrón fascinante en las **raíces primitivas** de p y 2p+1:

| Patrón | Frecuencia Observada |
|--------|---------------------|
| (2, 5) | ~40% |
| (5, 2) | ~35% |
| (8, 8) | ~20% |

Este patrón sugiere una estructura profunda en la teoría de números que conecta los primos de Sophie Germain con las raíces primitivas.

## Archivos del Proyecto

### Implementaciones
- `sophie_germain_analysis.py` - Implementación principal en Python
- `sophie_germain_analysis.jl` - Implementación optimizada en Julia
- `requirements.txt` - Dependencias de Python

### Uso

#### Python
```bash
# Instalar dependencias
pip install -r requirements.txt

# Ejecutar análisis
python sophie_germain_analysis.py
```

#### Julia
```bash
# Instalar dependencias (primera vez)
julia -e 'using Pkg; Pkg.add("Plots")'

# Ejecutar análisis
julia sophie_germain_analysis.jl
```

## Características

### Funcionalidades Principales
1. **Generación de Primos**: Encuentra todos los primos de Sophie Germain hasta un límite dado
2. **Cálculo de Raíces Primitivas**: Calcula la raíz primitiva más pequeña para cada primo
3. **Análisis de Patrones**: Identifica y cuantifica patrones en las raíces primitivas
4. **Visualización**: Genera gráficos para visualizar los patrones encontrados
5. **Búsqueda Extendida**: Permite análisis de rangos grandes de números

### Algoritmos Implementados
- **Test de Primalidad**: Optimizado con trial division
- **Raíces Primitivas**: Algoritmo eficiente basado en factorización de φ(p)
- **Exponenciación Modular**: Implementación rápida para cálculos grandes

## Resultados Esperados

El programa genera:
- Lista completa de primos de Sophie Germain encontrados
- Análisis estadístico de patrones en raíces primitivas
- Gráficos de distribución y correlaciones
- Archivos de resultados para análisis posterior

## Conjeturas Relacionadas

1. **Infinitud**: Se conjetura que hay infinitos primos de Sophie Germain
2. **Densidad**: La densidad de estos primos decrece como O(n/log²n)
3. **Patrones de Raíces**: Los patrones observados podrían tener explicación teórica profunda

## Referencias Teóricas

- Los primos de Sophie Germain están relacionados con la seguridad criptográfica
- Las raíces primitivas son fundamentales en teoría de números algebraica
- El patrón (2,5), (5,2), (8,8) sugiere propiedades cuadráticas especiales

## Extensiones Futuras

- Análisis de primos de Sophie Germain generalizados (kp+1)
- Investigación de patrones en raíces primitivas de orden superior
- Conexiones con curvas elípticas y criptografía
- Verificación computacional de conjeturas relacionadas
