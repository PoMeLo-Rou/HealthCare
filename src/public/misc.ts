const uploadImage = (url:string,load_title:string,err_title:string) => {
	return new Promise((resolve,reject)=> {
		uni.chooseMedia({
			  count: 1,
			  mediaType: ['image'],
			  sourceType: ['album'],
			  sizeType: ['compressed'],
			  success:(res) => {
				  uni.showLoading({title:load_title,mask:true})
				  console.log(res)
				  uni.uploadFile({
					  url,
					  filePath:res.tempFiles[0].tempFilePath,
					  name:'file',
					  header:{accept:'application/json'},
					  success:(imgres)=> {
						  uni.hideLoading()
						  resolve(imgres)
					  },
					  fail:(err) => {
						  uni.showToast({title:err_title,icon:'error',duration:100})
						  reject(err)
					  }
				  })
			  }
		})
	})
}



export {uploadImage}