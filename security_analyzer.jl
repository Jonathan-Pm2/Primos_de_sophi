#!/usr/bin/env julia
"""
Analizador de Seguridad en Tiempo Real
Utiliza el patrón de raíces digitales para evaluar la seguridad de primos
en sistemas criptográficos en tiempo real
"""

using Printf
using Dates

struct SecurityReport
    prime::Int
    is_valid::Bool
    digital_root::Int
    is_sophie_germain::Bool
    security_level::String
    confidence::Float64
    recommendations::Vector{String}
    timestamp::DateTime
end

function digital_root(n::Int)::Int
    if n == 0
        return 0
    end
    return 1 + (n - 1) % 9
end

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

function analyze_prime_security(p::Int)::SecurityReport
    """
    Analiza la seguridad de un primo basado en el patrón de raíces digitales.
    """
    root = digital_root(p)
    valid_roots = Set([2, 5, 8])
    is_sg = is_sophie_germain_prime(p)
    recommendations = String[]
    
    # Determinar validez basada en raíz digital
    is_valid = root ∈ valid_roots
    
    # Calcular nivel de confianza
    confidence = 0.0
    security_level = "DESCONOCIDO"
    
    if !is_prime(p)
        security_level = "INVÁLIDO"
        confidence = 0.0
        push!(recommendations, "El número no es primo")
    elseif !is_valid
        security_level = "SOSPECHOSO"
        confidence = 0.1
        push!(recommendations, "Raíz digital no sigue el patrón esperado")
        push!(recommendations, "Verificar origen del primo")
    elseif is_sg
        # Primo de Sophie Germain con raíz digital válida
        security_level = "EXCELENTE"
        confidence = 0.95
        push!(recommendations, "Primo de Sophie Germain válido")
        push!(recommendations, "Ideal para aplicaciones criptográficas")
    else
        # Primo regular con raíz digital válida
        security_level = "BUENO"
        confidence = 0.75
        push!(recommendations, "Primo válido con raíz digital esperada")
        push!(recommendations, "Aceptable para uso criptográfico")
    end
    
    # Verificar tamaño
    bit_length = ndigits(p, base=2)
    if bit_length < 512
        security_level = "INSEGURO"
        confidence *= 0.5
        push!(recommendations, "Tamaño insuficiente para seguridad moderna")
    elseif bit_length < 1024
        push!(recommendations, "Considerar usar primos más grandes")
    end
    
    return SecurityReport(
        p, is_valid, root, is_sg, security_level, 
        confidence, recommendations, now()
    )
end

function batch_security_analysis(primes::Vector{Int})::Vector{SecurityReport}
    """Analiza múltiples primos en lote."""
    return [analyze_prime_security(p) for p in primes]
end

function generate_security_dashboard(reports::Vector{SecurityReport})
    """Genera un dashboard de seguridad."""
    println("DASHBOARD DE SEGURIDAD CRIPTOGRÁFICA")
    println(repeat("=", 60))
    println("Basado en patrones de raíces digitales en primos de Sophie Germain")
    println()
    
    # Estadísticas generales
    total = length(reports)
    valid_count = sum(r.is_valid for r in reports)
    sg_count = sum(r.is_sophie_germain for r in reports)
    
    println("RESUMEN EJECUTIVO:")
    @printf("  Total de primos analizados: %d\n", total)
    @printf("  Primos con patrón válido: %d (%.1f%%)\n", valid_count, valid_count/total*100)
    @printf("  Primos de Sophie Germain: %d (%.1f%%)\n", sg_count, sg_count/total*100)
    
    # Distribución por nivel de seguridad
    security_levels = Dict{String, Int}()
    for report in reports
        level = report.security_level
        security_levels[level] = get(security_levels, level, 0) + 1
    end
    
    println("\nDISTRIBUCIÓN POR NIVEL DE SEGURIDAD:")
    for (level, count) in sort(collect(security_levels), by=x->x[2], rev=true)
        percentage = count / total * 100
        @printf("  %-12s: %3d casos (%.1f%%)\n", level, count, percentage)
    end
    
    # Distribución de raíces digitales
    root_distribution = Dict{Int, Int}()
    for report in reports
        root = report.digital_root
        root_distribution[root] = get(root_distribution, root, 0) + 1
    end
    
    println("\nDISTRIBUCIÓN DE RAÍCES DIGITALES:")
    for root in sort(collect(keys(root_distribution)))
        count = root_distribution[root]
        percentage = count / total * 100
        status = root ∈ [2, 5, 8] ? "✓" : "⚠"
        @printf("  %s Raíz %d: %3d casos (%.1f%%)\n", status, root, count, percentage)
    end
    
    # Alertas de seguridad
    println("\nALERTAS DE SEGURIDAD:")
    alerts = filter(r -> r.security_level ∈ ["SOSPECHOSO", "INVÁLIDO", "INSEGURO"], reports)
    
    if isempty(alerts)
        println("  ✓ No se detectaron problemas de seguridad")
    else
        for alert in alerts
            @printf("  ⚠ Primo %d: %s (Confianza: %.1f%%)\n", 
                   alert.prime, alert.security_level, alert.confidence*100)
        end
    end
    
    # Recomendaciones principales
    println("\nRECOMENDACIONES PRINCIPALES:")
    all_recommendations = String[]
    for report in reports
        append!(all_recommendations, report.recommendations)
    end
    
    # Contar frecuencia de recomendaciones
    rec_count = Dict{String, Int}()
    for rec in all_recommendations
        rec_count[rec] = get(rec_count, rec, 0) + 1
    end
    
    # Mostrar top 5 recomendaciones
    top_recs = sort(collect(rec_count), by=x->x[2], rev=true)[1:min(5, length(rec_count))]
    for (i, (rec, count)) in enumerate(top_recs)
        @printf("  %d. %s (%d casos)\n", i, rec, count)
    end
