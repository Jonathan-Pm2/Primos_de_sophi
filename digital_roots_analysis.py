#!/usr/bin/env python3
"""
Análisis de raíces digitales en primos de Sophie Germain
La raíz digital es la suma iterativa de dígitos hasta obtener un solo dígito.
"""

import math
import matplotlib.pyplot as plt

def is_prime(n: int) -> bool:
    """Verifica si un número es primo."""
    if n < 2:
        return False
    if n == 2:
        return True
    if n % 2 == 0:
        return False
    
    for i in range(3, int(math.sqrt(n)) + 1, 2):
        if n % i == 0:
            return False
    return True

def is_sophie_germain_prime(p: int) -> bool:
    """Verifica si p es un primo de Sophie Germain."""
    return is_prime(p) and is_prime(2 * p + 1)

def digital_root(n: int) -> int:
    """
    Calcula la raíz digital de un número.
    La raíz digital es la suma iterativa de dígitos hasta obtener un solo dígito.
    Equivale a: n mod 9, pero si el resultado es 0 y n > 0, entonces es 9.
    """
    if n == 0:
        return 0
    return 1 + (n - 1) % 9

def find_sophie_germain_primes(limit: int) -> list:
    """Encuentra todos los primos de Sophie Germain hasta el límite dado."""
    primes = []
    for p in range(2, limit):
        if is_sophie_germain_prime(p):
            primes.append(p)
    return primes

def analyze_digital_roots(limit: int = 1000):
    """Analiza las raíces digitales de los primos de Sophie Germain."""
    sophie_primes = find_sophie_germain_primes(limit)
    
    print(f"ANÁLISIS DE RAÍCES DIGITALES - PRIMOS DE SOPHIE GERMAIN")
    print("="*60)
    print(f"Encontrados {len(sophie_primes)} primos de Sophie Germain hasta {limit}")
    print()
    
    results = []
    
    # Crear tabla como en el documento original
    print("p\t2p+1\traíz(p)\traíz(2p+1)")
    print("-" * 40)
    
    for p in sophie_primes:
        q = 2 * p + 1
        root_p = digital_root(p)
        root_q = digital_root(q)
        
        results.append((p, q, root_p, root_q))
        print(f"{p}\t{q}\t{root_p}\t{root_q}")
    
    return results

def analyze_digital_root_patterns(results):
    """Analiza los patrones en las raíces digitales."""
    root_p_counts = {}
    root_q_counts = {}
    pair_counts = {}
    
    for p, q, root_p, root_q in results:
        # Contar frecuencias
        root_p_counts[root_p] = root_p_counts.get(root_p, 0) + 1
        root_q_counts[root_q] = root_q_counts.get(root_q, 0) + 1
        pair_counts[(root_p, root_q)] = pair_counts.get((root_p, root_q), 0) + 1
    
    print("\n" + "="*50)
    print("ANÁLISIS DE PATRONES EN RAÍCES DIGITALES")
    print("="*50)
    
    print(f"\nFrecuencias de raíces digitales para p:")
    for root in sorted(root_p_counts.keys()):
        count = root_p_counts[root]
        percentage = (count / len(results)) * 100
        print(f"  {root}: {count} veces ({percentage:.1f}%)")
    
    print(f"\nFrecuencias de raíces digitales para 2p+1:")
    for root in sorted(root_q_counts.keys()):
        count = root_q_counts[root]
        percentage = (count / len(results)) * 100
        print(f"  {root}: {count} veces ({percentage:.1f}%)")
    
    print(f"\nPares de raíces más comunes:")
    sorted_pairs = sorted(pair_counts.items(), key=lambda x: x[1], reverse=True)
    for (root_p, root_q), count in sorted_pairs:
        percentage = (count / len(results)) * 100
        print(f"  ({root_p}, {root_q}): {count} veces ({percentage:.1f}%)")
    
    # Verificar el patrón específico observado en la tabla original
    pattern_252 = pair_counts.get((2, 5), 0) + pair_counts.get((5, 2), 0)
    pattern_88 = pair_counts.get((8, 8), 0)
    
    print(f"\nPatrones específicos observados:")
    print(f"  Patrón (2,5) + (5,2): {pattern_252} casos ({(pattern_252/len(results)*100):.1f}%)")
    print(f"  Patrón (8,8): {pattern_88} casos ({(pattern_88/len(results)*100):.1f}%)")
    
    return root_p_counts, root_q_counts, pair_counts

