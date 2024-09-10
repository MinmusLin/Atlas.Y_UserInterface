import {createRouter, createWebHistory} from 'vue-router/auto'
import {Router, RouteRecordRaw} from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/404'
  },
  {
    path: '/404',
    component: () => import('@/pages/NotFoundPage.vue'),
    meta: {title: 'Atlas.Y - Not Found'}
  },
  {
    path: '/home',
    component: () => import('@/pages/HomePage.vue'),
    meta: {title: 'Atlas.Y - Home'}
  },
  {
    path: '/basic-designer',
    component: () => import('@/pages/BasicDesignerPage.vue'),
    meta: {title: 'Atlas.Y - Basic Designer'}
  },
  {
    path: '/dynamic-designer',
    component: () => import('@/pages/DynamicDesignerPage.vue'),
    meta: {title: 'Atlas.Y - Dynamic Designer'}
  },
  {
    path: '/membership-plan',
    component: () => import('@/pages/MembershipPlanPage.vue'),
    meta: {title: 'Atlas.Y - Membership Plan'}
  },
  {
    path: '/algorithm-store',
    component: () => import('@/pages/AlgorithmStorePage.vue'),
    meta: {title: 'Atlas.Y - Algorithm Store'}
  },
  {
    path: '/user-guide',
    component: () => import('@/pages/UserGuidePage.vue'),
    meta: {title: 'Atlas.Y - User Guide'}
  },
  {
    path: '/technical-resources',
    component: () => import('@/pages/TechnicalResourcesPage.vue'),
    meta: {title: 'Atlas.Y - Technical Resources'}
  },
  {
    path: '/team',
    component: () => import('@/pages/TeamPage.vue'),
    meta: {title: 'Atlas.Y - Team'}
  },
  {
    path: '/wiki',
    component: () => import('@/pages/WikiPage.vue'),
    meta: {title: 'Atlas.Y - Wiki'}
  },
  {
    path: '/contact-us',
    component: () => import('@/pages/ContactUsPage.vue'),
    meta: {title: 'Atlas.Y - Contact Us'}
  },
  {
    path: '/contact-us/form',
    component: () => import('@/pages/ContactFormPage.vue'),
    meta: {title: 'Atlas.Y - Contact Form'}
  },
  {
    path: '/faqs',
    component: () => import('@/pages/FAQsPage.vue'),
    meta: {title: 'Atlas.Y - FAQs'}
  },
  {
    path: '/video-tutorials',
    component: () => import('@/pages/VideoTutorialsPage.vue'),
    meta: {title: 'Atlas.Y - Video Tutorials'}
  },
  {
    path: '/feedback',
    component: () => import('@/pages/FeedbackPage.vue'),
    meta: {title: 'Atlas.Y - Feedback'}
  },
  {
    path: '/basic-designer/matching-results',
    component: () => import('@/pages/BasicMatchingResultsPage.vue'),
    meta: {title: 'Atlas.Y - Basic Designer'}
  },
  {
    path: '/basic-designer/stability-evaluation',
    component: () => import('@/pages/BasicStabilityEvaluationPage.vue'),
    meta: {title: 'Atlas.Y - Basic Designer'}
  },
  {
    path: '/basic-designer/global-cad-score',
    component: () => import('@/pages/BasicGlobalCADScorePage.vue'),
    meta: {title: 'Atlas.Y - Basic Designer'}
  },
  {
    path: '/basic-designer/local-cad-score',
    component: () => import('@/pages/BasicLocalCADScorePage.vue'),
    meta: {title: 'Atlas.Y - Basic Designer'}
  },
  {
    path: '/basic-designer/result-details',
    component: () => import('@/pages/BasicResultDetailsPage.vue'),
    meta: {title: 'Atlas.Y - Basic Designer'}
  },
  {
    path: '/basic-designer/variant-details',
    component: () => import('@/pages/BasicVariantDetailsPage.vue'),
    meta: {title: 'Atlas.Y - Basic Designer'}
  },
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
