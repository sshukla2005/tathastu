import { factories } from '@strapi/strapi';

export default factories.createCoreController(
  'api::career-application.career-application',
  ({ strapi }) => ({
    // Strapi's default core controller expects `ctx.request.body.data` to
    // already be a parsed object, which only holds for JSON requests. For
    // multipart/form-data submissions (needed here for the CV upload), koa
    // leaves it as the raw JSON string, so it's parsed by hand and the
    // uploaded file (if any) is linked to the entity afterwards via the
    // upload plugin's service — the same two-step flow Strapi's own admin
    // panel uses under the hood for combined create+upload requests.
    async create(ctx) {
      const rawData = ctx.request.body?.data;
      const data = typeof rawData === 'string' ? JSON.parse(rawData) : rawData;

      if (!data?.name || !data?.email || !data?.position) {
        return ctx.badRequest('Name, email, and position are required.');
      }

      const entity = await strapi.documents('api::career-application.career-application').create({
        data,
      });

      const cvFile = ctx.request.files?.['files.cv'];
      if (cvFile) {
        await strapi.plugin('upload').service('upload').upload({
          data: {
            ref: 'api::career-application.career-application',
            refId: entity.id,
            field: 'cv',
          },
          files: cvFile,
        });
      }

      const sanitizedEntity = await this.sanitizeOutput(entity, ctx);
      ctx.status = 201;
      return this.transformResponse(sanitizedEntity);
    },
  }),
);
