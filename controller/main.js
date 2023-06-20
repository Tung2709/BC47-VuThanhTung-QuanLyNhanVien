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

	// tạo mảng nhân viên từ lớp đối tượng Nhân Viên
	var nhanvien= new NhanVien(tknv,name,email,password,datepicker,luongCB,chucvu,gioLam)
	
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
	if(!value)
	getElement([alert]).innerHTML="Không được bỏ trống"
}
var i = 10; 	
var regex =/^\d+$/;
var a=regex.test(i)
console.log(a)