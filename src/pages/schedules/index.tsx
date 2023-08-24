import { Layout } from "@/components/layouts"
import { NewSchedule, ScheduleList } from "@/components/schedule"
import { Card, CardHeader, Grid } from '@mui/material';

export default function Schedule(){
  return (

    <Layout title='Home - New Schedule'>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <Card sx={{ height: 'calc(100vh - 100px)' }}>
            <CardHeader title='Lunes' />


            <NewSchedule />
            <ScheduleList day='monday' />
          </Card>
        </Grid>

        <Grid item xs={12} sm={2}>
          <Card sx={{ height: 'calc(100vh - 100px)' }}>
            <CardHeader title='Martes' />
            <ScheduleList day='tuesday' />
          </Card>
        </Grid>

        <Grid item xs={12} sm={2}>
          <Card sx={{ height: 'calc(100vh - 100px)' }}>
            <CardHeader title='Miercoles' />
            <ScheduleList day='wednesday' />
          </Card>
        </Grid>
        <Grid item xs={12} sm={2}>
          <Card sx={{ height: 'calc(100vh - 100px)' }}>
            <CardHeader title='Jueves' />
            <ScheduleList day='thursday' />
          </Card>
        </Grid>
        <Grid item xs={12} sm={2}>
          <Card sx={{ height: 'calc(100vh - 100px)' }}>
            <CardHeader title='Viernes' />
            <ScheduleList day='friday' />
          </Card>
        </Grid>
        <Grid item xs={12} sm={2}>
          <Card sx={{ height: 'calc(100vh - 100px)' }}>
            <CardHeader title='Sabado' />
            <ScheduleList day='saturday' />
          </Card>
        </Grid>
        <Grid item xs={12} sm={2}>
          <Card sx={{ height: 'calc(100vh - 100px)' }}>
            <CardHeader title='Domingo' />
            <ScheduleList day='sunday' />
          </Card>
        </Grid>
      </Grid>
    </Layout>
  )
}

