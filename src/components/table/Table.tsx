import * as React from 'react';
import MaterialTable from 'material-table';
import { RouteComponentProps } from 'react-router';
import { Link, withRouter } from 'react-router-dom';
import { Typography } from '@material-ui/core';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { useState, useEffect } from 'react';
import { Country } from '../../utilities/CountryObj'
import { State } from '../../utilities/StateObj'
import { blue, deepPurple } from '@material-ui/core/colors';
import useTheme from '@material-ui/core/styles/useTheme';
import { queryCache, useQuery } from 'react-query'
import { fetchData } from '../../queries/fetchData'

// so far there is a problem with Virgin Islands being undefined in the filter
// TODO: need to figure this out
const daysChanged = (data: any, place: string, days: number): any => {
    const recent: any = data[data.length - 1].states
        .filter((state: { state: string; }) => state.state === place.toLowerCase())
    console.log(recent[0]?.state)
    return 0;
}

interface RouterProps {
    state: string
    country: string
}

interface ITableProps extends RouteComponentProps<RouterProps> {
    type: string
}

const Table = ({ type, location }: ITableProps) => {
    const { isLoading, isError, data } = useQuery(type, fetchData, {
        initialData: () => {
            return queryCache.getQueryData(type)
        }
    })

    const theme = useTheme();
    const useStyles = makeStyles({
        table: {
            margin: '2% 5%',
            maxWidth: '500px',
        },
        links: {
            textDecoration: 'none',
            color: blue[600],
            '&:visited': {
                color: theme.palette.type === 'light' ? deepPurple[500] : deepPurple[200]
            },
            '&:hover': {
                textDecoration: 'underline'
            }
        }
    });

    const classes = useStyles();
    const [chosenObj, setChosenObj] = useState(State)
    const columns: { title: string, field: string, render?: any }[] = [
        {
            title: type.charAt(0).toUpperCase() + type.slice(1),
            field: 'name',
            render: (rowData: any) => {
                return (
                    <Typography
                        component={Link}
                        to={`${location.pathname}/${rowData.name}`}
                        className={classes.links}
                    >
                        {rowData.name}
                    </Typography>)
            }
        },
        {
            title: '1-Day change',
            field: 'day1Change',
        },
        {
            title: '7-Day change',
            field: 'day7Change',
        },
    ]

    const options = {
        minBodyHeight: '600px',
        pageSizeOptions: [10,25,50],
        pageSize: 10,
        showTitle: false,
    }

    useEffect(() => {
        type === 'state' ? setChosenObj(State) : setChosenObj(Country)
    }, [type])

    if (isLoading) {
        return <span>Loading...</span>
    }

    if (isError) {
        return <span>Error</span>
    }

    return (
        <div className={classes.table}>
            <MaterialTable
                columns={columns}
                data={Object.keys(chosenObj).map((e: any) => {
                    return {
                        name: chosenObj[e],
                        day1Change: daysChanged(data, chosenObj[e], 1),
                        day7Change: daysChanged(data, chosenObj[e], 7)
                    }
                })}
                options={options}
            />
        </div>
    );
};

export default withRouter(Table);