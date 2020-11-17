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
import { daysChanged } from '../../utilities/tableUtils'
import Skeleton from '@material-ui/lab/Skeleton/Skeleton';


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
    const columns: any[] = [
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
            type: 'numeric'
        },
        {
            title: '7-Day change',
            field: 'day7Change',
            type: 'numeric'
        },
    ]

    const options: any = {
        pageSizeOptions: [10, 25, 50],
        pageSize: 10,
        showTitle: false,
        searchFieldAlignment: 'left',
        exportAllData: true,
        exportButton: true,
        padding: 'dense',
    }

    useEffect(() => {
        type === 'state' ? setChosenObj(State) : setChosenObj(Country)
    }, [type])

    if (isLoading) {
        return (
            <Skeleton
                variant="rect"
                width='100%'
                animation="wave"
                style={{ borderRadius: '5px' }}
            >
                <MaterialTable columns={columns} options={options} data={[]} />
            </Skeleton>
        )
    }

    if (isError) {
        return <span>Error</span>
    }

    return (

        <MaterialTable
            columns={columns}
            style={{minHeight: '100%'}}
            data={Object.keys(chosenObj).map((e: any) => {
                return {
                    name: chosenObj[e],
                    day1Change: daysChanged(data, chosenObj[e], type, 1),
                    day7Change: daysChanged(data, chosenObj[e], type, 7)
                }
            })}
            options={options}
        />

    );
};

export default withRouter(Table);