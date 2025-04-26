import React, { useState } from 'react';
import { NodeProps, useEdges, useNodes } from 'reactflow';
import { Box, Typography, Button, Paper } from '@mui/material';
import { FormNodeData, PrefillMapping } from '../../api/types';
import { PrefillModal } from '../../PrefillModal/PrefillModal';
import { findUpstreamForms } from '../../utils/graphUtils';

export const FormNode: React.FC<NodeProps<FormNodeData>> = ({ id, data }) => {
  const [open, setOpen] = useState(false);
  const [selectedField, setSelectedField] = useState<string | null>(null);
  const [prefillMappings, setPrefillMappings] = useState<
    Record<string, PrefillMapping> 
  >(data.prefillMappings || {});

  const nodes = useNodes();
  const edges = useEdges();

  const [availableForms, setAvailableForms] = useState<
    Array<{ id: string; name: string; fields: Array<{ id: string; name: string }> }>
  >([]);

  const handleOpenPrefillModal = (fieldId: string) => {
    setSelectedField(fieldId);
    const upstream = findUpstreamForms(id, nodes as any, edges as any);
    const formatted = upstream.map((n) => ({
      id: n.data.formId,
      name: n.data.formName,
      fields: n.data.fields.map((f) => ({ id: f.id, name: f.name })),
    }));
    setAvailableForms(formatted);
    setOpen(true);
  };

  const handleClosePrefillModal = () => {
    setOpen(false);
    setSelectedField(null);
  };

  const handleSavePrefill = (mapping: PrefillMapping) => {
    if (selectedField) {
      setPrefillMappings((prev) => ({ ...prev, [selectedField]: mapping }));
    }
    handleClosePrefillModal();
  };

  const handleClearPrefill = (fieldId: string) => {
    setPrefillMappings((prev) => {
      const next = { ...prev };
      delete next[fieldId];
      return next;
    });
  };

  return (
    <Paper elevation={3} sx={{ p: 2, minWidth: 250 }}>
      <Typography variant="h6" gutterBottom>
        {data.formName || 'Untitled Form'}
      </Typography>

      <Box>
        <Typography variant="subtitle2" gutterBottom>
          Fields:
        </Typography>

        {data.fields?.length ? (
          data.fields.map((field) => (
            <Box
              key={field.id}
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                mb: 1,
              }}
            >
              <Typography variant="body2">
                {field.name} ({field.type})
              </Typography>
              <Box>
                {prefillMappings[field.id] ? (
                  <>
                    <Typography variant="caption">
                      {prefillMappings[field.id].sourceFormId}.
                      {prefillMappings[field.id].sourceFieldId}
                    </Typography>
                    <Button size="small" onClick={() => handleClearPrefill(field.id)}>
                      ×
                    </Button>
                  </>
                ) : (
                  <Button size="small" onClick={() => handleOpenPrefillModal(field.id)}>
                    MAP
                  </Button>
                )}
              </Box>
            </Box>
          ))
        ) : (
          <Typography variant="body2" color="textSecondary">
            No fields available
          </Typography>
        )}
      </Box>

      {selectedField && (
        <PrefillModal
          open={open}
          onClose={handleClosePrefillModal}
          onSave={handleSavePrefill}
          currentFormId={data.formId}
          availableForms={availableForms}
          initialMapping={prefillMappings[selectedField]}
        />
      )}
    </Paper>
  );
};
