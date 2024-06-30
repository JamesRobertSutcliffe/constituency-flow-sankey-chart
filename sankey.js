export function sankey(cons2019, conservatives, labour, libDem, plaid, reform, snp) {
    const seats = {
        "Convervatives2019": cons2019.length,
        "Conservatives": conservatives.length,
        "Labour": labour.length,
        "LiberalDemocrats": libDem.length,
        "Plaid": plaid.length,
        "Reform": reform.length,
        "SNP": snp.length
    }

    const svg = d3.select("svg"),
        width = +svg.attr("width"),
        height = +svg.attr("height");

    const formatNumber = d3.format(",.0f"),
        format = d => formatNumber(d) + " seats";

    // Define color mapping
    const colorMapping = {
        "Conservatives (2019)": "#4169E1",
        "Conservatives (2024)": "#4169E1",
        "Labour (2024)": "#FF0000",
        "Lib Dems (2024)": "#FFFF00",
        "Reform (2024)": "#800080",
        "Plaid Cymru (2024)": "#90EE90",  // Light Green
        "SNP (2024)": "#FFD700"    // Different shade of yellow
    };

    const sankey = d3.sankey()
        .nodeWidth(30)  // Increase the node width
        .nodePadding(20)  // Increase the padding between nodes
        .extent([[10, 50], [width - 10, height - 50]]); // Adjusted padding around the diagram

    const graph = {
        nodes: [
            { name: "Conservatives (2019)", seats: cons2019.length },
            { name: "Conservatives (2024)", seats: conservatives.length },
            { name: "Labour (2024)", seats: labour.length },
            { name: "Lib Dems (2024)", seats: libDem.length },
            { name: "Reform (2024)", seats: reform.length },
            { name: "Plaid Cymru (2024)", seats: plaid.length },
            { name: "SNP (2024)", seats: snp.length },
        ],
        links: [
            { source: 0, target: 2, value: labour.length },
            { source: 0, target: 1, value: conservatives.length },
            { source: 0, target: 3, value: libDem.length },
            { source: 0, target: 4, value: reform.length },
            { source: 0, target: 5, value: plaid.length },
            { source: 0, target: 6, value: snp.length },
        ]
    };

    sankey(graph);

    const linkGradient = svg.append("defs").selectAll("linearGradient")
        .data(graph.links)
        .enter().append("linearGradient")
        .attr("id", (d, i) => `gradient-${i}`)
        .attr("gradientUnits", "userSpaceOnUse")
        .attr("x1", d => d.source.x1)
        .attr("x2", d => d.target.x0)
        .selectAll("stop")
        .data(d => [
            { offset: "0%", color: colorMapping[d.source.name] },
            { offset: "100%", color: colorMapping[d.target.name] }
        ])
        .enter().append("stop")
        .attr("offset", d => d.offset)
        .attr("stop-color", d => d.color);

    const link = svg.append("g")
        .attr("class", "links")
        .selectAll("path")
        .data(graph.links)
        .enter().append("path")
        .attr("class", "link")
        .attr("d", d3.sankeyLinkHorizontal())
        .style("fill", "none")
        .style("stroke", (d, i) => `url(#gradient-${i})`)
        .style("stroke-width", d => Math.max(1, d.width))
        .on("mouseover", (event, d) => {
            const percentageDifference = ((d.value / cons2019.length) * 100).toFixed(2);
            d3.select("#tooltip")
                .style("opacity", 1)
                .style("background-color", colorMapping[d.target.name])
                .html(`${d.source.name} to ${d.target.name}<br>${percentageDifference}% of total seat flow`);
        })
        .on("mouseout", () => {
            d3.select("#tooltip").style("opacity", 0);
        });

    const node = svg.append("g")
        .attr("class", "nodes")
        .selectAll("g")
        .data(graph.nodes)
        .enter().append("g")
        .attr("class", "node")
        .attr("transform", d => `translate(${d.x0},${d.y0})`);

    node.append("rect")
        .attr("height", d => d.y1 - d.y0)
        .attr("width", sankey.nodeWidth())
        .attr("rx", 2.5)
        .attr("ry", 2.5)
        .style("fill", d => colorMapping[d.name] || "#000000")
        .append("title")
        .text(d => `${d.name}\n${format(d.value)}`);

    node.append("text")
        .attr("x", d => d.x0 < width / 2 ? 6 + sankey.nodeWidth() : -6)
        .attr("y", d => (d.y1 - d.y0) / 2)
        .attr("dy", "0.35em")
        .attr("text-anchor", d => d.x0 < width / 2 ? "start" : "end")
        .text(d => `${d.name} - ${d.seats} ${d.seats > 1 ? "seats" : "seat"}`);

    // Add titles above the nodes, shifted further inwards
    svg.append("text")
        .attr("x", graph.nodes[0].x0 + sankey.nodeWidth() + 11)
        .attr("y", 30)
        .attr("class", "node-title")
        .text("2019 GE");

    svg.append("text")
        .attr("x", graph.nodes[1].x0 - 13)
        .attr("y", 30)
        .attr("class", "node-title")
        .text("2024 GE");

    // Calculate total percentage of outflows
    const totalOutflows = labour.length + libDem.length + reform.length + plaid.length + snp.length;
    const totalOutflowsPercentage = ((totalOutflows / cons2019.length) * 100).toFixed(2);

    // Add total outflows text below the graph
    svg.append("text")
        .attr("x", width / 2)
        .attr("y", height - 10)
        .attr("class", "outflows-text")
        .text(`Total outflows from Conservatives: ${totalOutflowsPercentage}%`);

    console.log(seats, sankey.nodeWidth());
};