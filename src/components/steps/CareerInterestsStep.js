import React from 'react';
import {
  Typography,
  FormControl,
  FormLabel,
  FormGroup,
  FormControlLabel,
  Checkbox,
  FormHelperText,
  Box,
  Chip,
} from '@mui/material';
import { useFormContext, Controller } from 'react-hook-form';

const careerOptions = [
  { value: 'tech-software', label: 'Tech - Software Engineering', category: 'Technology' },
  { value: 'tech-data', label: 'Tech - Data Science', category: 'Technology' },
  { value: 'tech-product', label: 'Tech - Product Management', category: 'Technology' },
  { value: 'tech-design', label: 'Tech - UX/UI Design', category: 'Technology' },
  { value: 'finance-ib', label: 'Finance - Investment Banking', category: 'Finance' },
  { value: 'finance-pe', label: 'Finance - Private Equity', category: 'Finance' },
  { value: 'finance-trading', label: 'Finance - Trading', category: 'Finance' },
  { value: 'consulting-strategy', label: 'Consulting - Strategy', category: 'Consulting' },
  { value: 'consulting-tech', label: 'Consulting - Technology', category: 'Consulting' },
  { value: 'consulting-operations', label: 'Consulting - Operations', category: 'Consulting' },
  { value: 'healthcare-clinical', label: 'Healthcare - Clinical', category: 'Healthcare' },
  { value: 'healthcare-research', label: 'Healthcare - Research', category: 'Healthcare' },
  { value: 'law-corporate', label: 'Law - Corporate', category: 'Legal' },
  { value: 'law-public', label: 'Law - Public Interest', category: 'Legal' },
  { value: 'nonprofit', label: 'Non-Profit Organizations', category: 'Social Impact' },
  { value: 'government', label: 'Government & Public Policy', category: 'Public Service' },
];

const CareerInterestsStep = () => {
  const { control, formState: { errors } } = useFormContext();

  const groupedOptions = careerOptions.reduce((acc, option) => {
    if (!acc[option.category]) {
      acc[option.category] = [];
    }
    acc[option.category].push(option);
    return acc;
  }, {});

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        What are your career interests?
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Select all industries and roles that interest you. This helps us recommend relevant events.
      </Typography>

      <Controller
        name="careerInterests"
        control={control}
        rules={{
          required: 'Please select at least one career interest',
          validate: (value) => value.length > 0 || 'Please select at least one career interest'
        }}
        render={({ field }) => (
          <FormControl error={!!errors.careerInterests} component="fieldset" variant="standard">
            <FormLabel component="legend">Career Interests *</FormLabel>
            
            {Object.entries(groupedOptions).map(([category, options]) => (
              <Box key={category} sx={{ mb: 2 }}>
                <Typography variant="subtitle2" sx={{ mb: 1, color: 'primary.main' }}>
                  {category}
                </Typography>
                <FormGroup>
                  {options.map((option) => (
                    <FormControlLabel
                      key={option.value}
                      control={
                        <Checkbox
                          checked={field.value.includes(option.value)}
                          onChange={(e) => {
                            const newValue = e.target.checked
                              ? [...field.value, option.value]
                              : field.value.filter((v) => v !== option.value);
                            field.onChange(newValue);
                          }}
                        />
                      }
                      label={option.label}
                    />
                  ))}
                </FormGroup>
              </Box>
            ))}

            {field.value.length > 0 && (
              <Box sx={{ mt: 2 }}>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  Selected interests:
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {field.value.map((interest) => {
                    const option = careerOptions.find(opt => opt.value === interest);
                    return (
                      <Chip
                        key={interest}
                        label={option?.label}
                        size="small"
                        color="primary"
                        variant="outlined"
                      />
                    );
                  })}
                </Box>
              </Box>
            )}

            {errors.careerInterests && (
              <FormHelperText>{errors.careerInterests.message}</FormHelperText>
            )}
          </FormControl>
        )}
      />
    </Box>
  );
};

export default CareerInterestsStep;
