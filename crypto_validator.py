#!/usr/bin/env python3
"""
Herramienta de Validación Criptográfica
Utiliza el descubrimiento de raíces digitales para validar primos de Sophie Germain
en sistemas criptográficos existentes
"""

import math
import time
from typing import List, Tuple, Dict, Optional
import hashlib
import secrets

def digital_root(n: int) -> int:
    """Calcula la raíz digital de un número."""
    if n == 0:
        return 0
    return 1 + (n - 1) % 9

def is_prime(n: int) -> bool:
    """Test de primalidad optimizado."""
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

def validate_digital_root_pattern(p: int) -> Dict[str, any]:
    """
    Valida si un primo sigue el patrón de raíces digitales descubierto.
    Retorna información detallada sobre la validación.
    """
    if not is_prime(p):
        return {
            'valid': False,
            'reason': 'El número no es primo',
            'p': p,
            'digital_root_p': digital_root(p),
            'is_sophie_germain': False
        }
    
    root_p = digital_root(p)
    valid_roots = {2, 5, 8}
    
    if root_p not in valid_roots:
        return {
            'valid': False,
            'reason': f'Raíz digital {root_p} no está en el conjunto válido {valid_roots}',
            'p': p,
            'digital_root_p': root_p,
            'is_sophie_germain': is_sophie_germain_prime(p),
            'expected_pattern': 'Raíz digital debe ser 2, 5, o 8'
        }
    
    # Si es primo de Sophie Germain, verificar el patrón completo
    if is_sophie_germain_prime(p):
        q = 2 * p + 1
        root_q = digital_root(q)
        
        # Verificar patrones específicos
        expected_patterns = {
            2: 5,  # Si p tiene raíz 2, 2p+1 debe tener raíz 5
            5: 2,  # Si p tiene raíz 5, 2p+1 debe tener raíz 2
            8: 8   # Si p tiene raíz 8, 2p+1 debe tener raíz 8
        }
        
        expected_root_q = expected_patterns.get(root_p)
        
        if root_q == expected_root_q:
            return {
                'valid': True,
                'reason': 'Primo de Sophie Germain válido con patrón correcto',
                'p': p,
                'q': q,
                'digital_root_p': root_p,
                'digital_root_q': root_q,
                'pattern': f'({root_p},{root_q})',
                'is_sophie_germain': True,
                'confidence': 'Alta - Sigue el patrón descubierto'
            }
        else:
            return {
                'valid': False,
                'reason': f'Patrón incorrecto: esperado ({root_p},{expected_root_q}), encontrado ({root_p},{root_q})',
                'p': p,
                'q': q,
                'digital_root_p': root_p,
                'digital_root_q': root_q,
                'pattern': f'({root_p},{root_q})',
                'is_sophie_germain': True,
                'anomaly': True
            }
    else:
        return {
            'valid': True,
            'reason': 'Primo con raíz digital válida pero no es Sophie Germain',
            'p': p,
            'digital_root_p': root_p,
            'is_sophie_germain': False,
            'confidence': 'Media - Raíz digital válida pero no verificado como Sophie Germain'
        }

