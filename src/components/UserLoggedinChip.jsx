import { Avatar, Chip, Tooltip } from '@mui/material';
import React from 'react'

const UserLoggedinChip = ({user, handleLogout}) => {
  return (
        <Tooltip title="logout" placement="bottom-end">
              <Chip
                avatar={
                  <Avatar
                    alt="User Avatar"
                    src="https://img.freepik.com/free-psd/3d-render-young-businesswoman-with-long-brown-hair-wearing-light-blue-blazer-white-shirt-she-looks-friendly-approachable-perfect-avatar-professional-woman_632498-32059.jpg"
                  />
                }
                label={user?.fname || "user"}
                variant="outlined"
                onClick={handleLogout}
              />
            </Tooltip>
  )
}

export default UserLoggedinChip;