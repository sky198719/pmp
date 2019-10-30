<template>
	<div>
		<ul v-if="$store.state.start == false">
			<li v-for="(item,index) in chapter">
				<ChapterSelect :chapterId="item.id" :chapterCount="item.count" :selectCount="$store.state.count[index]" :index="index"></ChapterSelect>
			</li>
		</ul>
		<ul v-if="$store.state.start == true">
			<li v-for="(item,index) in listData">
				<ListSingal :index="index + 1" :problem="item.problem" :answer="item.answer" :explain="item.explain" :trueanswer="item.key"></ListSingal>
			</li>
		</ul>
		<button @click="startExcises()" v-if="$store.state.start == false">开始答题</button>
		<button @click="randomStart()" v-if="$store.state.start == false">随机抽取</button>
		<button @click="allStart()" v-if="$store.state.start == false">全选</button>
		<button @click="exercisesDone()" v-if="$store.state.start == true && $store.state.done == false">提交</button>
		<button @click="startExcises()" v-if="$store.state.start == true && $store.state.done == true">重新开始</button>
		<button @click="exercisesRestart()" v-if="$store.state.start == true && $store.state.done == true">重新选题</button>
		<div v-if="$store.state.start == true && $store.state.done == true">
			<span>正确{{result.correct}}</span>
			<span>错误{{result.error}}</span>
			<span>未答{{result.undone}}</span>
			<button v-if="$store.state.save == false" @click="saveResult()">保存结果</button>
		</div>
		<table v-if="$store.state.start == false">
			<tr>
				<th>答题时间</th>
				<th>正确题数</th>
				<th>错误题数</th>
				<th>未答题数</th>
				<th>正确率</th>
				<th>用时</th>
				<th>操作</th>
			</tr>
			<tr v-for="(item,index) in timeList">
				<td>{{item.time}}</td>
				<td>{{item.correct}}</td>
				<td>{{item.error}}</td>
				<td>{{item.undone}}</td>
				<td :class="parseInt(item.precent) >= 80 ? 'a' : (parseInt(item.precent) < 80 && parseInt(item.precent) >= 60 ? 'b' : 'c')">{{item.precent}}</td>
				<td>{{item.timeUsed}}</td>
				<td :attr-time="item.time" @click="deleteCase($event)">删除</td>
			</tr>
		</table>
	</div>
</template>

<script>
import {getData} from './../../../../assets/js/global.js'
import ChapterSelect from './../../../../components/chapterSelect/index.vue'
import ListSingal from './../../../../components/listSingal/index.vue'

