function DSNV(){
	this.arrayNV=[];

	this.themNV= function(nhanvien){
		this.arrayNV.push(nhanvien)
	}
	
	this.updateNV= function(updateNV){
		for(var i=0;i<this.arrayNV.length;i++){
			var mnv=this.arrayNV[i].tknv;
			if(mnv==updateNV.tknv){
				this.arrayNV[i]=updateNV
			}
		}
	}
	
	this.xoaNV= function(maNV){

		var index =-1
		for(var i=0;i<this.arrayNV.length;i++){
			var mnv=this.arrayNV[i].tknv;
			if(mnv==maNV){
				index=i
			}
		}
		if(index != -1){
			this.arrayNV.splice(index,1)
		}
	}
}