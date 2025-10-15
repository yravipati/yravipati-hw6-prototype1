import React from 'react';
import {
  Typography,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormHelperText,
  Box,
  Card,
  CardContent,
} from '@mui/material';
import { useFormContext, Controller } from 'react-hook-form';
import {
  School as SchoolIcon,
  MenuBook as MenuBookIcon,
  Psychology as PsychologyIcon,
  WorkspacePremium as WorkspacePremiumIcon,
  EmojiPeople as EmojiPeopleIcon,
} from '@mui/icons-material';

const classYearOptions = [
  {
    value: 'freshman',
    label: 'Freshman',
    description: 'First year undergraduate student',
    icon: <SchoolIcon />,
  },
  {
    value: 'sophomore',
    label: 'Sophomore',
    description: 'Second year undergraduate student',
    icon: <MenuBookIcon />,
  },
  {
    value: 'junior',
    label: 'Junior',
    description: 'Third year undergraduate student',
    icon: <PsychologyIcon />,
  },
  {
    value: 'senior',
    label: 'Senior',
    description: 'Fourth year undergraduate student',
    icon: <WorkspacePremiumIcon />,
  },
  {
    value: 'graduate',
    label: 'Graduate Student',
    description: 'Master\'s, PhD, or other graduate program',
    icon: <EmojiPeopleIcon />,
  },
];

const ClassYearStep = () => {
  const { control, formState: { errors } } = useFormContext();

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        What's your current class year?
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        This helps us recommend events appropriate for your academic level and career timeline.
      </Typography>

      <Controller
        name="classYear"
        control={control}
        rules={{ required: 'Please select your class year' }}
        render={({ field }) => (
          <FormControl error={!!errors.classYear} component="fieldset" variant="standard">
            <FormLabel component="legend">Class Year *</FormLabel>
            <RadioGroup
              {...field}
              sx={{ mt: 2 }}
            >
              {classYearOptions.map((option) => (
                <Card
                  key={option.value}
                  sx={{
                    mb: 2,
                    cursor: 'pointer',
                    border: field.value === option.value ? 2 : 1,
                    borderColor: field.value === option.value ? 'primary.main' : 'divider',
                    '&:hover': {
                      borderColor: 'primary.light',
                      backgroundColor: 'action.hover',
                    },
                  }}
                  onClick={() => field.onChange(option.value)}
                >
                  <CardContent sx={{ py: 2 }}>
                    <FormControlLabel
                      value={option.value}
                      control={<Radio />}
                      label={
                        <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                          <Box sx={{ mr: 2, color: 'primary.main' }}>
                            {option.icon}
                          </Box>
                          <Box>
                            <Typography variant="subtitle1" component="div">
                              {option.label}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              {option.description}
                            </Typography>
                          </Box>
                        </Box>
                      }
                      sx={{ 
                        m: 0, 
                        width: '100%',
                        '& .MuiFormControlLabel-label': { width: '100%' }
                      }}
                    />
                  </CardContent>
                </Card>
              ))}
            </RadioGroup>
            {errors.classYear && (
              <FormHelperText>{errors.classYear.message}</FormHelperText>
            )}
          </FormControl>
        )}
      />
    </Box>
  );
};

export default ClassYearStep;
