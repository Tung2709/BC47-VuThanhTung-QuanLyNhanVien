function getElement(selector){
	return document.querySelector(selector)
}

var dsnv= new DSNV()

getLocalNhanVien()

getElement("#btnThemNV").onclick= function(){
	// Lấy thông tin nhân viên từ input
	var tknv=getElement("#tknv").value
	var name=getElement("#name").value
	var email=getElement("#email").value
	var password=getElement("#password").value
	var datepicker=getElement("#datepicker").value
	var luongCB=+getElement("#luongCB").value
	var chucvu=getElement("#chucvu").value
	var gioLam=+getElement("#gioLam").value
	 console.log(typeof luongCB)
	 console.log(luongCB)
	// tạo mảng nhân viên từ lớp đối tượng Nhân Viên
	var nhanvien= new NhanVien(tknv,name,email,password,datepicker,luongCB,chucvu,gioLam)
	

	// Kiểm tra thông tin nhập vào là dạng số
	validNumber(tknv,'#tbTKNV')


	// Kiểm tra độ dài của thông tin 
	checkLength(tknv,'#tbTKNV',4,6)
	checkLength(password,'#tbMatKhau',6,10)

	// Kiểm tra thông tin có phải chữ
	checkLetter(name,'#tbTen')

	// Kiểm tra định dạng email
	checkEmail(email,'#tbEmail')

	//  Kiểm tra định dạng mật khẩu
	checkPassword(password,'#tbMatKhau')

	//Kiểm tra định dạng ngày
	checkDate(datepicker,'#tbNgay')

	//Kiểm tra lương cb và giờ làm
	checkValue(luongCB,'#tbLuongCB',1000000,20000000)
	checkValue(gioLam,'#tbGiolam',80,200)

	// Kiểm có thông tin bị bỏ trống hay không
	validEmty(tknv,'#tbTKNV')
	validEmty(name,'#tbTen')
	validEmty(email,'#tbEmail')
	validEmty(password,'#tbMatKhau')
	validEmty(datepicker,'#tbNgay')
	validEmty(chucvu,'#tbChucVu')
	validEmty(luongCB,'#tbLuongCB')

	getElement("#tbLuongCB").style.display="block"
	getElement("#tbLuongCB").innerHTML= luongCB
	validEmty(gioLam,'#tbGiolam')


	// Thêm thông tin nhân viên mới nhập vào mảng nhân viên
	dsnv.themNV(nhanvien)

	//Hiển thị thông tin nhân viên dưới bảng
	renderNV(dsnv.arrayNV)


	setLocalNhanVien(dsnv.arrayNV)
	
}

// Lưu object nhân viên vào bộ nhớ local
function setLocalNhanVien(OBNhanVien){
localStorage.setItem("Nhân Viên", JSON.stringify(OBNhanVien))
}


//Hiển thị đối tượng nhân viên dưới dạng table
function renderNV(OBNhanVien){
	var content = " "
	for(var i =0; i < OBNhanVien.length;i++){
		var nv= OBNhanVien[i]
		content += ` 
		<tr>
		<td>${nv.tknv}</td>
		<td>${nv.name}</td>
		<td>${nv.email}</td>
		<td>${nv.datepicker}</td>
		<td>${nv.chucvu}</td>
		<td>${nv.tongLuong()}</td>
	    <td>${nv.xepLoai()}</td>
		<td><button class="btn btn-success" data-toggle="modal" data-target="#myModal" onclick="updatePopUp(${nv.tknv})" >Sửa</button>
		<button class="btn btn-danger" onclick="deleteNV(${nv.tknv})">Xóa</button>
		</td>
		</tr>
		`

	}

	getElement("#tableDanhSach").innerHTML=content
}

// Láy thông tin đối tượng nhân viên ở local
function getLocalNhanVien(){
	var dataNV=JSON.parse(localStorage.getItem("Nhân Viên"))

	if(dataNV){
		var arr=[]
		for(var i=0;i<dataNV.length;i++){
			var nv=dataNV[i]
			var nhanvien= new NhanVien(nv.tknv,nv.name,nv.email,nv.password,nv.datepicker,nv.luongCB,nv.chucvu,nv.gioLam)
			arr.push(nhanvien)
		}

		dsnv.arrayNV=arr
		renderNV(dsnv.arrayNV)
	}
}

