interface Props {
  /**
   * @description Optional filter parameters for the API request
   */
  limit?: number;
}

export interface AvaliacaoPendente {
  id: string | number;
  processo_seletivo_id: string | number;
  candidato_id: string | number;
  nome_candidato?: string;
  email_candidato?: string;
  titulo_processo?: string;
  data_criacao?: string;
  status?: string;
  [key: string]: unknown; // Allow for additional fields from API
}

export type AvaliacoesPendentes = AvaliacaoPendente[];

/**
 * @title Listar Avaliações Pendentes
 * @description Loader para buscar avaliações pendentes do sistema ATS
 */
async function loader(
  props: Props,
  req: Request,
): Promise<AvaliacoesPendentes> {
  try {
    const url = new URL("https://api2-sus.novo.org.br/api/v1/deco/avaliacoes-pendentes");
    
    // Add limit parameter if provided
    if (props.limit) {
      url.searchParams.set("limit", props.limit.toString());
    }

    const response = await fetch(url.toString(), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // Add any required headers here (authentication, etc.)
      },
    });

    if (!response.ok) {
      console.error(`Error fetching pending evaluations: ${response.status}`);
      return [];
    }

    const data = await response.json();
    
    // Return the data array or transform it as needed
    return Array.isArray(data) ? data : data.data || [];
  } catch (error) {
    console.error("Error in AvaliacoesPendentesLoader:", error);
    return [];
  }
}

export default loader; 