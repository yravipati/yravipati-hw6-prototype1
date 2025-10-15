import React from 'react';
import {
  Typography,
  Box,
  Card,
  CardContent,
  Chip,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import {
  Work as WorkIcon,
  School as SchoolIcon,
  EmojiObjects as EmojiObjectsIcon,
  Flag as FlagIcon,
} from '@mui/icons-material';

// Import the same options from other steps for display
const careerOptions = [
  { value: 'tech-software', label: 'Tech - Software Engineering' },
  { value: 'tech-data', label: 'Tech - Data Science' },
  { value: 'tech-product', label: 'Tech - Product Management' },
  { value: 'tech-design', label: 'Tech - UX/UI Design' },
  { value: 'finance-ib', label: 'Finance - Investment Banking' },
  { value: 'finance-pe', label: 'Finance - Private Equity' },
  { value: 'finance-trading', label: 'Finance - Trading' },
  { value: 'consulting-strategy', label: 'Consulting - Strategy' },
  { value: 'consulting-tech', label: 'Consulting - Technology' },
  { value: 'consulting-operations', label: 'Consulting - Operations' },
  { value: 'healthcare-clinical', label: 'Healthcare - Clinical' },
  { value: 'healthcare-research', label: 'Healthcare - Research' },
  { value: 'law-corporate', label: 'Law - Corporate' },
  { value: 'law-public', label: 'Law - Public Interest' },
  { value: 'nonprofit', label: 'Non-Profit Organizations' },
  { value: 'government', label: 'Government & Public Policy' },
];

const classYearLabels = {
  freshman: 'Freshman',
  sophomore: 'Sophomore',
  junior: 'Junior',
  senior: 'Senior',
  graduate: 'Graduate Student',
};

const goalLabels = {
  internship: 'Find Internship Opportunities',
  fulltime: 'Full-time Job Search',
  networking: 'Professional Networking',
  exploration: 'Career Exploration',
  skills: 'Skill Development',
  entrepreneurship: 'Entrepreneurship',
};

const ReviewStep = ({ formData }) => {
  const getCareerInterestLabels = (interests) => {
    return interests.map(interest => {
      const option = careerOptions.find(opt => opt.value === interest);
      return option ? option.label : interest;
    });
  };

  const getAllSkills = () => {
    const skills = [...(formData.skills || [])];
    if (formData.customSkills) {
      const customSkillsArray = formData.customSkills
        .split(',')
        .map(skill => skill.trim())
        .filter(skill => skill.length > 0);
      skills.push(...customSkillsArray);
    }
    return skills;
  };

  const getGoalLabels = (goals) => {
    return goals.map(goal => goalLabels[goal] || goal);
  };

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Review Your Profile
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Please review your information before submitting. You can go back to make changes if needed.
      </Typography>

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <List>
            <ListItem>
              <ListItemIcon>
                <WorkIcon color="primary" />
              </ListItemIcon>
              <ListItemText
                primary="Career Interests"
                secondary={
                  <Box sx={{ mt: 1 }}>
                    {getCareerInterestLabels(formData.careerInterests || []).map((interest, index) => (
                      <Chip
                        key={index}
                        label={interest}
                        size="small"
                        color="primary"
                        variant="outlined"
                        sx={{ mr: 1, mb: 1 }}
                      />
                    ))}
                  </Box>
                }
              />
            </ListItem>

            <Divider component="li" />

            <ListItem>
              <ListItemIcon>
                <EmojiObjectsIcon color="secondary" />
              </ListItemIcon>
              <ListItemText
                primary="Skills"
                secondary={
                  <Box sx={{ mt: 1 }}>
                    {getAllSkills().map((skill, index) => (
                      <Chip
                        key={index}
                        label={skill}
                        size="small"
                        color="secondary"
                        variant="outlined"
                        sx={{ mr: 1, mb: 1 }}
                      />
                    ))}
                  </Box>
                }
              />
            </ListItem>

            <Divider component="li" />

            <ListItem>
              <ListItemIcon>
                <SchoolIcon color="info" />
              </ListItemIcon>
              <ListItemText
                primary="Class Year"
                secondary={
                  <Chip
                    label={classYearLabels[formData.classYear] || formData.classYear}
                    size="small"
                    color="info"
                    variant="outlined"
                    sx={{ mt: 1 }}
                  />
                }
              />
            </ListItem>

            <Divider component="li" />

            <ListItem>
              <ListItemIcon>
                <FlagIcon color="success" />
              </ListItemIcon>
              <ListItemText
                primary="Primary Goals"
                secondary={
                  <Box sx={{ mt: 1 }}>
                    {getGoalLabels(formData.goals || []).map((goal, index) => (
                      <Chip
                        key={index}
                        label={goal}
                        size="small"
                        color="success"
                        variant="outlined"
                        sx={{ mr: 1, mb: 1 }}
                      />
                    ))}
                  </Box>
                }
              />
            </ListItem>
          </List>
        </CardContent>
      </Card>

      <Box sx={{ p: 2, backgroundColor: 'primary.50', borderRadius: 1 }}>
        <Typography variant="body2" color="primary.main">
          <strong>Next Steps:</strong> After completing your profile, you'll be able to browse personalized event recommendations based on your interests, skills, and goals.
        </Typography>
      </Box>
    </Box>
  );
};

export default ReviewStep;
