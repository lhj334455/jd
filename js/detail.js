/*
* @Author: Administrator
* @Date:   2016-11-27 13:03:20
* @Last Modified by:   95
* @Last Modified time: 2016-11-27 22:42:16
*/



onload=function(){
	//加一减一
	var Choose_btns=document.getElementById('choose-btns');
	var Btn_reduce=Choose_btns.getElementsByClassName('btn-reduce')[0];
	var Btn_add=Choose_btns.getElementsByClassName('btn-add')[0];
	var Buy_num=document.getElementById('buy-num');
	var n=1;
	Btn_add.onclick=function(){
		n++;
		Buy_num.value=n;
		Btn_reduce.className="btn-reduce";	
	}
	Btn_reduce.onclick=function(){
		n--;
		Buy_num.value=n;
		if(n<=1){
			n=1;
			Buy_num.value=n;
			Btn_reduce.className="btn-reduce disabled";
		}else{
			Btn_reduce.className="btn-reduce";
		}
	}
	// 选择颜色
	var Choose_color=document.getElementById('choose-color');
	var aLi=Choose_color.getElementsByTagName('li');
	var aA=Choose_color.getElementsByTagName('a');
	for(var i=0;i<aLi.length;i++){
		aA[i].onmouseover=function(){
			for(var j=0;j<aA.length;j++){
				aA[j].className="";
			}
			this.className="ac";			
		}
		aA[i].onmouseout=function(){
			this.className="";
		}
	}
	for(var i=0;i<aLi.length;i++){
		aLi[i].onclick=function(){
			for(var j=0;j<aLi.length;j++){
				aLi[j].className="item";
			}
			this.className="item selected";			
		}
	}
	// 选择白条
	var Choose_baitiao=document.getElementById('choose-baitiao');
	var Baitiao_list=Choose_baitiao.getElementsByClassName('baitiao-list')[0];
	var aLi2=Baitiao_list.getElementsByTagName('li');
	var aAA=Baitiao_list.getElementsByTagName('a');
	for(var i=0;i<aLi2.length;i++){
		aAA[i].onmouseover=function(){
			for(var j=0;j<aAA.length;j++){
				aAA[j].className="";
			}
			this.className="ac";			
		}
		aAA[i].onmouseout=function(){
			this.className="";
		}

	}
	for(var i=0;i<aLi2.length;i++){
		aLi2[i].index=i;
		aLi2[i].onclick=function(){
			if(aLi2[this.index].className=="item selected"){
				aLi2[this.index].className="item";
			}else{
				for(var j=0;j<aLi2.length;j++){
				  aLi2[j].className="item";
			    }
			    aLi2[this.index].className="item selected";
			}	
		}
	}
	//选项卡
	var Fitting_suit=document.getElementById('fitting-suit');
	var Tab=Fitting_suit.getElementsByClassName('tab')[0];
	var aLiui=Tab.getElementsByTagName('li');
	var Panel=Fitting_suit.getElementsByClassName('ui-switchable-panel');
	for(var i=0;i<aLiui.length;i++){
		aLiui[i].index=i;
		aLiui[i].onclick=function(){
			for(var j=0;j<aLiui.length;j++){
				aLiui[j].className="ui-switchable-item";
				Panel[j].className="ui-switchable-panel hide";
			}
			aLiui[this.index].className="ui-switchable-item curr";
			Panel[this.index].className="ui-switchable-panel"
		}
	}
	//放大镜
	function offsetTop( elm ){ 
	var top = elm.offsetTop; 
	var parent = elm.offsetParent; 
	while( parent != null ){ 
		top += parent.offsetTop; 
		parent = parent.offsetParent; 
	}; 
	return top; 
	}; 
	function offsetLeft( elm ){ 
		var left = elm.offsetLeft; 
		var parent = elm.offsetParent; 
		while( parent != null ){ 
			left += parent.offsetLeft; 
			parent = parent.offsetParent; 
		}; 
		return left; 
	}; 
	var Jqzoom=document.getElementById('jqzoom');
	var Zoomdiv=document.getElementById('zoomdiv');
	var Spec_list=document.getElementById('spec-list');
	var Lh=Spec_list.getElementsByClassName('lh')[0];
	var img_top=Jqzoom.getElementsByTagName('img');//上边的图
	var img_btn=Lh.getElementsByTagName('img');//下边的小图
	var img_r=Zoomdiv.getElementsByTagName('img');//右边的图
	var oSpan=Jqzoom.getElementsByTagName('span')[0];
	var nn=0;
	var n=0;
	for(var i=0;i<img_btn.length;i++){
	    img_btn[i].index=i;
	    img_btn[i].onmouseover=function(){
	        for(var j=0;j<img_top.length;j++){
	            img_btn[j].className="";
	            img_top[j].className="box_t_hide";
	            img_r[j].style.display="none";
	        }
	        n=this.index;
	        img_top[this.index].className="";
	        this.className="img-hover";
	        img_r[this.index].style.display="block";
	    }
	}
	var Spec_forward=document.getElementById('spec-forward');
	var Spec_backward=document.getElementById('spec-backward');
	Spec_forward.onclick=function(){
		nn+=62;
		if(nn>=0){
			nn=0;
		}
		Lh.style.left=nn+"px";
	}
	Spec_backward.onclick=function(){
		nn-=62;
		if(nn<=-124){
			nn=-124;
		}
		Lh.style.left=nn+"px";
	}
	//放大镜
	    Jqzoom.onmousemove=function(ev){//图片移动到每一个图片上的时候,所有右边的图片都隐藏，对应的图片显示；
	        ev=ev || event;
	        ev.cancelBubble=true;     
	        oSpan.style.display="block";
	        Zoomdiv.style.display="block";
	        //放大镜放大
	        var scrollTop=document.documentElement.scrollTop||document.body.scrollTop;
	        var l=ev.clientX-Jqzoom.offsetLeft-oSpan.offsetWidth/2;
		    var t=ev.clientY-Jqzoom.offsetTop-oSpan.offsetHeight/2+scrollTop;
	        //限制范围
	        if(l<0){
	            l=0;
	        };
	        if(t<0){
	            t=0;
	        };
	        if(l>Jqzoom.offsetWidth-oSpan.offsetWidth){
	            l=Jqzoom.offsetWidth-oSpan.offsetWidth;
	        };
	        if(t>Jqzoom.offsetHeight-oSpan.offsetHeight){
	            t=Jqzoom.offsetHeight-oSpan.offsetHeight
	        };
	        
	        //比率
	        oSpan.style.top=t+'px';
	        oSpan.style.left=l+'px';
	        var t_rate=t/(Jqzoom.offsetHeight-oSpan.offsetHeight);
	        var l_rate=l/(Jqzoom.offsetWidth-oSpan.offsetWidth);
	        	        	     	        	        
	        img_r[n].style.top=-(img_r[n].offsetHeight-Zoomdiv.offsetHeight)*t_rate+'px';
	        
	        img_r[n].style.left=-(img_r[n].offsetWidth-Zoomdiv.offsetWidth)*l_rate+'px';
        	
	    }
	    Jqzoom.onmouseleave=function(){
		    oSpan.style.display=Zoomdiv.style.display='none';	
	    };
}