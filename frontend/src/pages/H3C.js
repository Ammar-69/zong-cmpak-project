import React, { useState, useEffect } from 'react'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TablePagination from '@mui/material/TablePagination'
import TableRow from '@mui/material/TableRow'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import axios from 'axios'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import Drawer from '@mui/material/Drawer'
import Box from '@mui/material/Box'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import CloudIcon from '@mui/icons-material/Cloud'
import MenuIcon from '@mui/icons-material/Menu'
import { useNavigate, useLocation } from 'react-router-dom'

const drawerWidth = 240

function H3C() {
  const { state, pathname } = useLocation()

  const navigate = useNavigate()

  const [isLoading, setLoading] = useState(true)
  const [data, setData] = useState([])
  const [isError, setError] = useState(false)
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)

  const [drawerToggle, setDrawerToggle] = useState(false)

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleDelete = async id => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_BACKEND_URL}/api/h3c/delete`,
        {
          data: { id }
        }
      )
    } catch (error) {
      console.error('Error deleting document:', error)
    }

    setData(data => data.filter(item => item['_id'] != id))
  }

  const toggleDrawer = open => event => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return
    }

    setDrawerToggle(open)
  }

  useEffect(() => {
    if (state != null) {
      const { data } = state

      setData(data)
      setLoading(false)
      setError(false)
    } else {
      fetch(`${process.env.REACT_APP_BACKEND_URL}/api/h3c`)
        .then(response => {
          return response.json()
        })
        .then(data => {
          setData(data.result)
          setLoading(false)
          setError(false)
        })
        .catch(err => {
          setLoading(false)
          setError(true)
        })
    }
  }, [])

  const correctPageColor = index => {
    let selected = false
    switch (index) {
      case 0:
        if (pathname == '/h3c') selected = true
        break
      case 1:
        if (pathname == '/lhr') selected = true
        break
      case 2:
        if (pathname == '/isb') selected = true
        break
    }

    if (selected) {
      return 'lightgray'
    } else {
      return 'white'
    }
  }

  return (
    <div>
      <AppBar
        position='fixed'
        sx={{ zIndex: theme => theme.zIndex.drawer + 1, background: '#8fc31f' }}
      >
        <Toolbar>
          <IconButton
            size='large'
            edge='start'
            color='inherit'
            aria-label='menu'
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
          <Box
            component='img'
            sx={{
              width: 110
            }}
            alt='Logo'
            src='/logo.png'
          />
        </Toolbar>
      </AppBar>
      <Drawer anchor={'left'} open={drawerToggle} onClose={toggleDrawer(false)}>
        <Box
          sx={{ width: 250 }}
          role='presentation'
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          <Toolbar />
          <List>
            {[
              { name: 'H3C Cloud', icon: '/h3c.png' },
              { name: 'Huawei LHR Cloud', icon: '/huawei-no-text.png' },
              { name: 'Huawei ISB Cloud', icon: '/huawei-no-text.png' }
            ].map((item, index) => (
              <ListItem
                key={item.name}
                disablePadding
                sx={{ background: correctPageColor(index) }}
              >
                <ListItemButton>
                  <ListItemIcon>
                    <img src={item.icon} width={50} />
                  </ListItemIcon>
                  <ListItemText primary={item.name} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
      <Toolbar />
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        {isLoading ? (
          <Typography variant='h6' component='h6'>
            Loading...
          </Typography>
        ) : data.length > 0 ? (
          <>
            <TableContainer sx={{ maxHeight: 510 }}>
              <Table stickyHeader aria-label='sticky table'>
                <TableHead>
                  <TableRow>
                    {Object.keys(data[0]).map((column, index) => {
                      if (column != '_id')
                        return (
                          <TableCell key={index} sx={{ fontWeight: 'bold' }}>
                            {column}
                          </TableCell>
                        )
                    })}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, index) => {
                      return (
                        <TableRow
                          hover
                          role='checkbox'
                          tabIndex={-1}
                          key={index}
                        >
                          {Object.keys(data[0]).map(column => {
                            if (column != '_id') {
                              const value = row[column]
                              return (
                                <TableCell key={column} sx={{ fontSize: 12 }}>
                                  {value}
                                </TableCell>
                              )
                            }
                          })}

                          <Stack direction='row' spacing={2}>
                            <Button
                              sx={{ color: '#e40077' }}
                              onClick={() => handleDelete(row['_id'])}
                            >
                              Delete
                            </Button>
                            <Button
                              sx={{ color: '#e40077' }}
                              onClick={() =>
                                navigate('/edit', { state: { data: row } })
                              }
                            >
                              Edit
                            </Button>
                          </Stack>
                        </TableRow>
                      )
                    })}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[10, 25, 100]}
              component='div'
              count={data.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </>
        ) : (
          <Typography variant='h6' component='h6'>
            No Result
          </Typography>
        )}
      </Paper>
    </div>
  )
}

export default H3C
