<template>
  <!-- add by libaoxu@gaosiedu.com vue1.0 当touch时 会触发mouse事件 -->
  <!--@mousedown="startDrag"
  @mousemove="onDrag"
  @mouseleave="endDrag"-->
  <div
    @touchstart="startDrag"
    @touchmove="onDrag"
    @touchend="endDrag"
    :style="{minHeight: minHeight}"
    class="mint-tab-container"
    >
    <div
      v-el:wrap

      :class="{ 'swipe-transition': swipeLeave }"
      
      class="mint-tab-container-wrap"

      >
      <slot></slot>
    </div>
  </div>
</template>

<style lang="css">
  @component-namespace mint {
    @component tab-container {
      overflow: hidden;
      position: relative;
      -webkit-overflow-scrolling: touch;
      
      @descendent wrap {
        display: flex;
      }

      .swipe-transition {
        transition: transform 150ms ease-in-out;
      }
    }
  }
</style>

<script>
import { once } from 'wind-dom/src/event';

/**
 * mt-tab-container
 * @desc 面板，搭配 tab-container-item 使用
 * @module components/tab-container
 *
 * @param {number|string} [active] - 当前激活的 tabId
 *
 * @example
 * <mt-tab-container :active.sync="selected">
 *   <mt-tab-container-item id="1"> 内容A </mt-tab-container-item>
 *   <mt-tab-container-item id="2"> 内容B </mt-tab-container-item>
 *   <mt-tab-container-item id="3"> 内容C </mt-tab-container-item>
 * </mt-tab-container>
 */

// 修改缺失findIndex方法的bug

if(!Array.prototype.findIndex) {
  Array.prototype.findIndex = function(fn) {
    let _index = 0;

    this.forEach((item, $index) => {
      if (fn(item)) {
        _index = $index;
      }
    })

    return _index;
  }
}

let setHeightStyle = function (heightPx) {
  return {
    height: heightPx,
    overflow: 'hidden'
  }
};

let removeHeightStyle = function () {
  return {
    height: 'initial',
    overflow: 'initial'
  }
};

const WINDOW_HEIGHT = window.innerHeight;

function getOffset (obj) {
  var top = 0;
  var left = 0;

  while(obj) {
    top += obj.offsetTop;
    left += obj.offsetLeft;
    obj = obj.offsetParent;
  }
  
  return {
    left, top  
  };
}

