import { orderedCourses } from './courses';
// Compatibility adapter for the existing map and workbench components.
export const categories = orderedCourses.map(course => ({
  id: course.id, n: String(course.order).padStart(2, '0'), title: course.title,
  en: course.en, formula: course.formula, text: course.description, tags: course.topics,
}));
