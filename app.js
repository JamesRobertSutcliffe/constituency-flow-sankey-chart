import { sankey } from "/sankey.js";

 export async function fetchData() {
    try {
const response = await fetch('./data.json');
const data = await response.json();

const conservatives = [];
const cons2019 = [];
const labour = [];
const libDem = [];
const plaid = [];
const reform = [];
const snp = [];


        await data.forEach(item => {
            if (item["Win19 (nominal)"] === "Con") cons2019.push(item);
            if (item.WinnerGE2024 === "Conservatives") conservatives.push(item);
            if (item["2019 v 2024 status"] === "Labour gain from Conservatives") labour.push(item);
            if (item["2019 v 2024 status"] === "Lib Dem gain from Conservatives") libDem.push(item);
            if (item["2019 v 2024 status"] === "Plaid gain from Conservatives") plaid.push(item);
            if (item["2019 v 2024 status"] === "Reform gain from Conservatives") reform.push(item);
            if (item["2019 v 2024 status"] === "SNP gain from Conservatives") snp.push(item);
        });

        await sankey(cons2019, conservatives, labour, libDem, plaid, reform, snp)

    } catch (error) {
        console.error('Error on running application', error);
    }
}

fetchData();