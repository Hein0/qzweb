<template>
  <!--START-->
  <section class="qz__block qz__auth-block">
    <div class="qz__container">
      <div class="qz__auth-tip-block">
        <p class="qz__auth-tip">姓名中带有点号的，请使用居中的点号，如：</p>
        <p class="qz__auth-tip">阿布米提·仟姿在线
          <i class="tip-icon tip-scuccss"></i>
        </p>
        <p class="qz__auth-tip">阿布米提.仟姿在线
          <i class="tip-icon tip-wrong"></i>
        </p>
      </div>
      <div class="qz__auth-form">
        <ul class="qz__auth-input-list">
          <li class="qz__auth-item">
            <label for="" class="qz__auth--tit">真实姓名</label>
            <input type="text" class="qz__auth-input" name="name" placeholder="请输入真实姓名" v-model="name">
          </li>
          <li class="qz__auth-item">
            <label for="" class="qz__auth--tit">身份证</label>
            <input type="text" maxlength="18" class="qz__auth-input" name="idCard" placeholder="请输入身份证号" v-model="idCard">
          </li>
        </ul>
        <div class="qz__auth-btn">
          <input type="submit" value="确认提交" class="qz__auth-confrim" @click="validate()">
        </div>
      </div>
    </div>
  </section>
  <!--END-->
</template>
<style scoped>

  .qz__container {
  }

  .qz__auth-tip-block {
    padding-top: .347rem;
    padding-bottom: .267rem
  }

  .qz__auth-tip {
    padding: 0 .427rem;
    line-height: 18px;
    font-size: 12px;
    color: #a0a0a0
  }

  .qz__auth-tip .tip-icon {
    display: inline-block;
    vertical-align: top;
    margin-top: 5px;
    width: 7px;
    height: 6px;
    background-position: center;
    background-repeat: no-repeat
  }

  .qz__auth-tip .tip-icon.tip-scuccss {
    background-image: url(images/for.png);
    background-size: 7px 6px
  }

  .qz__auth-tip .tip-icon.tip-wrong {
    width: 5px;
    height: 5px;
    margin-top: 7px;
    background-image: url(images/wrong.png);
    background-size: 5px 5px
  }

  .qz__auth-input-list {
    background-color: #fff
  }

  .qz__auth-item {
    margin: 0 .427rem;
    height: 48px;
    line-height: 48px;
    font-size: 0;
    border-bottom: 1px solid #e5e5e5
  }

  .qz__auth--tit {
    display: inline-block;
    width: 2.72rem;
    font-size: 15px;
    color: #282828
  }

  .qz__auth-input {
    display: inline-block;
    width: 6.4rem;
    height: 40px;
    line-height: 40px;
    font-size: 15px;
    color: #282828;
    border: none;
    outline: none
  }

  .qz__auth-input::-webkit-input-placeholder {
    font-size: 15px;
    color: #a0a0a0
  }

  .qz__auth-input:-moz-placeholder {
    font-size: 15px;
    color: #a0a0a0
  }

  .qz__auth-input::-moz-placeholder {
    font-size: 15px;
    color: #a0a0a0
  }

  .qz__auth-input:-ms-input-placeholder {
    font-size: 15px;
    color: #a0a0a0
  }

  .qz__auth-btn {
    margin: .853rem .733rem 0
  }

  .qz__auth-confrim {
    display: block;
    width: 100%;
    height: 44px;
    line-height: 44px;
    font-size: 17px;
    color: #ffffff;
    background-color: #ff65b1;
    border-radius: 44px
  }
</style>
<script type='es6'>

  import utils from '../../common/js/utils';
  import Api from '../../common/api/api'

  console.log(utils)
  export default {
    name: 'authentry',
    data () {
      return {
        name: '',
        idCard: ''
      }
    },
    create () {
      utils.setTitle('身份验证')
    },
    methods: {

      // 表单验证
      validate () {
        let str;

        if (!this.name) {
          this.$toast('请输入姓名');
          return;
        }
        if (!this.idCard) {
          this.$toast('请输入身份证号');
          return;
        }
        if ((str = utils.validateID(this.idCard)) != true) {
          this.$toast(str);
          return;
        }
        this.submit();
      },

      // 提交表单
      submit () {
        let data = JSON.parse(localStorage.getItem('personInfo'));
        let param = {
          user_id: data.user_id,
          realname: this.name,
          idCard: this.idCard
        }

        Api.addUserInfo(param).then(res => {
          res.status == 0?this.success(param, data):this.fail();
          this.$toast(res.message)
        })
      },

      // 成功
      success (param, data) {

        utils.delay(2000, ()=> {
          location.href = ` http://qianzidai.cn/app/bill/auth?idcard=${param.idCard}&name=${param.realname}`
        })

        data.realname = param.realname;
        data.idCard = param.idCard;
        localStorage.setItem('personInfo', JSON.stringify(data))
      },

      // 失败
      fail () {

      }
    }
  }
</script>
