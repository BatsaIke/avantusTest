import { BlueprintGraphResponse } from '../api/types';

export const mockBlueprintGraph: BlueprintGraphResponse = {
  nodes: [
    {
      id: '1',
      type: 'form',
      data: {
        formId: 'formA',
        formName: 'Form A',
        fields: [
          { id: 'email', name: 'Email', type: 'email' },
          { id: 'name', name: 'Name', type: 'text' },
        ],
      },
      position: { x: 100, y: 100 },
    },
    {
      id: '2',
      type: 'form',
      data: {
        formId: 'formB',
        formName: 'Form B',
        fields: [
          { id: 'email', name: 'Email', type: 'email' },
          { id: 'dynamic_checkbox_group', name: 'Checkbox Group', type: 'checkbox' },
          { id: 'dynamic_object', name: 'Dynamic Object', type: 'object' },
        ],
        prefillMappings: {
          email: { sourceFormId: 'formA', sourceFieldId: 'email' },
        },
      },
      position: { x: 400, y: 100 },
    },
  ],
  edges: [
    { id: 'e1-2', source: '1', target: '2' },
  ],
};