const users = [
  { id: '123', name: "John" },
  { id: '456', name: "Jane" },
];


export const db = {
  user: {
    findMany: async () => {
      return users;
    },
    findOne: async (id: string) => {
      return users.find((u) => u.id === id);
    },
    create: async (input: { name: string }) => {
      const user = {
        id: Math.random().toString(),
        name: input.name,
      };
      users.push(user);
      return user;
    },
  },
};
