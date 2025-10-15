import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Card,
  CardContent,
  Typography,
  Stepper,
  Step,
  StepLabel,
  Box,
  Button,
  Alert,
  CircularProgress,
} from '@mui/material';
import { useForm, FormProvider } from 'react-hook-form';
import CareerInterestsStep from './steps/CareerInterestsStep';
import SkillsStep from './steps/SkillsStep';
import ClassYearStep from './steps/ClassYearStep';
import GoalsStep from './steps/GoalsStep';
import ReviewStep from './steps/ReviewStep';
import { submitProfile } from '../services/api';

const steps = [
  'Career Interests',
  'Skills',
  'Class Year',
  'Goals',
  'Review'
];

const OnboardingSurvey = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  
  const methods = useForm({
    defaultValues: {
      careerInterests: [],
      skills: [],
      customSkills: '',
      classYear: '',
      goals: []
    }
  });

  const { handleSubmit, trigger, getValues } = methods;

  const handleNext = async () => {
    const isStepValid = await validateCurrentStep();
    if (isStepValid) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
      setError('');
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    setError('');
  };

  const validateCurrentStep = async () => {
    switch (activeStep) {
      case 0:
        return await trigger('careerInterests');
      case 1:
        return await trigger(['skills', 'customSkills']);
      case 2:
        return await trigger('classYear');
      case 3:
        return await trigger('goals');
      default:
        return true;
    }
  };

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setError('');
    
    try {
      // Combine skills arrays
      const allSkills = [...data.skills];
      if (data.customSkills) {
        const customSkillsArray = data.customSkills
          .split(',')
          .map(skill => skill.trim())
          .filter(skill => skill.length > 0);
        allSkills.push(...customSkillsArray);
      }

      const profileData = {
        careerInterests: data.careerInterests,
        skills: allSkills,
        classYear: data.classYear,
        goals: data.goals
      };

      const response = await submitProfile(profileData);
      
      if (response.success) {
        navigate('/success', { state: { profileId: response.profileId } });
      } else {
        setError('Failed to save your profile. Please try again.');
      }
    } catch (err) {
      console.error('Submission error:', err);
      setError('An error occurred while saving your profile. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return <CareerInterestsStep />;
      case 1:
        return <SkillsStep />;
      case 2:
        return <ClassYearStep />;
      case 3:
        return <GoalsStep />;
      case 4:
        return <ReviewStep formData={getValues()} />;
      default:
        return 'Unknown step';
    }
  };

  return (
    <FormProvider {...methods}>
      <Card>
        <CardContent sx={{ p: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom align="center">
            Welcome to Eventus!
          </Typography>
          <Typography variant="body1" color="text.secondary" align="center" sx={{ mb: 4 }}>
            Let's get to know you better so we can recommend the best career events for your journey.
          </Typography>

          <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          <form onSubmit={handleSubmit(onSubmit)}>
            {getStepContent(activeStep)}

            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 3 }}>
              <Button
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                Back
              </Button>
              <Box sx={{ flex: '1 1 auto' }} />
              {activeStep === steps.length - 1 ? (
                <Button
                  type="submit"
                  variant="contained"
                  disabled={isSubmitting}
                  startIcon={isSubmitting ? <CircularProgress size={20} /> : null}
                >
                  {isSubmitting ? 'Saving...' : 'Complete Profile'}
                </Button>
              ) : (
                <Button onClick={handleNext} variant="contained">
                  Next
                </Button>
              )}
            </Box>
          </form>
        </CardContent>
      </Card>
    </FormProvider>
  );
};

export default OnboardingSurvey;
