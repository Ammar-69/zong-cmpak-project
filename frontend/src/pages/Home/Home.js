import React, { useState, useEffect } from 'react'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import {
  Avatar,
  Box,
  FormLabel,
  TextField,
  ThemeProvider,
  createTheme
} from '@mui/material'

import styles from './styles.module.css'

function Home() {
  const { palette } = createTheme()
  const { augmentColor } = palette
  const createColor = mainColor => augmentColor({ color: { main: mainColor } })
  const theme = createTheme({
    palette: {
      pink: createColor('#e40077')
    }
  })

  const navigate = useNavigate()

  const [searchVisible, setSerachVisible] = useState(false)

  const [name, setName] = useState('')
  const [project, setProject] = useState('')
  const [ip, setIP] = useState('')

  const handleSearchSubmit = async e => {
    e.preventDefault()

    if (name == '' && project == '' && ip == '') {
      return
    }

    const body = {
      Name: name != '' ? name : undefined,
      // Project: project != '' ? project : undefined,
      'IPv4 Address': ip != '' ? ip : undefined
    }

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/h3c/search`,
        {
          data: { ...body }
        }
      )

      navigate('/h3c', { state: { data: res.data.result } })
    } catch (error) {
      console.error('Error creating document:', error)
    }
  }

  return (
    <div>
      <AppBar position='fixed' sx={{ background: '#8fc31f' }}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Box
            component='img'
            sx={{
              width: 110
            }}
            alt='Logo'
            src='/logo.png'
          />
          <Box>
            <Button
              color='inherit'
              onClick={() => setSerachVisible(state => !state)}
            >
              Search
            </Button>
            <Button color='inherit' onClick={() => navigate('/add')}>
              Add
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
      <Toolbar sx={{ display: searchVisible ? 'flex' : 'none' }} />
      <form
        className={styles.root}
        style={{ display: searchVisible ? 'flex' : 'none' }}
        onSubmit={e => handleSearchSubmit(e)}
      >
        <div className={styles.item}>
          <FormLabel sx={{ fontWeight: 'bold' }}>Name: </FormLabel>
          <TextField
            type='text'
            variant='outlined'
            value={name}
            onChange={e => setName(e.target.value)}
            size='small'
          />
        </div>
        <div className={styles.item}>
          <FormLabel sx={{ fontWeight: 'bold' }}>Project: </FormLabel>
          <TextField
            type='text'
            variant='outlined'
            value={project}
            onChange={e => setProject(e.target.value)}
            size='small'
          />
        </div>
        <div className={styles.item}>
          <FormLabel sx={{ fontWeight: 'bold' }}>IP: </FormLabel>
          <TextField
            type='text'
            variant='outlined'
            value={ip}
            onChange={e => setIP(e.target.value)}
            size='small'
          />
        </div>
        <ThemeProvider theme={theme}>
          <Button sx={{ mr: 3 }} type='submit' variant='contained' color='pink'>
            Search
          </Button>
        </ThemeProvider>
      </form>
      <div className={styles.container}>
        <Button
          onClick={() => navigate('/h3c')}
          sx={{ flexDirection: 'column', color: 'black', fontWeight: 'bold' }}
        >
          <img src='/h3c-1.png' height={220} width={220} />
          H3C Cloud
        </Button>
        <Button
          sx={{ flexDirection: 'column', color: 'black', fontWeight: 'bold' }}
        >
          <img src='/huawei-no-text.png' height={220} width={250} />
          Huawei LHR Cloud
        </Button>
        <Button
          sx={{ flexDirection: 'column', color: 'black', fontWeight: 'bold' }}
        >
          <img src='/huawei-no-text.png' height={220} width={250} />
          Huawei ISB Cloud
        </Button>
      </div>
    </div>
  )
}

export default Home
