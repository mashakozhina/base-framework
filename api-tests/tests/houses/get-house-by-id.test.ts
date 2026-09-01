import { Houses } from '../../src/controllers/houses';
import { handleError } from '../../src/utils/error-handler';

describe('Get House by id', () => {
  const houses = new Houses();

  it('returns a single house by id', async () => {
    const firstHouse = (await houses.getHouses()).body[0];

    const response = await houses
      .getHouseById(firstHouse.id)
      .catch((error) => handleError('Getting a house by id', error));

    expect(response.status).toBe(200);
    expect(response.body.id).toBe(firstHouse.id);
    expect(response.body.name).toBe(firstHouse.name);
  });

  it('returns 400 for a house with invalid id', async () => {
    const response = await houses.getHouseById('11111111-2222-3333-4444');

    expect(response.status).toBe(400);
  });
});
