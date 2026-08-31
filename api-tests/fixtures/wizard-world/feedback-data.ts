import { Builder } from 'builder-pattern';
import { UserFeedback } from '../../src/interfaces/feedback';
import { FeedbackType } from '../../src/enums/feedback-type';

export function generateFeedback() {
  return Builder<UserFeedback>()
    .feedbackType(FeedbackType.General)
    .feedback('Great API, thanks for building it!')
    .entityId(null)
    .build();
}

export const feedbackData = {
  feedback: () => generateFeedback(),
};
