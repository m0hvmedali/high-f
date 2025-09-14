import { createBrowserRouter } from 'react-router-dom';
import AppLayout from './ui/layout/AppLayout';
import Home from './ui/pages/Home';
import Dashboard from './ui/pages/Dashboard';
import Subject from './ui/pages/Subject';
import Section from './ui/pages/Section';
import Lesson from './ui/pages/Lesson';
import Quiz from './ui/pages/Quiz';
import Settings from './ui/pages/Settings';
import Onboarding from './ui/pages/Onboarding';
import TeacherDashboard from './ui/pages/TeacherDashboard';
import Auth from './ui/pages/Auth';

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'dashboard', element: <Dashboard /> },
      { path: 'subjects/:subjectId', element: <Subject /> },
      { path: 'sections/:sectionId', element: <Section /> },
      { path: 'lessons/:lessonId', element: <Lesson /> },
      { path: 'quiz/:quizId', element: <Quiz /> },
      { path: 'settings', element: <Settings /> },
      { path: 'onboarding', element: <Onboarding /> },
      { path: 'teacher', element: <TeacherDashboard /> },
      { path: 'login', element: <Auth /> }
    ]
  }
]);

export default router;
