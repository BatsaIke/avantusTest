import {  FormNode, FormEdge } from '../api/types';

export function normalizeBlueprintGraph(rawData: any): { nodes: FormNode[]; edges: FormEdge[] } {
  const formMap = Object.fromEntries(
    (rawData.forms || []).map((form: any) => [form.id, form])
  );

  const nodes: FormNode[] = (rawData.nodes || []).map((node: any) => {
    const form = formMap[node.data.component_id];

    const fields =
      form && form.field_schema?.properties
        ? Object.entries(form.field_schema.properties).map(
            ([fieldId, fieldDef]: [string, any]) => ({
              id: fieldId,
              name: fieldDef.title || fieldId,
              type: fieldDef.type || 'text',
            })
          )
        : [];

    return {
      id: node.id,
      type: 'form',
      position: node.position,
      data: {
        formId: node.data.component_id,
        formName: node.data.name || 'Untitled Form',
        fields,
        prefillMappings: {}, 
      },
    };
  });

  const edges: FormEdge[] = (rawData.edges || []).map((edge: any) => ({
    id: `${edge.source}-${edge.target}`,
    source: edge.source,
    target: edge.target,
  }));

  return { nodes, edges };
}
