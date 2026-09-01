import { Houses } from '../../src/controllers/houses';
import { House } from '../../src/interfaces/house';
import { validateSchema } from '../../src/schemas/schema-validator';
import { houseGet } from '../../src/schemas/house-get.schema';
import { expectAll } from '../../src/utils/expectAll';
import { handleError } from '../../src/utils/error-handler';

describe('Get Houses', () => {
  const houses = new Houses();

  it('returns all four Hogwarts houses, each matching the House schema', async () => {
    const response = await houses
      .getHouses()
      .catch((error) => handleError('Listing houses', error));
    (response.body as House[]).forEach((house) => validateSchema(house, houseGet));

    expectAll(
      () => expect(response.status).toBe(200),
      () => expect(response.body).toHaveLength(4),
      () => expect((response.body as House[]).map((house) => house.name)).toContain('Gryffindor'),
    );
  });
});