end

function real_time_monitoring_demo()
    """Demostración de monitoreo en tiempo real."""
    println("MONITOREO DE SEGURIDAD EN TIEMPO REAL")
    println(repeat("=", 50))
    
    # Simular flujo de primos en tiempo real
    test_primes = [
        1009, 1013, 1019, 1021, 1031, 1033,  # Primos de Sophie Germain
        1009, 1013, 1019, 1021, 1031, 1033,  # Primos regulares
        1007, 1009, 1013, 1019, 1021, 1031,  # Mezcla
        15, 21, 25, 35, 49, 51, 77, 91        # Números compuestos (para testing)
    ]
    
    reports = SecurityReport[]
    
    println("Analizando primos en tiempo real...")
    println(repeat("-", 50))
    
    for (i, p) in enumerate(test_primes)
        report = analyze_prime_security(p)
        push!(reports, report)
        
        # Mostrar análisis individual
        status_icon = if report.security_level == "EXCELENTE"
            "🟢"
        elseif report.security_level == "BUENO"
            "🟡"
        elseif report.security_level == "SOSPECHOSO"
            "🟠"
        else
            "🔴"
        end
        
        @printf("%s %4d | Nivel: %-12s | Confianza: %5.1f%% | Raíz: %d\n", 
               status_icon, p, report.security_level, report.confidence*100, report.digital_root)
        
        # Simular delay de tiempo real
        sleep(0.1)
    end
    
    println("\n" * repeat("=", 60))
    generate_security_dashboard(reports)
end

function export_security_report(reports::Vector{SecurityReport}, filename::String)
    """Exporta el reporte de seguridad a un archivo."""
    open(filename, "w") do f
        write(f, "REPORTE DE SEGURIDAD CRIPTOGRÁFICA\n")
        write(f, "Generado: $(now())\n")
        write(f, "Basado en patrones de raíces digitales\n")
        write(f, repeat("=", 60) * "\n\n")
        
        write(f, "ANÁLISIS DETALLADO:\n")
        write(f, repeat("-", 40) * "\n")
        write(f, "Primo\tNivel\tConfianza\tRaíz\tSophie Germain\tRecomendaciones\n")
        
        for report in reports
            sg_status = report.is_sophie_germain ? "Sí" : "No"
            recs = join(report.recommendations, "; ")
            write(f, "$(report.prime)\t$(report.security_level)\t$(round(report.confidence*100, digits=1))%\t$(report.digital_root)\t$(sg_status)\t$(recs)\n")
        end
        
        write(f, "\nESTADÍSTICAS RESUMIDAS:\n")
        write(f, repeat("-", 30) * "\n")
        
        total = length(reports)
        valid_count = sum(r.is_valid for r in reports)
        sg_count = sum(r.is_sophie_germain for r in reports)
        
        write(f, "Total analizado: $total\n")
        write(f, "Patrones válidos: $valid_count ($(round(valid_count/total*100, digits=1))%)\n")
        write(f, "Primos Sophie Germain: $sg_count ($(round(sg_count/total*100, digits=1))%)\n")
    end
    
    println("Reporte exportado a: $filename")
end

function main()
    """Función principal del analizador de seguridad."""
    println("ANALIZADOR DE SEGURIDAD CRIPTOGRÁFICA")
    println("Utiliza el descubrimiento de patrones en raíces digitales")
    println(repeat("=", 65))
    
    # Ejecutar demostración
    real_time_monitoring_demo()
    
    # Exportar reporte
    test_primes = [1009, 1013, 1019, 1021, 1031, 1033, 1039, 1049, 1051, 1061]
    reports = batch_security_analysis(test_primes)
    
    filename = "/home/jonathan/CascadeProjects/sophie-germain-primes/security_report_$(Dates.format(now(), "yyyy-mm-dd_HH-MM")).txt"
    export_security_report(reports, filename)
end

if abspath(PROGRAM_FILE) == @__FILE__
    main()
end
