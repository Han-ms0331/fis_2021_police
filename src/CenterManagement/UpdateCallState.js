import React from 'react'
import axios from 'axios'
import { useState } from 'react'

function UpdateCallState (props) {
    const { update } = props;
    return update ? (
        <div>안녕</div>
    ) : null;
}

export default UpdateCallState;