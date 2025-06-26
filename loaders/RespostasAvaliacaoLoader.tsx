interface Props {
  /**
   * @description Process candidate ID to fetch responses for
   * @default 30083
   */
  process_candidate: string | number;
}

export interface RespostaAvaliacao {
  id: number;
  created_at: {
    date: string;
    timezone_type: number;
    timezone: string;
  };
  candidate: {
    id: number;
    personal_data: Array<{
      name: string;
      email: string;
      cpf: string;
      [key: string]: unknown;
    }>;
    [key: string]: unknown;
  };
  status: {
    id: number;
    name: string;
  };
  selection_process_name: string;
  selection_process_id: number;
  modules: Array<{
    title: string;
    questions: Array<{
      question: string;
      answer: string;
    }>;
    note: string;
  }>;
  [key: string]: unknown; // Allow for additional fields from API
}

/**
 * @title Visualizar Resposta da Avaliação
 * @description Loader para buscar respostas de uma avaliação específica
 */
async function loader(
  props: Props,
  req: Request,
): Promise<RespostaAvaliacao | null> {
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
      return null;
    }

    const data = await response.json();
    
    // Return the message object from the API response
    return data || null;
  } catch (error) {
    console.error("Error in RespostasAvaliacaoLoader:", error);
    return null;
  }
}

export default loader; 