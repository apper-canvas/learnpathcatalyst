import Home from '../pages/Home';
import Dashboard from '../pages/Dashboard';
import Courses from '../pages/Courses';
import CourseDetails from '../pages/CourseDetails';
import LessonViewer from '../pages/LessonViewer';
import QuizPage from '../pages/QuizPage';
import Progress from '../pages/Progress';
import Settings from '../pages/Settings';
import NotFound from '../pages/NotFound';

export const routes = {
  home: {
    id: 'home',
    label: 'Home',
    path: '/',
    icon: 'Home',
    component: Home
  },
  dashboard: {
    id: 'dashboard',
    label: 'Dashboard',
    path: '/dashboard',
    icon: 'LayoutDashboard',
    component: Dashboard
  },
  courses: {
    id: 'courses',
    label: 'Courses',
    path: '/courses',
    icon: 'BookOpen',
    component: Courses
  },
  courseDetails: {
    id: 'courseDetails',
    label: 'Course Details',
    path: '/courses/:courseId',
    icon: 'BookOpen',
    component: CourseDetails,
    hideFromNav: true
  },
  lessonViewer: {
    id: 'lessonViewer',
    label: 'Lesson',
    path: '/courses/:courseId/lessons/:lessonId',
    icon: 'Play',
    component: LessonViewer,
    hideFromNav: true
  },
  quizPage: {
    id: 'quizPage',
    label: 'Quiz',
    path: '/courses/:courseId/lessons/:lessonId/quiz',
    icon: 'FileQuestion',
    component: QuizPage,
    hideFromNav: true
  },
  progress: {
    id: 'progress',
    label: 'My Progress',
    path: '/progress',
    icon: 'TrendingUp',
    component: Progress
  },
  settings: {
    id: 'settings',
    label: 'Settings',
    path: '/settings',
    icon: 'Settings',
    component: Settings
  }
};

export const routeArray = Object.values(routes);
export const navRoutes = routeArray.filter(route => !route.hideFromNav);