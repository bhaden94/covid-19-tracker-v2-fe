import * as React from 'react';
import Header from './Header'


const HeaderService = () => {
    const totals = {
        confirmed: 123456,
        active: 123456,
        recovered: 123456,
        deaths: 123456
    }
    return (
        <Header title='United States' totals={totals} />
    );
};

export default HeaderService;