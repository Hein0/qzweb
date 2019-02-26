<template>
    <div class="page-index">
        <div class="page-img">
            <div style="height: 5.56rem;z-index:0;">
                <!-- -->
                <div class="bgc-img">
                    <div class="bgcimgg">
                        <!-- <img src="./images/renwutuxiang.png" alt="" class="headerimg"> -->
                        <img :src="(imgPath+info.logo)" alt="" class="touxiang"></div>
                    <p class="infoname">{{info.nick_name}}</p>
                    <p class="face"><span>被赞{{info.assistedNum}}</span> <span>粉丝{{info.fans_num}}</span></p>
                    <div class="double">
                        <span @click="guanzhuclick" v-if="info.attentionNum==0"><img src="./images/jia.png" alt="">&nbsp;关注</span>
                        <span @click="cancleclick" v-if="info.attentionNum==1">已关注</span>
                        <!-- <span><img src="./images/sixin-icon.png" alt="">&nbsp;私信</span> -->
                    </div>
                    <div class="radio-wrap">
                        <div class="radio-group" v-model="tabView">
                            <span v-for="(tab ,index) in tabs" :class="{cur:iscur==index}" @click="iscur=index,tabclick('select' + (index + 1))">
                            {{tab.star}}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <!-- <div style="margin-top:0.17rem"></div> -->
            <div class="triangle_border_down">
                <span :class="[spanflag?'span_two':'span_one']"></span>
            </div>
            <!-- <div style="margin:0.4rem 0;"></div> -->
            <scroller v-if="!no_data" v-on:load="loadMore" ref="scroller" :auto-fill="false">
                <keep-alive>
                    <component v-bind:is="tabView" :child-msg="msg"></component>
                </keep-alive>
                <!-- </div> -->
            </scroller>
        </div>
    </div>
</template>
<style scoped>
    * {
        margin: 0;
        padding: 0;
        z-index: 9999;
    }
    .page-index {
        position: relative;
        top: 0px;
        left: 0px;
        text-align: center;
        color: #ffffff;
        font-family: "微软雅黑";
        display: -webkit-box;
        /* OLD - iOS 6-, Safari 3.1-6 */
        display: -moz-box;
        /* OLD - Firefox 19- (buggy but mostly works) */
        display: -ms-flexbox;
        /* TWEENER - IE 10 */
        display: -webkit-flex;
        /* NEW - Chrome */
        display: flex;
        /* NEW, Spec - Opera 12.1, Firefox 20+ */
        flex-direction: column;
        overflow: hidden;
        /* overflow-y: auto; */
        flex-wrap: nowrap;
        box-sizing: border-box;
        /* overflow-y: hidden; */
    }
    .page-img {
        -webkit-box-flex: 1;
        /* OLD - iOS 6-, Safari 3.1-6 */
        -moz-box-flex: 1;
        /* OLD - Firefox 19- */
        /* width: 20%; For old syntax, otherwise collapses. */
        -webkit-flex: 1;
        /* Chrome */
        -ms-flex: 1;
        /* IE 10 */
        flex: 1;
        /* NEW, Spec - Opera 12.1, Firefox 20+ */
        flex: 1 1 auto;
        overflow-x: hidden;
        /* position: fixed; */
        overflow-y: auto;
        /*解决ios上滑动不流畅*/
        -webkit-overflow-scrolling: touch;
        /* background-size: 100% 7rem; */
    }
    .bgc-img {
        /* position: absolute; */
        width: 100%;
        /* height: 4.82rem; */
        height: 5.56rem;
        /* padding-top: 0.4667rem; */
        z-index: -100;
        background-image: url("../../module/shop/images/sc_bj@2x.png");
        background-position: bottom;
        background-repeat: no-repeat;
        background-size: 100% 1.12rem;
        background-color: #ff66b2;
    }
    .bgcimgg {
        display: block;
        width: 100%;
        margin: 0 auto;
        z-index: -100;
        /* height: 100%; */
        /* position: absolute; */
        height: 2.0133rem;
        background-image: url("./images/renwutuxiang.png");
        background-position: top center;
        background-repeat: no-repeat;
        background-size: 1.5067rem 2.0133rem;
        /* margin-bottom: 0.4333rem;  */
    }
    .headerimg {
        left: 43%;
        top: 0%;
        width: 1.5067rem;
        height: 2.0133rem;
    }
    .infoname {
        margin-top: 0.2rem;
        margin-bottom: 0.2rem;
    }
    .touxiang {
        position: absolute;
        /* display: block; */
        /* margin: 0 auto; */
        width: 1.2067rem;
        height: 1.2067rem;
        margin-top: 0.4rem;
        margin-left: -0.62rem;
        border-radius: 50%;
    }
    .face span:first-child {
        margin-right: 0.6667rem;
    }
    .ptxt {
        margin-top: 0.1333rem;
    }
    .double {
        display: flex;
        text-align: center;
        justify-content: center;
        margin-top: 0.4rem;
    }
    .double span {
        display: flex;
        justify-content: center;
        align-items: center;
        border: 1px solid #fff;
        width: 1.44rem;
        height: 0.5067rem;
        border-radius: 0.2533rem;
        font-size: 0.32rem;
    }
    .double span:first-child {
        /* margin-right: 0.9rem; */
    }
    .double img:first-child {
        display: block;
        width: 0.2133rem;
        height: 0.2133rem;
    }
    .triangle_border_down {
        width: 0;
        height: 0;
        position: relative;
    }
    .span_one {
        display: block;
        width: 0;
        height: 0;
        border-width: 0.2667rem 0.2667rem 0;
        border-style: solid;
        border-color: #ff7fc2 transparent transparent;
        position: absolute;
        top: 0rem;
        left: 2.3rem;
    }
    .span_two {
        display: block;
        width: 0;
        height: 0;
        border-width: 0.2667rem 0.2667rem 0;
        border-style: solid;
        border-color: #ff7fc2 transparent transparent;
        position: absolute;
        top: 0rem;
        /* left: 2.3rem; */
        left: 7.25rem;
    }
    .radio-group>span {
        /* cursor: pointer; */
        display: inline-block;
        text-align: center;
        width: 49%;
        margin-top: 0.4rem;
    }
