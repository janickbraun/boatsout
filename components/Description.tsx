import { Box } from "@mui/material"
import { useState } from "react"

const Description = () => {
  const [openDescription, setOpenDescription] = useState(true)
  return openDescription ? (
    <div>
      <Box sx={{ display: "flex", justifyContent: "center", borderRadius: 3, border: 1, marginX: "18%" }}>
        <p style={{ display: "flex", textAlign: "center" }}>
          boatsout is a website where you can manage all your boats which are rented. It started as a small project i coded for my friend who works in
          a boat rental. Now he can use this website to easily track all his boats and manage them. Not only he can use this website now, you can do
          that aswell if you have a boat rental and want to easily track all your boats which are rented. At first you will have to sign up to keep
          track of your boats.
        </p>
      </Box>
    </div>
  ) : (
    <div>no desc</div>
  )
}

export default Description
