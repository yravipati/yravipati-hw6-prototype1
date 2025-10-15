'use client';

import { useFormContext, Controller } from 'react-hook-form';
import {
  Box,
  Typography,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormHelperText,
  Card,
  CardContent,
} from '@mui/material';
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
    description: 'Master&apos;s, PhD, or other graduate program',
    icon: <EmojiPeopleIcon />,
  },
];

export default function ClassYearStep() {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <Box>
      <Typography variant="h5" gutterBottom fontWeight="bold">
        What&apos;s your current class year?
      </Typography>
      <Typography variant="body2" color="text.secondary" paragraph>
        This helps us recommend events appropriate for your academic level and career timeline.
      </Typography>

      <Controller
        name="classYear"
        control={control}
        rules={{ required: 'Please select your class year' }}
        render={({ field }) => (
          <FormControl error={!!errors.classYear} component="fieldset" variant="standard" fullWidth>
            <FormLabel component="legend" sx={{ mb: 2 }}>
              Class Year <Box component="span" color="error.main">*</Box>
            </FormLabel>
            <RadioGroup {...field} sx={{ mt: 2 }}>
              {classYearOptions.map((option) => (
                <Card
                  key={option.value}
                  sx={{
                    mb: 2,
                    cursor: 'pointer',
                    border: 2,
                    borderColor: field.value === option.value ? 'primary.main' : 'divider',
                    bgcolor: field.value === option.value ? 'primary.50' : 'background.paper',
                    '&:hover': {
                      borderColor: 'primary.light',
                      bgcolor: 'action.hover',
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
                          <Box sx={{ mr: 2, color: 'primary.main' }}>{option.icon}</Box>
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
            </RadioGroup>
            {errors.classYear && (
              <FormHelperText>{errors.classYear.message as string}</FormHelperText>
            )}
          </FormControl>
        )}
      />
    </Box>
  );
}
