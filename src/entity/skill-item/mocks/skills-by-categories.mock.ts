export const skillsByCategoriesMock: Record<
  string,
  {
    name: string;
    categoryId: string;
  }[]
> = {
  "Programming languages": [
    { name: "TypeScript", categoryId: "1" },
    { name: "Python", categoryId: "1" },
    { name: "Java", categoryId: "1" },
    { name: "C#", categoryId: "1" },
  ],
  Frontend: [
    { name: "React", categoryId: "2" },
    { name: "Angular", categoryId: "2" },
    { name: "Redux", categoryId: "2" },
    { name: "MobX", categoryId: "2" },
    { name: "Three.js", categoryId: "2" },
  ],
  Backend: [
    { name: "Node.js", categoryId: "3" },
    { name: "NestJS", categoryId: "3" },
    { name: "GraphQL", categoryId: "3" },
    { name: "gRPC", categoryId: "3" },
  ],
};
