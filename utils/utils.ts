export const storePrismaJson = (json) => {
    return JSON.parse(JSON.stringify(json)) as Prisma.JsonObject;
};
