<template>
  <nav class='menu' :class="{ 'collapsed': isCollapsed }" @mouseenter='isCollapsed=false' @mouseleave='collapseMenu'>
    <div class='logo-container'>
      <img src='https://static.igem.wiki/teams/5503/software-materials/lighticon.webp'
           class='nav-icon'
           alt='LightIcon'
           :style='iconStyle'
           @click="router.push('/')">
      <transition name='fade'>
        <img v-if='!isCollapsed'
             src='https://static.igem.wiki/teams/5503/software-materials/lightlogo.webp'
             class='nav-logo'
             alt='LightLogo'
             @click="router.push('/')">
      </transition>
    </div>

    <div class='menu-content'>
      <ul>
        <li class='sub-menu' v-for='menu in menus' :key='menu.id'>
          <div class='menu-title' :class="{ 'highlighted': isHighlighted(menu.id) }" @click='toggleSubMenu(menu.id)'>
            <component :is='menu.icon' class='icon-size'/>
            <span v-show='!isCollapsed' style='margin-left: 6px; font-size: 14px'>{{ menu.title }}</span>
            <span class='icon-toggle' v-show='!isCollapsed'>
            <ArrowUpBold :style='rotateStyle(menu.id)'/>
          </span>
          </div>

          <transition name='slide' @enter='enter' @after-enter='afterEnter' @leave='leave'>
            <ul v-show='isActive(menu.id) && !isCollapsed' ref='subMenu'>
              <li v-for='item in menu.items'
                  :key='item.route'
                  style='font-size: 12px'
                  :class="{ 'highlighted': currentRoute.startsWith(item.route) }"
                  @click='handleRoute(item.route)'>
                {{ item.name }}
              </li>
            </ul>
          </transition>
        </li>
      </ul>

      <div class='login-container' @click="router.push('/login')">
        <el-icon :size='23' class='avatar'>
          <Avatar/>
        </el-icon>
        <span v-show='!isCollapsed' class='login-text'>Log in</span>
      </div>
    </div>
  </nav>
</template>

<script setup lang='ts'>
import {computed, ref, watch} from 'vue'
import {useRouter} from 'vue-router'
import {PriceTag, Document, User, ChatDotSquare, ArrowUpBold, ShoppingBag, Avatar} from '@element-plus/icons-vue'

const activeIndices = ref<Set<number>>(new Set())
const isCollapsed = ref<boolean>(true)
const router = useRouter()
const currentRoute = ref<string>(router.currentRoute.value.path)

const menus = ref([
  {
    id: 1,
    title: 'Tag Designer',
    icon: PriceTag,
    items: [
      {name: 'Basic Designer', route: '/basic-designer'},
      {name: 'Dynamic Designer', route: '/dynamic-designer'}
    ]
  },
  {
    id: 2,
    title: 'Store',
    icon: ShoppingBag,
    items: [
      {name: 'Algorithm Store', route: '/algorithm-store'},
      {name: 'Membership Plan', route: '/membership-plan'}
    ]
  },
  {
    id: 3,
    title: 'Documentation',
    icon: Document,
    items: [
      {name: 'User Guide', route: '/user-guide'}
    ]
  },
  {
    id: 4,
    title: 'About',
    icon: User,
    items: [
      {name: 'Team', route: '/team'},
      {name: 'Wiki', route: '/wiki'},
      {name: 'Contact Us', route: '/contact-us'}
    ]
  },
  {
    id: 5,
    title: 'Support',
    icon: ChatDotSquare,
    items: [
      {name: 'FAQs', route: '/faqs'},
      {name: 'Video Tutorials', route: '/video-tutorials'},
      {name: 'Feedback', route: '/feedback'}
    ]
  }
])

watch(() => router.currentRoute.value.path, (newPath) => currentRoute.value = newPath)

function handleRoute(route: string) {
  if (route == '/user-guide') {
    window.open('https://static.igem.wiki/teams/5503/userguide.pdf', '_blank')
  } else if (route == '/video-tutorials') {
    window.open('https://video.igem.org/w/tjMyxGhNrzGdEjokW5i7Ah', '_blank')
  } else {
    router.push(route)
  }
}

function toggleSubMenu(index: number) {
  if (isCollapsed.value) {
    return
  }
  if (activeIndices.value.has(index)) {
    activeIndices.value.delete(index)
  } else {
    activeIndices.value.add(index)
  }
}

function isActive(index: number) {
  return activeIndices.value.has(index)
}

function isHighlighted(index: number) {
  const menu = menus.value.find(m => m.id == index)
  if (!menu) {
    return false
  }
  return menu.items.some(item => currentRoute.value.startsWith(item.route))
}