class CryptographicValidator:
    """Clase para validar primos en sistemas criptográficos."""
    
    def __init__(self):
        self.validation_history = []
        self.statistics = {
            'total_validated': 0,
            'valid_primes': 0,
            'sophie_germain_primes': 0,
            'pattern_anomalies': 0,
            'invalid_digital_roots': 0
        }
    
    def validate_prime(self, p: int) -> Dict[str, any]:
        """Valida un primo y actualiza estadísticas."""
        result = validate_digital_root_pattern(p)
        
        # Actualizar estadísticas
        self.statistics['total_validated'] += 1
        
        if result['valid']:
            self.statistics['valid_primes'] += 1
            
        if result.get('is_sophie_germain', False):
            self.statistics['sophie_germain_primes'] += 1
            
        if result.get('anomaly', False):
            self.statistics['pattern_anomalies'] += 1
            
        if result.get('digital_root_p', 0) not in {2, 5, 8}:
            self.statistics['invalid_digital_roots'] += 1
        
        # Guardar en historial
        self.validation_history.append({
            'timestamp': time.time(),
            'prime': p,
            'result': result
        })
        
        return result
    
    def validate_key_pair(self, p: int, q: int) -> Dict[str, any]:
        """Valida un par de primos para uso en RSA."""
        result_p = self.validate_prime(p)
        result_q = self.validate_prime(q)
        
        # Verificar que ambos sean primos válidos
        both_valid = result_p['valid'] and result_q['valid']
        
        # Verificar que sean diferentes
        different = p != q
        
        # Calcular N = p * q
        n = p * q
        
        # Verificar tamaño apropiado (ejemplo: al menos 1024 bits)
        bit_length = n.bit_length()
        sufficient_size = bit_length >= 1024
        
        return {
            'valid_pair': both_valid and different and sufficient_size,
            'p_validation': result_p,
            'q_validation': result_q,
            'n': n,
            'bit_length': bit_length,
            'sufficient_size': sufficient_size,
            'different_primes': different,
            'security_assessment': self._assess_security(result_p, result_q, bit_length)
        }
    
    def _assess_security(self, result_p: Dict, result_q: Dict, bit_length: int) -> str:
        """Evalúa el nivel de seguridad del par de primos."""
        if not (result_p['valid'] and result_q['valid']):
            return "INSEGURO - Primos inválidos"
        
        if bit_length < 1024:
            return "INSEGURO - Tamaño insuficiente"
        elif bit_length < 2048:
            return "BÁSICO - Seguridad mínima"
        elif bit_length < 3072:
            return "BUENO - Seguridad estándar"
        else:
            return "EXCELENTE - Alta seguridad"
    
    def generate_report(self) -> str:
        """Genera un reporte de las validaciones realizadas."""
        stats = self.statistics
        total = stats['total_validated']
        
        if total == 0:
            return "No se han realizado validaciones."
        
        report = f"""
REPORTE DE VALIDACIÓN CRIPTOGRÁFICA
{'='*50}

Estadísticas Generales:
  Total de números validados: {total}
  Primos válidos: {stats['valid_primes']} ({stats['valid_primes']/total*100:.1f}%)
  Primos de Sophie Germain: {stats['sophie_germain_primes']} ({stats['sophie_germain_primes']/total*100:.1f}%)
  Anomalías en patrones: {stats['pattern_anomalies']} ({stats['pattern_anomalies']/total*100:.1f}%)
  Raíces digitales inválidas: {stats['invalid_digital_roots']} ({stats['invalid_digital_roots']/total*100:.1f}%)

Análisis de Conformidad:
  Conformidad con patrón descubierto: {(total-stats['pattern_anomalies'])/total*100:.1f}%
  Eficiencia del filtro de raíz digital: {(total-stats['invalid_digital_roots'])/total*100:.1f}%

Últimas Validaciones:
"""
        
        # Mostrar últimas 5 validaciones
        recent = self.validation_history[-5:] if len(self.validation_history) >= 5 else self.validation_history
        
        for entry in recent:
            result = entry['result']
            status = "✓" if result['valid'] else "✗"
            report += f"  {status} {entry['prime']} - {result['reason']}\n"
        
        return report
    
    def batch_validate(self, primes: List[int]) -> Dict[str, any]:
        """Valida una lista de primos en lote."""
        results = []
        start_time = time.time()
        
        for p in primes:
            result = self.validate_prime(p)
            results.append(result)
        
        elapsed_time = time.time() - start_time
        
        return {
            'results': results,
            'total_time': elapsed_time,
            'primes_per_second': len(primes) / elapsed_time if elapsed_time > 0 else 0,
            'summary': self.generate_report()
        }

def demo_cryptographic_validation():
    """Demostración de la herramienta de validación."""
    print("HERRAMIENTA DE VALIDACIÓN CRIPTOGRÁFICA")
    print("Basada en el descubrimiento de patrones en raíces digitales")
    print("="*60)
    
    validator = CryptographicValidator()
    
    # Casos de prueba
    test_cases = [
        2, 3, 5, 11, 23, 29, 41, 53, 83, 89,  # Primos de Sophie Germain conocidos
        7, 13, 17, 19, 31, 37, 43, 47,        # Otros primos
        15, 21, 25, 35, 49, 51, 77, 91        # Números compuestos
    ]
    
    print("\nValidando casos de prueba...")
    print("-" * 60)
    
    for p in test_cases:
        result = validator.validate_prime(p)
        status = "✓" if result['valid'] else "✗"
        print(f"{status} {p:3d} - {result['reason']}")
        
        if result.get('pattern'):
            print(f"    Patrón: {result['pattern']}")
    
    print("\n" + validator.generate_report())
    
    # Demostrar validación de par de claves RSA
    print("\nVALIDACIÓN DE PAR DE CLAVES RSA")
    print("-" * 40)
    
    # Ejemplo con primos de Sophie Germain
    p_rsa = 1009  # Primo de Sophie Germain
    q_rsa = 1013  # Primo de Sophie Germain
    
    pair_result = validator.validate_key_pair(p_rsa, q_rsa)
    
    print(f"Validando par RSA: p={p_rsa}, q={q_rsa}")
    print(f"Par válido: {pair_result['valid_pair']}")
    print(f"N = {pair_result['n']} ({pair_result['bit_length']} bits)")
    print(f"Evaluación de seguridad: {pair_result['security_assessment']}")

if __name__ == "__main__":
    demo_cryptographic_validation()
