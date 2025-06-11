import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import ApperIcon from '../components/ApperIcon';

const NotFound = () => {
  return (
    <div className="min-h-full bg-surface-50 flex items-center justify-center">
      <div className="text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md mx-auto"
        >
          <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-8">
            <ApperIcon name="Search" className="w-12 h-12 text-primary" />
          </div>
          
          <h1 className="text-6xl font-heading font-bold text-surface-900 mb-4">
            404
          </h1>
          
          <h2 className="text-2xl font-heading font-semibold text-surface-700 mb-4">
            Page Not Found
          </h2>
          
          <p className="text-surface-500 mb-8">
            The page you're looking for doesn't exist or has been moved to a different location.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/dashboard"
              className="inline-flex items-center space-x-2 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
            >
              <ApperIcon name="Home" className="w-4 h-4" />
              <span>Go to Dashboard</span>
            </Link>
            
            <Link
              to="/courses"
              className="inline-flex items-center space-x-2 px-6 py-3 bg-surface-100 text-surface-900 rounded-lg hover:bg-surface-200 transition-colors"
            >
              <ApperIcon name="BookOpen" className="w-4 h-4" />
              <span>Browse Courses</span>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFound;