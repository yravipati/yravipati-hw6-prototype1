import React from 'react';
import {
  Typography,
  FormControl,
  FormLabel,
  FormGroup,
  FormControlLabel,
  Checkbox,
  TextField,
  Box,
  Chip,
  Divider,
} from '@mui/material';
import { useFormContext, Controller } from 'react-hook-form';

const technicalSkills = [
  'Python', 'JavaScript', 'Java', 'C++', 'React', 'Node.js',
  'SQL', 'Data Analysis', 'Machine Learning', 'AWS', 'Git',
  'Excel', 'Tableau', 'R', 'MATLAB', 'Figma', 'Adobe Creative Suite'
];

const softSkills = [
  'Leadership', 'Communication', 'Public Speaking', 'Project Management',
  'Team Collaboration', 'Problem Solving', 'Critical Thinking',
  'Time Management', 'Adaptability', 'Creativity', 'Negotiation',
  'Customer Service', 'Research', 'Writing', 'Presentation Skills'
];

const SkillsStep = () => {
  const { control, watch } = useFormContext();
  const selectedSkills = watch('skills') || [];
  const customSkills = watch('customSkills') || '';

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        What are your skills?
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Select your existing skills and add any custom ones. This helps us match you with relevant opportunities.
      </Typography>

      <Controller
        name="skills"
        control={control}
        render={({ field }) => (
          <FormControl component="fieldset" variant="standard" sx={{ width: '100%' }}>
            <Box sx={{ mb: 3 }}>
              <FormLabel component="legend" sx={{ mb: 2 }}>
                Technical Skills
              </FormLabel>
              <FormGroup>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {technicalSkills.map((skill) => (
                    <FormControlLabel
                      key={skill}
                      control={
                        <Checkbox
                          checked={field.value.includes(skill)}
                          onChange={(e) => {
                            const newValue = e.target.checked
                              ? [...field.value, skill]
                              : field.value.filter((v) => v !== skill);
                            field.onChange(newValue);
                          }}
                          size="small"
                        />
                      }
                      label={skill}
                      sx={{ 
                        mr: 2, 
                        mb: 1,
                        '& .MuiFormControlLabel-label': { fontSize: '0.875rem' }
                      }}
                    />
                  ))}
                </Box>
              </FormGroup>
            </Box>

            <Divider sx={{ my: 2 }} />

            <Box sx={{ mb: 3 }}>
              <FormLabel component="legend" sx={{ mb: 2 }}>
                Soft Skills
              </FormLabel>
              <FormGroup>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {softSkills.map((skill) => (
                    <FormControlLabel
                      key={skill}
                      control={
                        <Checkbox
                          checked={field.value.includes(skill)}
                          onChange={(e) => {
                            const newValue = e.target.checked
                              ? [...field.value, skill]
                              : field.value.filter((v) => v !== skill);
                            field.onChange(newValue);
                          }}
                          size="small"
                        />
                      }
                      label={skill}
                      sx={{ 
                        mr: 2, 
                        mb: 1,
                        '& .MuiFormControlLabel-label': { fontSize: '0.875rem' }
                      }}
                    />
                  ))}
                </Box>
              </FormGroup>
            </Box>
          </FormControl>
        )}
      />

      <Divider sx={{ my: 2 }} />

      <Controller
        name="customSkills"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            fullWidth
            label="Additional Skills"
            placeholder="Enter additional skills separated by commas (e.g., Spanish, Photography, Event Planning)"
            multiline
            rows={2}
            helperText="Add any skills not listed above, separated by commas"
            sx={{ mb: 3 }}
          />
        )}
      />

      {(selectedSkills.length > 0 || customSkills) && (
        <Box>
          <Typography variant="body2" sx={{ mb: 1 }}>
            Your skills:
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {selectedSkills.map((skill) => (
              <Chip
                key={skill}
                label={skill}
                size="small"
                color="primary"
                variant="outlined"
              />
            ))}
            {customSkills && customSkills.split(',').map((skill, index) => {
              const trimmedSkill = skill.trim();
              return trimmedSkill ? (
                <Chip
                  key={`custom-${index}`}
                  label={trimmedSkill}
                  size="small"
                  color="secondary"
                  variant="outlined"
                />
              ) : null;
            })}
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default SkillsStep;
