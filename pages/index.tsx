import type { NextPage } from "next"
import LoginModal from "components/LoginModal"
import SignUpModal from "components/SignUpModal"
import { Typography, Avatar, IconButton, Box, Fab, Tooltip } from "@mui/material"
import AddIcon from "@mui/icons-material/Add"
import EditIcon from "@mui/icons-material/Edit"
import Description from "components/Description"

const Home: NextPage = () => {
  return (
    <div>
      <Description />

      {/*
      <IconButton color="primary" aria-label="add">
        <AddIcon />
      </IconButton>
      <IconButton color="primary" aria-label="avatar">
        <Avatar />
      </IconButton>
      <Tooltip title="Add boat">
        <Box sx={{ "& > :not(style)": { m: 1 } }}>
          <Fab color="primary" aria-label="add">
            <AddIcon />
          </Fab>
        </Box>
      </Tooltip>
      */}

      <LoginModal />
      <SignUpModal />
    </div>
  )
}

export default Home
