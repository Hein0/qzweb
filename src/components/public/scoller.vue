<template>
  <div style="-webkit-overflow-scrolling: touch;">
    <mt-loadmore  :bottom-method="loadBottom" :bottom-all-loaded = "status" ref="loadmore" :bottomPullText="text" :auto-fill="false">
        <slot></slot>
    </mt-loadmore>
  </div>
</template>
<style>
/* .mint-loadmore {
  width: 100%;
  font-size: 12px;
  min-height: 100%;
  padding-bottom: 2rem;
} */
</style>
<script>
export default {
  data() {
    return {
      topStatus: "",
      status: false,
      text: "上拉加载", //pull 时加载提示区域的文字 默认值为上拉刷新
      autoFill: false
    };
  },
  methods: {
    loadBottom() { //上拉刷新
      this.$emit("load");
    },
    loadTop() {
      this.status = true;
      this.$emit("refresh");
    },
    removeLoading() {
      this.$refs.loadmore.onBottomLoaded();
      this.$refs.loadmore.onTopLoaded();
    },
    isNoData() {
      this.status = false;
      this.text = "没有更多";
    },
    reset() {
      this.status = false;
      this.text = "上拉加载";
    }
  }
};


</script>
