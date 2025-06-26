interface Props {
  /**
   * @description Process candidate ID to fetch responses for
   * @default 30083
   */
  process_candidate: string | number;
}

export interface RespostaAvaliacao {
  id: string | number;
  process_candidate_id: string | number;
  pergunta_id?: string | number;
  pergunta?: string;
  resposta?: string;
  nota?: number;
  comentario?: string;
  data_resposta?: string;
  avaliador?: string;
  [key: string]: unknown; // Allow for additional fields from API
}

export type RespostasAvaliacao = RespostaAvaliacao[];

/**
 * @title Visualizar Resposta da Avaliação
 * @description Loader para buscar respostas de uma avaliação específica
 */
export default async function loader(
  props: Props,
  req: Request,
): Promise<RespostasAvaliacao> {
  try {
    const processCandidate = props.process_candidate || 30083;
    const url = `https://api2-sus.novo.org.br/api/v1/deco/respostas/${processCandidate}`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // Add any required headers here (authentication, etc.)
      },
    });

    if (!response.ok) {
      console.error(`Error fetching evaluation responses: ${response.status}`);
      return [];
    }

    const data = await response.json();
    
    // Return the data array or transform it as needed
    return Array.isArray(data) ? data : data.data || [];
  } catch (error) {
    console.error("Error in RespostasAvaliacaoLoader:", error);
    return [];
  }
} 