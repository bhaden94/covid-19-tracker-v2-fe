import * as React from 'react';
import { useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { RouteComponentProps } from 'react-router';
import { Link, withRouter } from 'react-router-dom';


export interface INavbarProps {
    history: RouteComponentProps
}

const Navbar = ({ history }: RouteComponentProps) => {
    const [value, setValue] = useState(0);

    const handleChange = (_event: any, newValue: React.SetStateAction<number>) => {
        setValue(newValue);
    };
    return (
        <AppBar className="appbar" position="static" color="transparent" elevation={0} square={true}>
            <Tabs
                value={value}
                onChange={handleChange}
                indicatorColor="primary"
                textColor="primary"
                centered
            >
                <Tab label="United States" component={Link} to="/united_states" />
                <Tab label="Global" component={Link} to="/world" />
            </Tabs>
        </AppBar>
    );
}

export default withRouter(Navbar);
