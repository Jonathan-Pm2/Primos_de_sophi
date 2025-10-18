#!/usr/bin/env julia
"""
Análisis de primos de Sophie Germain en Julia
Implementación optimizada para búsqueda de patrones en raíces primitivas
"""

using Printf
using Plots

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

function mod_exp(base::Int, exp::Int, mod::Int)::Int
    """Exponenciación modular eficiente."""
    result = 1
    base = base % mod
    while exp > 0
        if exp % 2 == 1
            result = (result * base) % mod
        end
        exp = exp ÷ 2
        base = (base * base) % mod
    end
    return result
end

function find_primitive_root(p::Int)::Union{Int, Nothing}
    """Encuentra la raíz primitiva más pequeña módulo p."""
    if !is_prime(p)
        return nothing
    end
    
    phi = p - 1
    factors = Int[]
    n = phi
    
    # Factorizar phi = p-1
    for i in 2:isqrt(n)
        if n % i == 0
            push!(factors, i)
            while n % i == 0
                n ÷= i
            end
        end
    end
    if n > 1
        push!(factors, n)
    end
    
    # Buscar raíz primitiva
    for g in 2:(p-1)
        is_primitive = true
        for factor in factors
            if mod_exp(g, phi ÷ factor, p) == 1
                is_primitive = false
                break
            end
        end
        if is_primitive
            return g
        end
    end
    
    return nothing
end

function analyze_sophie_germain_patterns(limit::Int=1000)::Vector{Tuple{Int,Int,Int,Int}}
    """Analiza patrones en primos de Sophie Germain y sus raíces primitivas."""
    results = Tuple{Int,Int,Int,Int}[]
    sophie_primes = find_sophie_germain_primes(limit)
    
    println("Encontrados $(length(sophie_primes)) primos de Sophie Germain hasta $limit")
    println("\nAnalizando raíces primitivas...")
    
    for p in sophie_primes
        q = 2p + 1
        root_p = find_primitive_root(p)
        root_q = find_primitive_root(q)
        
        if root_p !== nothing && root_q !== nothing
            push!(results, (p, q, root_p, root_q))
            @printf("p=%3d, 2p+1=%4d, raíz(p)=%d, raíz(2p+1)=%d\n", p, q, root_p, root_q)
        end
    end
    
    return results
end

function analyze_root_patterns(results::Vector{Tuple{Int,Int,Int,Int}})
    """Analiza los patrones en las raíces primitivas."""
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
    println("ANÁLISIS DE PATRONES")
    println("="^50)
    
    println("\nFrecuencias de raíces primitivas para p:")
    for (root, count) in sort(collect(root_p_counts))
        percentage = (count / length(results)) * 100
        @printf("  %d: %d veces (%.1f%%)\n", root, count, percentage)
    end
    
    println("\nFrecuencias de raíces primitivas para 2p+1:")
    for (root, count) in sort(collect(root_q_counts))
        percentage = (count / length(results)) * 100
        @printf("  %d: %d veces (%.1f%%)\n", root, count, percentage)
    end
    
    println("\nPares de raíces más comunes:")
    sorted_pairs = sort(collect(pair_counts), by=x->x[2], rev=true)
    for ((root_p, root_q), count) in sorted_pairs
        percentage = (count / length(results)) * 100
        @printf("  (%d, %d): %d veces (%.1f%%)\n", root_p, root_q, count, percentage)
    end
end

function plot_patterns_julia(results::Vector{Tuple{Int,Int,Int,Int}})
    """Crea visualizaciones usando Plots.jl."""
    if isempty(results)
        return
    end
    
    p_values = [r[1] for r in results]
    root_p_values = [r[3] for r in results]
    root_q_values = [r[4] for r in results]
    
    # Crear subplots
    p1 = plot(1:length(p_values), p_values, 
              title="Primos de Sophie Germain", 
              xlabel="Índice", ylabel="Valor de p",
              marker=:circle, markersize=3, linewidth=1)
    
    p2 = scatter(1:length(root_p_values), root_p_values,
                title="Raíces primitivas de p",
                xlabel="Índice", ylabel="Raíz primitiva de p",
                markersize=4, alpha=0.7)
    
    p3 = scatter(1:length(root_q_values), root_q_values,
                title="Raíces primitivas de 2p+1",
                xlabel="Índice", ylabel="Raíz primitiva de 2p+1",
                markersize=4, alpha=0.7)
    
    p4 = scatter(root_p_values, root_q_values,
                title="Correlación entre raíces",
                xlabel="Raíz primitiva de p", ylabel="Raíz primitiva de 2p+1",
                markersize=6, alpha=0.6)
    
    # Combinar plots
    combined_plot = plot(p1, p2, p3, p4, layout=(2,2), size=(800, 600))
    
    # Guardar
    savefig(combined_plot, "/home/jonathan/CascadeProjects/sophie-germain-primes/patterns_julia.png")
    
    return combined_plot
