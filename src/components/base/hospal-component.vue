<template>
  <div class="shade" v-show="isShow" @click.self="toggle">
    <div class="content" :class="{activeClick: isShow}">
      <!--确定-->
      <div class="btn">
        <button @click="toggle">确定</button>
      </div>
      <!--搜索-->
      <div class="search">
        <input type="text" placeholder="输入医院" v-model="search">
      </div>
      <ul class="list">
        <li class="item" v-for="item in newList" @click="select(item)" :class="{activeClick: currentItemIndex == item.id}">
          {{item.name}}
        </li>
      </ul>
    </div>
  </div>
</template>
<style scoped>
  .shade {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,.3);
  }

  .activeClick{
    animation-name: slide;
    animation-duration: .3s;
  }

  @keyframes slide {
    0% {
      transform: translateY(100%);
    }
    100%{
      transform: translateY(0);
    }
  }

  .search{
    height: 1.08rem;
  }

  .search input {
    width: 100%;
    height: 100%;
    padding: 0 .36rem;
    border-top: 1px solid #e3e3e3;
  }

  .content {
    position: absolute;
    bottom: 0;
    width: 100%;
    background-color: white;
  }

  .list {
    overflow: scroll;
    height: 5rem;
  }

  .item {
    line-height: 1.08rem;
    font-size: 13px;
    color: #333333;
    border-top: 1px solid #e3e3e3;
    padding: 0 .36rem;
  }

  .item.activeClick {
    background-color: #ff65b1;
    border-top: none;
    color: white;
  }

  .btn {
    height: 1rem;
    text-align: right;
  }

  .btn button {
    width: 2rem;
    color: #ff65b1;
    font-size: 14px;
    line-height: 1rem;
    text-align: center;
    outline: none;
    border: none;
    background: none;
  }
</style>
<script type='es6'>
  export default {
    name: 'pullDown',
    data () {
      return {
        isShow: false,
        search: '',
        newList: '',
        currentItemIndex: null
      }
    },
    props: ['value', 'list'],
    methods:{

      // 显示 或 隐藏
      toggle () {
        this.isShow = !this.isShow;
      },

      // 模糊查询
      fuQuery () {
        this.newList = this.list.filter((v) => {
          return v.name.includes(this.search)
        })
      },

      // 选中
      select (item) {
        this.$emit('input', item.name);
        this.currentItemIndex = item.id;
      }
    },
    watch:{
      search () {
        this.fuQuery()
      },
      list (data) {
        this.newList = data;
      }
    }
  }
</script>
