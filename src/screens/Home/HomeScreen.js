import React, { useContext } from 'react';
import UserContext from '../../contexts/userContext';
import EmployerHome from './EmployerHome';
import CandidateStack from '../Candidate/CandidateStack';

export default function HomeScreen() {
  const { user, logout } = useContext(UserContext);

  const isEmployer = user?.role === 'EMPLOYER';

  if (isEmployer) {
    return <EmployerHome user={user} onLogout={logout} />;
  }

  return <CandidateStack />;
}