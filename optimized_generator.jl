#!/usr/bin/env julia
"""
Generador Optimizado de Primos de Sophie Germain
Utiliza el descubrimiento de raíces digitales para optimizar la búsqueda
"""

using Random
using Printf
using Dates
using Statistics

function is_prime(n::Int)::Bool
    """Test de primalidad optimizado."""
    if n < 2
        return false
    elseif n == 2
        return true
    elseif n % 2 == 0
        return false
    end
    
    for i in 3:2:isqrt(n)
        if n % i == 0
            return false
        end
    end
    return true
end

function digital_root(n::Int)::Int
    """Calcula la raíz digital de un número."""
    if n == 0
        return 0
    end
    return 1 + (n - 1) % 9
end

function is_valid_digital_root_for_sophie_germain(p::Int)::Bool
    """
    Verifica si p tiene una raíz digital válida para ser primo de Sophie Germain.
    Basado en nuestro descubrimiento: solo 2, 5, 8 son válidas.
    """
    root = digital_root(p)
    return root ∈ [2, 5, 8]
end

function generate_sophie_germain_candidate(bits::Int)::Int
    """
    Genera un candidato a primo de Sophie Germain con el número de bits especificado.
    Usa el filtro de raíz digital para optimizar la búsqueda.
    """
    while true
        # Generar número aleatorio impar en el rango deseado
        candidate = rand(2^(bits-1):2^bits-1)
        if candidate % 2 == 0
            candidate += 1
        end
        
        # Aplicar filtro de raíz digital ANTES del test de primalidad
        if is_valid_digital_root_for_sophie_germain(candidate)
            return candidate
        end
    end
end

function generate_sophie_germain_prime(bits::Int, max_attempts::Int=10000)::Union{Int, Nothing}
    """
    Genera un primo de Sophie Germain con el número de bits especificado.
    Utiliza optimización basada en raíces digitales.
    """
    attempts = 0
    digital_root_filtered = 0
    primality_tests = 0
    
    while attempts < max_attempts
        attempts += 1
        
        # Generar candidato con raíz digital válida
        candidate = generate_sophie_germain_candidate(bits)
        digital_root_filtered += 1
        
        # Test de primalidad para p
        if is_prime(candidate)
            primality_tests += 1
            
            # Test de primalidad para 2p+1
            if is_prime(2 * candidate + 1)
                println("Primo de Sophie Germain encontrado: $candidate")
                println("Intentos totales: $attempts")
                println("Candidatos filtrados por raíz digital: $digital_root_filtered")
                println("Tests de primalidad realizados: $primality_tests")
                println("Raíz digital de p: $(digital_root(candidate))")
                println("Raíz digital de 2p+1: $(digital_root(2 * candidate + 1))")
                return candidate
            end
        end
    end
    
    println("No se encontró primo de Sophie Germain en $max_attempts intentos")
    return nothing
end

function benchmark_generation_methods(bits::Int, trials::Int=10)
    """
    Compara el método optimizado vs método tradicional.
    """
    println("BENCHMARK: Generación de Primos de Sophie Germain ($bits bits)")
    println("="^60)
    
    # Método optimizado (con filtro de raíz digital)
    println("\nMétodo OPTIMIZADO (con filtro de raíz digital):")
    optimized_times = Float64[]
    optimized_successes = 0
    
    for i in 1:trials
        start_time = time()
        result = generate_sophie_germain_prime(bits, 1000)
        elapsed = time() - start_time
        
        if result !== nothing
            push!(optimized_times, elapsed)
            optimized_successes += 1
            @printf("  Trial %d: %.3f segundos - Primo: %d\n", i, elapsed, result)
        else
            @printf("  Trial %d: FALLÓ\n", i)
        end
    end
    
    # Método tradicional (sin filtro)
    println("\nMétodo TRADICIONAL (sin filtro de raíz digital):")
    traditional_times = Float64[]
    traditional_successes = 0
    
    for i in 1:trials
        start_time = time()
        result = generate_traditional_sophie_germain_prime(bits, 1000)
        elapsed = time() - start_time
        
        if result !== nothing
            push!(traditional_times, elapsed)
            traditional_successes += 1
            @printf("  Trial %d: %.3f segundos - Primo: %d\n", i, elapsed, result)
        else
            @printf("  Trial %d: FALLÓ\n", i)
        end
    end
    
    # Comparar resultados
    println("\nRESULTADOS DEL BENCHMARK:")
    println("-"^40)
    
    if !isempty(optimized_times)
        avg_optimized = mean(optimized_times)
        @printf("Método optimizado - Promedio: %.3f seg, Éxitos: %d/%d\n", 
                avg_optimized, optimized_successes, trials)
    end
    
    if !isempty(traditional_times)
        avg_traditional = mean(traditional_times)
        @printf("Método tradicional - Promedio: %.3f seg, Éxitos: %d/%d\n", 
                avg_traditional, traditional_successes, trials)
        
        if !isempty(optimized_times)
            speedup = avg_traditional / mean(optimized_times)
            @printf("Aceleración: %.2fx más rápido\n", speedup)
        end
    end
