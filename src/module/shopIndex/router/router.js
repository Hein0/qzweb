import ShopIndex from "./../shopIndex.vue"
import Shop from "./../shop.vue"
import community from "./../community.vue"
import location from "./../location.vue"


const routers = [
    {
        path: '/:user_id',
        component: ShopIndex,
        props: true
    },
    {
        path: '/shopindex/:user_id',
        name: 'shopindex',
        component: ShopIndex,
        props: true
    },
    {
        path: '/index/shop',
        name: 'shop',
        component: Shop,
        props: true
    },
	
	{
		path: '/index/community',
		name: 'community',
		component: community,
		props: true
	},
    {
        path: '/location/:index',
        name: 'location',
        component: location,
        props: true
    }
]

export default routers
