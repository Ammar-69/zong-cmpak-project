import { useContext, useEffect, useState } from 'react'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import {
  Box,
  FormControl,
  FormLabel,
  Grid,
  Stack,
  TextField,
  ThemeProvider,
  createTheme
} from '@mui/material'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

import styles from './styles.module.css'
import { AuthContext } from '../../App'

function Add() {
  const { palette } = createTheme()
  const { augmentColor } = palette
  const createColor = mainColor => augmentColor({ color: { main: mainColor } })
  const theme = createTheme({
    palette: {
      pink: createColor('#e40077')
    }
  })

  const { loggedIn } = useContext(AuthContext)

  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [status, setStatus] = useState('')
  const [cpu, setCPU] = useState('')
  const [memory, setMemory] = useState('')
  const [operatingSystem, setOperatingSystem] = useState('')
  const [ipv4, setIpv4] = useState('')
  const [casStatus, setCasStatus] = useState('')
  const [casVersion, setCasVersion] = useState('')
  const [diskCapacity, setDiskCapacity] = useState('')
  const [usedCapacity, setUsedCapacity] = useState('')
  const [availableCapacity, setAvailableCapacity] = useState('')
  const [username, setUsername] = useState('')

  useEffect(() => {
    if (!loggedIn) {
      return navigate('/login')
    }
  }, [])

  const handleSubmit = async e => {
    e.preventDefault()
    const body = {
      Name: name,
      Status: status,
      CPU: cpu,
      Memory: memory,
      'Operating System': operatingSystem,
      'IPv4 Address': ipv4,
      'CAStools Status': casStatus,
      'CAStools Version': casVersion,
      'Disk Capacity': diskCapacity,
      'Used Capacity': usedCapacity,
      'Available Capacity': availableCapacity,
      Username: username
    }

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/h3c/add`,
        {
          data: { ...body }
        }
      )

      navigate('/h3c')
    } catch (error) {
      console.error('Error creating document:', error)
    }
  }

  if (!loggedIn) {
    return <div />
  } else {
    return (
      <div>
        <AppBar
          position='fixed'
          sx={{
            zIndex: theme => theme.zIndex.drawer + 1,
            background: '#8fc31f'
          }}
        >
          <Toolbar>
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
        <Toolbar />
        <form onSubmit={e => handleSubmit(e)}>
          <FormControl sx={{ padding: '16px' }}>
            <Grid container>
              <Grid item xs={2}>
                <FormLabel>Name</FormLabel>
              </Grid>
              <Grid item xs={10}>
                <TextField
                  type='text'
                  variant='outlined'
                  required
                  value={name}
                  onChange={e => setName(e.target.value)}
                  fullWidth
                  size='small'
                />
              </Grid>
              <Grid item xs={2}>
                <FormLabel>Status</FormLabel>
              </Grid>
              <Grid item xs={10}>
                <TextField
                  type='text'
                  variant='outlined'
                  required
                  value={status}
                  onChange={e => setStatus(e.target.value)}
                  fullWidth
                  size='small'
                />
              </Grid>
              <Grid item xs={2}>
                <FormLabel>CPU</FormLabel>
              </Grid>
              <Grid item xs={10}>
                <TextField
                  type='text'
                  variant='outlined'
                  required
                  value={cpu}
                  onChange={e => setCPU(e.target.value)}
                  fullWidth
                  size='small'
                />
              </Grid>
              <Grid item xs={2}>
                <FormLabel>Memory</FormLabel>
              </Grid>
              <Grid item xs={10}>
                <TextField
                  type='text'
                  variant='outlined'
                  required
                  value={memory}
                  onChange={e => setMemory(e.target.value)}
                  fullWidth
                  size='small'
                />
              </Grid>
              <Grid item xs={2}>
                <FormLabel>Operating System</FormLabel>
              </Grid>
              <Grid item xs={10}>
                <TextField
                  type='text'
                  variant='outlined'
                  required
                  value={operatingSystem}
                  onChange={e => setOperatingSystem(e.target.value)}
                  fullWidth
                  size='small'
                />
              </Grid>
              <Grid item xs={2}>
                <FormLabel>IPv4 Address</FormLabel>
              </Grid>
              <Grid item xs={10}>
                <TextField
                  type='text'
                  variant='outlined'
                  required
                  value={ipv4}
                  onChange={e => setIpv4(e.target.value)}
                  fullWidth
                  size='small'
                />
              </Grid>
              <Grid item xs={2}>
                <FormLabel>CAStools Status</FormLabel>
              </Grid>
              <Grid item xs={10}>
                <TextField
                  type='text'
                  variant='outlined'
                  required
                  value={casStatus}
                  onChange={e => setCasStatus(e.target.value)}
                  fullWidth
                  size='small'
                />
              </Grid>
              <Grid item xs={2}>
                <FormLabel>CAStools Version</FormLabel>
              </Grid>
              <Grid item xs={10}>
                <TextField
                  type='text'
                  variant='outlined'
                  value={casVersion}
                  onChange={e => setCasVersion(e.target.value)}
                  fullWidth
                  size='small'
                />
              </Grid>
              <Grid item xs={2}>
                <FormLabel>Disk Capacity</FormLabel>
              </Grid>
              <Grid item xs={10}>
                <TextField
                  type='text'
                  variant='outlined'
                  value={diskCapacity}
                  onChange={e => setDiskCapacity(e.target.value)}
                  fullWidth
                  size='small'
                />
              </Grid>
              <Grid item xs={2}>
                <FormLabel>Used Capacity</FormLabel>
              </Grid>
              <Grid item xs={10}>
                <TextField
                  type='text'
                  variant='outlined'
                  value={usedCapacity}
                  onChange={e => setUsedCapacity(e.target.value)}
                  fullWidth
                  size='small'
                />
              </Grid>
              <Grid item xs={2}>
                <FormLabel>Available Capacity</FormLabel>
              </Grid>
              <Grid item xs={10}>
                <TextField
                  type='text'
                  variant='outlined'
                  value={availableCapacity}
                  onChange={e => setAvailableCapacity(e.target.value)}
                  fullWidth
                  size='small'
                />
              </Grid>
              <Grid item xs={2}>
                <FormLabel>Username</FormLabel>
              </Grid>
              <Grid item xs={10}>
                <TextField
                  type='text'
                  variant='outlined'
                  required
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                  fullWidth
                  size='small'
                />
              </Grid>
              <Grid item xs={12}>
                <ThemeProvider theme={theme}>
                  <Button
                    variant='contained'
                    fullWidth
                    type='submit'
                    color='pink'
                  >
                    Add
                  </Button>
                </ThemeProvider>
              </Grid>
            </Grid>
          </FormControl>
        </form>
      </div>
    )
  }
}

export default Add
