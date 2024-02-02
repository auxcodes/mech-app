const demoData = {
  shopName: "Best Bikes",
  mechanics: [
    {
      displayName: "Joe",
      displayColor: "#89CFF0",
      firstName: "Joe",
      guid: "1",
      jobTitle: "Mechanic",
      showAsMechanic: "1",
    },
    {
      displayName: "Jane",
      displayColor: "#77DD77",
      firstName: "Jane",
      guid: "2",
      jobTitle: "Mechanic",
      showAsMechanic: "1",
    },
    {
      displayName: "Bob",
      displayColor: "#F88379",
      firstName: "Bob",
      guid: "3",
      jobTitle: "Mechanic",
      showAsMechanic: "1",
    },
  ],
  jobsList: [],
};

export function getDemoMechanics(requestData) {
  console.log("DC - Get Demo Mechanics: ", requestData);
  return demoData;
}
