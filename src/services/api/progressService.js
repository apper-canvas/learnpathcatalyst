import progressData from '../mockData/progress.json';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const progressService = {
  async getAll() {
    await delay(300);
    return [...progressData];
  },

  async getById(id) {
    await delay(200);
    const progress = progressData.find(p => p.id === id);
    if (!progress) {
      throw new Error('Progress not found');
    }
    return { ...progress };
  },

  async getByCourseId(courseId) {
    await delay(250);
    const courseProgress = progressData.find(p => p.courseId === courseId);
    if (!courseProgress) {
      return null; // No progress found for this course
    }
    return { ...courseProgress };
  },

async create(newProgressData) {
    await delay(400);
    const newProgress = {
      ...newProgressData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };
    progressData.push(newProgress);
    return { ...newProgress };
  },

  async update(courseId, updates) {
    await delay(300);
    const index = progressData.findIndex(p => p.courseId === courseId);
    if (index === -1) {
      throw new Error('Progress not found');
    }
    progressData[index] = { ...progressData[index], ...updates };
    return { ...progressData[index] };
  },

  async delete(courseId) {
    await delay(300);
    const index = progressData.findIndex(p => p.courseId === courseId);
    if (index === -1) {
      throw new Error('Progress not found');
    }
    const deleted = progressData.splice(index, 1)[0];
    return { ...deleted };
  }
};

export default progressService;