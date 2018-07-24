<template lang="pug">
	transition(name="fade")
		.preloader(v-if="show || endBar" :show="show" :endBar="endBar")
			.container-preloader
				.gear
					img(src="/static/img/preloader.svg", alt="preloader")
				#lineLoad
</template>

<script>

export default {

	name: 'Preload',
	data () {
		return {
			show: true,
			endBar: true
		}
	},
	methods: {
		// End
		showScroll() {
			setTimeout(function() {
				document.body.classList.remove('stop-scrolling');
				this.$emit('sendArrayParamPreload', [this.show, this.endBar])
			}.bind(this), 500);
		},

		showContent() {
			this.show = !this.show;
		},

		changeProgress() {
			let vm1 = this,
				line = document.getElementById('lineLoad');

			line.style.width = 0;


			// tick bar
			let timeBar =
				setInterval(function() {
					let lengthLine = parseInt(line.style.width);

					// default load
					if (vm1.show && lengthLine<75)
						line.style.width = lengthLine + 1 + '%';

					// waiting window.onload
					else if ( vm1.show && lengthLine >= 75) false

					// add speed progress
					else if (!vm1.show && lengthLine<100)
						line.style.width = lengthLine + 10 + '%';

					//hide preloader
					else if (lengthLine >= 100 && !vm1.show) closeBar();

				}, 20);

			
			function closeBar() {
				vm1.endBar = false;
				clearInterval(timeBar);
				vm1.showScroll();
			}
		},
	},
	created() {
		this.$nextTick(() => {
			window.onload = this.showContent;
			this.changeProgress();
		})
	}
}
</script>

<style lang="sass" scoped>
.preloader
	background: rgba(255,255,255,1)
	width: 100%
	height: 100vh
	position: absolute
	top: 0
	right: 0
	bottom: 0
	left: 0
	z-index: 100000
	display: flex
	align-items: center
	justify-content: center
	display-flex: column
.container-preloader
	width: 258px
	height: 200px
	display: flex
	align-items: center
	justify-content: center
	flex-direction: column
	position: relative
	.gear
		animation: spin 1.2s infinite linear
		border-radius: 50%
		img
			width: 75px
			height: 75px
			position: relative
			left: 0
			right: 0
			margin: auto
			top: 0
			bottom: 0
			display: block
	#lineLoad
		width: 0
		max-width: 100%
		height: 3px
		background: #05367a
		position: absolute
		left: 0
		bottom: 35px

.fade-leave-active
	transition: opacity .7s;

.fade-enter
	opacity: 1

.fade-leave-to
	opacity: 0

@keyframes spin
	from
		transform: rotate(0deg)
	to
		transform: rotate(360deg)



</style>