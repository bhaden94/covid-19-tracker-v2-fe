import * as React from 'react';
import { useState, useEffect } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { RouteComponentProps } from 'react-router';
import { Link, withRouter } from 'react-router-dom';

const Navbar = ({location, history}: RouteComponentProps) => {
    const [tab, setTab] = useState(0);
    const routes: string[] = ['/united_states', '/world']

    const handleChange = (_event: any, newValue: React.SetStateAction<number>) => {
        setTab(newValue);
    };

    useEffect(() => {
        if (location.pathname === '/') {
            history.push('/united_states')
        }
    }, [location.pathname, history])

    useEffect(() => {
        if (routes.indexOf(location.pathname) !== -1) {
            setTab(routes.indexOf(location.pathname))
        }
    }, [location.pathname, routes])

    return (
        <AppBar className="appbar" position="static" color="transparent" elevation={0} square={true}>
            <Tabs
                value={tab}
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
