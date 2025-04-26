import { useEffect, useState } from 'react';
import { getBlueprintGraph } from '../api/clients';
import { BlueprintGraphResponse } from '../api/types';
import { normalizeBlueprintGraph } from '../utils/normalizeBlueprintGraph';

export const useBlueprintGraph = (tenantId: string, actionBlueprintId: string) => {
  const [data, setData] = useState<BlueprintGraphResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => { 
      try {
        const rawData = await getBlueprintGraph(tenantId, actionBlueprintId);
        const normalizedData = normalizeBlueprintGraph(rawData);
        setData(normalizedData);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [tenantId, actionBlueprintId]);

  return { data, loading, error };
};
