import {defineStore} from 'pinia'
export interface patientData {
	name:string,
	_id:string
}
export const mydata = defineStore('my_data',{
	state:()=>({
		patient:{} as patientData
	}),
	// 同步异步改变存储的数据
	actions:{
		addPatien(value:patientData) {
			this.patient = value
		}
	}
})