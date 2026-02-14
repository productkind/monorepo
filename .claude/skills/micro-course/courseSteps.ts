interface BaseStep {
  id: number;
  title: string;
  subtitle?: string;
}

export interface OverviewStep extends BaseStep {
  type: "overview";
  content: {
    description: string;
    outline?: Array<{ title: string; duration: string; badge?: 'free' | 'coming-soon' }>;
    totalDuration?: string;
  };
}

export interface VideoStep extends BaseStep {
  type: "video";
  content: {
    description?: string;
    videoPlaceholder?: string;
    videoUrl: string;
    transcript: string;
  };
}

export interface TextStep extends BaseStep {
  type: "text";
  content: {
    textContent: string;
    body?: string;
    imageUrl?: string;
  };
}

export interface QuizQuestionStep extends BaseStep {
  type: "quiz-question";
  content: {
    question: string;
    options: string[];
    correctAnswer: number | number[];
    explanation: string;
  };
}

export interface ReflectionStep extends BaseStep {
  type: "reflection";
  content: {
    description: string;
    placeholder?: string;
    subDescription?: string;
  };
}

export interface ChallengeEndStep extends BaseStep {
  type: "challenge-end";
  content: {
    description: string;
    nextModule?: string;
    subDescription?: string;
  };
}

export interface CourseEndStep extends BaseStep {
  type: "course-end";
  content: {
    description: string;
    subDescription?: string;
    nextModule?: string;
  };
}

export interface PromptingExerciseStep extends BaseStep {
  type: "prompting-exercise";
  content: {
    description: string;
    subDescription?: string;
    placeholder?: string;
    imageUrl?: string;
    sourceItems?: Array<{ id: string; content: string; readOnly?: boolean; isFixed?: boolean }>;
    targetItems?: Array<{ id: string; content: string; readOnly?: boolean; isFixed?: boolean }>;
    hideSourceItems?: boolean;
    fixedMockAnswer?: string;
    workImmediately?: boolean;
    checkerPrompt?: string;
    systemPrompt?: string;
    isPlainAIResponse?: boolean;
  };
}

export interface FreeTextExerciseStep extends BaseStep {
  type: "free-text-exercise";
  content: {
    description: string;
    subDescription?: string;
    placeholder?: string;
    checkerPrompt?: string;
    systemPrompt?: string;
  };
}

export interface InputStep extends BaseStep {
  type: "input";
  content: {
    description: string;
    placeholder?: string;
  };
}

export interface OnboardingStep extends BaseStep {
  type: "onboarding";
  content: {
    description: string;
    placeholder?: string;
    options?: string[];
  };
}

export interface OnboardingEndStep extends BaseStep {
  type: "onboarding-end";
  content: {
    description: string;
    cta: string;
  };
}

export interface ComicStep extends BaseStep {
  type: "comic";
  content: {
    imageUrl: string;
    altText: string;
  };
}