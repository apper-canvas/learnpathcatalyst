const BOOKMARKS_KEY = 'learnpath_bookmarks';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Get bookmarks from localStorage
const getStoredBookmarks = () => {
  try {
    const stored = localStorage.getItem(BOOKMARKS_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Error reading bookmarks from localStorage:', error);
    return [];
  }
};

// Save bookmarks to localStorage
const saveBookmarks = (bookmarks) => {
  try {
    localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(bookmarks));
  } catch (error) {
    console.error('Error saving bookmarks to localStorage:', error);
  }
};

const bookmarkService = {
  async getBookmarks() {
    await delay(200);
    return [...getStoredBookmarks()];
  },

  async toggleBookmark(lessonId, courseId, lessonTitle) {
    await delay(250);
    const bookmarks = getStoredBookmarks();
    const existingIndex = bookmarks.findIndex(b => b.lessonId === lessonId);
    
    if (existingIndex >= 0) {
      // Remove bookmark
      bookmarks.splice(existingIndex, 1);
    } else {
      // Add bookmark
      const newBookmark = {
        id: Date.now().toString(),
        lessonId,
        courseId,
        lessonTitle,
        bookmarkedAt: new Date().toISOString()
      };
      bookmarks.push(newBookmark);
    }
    
    saveBookmarks(bookmarks);
    return [...bookmarks];
  },

  async isBookmarked(lessonId) {
    await delay(100);
    const bookmarks = getStoredBookmarks();
    return bookmarks.some(b => b.lessonId === lessonId);
  },

  async removeBookmark(lessonId) {
    await delay(200);
    const bookmarks = getStoredBookmarks();
    const filtered = bookmarks.filter(b => b.lessonId !== lessonId);
    saveBookmarks(filtered);
    return [...filtered];
  },

  async getBookmarkedLessonsWithCourseInfo() {
    await delay(300);
    const bookmarks = getStoredBookmarks();
    // Return bookmarks with course context for dashboard display
    return bookmarks.map(bookmark => ({
      ...bookmark,
      type: 'bookmark'
    }));
  }
};

export default bookmarkService;