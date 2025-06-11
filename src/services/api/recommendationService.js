// Service for generating course recommendations based on user progress
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

class RecommendationService {
  async getRecommendations(userProgress = [], allCourses = []) {
    await delay(300);
    
    if (!userProgress.length || !allCourses.length) {
      return [];
    }

    // Get completed course IDs
    const completedCourseIds = userProgress.map(p => p.courseId);
    const completedCourses = allCourses.filter(course => 
      completedCourseIds.includes(course.id)
    );

    // Get user's completed categories and average difficulty level
    const completedCategories = [...new Set(completedCourses.map(c => c.category))];
    const difficultyLevels = { beginner: 1, intermediate: 2, advanced: 3 };
    const userDifficultyLevel = Math.max(
      ...completedCourses.map(c => difficultyLevels[c.difficulty] || 1)
    );

    // Filter available courses (exclude already enrolled/completed)
    const availableCourses = allCourses.filter(course => 
      !completedCourseIds.includes(course.id)
    );

    // Generate recommendations with scoring
    const recommendations = availableCourses.map(course => {
      let score = 0;
      
      // Same category bonus
      if (completedCategories.includes(course.category)) {
        score += 0.5;
      }
      
      // Progressive difficulty bonus
      const courseDifficulty = difficultyLevels[course.difficulty] || 1;
      if (courseDifficulty === userDifficultyLevel) {
        score += 0.3; // Same level
      } else if (courseDifficulty === userDifficultyLevel + 1) {
        score += 0.6; // Next level up
      } else if (courseDifficulty === userDifficultyLevel - 1) {
        score += 0.2; // Review level
      }
      
      // Popular courses bonus (simulate based on lesson count)
      if (course.totalLessons >= 15) {
        score += 0.2;
      }
      
      // Tag matching bonus (if course has related tags)
      if (course.tags) {
        const matchingTags = course.tags.filter(tag => 
          completedCourses.some(cc => cc.tags?.includes(tag))
        );
        score += matchingTags.length * 0.1;
      }
      
      return {
        ...course,
        recommendationScore: score,
        reason: this.getRecommendationReason(course, completedCategories, userDifficultyLevel)
      };
    });

    // Sort by score and return top 5
    return recommendations
      .sort((a, b) => b.recommendationScore - a.recommendationScore)
      .slice(0, 5);
  }

  getRecommendationReason(course, completedCategories, userLevel) {
    const difficultyLevels = { beginner: 1, intermediate: 2, advanced: 3 };
    const courseDifficulty = difficultyLevels[course.difficulty] || 1;
    
    if (completedCategories.includes(course.category)) {
      if (courseDifficulty > userLevel) {
        return "Next level in your learning path";
      } else if (courseDifficulty === userLevel) {
        return "Perfect match for your current level";
      } else {
        return "Strengthen your foundation";
      }
    } else {
      return "Expand your knowledge into new areas";
    }
  }
}

export default new RecommendationService();