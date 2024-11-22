import { createRouter, createWebHistory } from 'vue-router'
import PlatformView from '@/views/PlatformView.vue';
import AdminViews from '@/views/AdminViews/AdminViews.vue';
import DashBoardView from '@/views/AdminViews/DashBoardView.vue';
import NoticeManageView from '@/views/AdminViews/NoticeManageView.vue';
import UserManageView from '@/views/AdminViews/UserManageView.vue';
import NoticeWriteView from '@/views/AdminViews/NoticeWriteView.vue';
import NoticeReadView from '@/views/AdminViews/NoticeReadView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'platform',
      component: PlatformView,
    },
    {
      path: '/admin',
      name: 'admin',
      component: AdminViews,
      children: [
        {
          path: '',
          redirect: '/admin/dashboard',
        },
        {
          path: 'dashboard',
          name: 'dashboard',
          component: DashBoardView,
        },
        {
          path: 'notice_manage',
          name: 'noticeManage',
          component: NoticeManageView,
        },
        {
          path: 'user_manage',
          name: 'userManage',
          component: UserManageView,
        },
        {
          path: 'notice_write/:id?',
          name: 'noticeWrite',
          component: NoticeWriteView,
        },
        {
          path: 'notice_read/:id',
          name: 'noticeRead',
          component: NoticeReadView,
        },
      ],
    },
  ],
})

export default router
