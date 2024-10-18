import {createRouter, createWebHistory} from 'vue-router/auto'
import {Router, RouteRecordRaw} from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  // Page Redirect Configuration
  {
    path: '/',
    redirect: '/basic-designer'
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/404'
  },
  // 404 Not Found Page
  {
    path: '/404',
    component: () => import('@/pages/NotFoundPage.vue'),
    meta: {title: 'Atlas.Y - Not Found'}
  },
  // Account Pages
  {
    path: '/register',
    component: () => import('@/pages/AccountPages/RegisterPage.vue'),
    meta: {title: 'Atlas.Y - Register'}
  },
  {
    path: '/login',
    component: () => import('@/pages/AccountPages/LoginPage.vue'),
    meta: {title: 'Atlas.Y - Login'}
  },
  // Tag Designer - Basic Designer Pages
  {
    path: '/basic-designer',
    component: () => import('@/pages/BasicDesignerPages/BasicHomePage.vue'),
    meta: {title: 'Atlas.Y - Basic Designer'}
  },
  {
    path: '/basic-designer/configuration',
    component: () => import('@/pages/BasicDesignerPages/BasicConfigurationPage.vue'),
    meta: {title: 'Atlas.Y - Basic Designer'}
  },
  {
    path: '/basic-designer/matching-results',
    component: () => import('@/pages/BasicDesignerPages/BasicMatchingResultsPage.vue'),
    meta: {title: 'Atlas.Y - Basic Designer'}
  },
  {
    path: '/basic-designer/global-cad-score/:id',
    component: () => import('@/pages/BasicDesignerPages/BasicGlobalCADScorePage.vue'),
    meta: {title: 'Atlas.Y - Basic Designer'}
  },
  {
    path: '/basic-designer/stability-evaluation/:id',
    component: () => import('@/pages/BasicDesignerPages/BasicStabilityEvaluationPage.vue'),
    meta: {title: 'Atlas.Y - Basic Designer'}
  },
  {
    path: '/basic-designer/directed-evolution-results/:id',
    component: () => import('@/pages/BasicDesignerPages/BasicDirectedEvolutionResultsPage.vue'),
    meta: {title: 'Atlas.Y - Basic Designer'}
  },
  {
    path: '/basic-designer/local-cad-score/:id',
    component: () => import('@/pages/BasicDesignerPages/BasicLocalCADScorePage.vue'),
    meta: {title: 'Atlas.Y - Basic Designer'}
  },
  {
    path: '/basic-designer/result-details/:id',
    component: () => import('@/pages/BasicDesignerPages/BasicResultDetailsPage.vue'),
    meta: {title: 'Atlas.Y - Basic Designer'}
  },
  {
    path: '/basic-designer/variant-details/:fpid/:vrid',
    component: () => import('@/pages/BasicDesignerPages/BasicVariantDetailsPage.vue'),
    meta: {title: 'Atlas.Y - Basic Designer'}
  },
  // Tag Designer - Dynamic Designer Pages
  {
    path: '/dynamic-designer',
    component: () => import('@/pages/DynamicDesignerPages/DynamicDesignerHomePage.vue'),
    meta: {title: 'Atlas.Y - Dynamic Designer'}
  },
  {
    path: '/dynamic-designer/configuration',
    component: () => import('@/pages/DynamicDesignerPages/DynamicConfigurationPage.vue'),
    meta: {title: 'Atlas.Y - Dynamic Designer'}
  },
  {
    path: '/dynamic-designer/matching-results',
    component: () => import('@/pages/DynamicDesignerPages/DynamicMatchingResultsPage.vue'),
    meta: {title: 'Atlas.Y - Dynamic Designer'}
  },
  {
    path: '/dynamic-designer/result-details/:id',
    component: () => import('@/pages/DynamicDesignerPages/DynamicResultDetailsPage.vue'),
    meta: {title: 'Atlas.Y - Dynamic Designer'}
  },
  {
    path: '/dynamic-designer/detailed-report/:id',
    component: () => import('@/pages/DynamicDesignerPages/DynamicDetailedReportPage.vue'),
    meta: {title: 'Atlas.Y - Dynamic Designer'}
  },
  {
    path: '/dynamic-designer/stability-evaluation/:id',
    component: () => import('@/pages/DynamicDesignerPages/DynamicStabilityEvaluationPage.vue'),
    meta: {title: 'Atlas.Y - Dynamic Designer'}
  },
  // Store Pages
  {
    path: '/algorithm-store',
    component: () => import('@/pages/StorePages/AlgorithmStorePage.vue'),
    meta: {title: 'Atlas.Y - Algorithm Store'}
  },
  {
    path: '/membership-plan',
    component: () => import('@/pages/StorePages/MembershipPlanPage.vue'),
    meta: {title: 'Atlas.Y - Membership Plan'}
  },
  // About Pages
  {
    path: '/team',
    component: () => import('@/pages/AboutPages/TeamPage.vue'),
    meta: {title: 'Atlas.Y - Team'}
  },
  {
    path: '/wiki',
    component: () => import('@/pages/AboutPages/WikiPage.vue'),
    meta: {title: 'Atlas.Y - Wiki'}
  },
  {
    path: '/contact-us',
    component: () => import('@/pages/AboutPages/ContactUsPage.vue'),
    meta: {title: 'Atlas.Y - Contact Us'}
  },
  {
    path: '/contact-us/form',
    component: () => import('@/pages/AboutPages/ContactFormPage.vue'),
    meta: {title: 'Atlas.Y - Contact Form'}
  },
  // Support Pages
  {
    path: '/faqs',
    component: () => import('@/pages/SupportPages/FAQsPage.vue'),
    meta: {title: 'Atlas.Y - FAQs'}
  },
  {
    path: '/feedback',
    component: () => import('@/pages/SupportPages/FeedbackPage.vue'),
    meta: {title: 'Atlas.Y - Feedback'}
  }
]

const router: Router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach((to, _, next) => {
  if (to.meta && to.meta.title) {
    document.title = to.meta.title as string
  } else {
    document.title = 'Atlas.Y'
  }
  next()
})

router.onError((err, to) => {
  if (err?.message?.includes?.('Failed to fetch dynamically imported module')) {
    if (!localStorage.getItem('vuetify:dynamic-reload')) {
      console.log('Reloading page to fix dynamic import error')
      localStorage.setItem('vuetify:dynamic-reload', 'true')
      location.assign(to.fullPath)
    } else {
      console.error('Dynamic import error, reloading page did not fix it', err)
    }
  } else {
    console.error(err)
  }
})

router.isReady().then(() => {
  localStorage.removeItem('vuetify:dynamic-reload')
})

export default router