export default{
	components:{
		ChapterSelect:ChapterSelect,
		ListSingal:ListSingal
	},
	data(){
		return{
			chapter:[],
			allData:[],
			listData:[],
			result:{
				correct:'',
				error:'',
				undone:''
			},
			timeList:[],
			timeUsed:0,
			timer:''
		}
	},
	methods:{
		exercisesDone(){
			const _this = this
			this.result.undone = ''
			this.result.error = ''
			this.result.correct = ''
			this.$store.commit('setDone',true)
			setTimeout(() => {
				_this.result.undone = document.querySelectorAll('.undone').length
				_this.result.error = document.querySelectorAll('.error').length
				_this.result.correct = document.querySelectorAll('.correct').length - document.querySelectorAll('.error').length
				clearInterval(_this.timer)
				_this.$store.commit('setSave',false)
			})
		},
		exercisesRestart(){
			this.$store.commit('setStart',false)
			this.$store.commit('setDone',false)
		},
		saveResult(){
			let tempData = []
			if(!localStorage.getItem('pmpResult')){
				localStorage.setItem('pmpResult',JSON.stringify(tempData))
			}
			let tempTime = new Date().getFullYear() + '-' + this.initTime(parseInt(new Date().getMonth() + 1)) + '-' + this.initTime(new Date().getDate()) + ' ' + this.initTime(new Date().getHours()) + ':' + this.initTime(new Date().getMinutes()) + ':' + this.initTime(new Date().getSeconds())
			let tempUsedTime = ''
			if(this.timeUsed < 60){
				tempUsedTime = this.timeUsed + '秒'
			}else if(this.timeUsed >= 60 && this.timeUsed < 3600){
				tempUsedTime = parseInt(this.timeUsed / 60) + '分钟' + this.timeUsed % 60 + '秒'
			}else if(this.timeUsed >= 3600){
				tempUsedTime = parseInt(this.timeUsed / 3600) + '小时' + parseInt(this.timeUsed % 3600 / 60) + '分钟' + (this.timeUsed % 3600) % 60 + '秒'
			}
			tempData = JSON.parse(localStorage.getItem('pmpResult'))
			tempData.push({time:tempTime,correct:this.result.correct,error:this.result.error,undone:this.result.undone,precent:(parseInt(this.result.correct) / parseInt(this.result.correct + this.result.undone + this.result.error) * 100).toFixed(2) + '%',timeUsed:tempUsedTime})
			localStorage.setItem('pmpResult',JSON.stringify(tempData))
			this.timeList = JSON.parse(localStorage.getItem('pmpResult'))
			this.$store.commit('setSave',true)
		},
		deleteCase(e){
			let tempData = this.timeList
			this.timeList.map((item,index) => {
				if(item.time == e.currentTarget.getAttribute('attr-time')){
					tempData = tempData.filter((item) =>{
						return item != tempData[index]
					})
				}
			})
			this.timeList = tempData
			localStorage.setItem('pmpResult',JSON.stringify(tempData))
		},
		initArray(array){
			let tempData = []
			let tempArray = []
			for(let i = 0 ; i < array.length ; i ++){
				tempArray.push(i)
			}
			for(let i = 0 ; i < array.length ; i ++){
				let tempRandom = parseInt(Math.random() * tempArray.length)
				tempData.push(array[tempArray[tempRandom]])
				tempArray = tempArray.filter((item) =>{
					return item != tempArray[tempRandom]
				})
			}
			return tempData
		},
		initTime(obj){
			let tempObj = ''
			if(parseInt(obj) < 10){
				tempObj = '0' + obj
			}else{
				tempObj = obj
			}
			return tempObj
		},
		getAllData(){
			this.timeList = JSON.parse(localStorage.getItem('pmpResult'))
			getData({method:'get',url:'./../mock/exercises.json'})
			.then((res) => {
				this.allData = res.resData.data
				let tempData = []
				let tempCheck = []
				let tempCount = []
				res.resData.data.map((item,index) => {
					tempData.push({id:item.chapter,count:item.list.length})
					tempCheck.push(false)
					tempCount.push(item.list.length)
				})
				this.chapter = tempData
				this.$store.commit('setCheck',tempCheck)
				this.$store.commit('setCount',tempCount)
			})
		},
		randomStart(){
			let tempCheck = []
			let tempCount = []
			let checkCounter = 0
			this.allData.map((item,index) => {
				let randomBool = Math.random()
				let randomCount = parseInt(Math.random() * item.list.length) + 1
				if(randomBool <= 0.5){
					tempCheck.push(true)
				}else{
					tempCheck.push(false)
				}
				tempCount.push(randomCount)
			})
			tempCheck.map((item,index) => {
				if(item == true){
					checkCounter ++
				}
			})
			if(checkCounter == 0){
				tempCheck[parseInt(Math.random() * tempCheck.length)] = true
			}
			this.$store.commit('setCheck',[])
			this.$store.commit('setCount',[])
			this.$store.commit('setCheck',tempCheck)
			this.$store.commit('setCount',tempCount)
		},
		allStart(){
			let tempCheck = []
			let tempCount = []
			this.allData.map((item,index) => {
				tempCheck.push(true)
				tempCount.push(item.list.length)
			})
			this.$store.commit('setCheck',[])
			this.$store.commit('setCount',[])
			this.$store.commit('setCheck',tempCheck)
			this.$store.commit('setCount',tempCount)
		},
		startExcises(){
			const _this = this
			this.$store.commit('setStart',false)
			this.listData = []
			let tempData = []
			let tempCounter = 0
			let tempList = []
			this.$store.state.check.map((item,index) => {
				if(item == true){
					tempData.push([])
					this.$store.state.count.map((item2,index2) => {
						if(index == index2){
							this.allData.map((item3,index3) => {
								if(index3 == index2){
									this.initArray(item3.list).map((item4,index4) => {
										if(index4 < item2){
											tempData[tempCounter].push(item4)
										}
									})
								}
							})
						}
					})
					tempCounter ++
				}
			})
			this.initArray(tempData).map((item,index) => {
				item.map((item2,index2) => {
					tempList.push({answer:this.initArray(item2.answer),problem:item2.problem,key:item2.key,explain:item2.explain})
				})
			})
			this.listData = this.initArray(tempList)
			if(this.listData.length <= 0){
				alert('至少选择一套题目！')
				return false
			}else{
				setTimeout(() => {
					_this.timeUsed = 0
					_this.$store.commit('setStart',true)
					_this.$store.commit('setDone',false)
				})
				this.timer = setInterval(() => {
					_this.timeUsed ++
				},1000)
			}
		}
	},
	mounted(){
		this.getAllData()
	}
}
</script>

<style lang="scss" type="text/css">
table{
	margin-top:15px;
	tr{
		height:25px;
		line-height:25px;
		th,td{
			height:25px;
			line-height:25px;
			text-align:center;
			padding:0 5px;
		}
		td:last-child{
			cursor:pointer;
		}
	}
	.a{
		color:#00ff00;
	}
	.b{
		color:#0000ff;
	}
	.c{
		color:#ff0000;
	}
}
</style>