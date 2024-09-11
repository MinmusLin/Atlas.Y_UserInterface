import {createRouter, createWebHistory} from 'vue-router/auto'
import {Router, RouteRecordRaw} from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/basic-designer'
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
    path: '/basic-designer',
    component: () => import('@/pages/BasicDesignerPages/BasicDesignerHomePage.vue'),
    meta: {title: 'Atlas.Y - Basic Designer'}
  },
  {
    path: '/basic-designer/configuration',
    component: () => import('@/pages/BasicDesignerPages/BasicDesignerConfigurationPage.vue'),
    meta: {title: 'Atlas.Y - Basic Designer'}
  },
  {
    path: '/dynamic-designer',
    component: () => import('@/pages/DynamicDesignerPages/DynamicDesignerHomePage.vue'),
    meta: {title: 'Atlas.Y - Dynamic Designer'}
  },
  {
    path: '/membership-plan',
    component: () => import('@/pages/StorePages/MembershipPlanPage.vue'),
    meta: {title: 'Atlas.Y - Membership Plan'}
  },
  {
    path: '/algorithm-store',
    component: () => import('@/pages/StorePages/AlgorithmStorePage.vue'),
    meta: {title: 'Atlas.Y - Algorithm Store'}
  },
  {
    path: '/user-guide',
    component: () => import('@/pages/DocumentationPages/UserGuidePage.vue'),
    meta: {title: 'Atlas.Y - User Guide'}
  },
  {
    path: '/technical-resources',
    component: () => import('@/pages/DocumentationPages/TechnicalResourcesPage.vue'),
    meta: {title: 'Atlas.Y - Technical Resources'}
  },
  {
    path: '/team',
    component: () => import('@/pages/TeamPages/TeamPage.vue'),
    meta: {title: 'Atlas.Y - Team'}
  },
  {
    path: '/wiki',
    component: () => import('@/pages/TeamPages/WikiPage.vue'),
    meta: {title: 'Atlas.Y - Wiki'}
  },
  {
    path: '/contact-us',
    component: () => import('@/pages/TeamPages/ContactUsPage.vue'),
    meta: {title: 'Atlas.Y - Contact Us'}
  },
  {
    path: '/contact-us/form',
    component: () => import('@/pages/TeamPages/ContactFormPage.vue'),
    meta: {title: 'Atlas.Y - Contact Form'}
  },
  {
    path: '/faqs',
    component: () => import('@/pages/SupportPages/FAQsPage.vue'),
    meta: {title: 'Atlas.Y - FAQs'}
  },
  {
    path: '/video-tutorials',
    component: () => import('@/pages/SupportPages/VideoTutorialsPage.vue'),
    meta: {title: 'Atlas.Y - Video Tutorials'}
  },
  {
    path: '/feedback',
    component: () => import('@/pages/SupportPages/FeedbackPage.vue'),
    meta: {title: 'Atlas.Y - Feedback'}
  },
  {
    path: '/basic-designer/matching-results',
    component: () => import('@/pages/BasicDesignerPages/BasicMatchingResultsPage.vue'),
    meta: {title: 'Atlas.Y - Basic Designer'}
  },
  {
    path: '/basic-designer/stability-evaluation',
    component: () => import('@/pages/BasicDesignerPages/BasicStabilityEvaluationPage.vue'),
    meta: {title: 'Atlas.Y - Basic Designer'}
  },
  {
    path: '/basic-designer/directed-evolution-results',
    component: () => import('@/pages/BasicDesignerPages/BasicDirectedEvolutionResultsPage.vue'),
    meta: {title: 'Atlas.Y - Basic Designer'}
  },
  {
    path: '/basic-designer/global-cad-score',
    component: () => import('@/pages/BasicDesignerPages/BasicGlobalCADScorePage.vue'),
    meta: {title: 'Atlas.Y - Basic Designer'}
  },
  {
    path: '/basic-designer/local-cad-score',
    component: () => import('@/pages/BasicDesignerPages/BasicLocalCADScorePage.vue'),
    meta: {title: 'Atlas.Y - Basic Designer'}
  },
  {
    path: '/basic-designer/result-details',
    component: () => import('@/pages/BasicDesignerPages/BasicResultDetailsPage.vue'),
    meta: {title: 'Atlas.Y - Basic Designer'}
  },
  {
    path: '/basic-designer/variant-details',
    component: () => import('@/pages/BasicDesignerPages/BasicVariantDetailsPage.vue'),
    meta: {title: 'Atlas.Y - Basic Designer'}
  },
  {
    path: '/register',
    component: () => import('@/pages/AccountPages/RegisterPage.vue'),
    meta: {title: 'Atlas.Y - Register'}
  },
  {
    path: '/login',
    component: () => import('@/pages/AccountPages/LoginPage.vue'),
    meta: {title: 'Atlas.Y - Login'}
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
