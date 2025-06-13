import coursesData from '../mockData/courses.json';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const courseService = {
  async getAll() {
    await delay(300);
    return [...coursesData];
  },

  async getById(id) {
    await delay(200);
    const course = coursesData.find(course => course.id === id);
    if (!course) {
      throw new Error('Course not found');
    }
    return { ...course };
  },

  async create(courseData) {
    await delay(400);
    const newCourse = {
      ...courseData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };
    coursesData.push(newCourse);
    return { ...newCourse };
  },

  async update(id, updates) {
    await delay(300);
    const index = coursesData.findIndex(course => course.id === id);
    if (index === -1) {
      throw new Error('Course not found');
    }
    coursesData[index] = { ...coursesData[index], ...updates };
    return { ...coursesData[index] };
  },

async delete(id) {
    await delay(300);
    const index = coursesData.findIndex(course => course.id === id);
    if (index === -1) {
      throw new Error('Course not found');
    }
    const deleted = coursesData.splice(index, 1)[0];
    return { ...deleted };
  },

  async enrollInCourse(courseId, userId = 'current-user') {
    await delay(300);
    const course = coursesData.find(course => course.id === courseId);
    if (!course) {
      throw new Error('Course not found');
    }
    
    // In a real app, this would update enrollment status in a separate enrollment service
    // For now, we'll just return success to simulate enrollment
    return {
      success: true,
      courseId,
      userId,
      enrolledAt: new Date().toISOString(),
      message: 'Successfully enrolled in course'
    };
  }
};

export default courseService;