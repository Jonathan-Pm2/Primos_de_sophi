#!/usr/bin/env julia
"""
Análisis de raíces digitales en primos de Sophie Germain
La raíz digital es la suma iterativa de dígitos hasta obtener un solo dígito.
"""

using Printf

function is_prime(n::Int)::Bool
    """Verifica si un número es primo."""
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

function is_sophie_germain_prime(p::Int)::Bool
    """Verifica si p es un primo de Sophie Germain."""
    return is_prime(p) && is_prime(2p + 1)
end

function digital_root(n::Int)::Int
    """
    Calcula la raíz digital de un número.
    La raíz digital es la suma iterativa de dígitos hasta obtener un solo dígito.
    Equivale a: n mod 9, pero si el resultado es 0 y n > 0, entonces es 9.
    """
    if n == 0
        return 0
    end
    return 1 + (n - 1) % 9
end

function find_sophie_germain_primes(limit::Int)::Vector{Int}
    """Encuentra todos los primos de Sophie Germain hasta el límite."""
    primes = Int[]
    for p in 2:limit
        if is_sophie_germain_prime(p)
            push!(primes, p)
        end
    end
    return primes
end

function analyze_digital_roots(limit::Int=1000)::Vector{Tuple{Int,Int,Int,Int}}
    """Analiza las raíces digitales de los primos de Sophie Germain."""
    sophie_primes = find_sophie_germain_primes(limit)
    
    println("ANÁLISIS DE RAÍCES DIGITALES - PRIMOS DE SOPHIE GERMAIN")
    println("="^60)
    println("Encontrados $(length(sophie_primes)) primos de Sophie Germain hasta $limit")
    println()
    
    results = Tuple{Int,Int,Int,Int}[]
    
    # Crear tabla como en el documento original
    println("p\t2p+1\traíz(p)\traíz(2p+1)")
    println("-"^40)
    
    for p in sophie_primes
        q = 2p + 1
        root_p = digital_root(p)
        root_q = digital_root(q)
        
        push!(results, (p, q, root_p, root_q))
        @printf("%d\t%d\t%d\t%d\n", p, q, root_p, root_q)
    end
    
    return results
end

function analyze_digital_root_patterns(results::Vector{Tuple{Int,Int,Int,Int}})
    """Analiza los patrones en las raíces digitales."""
    root_p_counts = Dict{Int,Int}()
    root_q_counts = Dict{Int,Int}()
    pair_counts = Dict{Tuple{Int,Int},Int}()
    
    for (p, q, root_p, root_q) in results
        # Contar frecuencias
        root_p_counts[root_p] = get(root_p_counts, root_p, 0) + 1
        root_q_counts[root_q] = get(root_q_counts, root_q, 0) + 1
        pair_counts[(root_p, root_q)] = get(pair_counts, (root_p, root_q), 0) + 1
    end
    
    println("\n" * "="^50)
    println("ANÁLISIS DE PATRONES EN RAÍCES DIGITALES")
    println("="^50)
    
    println("\nFrecuencias de raíces digitales para p:")
    for root in sort(collect(keys(root_p_counts)))
        count = root_p_counts[root]
        percentage = (count / length(results)) * 100
        @printf("  %d: %d veces (%.1f%%)\n", root, count, percentage)
    end
    
    println("\nFrecuencias de raíces digitales para 2p+1:")
    for root in sort(collect(keys(root_q_counts)))
        count = root_q_counts[root]
        percentage = (count / length(results)) * 100
        @printf("  %d: %d veces (%.1f%%)\n", root, count, percentage)
    end
    
    println("\nPares de raíces más comunes:")
    sorted_pairs = sort(collect(pair_counts), by=x->x[2], rev=true)
    for ((root_p, root_q), count) in sorted_pairs
        percentage = (count / length(results)) * 100
        @printf("  (%d, %d): %d veces (%.1f%%)\n", root_p, root_q, count, percentage)
    end
    
    # Verificar el patrón específico observado en la tabla original
    pattern_252 = get(pair_counts, (2, 5), 0) + get(pair_counts, (5, 2), 0)
    pattern_88 = get(pair_counts, (8, 8), 0)
    
    println("\nPatrones específicos observados:")
    @printf("  Patrón (2,5) + (5,2): %d casos (%.1f%%)\n", pattern_252, (pattern_252/length(results)*100))
    @printf("  Patrón (8,8): %d casos (%.1f%%)\n", pattern_88, (pattern_88/length(results)*100))
    
    return root_p_counts, root_q_counts, pair_counts
