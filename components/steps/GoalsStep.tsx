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
  FormHelperText,
  Card,
  CardContent,
  Chip,
} from '@mui/material';
import {
  Work as WorkIcon,
  BusinessCenter as BusinessCenterIcon,
  People as PeopleIcon,
  Explore as ExploreIcon,
  TrendingUp as TrendingUpIcon,
  School as SchoolIcon,
} from '@mui/icons-material';

const goalOptions = [
  {
    value: 'internship',
    label: 'Find Internship Opportunities',
    description: 'Looking for summer or part-time internships',
    icon: <SchoolIcon />,
    color: 'primary',
  },
  {
    value: 'fulltime',
    label: 'Full-time Job Search',
    description: 'Seeking full-time employment after graduation',
    icon: <WorkIcon />,
    color: 'secondary',
  },
  {
    value: 'networking',
    label: 'Professional Networking',
    description: 'Build connections in my field of interest',
    icon: <PeopleIcon />,
    color: 'success',
  },
  {
    value: 'exploration',
    label: 'Career Exploration',
    description: 'Learn about different career paths and industries',
    icon: <ExploreIcon />,
    color: 'info',
  },
  {
    value: 'skills',
    label: 'Skill Development',
    description: 'Develop new skills and enhance existing ones',
    icon: <TrendingUpIcon />,
    color: 'warning',
  },
  {
    value: 'entrepreneurship',
    label: 'Entrepreneurship',
    description: 'Start my own business or join a startup',
    icon: <BusinessCenterIcon />,
    color: 'error',
  },
];

export default function GoalsStep() {
  const {
    control,
    formState: { errors },
    watch,
  } = useFormContext();
  const selectedGoals = watch('goals') || [];

  return (
    <Box>
      <Typography variant="h5" gutterBottom fontWeight="bold">
        What are your primary goals?
      </Typography>
      <Typography variant="body2" color="text.secondary" paragraph>
        Select all that apply. This helps us prioritize the most relevant events for you.
      </Typography>

      <Controller
        name="goals"
        control={control}
        rules={{
          required: 'Please select at least one goal',
          validate: (value) => value.length > 0 || 'Please select at least one goal',
        }}
        render={({ field }) => (
          <FormControl error={!!errors.goals} component="fieldset" variant="standard" fullWidth>
            <FormLabel component="legend" sx={{ mb: 2 }}>
              Primary Goals <Box component="span" color="error.main">*</Box>
            </FormLabel>
            <FormGroup sx={{ mt: 2 }}>
              {goalOptions.map((option) => (
                <Card
                  key={option.value}
                  sx={{
                    mb: 2,
                    cursor: 'pointer',
                    border: 2,
                    borderColor: field.value.includes(option.value) ? `${option.color}.main` : 'divider',
                    bgcolor: field.value.includes(option.value) ? `${option.color}.50` : 'background.paper',
                    '&:hover': {
                      borderColor: `${option.color}.light`,
                      bgcolor: 'action.hover',
                    },
                  }}
                  onClick={() => {
                    const newValue = field.value.includes(option.value)
                      ? field.value.filter((v: string) => v !== option.value)
                      : [...field.value, option.value];
                    field.onChange(newValue);
                  }}
                >
                  <CardContent sx={{ py: 2 }}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={field.value.includes(option.value)}
                          onChange={(e) => {
                            const newValue = e.target.checked
                              ? [...field.value, option.value]
                              : field.value.filter((v: string) => v !== option.value);
                            field.onChange(newValue);
                          }}
                          color={option.color as any}
                        />
                      }
                      label={
                        <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                          <Box sx={{ mr: 2, color: `${option.color}.main` }}>{option.icon}</Box>
                          <Box>
                            <Typography variant="subtitle1" component="div" fontWeight="bold">
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
                        '& .MuiFormControlLabel-label': { width: '100%' },
                      }}
                    />
                  </CardContent>
                </Card>
              ))}
            </FormGroup>

            {selectedGoals.length > 0 && (
              <Box sx={{ mt: 2, p: 2, bgcolor: 'secondary.50', borderRadius: 1 }}>
                <Typography variant="body2" fontWeight="bold" gutterBottom>
                  Selected goals:
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {selectedGoals.map((goalValue: string) => {
                    const option = goalOptions.find((opt) => opt.value === goalValue);
                    return (
                      <Chip
                        key={goalValue}
                        label={option?.label}
                        color={option?.color as any}
                        size="small"
                      />
                    );
                  })}
                </Box>
              </Box>
            )}

            {errors.goals && <FormHelperText>{errors.goals.message as string}</FormHelperText>}
          </FormControl>
        )}
      />
    </Box>
  );
}
