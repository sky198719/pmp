<template>
	<div class="listSingal">
		<img :src="'../../pic/' + pic + '.jpg'" v-if="pic != '' && pic != undefined && pic != null" />
		<strong>{{index}}.{{problem}}</strong>
		<!-- <button @click="setRemember()">加入回忆题库</button> -->
		<dl>
			<dd v-for="(item,index) in answer">
				<input type="radio" :name="problem" :id="problem + index" v-if="$store.state.done == false" :attr-answer="item" @click="checkAnswer($event)" />
				<label :for="problem + index" v-if="index == 0" :class="$store.state.done == true ? (mykey == item ? (item == trueanswer ? 'correct' : 'error') : (item == trueanswer ? (mykey != '' ? 'correct' : 'undone') : '')) : ''">A.{{item}}<span v-if="mykey == item && $store.state.done == true"><span v-if="item == trueanswer">(回答正确)</span><span v-if="item != trueanswer">(回答错误)</span></span></label>
				<label :for="problem + index" v-if="index == 1" :class="$store.state.done == true ? (mykey == item ? (item == trueanswer ? 'correct' : 'error') : (item == trueanswer ? (mykey != '' ? 'correct' : 'undone') : '')) : ''">B.{{item}}<span v-if="mykey == item && $store.state.done == true"><span v-if="item == trueanswer">(回答正确)</span><span v-if="item != trueanswer">(回答错误)</span></span></label>
				<label :for="problem + index" v-if="index == 2" :class="$store.state.done == true ? (mykey == item ? (item == trueanswer ? 'correct' : 'error') : (item == trueanswer ? (mykey != '' ? 'correct' : 'undone') : '')) : ''">C.{{item}}<span v-if="mykey == item && $store.state.done == true"><span v-if="item == trueanswer">(回答正确)</span><span v-if="item != trueanswer">(回答错误)</span></span></label>
				<label :for="problem + index" v-if="index == 3" :class="$store.state.done == true ? (mykey == item ? (item == trueanswer ? 'correct' : 'error') : (item == trueanswer ? (mykey != '' ? 'correct' : 'undone') : '')) : ''">D.{{item}}<span v-if="mykey == item && $store.state.done == true"><span v-if="item == trueanswer">(回答正确)</span><span v-if="item != trueanswer">(回答错误)</span></span></label>
			</dd>
		</dl>
		<em v-if="$store.state.done == true">{{explain}}</em>
	</div>
</template>

<script>
export default{
	data(){
		return{
			mykey:''
		}
	},
	props:{
		index:'',
		problem:'',
		answer:'',
		explain:'',
		trueanswer:'',
		pic:''
	},
	methods:{
		checkAnswer(e){
			this.mykey = e.currentTarget.getAttribute('attr-answer')
		},
		setRemember(){
			let tempRemember = []
			let tempCounter = 0
			if(!localStorage.getItem('remember')){
				localStorage.setItem('remember',JSON.stringify(tempRemember))
			}else{
				tempRemember = JSON.parse(localStorage.getItem('remember'))
			}
			tempRemember.map((item,index) => {
				if(item.problem == this.problem){
					tempCounter ++
				}
			})
			if(tempCounter == 0){
				tempRemember.push({problem:this.problem,answer:this.answer,key:this.trueanswer,explain:this.explain,pic:this.pic})
			}else{
				alert('此题已经出现在回忆题库中！')
			}
			localStorage.setItem('remember',JSON.stringify(tempRemember))
		}
	}
}
</script>

<style lang="scss" type="text/css">
.listSingal{
	font-size:14px;
	margin-bottom:10px;
	.correct{
		color:#00ff00;
	}
	.error{
		color:#ff0000;
	}
	.undone{
		color:#0000ff;
	}
	input{
		cursor:pointer;
	}
	label{
		cursor:pointer;
	}
}
</style>