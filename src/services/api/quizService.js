import quizzesData from '../mockData/quizzes.json';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const quizService = {
  async getAll() {
    await delay(300);
    return [...quizzesData];
  },

  async getById(id) {
    await delay(200);
    const quiz = quizzesData.find(quiz => quiz.id === id);
    if (!quiz) {
      throw new Error('Quiz not found');
    }
    return { ...quiz };
  },
async getByLessonId(lessonId) {
    await delay(250);
    const quiz = quizzesData.find(quiz => quiz.lessonId === lessonId);
    if (!quiz) {
      throw new Error('Quiz not found for this lesson');
    }
    return { ...quiz };
  },

  async getByCourseId(courseId) {
    await delay(250);
    const quiz = quizzesData.find(quiz => quiz.courseId === courseId);
    if (!quiz) {
      throw new Error('Quiz not found for this course');
    }
    return { ...quiz };
  },

  async create(quizData) {
    await delay(400);
    const newQuiz = {
      ...quizData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };
    quizzesData.push(newQuiz);
    return { ...newQuiz };
  },

  async update(id, updates) {
    await delay(300);
    const index = quizzesData.findIndex(quiz => quiz.id === id);
    if (index === -1) {
      throw new Error('Quiz not found');
    }
    quizzesData[index] = { ...quizzesData[index], ...updates };
    return { ...quizzesData[index] };
  },

  async delete(id) {
    await delay(300);
    const index = quizzesData.findIndex(quiz => quiz.id === id);
    if (index === -1) {
      throw new Error('Quiz not found');
    }
    const deleted = quizzesData.splice(index, 1)[0];
    return { ...deleted };
  }
};

export default quizService;