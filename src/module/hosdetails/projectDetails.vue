<template>
  <div id="shop" style="background: #fff;">
    <div class="container" ref="scrollerDocument" style="margin-top: 22px;">
		
		<div class="fixedTitle">
			<div class="title">{{projectDetails.name}}</div>
			<div class="doctorDetail">
				<ul>
				  <li class="doctorItem" :class='status=="induction"?"selectedItem":""' @click='goAnchor("induction")'>项目介绍</li>
				  <li class="doctorItem" :class='status=="fitPeople"?"selectedItem":""' @click='goAnchor("fitPeople")'>适合人群</li>
				  <li class="doctorItem" :class='status=="operaCare"?"selectedItem":""' @click='goAnchor("operaCare")'>术后护理</li>
				  <li class="doctorItem" :class='status=="commonQue"?"selectedItem":""' @click='goAnchor("commonQue")'>常见问题</li>
				</ul>
			</div>
		</div>
			
		<div class="content">
			<!-- 项目概述 -->
			<div class="project_content" ref="induction">
				<h1>项目概述</h1>
				<div class="project_wrap">
					<h2>项目简介</h2>
					<p>{{projectDetails.introduction}}</p>
					<h2>项目特色</h2>
					<p>{{projectDetails.feature}}</p>
					<h2>项目别名</h2>
					<p>{{projectDetails.alias}}</p>
					<h2>项目价格</h2>
					<p>{{projectDetails.reference_price}}</p>
				</div>
			</div>
				
			<!-- 项目档案 -->
			<div class="project_content" ref="fitPeople">
				<h1>项目档案</h1>
				<div class="project_wrap">
					<h2>适合人群</h2>
					<p>{{projectDetails.suit_crowds}}</p>
					<h2>禁忌人群</h2>
					<p>{{projectDetails.aboo_crowd}}</p>
					<h2>优点</h2>
					<p>{{projectDetails.merits}}</p>
					<h2>缺点</h2>
					<p>{{projectDetails.demerits}}</p>
				</div>
			</div>
				
			<!-- 操作档案 -->
			<div class="project_content">
				<h1>操作档案</h1>
				<ul class="project_operate">
					<li>治疗时长<span>{{projectDetails.treatment_day}}</span></li>
					<li>效果持续<span>{{projectDetails.duration_day}}</span></li>
					<li>麻醉方式<span>{{projectDetails.anaesthesia_type}}</span></li>
					<li>恢复时间<span>{{projectDetails.recovery_day}}</span></li>
					<!-- <li>拆线时间<span>{{projectDetails.demerits}}</span></li> -->
					<li>治疗周期<span>{{projectDetails.treatment_cycle}}</span></li>
					<li>操作人员资质<span>{{projectDetails.operator_qualification}}</span></li>
					<li>操作方式<span>{{projectDetails.operation_mode}}</span></li>
					<li>
						<div>
							<span class="wenHao">疼痛感</span>
							<span>{{projectDetails.pain_perception}}</span>
						</div>
						<div class="tips">一 以上信息均为参考,实际以到院操作为准 一</div>
					</li>
				</ul>
			</div>
				
			<!-- 常见问题 -->
			<div class="shuHou_content" id="common_question" ref="commonQue">
				<h1>常见问题</h1>
				<ul class="common_question">
					<li v-for="(item,index) in questionList" :key="item.id+item.category_id">
						<div class="questionContent">
							<span class="question">问</span>
							<span class="questionDetail">{{item.question}}</span>	
							<span :class='item.flag?"isShow":"isHide"' @click="chooseFlag(index)"></span>
						</div>
						
						<div class="questionContent" v-show="item.flag" style="padding-top: 0.4rem;"> 
							<span class="question answer" >答</span>
							<span class="questionDetail">{{item.answer}}</span>
						</div>
					</li>
				</ul>
			</div>
				
			<!-- 术前护理 -->
			<div class="project_content">
				<h1>术前护理</h1>
				<div>
					<!-- <textarea readonly class="shuQianDetail">{{projectDetails.pre_reade}}</textarea> -->
					<pre class="shuQianDetail">{{projectDetails.pre_reade}}</pre>
				</div>
			</div>
				
			<!-- 术后护理 -->
			<div class="shuHou_content" ref="operaCare">
				<h1>术后护理</h1>
				<ul class="">
					<li v-for="(item,index) in caseList" :key="item.id+item.category_id" class="shuHou">
						<div class="shuHouTime">
							<span>{{item.start_day}}~{{item.end_day}}</span>
							<span class="shuHouTimeR">{{item.remark}}</span>	
						</div>
						
						<div>
							<span class="shuHouRover">恢复提示</span>
							<pre class="shuQianDetail">{{item.recovery_tips}}</pre>
						</div>
						
						<div>
							<span class="shuHouRover">护理方法</span>
							<pre class="shuQianDetail">{{item.case_method}}</pre>
						</div>
						<div>{{a}}</div>
					</li>
				</ul>
			</div>
		</div>
    </div>
  </div>
	
