import { FeedbackType } from '../enums/feedback-type';

export interface UserFeedback {
  feedbackType: FeedbackType;
  feedback: string;
  entityId?: string | null;
}
