/**
 * Função responsável por formatar datas
 * vindas da API do TMDB
 *
 * Exemplo:
 * 2025-10-15 -> 15/10/2025
 */

export function formatDate(date) {

    // Verifica se a data existe
    if (!date) {
        return "Data indisponível";
    }

    /**
     * Converte para o formato brasileiro
     */
    return new Date(date).toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "long",
        year: "numeric",
    });
}
