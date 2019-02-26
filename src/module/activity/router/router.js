import Activity from "./../activity.vue"


const routers = [
    {
        path: '/',
        name: 'activity',
        component: Activity,
        props: true
    },
    {
        path: '/:user_id',
        name: 'activity',
        component: Activity,
        props: true
    },

]

export default routers
