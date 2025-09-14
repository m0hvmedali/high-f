export type ID = string;

export interface Profile {
  id: ID;
  role: 'student' | 'teacher' | 'admin';
  full_name?: string;
  avatar_url?: string;
  created_at?: string;
}

export interface Subject {
  id: ID;
  title: string;
  description?: string;
  icon?: string;
  published: boolean;
  last_updated: string;
}

export interface Section {
  id: ID;
  subject_id: ID;
  title: string;
  order_index: number;
  published: boolean;
  last_updated: string;
}

export type MediaType = 'video' | 'audio' | 'pdf' | 'image' | 'hls';

export interface Lesson {
  id: ID;
  section_id: ID;
  title: string;
  summary?: string;
  order_index: number;
  published: boolean;
  last_updated: string;
}

export interface MediaAsset {
  id: ID;
  lesson_id: ID;
  type: MediaType;
  url: string;
  caption?: string;
  thumbnail_url?: string;
  duration_seconds?: number;
  last_updated: string;
}

export interface Quiz {
  id: ID;
  title: string;
  lesson_id: ID;
  description?: string;
  published: boolean;
  last_updated: string;
}

export type QuestionType = 'mcq' | 'boolean' | 'short_text';

export interface Question {
  id: ID;
  quiz_id: ID;
  type: QuestionType;
  body: string;
  options?: string[];
  correct_answer?: string;
  related_lesson_id?: ID;
  related_hint?: string; // e.g. "راجع درس: تعريف النهاية"
  last_updated: string;
}

export interface Attempt {
  id: ID;
  quiz_id: ID;
  user_id: ID;
  score: number;
  started_at: string;
  finished_at?: string;
  last_updated: string;
}

export interface AttemptAnswer {
  id: ID;
  attempt_id: ID;
  question_id: ID;
  answer: string;
  correct: boolean;
}

export interface Progress {
  id: ID;
  user_id: ID;
  lesson_id: ID;
  completed: boolean;
  percentage: number;
  last_position_seconds?: number; // for media resume
  last_updated: string;
}

export interface Note {
  id: ID;
  user_id: ID;
  lesson_id: ID;
  content_md: string;
  last_updated: string;
}

export interface Annotation {
  id: ID;
  user_id: ID;
  lesson_id: ID;
  page: number;
  x: number;
  y: number;
  text: string;
  last_updated: string;
}