export default {
  name: 'mt-tab-container',

  props: {
    itemNum:0, //子组件的数量 changeby v5
    active: {},
    swipeable: Boolean,
    isClick:{
      type: Boolean,
      default: false
    },
    minHeight: 0,
    isItemHeight: false
  },

  data() {
    return {
      H:0,
      start: { x: 0, y: 0 },
      swiping: false,
      swipeLeave: false,
      $activeTabItems: [],
      pageWidth: 0,
      a:null,
      $preActiveTabItem: null,
      $activeTabItem: null
    };
  },

  watch: {
    active(val, oldValue) {
      if (!this.swipeable) return;
      const lastIndex = this.$children.findIndex(item => item.id === oldValue);
      this.swipeLeaveTransition(lastIndex);
      this.index = this.$children.findIndex(item => item.id === this.active);
      // this.H = wrap.getElementsByClassName('cannot-correct-item')[this.index].offsetHeight+'px';
      // console.log(this.$children[this.index])
      this.toggleItemStyle(this.index);
     
      // this.activeChild = this.$children[this.index];
      // if (activeChild) this.wrap.style.height = activeChild.$el.offsetHeight + 'px';
    },
    itemNum() {
      this.click= true;
      this.$children = this.$children.sort(function(a,b){
        if(a.id === b.id){
          return 0;
        }else{
          return a.id<b.id? -1 : 1;
        }
      });

      this.swipeLeaveTransition();

      if (!this.$activeTabItem) {
        this.setActiveTabItem();
      }
      this.toggleItemStyle(this.index);
      this.setSiblingsDefaultHeight();
    }
  },

  ready() {
    if (!this.swipeable) return;

    this.wrap = this.$els.wrap;
    this.pageWidth = this.wrap.clientWidth;
    this.limitWidth = this.pageWidth / 4;
    this.index = this.$children.findIndex(item => item.id == this.active);
    this.swipeMove(-this.index* this.pageWidth);


    // this.a = this.$.getElementsByClassName('mint-tab-container-wrap');
    
    /**
     * modify by libaoxu@gaosiedu.com
     * 
     * 解决每个tabItem的高度, 影响容器整体高度问题
     * 
     * 之前的display: none, 影响体验
     */ 
    // tabItem最小高度
    this.minTabItemHeight = (WINDOW_HEIGHT - getOffset(this.$el).top) + 'px';
    if (this.index > -1) {
      this.setActiveTabItem();
      this.setSiblingsDefaultHeight();
    }
  },

  created() {
    if (this.swipeable) return;
    this.$options.template = '<div class="mint-tab-container"><slot></slot></div>';
  },

  methods: {
    swipeLeaveTransition(lastIndex = 0) {
      if (typeof this.index !== 'number' || this.isClick) {
        this.index = this.$children.findIndex(item => item.id === this.active);
        this.swipeMove(this.index * this.pageWidth);
      }
      setTimeout(() => {
        this.swipeLeave = true;
        this.index = this.$children.findIndex(item => item.id === this.active);
        this.swipeMove(-this.index * this.pageWidth);
        // once(this.wrap, 'webkitTransitionEnd', _ => {
        //   window.console.log('webkitTransitionEnd');
        //   setTimeout(() => {
        //     this.wrap.style.webkitTransform = '';
        //     this.swipeLeave = false;
        //     this.swiping = false;
        //     this.index = null;
        //   },0);
        // });
        setTimeout(() => {
          this.swipeLeave = false;
          this.swiping = false;
          this.index = null;
        },150);
      },0);
    },

    swipeMove(offset) {
      this.wrap.style.position="relative";//原来是用transform实现的现在改为  相对定位
      this.wrap.style.left = offset+'px';
      this.swiping = true;
    },

    startDrag(evt) {
      this.isClick = false;
      evt = evt.changedTouches ? evt.changedTouches[0] : evt;
      this.dragging = true;
      this.start.x = evt.pageX;
      this.start.y = evt.pageY;
      this.$children = this.$children.sort(function(a,b){
        if(a.id === b.id){
          return 0;
        }else{
          return a.id<b.id? -1 : 1;
        }
      });
    },

    onDrag(evt) {
      if (!this.dragging) return;
      let swiping;
      const e = evt.changedTouches ? evt.changedTouches[0] : evt;
      const offsetTop = e.pageY - this.start.y;
      const offsetLeft = e.pageX - this.start.x;
      const y = Math.abs(offsetTop);
      const x = Math.abs(offsetLeft);
       /**
      *changev5by  v5
      *获取 子元素的高度className = 'cannot-correct-item' 的高度给父元素‘mint-tab-container-wrap’
      */
      this.index = this.$children.findIndex(item => item.id === this.active);
      // this.H = wrap.getElementsByClassName('cannot-correct-item')[this.index].offsetHeight+'px' || 0;
      // wrap.style.height = this.H;
      // if (this.$children[this.index]) this.wrap.style.height = this.$children[this.index].offsetHeight + 'px';

      //判断是不是swiping
      swiping = !(x < 5 || (x >= 5 && y >= x * 1));
      if (!swiping) {
        this.dragging = false;
        return
      };
      evt.preventDefault();

      const len = this.$children.length - 1;
      const index = this.$children.findIndex(item => {return item.id === this.active;});
      const currentPageOffset = index * this.pageWidth;
      const offset = offsetLeft - currentPageOffset;
      const absOffset = Math.abs(offset);

      if (absOffset > len * this.pageWidth ||
          (offset > 0 && offset < this.pageWidth)) {
        this.swiping = false;
        return;
      }

      this.offsetLeft = offsetLeft;
      this.index = index;
      this.swipeMove(offset);
    },

    endDrag() {
      if (!this.swiping) return;

      const direction = this.offsetLeft > 0 ? -1 : 1;
      const isChange = Math.abs(this.offsetLeft) > this.limitWidth;
      if (isChange) {
        this.index += direction;
        const child = this.$children[this.index];
        if (child) {
          this.active = child.id;
          return;
        }
      }

      this.swipeLeaveTransition();
    },

    /**
     * 设置其他兄弟tabItem 的高度为默认的 minTabItemHeight
     */ 
    setSiblingsDefaultHeight () {
      this.$siblingsItems = this.$children.filter(item => item.id !== this.active);
      this.$siblingsItems.forEach($vm =>  {
        if (!$vm.$el.isSetMinTabItemHeight) {
          $vm.$el.isSetMinTabItemHeight = true;
          Object.assign($vm.$el.style, setHeightStyle(this.minTabItemHeight));
        }
      });
    },

    /**
     * tabItem 切换时, 改变当前$activeTabItem 和 $preActiveTabItem 的高度变化
     */ 
    toggleItemStyle (index) {
      this.$preActiveTabItem.$el && Object.assign(this.$preActiveTabItem.$el.style, setHeightStyle(this.minTabItemHeight));
      
      this.$activeTabItem = this.$children[index];
      this.$preActiveTabItem = this.$activeTabItem;

      this.$activeTabItem.$el && Object.assign(this.$activeTabItem.$el.style, removeHeightStyle());

    },

    setActiveTabItem () {
      // 当前activeTabItem
      this.$activeTabItem = this.$children[this.index];
      if (!this.$preActiveTabItem) {
        // 上一个activeTabItem
        this.$preActiveTabItem = this.$activeTabItem;
      }
    }
  }
};
</script>
