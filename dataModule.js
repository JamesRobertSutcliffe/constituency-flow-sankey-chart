export const conservatives = [];
export const cons2019 = [];
export const labour = [];
export const libDem = [];
export const plaid = [];
export const reform = [];
export const snp = [];

async function fetchData() {
    try {
        const response = await fetch('./data.json');
        const data = await response.json();

        data.forEach(item => {
            if (item["Win19 (nominal)"] === "Con") cons2019.push(item);
            if (item.WinnerGE2024 === "Conservatives") conservatives.push(item);
            if (item["2019 v 2024 status"] === "Labour gain from Conservatives") labour.push(item);
            if (item["2019 v 2024 status"] === "Lib Dem gain from Conservatives") libDem.push(item);
            if (item["2019 v 2024 status"] === "Plaid gain from Conservatives") plaid.push(item);
            if (item["2019 v 2024 status"] === "Reform gain from Conservatives") reform.push(item);
            if (item["2019 v 2024 status"] === "SNP gain from Conservatives") snp.push(item);
        });

        console.log(
            cons2019.length,
            conservatives.length,
            labour.length,
            libDem.length,
            plaid.length,
            reform.length,
            snp.length
        );
    } catch (error) {
        console.error('Error loading JSON data:', error);
    }
}
fetchData();
