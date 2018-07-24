<template lang="pug">
	transition(name="fly")
		.form-wrap
			.wrap-in(:class="classObject")
				transition(name="state-form", mode="out-in")
					form.goodbay(v-if="response.variants", key="end")
						button.cross(@click.prevent="closeForm")
							svg(xmlns="http://www.w3.org/2000/svg", width="18.38", height="18.375")
								path.cross-in(data-name="cross", d="M1.4,0l17,17L17,18.4L0,1.4L1.4,0z M17,0l1.4,1.4l-17,17L0,17L17,0z", fill="#fff")
						p.seconds
							span.thanks Спасибо!
						p.application
							span ваша заявка отправлена
							span Мы Вам перезвоним

					form(v-if="response.variants === false", key="open")
						button.cross(@click.prevent="closeForm")
							svg(xmlns="http://www.w3.org/2000/svg", width="18.38", height="18.375")
								path.cross-in(data-name="cross", d="M1.4,0l17,17L17,18.4L0,1.4L1.4,0z M17,0l1.4,1.4l-17,17L0,17L17,0z", fill="#fff")
						p.application
							span Оставьте моментальную заявку на звонок
							span мы перезвоним в любое удобное для Вас время

						p.seconds
							span Это займет 30 секунд

						div.form-group
							input.form-control(type="text", v-model:name="contacts.user", placeholder="Ваше имя:" @blur="lengthName", maxlength="30")

							input.form-control(type="tel", name="contacts.phone", v-mask="'✆ +7 (###) - ### - ## - ##'", v-model="auxilliary.getPhone", placeholder="Ваш номер:", @focus.once="instMask", @blur="lengthPhone" , maxlength="26")

							textarea.form-control(type="text", v-model:name="contacts.message", placeholder="Удобное время для звонка:", @blur="lengthMessage", maxlength="50")

						p.politics
							span Отправляя форму, Вы автоматически соглашаетесь с
							a(href="static/politics/politics.pdf", target="_blank") Политикой конфиденциальности

						p.send
							button.send-message(@click.prevent="post") Отправить
						
						transition(name="error-anim")
							.error(v-if="auxilliary.message.length")
								div
									.msg-error {{auxilliary.message}}
								div
									.exit-error(@click="closeError")
										svg(xmlns="http://www.w3.org/2000/svg", width="18.38", height="18.375")
											path.err-in(data-name="cross", d="M1.4,0l17,17L17,18.4L0,1.4L1.4,0z M17,0l1.4,1.4l-17,17L0,17L17,0z", fill="#fff")

				

</template>

<script>
import formsMix from '@/mixins/forms.js'

export default {

	name: 'Contact-Form',
	mixins: [formsMix],
	data () {
		return {
			response: {
				variants: false,
				errors: {}
			},
			anim: false
		}
	},
	methods: {

		lengthMessage() {
			if (this.contacts.message.length > 50) {
				this.auxilliary.message = 'Максимальная длина сообщения 50 символов'
				return false
			}
			return true
		},

		closeError() {
			this.auxilliary.message = ''
		},

		closeForm() {
			this.auxilliary.status = !this.auxilliary.status
			this.$emit('stateFly', this.auxilliary.status);
		},

		post() {
			if (this.lengthName() && this.lengthPhone() && this.lengthMessage()) {
				this.axios({
					method: 'post',
					url: 'http://grayni.ru/post.php',
					data: {
						user: this.contacts.user,
						phone: this.contacts.phone,
						time: this.contacts.message
					}
				}).then(response => {
					this.response.variants = !!response.data
					if (!response.data) {
						this.auxilliary.message = 'Что-то пошло не так, позвоните нам.'
					}
				})
				.catch(e => {
					console.log(e)
				});
			}
		},
	},
	computed: {
		classObject: function() {
			setTimeout(function() {
				this.anim = this.view;
				return this.anim;
			}.bind(this), 100);
			return {
				present: this.anim
			}
		}
	}
}
</script>

<style lang="sass" scoped>
body
	margin-left: calc(100vw - 100%)

