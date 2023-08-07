import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import {
  FormControl,
  Grid,
  FormLabel,
  TextField,
  ThemeProvider,
  createTheme
} from '@mui/material'
import { useState, useContext, useEffect } from 'react'
import { AuthContext } from '../../App'
import { useNavigate } from 'react-router-dom'

import styles from './styles.module.css'

function Login() {
  const { palette } = createTheme()
  const { augmentColor } = palette
  const createColor = mainColor => augmentColor({ color: { main: mainColor } })
  const theme = createTheme({
    palette: {
      pink: createColor('#e40077')
    }
  })

  const { loggedIn, setLoggedIn } = useContext(AuthContext)

  const navigate = useNavigate()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    if (loggedIn) {
      return navigate('/')
    }
  }, [])

  const handleSubmit = e => {
    e.preventDefault()

    if (username == '' || password == '') {
      return
    }

    if (username == 'admin' && password == 'admin') {
      setLoggedIn(true)
      return navigate('/')
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
        </Toolbar>
      </AppBar>
      <form className={styles.container} onSubmit={e => handleSubmit(e)}>
        <FormControl>
          <Grid container>
            <Grid item xs={2}>
              <FormLabel>Username</FormLabel>
            </Grid>
            <Grid item xs={12}>
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
            <Grid item xs={2}>
              <FormLabel>Password</FormLabel>
            </Grid>
            <Grid item xs={12}>
              <TextField
                type='password'
                variant='outlined'
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                fullWidth
                size='small'
              />
            </Grid>
            <Grid item xs={12} mt={2}>
              <ThemeProvider theme={theme}>
                <Button
                  variant='contained'
                  fullWidth
                  type='submit'
                  color='pink'
                >
                  Login
                </Button>
              </ThemeProvider>
            </Grid>
          </Grid>
        </FormControl>
      </form>
    </div>
  )
}

export default Login
