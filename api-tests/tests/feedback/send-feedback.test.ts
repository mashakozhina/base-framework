import { Feedback } from '../../src/controllers/feedback';
import { feedbackData } from '../../fixtures/wizard-world/feedback/feedback-data';
import { handleError } from '../../src/utils/error-handler';

describe('Create Feedback', () => {
  const feedback = new Feedback();

  it('accepts general feedback', async () => {
    const response = await feedback
      .sendFeedback(feedbackData.feedback())
      .catch((error) => handleError('Sending feedback', error));

    expect(response.status).toBe(200);
  });
});
