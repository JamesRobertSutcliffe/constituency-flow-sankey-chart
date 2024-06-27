# times-data-viz

Sankey Diagram visualising the predicted flow of constituency votes between the 2019 and 2024 general elections.

Steps:

1 - Clean data by turning excel document into a js object.
2 - Create objects for each political parties number of seats for 2019 and 2024 via functions.
3 - Create nodes for each political party
4 - display in object as follows:

const graph = {
nodes: [
{ name: "Party A (2019)" },
{ name: "Party B (2019)" },
{ name: "Party C (2019)" },
{ name: "Party A (2024)" },
{ name: "Party B (2024)" },
{ name: "Party C (2024)" }
],
links: [
{ source: 0, target: 3, value: 400000 },
{ source: 0, target: 4, value: 50000 },
{ source: 0, target: 5, value: 50000 },
{ source: 1, target: 3, value: 100000 },
{ source: 1, target: 4, value: 150000 },
{ source: 1, target: 5, value: 50000 },
{ source: 2, target: 3, value: 50000 },
{ source: 2, target: 4, value: 50000 },
{ source: 2, target: 5, value: 100000 }
]
};

Further ideas -

- Visualise how where parties sit on the spectrum influences flow of vote, i.e. labour to green and reform to cons.