def compare_with_original_table():
    """Compara con los valores de la tabla original del usuario."""
    original_data = [
        (2, 5, 2, 5), (3, 7, 3, 7), (5, 11, 5, 2), (11, 23, 2, 5),
        (23, 47, 5, 2), (29, 59, 2, 5), (41, 83, 5, 2), (53, 107, 8, 8),
        (83, 167, 2, 5), (89, 179, 8, 8), (113, 227, 5, 2), (131, 263, 5, 2),
        (173, 347, 2, 5), (179, 359, 8, 8), (191, 383, 2, 5), (233, 467, 8, 8),
        (239, 479, 5, 2), (251, 503, 8, 8), (281, 563, 2, 5), (293, 587, 5, 2),
        (359, 719, 8, 8), (419, 839, 5, 2), (431, 863, 8, 8), (443, 887, 2, 5),
        (491, 983, 5, 2), (509, 1019, 5, 2), (593, 1187, 8, 8), (641, 1283, 2, 5),
        (653, 1307, 5, 2), (659, 1319, 2, 5)
    ]
    
    print("\n" + "="*60)
    print("COMPARACIÓN CON TABLA ORIGINAL")
    print("="*60)
    
    print("\nVerificando cálculos de raíces digitales:")
    print("p\t2p+1\tTabla\tCalculado\tCoincide")
    print("-" * 50)
    
    matches = 0
    total = 0
    
    for p, q, orig_root_p, orig_root_q in original_data:
        calc_root_p = digital_root(p)
        calc_root_q = digital_root(q)
        
        match_p = "✓" if calc_root_p == orig_root_p else "✗"
        match_q = "✓" if calc_root_q == orig_root_q else "✗"
        
        if calc_root_p == orig_root_p and calc_root_q == orig_root_q:
            matches += 1
        total += 1
        
        print(f"{p}\t{q}\t({orig_root_p},{orig_root_q})\t({calc_root_p},{calc_root_q})\t{match_p}{match_q}")
    
    print(f"\nCoincidencias: {matches}/{total} ({(matches/total*100):.1f}%)")

def plot_digital_root_patterns(results):
    """Crea visualizaciones de los patrones de raíces digitales."""
    if not results:
        return
    
    p_values = [r[0] for r in results]
    root_p_values = [r[2] for r in results]
    root_q_values = [r[3] for r in results]
    
    fig, ((ax1, ax2), (ax3, ax4)) = plt.subplots(2, 2, figsize=(12, 10))
    
    # Gráfico 1: Distribución de p
    ax1.plot(range(len(p_values)), p_values, 'b.-', markersize=3)
    ax1.set_title('Primos de Sophie Germain encontrados')
    ax1.set_xlabel('Índice')
    ax1.set_ylabel('Valor de p')
    ax1.grid(True, alpha=0.3)
    
    # Gráfico 2: Raíces digitales de p vs índice
    colors = ['red', 'blue', 'green', 'orange', 'purple', 'brown', 'pink', 'gray', 'olive']
    for i, root in enumerate(root_p_values):
        ax2.scatter(i, root, c=colors[root-1], s=50, alpha=0.7)
    ax2.set_title('Raíces digitales de p')
    ax2.set_xlabel('Índice')
    ax2.set_ylabel('Raíz digital de p')
    ax2.set_yticks(range(1, 10))
    ax2.grid(True, alpha=0.3)
    
    # Gráfico 3: Raíces digitales de 2p+1 vs índice
    for i, root in enumerate(root_q_values):
        ax3.scatter(i, root, c=colors[root-1], s=50, alpha=0.7)
    ax3.set_title('Raíces digitales de 2p+1')
    ax3.set_xlabel('Índice')
    ax3.set_ylabel('Raíz digital de 2p+1')
    ax3.set_yticks(range(1, 10))
    ax3.grid(True, alpha=0.3)
    
    # Gráfico 4: Correlación entre raíces digitales
    for root_p, root_q in zip(root_p_values, root_q_values):
        ax4.scatter(root_p, root_q, c=colors[root_p-1], s=60, alpha=0.6)
    ax4.set_title('Correlación entre raíces digitales')
    ax4.set_xlabel('Raíz digital de p')
    ax4.set_ylabel('Raíz digital de 2p+1')
    ax4.set_xticks(range(1, 10))
    ax4.set_yticks(range(1, 10))
    ax4.grid(True, alpha=0.3)
    
    plt.tight_layout()
    plt.savefig('/home/jonathan/CascadeProjects/sophie-germain-primes/digital_roots_patterns.png', 
                dpi=300, bbox_inches='tight')
    plt.show()

def main():
    """Función principal del análisis de raíces digitales."""
    print("ANÁLISIS DE RAÍCES DIGITALES EN PRIMOS DE SOPHIE GERMAIN")
    print("="*60)
    
    limit = int(input("Ingrese el límite de búsqueda (por defecto 1000): ") or "1000")
    
    # Realizar análisis
    results = analyze_digital_roots(limit)
    
    if results:
        # Analizar patrones
        analyze_digital_root_patterns(results)
        
        # Comparar con tabla original
        compare_with_original_table()
        
        # Crear visualizaciones
        try:
            plot_digital_root_patterns(results)
            print(f"\nGráficos guardados en 'digital_roots_patterns.png'")
        except ImportError:
            print("\nMatplotlib no disponible. Instale con: pip install matplotlib")
        
        # Guardar resultados
        with open('/home/jonathan/CascadeProjects/sophie-germain-primes/digital_roots_results.txt', 'w') as f:
            f.write("Análisis de raíces digitales en primos de Sophie Germain\n")
            f.write("="*60 + "\n\n")
            f.write("p\t2p+1\traíz_digital(p)\traíz_digital(2p+1)\n")
            f.write("-"*50 + "\n")
            for p, q, root_p, root_q in results:
                f.write(f"{p}\t{q}\t{root_p}\t{root_q}\n")
        
        print(f"\nResultados guardados en 'digital_roots_results.txt'")

if __name__ == "__main__":
    main()
