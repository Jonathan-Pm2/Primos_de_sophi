#!/usr/bin/env python3
"""
Análisis de primos de Sophie Germain y sus raíces primitivas
Un primo p es un primo de Sophie Germain si 2p+1 también es primo.
"""

import math
import time
from typing import List, Tuple, Optional
import matplotlib.pyplot as plt
import numpy as np

def is_prime(n: int) -> bool:
    """Verifica si un número es primo usando trial division optimizado."""
    if n < 2:
        return False
    if n == 2:
        return True
    if n % 2 == 0:
        return False
    
    # Solo verificar divisores impares hasta sqrt(n)
    for i in range(3, int(math.sqrt(n)) + 1, 2):
        if n % i == 0:
            return False
    return True

def is_sophie_germain_prime(p: int) -> bool:
    """Verifica si p es un primo de Sophie Germain."""
    return is_prime(p) and is_prime(2 * p + 1)

def find_sophie_germain_primes(limit: int) -> List[int]:
    """Encuentra todos los primos de Sophie Germain hasta el límite dado."""
    primes = []
    for p in range(2, limit):
        if is_sophie_germain_prime(p):
            primes.append(p)
    return primes

def mod_exp(base: int, exp: int, mod: int) -> int:
    """Exponenciación modular eficiente."""
    result = 1
    base = base % mod
    while exp > 0:
        if exp % 2 == 1:
            result = (result * base) % mod
        exp = exp >> 1
        base = (base * base) % mod
    return result

