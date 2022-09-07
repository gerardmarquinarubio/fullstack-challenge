const fs = require('fs');

// utility function for padding
const pad = function (num) { return ('00' + num).slice(-2) };

// load json
const deals = JSON.parse(fs.readFileSync('./challenge_deals.json'));
const companies = JSON.parse(fs.readFileSync('./challenge_companies.json'));

// create SQL insert queries
let companies_migration =
    `
INSERT INTO companies (
    name,
    country,
    founding_date,
    description,
    company_id
) VALUES
`;

let deals_migration =
    `
INSERT INTO deals (
    date,
    funding_amount,
    funding_round,
    company_id
) VALUES
`;

for (const company of Object.values(companies)) {
    let founding_date = new Date(company.founding_date);

    founding_date = founding_date.getUTCFullYear() + '-' +
        pad(founding_date.getUTCMonth() + 1) + '-' +
        pad(founding_date.getUTCDate()) + ' ' +
        pad(founding_date.getUTCHours()) + ':' +
        pad(founding_date.getUTCMinutes()) + ':' +
        pad(founding_date.getUTCSeconds());

    companies_migration +=
        ` (
    '${company.name?.replace("'", "`")}',
    '${company.country?.replace("'", "`")}',
    '${founding_date}',
    '${company.description?.replace("'", "`")}',
    ${company.company_id}
    ),\n`;
}

for (const deal of Object.values(deals)) {

    if (!Object.values(companies).find(c => c.company_id == deal.company_id)) {
        console.log(deal);
        continue;
    }

    let date = new Date(deal.date);

    date = date.getUTCFullYear() + '-' +
        pad(date.getUTCMonth() + 1) + '-' +
        pad(date.getUTCDate()) + ' ' +
        pad(date.getUTCHours()) + ':' +
        pad(date.getUTCMinutes()) + ':' +
        pad(date.getUTCSeconds());

    deals_migration +=
        `(
        '${date}',
        ${+deal.funding_amount},
        '${deal.funding_round}',
        ${deal.company_id}
    ),\n`;
}

// write queries to file
fs.writeFileSync('./challenge_companies_migrate.sql', companies_migration);
fs.writeFileSync('./challenge_deals_migrate.sql', deals_migration);