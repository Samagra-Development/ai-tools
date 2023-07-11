export const menuItems = {
  dataset: [
    {
      name: "My Contribution",
      url: "/dataset/my-contribution",
      roles: ["CONTRIBUTOR-USER", "BENCHMARK-DATASET-CONTRIBUTOR", "ADMIN"],
    },
    {
      name: "My Searches",
      url: "/my-searches",
      roles: [
        "READONLY-USER",
        "CONTRIBUTOR-USER",
        "BENCHMARK-DATASET-CONTRIBUTOR",
        "ADMIN",
      ],
    },
    {
      name: "Search & Download Records",
      url: "/search-and-download-rec/initiate/-1",
      roles: [
        "CONTRIBUTOR-USER",
        "READONLY-USER",
        "BENCHMARK-DATASET-CONTRIBUTOR",
        "ADMIN",
      ],
    },
    {
      name: "Submit Dataset",
      url: "/dataset/upload",
      roles: ["CONTRIBUTOR-USER", "BENCHMARK-DATASET-CONTRIBUTOR", "ADMIN"],
    },
    {
      name: 'Dataset Metrics',
      url: "/dataset/reports",
      roles: [
        "CONTRIBUTOR-USER",
        "READONLY-USER",
        "BENCHMARK-DATASET-CONTRIBUTOR",
        "ADMIN",
      ],
      public: true,
    }
  ],

  models: [
    {
      name: "My Contribution",
      url: "/model/my-contribution",
      roles: [
        "CONTRIBUTOR-USER",
        "EXTERNAL-CONSORTIUM-MEMBER",
        "BENCHMARK-DATASET-CONTRIBUTOR",
        "ADMIN",
      ],
    },
    {
      name: "Explore Models",
      url: "/model/explore-models",
      roles: [
        "READONLY-USER",
        "CONTRIBUTOR-USER",
        "EXTERNAL-CONSORTIUM-MEMBER",
        "BENCHMARK-DATASET-CONTRIBUTOR",
        "ADMIN",
      ],
      public: true,
    },
    // {
    //     name: 'Model Leaderboard',
    //     url: '/model/leaderboard',
    //     roles:["CONTRIBUTOR-USER"]
    // },
    {
      name: "Benchmark Datasets ",
      url: "/model/benchmark-datasets",
      roles: [
        "CONTRIBUTOR-USER",
        "EXTERNAL-CONSORTIUM-MEMBER",
        "BENCHMARK-DATASET-CONTRIBUTOR",
        "ADMIN",
      ],
      public: true,
    },
    {
      name: "Submit Model",
      url: "/model/upload",
      roles: [
        "CONTRIBUTOR-USER",
        "EXTERNAL-CONSORTIUM-MEMBER",
        "BENCHMARK-DATASET-CONTRIBUTOR",
        "ADMIN",
      ],
    },
  ],
  admin: [
    {
      name: "User Details",
      url: "/admin/view-user-details",
      roles: ["ADMIN"],
    },
  ],
  profile: [
    {
      name: "Change Password",
      url: "",
    },
    {
      name: "Feedback",
      url: "",
    },
    {
      name: "Log out",
      url: "/user/login",
    },
  ],
};
