import axios from 'axios';
import { BlueprintGraphResponse } from './types';

//  Local backend server URL
const API_BASE_URL = 'http://localhost:3000/api/v1';

export const getBlueprintGraph = async (
  tenantId: string,
  actionBlueprintId: string
): Promise<BlueprintGraphResponse> => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/${tenantId}/actions/blueprints/${actionBlueprintId}/graph`,
      {
        headers: { 
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};
