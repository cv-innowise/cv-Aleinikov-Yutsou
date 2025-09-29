import { vi } from "vitest";

const { usersMock } = vi.hoisted(() => ({
  usersMock: [
    {
      id: "1",
      email: "daniil.beniash@innowise.com",
      profile: {
        first_name: "Daniil",
        last_name: "Beniash",
        avatar: null,
      },
      department_name: "React",
      position_name: "Software Engineer",
    },
    {
      id: "709",
      email: "duncanmacleod@gmail.com",
      profile: {
        first_name: "Duncan",
        last_name: "MacLeod",
        avatar:
          "https://res.cloudinary.com/cv-gen-cloud/image/upload/v1753278570/user_avatars/GnztjxSVCdiTQ7mKxgbhYw.jpg",
      },
      department_name: "Global",
      position_name: "Data Architect",
    },
    {
      id: "427",
      email: "maxim.goncharov@gmail.com",
      profile: {
        first_name: "Maksimоdvj",
        last_name: "HancharouUy",
        avatar:
          "https://res.cloudinary.com/cv-gen-cloud/image/upload/v1724158565/user_avatars/Bt724YyUdcaTM4SKpKul8w.jpg",
      },
      department_name: "Global",
      position_name: "Data Analyst",
    },
    {
      id: "492",
      email: "daniil.kurilo@innowise.com",
      profile: {
        first_name: null,
        last_name: null,
        avatar: null,
      },
      department_name: null,
      position_name: null,
    },
    {
      id: "499",
      email: "test2@gmail.test",
      profile: {
        first_name: "jbgurg",
        last_name: "zxxccxzc",
        avatar: null,
      },
      department_name: "Node",
      position_name: "Systems Analyst",
    },
    {
      id: "617",
      email: "asd@asd.asd",
      profile: {
        first_name: "aaaaaaaaaa",
        last_name: "sssssssssss",
        avatar:
          "https://res.cloudinary.com/cv-gen-cloud/image/upload/v1744040306/user_avatars/SInp3_wOUEpaSum8COhGUA.jpg",
      },
      department_name: "Python",
      position_name: "Network Engineer",
    },
    {
      id: "634",
      email: "qwert@gmail.com",
      profile: {
        first_name: "Qwert",
        last_name: "Gi",
        avatar: null,
      },
      department_name: "Vue",
      position_name: "Database Administrator",
    },
    {
      id: "567",
      email: "agaton615@gmail.com",
      profile: {
        first_name: "",
        last_name: "",
        avatar: null,
      },
      department_name: null,
      position_name: "Cloud Engineer",
    },
    {
      id: "579",
      email: "islam.soliman@innowise.com",
      profile: {
        first_name: "Islam",
        last_name: "Soliman",
        avatar:
          "https://res.cloudinary.com/cv-gen-cloud/image/upload/v1742550505/user_avatars/N_0tCzqJMSjtBZ78cmWS2g.jpg",
      },
      department_name: "Node",
      position_name: "UX Designer",
    },
    {
      id: "568",
      email: "nwwwat312@nat.mail.ru",
      profile: {
        first_name: "Nataee",
        last_name: "stadnik",
        avatar:
          "https://res.cloudinary.com/cv-gen-cloud/image/upload/v1742585273/user_avatars/vf05HAZTFAHxcOkNeo_cvQ.png",
      },
      department_name: "Angular",
      position_name: "UX Designer",
    },
    {
      id: "592",
      email: "test1@test.com",
      profile: {
        first_name: null,
        last_name: null,
        avatar: null,
      },
      department_name: null,
      position_name: null,
    },
    {
      id: "596",
      email: "111nwwwat312@nat.mail.ru",
      profile: {
        first_name: null,
        last_name: null,
        avatar: null,
      },
      department_name: null,
      position_name: null,
    },
    {
      id: "551",
      email: "gg@gmail.com",
      profile: {
        first_name: "kh",
        last_name: "asdsa",
        avatar: null,
      },
      department_name: "Global",
      position_name: "QA Engineer",
    },
    {
      id: "680",
      email: "1111111111@gmail.com",
      profile: {
        first_name: null,
        last_name: null,
        avatar: null,
      },
      department_name: null,
      position_name: null,
    },
    {
      id: "504",
      email: "rostislavvorobyev@gmail.com",
      profile: {
        first_name: "R",
        last_name: "V",
        avatar: null,
      },
      department_name: null,
      position_name: "Data Architect",
    },
    {
      id: "123",
      email: "thorn_pear@icloud.com",
      profile: {
        first_name: "Rostislav",
        last_name: "Harlanov",
        avatar: null,
      },
      department_name: "React",
      position_name: "Software Engineer",
    },
    {
      id: "273",
      email: "alex@mail.ru",
      profile: {
        first_name: "Alex",
        last_name: "Yuriev",
        avatar:
          "https://res.cloudinary.com/cv-gen-cloud/image/upload/v1720430255/user_avatars/sIC3jZpVyKrz8l9W4k6KAg.jpg",
      },
      department_name: null,
      position_name: "Software Engineer",
    },
    {
      id: "541",
      email: "sashabondarsasa275@gmail.com",
      profile: {
        first_name: "xsxs",
        last_name: "sxsxs",
        avatar: null,
      },
      department_name: "Quality Assurance",
      position_name: "Database Administrator",
    },
  ],
}));
vi.mock("../queries/get-users", () => ({
  getUsers: () => usersMock,
}));

export { usersMock };