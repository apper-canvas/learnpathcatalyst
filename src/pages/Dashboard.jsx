import { motion } from 'framer-motion';
import MainFeature from '../components/MainFeature';

const Dashboard = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-full bg-surface-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-heading font-bold text-surface-900 mb-2">
            Welcome back, Learning Explorer! 👋
          </h1>
          <p className="text-surface-600">
            Continue your learning journey and track your progress.
          </p>
        </div>
        
        <MainFeature />
      </div>
    </motion.div>
  );
};

export default Dashboard;