end

function extended_search(max_limit::Int=10000)
    """Búsqueda extendida para encontrar más patrones."""
    println("BÚSQUEDA EXTENDIDA DE PATRONES")
    println("="^40)
    
    all_results = Tuple{Int,Int,Int,Int}[]
    step_size = 1000
    
    for limit in step_size:step_size:max_limit
        println("\nBuscando hasta $limit...")
        results = analyze_sophie_germain_patterns(limit)
        
        if !isempty(results)
            # Solo agregar nuevos resultados
            new_results = filter(r -> r[1] > (limit - step_size), results)
            append!(all_results, new_results)
            
            println("Nuevos primos encontrados: $(length(new_results))")
            println("Total acumulado: $(length(all_results))")
        end
    end
    
    if !isempty(all_results)
        analyze_root_patterns(all_results)
        
        # Guardar resultados extendidos
        open("/home/jonathan/CascadeProjects/sophie-germain-primes/extended_results.txt", "w") do f
            write(f, "Búsqueda extendida de primos de Sophie Germain\n")
            write(f, "="^50 * "\n\n")
            write(f, "p\t2p+1\traíz(p)\traíz(2p+1)\n")
            write(f, "-"^40 * "\n")
            for (p, q, root_p, root_q) in all_results
                write(f, "$p\t$q\t$root_p\t$root_q\n")
            end
        end
        
        println("\nResultados extendidos guardados en 'extended_results.txt'")
    end
    
    return all_results
end

function main()
    """Función principal."""
    println("ANÁLISIS DE PRIMOS DE SOPHIE GERMAIN (Julia)")
    println("="^45)
    
    print("Ingrese el límite de búsqueda (por defecto 1000): ")
    input = readline()
    limit = isempty(input) ? 1000 : parse(Int, input)
    
    # Medir tiempo
    start_time = time()
    
    # Análisis básico
    results = analyze_sophie_germain_patterns(limit)
    
    if !isempty(results)
        analyze_root_patterns(results)
        
        # Intentar crear gráficos
        try
            plot_patterns_julia(results)
            println("\nGráficos guardados en 'patterns_julia.png'")
        catch e
            println("\nError creando gráficos: $e")
            println("Instale Plots.jl con: using Pkg; Pkg.add(\"Plots\")")
        end
        
        # Guardar resultados
        open("/home/jonathan/CascadeProjects/sophie-germain-primes/results_julia.txt", "w") do f
            write(f, "Primos de Sophie Germain y sus raíces primitivas (Julia)\n")
            write(f, "="^55 * "\n\n")
            write(f, "p\t2p+1\traíz(p)\traíz(2p+1)\n")
            write(f, "-"^40 * "\n")
            for (p, q, root_p, root_q) in results
                write(f, "$p\t$q\t$root_p\t$root_q\n")
            end
        end
        
        println("\nResultados guardados en 'results_julia.txt'")
        
        # Preguntar si hacer búsqueda extendida
        print("\n¿Realizar búsqueda extendida? (y/N): ")
        response = readline()
        if lowercase(response) == "y" || lowercase(response) == "yes"
            print("Límite máximo para búsqueda extendida (por defecto 10000): ")
            ext_input = readline()
            max_limit = isempty(ext_input) ? 10000 : parse(Int, ext_input)
            extended_search(max_limit)
        end
    end
    
    elapsed_time = time() - start_time
    @printf("\nTiempo de ejecución: %.2f segundos\n", elapsed_time)
end

# Ejecutar si es el script principal
if abspath(PROGRAM_FILE) == @__FILE__
    main()
end
