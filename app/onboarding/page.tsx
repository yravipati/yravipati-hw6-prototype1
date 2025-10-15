'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm, FormProvider } from 'react-hook-form';
import {
  Box,
  Container,
  Card,
  CardContent,
  Typography,
  Stepper,
  Step,
  StepLabel,
  Button,
  LinearProgress,
  Alert,
  CircularProgress,
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import CareerInterestsStep from '@/components/steps/CareerInterestsStep';
import SkillsStep from '@/components/steps/SkillsStep';
import ClassYearStep from '@/components/steps/ClassYearStep';
import GoalsStep from '@/components/steps/GoalsStep';
import ReviewStep from '@/components/steps/ReviewStep';

const steps = [
  { id: 0, name: 'Career Interests', component: CareerInterestsStep },
  { id: 1, name: 'Skills', component: SkillsStep },
  { id: 2, name: 'Class Year', component: ClassYearStep },
  { id: 3, name: 'Goals', component: GoalsStep },
  { id: 4, name: 'Review', component: ReviewStep },
];

interface FormData {
  careerInterests: string[];
  skills: string[];
  customSkills: string;
  classYear: string;
  goals: string[];
}

export default function OnboardingPage() {
  const [activeStep, setActiveStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const methods = useForm<FormData>({
    defaultValues: {
      careerInterests: [],
      skills: [],
      customSkills: '',
      classYear: '',
      goals: [],
    },
  });

  const { handleSubmit, trigger, getValues } = methods;

  const handleNext = async () => {
    const isStepValid = await validateCurrentStep();
    if (isStepValid) {
      setActiveStep((prev) => prev + 1);
      setError('');
    }
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
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

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    setError('');

    try {
      const allSkills = [...data.skills];
      if (data.customSkills) {
        const customSkillsArray = data.customSkills
          .split(',')
          .map((skill) => skill.trim())
          .filter((skill) => skill.length > 0);
        allSkills.push(...customSkillsArray);
      }

      const profileData = {
        careerInterests: data.careerInterests,
        skills: allSkills,
        classYear: data.classYear,
        goals: data.goals,
      };

      const response = await fetch('/api/user/profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(profileData),
      });

      const result = await response.json();

      if (result.success) {
        router.push(`/success?profileId=${result.profileId}`);
      } else {
        setError(result.message || 'Failed to save your profile. Please try again.');
      }
    } catch (err) {
      console.error('Submission error:', err);
      setError('An error occurred while saving your profile. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const CurrentStepComponent = steps[activeStep].component;
  const progress = ((activeStep + 1) / steps.length) * 100;

  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: 'background.default',
        py: 4,
      }}
    >
      <Container maxWidth="lg">
        {/* Header */}
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography variant="h3" component="h1" gutterBottom fontWeight="bold">
            Welcome to Eventus!
          </Typography>
          <Typography variant="h6" color="text.secondary">
            Let&apos;s get to know you better so we can recommend the best career events for your
            journey.
          </Typography>
        </Box>

        {/* Progress */}
        <Box sx={{ mb: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="body2" color="text.secondary">
              Step {activeStep + 1} of {steps.length}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {Math.round(progress)}%
            </Typography>
          </Box>
          <LinearProgress variant="determinate" value={progress} sx={{ height: 8, borderRadius: 1 }} />
        </Box>

        {/* Stepper */}
        <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
          {steps.map((step) => (
            <Step key={step.id}>
              <StepLabel>{step.name}</StepLabel>
            </Step>
          ))}
        </Stepper>

        {/* Main Card */}
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Card elevation={3}>
              <CardContent sx={{ p: { xs: 3, md: 6 } }}>
                {error && (
                  <Alert severity="error" sx={{ mb: 3 }}>
                    {error}
                  </Alert>
                )}

                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeStep}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <CurrentStepComponent formData={getValues()} />
                  </motion.div>
                </AnimatePresence>

                {/* Navigation */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4, pt: 3, borderTop: 1, borderColor: 'divider' }}>
                  <Button
                    onClick={handleBack}
                    disabled={activeStep === 0}
                    size="large"
                  >
                    Back
                  </Button>

                  {activeStep === steps.length - 1 ? (
                    <Button
                      type="submit"
                      variant="contained"
                      size="large"
                      disabled={isSubmitting}
                      startIcon={isSubmitting ? <CircularProgress size={20} /> : null}
                    >
                      {isSubmitting ? 'Saving...' : 'Complete Profile'}
                    </Button>
                  ) : (
                    <Button onClick={handleNext} variant="contained" size="large">
                      Next
                    </Button>
                  )}
                </Box>
              </CardContent>
            </Card>
          </form>
        </FormProvider>

        {/* Privacy Notice */}
        <Typography
          variant="body2"
          color="text.secondary"
          align="center"
          sx={{ mt: 3 }}
        >
          Your information is secure and will only be used to personalize your event
          recommendations.
        </Typography>
      </Container>
    </Box>
  );
}
