import * as React from 'react';
import { Admin, Resource } from 'react-admin';
import jsonServerProvider from 'ra-data-json-server';

const dataProvider = jsonServerProvider('url');

const Manager = () => (
    <Admin dataProvider = {dataProvider}>
        <Resource name="users" list={UserList} edit={} />
    </Admin>
);

export default Manager;