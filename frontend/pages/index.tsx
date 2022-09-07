import type { GetStaticPropsContext, NextPage } from 'next'
import CompanyLayout from '../layouts/CompanyLayout';
import { Company } from '../src/company';
import { Deal } from '../src/deal';

const Home: NextPage<{companies: Company[], deals: Deal[]}> = (props) => {
  return (
    <div>
      <CompanyLayout companies={props.companies} />
    </div>
  )
}

export async function getStaticProps(context: GetStaticPropsContext) {
  const companies_data = await fetch('http://localhost:20002/companies');
  const companies : Company[] = await companies_data.json();
  const deals_data = await fetch('http://localhost:20002/deals');
  const deals : Deal[] = await deals_data.json();

  for (const deal of deals) {
    companies.forEach( (c : Company) => {
      if (c.company_id == deal.company_id) {
        if (!c.deals)
          c.deals = [];
        c.deals.push(deal);
      }
    });
  }

  return {
    props: {
      companies,
      deals,
    },
  }
}

export default Home;
