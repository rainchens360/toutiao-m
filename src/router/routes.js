/*
*
*          ┌─┐       ┌─┐
*       ┌──┘ ┴───────┘ ┴──┐
*       │                 │
*       │       ───       │
*       │  ─┬┘       └┬─  │
*       │                 │
*       │       ─┴─       │
*       │                 │
*       └───┐         ┌───┘
*           │         │
*           │         │
*           │         │
*           │         └──────────────┐
*           │                        │
*           │                        ├─┐
*           │                        ┌─┘
*           │                        │
*           └─┐  ┐  ┌───────┬──┐  ┌──┘
*             │ ─┤ ─┤       │ ─┤ ─┤
*             └──┴──┘       └──┴──┘
*                 神兽保佑
*                 代码无BUG!
*/
/**
 * 配置路由：
 * 1. 导入页面（组件）（懒加载）
 * 2. 根据页面规则配置路由
 */
// 标签页切换的公共布局组件（公共的头和底部）=》一级路由
// const Layout = () => import('@/views/layout')
// Layout一定会被访问=》所以不使用懒加载
import Layout from '@/views/layout'
// 导入4个标签页页面的二级路与组件
// 首页
const Home = () => import('@/views/home')
// 问答
const Question = () => import('@/views/question')
// 视频
const Video = () => import('@/views/video')
// 我的（个人中心）
const Profile = () => import('@/views/profile')
// 其它页面的一级路由
// 编辑登录人个人资料
const Edit = () => import('@/views/user/edit')
// 小智聊天
const Chat = () => import('@/views/user/chat')
// 登录
const Login = () => import('@/views/login')
// 搜索首页
const Search = () => import('@/views/search')
// 搜索结果页
const SearchResult = () => import('@/views/search/result')
// 文章详情
const Article = () => import('@/views/article')

const routes = [
  // 标签页路由
  {
    path: '/',
    component: Layout,
    children: [
      // 4个二级路由标签页
      {
        // 第一个标签页path和父路由一样？默认自动加载
        path: '/',
        name: 'Home',
        component: Home
      },
      {
        path: '/question',
        name: 'Question',
        component: Question
      },
      {
        path: '/video',
        name: 'Video',
        component: Video
      },
      {
        path: '/user',
        name: 'Profile',
        component: Profile
      }
    ]
  },
  {
    path: '/user/profile',
    name: 'Edit',
    component: Edit
  },
  {
    path: '/user/chat',
    name: 'Chat',
    component: Chat
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/search',
    name: 'Search',
    component: Search
  },
  {
    path: '/search/result',
    name: 'EdSearchResultit',
    component: SearchResult
  },
  {
    path: '/article/:id',
    name: 'Article',
    component: Article
  }

]

// 导出路由配置规则
export default routes
