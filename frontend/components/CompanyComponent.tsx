import { Company } from "../src/company";
import DealComponent from "./DealComponent";

interface CompanyComponentProps {
    company: Company
}

export default function CompanyComponent({company} : CompanyComponentProps) {
    return (
        <tr>
            <td>{company.name}</td>
            <td>{(company.description !== 'undefined') ? company.description : ''}</td>
            <td>{(company.country !== 'undefined') ? company.country : ''}</td>
            {(!!company.deals && company.deals.length > 0) ?
            <td>
                <label htmlFor={'modal-' + company.company_id} className="btn">
                    {company.deals?.length || 0}
                </label>
            </td> :
            <td>
                0
            </td>
            }
            <td>{company.founding_date.split('T')[0]}</td>
            <input type="checkbox" id={'modal-' + company.company_id} className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    <label htmlFor={'modal-' + company.company_id} className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <h2 className="text-xl font-bold">Deals for {company.name}</h2>
                    <table className="table table-zebra w-full">
                    <thead>
                    <tr>
                        <th>Date</th>
                        <th>Funding amount</th>
                        <th>Funding round</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        !!company.deals && company.deals!.map( d =><DealComponent deal={d} key={d.id}/>)
                    }
                    </tbody>
                    </table>
                </div>
            </div>
        </tr>
    )
}