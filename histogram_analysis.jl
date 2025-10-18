#!/usr/bin/env julia
"""
Generación de histogramas para las frecuencias de raíces digitales
en primos de Sophie Germain
"""

using Plots
using Printf
using Dates

function is_prime(n::Int)::Bool
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
    return is_prime(p) && is_prime(2p + 1)
end

function digital_root(n::Int)::Int
    if n == 0
        return 0
    end
    return 1 + (n - 1) % 9
end

function find_sophie_germain_primes(limit::Int)::Vector{Int}
    primes = Int[]
    for p in 2:limit
        if is_sophie_germain_prime(p)
            push!(primes, p)
        end
    end
    return primes
end

function analyze_and_plot_digital_roots(limit::Int=10000)
    """Analiza y crea histogramas de las raíces digitales."""
    
    println("Analizando primos de Sophie Germain hasta $limit...")
    sophie_primes = find_sophie_germain_primes(limit)
    
    # Calcular raíces digitales
    results = []
    root_p_data = Int[]
    root_q_data = Int[]
    
    for p in sophie_primes
        q = 2p + 1
        root_p = digital_root(p)
        root_q = digital_root(q)
        
        push!(results, (p, q, root_p, root_q))
        push!(root_p_data, root_p)
        push!(root_q_data, root_q)
    end
    
    println("Encontrados $(length(sophie_primes)) primos de Sophie Germain")
    
    # Contar frecuencias
    root_p_counts = Dict{Int,Int}()
    root_q_counts = Dict{Int,Int}()
    pair_counts = Dict{Tuple{Int,Int},Int}()
    
    for (p, q, root_p, root_q) in results
        root_p_counts[root_p] = get(root_p_counts, root_p, 0) + 1
        root_q_counts[root_q] = get(root_q_counts, root_q, 0) + 1
        pair_counts[(root_p, root_q)] = get(pair_counts, (root_p, root_q), 0) + 1
    end
    
    # Preparar datos para histogramas
    all_roots = 1:9
    p_frequencies = [get(root_p_counts, i, 0) for i in all_roots]
    q_frequencies = [get(root_q_counts, i, 0) for i in all_roots]
    
    # Crear histogramas
    p1 = bar(all_roots, p_frequencies, 
             title="Frecuencias de Raíces Digitales para p",
             xlabel="Raíz Digital", 
             ylabel="Frecuencia",
             color=:blue,
             alpha=0.7,
             legend=false)
    
    # Agregar etiquetas de valores y porcentajes en las barras
    total_p = sum(p_frequencies)
    for i in 1:9
        if p_frequencies[i] > 0
            percentage = (p_frequencies[i] / total_p) * 100
            label_text = "$(p_frequencies[i])\n($(round(percentage, digits=1))%)"
            annotate!(p1, i, p_frequencies[i] + max(total_p * 0.02, 2), text(label_text, 7, :center))
        end
    end
    
    p2 = bar(all_roots, q_frequencies, 
             title="Frecuencias de Raíces Digitales para 2p+1",
             xlabel="Raíz Digital", 
             ylabel="Frecuencia",
             color=:red,
             alpha=0.7,
             legend=false)
    
    # Agregar etiquetas de valores y porcentajes en las barras
    total_q = sum(q_frequencies)
    for i in 1:9
        if q_frequencies[i] > 0
            percentage = (q_frequencies[i] / total_q) * 100
            label_text = "$(q_frequencies[i])\n($(round(percentage, digits=1))%)"
            annotate!(p2, i, q_frequencies[i] + max(total_q * 0.02, 2), text(label_text, 7, :center))
        end
    end
    
    # Histograma comparativo
    p3 = bar(all_roots .- 0.2, p_frequencies, 
             width=0.4,
             label="p",
             color=:blue,
             alpha=0.7)
    bar!(p3, all_roots .+ 0.2, q_frequencies, 
         width=0.4,
         label="2p+1",
         color=:red,
         alpha=0.7,
         title="Comparación de Frecuencias",
         xlabel="Raíz Digital",
         ylabel="Frecuencia")
    
    # Histograma de pares más comunes
    sorted_pairs = sort(collect(pair_counts), by=x->x[2], rev=true)
    top_pairs = sorted_pairs[1:min(10, length(sorted_pairs))]
    
    pair_labels = ["($(p[1][1]),$(p[1][2]))" for p in top_pairs]
    pair_frequencies = [p[2] for p in top_pairs]
    
    p4 = bar(1:length(pair_labels), pair_frequencies,
             title="Pares de Raíces Digitales Más Comunes",
             xlabel="Pares (p, 2p+1)",
             ylabel="Frecuencia",
             color=:green,
             alpha=0.7,
             legend=false,
             xticks=(1:length(pair_labels), pair_labels),
             xrotation=45)
    
    # Agregar etiquetas de valores y porcentajes
    total_pairs = sum(pair_frequencies)
    for i in 1:length(pair_frequencies)
        percentage = (pair_frequencies[i] / total_pairs) * 100
        label_text = "$(pair_frequencies[i])\n($(round(percentage, digits=1))%)"
        annotate!(p4, i, pair_frequencies[i] + max(total_pairs * 0.02, 1), text(label_text, 6, :center))
    end
    
    # Combinar todos los plots
    combined_plot = plot(p1, p2, p3, p4, 
                        layout=(2,2), 
                        size=(1200, 800),
                        margin=5Plots.mm)
    
    # Guardar el plot
    timestamp = replace(string(Dates.now()), ":" => "-")
    plot_filename = "/home/jonathan/CascadeProjects/sophie-germain-primes/digital_roots_histogram_$(limit).png"
    savefig(combined_plot, plot_filename)
    
    # Mostrar estadísticas
    println("\n" * "="^60)
    println("ESTADÍSTICAS DE RAÍCES DIGITALES")
    println("="^60)
    
    println("\nFrecuencias para p:")
    for i in 1:9
        if p_frequencies[i] > 0
            percentage = (p_frequencies[i] / length(results)) * 100
            @printf("  Raíz %d: %d casos (%.1f%%)\n", i, p_frequencies[i], percentage)
        end
    end
    
    println("\nFrecuencias para 2p+1:")
    for i in 1:9
        if q_frequencies[i] > 0
            percentage = (q_frequencies[i] / length(results)) * 100
            @printf("  Raíz %d: %d casos (%.1f%%)\n", i, q_frequencies[i], percentage)
        end
    end
    
    println("\nPares más comunes:")
    for (i, ((root_p, root_q), count)) in enumerate(top_pairs)
        percentage = (count / length(results)) * 100
        @printf("  %d. (%d,%d): %d casos (%.1f%%)\n", i, root_p, root_q, count, percentage)
    end
    
    # Calcular patrones específicos
    pattern_252 = get(pair_counts, (2, 5), 0) + get(pair_counts, (5, 2), 0)
    pattern_88 = get(pair_counts, (8, 8), 0)
    
    println("\nPatrones específicos:")
    @printf("  Patrón (2,5) + (5,2): %d casos (%.1f%%)\n", pattern_252, (pattern_252/length(results)*100))
    @printf("  Patrón (8,8): %d casos (%.1f%%)\n", pattern_88, (pattern_88/length(results)*100))
    
    # Guardar resultados detallados en archivo de texto
    results_filename = "/home/jonathan/CascadeProjects/sophie-germain-primes/digital_roots_analysis_$(limit).txt"
    open(results_filename, "w") do f
        write(f, "ANÁLISIS COMPLETO DE RAÍCES DIGITALES - PRIMOS DE SOPHIE GERMAIN\n")
        write(f, "Límite de búsqueda: $limit\n")
        write(f, "Total de primos encontrados: $(length(results))\n")
        write(f, "Fecha de análisis: $(Dates.now())\n")
        write(f, "="^80 * "\n\n")
        
        write(f, "TABLA COMPLETA DE RESULTADOS\n")
        write(f, "-"^40 * "\n")
        write(f, "p\t2p+1\traíz(p)\traíz(2p+1)\n")
        write(f, "-"^40 * "\n")
        for (p, q, root_p, root_q) in results
            write(f, "$p\t$q\t$root_p\t$root_q\n")
        end
        
        write(f, "\n\nESTADÍSTICAS DE FRECUENCIAS\n")
        write(f, "="^50 * "\n")
        
        write(f, "\nFrecuencias para p:\n")
        for i in 1:9
            if p_frequencies[i] > 0
                percentage = (p_frequencies[i] / length(results)) * 100
                write(f, "  Raíz $i: $(p_frequencies[i]) casos ($(round(percentage, digits=1))%)\n")
            end
        end
        
        write(f, "\nFrecuencias para 2p+1:\n")
        for i in 1:9
            if q_frequencies[i] > 0
                percentage = (q_frequencies[i] / length(results)) * 100
                write(f, "  Raíz $i: $(q_frequencies[i]) casos ($(round(percentage, digits=1))%)\n")
            end
        end
        
        write(f, "\nPares más comunes:\n")
        for (i, ((root_p, root_q), count)) in enumerate(top_pairs)
            percentage = (count / length(results)) * 100
            write(f, "  $i. ($root_p,$root_q): $count casos ($(round(percentage, digits=1))%)\n")
        end
        
        write(f, "\nPatrones específicos:\n")
        write(f, "  Patrón (2,5) + (5,2): $pattern_252 casos ($(round((pattern_252/length(results)*100), digits=1))%)\n")
        write(f, "  Patrón (8,8): $pattern_88 casos ($(round((pattern_88/length(results)*100), digits=1))%)\n")
    end
    
    println("\nHistograma guardado en: $(plot_filename)")
    println("Resultados detallados guardados en: $(results_filename)")
    
    return combined_plot, results
end

function main()
    println("GENERADOR DE HISTOGRAMAS - RAÍCES DIGITALES")
    println("="^50)
    
    print("Ingrese el límite de búsqueda (por defecto 100000): ")
    input = readline()
    limit = isempty(input) ? 100000 : parse(Int, input)
    
    start_time = time()
    
    plot, results = analyze_and_plot_digital_roots(limit)
    
    elapsed_time = time() - start_time
    @printf("\nTiempo de ejecución: %.2f segundos\n", elapsed_time)
    @printf("Total de primos analizados: %d\n", length(results))
end

if abspath(PROGRAM_FILE) == @__FILE__
    main()
end
