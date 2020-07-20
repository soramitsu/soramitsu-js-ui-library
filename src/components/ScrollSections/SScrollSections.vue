<template>
  <div class="s-scroll-sections flex">
    <nav class="s-scroll-menu" v-if="menuItems.length > 0">
      <ul :style="computedStyles">
        <li class="s-scroll-item" v-for="item in menuItems" :key="item.section">
          <a
            :href="!(router || item.disabled) ? '#' + item.section : null"
            :class="{
              'active': item.section === activeSection,
              'disabled': item.disabled
            }"
            @click="goTo(item.section)"
          >
            {{ item.title }}
          </a>
        </li>
      </ul>
    </nav>
    <div class="s-scroll-content">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import VueRouter from 'vue-router'

@Component
export default class SScrollSections extends Vue {
  /**
   * Text color of scroll menu in hex format.
   *
   * By default it's set to `"#75787B"`
   */
  @Prop({ default: '#75787B', type: String }) readonly textColor!: string
  /**
   * Active text color of scroll menu in hex format.
   *
   * By default it's set to `"#D0021B"`
   */
  @Prop({ default: '#D0021B', type: String }) readonly activeTextColor!: string
  /**
   * Active hover color of scroll menu in hex format.
   *
   * By default it's set to `"#D0021B"`
   */
  @Prop({ default: '#D0021B', type: String }) readonly hoverColor!: string
  /**
   * `VueRouter` instance from `vue-router`. If it's null, then routing will be unavailable while scrolling.
   */
  @Prop({ type: Object }) readonly router!: VueRouter

  menuItems: Vue[] = []
  activeSection = ''

  mounted (): void {
    this.$nextTick(() => {
      if (this.$children.length === 0) {
        return
      }
      this.menuItems = this.$children
      window.addEventListener('scroll', this.handleScroll)
      this.handleInitialState()
    })
  }

  get computedStyles (): object {
    const styles = {} as any
    if (this.textColor) {
      styles['--s-menu-color-text'] = this.textColor
    }
    if (this.activeTextColor) {
      styles['--s-menu-color-text-active'] = this.activeTextColor
    }
    if (this.hoverColor) {
      styles['--s-menu-color-hover'] = this.hoverColor
    }
    return styles
  }

  private handleInitialState (): void {
    if (this.router && this.router.currentRoute.hash) {
      this.menuItems.forEach((sectionComponent: any) => {
        if (this.router.currentRoute.hash === `#${sectionComponent.section}`) {
          (sectionComponent.$el as HTMLElement).scrollIntoView()
        }
      })
    } else if (window.scrollY <= (this.menuItems[0].$el as HTMLElement).offsetTop) {
      this.activeSection = (this.menuItems[0] as any).section
      this.menuItems[0].$el.classList.add('active')
      if (!this.router) {
        return
      }
      this.router.push({ hash: `#${this.activeSection}` })
    }
  }

  private handleScroll (): void {
    const fromTop = Math.round(window.scrollY)
    this.menuItems.forEach((sectionComponent, index) => {
      const section = sectionComponent.$el as HTMLElement
      const upperBound = section.offsetTop <= fromTop
      const lowerBound = section.offsetTop + section.offsetHeight > fromTop
      const underLowerBound = fromTop >= section.offsetTop + section.offsetHeight
      if ((index === 0 && !upperBound) ||
        (upperBound && lowerBound) ||
        (index === this.menuItems.length - 1 && underLowerBound)) {
        this.activeSection = (sectionComponent as any).section
        section.classList.add('active')
        if (this.router && this.router.currentRoute.hash !== `#${this.activeSection}`) {
          this.router.push({ hash: `#${this.activeSection}` })
        }
      } else {
        section.classList.remove('active')
      }
    })
  }

  goTo (section: string): void {
    if (!this.router || this.router.currentRoute.hash === `#${section}`) {
      return
    }
    this.router.push({ hash: `#${section}` })
    const component = this.menuItems.filter((component: any) => component.section === section)[0] as any
    (component.$el as HTMLElement).scrollIntoView({ behavior: 'smooth' })
  }
}
</script>

<style lang="scss">
@import "../../styles/variables.scss";

.s-scroll-sections {
  font-family: $font-family-default;
  font-size: 14px;
}
.s-scroll-menu {
  font-weight: 600;
  flex: 1;
  ul {
    position: sticky;
    top: 0;
    list-style: none;
    margin: 0;
    padding: 0;
  }
  .s-scroll-item {
    text-decoration: none;
    a {
      display: block;
      padding: 8px 16px;
      text-decoration: none;
      cursor: pointer;
      color: var(--s-menu-color-text);
      &:hover {
        color: var(--s-menu-color-hover);
      }
      &.active {
        color: var(--s-menu-color-text-active);
        border-left: 2px solid var(--s-menu-color-text-active);
      }
      &.disabled {
        cursor: not-allowed;
        pointer-events: none;
        color: $color-neutral-inactive;
        border-left: none;
      }
    }
  }
}
.s-scroll-content {
  flex: 2;
}
</style>
