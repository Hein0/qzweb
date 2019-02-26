// const topicalSearch = resolve => require.ensure([], () => resolve(require('./../topicalSearch.vue')), 'topicalSearch')
// const topicalSelect = resolve => require.ensure([], () => resolve(require('./../topicalSelect.vue')), 'topicalSelect')
// const publishPost =   resolve => require.ensure([], () => resolve(require('./../publishPost.vue')),    'publishPost')
// const topicalDetail = resolve => require.ensure([], () => resolve(require('./../topicalDetail.vue')),   'topicalDetail')

import topicalSearch from '../topicalSearch.vue'
import topicalSelect from '../topicalSelect.vue'
import publishPost from '../publishPost.vue'
import topicalDetail from '../topicalDetail.vue'
import comment from '../comment.vue'

const routers = [
	{
		path: "/comment",
		name: "comment",
		component: comment,
		props: true
	},
	{
		path: "/publishPost",
		name: "publishPost",
		component: publishPost,
		props: true
	},
  {
    path: "/topicalSearch",
    name: "topicalSearch",
    component: topicalSearch,
    props: true
  },
	
	{
		path: "/topicalDetail",
		name: "topicalDetail",
		component: topicalDetail,
		props: true
	},
	
	{
		path: "/topicalSelect",
		name: "topicalSelect",
		component: topicalSelect,
		props: true
	},
];

export default routers;
