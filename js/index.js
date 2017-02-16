/*
* @Author: Administrator
* @Date:   2016-11-27 23:00:14
* @Last Modified by:   hxsd
* @Last Modified time: 2016-11-28 16:40:27
*/

onload=function(){
	var LocationFloorList=getByClass(document,'LocationFloorList')[0];
	var aLi=LocationFloorList.getElementsByTagName('li');
	var aFloor=getByClass(document,'floor');
	var arr=[];
		
	//-------------------------------------------------
		
	for(var i=0; i<aFloor.length; i++){
		var json={};
		json.name=i;
		json.offsetTop=aFloor[i].offsetTop;
		arr.push(json);
	};
	
	console.log(arr);
	
	window.onscroll=function(){
		//显示楼层编号-------------------------------------------------
		var scrolltop=document.documentElement.scrollTop || document.body.scrollTop;
		if(scrolltop>200){
			LocationFloorList.style.display='block';
		}else{
			LocationFloorList.style.display='none';
		};
		
		// 根据楼层滚动位置，定位编号------------------------------------------------
		var last_arr=[];
		for(var j=0; j<arr.length; j++){
			if(arr[j].offsetTop<scrolltop+400){//400为接近屏幕的敏感区
				last_arr.push(arr[j].name);
			};
		};
		console.log(last_arr);
		
		var li_index=last_arr[last_arr.length-1];

		for(var l=0; l<aFloor.length; l++){
			aLi[l].className='';
		};
		//页面上部如果有内容，没有楼层会放入新数组，产生错误
		last_arr.length==0 ?aLi[0].className='ac':aLi[li_index].className='ac';
	};
	
	//点击编号，跳转到相对楼层-----------------------------------------------
	for(var i=0; i<aFloor.length; i++){
		aLi[i].index=i;
		aLi[i].onclick=function(){
			var start=document.documentElement.scrollTop || document.body.scrollTop;
			var end=arr[this.index].offsetTop;
			move(start,end)
		}
	};
	//move-------------------------------------------------------
	var timer;
	function move(start,end){
		var dis=end-start;
		var count=parseInt(1500/30);
		var n=0;
		clearInterval(timer);
		timer=setInterval(function(){
			n++;
			var a=1-n/count;
			var step_dis=start+dis*(1-a*a*a*a);
			window.scrollTo(0,step_dis);//第一个参数:横向滚动条  第二个参数:纵向滚动条
			if(n==count){
				clearInterval(timer);
			};
		},30)
	};
	
	function getByClass(oParent,cls){
		var arr=[]; //容器
		if(document.getElementsByClassName) return oParent.getElementsByClassName(cls);
		else{
			var aEl=oParent.getElementsByTagName('*');//所有标签
			for(var i=0;i<aEl.length;i++){
				if(aEl[i].className.indexOf(cls)!=-1) arr.push(aEl[i]);//向数组中添加
			}
		return arr;
		}
	};
	//菜单
	function menu(){
		var nav_list=document.getElementById('nav_list')
	    var aLi=nav_list.getElementsByTagName('li');
	    var menuCont=document.getElementById('menuCont');
	    var channel=menuCont.getElementsByClassName('channel1');
	    var timer;
	    function clearAc(){
	        for(var j=0;j<aLi.length;j++){
	                aLi[j].className="";
	            }
	    }
	    for(var i=0;i<aLi.length;i++){

	        //绑定事件//li增加mouseover事件
	        aLi[i].onmouseover=function(){
	            clearTimeout(timer);	            
	            menuCont.style.display="block";
	            clearAc();
	            this.className="ac";	            
	            for(var k=0;k<aLi.length;k++){
	                channel[k].style.display="none";
	            }
	            //读取自己的自定义属性
	            var show_id=this.getAttribute('data-index');
	            document.getElementById('cate_item'+show_id).style.display="block";
	        }
	        //li增加mouseout事件
	        aLi[i].onmouseout=function(){
	            clearTimeout(timer);
	            timer=setTimeout(function(){ 
		            clearAc();
		            menuCont.style.display="none";
	            },100);           
	        }
	    }
	    //右侧菜单增加事件
	    menuCont.onmouseenter=function(){
	        clearTimeout(timer);
	        this.style.display="block";
	    }
	    menuCont.onmouseleave=function(){
	        clearAc();
	        this.style.display="none";
	    }
	}
	menu();
	//轮播
	function carousel(){
		var BannerBox=document.getElementById('bannerbox');
		var oUl=document.createElement('ul');
		oUl.className="bannerBtn"
		var BtnPrev=document.getElementById('button_prev');
		var BtnNext=document.getElementById('button_next');
		var bannerImg=document.getElementsByClassName('bannerimg');
		var nn=0;
		var timer;
		for(var i=0;i<bannerImg.length;i++){
			var oLi=document.createElement('li');
			oLi.innerHTML=i+1;
			oUl.appendChild(oLi);
		}

		BannerBox.appendChild(oUl);
		var aaLi=oUl.getElementsByTagName('li');
		aaLi[0].className="buttonac";
		for(var j=0;j<bannerImg.length;j++){
			aaLi[j].index=j;
			aaLi[j].onclick=function(){
				for(var k=0;k<aaLi.length;k++){
					bannerImg[k].className="bannerimg hide";
					aaLi[k].className="";
				}
				this.className="buttonac";
				nn=this.index;
				bannerImg[this.index].className="bannerimg block";
			}
		}
		BtnNext.onclick=function(){
			nn++;
			if(nn>=7){
				nn=7;
			}
			for(var k=0;k<aaLi.length;k++){
					bannerImg[k].className="bannerimg hide";
					aaLi[k].className="";
				}
			aaLi[nn].className="buttonac";
			bannerImg[nn].className="bannerimg block";
		}
		BtnPrev.onclick=function(){
			nn--;
			if(nn<=0){
				nn=0;
			}
			for(var k=0;k<aaLi.length;k++){
					bannerImg[k].className="bannerimg hide";
					aaLi[k].className="";
				}
			aaLi[nn].className="buttonac";
			bannerImg[nn].className="bannerimg block";
		}
		function run(){
			timer=setInterval(function(){
				nn++;
				if(nn==8){
					nn=0;
				}
				for(var k=0;k<aaLi.length;k++){
						bannerImg[k].className="bannerimg hide";
						aaLi[k].className="";
					}
				aaLi[nn].className="buttonac";
				bannerImg[nn].className="bannerimg block";
			},2000)
		}
		run();
		BannerBox.onmouseover=function(){
			clearInterval(timer)
		}
		BannerBox.onmouseout=function(){
			run();
		}
	}
	carousel();
	
}