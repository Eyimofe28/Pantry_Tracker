'use client'

import { useState, useEffect } from 'react'
import { Box, Stack, Typography, Button, Modal, TextField } from '@mui/material'
// import FoodImage from './White_Food.jpg'
import { firestore } from '@/firebase'
import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  deleteDoc,
  getDoc,
} from 'firebase/firestore'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90%',
  maxWidth: 400,
  bgcolor: 'white',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  display: 'flex',
  flexDirection: 'column',
  gap: 3,
}

export default function Home() {
  const [inventory, setInventory] = useState([])
  const [open, setOpen] = useState(false)
  const [itemName, setItemName] = useState('')

  const updateInventory = async () => {
    const snapshot = query(collection(firestore, 'inventory'))
    const docs = await getDocs(snapshot)
    const inventoryList = []
    docs.forEach((doc) => {
      inventoryList.push({ name: doc.id, ...doc.data() })
    })
    setInventory(inventoryList)
  }

  const addItem = async (item) => {
    const docRef = doc(collection(firestore, 'inventory'), item)
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
      const { quantity } = docSnap.data()
      await setDoc(docRef, { quantity: quantity + 1 })
    } else {
      await setDoc(docRef, { quantity: 1 })
    }
    await updateInventory()
  }

  const removeItem = async (item) => {
    const docRef = doc(collection(firestore, 'inventory'), item)
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
      const { quantity } = docSnap.data()
      if (quantity === 1) {
        await deleteDoc(docRef)
      } else {
        await setDoc(docRef, { quantity: quantity - 1 })
      }
    }
    await updateInventory()
  }

  useEffect(() => {
    updateInventory()
  }, [])

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  return (
    <Box
      width="100vw"
      height="100vh"
      display={'flex'}
      justifyContent={'center'}
      flexDirection={'column'}
      alignItems={'center'}
      gap={2}
      sx={{
        // backgroundImage: `url(${FoodImage})` FFEAE3,
        backgroundColor: '#352F44',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <Box
        width={{ xs: '90%', sm: '80%', md: '70%', lg: '60%' }}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography variant="h4" color="white">
          Welcome To Your Pantry Tracker!
        </Typography>
        <Button
          variant="contained"
          sx={{ bgcolor: '#03ecfc', color: 'black' }}
          onClick={handleOpen}
        >
          Add New Item
        </Button>
      </Box>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Add Item
          </Typography>
          <Stack width="100%" direction={'row'} spacing={2}>
            <TextField
              id="outlined-basic"
              label="Item"
              variant="outlined"
              fullWidth
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
            />
            <Button
              variant="outlined"
              sx={{ bgcolor: 'green', color: 'white' }}
              onClick={() => {
                addItem(itemName)
                setItemName('')
                handleClose()
              }}
            >
              Add
            </Button>
          </Stack>
        </Box>
      </Modal>
      <Box
        width={{ xs: '90%', sm: '80%', md: '70%', lg: '60%' }}
        border={'1px solid #333'}
        bgcolor="#fff"
        p={2}
        borderRadius={2}
        boxShadow={3}
      >
        <Box
          width="100%"
          bgcolor={'#B9B4C7'}
          display={'flex'}
          justifyContent={'space-between'}
          alignItems={'center'}
          py={2}
        >
          <Typography variant={'h4'} color={'white'} textAlign={'center'} ml={2}>
            Inventory Items
          </Typography>
          <Typography variant={'h4'} color={'white'} textAlign={'center'} mr={3}>
            Quantity
          </Typography>
        </Box>
        <Stack
          width="100%"
          spacing={2}
          sx={{ overflowY: 'auto', maxHeight: 300 }}
        >
          {inventory.map(({ name, quantity }) => (
            <Box
              key={name}
              display={'flex'}
              justifyContent={'space-between'}
              alignItems={'center'}
              bgcolor={'#f0f0f0'}
              p={2}
              borderRadius={1}
              flexWrap="wrap"
            >
              <Box
                display="flex"
                flexDirection="column"
                alignItems="flex-start"
                flexBasis="60%"
                flexGrow={1}
              >
                <Typography variant={'h6'} color={'#333'}>
                  {name.charAt(0).toUpperCase() + name.slice(1)}
                </Typography>
              </Box>
              <Box
                display="flex"
                alignItems="center"
                justifyContent="flex-end"
                flexBasis="40%"
                flexGrow={1}
                minWidth={150}
              >
                <Button
                  variant="contained"
                  sx={{ bgcolor: "#F44336", color: "white", borderRadius: "5px", minWidth: "40px" }}
                  onClick={() => removeItem(name)}
                  size="small"
                >
                  -
                </Button>
                <Typography
                  variant={'h6'}
                  color={'#333'}
                  textAlign={'center'}
                  mx={3}
                >
                  {quantity}
                </Typography>
                <Button
                  variant="contained"
                  sx={{ bgcolor: "green", color: "white", borderRadius: "5px", minWidth: "40px" }}
                  onClick={() => addItem(name)}
                  size="small"
                >
                  +
                </Button>
              </Box>
            </Box>
          ))}
        </Stack>
      </Box>
    </Box>
  )
}