//Xóa thông tin của 1 nhân viên
function deleteNV(maNV){
	dsnv.xoaNV(maNV)
	console.log(dsnv.arrayNV)
	renderNV(dsnv.arrayNV)
	setLocalNhanVien(dsnv.arrayNV)
}

//Xuất thông tin nhân viên muốn chỉnh sửa lên cửa sổ 
function updatePopUp(maNV){
	for(var i=0; i<dsnv.arrayNV.length;i++){
		mnv=dsnv.arrayNV[i].tknv
		if(mnv==maNV){
			getElement("#tknv").value=dsnv.arrayNV[i].tknv
			getElement("#name").value=dsnv.arrayNV[i].name
			getElement("#email").value=dsnv.arrayNV[i].email
			getElement("#password").value=dsnv.arrayNV[i].password
			getElement("#datepicker").value=dsnv.arrayNV[i].datepicker
			getElement("#luongCB").value=dsnv.arrayNV[i].luongCB
			getElement("#chucvu").value=dsnv.arrayNV[i].chucvu
			getElement("#gioLam").value=dsnv.arrayNV[i].gioLam
		}
	}
}

getElement("#btnCapNhat").onclick=function(){
	var tknv=getElement("#tknv").value
	var name=getElement("#name").value
	var email=getElement("#email").value
	var password=getElement("#password").value
	var datepicker=getElement("#datepicker").value
	var luongCB=+getElement("#luongCB").value
	var chucvu=getElement("#chucvu").value
	var gioLam=+getElement("#gioLam").value

	var updateNV = new NhanVien(tknv,name,email,password,datepicker,luongCB,chucvu,gioLam)
	dsnv.updateNV(updateNV)
	renderNV(dsnv.arrayNV)
	setLocalNhanVien(dsnv.arrayNV)
	
}

// Tìm kiếm nhân viên theo xếp loại
getElement("#btnTimNV").onclick=function(){
	var xeploai=getElement("#searchName").value.toLowerCase()
	if(xeploai){
		var nv=[]
		for(var i =0;i<dsnv.arrayNV.length;i++){
			var xeploainv=dsnv.arrayNV[i].xepLoai().toLowerCase()
			if(xeploainv.indexOf(xeploai) != -1){
				nv.push(dsnv.arrayNV[i])
			}
		}
		if(Object.keys(nv).length){
			console.log(Object.keys(nv).length)
			renderNV(nv)
		} else if (Object.keys(nv).length===0){
			getElement("#tableDanhSach").innerHTML="KHÔNG CÓ KẾT QUẢ PHÙ HỢP OKE CHƯA!!!"
		}
	}
}

getElement("#searchName").addEventListener("keyup", function(){
	renderNV(dsnv.arrayNV)
})

// validation cho các thông tin nhân viên điền vào 
function validTKNV(vtknv){
	regexNum= new RegExp("^[0-9]+$");
	regexRange= new RegExp("[4-6]")
	if(!vtnkv){
		getElement("#tbTKNV").innerHTML="Không được bỏ trống"
	}
}

function validEmty(value,alert){
	if(!value.trim() || value==0){
		getElement(alert).style.display="block"
		getElement(alert).innerHTML="Không được bỏ trống"
		console.log(value)
		return
	} 
	if(value==="Chọn chức vụ"){
		getElement(alert).style.display="block"
		getElement(alert).innerHTML="Hãy chọn chức vụ"
		return
	}

	getElement(alert).style.display="none"
	getElement(alert).innerHTML=" "
}

function validNumber(value,alert){
	var regexNumber =/^\d+$/;
	var number = regexNumber.test(value);
	if(!number){
		getElement(alert).style.display="block"
		getElement(alert).innerHTML="Chỉ được điền số"
		return
	}
	getElement(alert).style.display="none"
	getElement(alert).innerHTML=" "
}

function checkLength(value, alert , minLength, maxLength){
	if (value.length < minLength || value.length > maxLength){
		document.querySelector(alert).style.display="block";
		document.querySelector(alert).innerHTML ='Phải có độ dài từ ' + minLength + ' đến ' + maxLength + ' ký tự';
		return false ;
	}
	document.querySelector(alert).style.display="none";
	document.querySelector(alert).innerHTML = '' ;
	return true;
}