function collapseMenu() {
  isCollapsed.value = true
  activeIndices.value.clear()
}

function enter(el: Element, done: () => void) {
  const element = el as HTMLElement
  element.style.height = '0'
  element.style.opacity = '0'
  element.style.transition = 'height 0.25s ease, opacity 0.25s ease'
  requestAnimationFrame(() => {
    element.style.height = element.scrollHeight + 'px'
    element.style.opacity = '1'
    const transitionEnd = () => {
      element.removeEventListener('transitionend', transitionEnd)
      done()
    }
    element.addEventListener('transitionend', transitionEnd)
  })
}

function afterEnter(el: Element) {
  const element = el as HTMLElement
  element.style.height = 'auto'
}

function leave(el: Element, done: () => void) {
  const element = el as HTMLElement
  element.style.height = element.scrollHeight + 'px'
  element.style.opacity = '1'
  element.style.transition = 'height 0.25s ease, opacity 0.25s ease'
  requestAnimationFrame(() => {
    element.style.height = '0'
    element.style.opacity = '0'
    const transitionEnd = () => {
      element.removeEventListener('transitionend', transitionEnd)
      done()
    }
    element.addEventListener('transitionend', transitionEnd)
  })
}

function rotateStyle(index: number) {
  return {
    transform: isActive(index) ? 'rotate(0deg)' : 'rotate(180deg)',
    transition: 'transform 0.25s ease'
  }
}

const iconStyle = computed(() => ({
  transform: isCollapsed.value ? 'translateX(0)' : 'translateX(166px)',
  transition: 'transform 0.25s ease'
}))
</script>

<style scoped>
.menu {
  width: 250px;
  background-color: #5182F8;
  color: white;
  transition: width 0.25s ease;
  overflow: hidden;
  position: relative;
}

.nav-logo {
  height: 54px;
  width: auto;
  margin: 35px 26px -15px 28px;
  position: absolute;
  cursor: pointer;
}

.nav-icon {
  height: auto;
  width: 55px;
  margin-top: 36px;
  margin-bottom: -16px;
  margin-left: 14px;
  position: absolute;
  transition: transform 0.25s ease;
  cursor: pointer;
}

.icon-size {
  width: 23px;
  flex-shrink: 0;
}

.menu ul {
  list-style-type: none;
  padding: 10px;
}

.menu-title {
  display: flex;
  align-items: center;
  height: 33px;
  padding-left: 5px;
  margin: 20px 0 0;
  transition: background-color 0.25s ease, border-radius 0.25s ease;
  white-space: nowrap;
  overflow: hidden;
  cursor: pointer;
}

.menu-title.highlighted {
  background-color: #AACAF9;
  border-radius: 5px;
}

.menu-title:not(.highlighted):hover {
  background-color: #85A7FA;
  border-radius: 5px;
}

.icon-toggle {
  margin-left: auto;
  width: 16px;
  height: 18px;
  margin-right: 8px;
}

.sub-menu ul {
  padding: 0 0 0 26px;
  background-color: #5182F8;
  overflow: hidden;
  transition: margin-top 0.25s ease;
}

.sub-menu ul li {
  height: 30px;
  padding-left: 8px;
  margin-top: 20px;
  display: flex;
  align-items: center;
  transition: background-color 0.25s ease, border-radius 0.25s ease;
  cursor: pointer;
}

.sub-menu ul li:last-child {
  margin-bottom: 0;
}

.sub-menu ul li.highlighted {
  background-color: #AACAF9;
  border-radius: 5px;
}

.sub-menu ul li:not(.highlighted):hover {
  background-color: #749BF9;
  border-radius: 5px;
}

.menu.collapsed {
  width: 85px;
}

.logo-container {
  position: relative;
  height: 80px;
}

.menu-content {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: calc(100% - 80px);
  padding: 0 16px;
}

.login-container {
  width: 100%;
  display: flex;
  align-items: center;
  margin-left: 12px;
  margin-top: 10px;
  cursor: pointer;
  margin-bottom: 33px;
}

.avatar {
  width: 23px;
  height: 23px;
  color: white;
  margin-right: 6px;
  margin-left: 3px;
  transition: opacity 0.3s ease;
}

.login-text {
  font-size: 14px;
  color: white;
  margin-left: 6px;
  white-space: nowrap;
  transition: opacity 0.3s ease;
}

.login-container:hover .avatar, .login-container:hover .login-text {
  opacity: 0.6;
}

/* noinspection CssUnusedSymbol */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.25s;
}

/* noinspection CssUnusedSymbol */
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

/* noinspection CssUnusedSymbol */
.fade-enter-to, .fade-leave-from {
  opacity: 1;
}
</style>
