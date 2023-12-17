// ---------------首页--------------
// 疫苗预约
export interface Vaccine {
	image: string
	title: string
}
// 挂号和体检
export interface Reserve {
	describe: string
	image: string
	title: string
}
// 热门挂号
export interface Popular {
	background: string
	dep_id: string
	image: string
	title: string
}
// 健康自测
export interface Selftest {
	describe: string
	image: string
	minute: number
	name: string
	number_of_people: number
	question: number
}
// -------------------------新冠疫苗预约---------------
// 接口返回的数据
interface Time {
	end_time: string
	over: number
	start_time: string
	when: number
}
interface Period {
	period: string
	time: Time[]
}
interface Week {
	Have: string
	date: string
	day: string
}
export interface Newapptime {
	Hospital: string
	address: string
	company: string[]
	lasting: Period[]
	week: Week[]
	_id: string
}
// 提交新冠疫苗预约的携带参数
export interface Subimtdata {
	name: string,
	id_card: string,
	phone:string,
	address: string,
	de_address: string,
	crowd_sort:string,
	date:string,
	period:string,
	reserve_time:string,
	when:number
}
// ----------------微信小程序用户登录提交的数据----------
export interface Wxlogin {
	appid: string
	secret: string
	nickName: string
	avatarUrl: string
	code: string
}

// --------------新冠疫苗预约订单返回的数据----------------
export interface Coviduserorder {
	address: string
	cancel: boolean
	company: string
	date: string
	name: string
	period: string
	time: string
	_id: string
}
// 取消新冠疫苗预约
export interface Covidcancel {
	_id:string
}
// -----------------------------hpv宫颈癌疫苗在线预约的列表数据 ------------
// 预约列表数据
export interface Hpvlist {
	describe: string[]
	hpv_id: string
	name: string
	price: string[]
	_id: string
}
export interface Hpvselect {
	name: string
	_id: string
}
// 预约详情数据
interface Name {
	combo: string
	combo_id: string
}
export interface Comboname {
	title:string
	name: Name[]
}
interface Timename {
	time: string
	time_id: string
}
export interface Combotime {
	title:string
	name:Timename[]
}
//查询hpv套餐价格
export interface Hpvprice {
	hpv_id:string,
	combo_id:string,
	time_id:string
}
// 提交HPV疫苗预约 ,提交的数据
export interface Reshpv{
	name:string,
	id_card:string,
	gender: string,
	born_date: string,
	phone: string,
	combo: string,
	ino_time: string,
	price: number,
	hpv_name:string
}
// HPV疫苗预约订单 ，收到的数据
export interface Hpvuserorder {
	name:string,
	combo: string,
	ino_time: string,
	price: number,
	hpv_name:string,
	time: string,
	address: string,
	order_number: string,
	cancel: boolean,
	_id: string
}
// ------------------------核酸检测预约页面数据 ---------------------
interface Date {
	date: string
	week: string
}
interface Style {
	desc: string[]
	title: string
}
export interface Nucleicacid {
	address: string
	boon: string[]
	date: Date[]
	hospital: string
	logo: string
	name: string
	phone: string
	price: number
	style: Style[]
	_id?: string
}
// 核酸检测预约提交参数
export interface Resnuata  {
	name:string,
	phone:string,
	id_card:string,
	time: string
}
// 核酸检测预约订单返回数据
export interface Nuatauserorder {
	phy_name: string,
	address: string,
	name: string,
	phone: string,
	phy_time:string,
	time: string,
	price: number,
	order_number: string,
	cancel: boolean,
	_id:string
}
// -------------------------图文咨询----------------------
// 预约图文咨询，提交的数据
export interface Graphics {
	illness: string,
	guide: boolean,
	ins_report: string[],
	patient_id: string
}
// 所有就诊人信息
export interface Patient {
	age: string
	born: string
	id_card: string
	name: string
	phone:string
	relation: string
	sex: string
	_id: string
}
// 添加就诊人，提交参数
export interface AddPatient {
	name:string
	sex: string
	born:string
	relation:string
	id_card:string
	phone:string
}
// --------------------体检套餐------------------------
// 体检套餐筛选条件
export interface PhyTerm {
	filter_val: string[]
	query_val: string
	_id: string
}
// 体检套餐的所有数据
export interface PhyData {
	be_suit: string
	describe: string
	image: string
	price: number
	sales: number
	title: string
	_id: string
}
// 定义筛选套餐时提交的数据
export interface FilterData {
	type:string,
	sales: string,
	price:string
}
// -------------------------体检预约详情页-----------------------
// 体检预约详情页面数据，提交的参数
export interface Phydateil {
	id:string
}
interface Crowd {
	image: string
	name: string
}
interface Content {
	details: string
	thing: string
}
interface Project {
	content: Content[]
	title: string
}
//  体检预约详情页面数据，接口返回数据
export interface PhyDetailData {
	crowd: Crowd[]
	date: Date[]
	image:string
	price: number
	project: Project[]
	sales: number
	title: string
	_id: string
}
// 提交体检预约的相关数据
export interface PhySubmit {
	phy_name:string
	phy_time:string
	patient_id:string
}
// 获取体检套餐订单
export interface PhyUserorder {
	address: string
	cancel: boolean
	name: string
	order_number: string
	phy_name: string
	phy_time: string
	price: number
    time: string
	_id: string
}
// -------------------------个人测试，测评结果------------------------
interface Options {
	son_id: string
	title: string
}
export interface TestResult {
	options: Options[]
	topic: string
	_id: string
}
// 测试结果返回数据
interface Recommend {
	dep_id: string
	dep_name: string
	hospital: string
}
export interface Testres {
	outline: string[]
	recommend: Recommend[]
	result: string
	scope: string
	suggest: string
	_id: string
}
// 定义分享数据的数据类型
export interface ShareData {
	type: string,
	name: string,
	share_title: string,
	share_path: string,
	share_url: string
}

// -----------------------医师课堂----------------------
// 页面返回数据
export interface VideoData {
	avatar: string
	controls: boolean
	name: string
	play_but: boolean
	video_title: string
	video_url: string
	_id: string
}
// ---------------------------------挂号页面--------------------------
// 父科室数据
export interface DepartmentData {
	dep_ment: string
	_id: string
}
// 子科室数据
interface DepList {
	dep_id: "1658914644302"
	dep_name: "新生儿随访门诊"
}
export interface RegListData {
	dep_ment: string
	dep_ment_list: DepList[]
	_id: string
}
// -------------------------医生挂号-------------------
// 日期数据
export interface DoctorTime {
	date: string
	dep_id: string
	nu_source: number
	week: string
}
// 医生数据
export interface DoctorList {
	_id:string
	avatar: string
	good_at: string
	name:string
	post:string
}
// 医生主页的数据
interface DoctorHomeTime {
	already:number
	nu_source:number
	the_time:string[]
	when:number
}
interface Appment {
	day:string
	time:DoctorHomeTime[]
	total_source:number
	week:string
}
export interface DoctorData {
	_id:string
	avatar: string
	good_at: string
	name:string
	post:string
	cost:number
	hospital:string
	App_ment:Appment[]
}
// 提交预约
export interface Regappoin {
	week:string,
	the_time:string,
	when:number,
	_id:string,
	patient_id:string
}
// ------------------------------------------挂号订单的数据-------------------------------
// 页面数据
export interface Userregister {
	avatar: string
	cancel: boolean
	dep_ment: string
	patient_name: string
	que_number: string
	reg_cost: number
	remark: string
	se_number: string
	the_time: string
	tre_doctor: string
	tre_place: string
	tre_time: string
	_id: string
}