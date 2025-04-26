export interface BlueprintGraphResponse {
    nodes: FormNode[];
    edges: FormEdge[];
  }
  
  export interface FormNodeData {
    formId: string;
    formName: string;
    fields: FormField[];
    prefillMappings?: Record<string, PrefillMapping>;
  }
  
  export interface FormNode {
    id: string;
    type: 'form';
    data: FormNodeData;
    position: { x: number; y: number };
  } 
  
  export interface FormEdge {
    id: string;
    source: string;
    target: string;
  }
  
  export interface FormField {
    id: string;
    name: string;
    type: string;
  }
  
  export interface PrefillMapping {
    sourceFormId: string;
    sourceFieldId: string;
  }