def find_primitive_root(p: int) -> Optional[int]:
    """
    Encuentra la raíz primitiva más pequeña módulo p.
    Una raíz primitiva g módulo p es un entero tal que g^k ≢ 1 (mod p)
    para todo k < p-1, donde p es primo.
    """
    if not is_prime(p):
        return None
    
    # Factorizar p-1
    phi = p - 1
    factors = []
    n = phi
    
    # Encontrar factores primos de phi
    for i in range(2, int(math.sqrt(n)) + 1):
        if n % i == 0:
            factors.append(i)
            while n % i == 0:
                n //= i
    if n > 1:
        factors.append(n)
    
    # Probar cada número desde 2 hasta p-1
    for g in range(2, p):
        is_primitive = True
        for factor in factors:
            if mod_exp(g, phi // factor, p) == 1:
                is_primitive = False
                break
        if is_primitive:
            return g
    
    return None

def analyze_sophie_germain_patterns(limit: int = 1000) -> List[Tuple[int, int, int, int]]:
    """
    Analiza los patrones en los primos de Sophie Germain y sus raíces primitivas.
    Retorna una lista de tuplas (p, 2p+1, raíz_p, raíz_2p+1).
    """
    results = []
    sophie_primes = find_sophie_germain_primes(limit)
    
    print(f"Encontrados {len(sophie_primes)} primos de Sophie Germain hasta {limit}")
    print("\nAnalizando raíces primitivas...")
    
    for p in sophie_primes:
        q = 2 * p + 1
        root_p = find_primitive_root(p)
        root_q = find_primitive_root(q)
        
        if root_p is not None and root_q is not None:
            results.append((p, q, root_p, root_q))
            print(f"p={p:3d}, 2p+1={q:4d}, raíz(p)={root_p}, raíz(2p+1)={root_q}")
    
    return results

def analyze_root_patterns(results: List[Tuple[int, int, int, int]]):
    """Analiza los patrones en las raíces primitivas."""
    root_p_counts = {}
    root_q_counts = {}
    pair_counts = {}
    
    for p, q, root_p, root_q in results:
        # Contar frecuencias de raíces individuales
        root_p_counts[root_p] = root_p_counts.get(root_p, 0) + 1
        root_q_counts[root_q] = root_q_counts.get(root_q, 0) + 1
        
        # Contar pares de raíces
        pair = (root_p, root_q)
        pair_counts[pair] = pair_counts.get(pair, 0) + 1
    
    print("\n" + "="*50)
    print("ANÁLISIS DE PATRONES")
    print("="*50)
    
    print(f"\nFrecuencias de raíces primitivas para p:")
    for root, count in sorted(root_p_counts.items()):
        percentage = (count / len(results)) * 100
        print(f"  {root}: {count} veces ({percentage:.1f}%)")
    
    print(f"\nFrecuencias de raíces primitivas para 2p+1:")
    for root, count in sorted(root_q_counts.items()):
        percentage = (count / len(results)) * 100
        print(f"  {root}: {count} veces ({percentage:.1f}%)")
    
    print(f"\nPares de raíces más comunes:")
    for pair, count in sorted(pair_counts.items(), key=lambda x: x[1], reverse=True):
        percentage = (count / len(results)) * 100
        print(f"  ({pair[0]}, {pair[1]}): {count} veces ({percentage:.1f}%)")

def plot_patterns(results: List[Tuple[int, int, int, int]]):
    """Crea visualizaciones de los patrones encontrados."""
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
    
    # Gráfico 2: Raíces primitivas de p vs índice
    ax2.scatter(range(len(root_p_values)), root_p_values, c=root_p_values, cmap='viridis', alpha=0.7)
    ax2.set_title('Raíces primitivas de p')
    ax2.set_xlabel('Índice')
    ax2.set_ylabel('Raíz primitiva de p')
    ax2.grid(True, alpha=0.3)
    
    # Gráfico 3: Raíces primitivas de 2p+1 vs índice
    ax3.scatter(range(len(root_q_values)), root_q_values, c=root_q_values, cmap='plasma', alpha=0.7)
    ax3.set_title('Raíces primitivas de 2p+1')
    ax3.set_xlabel('Índice')
    ax3.set_ylabel('Raíz primitiva de 2p+1')
    ax3.grid(True, alpha=0.3)
    
    # Gráfico 4: Correlación entre raíces
    ax4.scatter(root_p_values, root_q_values, alpha=0.6, s=50)
    ax4.set_title('Correlación entre raíces primitivas')
    ax4.set_xlabel('Raíz primitiva de p')
    ax4.set_ylabel('Raíz primitiva de 2p+1')
    ax4.grid(True, alpha=0.3)
    
    plt.tight_layout()
    plt.savefig('/home/jonathan/CascadeProjects/sophie-germain-primes/patterns.png', dpi=300, bbox_inches='tight')
    plt.show()

def main():
    """Función principal del análisis."""
    print("ANÁLISIS DE PRIMOS DE SOPHIE GERMAIN")
    print("="*40)
    
    # Configurar límite de búsqueda
    limit = int(input("Ingrese el límite de búsqueda (por defecto 1000): ") or "1000")
    
    start_time = time.time()
    
    # Realizar análisis
    results = analyze_sophie_germain_patterns(limit)
    
    if results:
        analyze_root_patterns(results)
        
        # Crear visualizaciones
        try:
            plot_patterns(results)
            print(f"\nGráficos guardados en 'patterns.png'")
        except ImportError:
            print("\nMatplotlib no disponible. Instale con: pip install matplotlib")
        
        # Guardar resultados en archivo
        with open('/home/jonathan/CascadeProjects/sophie-germain-primes/results.txt', 'w') as f:
            f.write("Primos de Sophie Germain y sus raíces primitivas\n")
            f.write("="*50 + "\n\n")
            f.write("p\t2p+1\traíz(p)\traíz(2p+1)\n")
            f.write("-"*40 + "\n")
            for p, q, root_p, root_q in results:
                f.write(f"{p}\t{q}\t{root_p}\t{root_q}\n")
        
        print(f"\nResultados guardados en 'results.txt'")
    
    elapsed_time = time.time() - start_time
    print(f"\nTiempo de ejecución: {elapsed_time:.2f} segundos")

if __name__ == "__main__":
    main()
