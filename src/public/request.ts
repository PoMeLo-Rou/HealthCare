// 公用请求接口
const baseUrl = 'https://meituan.thexxdd.cn/api/'
import { Base64 } from 'js-base64';
import {Subimtdata,Wxlogin,Covidcancel, 
Hpvprice,Reshpv,Resnuata,AddPatient,Graphics,
FilterData,Phydateil,PhySubmit,Regappoin
} from './decl-type'
const getToken = () => {
	const token = uni.getStorageSync('wxuser').user_Token || ''
	const base64_token = Base64.encode(token + ':')
	return 'Basic ' + base64_token
}

const request = (
url:string,
method:'GET'|'POST',
data:string|Object|ArrayBuffer
) => {
	return new Promise((resolve,reject) => {
		uni.request({
			url:baseUrl + url,
			method,
			data,
			header:{Authorization:getToken()},
			success: (res:any) => {
				if(res.statusCode == 200) {
					resolve(res)
				} else if(res.statusCode == 401) {
					uni.navigateTo({
						url:'/pages/login-page/index'
					})
					// 没有权限访问
					reject(res)
				}else if(res.statusCode == 400) {
					uni.showToast({
						title:"开发者相关参数或者字段错误",
						icon:"none"
					})
					reject(res)
				}else if(res.statusCode == 500) {
					uni.showToast({
						title:"服务器发生未知错误",
						icon:"none"
					})
					reject(res)
				} else if(res.statusCode == 202) {
					uni.showToast({
						title:res.data.msg,
						icon:"none"
					})
					reject(res)
				} else {
					uni.showToast({
						title:"出现相关问题",
						icon:"none"
					})
					reject(res)
				}
			},
			fail: (err) => {
				reject(err)
			}
		})
	})
}

