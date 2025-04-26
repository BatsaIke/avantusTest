import React, { useState } from 'react';
import {
  Modal,
  Box,
  Typography,
  Button,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Divider,
  SelectChangeEvent, 
} from '@mui/material';

interface PrefillModalProps {
  open: boolean; 
  onClose: () => void;
  onSave: (mapping: { sourceFormId: string; sourceFieldId: string }) => void;
  currentFormId: string;
  availableForms: Array<{
    id: string;
    name: string;
    fields: Array<{ id: string; name: string }>;
  }>;
  initialMapping?: { sourceFormId: string; sourceFieldId: string };
}

export const PrefillModal: React.FC<PrefillModalProps> = ({
  open,
  onClose,
  onSave,
  currentFormId,
  availableForms,
  initialMapping,
}) => {
  const [selectedForm, setSelectedForm] = useState(
    initialMapping?.sourceFormId || ''
  );
  const [selectedField, setSelectedField] = useState(
    initialMapping?.sourceFieldId || ''
  );

  const handleFormChange = (event: SelectChangeEvent<string>) => {
    setSelectedForm(event.target.value as string);
    setSelectedField('');
  };

  const handleFieldChange = (event: SelectChangeEvent<string>) => {
    setSelectedField(event.target.value as string);
  };

  const handleSave = () => {
    if (selectedForm && selectedField) {
      onSave({
        sourceFormId: selectedForm,
        sourceFieldId: selectedField,
      });
    }
  };

  const selectedFormFields =
    availableForms.find((form) => form.id === selectedForm)?.fields || [];

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography variant="h6" gutterBottom>
          Select data element to map
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          Available data
        </Typography>
        <Divider sx={{ my: 2 }} />
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>Source Form</InputLabel>
          <Select
            value={selectedForm}
            onChange={handleFormChange}
            label="Source Form"
          >
            {availableForms
              .filter((form) => form.id !== currentFormId)
              .map((form) => (
                <MenuItem key={form.id} value={form.id}>
                  {form.name}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>Source Field</InputLabel>
          <Select
            value={selectedField}
            onChange={handleFieldChange}
            label="Source Field"
            disabled={!selectedForm}
          >
            {selectedFormFields.map((field) => (
              <MenuItem key={field.id} value={field.id}>
                {field.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
          <Button onClick={onClose} sx={{ mr: 1 }}>
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleSave}
            disabled={!selectedForm || !selectedField}
          >
            Save
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};