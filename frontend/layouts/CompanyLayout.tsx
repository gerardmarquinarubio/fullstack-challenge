import { ComponentProps, useState } from "react";
import CompanyComponent from "../components/CompanyComponent";
import { Company } from '../src/company';

interface CompanyLayoutProps {
    companies: Company[]
}

export default function CompanyLayout({companies} : CompanyLayoutProps) {
    
    const [nameFilter, setNameFilter] = useState("");
    const [countryFilter, setCountryFilter] = useState("");
    const [sortFilter, setSortFilter] = useState(false);

    return (
        <div className="flex flex-col place-items-center p-4">
            <div className="flex content-around w-full gap-4 pb-2">
                <input type="text" placeholder="Search by name" className="input input-bordered w-full max-w-xs" 
                    onChange={(e) => setNameFilter(e.target.value)}
                />
                <select className="select w-full max-w-xs input-bordered" 
                    onChange={(e) => setCountryFilter(e.target.value)}
                >
                    <option selected value="">Any country</option>
                    {companies.reduce<string[]>( (p, c) => {
                        if (!p.includes(c.country) && (c.country !== 'undefined')) {
                            p.push(c.country);
                        }
                        console.log(c.country);
                        return p;
                    }, [])
                    .map( c => 
                        <option value={c}>{c}</option>
                    )
                    }
                </select>
            </div>
            <div className="overflow-y-scroll w-full">
                <table className="table table-zebra w-full">
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Country</th>
                        <th className="cursor-pointer"
                        onClick={() => setSortFilter(!sortFilter)}>
                            Nº of deals ⇅
                        </th>
                        <th>Founding date</th>
                    </tr>
                    </thead>
                    <tbody>
                {
                    companies
                    .filter( c => {
                        if (!nameFilter) return true;
                        return c.name.toLowerCase().includes(nameFilter.toLowerCase());
                    })
                    .filter( c => {
                        if (!countryFilter) return true;
                        return c.country.toLowerCase() == countryFilter.toLowerCase();
                    })
                    .sort( (a, b) => {
                        if (sortFilter)
                            return (a.deals?.length || 0) - (b.deals?.length || 0);
                        else
                            return (b.deals?.length || 0) - (a.deals?.length || 0);
                    })
                    .map( c =>
                        <CompanyComponent company={c} key={c.company_id}/>
                    )
                }
                    </tbody>
                </table>
            </div>
        </div>
    );
}