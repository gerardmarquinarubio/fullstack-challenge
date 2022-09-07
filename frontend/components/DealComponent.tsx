import { Deal } from "../src/deal";

interface DealComponentProps {
    deal: Deal
}

export default function DealComponent({deal}: DealComponentProps) {
    return (
        <tr>
            <td>{deal.date.split('T')[0]}</td>
            <td>{deal.funding_amount}</td>
            <td>{deal.funding_round}</td>
        </tr>
    )
}