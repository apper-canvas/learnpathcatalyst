import HomePage from '@/components/pages/HomePage';
import DashboardPage from '@/components/pages/DashboardPage';
import CoursesPage from '@/components/pages/CoursesPage';
import CourseDetailsPage from '@/components/pages/CourseDetailsPage';
import LessonViewerPage from '@/components/pages/LessonViewerPage';
import QuizPage from '@/components/pages/QuizPage';
import ProgressPage from '@/components/pages/ProgressPage';
import SettingsPage from '@/components/pages/SettingsPage';
import NotFoundPage from '@/components/pages/NotFoundPage';

export const routes = {
  home: {
    id: 'home',
label: 'Home',
    path: '/',
    icon: 'Home',
    component: HomePage
  },
  dashboard: {
    id: 'dashboard',
label: 'Dashboard',
    path: '/dashboard',
    icon: 'LayoutDashboard',
    component: DashboardPage
  },
  courses: {
    id: 'courses',
label: 'Courses',
    path: '/courses',
    icon: 'BookOpen',
    component: CoursesPage
  },
  courseDetails: {
    id: 'courseDetails',
label: 'Course Details',
    path: '/courses/:courseId',
    icon: 'BookOpen',
    component: CourseDetailsPage,
    hideFromNav: true
  },
  lessonViewer: {
    id: 'lessonViewer',
label: 'Lesson',
    path: '/courses/:courseId/lessons/:lessonId',
    icon: 'Play',
    component: LessonViewerPage,
    hideFromNav: true
  },
  quizPage: {
    id: 'quizPage',
label: 'Quiz',
    path: '/courses/:courseId/lessons/:lessonId/quiz',
    component: QuizPage,
    hideFromNav: true
  },
  progress: {
    id: 'progress',
    label: 'My Progress',
    path: '/progress',
    icon: 'TrendingUp',
    component: ProgressPage
  },
  settings: {
    id: 'settings',
    label: 'Settings',
    path: '/settings',
    icon: 'Settings',
    component: SettingsPage
  }
};

export const routeArray = Object.values(routes);
export const navRoutes = routeArray.filter(route => !route.hideFromNav);