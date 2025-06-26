interface Props {
  /**
   * @description Optional filter parameters for the API request
   */
  limit?: number;
}

export interface AvaliacaoPendente {
  process: number;
  process_candidate: number;
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

    console.log("Fetching URL:", url.toString());

    const response = await fetch(url.toString(), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache",
        // Add any required headers here (authentication, etc.)
      },
    });

    console.log("Response status:", response.status);
    console.log("Response content-type:", response.headers.get("content-type"));

    if (!response.ok) {
      console.error(`Error fetching pending evaluations: ${response.status}`);
      const errorText = await response.text();
      console.error("Error response:", errorText);
      return [];
    }

    const data = await response.json();
    console.log("Full API Response:", data);
    console.log("Evaluations array:", data.evaluations);
    // Return the evaluations array from the API response
    return data.evaluations || [];
  } catch (error) {
    console.error("Error in AvaliacoesPendentesLoader:", error);
    return [];
  }
}

export default loader; 