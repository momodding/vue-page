/* eslint-disable */
import Vue from 'vue';
import Router from 'vue-router';
import store from '../store/store';
import HelloWorld from '@/components/HelloWorld';
import LoginPage from '@/components/auth/Login';
import RegisterPage from '@/components/auth/Register';
import UserBoard from '@/components/dashboard/UserBoard';
import ListBoard from '@/components/dashboard/ListBoard';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld,
    },
    {
      path: '/login',
      name: 'login',
      component: LoginPage,
      meta: {
        guest: true,
      },
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterPage,
      meta: {
        guest: true,
      },
    },
    {
      path: '/dashboard',
      name: 'userboard',
      component: UserBoard,
      meta: {
        requiresAuth: true,
        is_admin: true
      },
    },
    {
      path: '/dashboard-list',
      name: 'listboard',
      component: ListBoard,
      meta: {
        requiresAuth: true,
        is_admin: true
      },
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.getters.isLoggedIn) {
      next({
        path: '/login',
        params: { nextUrl: to.fullPath },
      });
    } else {
      const user = JSON.parse(localStorage.getItem('user'));
      if (to.matched.some(record => record.meta.userRole)) {
        if (user.userRole === 1) {
          next();
        } else {
          next({ name: 'userboard' });
        }
      } else {
        next();
      }
    }
  } else if (to.matched.some(record => record.meta.guest)) {
    if (!store.getters.isLoggedIn) {
      next();
    } else {
      next({ name: 'userboard' });
    }
  } else {
    next();
  }
});

export default router;
