import * as React from 'react';
import MaterialTable from 'material-table';
import { RouteComponentProps } from 'react-router';
import { Link, withRouter } from 'react-router-dom';
import { Typography } from '@material-ui/core';
import { useState } from 'react';
import { Country } from '../../utilities/CountryObj'



interface RouterProps {
    state: string
    country: string
}

interface ITableProps extends RouteComponentProps<RouterProps> {
    type: string
}

const Table = ({ type, location }: ITableProps) => {
    const columns: { title: string, field: string, render: any }[] = [
        {
            title: 'State/Country',
            field: 'name',
            render: (rowData: any) => {
                return <Typography
                    component={Link}
                    to={`${location.pathname}/${rowData.name}`}>{rowData.name}</Typography>
            }
        },
    ]

    return (
        <MaterialTable
            title="Basic Search Preview"
            columns={columns}
            data={Object.keys(Country).map((e: any) => {
                return {
                    name: Country[e]
                }
            })}
        />
    );
};

export default withRouter(Table);