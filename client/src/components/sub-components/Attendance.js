import React from 'react';

export default function Attendance({audience}) {
    var addMemberRow = (member, i) => {
        return (
            <tr>
                <td>{member.id}</td>
                <td>{member.name}</td>
            </tr>
        )
    }

    return (
        <div>
            <h2>Attendance - {audience.length}</h2>
            <table>
                <thead>
                    <tr>
                        <th>Audience Member</th>
                        <th>Socket ID</th>
                    </tr>
                </thead>
                <tbody>
                    {audience.map(addMemberRow)}
                </tbody>
            </table>
        </div>
    )
}