</style>
<script>
    import scroller from "../../components/public/scoller.vue";
    import select1 from "./select03.vue";
    import select2 from "./select04.vue";
    import imgPath from "../../common/api/imgConfig.js";
    import Api from "../../common/api/api.js";
    import utils from "../../common/js/utils";
    import {
        Toast
    } from 'mint-ui';
    export default {
        data() {
            return {
                tabView: "select1",
                tabs: [{
                        name: "选项一",
                        star: "日记",
                        CaseNum: null
                    },
                    {
                        name: "选项二",
                        star: "变美法宝",
                        CaseNum: null
                    }
                ],
                iscur: 0,
                spanflag: false,
                no_data: false,
                imgPath,
                info: [],
                msg: 1,
                guanzhu: "关注"
            };
        },
        created() {
            this.mine();
        },
        methods: {
            tabclick(tab) {
                this.tabView = tab;
                console.log(this.tabView);
                if (this.tabView == "select1") {
                    this.spanflag = false;
                } else {
                    this.spanflag = true;
                }
            },
            cancleclick() {
                const params = {
                    attention_id: this.$route.query.attention_id,
                    attentioned_id: this.$route.query.attentioned_id,
                    status: 2,
                     user_id:JSON.parse(localStorage.getItem("personInfo")).user_id,
                     token:JSON.parse(localStorage.getItem("personInfo")).token,
                    // sessionKey: this.$route.query.token
                    // attention_id: "qz536106e8",
                    // attentioned_id: "qz5297873f",
                    // status: 2,
                    sessionKey: this.$route.query.token
                };
                Api.cancleOrDeleteAttention(params).then(res => {
                    if (res.status == "0") {
                        Toast({
                            message: "取消关注成功",
                            position: "bottom",
                            duration: 2000
                        });
                        this.mine();
                    } else {
                        Toast({
                            message: "关注失败",
                            position: "bottom",
                            duration: 2000
                        });
                        this.mine();
                    }
                })
            },
            guanzhuclick() {
                const params = {
                    attention_id: this.$route.query.attention_id,
                    attentioned_id: this.$route.query.attentioned_id,
                    attention_type: 1,
                    attentioned_type: 1,
             user_id: JSON.parse(localStorage.getItem("personInfo")).user_id,
          token: JSON.parse(localStorage.getItem("personInfo")).token,
                        // attention_id: "qz536106e8",
                    // attention_type: 1,
                    // attentioned_id: "qz5297873f",
                    // attentioned_type: 1,
                    // sessionKey: "e73c2e30240a4109bf5c2b721fa6b78e"
                    sessionKey: this.$route.query.token
                };
                Api.insertAttentionRecord(params).then(res => {
                    if (res.status == "0") {
                        Toast({
                            message: "关注成功",
                            position: "bottom",
                            duration: 2000
                        });
                        this.mine();
                    } else {
                        Toast({
                            message: "关注失败",
                            position: "bottom",
                            duration: 2000
                        });
                    }
                });
            },
            loadMore() {
                this.msg++;
                setTimeout(() => {
                    this.$refs.scroller.removeLoading();
                }, 2000);
            },
            mine() {
                const params = {
                    current_user_id: this.$route.query.attention_id,
                    case_user_id: this.$route.query.attentioned_id,
                    //   user_id:  "qz536106e8",
                    //   current_user_id:"qz5297873f ",
                    //  token: "d92d3ab9389f4fda99c02cbbc824bc64",
                    // token: this.$route.query.token
                };
                Api.userinfo(params).then(res => {
                    console.log(res.data);
                    this.info = res.data;
                    this.tabs[0].CaseNum = res.data.caseNum;
                    this.tabs[1].CaseNum = res.data.orderNum;
                });
            }
        },
        components: {
            select1,
            select2,
            scroller
        }
    };
</script>