</template>

<style type="text/css">
	.title{
		color: #333333;
		font-size: 0.4533rem;
		text-align: center;
		margin-bottom: 0.3733rem;
	}
	
	.doctorDetail{
		padding-top: 0.3rem;
		border-top: 1px solid #e3e3e3;
		padding-bottom: 0.3rem;
	}
	
	.doctorDetail ul{
		display: flex;
		display: -webkit-flex;
		flex-direction: row;

	}
	
	.content{
		margin-top: 2.6rem;
		padding-left: 0.4rem;
		padding-right: 0.4rem;
		
	}
	
	.project_content{
		margin-bottom: 0.667rem;
	}
	
	.project_content h1,.shuHou_content h1{
		color: #333;
		font-size: 0.3733rem;
		padding-left: 0.2667rem;
		padding-bottom: 0.3733rem;
		border-bottom: 1px solid #e3e3e3;
		background: url("images/flagNum.png") no-repeat;
		background-size: 0.053rem 0.34667rem;
		background-position:0 10%;
	}
	
	.project_content h2{
		color: #333;
		font-size: 0.346666rem;
		margin-bottom: 0.2667rem;
		margin-top: 0.4rem;
	}
	
	.project_content p{
		color: #666;
		font-size: 0.3467rem;
		line-height: 0.5rem;
	}
	
	.project_operate{
		margin-top: 0.48rem;
		background: #f9f9f9;
		padding-left: 0.133rem;
		padding-bottom: 0.133rem;
		padding-right: 0.133rem;
		background-image:url("images/squre.png");
		background-repeat: no-repeat;
		background-size: 0.32rem 0.32rem;
		background-position: 0 0;
	}
	
	.project_operate li{
		color: #333333;
		font-size: 0.3467rem;
		height: 1.12rem;
		line-height: 1.12rem;
		padding-left: 0.2666rem;
	}
	
	.project_operate li span{
		color: #777777;
	}
	
	.project_content li:nth-of-type(even){
		background: #fff;
	}
	
	.project_content li:last-child{
		height: 2.2133rem;
	}
	
	.wenHao{
		padding-right: 0.6133rem;
		background: url("images/question.png") no-repeat;
		background-size: 0.4533rem 0.4267rem;
		background-position: 100% 0%;
	}
	
	.tips{
		color: #b8b8b8;
		text-align: center;
	}
	
	.common_question{
		display: flex;
		flex-direction: column;
	}
	
	.common_question li{
		border-bottom: 1px solid #f6f8fa;
		padding-bottom: 0.4rem;
		padding-top: 0.4rem;
	}
	
	
	.questionDetail{
		font-size: 0.3466rem;
		color: #333;
		display: inline-block;
    width: 8.2rem;
		line-height: 0.5rem;
	}
	    
	.question{
		margin-right:0.2667rem;
		background: #ff91c7;
		color: #fff;
		font-size: 0.2666rem;
		padding: 0.0467rem 0.0933rem;
		border-radius: 0.08rem;
		vertical-align: top;
    display: inline-block;
	}
	
	.answer{
		background: #71c4ef;
	}
	
	.questionContent{
		position: relative;
	}
	
	.isShow{
		background: url(images/jianTou.png) no-repeat;
		background-size: 0.3rem;
		width: 0.3rem;
		height: 0.3rem;
		display: inline-block;
		background-position: 0 50%;
		position: absolute;
    right: 0%;
	}
	
	.isHide{
		background: url(images/jianTou_1.png) no-repeat;
		background-size: 0.3rem;
		width: 0.3rem;
		height: 0.3rem;
		display: inline-block;
		background-position: 0 50%;
		position: absolute;
		right: 0%;
	}
	
	.shuQianDetail{
		color: #666666;
		font-size: 0.3467rem;
		line-height: 0.54rem;
		width: 100%;
		outline: none;
		white-space: pre-wrap;
		word-wrap: break-word;
		font-family: "arial narrow";
		margin-bottom: 0.667rem;
	}
	
	.shuHou{
		font-size: 0.3467rem;
	}
	
	.shuHouTime{
		color: #666;
		margin-top: 0.3733rem;
		margin-bottom: 0.64rem;
	}
	
	.shuHouTimeR{
		margin-left: 0.4267rem;
	}
	
	.shuHouRover{
		color: #333;
	}
	
	.shuHou_content{
		margin-bottom: 0.667rem;
	}
	
	
	.project_wrap{
		/* margin-top: 0.4rem; */
		/* display: flex;
		flex-direction: column;
		justify-content: space-between; */
		/* height: 6.2933rem; */
		/* height: 6.6rem; */
	}
	
  .doctorItem{
    color: #555555;
    font-size: 0.3733rem;
    border:1px solid #ecf0f4;
    border-radius: 0.4rem;
    padding: 0.1rem 0.24rem;
    margin-left: 0.32rem
  }

  .selectedItem{
    color: #ff67b2;
    border-color: #ff67b2;
  }
	
	.fixedTitle{
		position: fixed;
		background:#fff;
		left: 0%;
		right: 0%;
		z-index: 9;
	}

