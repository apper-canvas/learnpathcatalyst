import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import ApperIcon from '../components/ApperIcon';

const Home = () => {
  return (
    <div className="min-h-full bg-gradient-to-br from-primary/5 to-secondary/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="w-20 h-20 bg-gradient-to-br from-primary to-primary/80 rounded-2xl flex items-center justify-center mx-auto mb-8">
            <ApperIcon name="GraduationCap" className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-4xl md:text-6xl font-heading font-bold text-surface-900 mb-6">
            Welcome to <span className="text-primary">LearnPath</span>
          </h1>
          <p className="text-xl text-surface-600 max-w-3xl mx-auto mb-8">
            Master new skills through interactive video lessons, engaging quizzes, and personalized progress tracking.
            Start your learning journey today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/dashboard"
              className="inline-flex items-center space-x-2 px-8 py-4 bg-primary text-white rounded-xl hover:bg-primary/90 transition-all duration-200 hover:scale-105 shadow-lg"
            >
              <ApperIcon name="Play" className="w-5 h-5" />
              <span className="font-semibold">Start Learning</span>
            </Link>
            <Link
              to="/courses"
              className="inline-flex items-center space-x-2 px-8 py-4 bg-white text-surface-900 rounded-xl hover:bg-surface-50 transition-all duration-200 hover:scale-105 shadow-lg border border-surface-200"
            >
              <ApperIcon name="BookOpen" className="w-5 h-5" />
              <span className="font-semibold">Browse Courses</span>
            </Link>
          </div>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {[
            {
              icon: 'Video',
              title: 'Interactive Video Lessons',
              description: 'Learn with high-quality video content designed for maximum engagement and retention.',
              color: 'from-primary to-primary/80'
            },
            {
              icon: 'Brain',
              title: 'Knowledge Quizzes',
              description: 'Test your understanding with interactive quizzes and get instant feedback on your progress.',
              color: 'from-secondary to-secondary/80'
            },
            {
              icon: 'TrendingUp',
              title: 'Progress Tracking',
              description: 'Monitor your learning journey with detailed analytics and achievement badges.',
              color: 'from-accent to-accent/80'
            }
          ].map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className="bg-white rounded-xl p-8 shadow-card hover:shadow-card-hover transition-all duration-200"
            >
              <div className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center mb-6`}>
                <ApperIcon name={feature.icon} className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-heading font-bold text-surface-900 mb-4">
                {feature.title}
              </h3>
              <p className="text-surface-600 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Subject Categories */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="text-center"
        >
          <h2 className="text-3xl font-heading font-bold text-surface-900 mb-8">
            Learn Across Multiple Subjects
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: 'Languages', name: 'Languages', count: '12 courses' },
              { icon: 'Code', name: 'Programming', count: '18 courses' },
              { icon: 'Calculator', name: 'Mathematics', count: '15 courses' },
              { icon: 'Palette', name: 'Design', count: '9 courses' }
            ].map((category, index) => (
              <motion.div
                key={category.name}
                whileHover={{ scale: 1.05 }}
                className="bg-white rounded-xl p-6 shadow-card hover:shadow-card-hover transition-all duration-200 cursor-pointer"
              >
                <div className="w-12 h-12 bg-surface-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <ApperIcon name={category.icon} className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-surface-900 mb-1">{category.name}</h3>
                <p className="text-sm text-surface-500">{category.count}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Home;