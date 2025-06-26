interface Props {
  /**
   * @description Process ID to fetch details for
   * @default 93
   */
  process: string | number;
}

export interface ProcessoSeletivo {
  id: string | number;
  titulo: string;
  descricao?: string;
  data_inicio?: string;
  data_fim?: string;
  status?: string;
  empresa?: string;
  vaga?: string;
  requisitos?: string[];
  etapas?: Array<{
    id: string | number;
    nome: string;
    descricao?: string;
    ordem?: number;
    status?: string;
  }>;
  candidatos?: Array<{
    id: string | number;
    nome: string;
    email?: string;
    status?: string;
  }>;
  [key: string]: unknown; // Allow for additional fields from API
}

/**
 * @title Visualizar Detalhes do Processo Seletivo
 * @description Loader para buscar detalhes de um processo seletivo específico
 */
async function loader(
  props: Props,
  req: Request,
): Promise<ProcessoSeletivo | null> {
  try {
    const processId = props.process || 93;
    const url = `https://api2-sus.novo.org.br/api/v1/deco/processo-seletivo/${processId}`;

    console.log("Fetching URL:", url);

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache",
        // Add any required headers here (authentication, etc.)
      },
    });

    console.log("Response status:", response.status);

    if (!response.ok) {
      console.error(`Error fetching process details: ${response.status}`);
      const errorText = await response.text();
      console.error("Error response:", errorText);
      return null;
    }

    const data = await response.json();
    console.log("API Response data:", data);
    // Return the data object
    return data;
  } catch (error) {
    console.error("Error in ProcessoSeletivoLoader:", error);
    return null;
  }
}

export default loader; 