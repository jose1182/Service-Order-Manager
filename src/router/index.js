import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/auth/Login.vue'
import Middlewares from '../middlewares/'
import AuthLayout from '../views/layouts/AuthLayout.vue'
import AppLayout from '../views/layouts/AppLayout.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'login',
    component: Login
  },

  {
    name: 'auth',
    path: '/',
    component: AuthLayout,
    children: [
      {
        path: 'login',
        name: 'login',
        component: () => import(/* webpackChunkName: "login" */ '../views/auth/Login.vue'),
        meta:{
          middleware:[Middlewares.guest]
        }
      },
      {
        path: 'register',
        name: 'register',
        component: () => import(/* webpackChunkName: "register" */ '../views/auth/Register.vue'),
        meta:{
          middleware:[Middlewares.guest]
        }
      },
      {
        path: 'forgot-password',
        name: 'forgotPassword',
        component: () => import(/* webpackChunkName: "forgotPassword" */ '../views/auth/ForgotPassword.vue'),
        meta:{
          middleware:[Middlewares.guest]
        }
      },
      {
        path: 'reset-password',
        name: 'resetPassword',
        component: () => import(/* webpackChunkName: "resetPassword" */ '../views/auth/ResetPassword.vue'),
        meta:{
          middleware:[Middlewares.guest]
        }
      },
    ]
  },


  {
    path: '/',
    component: AppLayout,
    children:[
      {
        path: '/dashboard',
        name: 'dashboard',
        component: () => import(/* webpackChunkName: "dashboard" */ '../views/pages/Dashboard.vue'),
        meta:{
          middleware: [Middlewares.auth, Middlewares.checkPermissions],
          permissions: ['view-technical-dashboard']
        }
      },
      {
        path: 'profile',
        name: 'profile',
        component: () => import(/* webpackChunkName: "profile" */ '../views/pages/Profile.vue'),
        meta:{
          middleware:[Middlewares.auth]
        }
      },
      {
        path: '/import',
        name: 'import',
        component: () => import(/* webpackChunkName: "import" */ '../views/pages/ImportDataBase.vue'),
        meta:{
          middleware: [Middlewares.auth, Middlewares.checkPermissions],
          permissions: ['view-technical-dashboard']
        }
      },
      {
        path: '/order-tables',
        name: 'order-tables',
        component: () => import(/* webpackChunkName: "order-tables" */ '../views/pages/tables/OrdersDetailTable.vue'),
        meta:{
          middleware: [Middlewares.auth, Middlewares.checkPermissions],
          permissions: ['view-technical-dashboard']
        }
      },
      {
        path: '/edit-order/:orderId',
        name: 'edit-order',
        props: true,
        beforeEnter: (to, from, next) => {
          to.params.myCustomizations = {
        
          }
          next();
        },
        component: () => import(/* webpackChunkName: "edit-order" */ '../views/pages/orders/EditServiceOrder.vue'),
        meta:{
          middleware: [Middlewares.auth, Middlewares.checkPermissions],
          permissions: ['view-technical-dashboard']
        }
      },
    ]
  }


]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

function nextCheck(context, middleware, index) {
  const nextMiddleware = middleware[index];

  if (!nextMiddleware) return context.next;

  return (...parameters) => {
      context.next(...parameters);
      const nextMidd = nextCheck(context, middleware, index + 1);

      nextMiddleware({...context, next: nextMidd});
  }
}

router.beforeEach((to, from, next) => {
  if (to.meta.middleware) {
      const middleware = Array.isArray(to.meta.middleware) ? to.meta.middleware : [to.meta.middleware];

      const ctx = {
          from,
          next,
          router,
          to
      };

      const nextMiddleware = nextCheck(ctx, middleware, 1);

      return middleware[0]({...ctx, next: nextMiddleware});
  }

  return next();
});
export default router