.form-wrap
	height: 100%
	width: 100%
	left: 0
	top: 0
	bottom: 100%
	background: rgba(255,255,255,.87)
	position: absolute
	z-index: 20000
	display: flex
	justify-content: center
	align-items: center
	overflow: hidden
	.wrap-in
		overflow-y: scroll
		top: -100%
		height: 100%
		width: 100%
		display: flex
		align-items: center
		justify-content: center
		margin-right: -45px
		position: relative
		box-sizing: content-box
	.wrap-in.present
		transition: all 1s cubic-bezier(0.175, 0.885, 0.32, 1.275)
		top: 0

	form
		transition: all .6s ease
		background: #aabad6
		padding: 16px
		width: 100%
		max-width: 489px
		position: relative
		border-radius: 25px
		box-shadow: 7px 16px 32px rgba(0,0,0,0.2)
		display: block
		&.goodbay
			padding: 60px 16px 100px

	.cross
		width: 19px
		height: 19px
		padding: 0
		border: none
		background: transparent
		box-shadow: none
		display: flex
		align-items: center
		justify-content: center
		position: absolute
		right: 20px
		top: 20px
		cursor: pointer
		&:hover
			.cross-in
				fill: #05367a
				transition: fill .3s linear

	.application
		display: flex
		flex-direction: column
		justify-content: center
		align-items: center
		margin-top: 39px

		span
			color: #05367a
			&:first-child
				text-transform: uppercase
				font: 700 18px 'Open Sans'
			&:last-child
				font: 16px 'Open Sans'
				padding-top: 5px

	.seconds
		display: flex
		align-items: center
		justify-content: center
		flex-direction: column
		margin-top: 30px
		span
			font: 36px 'Open Sans'
			text-transform: uppercase
			color: #fff
			&.thanks
				font-size: 54px
	
	.form-group
		display: flex
		justify-content: center
		align-items: center
		flex-direction: column
		input, textarea
			margin-top: 30px
			width: 95%
			&:first-child
				margin-top: 20px
			&::-webkit-input-placeholder
				color: #52688d
				font: 14px 'Open Sans'
			&:-moz-input-placeholder
				color: #52688d
				font: 14px 'Open Sans'
			&::-ms-input-placeholder
				color: #52688d
				font: 14px 'Open Sans'
			&::placeholder
				color: #52688d
				font: 14px 'Open Sans'
			font: 20px 'Open Sans'

		input
			padding: 11px 10px
		textarea
			height: 83px

	.politics
		display: flex
		align-items: center
		justify-content: center
		flex-direction: column
		font: 16px 'Open Sans'
		span
			&:first-child
				color: #fff
		a
			color: #05367a
			text-decoration: underline
			margin-top: 5px
			&:hover
				color: rgba(0,123,255,1)

	.send
		display: flex
		align-items: center
		justify-content: center

		.send-message
			font: 14px 'Open Sans'
			color: #fff
			text-transform: uppercase
			margin: 39px 0 20px 0
			padding: 16px 74px
			border-radius: 100px
			border: none
			background: #05367a
			cursor: pointer
			transition: all 0.3s linear
			&:hover
				box-shadow: 0 0 0 0.2rem rgba(0,123,255,.45)
				background: #063C87
				transition: all 0.3s linear
			&:active
				background: #042553
				box-shadow: none
	.error
		min-height: 40px
		background: rgba(255,0,0,0.6)
		position: absolute
		top: 130px
		left: 0
		right: 0
		margin: auto
		border-radius: 50px
		border: 2px solid #FF6262
		display: flex
		justify-content: space-between
		align-items: flex-start
		flex-direction: row
		max-height: 100px
		width: 90%
		overflow: hidden
		white-space: nowrap
		&>div
			height: 100%
			padding: 10px 20px
			&:first-child
				display: flex
				justify-content: flex-start
				align-items: center
				width: 90%
				padding: 10px 5px 10px 20px
			&:last-child
				padding: 12px 20px 12px 5px

		.exit-error
			cursor: pointer
			&:hover
				.err-in
					fill: #FF9090
		.msg-error
			color: #FFFFFF
			font: 16px 'Open Sans'

.error-anim-enter, .error-anim-leave-to
	opacity: 0
	max-width: 0
.error-anim-enter-to, .error-anim-leave
	max-width: 90%
.error-anim-enter-active, .error-anim-leave-active
	transition: all .6s ease

.state-form-enter, .state-form-leave-to
	opacity: 0
.state-form-enter-active, .state-form-leave-active
	transition: all 0.6s ease

.fly-enter, .fly-leave-to
	opacity: 0
.fly-enter-active, .fly-leave-active
	transition: all 0.6s ease

</style>