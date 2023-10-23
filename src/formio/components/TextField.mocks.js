import {rest} from 'msw';

import {BASE_URL} from 'api-mocks';

export const mockAddressAutoCompleteGet = (street = 'Keizersgracht', city = 'Amsterdam') =>
  rest.get(`${BASE_URL}location/get-street-name-and-city`, (req, res, ctx) => {
    return res(ctx.json({streetName: street, city}));
  });