</style>
<script>
  import Api from "../../common/api/api.js";
  import utils from "../../common/js/utils";
  import { Toast } from "mint-ui";
  export default {
    data(){
      return{
        projectDetails:[],
				keyword:"",
				questionList:[],
				caseList:[],
				flag:false,
				status:""
      }
    },

    created(){
			if(sessionStorage.getItem("category")){//如果缓存中有一级项目，则要传全级
				if(sessionStorage.getItem("categoryThree")){//入参中">"前后有空格，不可删除，不明白为什么数据库存入这种带空格的参数
					this.keyword=sessionStorage.getItem("category")+" "+">"+" "+sessionStorage.getItem("categoryTwo")+" "+">"+" "+sessionStorage.getItem("categoryThree")
				}else{
					this.keyword=sessionStorage.getItem("category")+" "+">"+" "+sessionStorage.getItem("categoryTwo")
				}
			}else{
				this.keyword=this.$route.query.keyword  //如果缓存中没有一级项目,则也没有二级项目，那么该项目就是第三级，直接进入到关键词页面
			}
			
			// let self=this
			let params = {"keyword":this.keyword};
			
			Api.projectDetails(params).then(res => {
				console.log(this)
				if(res.status==0){
					this.projectDetails = res.data;
					this.questionList=this.projectDetails.problems
					if(this.questionList && this.questionList.length>0){
						this.questionList[0].flag=true
					}
					this.caseList=this.projectDetails.cases
					setTimeout(()=>{
						if(this.$route.query.ctx){
							let ctx=this.$route.query.ctx
							this.goAnchor(ctx)
						}
					},0)
			
				}else{
					Toast({
						message: "系统错误，请稍后再试",
						position: "middle",
						duration: 2000
					});
				}
			});
    },
		
		methods:{
			// 常见问题展开收起切换
			chooseFlag(index){
				this.questionList[index].flag=!this.questionList[index].flag
				this.$set(this.questionList, index, this.questionList[index])
			},
			
			//锚点
			goAnchor(selector){
				this.status=selector
				let anchor=this.$refs[selector]
				this.$el.querySelector(".container").scrollTop=anchor.offsetTop-120
			},
		},
}

</script>
