import React, { useContext } from 'react';
import UserContext from '../../contexts/userContext';
import CandidateStack from '../Candidate/CandidateStack';
import EmployerNavigator from '../Employer/EmployerNavigator';

export default function HomeScreen() {
  const { user } = useContext(UserContext);

  const isEmployer = user?.role === 'EMPLOYER';

  if (isEmployer) {
    return <EmployerNavigator />;
  }

  return <CandidateStack />;
}