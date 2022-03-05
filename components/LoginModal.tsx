import React, { useState } from "react"
import Backdrop from "@mui/material/Backdrop"
import Box from "@mui/material/Box"
import Modal from "@mui/material/Modal"
import Fade from "@mui/material/Fade"
import Button from "@mui/material/Button"
import { TextField } from "@mui/material"
import axios from "axios"

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "50%",
  bgcolor: "background.paper",
  border: "1px solid #000",
  boxShadow: 24,
  p: 4,
  borderRadius: 5,
}

type Input = {
  email: string
  password: string
}

export default function TransitionsModal() {
  const [open, setOpen] = useState<boolean>(false)
  const [input, setInput] = useState<Input>({
    email: "",
    password: "",
  })
  const handleChange = (event: React.ChangeEvent<any>) => {
    const value = event.target.value
    setInput({
      ...input,
      [event.target.name]: value,
    })
  }

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const handleLogin = () => {
    axios.post("/api/auth/login", { email: input.email, password: input.password }).then((res) => {
      if (res.data.status === "ok") {
        localStorage.setItem("token", res.data.token)
        console.log(res.data.msg)
      }
    })
    handleClose()
  }

  return (
    <div>
      <Button onClick={handleOpen}>Login</Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <TextField label="Email" variant="outlined" type={"email"} name="email" onChange={(e) => handleChange(e)} />
            <TextField label="Password" variant="outlined" type="password" name="password" onChange={(e) => handleChange(e)} />
            <Button variant="contained" onClick={handleLogin}>
              Login
            </Button>
          </Box>
        </Fade>
      </Modal>
    </div>
  )
}
