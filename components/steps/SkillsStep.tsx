'use client';

import { useFormContext, Controller } from 'react-hook-form';
import {
  Box,
  Typography,
  FormControl,
  FormLabel,
  FormGroup,
  FormControlLabel,
  Checkbox,
  TextField,
  Chip,
  Divider,
} from '@mui/material';

const technicalSkills = [
  'Python',
  'JavaScript',
  'Java',
  'C++',
  'React',
  'Node.js',
  'SQL',
  'Data Analysis',
  'Machine Learning',
  'AWS',
  'Git',
  'Excel',
  'Tableau',
  'R',
  'MATLAB',
  'Figma',
  'Adobe Creative Suite',
];

const softSkills = [
  'Leadership',
  'Communication',
  'Public Speaking',
  'Project Management',
  'Team Collaboration',
  'Problem Solving',
  'Critical Thinking',
  'Time Management',
  'Adaptability',
  'Creativity',
  'Negotiation',
  'Customer Service',
  'Research',
  'Writing',
  'Presentation Skills',
];

export default function SkillsStep() {
  const { control, watch } = useFormContext();
  const selectedSkills = watch('skills') || [];
  const customSkills = watch('customSkills') || '';

  return (
    <Box>
      <Typography variant="h5" gutterBottom fontWeight="bold">
        What are your skills?
      </Typography>
      <Typography variant="body2" color="text.secondary" paragraph>
        Select your existing skills and add any custom ones. This helps us match you with relevant
        opportunities.
      </Typography>

      <Controller
        name="skills"
        control={control}
        render={({ field }) => (
          <FormControl component="fieldset" variant="standard" fullWidth>
            <Box sx={{ mb: 3 }}>
              <FormLabel component="legend" sx={{ mb: 2, fontWeight: 'bold' }}>
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
                              : field.value.filter((v: string) => v !== skill);
                            field.onChange(newValue);
                          }}
                          size="small"
                        />
                      }
                      label={<Typography variant="body2">{skill}</Typography>}
                    />
                  ))}
                </Box>
              </FormGroup>
            </Box>

            <Divider sx={{ my: 2 }} />

            <Box sx={{ mb: 3 }}>
              <FormLabel component="legend" sx={{ mb: 2, fontWeight: 'bold' }}>
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
                              : field.value.filter((v: string) => v !== skill);
                            field.onChange(newValue);
                          }}
                          size="small"
                        />
                      }
                      label={<Typography variant="body2">{skill}</Typography>}
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
        <Box sx={{ p: 2, bgcolor: 'success.50', borderRadius: 1 }}>
          <Typography variant="body2" fontWeight="bold" gutterBottom>
            Your skills:
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {selectedSkills.map((skill: string) => (
              <Chip key={skill} label={skill} color="primary" size="small" />
            ))}
            {customSkills &&
              customSkills.split(',').map((skill: string, index: number) => {
                const trimmedSkill = skill.trim();
                return trimmedSkill ? (
                  <Chip key={`custom-${index}`} label={trimmedSkill} color="secondary" size="small" />
                ) : null;
              })}
          </Box>
        </Box>
      )}
    </Box>
  );
}
