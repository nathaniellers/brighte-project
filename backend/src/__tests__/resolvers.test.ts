const { resolvers } = require('../resolvers/leadResolvers');

describe('Mutation.register', () => {
	it('throws validation error on invalid input', async () => {
		await expect(
			resolvers.Mutation.register(null, {
				name: '',
				email: 'invalid',
				mobile: '1234567890',
				postcode: '22',
				services: ['DELIVERY'],
			})
		).rejects.toThrow("String must contain at least 1 character(s), Invalid email, Mobile number must be 11 digits, String must contain exactly 4 character(s)");
	});
});
