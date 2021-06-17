import React, { useState } from 'react';

function UpdateCallState(props) {
    const { update } = props;

    return update ? (
        <div>안뇽</div>
    ) : null;
}

export default UpdateCallState;