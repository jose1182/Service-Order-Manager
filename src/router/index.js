import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/pages/Home.vue'
import Middlewares from '../middlewares/'
import AuthLayout from '../views/layouts/AuthLayout.vue'
import AppLayout from '../views/layouts/AppLayout.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
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
          permissions: ['view-technical-dashboard', 'view-admin-dashboard']
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
        path: '/orders',
        name: 'orders',
        component: () => import(/* webpackChunkName: "orders" */ '../views/pages/admin/orders/Orders.vue'),
        meta:{
          middleware: [Middlewares.auth, Middlewares.checkPermissions],
          permissions: ['view-admin-dashboard']
        }
      },
      {
        path: '/service',
        name: 'service',
        component: () => import(/*webpackChunkName: "service" */ '../views/pages/admin/service/Service.vue'),
        meta:{
          middleware: [Middlewares.auth, Middlewares.checkPermissions],
          permissions: ['view-admin-dashboard']
        }
      },
      {
        path: '/serviceDetail/:serviceId',
        name: 'serviceDetail',
        props: true,
        beforeEnter: (to, from, next) => {
          to.params.myCustomizations = {

          }
          next();
        },
        component: () => import(/* webpackChunkName: "serviceDetail" */ '../views/pages/admin/service/ServiceDetail.vue'),
        meta:{
          middleware: [Middlewares.auth, Middlewares.checkPermissions],
          permissions: ['view-technical-dashboard']
        }
      },
      {
        path: '/orders_v2/:orderId',
        name: 'orders_v2',
        props: true,
        beforeEnter: (to, from, next) => {
          to.params.myCustomizations = {
        
          }
          next();
        },
        component: () => import(/* webpackChunkName: "edit-order" */ '../views/pages/admin/orders/Orders_v2.vue'),
        meta:{
          middleware: [Middlewares.auth, Middlewares.checkPermissions],
          permissions: ['view-technical-dashboard']
        }
      },
      {
        path: '/users',
        name: 'users',
        props: true,
        component: () => import(/* webpackChunkName: "users" */ '../views/pages/admin/users/Users.vue'),
        meta:{
          middleware: [Middlewares.auth, Middlewares.checkPermissions],
          permissions: ['view-admin-dashboard']
        }
      },
      {
        path: '/costumers',
        name: 'costumers',
        props: true,
        component: () => import(/* webpackChunkName: "customers" */ '../views/pages/admin/costumers/Customers.vue'),
        meta:{
          middleware: [Middlewares.auth, Middlewares.checkPermissions],
          permissions: ['view-admin-dashboard']
        }
      },
      {
        path:'/contacts',
        name:'contacts',
        component: ()=> import(/*webpackChunkName: "contacts" */ '../views/pages/admin/contacts/Contacts.vue'),
        meta:{
          middleware: [Middlewares.auth, Middlewares.checkPermissions],
          permissions:['view-admin-dashboard']
        } 
      }
    ]
  },
  // otherwise redirect to home
  { path: '*', redirect: '/' }

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