// Kiểm thông tin có phải là chữ
function checkLetter(value, alert){
	var regex = /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u;
	if (regex.test(value)){
		document.querySelector(alert).style.display="none";
		document.querySelector(alert).innerHTML = '' ;
		return true ;
	}
	document.querySelector(alert).style.display="block";
	document.querySelector(alert).innerHTML= 'Phải là chuỗi ký tự'
	return false;
}

//Kiểm tra định dạng email
function checkEmail(value, alert){
	var regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	if (regex.test(value)){
		document.querySelector(alert).style.display="none";
		document.querySelector(alert).innerHTML = '' ;
		return true ;
	}
	document.querySelector(alert).style.display="block";
	document.querySelector(alert).innerHTML ='Phải đúng theo định dạng. Ví dụ: abc@gmail.com'
	return false;
}

// Kiểm định dạng mật khẩu
function checkPassword(value, alert){
	var regex =/(?=.*?[A-Z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-])/;
	if (regex.test(value)){
		document.querySelector(alert).style.display="none";
		document.querySelector(alert).innerHTML = '' ;
		return true ;
	}
	document.querySelector(alert).style.display="block";
	document.querySelector(alert).innerHTML = 'Phải chứa ít nhất 1 ký tự số, 1 ký tự in hoa, 1 ký tự đặc biệt'
	return false;
}

// Kiểm tra định dạng ngày làm
function checkDate(value, alert){
	var regex = /(^(((0[1-9]|1[0-9]|2[0-8])[\/](0[1-9]|1[012]))|((29|30|31)[\/](0[13578]|1[02]))|((29|30)[\/](0[4,6,9]|11)))[\/](19|[2-9][0-9])\d\d$)|(^29[\/]02[\/](19|[2-9][0-9])(00|04|08|12|16|20|24|28|32|36|40|44|48|52|56|60|64|68|72|76|80|84|88|92|96)$)/;
	if (regex.test(value)){
		document.querySelector(alert).style.display="none";
		document.querySelector(alert).innerHTML = '' ;
		return true ;
	}
	document.querySelector(alert).style.display="block";
	document.querySelector(alert).innerHTML = 'Phải đúng định dạng dd/mm/yyyy'
	return false;
}

//Kiểm tra lương và giờ làm
function checkValue(value, alert , minValue, maxValue){
	if (value < minValue || value > maxValue){
		document.querySelector(alert).style.display="block";
		document.querySelector(alert).innerHTML = 'Phải từ ' + minValue + ' đến ' + maxValue;
		return false ;
	}
	document.querySelector(alert).style.display="none";
	document.querySelector(alert).innerHTML = '' ;
	return true;
}



    // getElement("#tknv").onblur=function(){
	// 	validEmty("#tknv",'#tbTKNV')
	// 	validNumber("#tknv",'#tbTKNV')
	// 	checkLength("#tknv",'#tbTKNV',4,6)
	// }
	// getElement("#name").onblur=function(){
	// 	validEmty("#name",'#tbTen')
	// 	checkLetter("#name",'#tbTen')
	// }
	// getElement("#email").onblur=function(){
	// 	checkEmail("#email",'#tbEmail')
	// 	validEmty("#email",'#tbEmail') 
	// }
	// getElement("#password").onblur=function(){
	// 	checkLength("#password",'#tbMatKhau',6,10)
	// 	checkPassword("#password",'#tbMatKhau')
	// 	validEmty("#password",'#tbMatKhau') 
	// }
	// getElement("#datepicker").onblur=function(){
	// 	checkDate("#datepicker",'#tbNgay')
	// 	validEmty("#datepicker",'#tbNgay')
	// }
	// getElement("#luongCB").onblur=function(){
	// 	checkValue("#luongCB",'#tbLuongCB',1000000,20000000)
	// 	validEmty("#luongCB",'#tbLuongCB')
	// }
	// getElement("#chucvu").onblur=function(){
	// 	validEmty("#chucvu",'#tbChucVu')
	// }
	// getElement("#gioLam").onblur=function(){
	// 	checkValue("#gioLam",'#tbGiolam',80,200)
	// 	validEmty("#gioLam",'#tbGiolam')
	// }
