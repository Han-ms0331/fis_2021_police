import * as React from 'react';
import { List, Datagrid, TextField, EmailField, DateField, EditButtonㄴ } from 'react-admin';

export const UserList = porps => (
    <List {...props}>
        <Datagrid>
            <TextField source = "id" />
            <TextField source = "name" />
            <TextField source = "username" />
            <EmailField source = "email" />
            <TextField source = "phone" />
            <DateField source = "date" />
            <EditButton />
        </Datagrid>
    </List>
);