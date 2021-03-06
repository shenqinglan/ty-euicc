/**
 * 
 */
// form校验
var FormValidation = function() {
	// validation using icons
	var handleValidation2 = function() {
		// for more info visit the official plugin documentation:
		// http://docs.jquery.com/Plugins/Validation
		var form2 = $('#profileForm');
		var error2 = $('.alert-danger', form2);
		var success2 = $('.alert-success', form2);

		return form2.validate( {
			errorElement : 'span', // default input error message
			// container
			errorClass : 'help-block help-block-error', // default input
			// error message
			// class
			focusInvalid : false, // do not focus the last invalid
			// input
			ignore : "", // validate all fields including form hidden
			// input
			rules : {
				iccid : {
					maxlength : 10, 
					minlength : 10,
					required : true 
				}, 
				isdPAid : {
					maxlength : 32, 
					minlength : 32,
					required : true 
				}, 
				mnoId : {
					maxlength : 6, 
					required : true 
				},

				fallbackAttribute : {
					maxlength : 2,
					required : true
				},
				imsi : {
					maxlength : 15,
					required : true,
					digits : true
				},
				msisdn : {
					maxlength : 13,
					required : true,
					digits : true
				},
				state : {
					maxlength : 2,
					required : true
				},
				smdpId : {
					maxlength : 6,
					required : true
				},
				
				profileType : {
					maxlength : 2,
					required : true
				},
				allocatedMemory : {
					maxlength : 10,
					required : true
				},
				freeMemory : {
					maxlength : 10,
					required : true
				},
				pol2Id : {
					maxlength : 2
					//required : true
				},
				phoneNo : {
					maxlength : 16,
					minlength : 11,
					required : true,
					digits : true
				}
			},
			messages:{
				fallbackAttribute:{required:"请输入fallbackAttribute",maxlength:$.validator.format('菜单编码不能超过{0}个字符')}
				,profileType:{required:"请输profile类型",maxlength:$.validator.format('菜单编码不能超过{0}个字符')}
				
			},

			invalidHandler : function(event, validator) { // display
				// error
				// alert on
				// form
				// submit
				success2.hide();
				error2.show();
				Metronic.scrollTo(error2, -200);
			},

			errorPlacement : function(error, element) { // render error
				// placement for
				// each input
				// type
				var icon = Metronic.handValidStyle(element);
				icon.removeClass('fa-check').addClass("fa-warning");
				icon.attr("data-original-title", error.text()).tooltip( {
					'container' : '#profileForm'
				});
			},

			highlight : function(element) { // hightlight error inputs
				$(element).closest('.form-group').removeClass("has-success")
						.addClass('has-error'); // set error class to
				// the control group
			},

			unhighlight : function(element) { // revert the change
				// done by hightlight

			},

			success : function(label, element) {
				var icon = Metronic.handValidStyle(element);
				$(element).closest('.form-group').removeClass('has-error')
						.addClass('has-success'); // set success class
				// to the control
				// group
				icon.removeClass("fa-warning").addClass("fa-check");
			},

			submitHandler : function(form) {
				success2.show();
				error2.hide();
				form[0].submit(); // submit the form
		}
		});
	}

	return {
		// main function to initiate the module
		init : function() {
			return handleValidation2();
		}
	};
}();
// 页面信息
var profileUI = function() {
	var grid = new Datatable();
	var validator = FormValidation.init();
	// 创建表格
	var createTable = function() {
		grid.init( {
			src : $("#grid"),
			onSuccess : function(grid) {
				// execute some code after table records loaded
		},
			onError : function(grid) {
				// execute some code on network or other general error
			},
			onDataLoad : function(grid) {
				
				
				
				
				$(".edit").click(
						function() {
							setFormStatus("edit");
							var fieldId = $(this).attr("name");
							$.ajax( {
								type : 'POST',
								url : ctx + '/profile/view',
								data : {
									iccid : fieldId
								},
								dataType : 'json',
								success : function(data) {
									$.each(data, function(name, val) {
										$('#createProfile').find(
												"[name='" + name + "']").val(val);
									});
									Metronic.handleFixInputPlaceholderForIE();
									$('#createProfile').modal('show');
								},
								error : function(data) {
									toastr['error']("获取信息失败,请联系管理员！", "系统提示");
								}
							});
						});
				$(".delete").click(function() {
					var fieldId = $(this).attr("name");
					if (!confirm("是否确定删除该数据信息？")) {
						return false;
					}
					$.ajax( {
						type : 'POST',
						url : ctx + '/profile/delete',
						data : {
							iccid : fieldId
						},
						dataType : 'json',
						success : function(data) {
							if (data.success) {
								toastr['success']("删除成功", "系统提示");
								profileUI.callback();
							}
						},
						error : function(data) {
							toastr['error']("获取信息失败,请联系管理员！", "系统提示");
						}
					});
				});
				
				



				 $('.import').click(function(){
					 var fieldId = $(this).attr("name");
					 if($(this).prev().val() ==""){
						 toastr['error']("请选择文件", "error");
						 return;
					 }
					   $.ajaxFileUpload({
					    type : 'POST',
					    url : ctx + '/profile/import/'+fieldId,
					    secureuri:false,  
					    fileElementId:'fileUpload'+fieldId,
					    dataType : 'json',
					    success : function(data) {
					     if (data.success) {
						      toastr['success']("上传成功", "上传成功");
						      profileUI.callback();
						      $("#fileUpload"+fieldId).attr("value","");
					     }else{
					    	  toastr['error'](data.msg, "上传失败");
					     }
					    },
					    error : function(data) {
					     toastr['error'](data.msg, "上传失败");
					    }
					   });
					  });

				
			},
			loadingMessage : 'Loading...',
			dataTable : {
				'bStateSave' : true,
				'lengthMenu' : [ [ 10, 20, 30 ], [ 10, 20, 30 ] // change
				// per
				// page
				// values
				// here
				],
				'pageLength' : 10,
				'ajax' : {
					url : ctx + '/profile/findAll'
				},
				'formSearch' : 'searchForm',
				"columnDefs" : [ {
					'name' : 'iccid',
					'orderable' : true,
					'targets' : [ 0 ]
				}, {
					'name' : 'isd_p_aid',
					'orderable' : true,
					'targets' : [ 1 ]
				}, {
					'name' : 'mno_id',
					'orderable' : true,
					'targets' : [ 2 ]
				}, {
					'name' : 'fallback_attribute',
					'orderable' : true,
					'targets' : [ 3 ]
				}, {
					'name' : 'imsi',
					'orderable' : false,
					'targets' : [ 4 ]
				},{
					'name' : 'msisdn',
					'orderable' : false,
					'targets' : [ 5 ]
				},{
					'name' : 'state',
					'orderable' : false,
					'targets' : [ 6 ]
				}, {
					'name' : 'smdp_id',
					'orderable' : false,
					'targets' : [ 7 ]
				}, {
					'name' : 'profile_type',
					'orderable' : false,
					'targets' : [ 8 ]
				} ,{
					'name' : 'allocated_memory',
					'orderable' : false,
					'targets' : [ 9 ]
				},{
					'name' : 'free_memory',
					'orderable' : false,
					'targets' : [ 10 ]
				},{
					'name' : 'pol2_id',
					'orderable' : false,
					'targets' : [ 11 ]
				},{
					'name' : 'phone_no',
					'orderable' : false,
					'targets' : [ 12 ]
				},{
					'name' : 'iccid',
					'orderable' : false,
					'targets' : [ 13 ]
				},{
					'name' : 'iccid',
					'orderable' : false,
					'targets' : [ 14 ]
				}],
				'columns' : [ {
					'title' : 'iccid',
					'field' : 'iccid'
				}, {
					'title' : 'isdPAid',
					'field' : 'isdPAid'
				}, {
					'title' : 'mnoId',
					'field' : 'mnoId'
				}, {
					'title' : '回退属性',
					'field' : 'fallbackAttribute'
				}, {
					'title' : '订阅地址imsi',
					'field' : 'imsi',
				},
				{
					'title' : '订阅地址msisdn',
					'field' : 'msisdn',
				},{
					'title' : 'state',
					'field' : 'state'
				}, {
					'title' : 'smdpId',
					'field' : 'smdpId'
				}, {
					'title' : '类型',
					'field' : 'profileType'
				}, {
					'title' : '总内存',
					'field' : 'allocatedMemory'
				}, {
					'title' : '空闲内存',
					'field' : 'freeMemory'
				}, {
					'title' : 'pol2Id',
					'field' : 'pol2Id'
				},{
					'title' : '手机号码',
					'field' : 'phoneNo'
				}, {
					'title' : '操作',
					'field' : 'iccid',
					'fieldRender' : "getPremission"
				},{
					'title' : '上传',
					'field' : 'iccid',
					'fieldRender' : "getPremission1"
				} ],
				'order' : [ [ 0, "asc" ] ]
			}
		});
	};
	// 查询
	var search = function() {
		$("#search").click(function(e) {
			e.preventDefault();
			grid.getDataTable().ajax.reload();
			grid.clearAjaxParams();
		});
	};
	// 重置
	var reset = function() {
		grid.getDataTable().ajax.reload();
		grid.clearAjaxParams();
	};
	// 激活bootstrap控件相关功能
	var activeBootstrapControls = function() {
		// 提示控件配置
		var options = {
			"closeButton" : true,
			"debug" : false,
			"positionClass" : "toast-top-center",
			"onclick" : null,
			"showDuration" : "1000",
			"hideDuration" : "1000",
			"timeOut" : "3000",
			"extendedTimeOut" : "1000",
			"showEasing" : "swing",
			"hideEasing" : "linear",
			"showMethod" : "fadeIn",
			"hideMethod" : "fadeOut"
		}
		toastr.options = options;
		// 新增
		$('#create').click(function() {
			setFormStatus("add");
			Metronic.handleFixInputPlaceholderForIE();
			$('#profileForm')[0].reset();
			$('#createProfile').modal('show');
			$('#read').attr('readonly',false);
		});
		// 保存
		$('#addModule').click(function() {
			if (!validator.form())
				return false;
			$.ajax( {
				type : 'POST',
				url : ctx + '/profile/save',
				data : $('#profileForm').serialize(),
				dataType : 'json',
				success : function(data) {
					if (data.success) {
						toastr['success'](data.msg, "系统提示");
						$('#createProfile').modal('hide');
						profileUI.callback();
					} else {
						toastr['error'](data.msg, "系统提示");
					}
				},
				error : function(data) {
					toastr['error'](data.msg, "系统提示");
				}
			});
		});
	};
	return {
		init : function() {
			// 激活bootstrap控件相关功能
		activeBootstrapControls();
		// 创建表格
		createTable();
		//
		search();
	},
	callback : function() {
		reset();
	}
	};
}();
function setFormStatus(type) {
	// 清除验证css样式
	$('.form-group').removeClass('has-error').removeClass('has-success');
	$('.form-group i').removeClass().addClass('fa');
	if ("edit" == type) {
		$("#tag").val("update");
		$("#acInfoModalLabel").html("编辑");// 请完善编辑内容
		$('#read').attr('readonly',true);
	} else if ("add" == type) {
		$("#tag").val("add");
		$("#acInfoModalLabel").html("新建");// 请完善新建内容
		$('#read').attr('readonly',false);
		
	}
};

$("#resetForm").click(function() {
	$('#searchForm')[0].reset();
	acInfoUI.callback();
});

function statusRender(data) {
	if (data == 1) {
		return "停用";
	} else {
		return "启用";
	}
};

function getPremission(data) {
	var p = "<shiro:hasPermission name='acInfo:edit'><a class='btn default edit btn-xs blue' name='"
			+ data
			+ "'><i class='fa fa-edit'></i>编辑 </a></shiro:hasPermission>";
	p += "<shiro:hasPermission name='acInfo:delete'><a class='btn default delete btn-xs red' name='"
			+ data
			+ "'><i class='fa fa-trash-o'></i>删除</a></shiro:hasPermission>";
	return p;
}


function getPremission1(data) {
	var p = '<shiro:hasPermission name="acInfo:import"><input type="file" id="fileUpload'+ data+'" name="fileUpload'+ data+'" style="float:left">'
		+'<button class="btn default import btn-xs blue"  type="button" name="'+ data+'" id="import" >导入asn</button></shiro:hasPermission>';
	return p;
}

function stopDefault(event){ 
	e = event || window.event;
	if(e.stopPropagation){
		e.stopPropagation();
	}else { 
		e.cancelBubble = true;
		} 
};


