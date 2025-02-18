'use client';

import { Card, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';

const offers = [
    { name: 'Jayvion Simon', phone: '365-374-4981', company: 'Localhost and Sons', job: 'CEO', type: 'Monthly', status: 'Accepted' },
    { name: 'Jayvion Simon', phone: '365-374-4981', company: 'Localhost and Sons', job: 'CEO', type: 'Yearly', status: 'Pending' },
    { name: 'Jayvion Simon', phone: '365-374-4981', company: 'Localhost and Sons', job: 'CEO', type: 'Pay As You Go', status: 'Rejected' },
];

export default function DashboardTable() {
    return (
        <Card sx={{ mt: 3, padding: 2, borderRadius: 3, boxShadow: 2 }}>
            <Typography variant="subtitle2" sx={{ mb: 2 }}>
                Offer List
            </Typography>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Phone</TableCell>
                            <TableCell>Company</TableCell>
                            <TableCell>Job Title</TableCell>
                            <TableCell>Type</TableCell>
                            <TableCell>Status</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {offers.map((offer, index) => (
                            <TableRow key={index}>
                                <TableCell>{offer.name}</TableCell>
                                <TableCell>{offer.phone}</TableCell>
                                <TableCell>{offer.company}</TableCell>
                                <TableCell>{offer.job}</TableCell>
                                <TableCell>{offer.type}</TableCell>
                                <TableCell>{offer.status}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Card>
    );
}
