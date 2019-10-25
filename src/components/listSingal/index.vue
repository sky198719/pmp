<template>
	<div class="listSingal">
		<strong>{{index}}.{{problem}}</strong>
		<dl>
			<dd v-for="(item,index) in answer">
				<input type="radio" :name="problem" v-if="$store.state.done == false" :attr-answer="item" @click="checkAnswer($event)" />
				<span v-if="index == 0" :class="$store.state.done == true ? (mykey == item ? (item == trueanswer ? 'correct' : 'error') : (item == trueanswer ? (mykey != '' ? 'correct' : 'undone') : '')) : ''">A.{{item}}<span v-if="mykey == item && $store.state.done == true"><span v-if="item == trueanswer">(回答正确)</span><span v-if="item != trueanswer">(回答错误)</span></span></span>
				<span v-if="index == 1" :class="$store.state.done == true ? (mykey == item ? (item == trueanswer ? 'correct' : 'error') : (item == trueanswer ? (mykey != '' ? 'correct' : 'undone') : '')) : ''">B.{{item}}<span v-if="mykey == item && $store.state.done == true"><span v-if="item == trueanswer">(回答正确)</span><span v-if="item != trueanswer">(回答错误)</span></span></span>
				<span v-if="index == 2" :class="$store.state.done == true ? (mykey == item ? (item == trueanswer ? 'correct' : 'error') : (item == trueanswer ? (mykey != '' ? 'correct' : 'undone') : '')) : ''">C.{{item}}<span v-if="mykey == item && $store.state.done == true"><span v-if="item == trueanswer">(回答正确)</span><span v-if="item != trueanswer">(回答错误)</span></span></span>
				<span v-if="index == 3" :class="$store.state.done == true ? (mykey == item ? (item == trueanswer ? 'correct' : 'error') : (item == trueanswer ? (mykey != '' ? 'correct' : 'undone') : '')) : ''">D.{{item}}<span v-if="mykey == item && $store.state.done == true"><span v-if="item == trueanswer">(回答正确)</span><span v-if="item != trueanswer">(回答错误)</span></span></span>
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
		trueanswer:''
	},
	methods:{
		checkAnswer(e){
			this.mykey = e.currentTarget.getAttribute('attr-answer')
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
}
</style>