'use client';

import { Box } from '@mui/material';
import DashboardStats from './views/DashboardStats';
// import DashboardStats from './DashboardStats';
import DashboardCharts from './views/DashboardCharts';
import DashboardTable from './views/DashboardTable';
import { useState } from 'react';

export default function DashboardView() {
  // const [filter, setFilter]
  const [filter, setFilter] = useState<'this-week' | 'prev-week'>('this-week');
    return (
        <Box sx={{ padding: 3 }}>
            <DashboardStats filter={filter} setFilter={setFilter}/>
            <DashboardCharts filter={filter}/>
            <DashboardTable />
        </Box>
    );
}
