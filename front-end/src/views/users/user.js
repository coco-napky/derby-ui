import React from 'react';

const User = (i, data) => (
    <tr key={i}>
        <th>{i}</th>
        <td>{data.username}</td>
        <td>{data.lastModified}</td>
        <td>{data.hashingScheme}</td>
    </tr>
)

export default User;