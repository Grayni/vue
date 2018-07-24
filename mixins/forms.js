export default {
	props: ['view'],
	data() {
		return {
			contacts: {
				user: '',
				email: '',
				phone: '',
				message: ''
			},
			auxilliary: {
				getPhone: '',
				message: '',
				status: true,
				error: false,
			}
		}
	},
	methods: {
		lengthPhone() {
			let aux = this.auxilliary;

			if (aux.getPhone.length && aux.getPhone.match(/[0-9]/g).length === 11) {
				this.contacts.phone = aux.getPhone.substr(1,aux.getPhone.length-1)
				aux.message = ''
				return true
			}

			else if (aux.getPhone.length > 6) {
				aux.message = 'Номер введен не полностью'
				return false
			}

			else {
				aux.message = 'Пожалуйста, введите номер'
				return false
			}
		},
		lengthName() {

			let aux = this.auxilliary, cont = this.contacts;

			if (this.contacts.user.length === 0) {
				aux.message = 'Пожалуйста, введите имя'
				return false
			}

			else if (cont.user.length > 30) {
				aux.message = 'Длина имени больше 30 символов'
				return false
			}

			else if (cont.user.length && (/[^а-яА-ЯЁё\s]/g).test(this.contacts.user)) {
				aux.message = 'Имя может содержать кириллицу и пробелы'
				return false
			}

			return true
		},
		instMask() {
			this.auxilliary.getPhone = '✆ +7 (###) - ### - ## - ##';
		},
	}
}