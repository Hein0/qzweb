import Vue from 'vue';
import imgPreviewElement from './imgPreview.vue';
import PhotoSwipe from './photo/photoswipe'
import UI from './photo/photoswipe-ui-default'

let ImgPreview = {};
let vuePreview = Vue.extend(imgPreviewElement);

ImgPreview.install = (Vue) => {

  var photoswipe;
  let $imgPreview = {};
  let $vm;

  if (!$vm) {
    $vm = new vuePreview().$mount();
    document.body.appendChild($vm.$el)
  }

  $imgPreview.open = function (index, list, isRemark, params = {
    captionEl: false,
    fullscreenEl: false,
    history: false,
    shareEl: false,
    tapToClose: true
  }) {
    let options = Object.assign({
      index: index,
      getThumbBoundsFn(index) {
        let thumbnail = document.querySelectorAll('.preview-img')[index]
        let pageYScroll = window.pageYOffset || document.documentElement.scrollTop
        let rect = thumbnail.getBoundingClientRect()
        return {x: rect.left, y: rect.top + pageYScroll, w: rect.width}
      }
    }, params)

     photoswipe = new PhotoSwipe($vm.$el, UI, list, options,false)
     photoswipe.init()

  }

  $imgPreview.close = function () {
      photoswipe.close()
  }

  Vue.prototype.$imgPreview = $imgPreview;
}

export default ImgPreview
