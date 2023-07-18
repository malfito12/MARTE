import React, { Component } from 'react'
import { Paper, Table, TableBody, TableContainer, TableHead, TableRow, TableCell } from "@material-ui/core";


export default class Write extends Component {
    render() {
        return (
            <Paper>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>uno</TableCell>
                                <TableCell>dos</TableCell>
                                <TableCell>tres</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell>mio</TableCell>
                                <TableCell>del</TableCell>
                                <TableCell>ek</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        )
    }
}

