var applicationId = widget.preferences["ApplicationId"];
var category=new Object();
var userAutoLogin ={
	init: function() {
		//widget.preferences["UserId"]="";
		//get the presisted application data
		var userId = widget.preferences["UserId"];
				
		if(userId=="" || applicationId==""){
			mwl.switchClass('#loginPage', 'ui-hide', 'ui-show'); 
			mwl.switchClass('#categoriesPage', 'ui-show','ui-hide' ); 
			mwl.switchClass('#subCategoriesPage', 'ui-show','ui-hide' ); 
			mwl.switchClass('#itemsPage', 'ui-show','ui-hide' ); 
			/*mwl.show("loginPage");
			mwl.hide("categoriesPage");
			mwl.hide("subCategoriesPage");
			mwl.hide("itemsPage");*/
		}
		else{
			// redirect to registration page if there is no presisted data
			categoriesXmlDataSource.init();
		}
	}
};

 var registerXmlDataSource ={
		
		init: function() {
			// get the user name and password from the text boxes 
			var userName= document.getElementById("txtUserName").value;
			var password=document.getElementById("txtPassword").value;
			// validate user name
			if(userName.length < 4 || userName.length > 20)
				{
				alert("اسم المستخدم يجب ان يكون بين 4 و 20 حرف");
				return;
				}
			if(password.length < 6)
				{
				alert("كلمة السر يجب ان تكون 6 حروف على الاقل");
				return;
				}
			// construct the registration service url
			var registerURL = widget.preferences["ServiceUrl"]+"Register?username="+userName+"&password="
				+password+"&applicationName="+widget.preferences["ApplicationName"];
			//URL, success callback, failure callback			
			this.connect(registerURL, this.registerResponseHandler, this.failureHandler);	
			},
		// succefull registration handler
		registerResponseHandler: function(xmlDoc) {
			message = xmlDoc.getElementsByTagName("Message");
			messageText = message[0].getAttribute("Text");
			messageCode = message[0].getAttribute("Code");
			if(messageCode == "200")
				{
				applicationId =xmlDoc.getElementsByTagName("ApplicationId");
				widget.preferences["ApplicationId"] = applicationId[0].getAttribute("Id");
				userId = xmlDoc.getElementsByTagName("UserId");
				widget.preferences["UserId"] = applicationId[0].getAttribute("Id");
				categoriesXmlDataSource.init();
				}
			else {
				var userName= document.getElementById("txtUserName").value;
				var password=document.getElementById("txtPassword").value;
				var loginUrl = widget.preferences["ServiceUrl"]+"Login?username="+userName+"&password="
				+password+"&applicationName="+widget.preferences["ApplicationName"];
				this.connect(loginUrl, this.loginResponseHandler, this.failureHandler);
			}
		},
		
		//succefull login handler
		loginResponseHandler: function(xmlDoc) {
			message = xmlDoc.getElementsByTagName("Message");
			messageText = message[0].getAttribute("Text");
			messageCode = message[0].getAttribute("Code");
			if(messageCode == "200"){
				applicationId =xmlDoc.getElementsByTagName("ApplicationId");
				widget.preferences["ApplicationId"] = applicationId[0].getAttribute("Id");
				userId = xmlDoc.getElementsByTagName("UserId");
				widget.preferences["UserId"] = applicationId[0].getAttribute("Id");
				this.categoriesXmlDataSource.init();
			}
			else {
				alert("يوجد مشكلة فى السيرفر");
			}
		},

		// failure login and registration handler
		failureHandler: function(xmlDoc) {
			alert("يوجد خطأ فى الإتصال");
		},
			
		connect: function(url, successCb, failCb) {
			var xmlhttp = new XMLHttpRequest();
			
			xmlhttp.open("GET", url, true);
		
			xmlhttp.setRequestHeader("Accept","text/xml,application/xml");	
			xmlhttp.setRequestHeader("Cache-Control", "no-cache");
			xmlhttp.setRequestHeader("Pragma", "no-cache");
			
			var that = this;
			xmlhttp.onreadystatechange = function() {
				
				if (xmlhttp.readyState ==  4 ){
					
					if(xmlhttp.status == 200){				
						
						if(!xmlhttp.responseXML){		
							try {
								//In case server didn't respond with correct MIME type for a XML file.
								var domParser= new DOMParser();
								var xmlDoc = domParser.parseFromString(xmlhttp.responseText,"text/xml");
								
								successCb.call(that,xmlDoc);
								
							} catch (e) {
								failCb.call(that,"Response was not in a XML format.");	
							}
											
						}else{						
							successCb.call(that,xmlhttp.responseXML);					
						}							
					}else{				
						failCb.call(that,"Connection failed: Status "+xmlhttp.status);
					}
				}
			};
			xmlhttp.send();
		}
};
 

var categoriesXmlDataSource={
		init: function() {
			// construct the categories service url
			var categriesURL = widget.preferences["ServiceUrl"]+"GetCategoriesByApplicationId?applicationId="
			+applicationId;
			this.connect(categriesURL,this.responseHandler,this.failureHandler);
		},
		responseHandler: function(xmlDoc) {
			message = xmlDoc.getElementsByTagName("Message");
			messageText = message[0].getAttribute("Text");
			messageCode = message[0].getAttribute("Code");
			if(messageCode == "200"){
				var categories = xmlDoc.getElementsByTagName("Categories");
				var categoryList = categories[0].getElementsByTagName("Category");
				if(categoryList.length > 1){
					
				}
				else if(categoryList.length == 1){
					//category.CategoryId=
					
				}
				else{
					
				}
			}
		},
		
		failureHandler: function() {
			alert("يوجد خطأ فى الإتصال");
		},
		
		connect:function(url, successCb, failCb){
			var xmlhttp = new XMLHttpRequest();
			
			xmlhttp.open("GET", url, true);
		
			xmlhttp.setRequestHeader("Accept","text/xml,application/xml");	
			xmlhttp.setRequestHeader("Cache-Control", "no-cache");
			xmlhttp.setRequestHeader("Pragma", "no-cache");
			
			var that = this;
			xmlhttp.onreadystatechange = function() {
				
				if (xmlhttp.readyState ==  4 ){
					
					if(xmlhttp.status == 200){				
						
						if(!xmlhttp.responseXML){		
							try {
								//In case server didn't respond with correct MIME type for a XML file.
								var domParser= new DOMParser();
								var xmlDoc = domParser.parseFromString(xmlhttp.responseText,"text/xml");
								
								successCb.call(that,xmlDoc);
								
							} catch (e) {
								failCb.call(that,"Response was not in a XML format.");	
							}
											
						}else{						
							successCb.call(that,xmlhttp.responseXML);					
						}							
					}else{				
						failCb.call(that,"Connection failed: Status "+xmlhttp.status);
					}
				}
			};
			xmlhttp.send();
		}
};

/*var audioSubCategoryXmlDataSource={
		
};

var videoSubCategoryXmlDataSource={
		
};

var item{
	
};*/