end

function generate_traditional_sophie_germain_prime(bits::Int, max_attempts::Int=10000)::Union{Int, Nothing}
    """
    Método tradicional sin optimización de raíz digital (para comparación).
    """
    attempts = 0
    
    while attempts < max_attempts
        attempts += 1
        
        # Generar número aleatorio impar
        candidate = rand(2^(bits-1):2^bits-1)
        if candidate % 2 == 0
            candidate += 1
        end
        
        # Test directo sin filtro de raíz digital
        if is_prime(candidate) && is_prime(2 * candidate + 1)
            return candidate
        end
    end
    
    return nothing
end

function demonstrate_digital_root_filter()
    """
    Demuestra la efectividad del filtro de raíz digital.
    """
    println("DEMOSTRACIÓN DEL FILTRO DE RAÍZ DIGITAL")
    println("="^50)
    
    total_numbers = 100000
    valid_roots = 0
    invalid_roots = 0
    
    println("Analizando $total_numbers números aleatorios...")
    
    for _ in 1:total_numbers
        n = rand(1000:9999)  # Números de 4 dígitos
        
        if is_valid_digital_root_for_sophie_germain(n)
            valid_roots += 1
        else
            invalid_roots += 1
        end
    end
    
    valid_percentage = (valid_roots / total_numbers) * 100
    reduction = (invalid_roots / total_numbers) * 100
    
    println("\nResultados:")
    @printf("  Números con raíz digital válida: %d (%.1f%%)\n", valid_roots, valid_percentage)
    @printf("  Números filtrados: %d (%.1f%%)\n", invalid_roots, reduction)
    @printf("  Reducción del espacio de búsqueda: %.1f%%\n", reduction)
    
    println("\nEsto significa que el filtro elimina aproximadamente 2/3 de los candidatos")
    println("ANTES de realizar los costosos tests de primalidad.")
end

function main()
    """Función principal para demostrar las aplicaciones."""
    println("GENERADOR OPTIMIZADO DE PRIMOS DE SOPHIE GERMAIN")
    println("Basado en el descubrimiento de patrones en raíces digitales")
    println("="^65)
    
    # Demostrar el filtro
    demonstrate_digital_root_filter()
    
    println("\n" * "="^65)
    
    # Generar algunos primos como ejemplo
    println("GENERANDO PRIMOS DE SOPHIE GERMAIN:")
    
    for bits in [16, 20, 24]
        println("\nGenerando primo de $bits bits...")
        result = generate_sophie_germain_prime(bits)
        
        if result !== nothing
            println("✓ Éxito: Primo de Sophie Germain de $bits bits generado")
        else
            println("✗ No se pudo generar en el límite de intentos")
        end
    end
    
    # Benchmark opcional
    print("\n¿Realizar benchmark comparativo? (y/N): ")
    response = readline()
    if lowercase(response) == "y" || lowercase(response) == "yes"
        benchmark_generation_methods(16, 5)
    end
end

if abspath(PROGRAM_FILE) == @__FILE__
    main()
end