end

function compare_with_original_table()
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
    
    println("\n" * "="^60)
    println("COMPARACIÓN CON TABLA ORIGINAL")
    println("="^60)
    
    println("\nVerificando cálculos de raíces digitales:")
    println("p\t2p+1\tTabla\tCalculado\tCoincide")
    println("-"^50)
    
    matches = 0
    total = 0
    
    for (p, q, orig_root_p, orig_root_q) in original_data
        calc_root_p = digital_root(p)
        calc_root_q = digital_root(q)
        
        match_p = calc_root_p == orig_root_p ? "✓" : "✗"
        match_q = calc_root_q == orig_root_q ? "✓" : "✗"
        
        if calc_root_p == orig_root_p && calc_root_q == orig_root_q
            matches += 1
        end
        total += 1
        
        @printf("%d\t%d\t(%d,%d)\t(%d,%d)\t%s%s\n", p, q, orig_root_p, orig_root_q, calc_root_p, calc_root_q, match_p, match_q)
    end
    
    @printf("\nCoincidencias: %d/%d (%.1f%%)\n", matches, total, (matches/total*100))
end

function extended_digital_root_search(max_limit::Int=10000)
    """Búsqueda extendida de patrones en raíces digitales."""
    println("BÚSQUEDA EXTENDIDA DE PATRONES EN RAÍCES DIGITALES")
    println("="^50)
    
    all_results = Tuple{Int,Int,Int,Int}[]
    step_size = 2000
    
    for limit in step_size:step_size:max_limit
        println("\nBuscando hasta $limit...")
        results = analyze_digital_roots(limit)
        
        if !isempty(results)
            # Solo agregar nuevos resultados
            new_results = filter(r -> r[1] > (limit - step_size), results)
            append!(all_results, new_results)
            
            println("Nuevos primos encontrados: $(length(new_results))")
            println("Total acumulado: $(length(all_results))")
        end
    end
    
    if !isempty(all_results)
        analyze_digital_root_patterns(all_results)
        
        # Guardar resultados extendidos
        open("/home/jonathan/CascadeProjects/sophie-germain-primes/extended_digital_roots.txt", "w") do f
            write(f, "Búsqueda extendida de raíces digitales en primos de Sophie Germain\n")
            write(f, "="^65 * "\n\n")
            write(f, "p\t2p+1\traíz_digital(p)\traíz_digital(2p+1)\n")
            write(f, "-"^50 * "\n")
            for (p, q, root_p, root_q) in all_results
                write(f, "$p\t$q\t$root_p\t$root_q\n")
            end
        end
        
        println("\nResultados extendidos guardados en 'extended_digital_roots.txt'")
    end
    
    return all_results
end

function main()
    """Función principal."""
    println("ANÁLISIS DE RAÍCES DIGITALES EN PRIMOS DE SOPHIE GERMAIN (Julia)")
    println("="^65)
    
    print("Ingrese el límite de búsqueda (por defecto 1000): ")
    input = readline()
    limit = isempty(input) ? 1000 : parse(Int, input)
    
    # Medir tiempo
    start_time = time()
    
    # Análisis básico
    results = analyze_digital_roots(limit)
    
    if !isempty(results)
        analyze_digital_root_patterns(results)
        
        # Comparar con tabla original
        compare_with_original_table()
        
        # Guardar resultados
        open("/home/jonathan/CascadeProjects/sophie-germain-primes/digital_roots_julia.txt", "w") do f
            write(f, "Análisis de raíces digitales en primos de Sophie Germain (Julia)\n")
            write(f, "="^65 * "\n\n")
            write(f, "p\t2p+1\traíz_digital(p)\traíz_digital(2p+1)\n")
            write(f, "-"^50 * "\n")
            for (p, q, root_p, root_q) in results
                write(f, "$p\t$q\t$root_p\t$root_q\n")
            end
        end
        
        println("\nResultados guardados en 'digital_roots_julia.txt'")
        
        # Preguntar si hacer búsqueda extendida
        print("\n¿Realizar búsqueda extendida hasta 1000,000? (y/N): ")
        response = readline()
        if lowercase(response) == "y" || lowercase(response) == "yes"
            extended_digital_root_search(1000000)
        end
    end
    
    elapsed_time = time() - start_time
    @printf("\nTiempo de ejecución: %.2f segundos\n", elapsed_time)
end

# Ejecutar si es el script principal
if abspath(PROGRAM_FILE) == @__FILE__
    main()
end
