import { useContext } from 'react'
import { Divider, Drawer, Box, Typography, List, ListItem, ListItemIcon, ListItemText } from "@mui/material"

import InboxOutlinedIcon from '@mui/icons-material/InboxOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';

import { UIContext } from '@/context/ui';
import { useRouter } from 'next/router';

const menuItems: string[] = ['Inbox', 'Starred', 'Send Email', 'Drafts'];

export const Sidebar = () => {

    const { sidemenuOpen, closeSideMenu } = useContext(UIContext)
    const router = useRouter()

    const onClick = () => {
        router.push(`/schedules`)
    }

    return (
        <Drawer
            anchor="left"
            open={sidemenuOpen}
            onClose={closeSideMenu}
        >
            <Box sx={{ width: 250 }}>

                <Box sx={{ padding: '5px 10px' }}>
                    <Typography variant="h4">Menu</Typography>

                </Box>
                <List>
                    <ListItem button onClick={onClick}>
                        <ListItemIcon>
                            <EmailOutlinedIcon />
                        </ListItemIcon>
                        <ListItemText primary={'Horarios'} />

                    </ListItem>
                </List>

                <List>
                    {
                        menuItems.map((text, index) => (
                            <ListItem button key={text}>
                                <ListItemIcon>
                                    {index % 2 ? <InboxOutlinedIcon /> : <EmailOutlinedIcon />}
                                </ListItemIcon>
                                <ListItemText primary={text} />
                            </ListItem>
                        ))
                    }
                </List>
                <Divider />

                <List>
                    {
                        menuItems.map((text, index) => (
                            <ListItem button key={text}>
                                <ListItemIcon>
                                    {index % 2 ? <InboxOutlinedIcon /> : <EmailOutlinedIcon />}
                                </ListItemIcon>
                                <ListItemText primary={text} />
                            </ListItem>
                        ))
                    }
                </List>
            </Box>

        </Drawer >
    )
}
