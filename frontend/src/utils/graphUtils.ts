import { FormEdge, FormNode } from "../api/types";

/**
 * Given current formId, all nodes and all edges,
 * find all forms that are direct or transitive upstream dependencies.
 */
export function findUpstreamForms(
  formId: string,
  nodes: FormNode[],
  edges: FormEdge[]
) {
  const visited = new Set<string>();
  const upstreamFormIds = new Set<string>();

  function dfs(currentId: string) {
    edges.forEach((edge) => {
      if (edge.target === currentId && !visited.has(edge.source)) {
        visited.add(edge.source);
        upstreamFormIds.add(edge.source);
        dfs(edge.source); // Recursively check upstream
      }
    });
  }

  dfs(formId);

  const upstreamForms = nodes.filter((node) => upstreamFormIds.has(node.id));

  return upstreamForms;
}