// 封装接口函数
const RequestApi = {
	//1. 首页数据
	FrontPage :() => request('frontpage ','GET',{}),
	// 2. 新冠疫苗预约时段   GET    /newapptime 
	NewappTime  :() => request('newapptime','GET',{}),
	// 3. 新冠疫苗预约的提交    POST  /rescovid 
	ResCovid   :(data:Subimtdata) => request('rescovid','POST',data),
	// 25.微信用户登录  POST   /wx_login 
	WxLogin :(data:Wxlogin) => request('wx_login','POST',data),
	// 4. 新冠疫苗预约订单    GET    /coviduser_order 
	CoviduserOrder:() => request('coviduser_order','GET',{}),
	// 5. 取消新冠疫苗预约    GET    /covidcancel?query= 
	CovidCancel:(data:Covidcancel) => request('covidcancel','GET',data),
	// 获取hpv宫颈癌疫苗在线预约的列表数据 GET    /otuhpv 
	OtuHpv:() => request('otuhpv','GET',{}),
	//7. HPV疫苗套餐    GET   /hpv_pack 
	HpvPack :() => request('hpv_pack ','GET',{}),
	//8. 查询HPV套餐价格    POST   /hpv_price 
	HpvPrice:(data: Hpvprice) => request('hpv_price','POST',data),
	// 9. 提交HPV疫苗预约    POST   /reshpv  
	ResHpv:(data: Reshpv) => request('reshpv','POST',data),
	// 10. HPV疫苗预约订单   GET   /hpvuser_order 
	HpvuserOrder:() => request('hpvuser_order','GET',{}),
	// 11. 取消HPV预约   GET   /hpvcancel?query= 
	HpvCancel:(data:Covidcancel) => request('hpvcancel','GET',data),
	// 12. 获取核酸检测页面数据   GET   /nuataget 
	NuataGet:() => request('nuataget','GET',{}),
	// 13. 提交核酸检测预约   POST   /resnuata 
	ResNuata :(data: Resnuata) => request('resnuata','POST',data),
	// 14. 核酸检测订单    GET   /nuatauser_order 
	NuatauserOrder :() => request('nuatauser_order','GET',{}),
	// 15. 取消核酸检测预约    GET    /nuatacancel?query= 
	NuataCancel:(data:Covidcancel) => request('nuatacancel','GET',data),
	// 44. 获取就诊人信息   GET   /get_patient 
	GetPatient :() => request('get_patient','GET',{}),
	// 43. 提交就诊人        POST   /patient_res 
	PatientRes :(data: AddPatient) => request('patient_res','POST',data),
	// 17. 提交图文咨询   POST    /graphics 
	GraPhics  :(data: Graphics) => request('graphics','POST',data),
	// 18. 获取体检筛选条件    GET   /phyterm 
	PhyTerm :() => request('phyterm','GET',{}),
	// 19. 获取全部体检套餐    GET  /physget 
	PhysGet  :() => request('physget','GET',{}),
	// 20. 筛选体检套餐    POST     /phyquery    
	PhyQuery  :(data: FilterData) => request('phyquery','POST',data),
	// 21. 体检套餐详情页数据    GET   /phydateil?query= 
	PhyDateil:(data:Phydateil) => request('phydateil','GET',data),
	// 22. 体检预约提交   POST    /resphy 
	ResPhy: (data: PhySubmit) => request('resphy', 'POST', data),
	// 23. 获取体检套餐订单   GET   /phyuser_order 
	PhyuserOrder  :() => request('phyuser_order','GET',{}),
	// 24. 取消体检预约   GET     /phycancel?query= 
	PhyCancel:(data:Covidcancel) => request('phycancel','GET',data),
	// 26. 获取抑郁症题目    GET    /depression_topics 
	DepressionTopics  :() => request('depression_topics','GET',{}),
	// 27. 抑郁症测试结果   GET   /depression?query= 
	Depression:(data:{value:string[]}) => request('depression','GET',data),
	// 28. 获取早泄题目    GET   /premature_topics 
	PrematureTopics   :() => request('premature_topics','GET',{}),
	// 29. 早泄测试结果    GET   /premature?query= 
	PreMature:(data:{value:string[]}) => request('premature','GET',data),
	// 30. 获取失眠题目    GET   /insomnia_topics 
	InsomniaTopics:() => request('insomnia_topics','GET',{}),
	// 31. 失眠测试结果    GET   /insomnia?query= 
	InsoMnia:(data:{value:string[]}) => request('insomnia','GET',data),
	// 32. 获取短视频数据    GET   /video_list?query= 
	VideoList:(data:{page:number}) => request('video_list','GET',data),
	// 33. 获取父科室列表    GET    /department 
	Department :() => request('department','GET',{}),
	// 34. 获取父科室下的子科室   GET   /reglist?query= 
	RegList:(data:{id:string}) => request('reglist','GET',data),
	//35. 获取选择医生的日期    GET   /timesele?query= 
	TimeSele:(data:{dep_id:string}) => request('timesele','GET',data),
	// 36. 获取选择的科室下的全部医生列表     GET    /alldlist?query= 
	AlldList:(data:{dep_id:string}) => request('alldlist','GET',data),
	//37. 根据时间筛选挂号医生    GET    /everydlist?query= 
	EverydList:(data:{dep_id:string,week:string}) => request('everydlist','GET',data),
	// 38. 挂号医生主页   GET   /doctorhome?query= 
	DoctorHome:(data:{_id:string}) => request('doctorhome','GET',data),
	//39. 提交挂号预约   POST   /regappoin 
	RegAppoin : (data: Regappoin) => request('regappoin', 'POST', data),
	// 40. 获取每个用户的挂号记录    GET    /user_registrat 
	UserRegistrat  :() => request('user_registrat','GET',{}),
	// 41. 取消预约挂号    GET   /regist_cancel?query= 
	RegistCancel:(data:{_id:string}) => request('regist_cancel','GET',data),
}
const ImgUrl = baseUrl + 'upload_picture '
const AiCard = baseUrl +'ai_card'
export { RequestApi, ImgUrl, AiCard }