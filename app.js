// app.js
import { conservatives, cons2019, labour, libDem, plaid, reform, snp } from './dataModule.js';

// Example usage: You might want to use these arrays after some delay to ensure data is fetched
setTimeout(() => {
    console.log('Conservatives:', conservatives.length);
    console.log('Cons2019:', cons2019.length);
    console.log('Labour:', labour.length);
    console.log('LibDem:', libDem.length);
    console.log('Plaid:', plaid.length);
    console.log('Reform:', reform.length);
    console.log('SNP:', snp.length);
}, 1000);
