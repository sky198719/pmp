<template>
	<div class="chapterSelect">
		<input type="checkbox" :attr-chapterId="chapterId" @click="checkChange($event)" :checked="$store.state.check[index]" />
		<label>第{{chapterId}}章</label>
		<input type="text" :value="selectCount" @keyup="countChange($event)" :disabled="$store.state.check[index] == false ? true : false" />
	</div>
</template>

<script>
export default{
	props:{
		index:'',
		chapterId:'',
		chapterCount:'',
		selectCount:''
	},
	data(){
		return{
			checkList:[],
			countList:[]
		}
	},
	methods:{
		checkChange(e){
			this.checkList = this.$store.state.check
			this.checkList[this.index] = e.currentTarget.checked
			this.$store.commit('setCheck',[])
			this.$store.commit('setCheck',this.checkList)
		},
		countChange(e){
			if(e.currentTarget.value > this.chapterCount){
				alert('输入题数超出本章题库数量！')
				e.currentTarget.value = parseInt(this.chapterCount)
			}else if(e.currentTarget.value <= 0){
				alert('勾选的章节至少选择一道题目')
				e.currentTarget.value = 1
			}
			this.countList = this.$store.state.count
			this.countList[this.index] = parseInt(e.currentTarget.value)
			this.$store.commit('setCount',[])
			this.$store.commit('setCount',this.countList)
		}
	}
}
</script>

<style lang="scss" type="text/css">

</style>