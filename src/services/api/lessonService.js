import lessonsData from '../mockData/lessons.json';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const lessonService = {
  async getAll() {
    await delay(300);
    return [...lessonsData];
  },

  async getById(id) {
    await delay(200);
    const lesson = lessonsData.find(lesson => lesson.id === id);
    if (!lesson) {
      throw new Error('Lesson not found');
    }
    return { ...lesson };
  },

  async getByCourseId(courseId) {
    await delay(250);
    const courseLessons = lessonsData
      .filter(lesson => lesson.courseId === courseId)
      .sort((a, b) => a.order - b.order);
    return [...courseLessons];
  },

  async create(lessonData) {
    await delay(400);
    const newLesson = {
      ...lessonData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };
    lessonsData.push(newLesson);
    return { ...newLesson };
  },

  async update(id, updates) {
    await delay(300);
    const index = lessonsData.findIndex(lesson => lesson.id === id);
    if (index === -1) {
      throw new Error('Lesson not found');
    }
    lessonsData[index] = { ...lessonsData[index], ...updates };
    return { ...lessonsData[index] };
  },

  async delete(id) {
    await delay(300);
    const index = lessonsData.findIndex(lesson => lesson.id === id);
    if (index === -1) {
      throw new Error('Lesson not found');
    }
    const deleted = lessonsData.splice(index, 1)[0];
    return { ...deleted };
  }
};

export default lessonService;