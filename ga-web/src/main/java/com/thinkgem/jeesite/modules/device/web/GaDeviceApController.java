/**
 * Copyright &copy; 2012-2014 <a href="https://github.com/thinkgem/jeesite">JeeSite</a> All rights reserved.
 */
package com.thinkgem.jeesite.modules.device.web;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.thinkgem.jeesite.common.config.Global;
import com.thinkgem.jeesite.common.persistence.Page;
import com.thinkgem.jeesite.common.web.BaseController;
import com.thinkgem.jeesite.common.utils.StringUtils;
import com.thinkgem.jeesite.modules.device.entity.GaDeviceAp;
import com.thinkgem.jeesite.modules.device.service.GaDeviceApService;

/**
 * 基站设备Controller
 * @author liuwsh
 * @version 2017-02-28
 */
@Controller
@RequestMapping(value = "${adminPath}/device/gaDeviceAp")
public class GaDeviceApController extends BaseController {

	@Autowired
	private GaDeviceApService gaDeviceApService;
	
	@ModelAttribute
	public GaDeviceAp get(@RequestParam(required=false) String id) {
		GaDeviceAp entity = null;
		if (StringUtils.isNotBlank(id)){
			entity = gaDeviceApService.get(id);
		}
		if (entity == null){
			entity = new GaDeviceAp();
		}
		return entity;
	}
	
	@RequiresPermissions("device:gaDeviceAp:view")
	@RequestMapping(value = {"list", ""})
	public String list(GaDeviceAp gaDeviceAp, HttpServletRequest request, HttpServletResponse response, Model model) {
		Page<GaDeviceAp> page = gaDeviceApService.findPage(new Page<GaDeviceAp>(request, response), gaDeviceAp); 
		model.addAttribute("page", page);
		return "modules/device/gaDeviceApList";
	}

	@RequiresPermissions("device:gaDeviceAp:view")
	@RequestMapping(value = "form")
	public String form(GaDeviceAp gaDeviceAp, Model model) {
		model.addAttribute("gaDeviceAp", gaDeviceAp);
		return "modules/device/gaDeviceApForm";
	}

	@RequiresPermissions("device:gaDeviceAp:edit")
	@RequestMapping(value = "save")
	public String save(GaDeviceAp gaDeviceAp, Model model, RedirectAttributes redirectAttributes) {
		if (!beanValidator(model, gaDeviceAp)){
			return form(gaDeviceAp, model);
		}
		gaDeviceApService.save(gaDeviceAp);
		addMessage(redirectAttributes, "保存基站设备成功");
		return "redirect:"+Global.getAdminPath()+"/device/gaDeviceAp/?repage";
	}
	
	@RequiresPermissions("device:gaDeviceAp:edit")
	@RequestMapping(value = "delete")
	public String delete(GaDeviceAp gaDeviceAp, RedirectAttributes redirectAttributes) {
		gaDeviceApService.delete(gaDeviceAp);
		addMessage(redirectAttributes, "删除基站设备成功");
		return "redirect:"+Global.getAdminPath()+"/device/gaDeviceAp/?repage";
	}

}